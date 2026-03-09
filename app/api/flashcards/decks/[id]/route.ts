import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserId } from '@/lib/get-user';

// GET: Lấy chi tiết 1 Deck và Card bên trong
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserId();
  const { id } = await params;

  // Trường hợp Deck mẫu (không cần login hoặc login cũng xem được)
  if (id.startsWith('sample-')) {
    const { SAMPLE_DECKS } = await import('@/lib/flashcardData');
    const index = parseInt(id.replace('sample-', ''));
    const s = SAMPLE_DECKS[index];

    if (!s) return NextResponse.json({ error: 'Không tìm thấy bộ thẻ mẫu' }, { status: 404 });

    return NextResponse.json({
      id,
      title: s.title,
      description: `[SAMPLE] ${s.description}`,
      cards: s.cards.map((c, cIdx) => ({
        id: `sample-card-${index}-${cIdx}`,
        front: c.front,
        back: c.back,
        example: c.example,
        isLearned: false,
        nextReviewAt: null
      }))
    });
  }

  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const deck = await prisma.deck.findUnique({
      where: { id },
      include: {
        cards: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!deck || deck.userId !== userId) {
      return NextResponse.json({ error: 'Không tìm thấy bộ thẻ hoặc không có quyền' }, { status: 403 });
    }

    return NextResponse.json(deck);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi lấy dữ liệu' }, { status: 500 });
  }
}

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
