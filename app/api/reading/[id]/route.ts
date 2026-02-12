import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import redis from '@/lib/redis';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Kiểm tra đăng nhập (Session Token)
    const cookieStore = await cookies();
    let token = cookieStore.get('session_token')?.value;

    if (!token) {
      const authHeader = request.headers.get('Authorization');
      if (authHeader) {
        token = authHeader.replace('Bearer ', '');
      }
    }

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Validate Token với Redis
    const userId = await redis.get(`session:${token}`);
    if (!userId) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    // 3. Lấy ID bài viết
    const params = await props.params;
    const id = params.id;

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