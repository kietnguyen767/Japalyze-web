import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserId } from '@/lib/get-user'; // Nhớ tạo file helper này như bài trước

// GET: Lấy toàn bộ Deck và Card bên trong
export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const decks = await prisma.deck.findMany({
      where: { userId },
      include: { 
        cards: {
            orderBy: { createdAt: 'asc' } // Sắp xếp thẻ theo thứ tự tạo
        } 
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ decks });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi lấy danh sách' }, { status: 500 });
  }
}

// POST: Tạo bộ thẻ mới
export async function POST(request: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { title, description } = await request.json();
    
    const newDeck = await prisma.deck.create({
      data: {
        title,
        description,
        userId
      }
    });

    return NextResponse.json(newDeck);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi tạo deck' }, { status: 500 });
  }
}