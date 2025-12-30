import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserId } from '@/lib/get-user';

// GET: Lấy danh sách bài viết (Kèm người đăng, số like, số comment)
export async function GET() {
  try {
    // Lấy userId để kiểm tra xem user này đã like bài nào chưa
    const userId = await getUserId(); 

    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' }, // Mới nhất lên đầu
      include: {
        // Lấy thông tin người đăng
        user: {
          select: { name: true, avatar: true, email: true }
        },
        // Đếm số lượng like và comment
        _count: {
          select: { likes: true, comments: true }
        },
        // Kiểm tra xem User hiện tại đã like chưa
        // Nếu mảng 'likes' trả về có dữ liệu -> Đã like
        likes: userId ? {
            where: { userId: userId }
        } : false
      }
    });

    console.log("✅ Loaded", posts.length, "posts");
    return NextResponse.json(posts);
  } catch (error) {
    console.error("❌ Community GET Error:", error);
    return NextResponse.json({ error: 'Lỗi tải bài viết', details: String(error) }, { status: 500 });
  }
}

// POST: Đăng bài viết mới
export async function POST(request: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'Vui lòng đăng nhập' }, { status: 401 });

  try {
    const { content, rating } = await request.json();
    
    if (!content || content.trim().length === 0) {
        return NextResponse.json({ error: 'Nội dung không được để trống' }, { status: 400 });
    }

    const ratingValue = Math.min(Math.max(parseInt(rating) || 5, 1), 5); // Giới hạn 1-5

    const newPost = await prisma.post.create({
      data: {
        content,
        rating: ratingValue,
        userId
      },
      include: {
        user: {
          select: { name: true, avatar: true, email: true }
        },
        _count: {
          select: { likes: true, comments: true }
        }
      }
    });

    console.log("✅ Created new post:", newPost.id);
    return NextResponse.json(newPost);
  } catch (error) {
    console.error("❌ Community POST Error:", error);
    return NextResponse.json({ error: 'Lỗi đăng bài', details: String(error) }, { status: 500 });
  }
}