import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserId } from '@/lib/get-user';

// DELETE: Xóa deck
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;

    // Kiểm tra quyền sở hữu
    const deck = await prisma.deck.findUnique({
      where: { id }
    });

    if (!deck || deck.userId !== userId) {
      return NextResponse.json({ error: 'Không có quyền xóa' }, { status: 403 });
    }

    // Xóa deck (cascade sẽ xóa cards tự động)
    await prisma.deck.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: 'Deck đã xóa' });
  } catch (error: any) {
    console.error('❌ Lỗi xóa deck:', error);
    return NextResponse.json({ error: 'Lỗi xóa deck' }, { status: 500 });
  }
}

// PATCH: Cập nhật deck (đổi tên, mô tả)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const { title, description } = await request.json();

    // Kiểm tra quyền sở hữu
    const deck = await prisma.deck.findUnique({
      where: { id }
    });

    if (!deck || deck.userId !== userId) {
      return NextResponse.json({ error: 'Không có quyền sửa' }, { status: 403 });
    }

    // Update deck
    const updatedDeck = await prisma.deck.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description })
      }
    });

    return NextResponse.json(updatedDeck);
  } catch (error: any) {
    console.error('❌ Lỗi cập nhật deck:', error);
    return NextResponse.json({ error: 'Lỗi cập nhật deck' }, { status: 500 });
  }
}
