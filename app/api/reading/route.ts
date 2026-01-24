// File: app/api/reading/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Bắt buộc dòng này để Next.js không cache dữ liệu (luôn lấy bài mới nhất)
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const articles = await prisma.readingArticle.findMany({
      orderBy: { createdAt: 'desc' }, // Bài mới nhất lên đầu
      // Chỉ lấy các thông tin cần thiết để hiển thị danh sách (bỏ content cho nhẹ)
      select: {
        id: true,
        title: true,
        excerpt: true,
        level: true,
        image: true,
        topic: true,
        createdAt: true,
      }
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("API Reading List Error:", error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}