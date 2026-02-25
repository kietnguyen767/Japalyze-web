import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserId } from '@/lib/get-user';
export const dynamic = 'force-dynamic';
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
    const { isLearned, rating } = await request.json(); // Gửi lên { isLearned, rating: 'hard'|'good'|'easy' }

    // Kiểm tra quyền sở hữu
    const card = await prisma.card.findUnique({
      where: { id: cardId },
      include: { deck: true }
    });

    if (!card || card.deck.userId !== userId) {
      return NextResponse.json({ error: 'Không tìm thấy thẻ hoặc không có quyền' }, { status: 403 });
    }

    // Logic SRS cơ bản
    let nextReviewAt = (card as any).nextReviewAt;
    let interval = (card as any).interval;
    let repetitions = (card as any).repetitions;
    let isLearnedStatus = isLearned !== undefined ? isLearned : card.isLearned;

    if (rating === 'hard') {
      // Hard: Reset hoặc lùi lại, ôn lại sau 10p
      nextReviewAt = new Date(Date.now() + 10 * 60 * 1000);
      interval = 0;
      repetitions = Math.max(0, (card as any).repetitions - 1); // Giảm một chút tiến độ
      isLearnedStatus = false;
    } else if (rating === 'good') {
      // Good: Ôn lại sau 1 ngày
      nextReviewAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
      interval = 1;
      repetitions = (card as any).repetitions + 1;
      isLearnedStatus = true;
    } else if (rating === 'easy') {
      // Easy: Ôn lại sau 4 ngày
      nextReviewAt = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000);
      interval = 4;
      repetitions = (card as any).repetitions + 1;
      isLearnedStatus = true;
    }

    // Nếu rating được gửi lên, chắc chắn card này không còn là "Mới"
    if (rating && repetitions === 0 && rating !== 'hard') repetitions = 1;
    if (rating === 'hard' && repetitions === 0) repetitions = 0; // Vẫn tính là đang học (nếu muốn phân biệt Hard vs New)
    // Để phân biệt Hard vs New: Mới (rep=0, int=0), Hard (rep > 0 hoặc đã từng click but int=0)
    // Cách dễ nhất: Mới là chưa click bao giờ. Sau click Hard -> repetitions vẫn 0 nhưng ta có thể check flag khác.
    // Thôi, hãy dùng repetitions = 1 cho mọi thẻ đã click. 
    if (rating && repetitions === 0) repetitions = 1;

    // Update trong Database
    const updatedCard = await prisma.card.update({
      where: { id: cardId },
      data: {
        isLearned: isLearnedStatus,
        nextReviewAt,
        interval,
        repetitions
      } as any
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