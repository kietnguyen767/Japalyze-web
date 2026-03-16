import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import redis from '@/lib/redis';
export const dynamic = 'force-dynamic';
// 1. Helper: Parse JSON an toàn (tránh lỗi crash nếu chuỗi không phải JSON)
const safeJsonParse = (str: string | null) => {
  if (!str) return null;
  try {
    return JSON.parse(str);
  } catch (e) {
    return null; 
  }
};

// 2. Helper: Parse Date an toàn (FIX LỖI INVALID DATE)
const safeDate = (val: any) => {
    if (!val) return new Date(); // Không có giá trị -> Lấy giờ hiện tại
    const date = new Date(val);
    // Kiểm tra xem date có hợp lệ không (hàm isNaN check timestamp)
    if (isNaN(date.getTime())) {
        return new Date(); // Nếu ngày lỗi -> Lấy giờ hiện tại
    }
    return date;
}

export async function GET() {
  try {
    const logs: string[] = [];
    logs.push("🚀 Bắt đầu di chuyển dữ liệu...");

    // ==========================================
    // 1. DI CHUYỂN USERS (Người dùng)
    // ==========================================
    const userKeys = await redis.keys('user:*');
    logs.push(`📦 Tìm thấy ${userKeys.length} users trong Redis.`);

    for (const key of userKeys) {
      // Lấy data từ Redis
      const userData: any = await redis.hgetall(key);
      
      let finalUser = userData;
      if (!userData || Object.keys(userData).length === 0) {
          const stringData = await redis.get(key);
          finalUser = safeJsonParse(stringData as string | null);
      }

      if (finalUser && finalUser.email) {
        // Xử lý isPremium
        const isPremiumBool = finalUser.isPremium === 'true';

        // Tạo hoặc update vào PostgreSQL
        const newUser = await prisma.user.upsert({
          where: { email: finalUser.email },
          update: {}, 
          create: {
            email: finalUser.email,
            name: finalUser.name || 'User cũ',
            password: finalUser.password || '',
            role: finalUser.role || 'user',
            isPremium: isPremiumBool,
            // 👇 SỬA Ở ĐÂY: Dùng hàm safeDate để tránh lỗi Invalid Date
            createdAt: safeDate(finalUser.createdAt),
          }
        });
        logs.push(`✅ Đã chuyển User: ${finalUser.email}`);

        // ==========================================
        // 1.1. DI CHUYỂN DECKS
        // ==========================================
        const deckKey = `decks:${finalUser.email}`;
        const deckDataRaw = await redis.get(deckKey);
        const decks = safeJsonParse(deckDataRaw as string | null);

        if (Array.isArray(decks)) {
          for (const d of decks) {
            await prisma.deck.create({
              data: {
                title: d.name || d.title || 'Bộ thẻ cũ',
                description: d.description || '',
                userId: newUser.id,
                cards: {
                  create: Array.isArray(d.cards) ? d.cards.map((c: any) => ({
                    front: c.front || '',
                    back: c.back || '',
                    example: c.example || '',
                    isLearned: c.learned || c.isLearned || false
                  })) : []
                }
              }
            });
            logs.push(`  └─ 🎴 Đã chuyển Deck: ${d.name} (${d.cards?.length || 0} thẻ)`);
          }
        }

        // ==========================================
        // 1.2. DI CHUYỂN TIẾN ĐỘ HỌC TẬP
        // ==========================================
        const progressKey = `exercise_progress:${finalUser.email}`;
        const progressDataRaw = await redis.get(progressKey);
        const progressList = safeJsonParse(progressDataRaw as string | null);

        if (Array.isArray(progressList)) {
           for (const exerciseId of progressList) {
               const exists = await prisma.exerciseProgress.findFirst({
                   where: { userId: newUser.id, exerciseId: String(exerciseId) }
               });
               
               if (!exists) {
                   await prisma.exerciseProgress.create({
                       data: {
                           userId: newUser.id,
                           exerciseId: String(exerciseId),
                           score: 100
                       }
                   });
               }
           }
           logs.push(`  └─ 📚 Đã chuyển ${progressList.length} bài tập.`);
        }
      }
    }

    // ==========================================
    // 2. DI CHUYỂN BÀI VIẾT CỘNG ĐỒNG
    // ==========================================
    const communityDataRaw = await redis.get('community:posts');
    const communityPosts = safeJsonParse(communityDataRaw as string | null);

    if (Array.isArray(communityPosts) && communityPosts.length > 0) {
        logs.push(`📦 Tìm thấy ${communityPosts.length} bài viết cộng đồng.`);
        
        // Tìm user admin hoặc user đầu tiên để gán tác giả nếu thiếu
        const defaultAuthor = await prisma.user.findFirst();

        for (const post of communityPosts) {
            let authorId = defaultAuthor?.id;
            
            // Cố gắng tìm user cũ theo email
            if (post.userEmail) {
                const foundUser = await prisma.user.findUnique({ where: { email: post.userEmail } });
                if (foundUser) authorId = foundUser.id;
            }

            if (authorId) {
                await prisma.post.create({
                    data: {
                        content: post.content || '',
                        // 👇 SỬA Ở ĐÂY: Dùng safeDate
                        createdAt: safeDate(post.createdAt),
                        userId: authorId,
                        comments: {
                            create: Array.isArray(post.comments) ? post.comments.map((cmt: any) => ({
                                content: cmt.content,
                                // 👇 SỬA Ở ĐÂY: Dùng safeDate
                                createdAt: safeDate(cmt.createdAt),
                                userId: authorId // Tạm gán
                            })) : []
                        }
                    }
                });
                logs.push(`📝 Đã chuyển Post: "${post.content?.substring(0, 20)}..."`);
            }
        }
    }

    logs.push("🎉 HOÀN TẤT DI CHUYỂN DỮ LIỆU!");
    
    return NextResponse.json({ success: true, logs });

  } catch (error: any) {
    console.error("Migration Error:", error);
    return NextResponse.json({ 
        success: false, 
        error: error.message || String(error)
    }, { status: 500 });
  }
}