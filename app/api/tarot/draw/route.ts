import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic'; // Quan trọng: Để tránh Next.js cache kết quả cũ

export async function GET() {
  try {
    // Lấy ngẫu nhiên 3 lá bài từ DB
    // Lưu ý: PostgreSQL dùng RANDOM(), MySQL dùng RAND()
    const cards = await prisma.$queryRaw`
      SELECT id, name, "nameVi", image, "meaningUpright"
      FROM "TarotCard"
      ORDER BY RANDOM()
      LIMIT 3;
    `;
    
    return NextResponse.json(cards);
  } catch (error) {
    console.error("Lỗi rút bài:", error);
    // Nếu lỗi DB (ví dụ chưa chạy prisma push), trả về mảng rỗng hoặc lỗi
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}