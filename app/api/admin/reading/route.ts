import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PUT: Cập nhật bài viết
export async function PUT(req: Request) {
  try {
    // SỬA LỖI: Chỉ đọc req.json() một lần
    const body = await req.json(); 
    
    // Lấy dữ liệu từ biến 'body' đã đọc ở trên, KHÔNG gọi await req.json() lần nữa
    const { id, title, excerpt, content, contentRomaji, contentMeaning, level, topic, image } = body;

    const updatedArticle = await prisma.readingArticle.update({
      where: { id },
      data: { title, excerpt, content, contentRomaji, contentMeaning, level, topic, image }
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error("Lỗi PUT:", error);
    return NextResponse.json({ error: 'Lỗi cập nhật bài viết' }, { status: 500 });
  }
}

// GET: Lấy danh sách bài
export async function GET() {
  try {
    const articles = await prisma.readingArticle.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Lỗi GET:", error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}

// POST: Tạo bài mới
export async function POST(req: Request) {
  try {
    // SỬA LỖI: Chỉ đọc req.json() một lần
    const body = await req.json();
    
    // Lấy dữ liệu từ biến 'body'
    const { title, excerpt, content, contentRomaji, contentMeaning, level, topic, image } = body;

    const newArticle = await prisma.readingArticle.create({
      data: { title, excerpt, content, contentRomaji, contentMeaning, level, topic, image }
    });

    return NextResponse.json(newArticle);
  } catch (error) {
    console.error("Lỗi POST:", error);
    return NextResponse.json({ error: 'Lỗi tạo bài viết' }, { status: 500 });
  }
}

// DELETE: Xóa bài
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.readingArticle.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lỗi DELETE:", error);
    return NextResponse.json({ error: 'Lỗi xóa bài' }, { status: 500 });
  }
}