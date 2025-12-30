import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserId } from '@/lib/get-user';

export async function POST(request: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { deckId, front, back, example } = await request.json();

    // Bảo mật: Kiểm tra xem Deck này có phải của User này không
    const deck = await prisma.deck.findUnique({ where: { id: deckId } });
    if (!deck || deck.userId !== userId) {
        return NextResponse.json({ error: 'Không có quyền' }, { status: 403 });
    }

    const newCard = await prisma.card.create({
      data: {
        front,
        back,
        example,
        deckId
      }
    });

    return NextResponse.json(newCard);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi thêm thẻ' }, { status: 500 });
  }
}