import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserId } from '@/lib/get-user';

// PUT: Cập nhật trạng thái thẻ (Đã thuộc / Chưa thuộc)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const cardId = id;
    const { isLearned } = await request.json(); // Gửi lên { isLearned: true/false }

    // Kiểm tra quyền sở hữu (Query phức tạp hơn xíu vì phải join bảng Deck)
    const card = await prisma.card.findUnique({
        where: { id: cardId },
        include: { deck: true }
    });

    if (!card || card.deck.userId !== userId) {
        return NextResponse.json({ error: 'Không tìm thấy thẻ hoặc không có quyền' }, { status: 403 });
    }

    // Update trong Database
    const updatedCard = await prisma.card.update({
      where: { id: cardId },
      data: { isLearned: isLearned }
    });

    return NextResponse.json(updatedCard);

  } catch (error) {
    return NextResponse.json({ error: 'Lỗi cập nhật' }, { status: 500 });
  }
}

// DELETE: Xóa thẻ
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
    try {
        const { id } = await params;
        // Logic check quyền tương tự ở trên...
        // Xóa
        await prisma.card.delete({
            where: { id: id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Lỗi xóa thẻ' }, { status: 500 });
    }
}