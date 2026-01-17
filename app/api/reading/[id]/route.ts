import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  // 👇 SỬA ĐỔI QUAN TRỌNG: params là Promise
  props: { params: Promise<{ id: string }> }
) {
  try {
    // 👇 PHẢI AWAIT PARAMS TRƯỚC
    const params = await props.params;
    const id = params.id;
    
    console.log(">>> SERVER ĐÃ NHẬN ID:", id); // Sẽ in ra ID đúng: 10622fdd...

    if (!id) {
        return NextResponse.json({ error: 'Thiếu ID bài viết' }, { status: 400 });
    }

    const article = await prisma.readingArticle.findUnique({
      where: { id },
    });

    if (!article) {
      return NextResponse.json({ error: 'Bài viết không tồn tại' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error(">>> Lỗi server:", error);
    return NextResponse.json({ error: 'Lỗi server nội bộ' }, { status: 500 });
  }
}