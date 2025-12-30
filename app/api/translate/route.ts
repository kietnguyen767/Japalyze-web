// app/api/translate/route.ts
import { NextResponse } from 'next/server';
import { getCache, setCache } from '@/lib/redis';
import prisma from '@/lib/prisma';
import { getUserId } from '@/lib/get-user';

export async function POST(request: Request) {
  try {
    // 1. Nhận dữ liệu
    const body = await request.json();
    const { text, source = 'ja', target = 'vi' } = body;

    if (!text) {
      return NextResponse.json({ error: 'Missing required field: text' }, { status: 400 });
    }

    // 2. Tạo Cache Key
    const cacheKey = `translation:${text.trim()}:${source}:${target}`;

    // 3. Kiểm tra Redis Cache
    // finalTranslation có thể là string hoặc null
    let finalTranslation = await getCache<string>(cacheKey);
    let provider = 'Redis';

    if (!finalTranslation) {
      // 4. Nếu Redis không có -> Gọi API MyMemory
      console.log('🌐 Redis Miss - Calling External API...');

      const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.responseStatus !== 200) {
        throw new Error(data.responseDetails || 'Lỗi từ dịch vụ MyMemory');
      }

      finalTranslation = data.responseData.translatedText;
      provider = 'MyMemory';

      // 5. Lưu kết quả dịch vào Redis (Cache 24h)
      // Thêm kiểm tra: Chỉ lưu nếu có kết quả thực sự
      if (finalTranslation) {
        await setCache(cacheKey, finalTranslation, 86400);
      }
    }

    // 🔥 6. BƯỚC MỚI: LƯU LỊCH SỬ VÀO POSTGRESQL 🔥
    const userId = await getUserId();

    // Chỉ lưu khi có UserID và finalTranslation thực sự có giá trị
    if (userId && finalTranslation) {
      // Chạy ngầm
      prisma.translationHistory.create({
        data: {
          sourceText: text,
          // 👇 SỬA LỖI Ở ĐÂY: Thêm || "" để TypeScript yên tâm đây luôn là String
          targetText: finalTranslation || "", 
          userId: userId
        }
      }).catch(err => console.error("Lỗi lưu lịch sử:", err));
    }

    // 7. Trả kết quả
    return NextResponse.json({
      success: true,
      translation: finalTranslation,
      cached: provider === 'Redis',
      provider: provider
    });

  } catch (error: any) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}