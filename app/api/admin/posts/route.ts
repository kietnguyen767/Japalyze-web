import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export const dynamic = 'force-dynamic';

export async function DELETE(request: Request) {
  try {
    const { postId } = await request.json();
    
    // Xóa bài viết trong PostgreSQL
    // (Comment và Like liên quan sẽ tự mất nếu trong schema bạn để onDelete: Cascade)
    await prisma.post.delete({
        where: { id: postId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Post Error:", error);
    return NextResponse.json({ error: 'Lỗi xóa bài' }, { status: 500 });
  }
}