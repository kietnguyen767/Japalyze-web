import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserId } from '@/lib/get-user'; // Nhớ tạo file helper này như bài trước
export const dynamic = 'force-dynamic';
// GET: Lấy toàn bộ Deck và Card bên trong
export async function GET(request: Request) {
  console.log('📥 GET /api/flashcards/decks');
  console.log('🔍 Authorization header:', request.headers.get('Authorization'));
  console.log('🔍 Cookie header:', request.headers.get('cookie'));

  const userId = await getUserId();
  console.log('👤 userId:', userId);

  // Nếu KHÔNG có userId (Chưa đăng nhập) -> Trả về dữ liệu mẫu tĩnh
  if (!userId) {
    const { SAMPLE_DECKS } = await import('@/lib/flashcardData');
    const formattedSamples = SAMPLE_DECKS.map((s, idx) => ({
      id: `sample-${idx}`,
      title: s.title,
      description: `[SAMPLE] ${s.description}`,
      userId: null,
      createdAt: new Date(),
      cards: s.cards.map((c, cIdx) => ({
        id: `sample-card-${idx}-${cIdx}`,
        front: c.front,
        back: c.back,
        example: c.example,
        isLearned: false,
        nextReviewAt: null
      }))
    }));
    return NextResponse.json({ decks: formattedSamples });
  }

  // Đảm bảo có deck mẫu nếu user đã đăng nhập nhưng chưa có gì
  const { ensureSampleDeck } = await import('@/lib/flashcardUtils');
  await ensureSampleDeck(userId);

  try {
    const decks = await prisma.deck.findMany({
      where: { userId },
      include: {
        cards: {
          orderBy: { createdAt: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    console.log('✅ Tìm thấy decks:', decks.length);
    return NextResponse.json({ decks });
  } catch (error: any) {
    console.error('❌ Lỗi lấy decks:', error);
    return NextResponse.json({ error: 'Lỗi lấy danh sách' }, { status: 500 });
  }
}

// POST: Tạo bộ thẻ mới
export async function POST(request: Request) {
  const userId = await getUserId();

  console.log('🔍 Tạo deck - userId:', userId);

  if (!userId) {
    console.error('❌ Unauthorized - không có userId');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, description } = await request.json();

    console.log('📝 Dữ liệu deck:', { title, description, userId });

    if (!title || title.trim() === '') {
      return NextResponse.json({ error: 'Title là bắt buộc' }, { status: 400 });
    }

    const newDeck = await prisma.deck.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        userId
      }
    });

    console.log('✅ Deck tạo thành công:', newDeck.id);
    return NextResponse.json(newDeck);
  } catch (error: any) {
    console.error('❌ Lỗi tạo deck:', error);
    return NextResponse.json({
      error: error.message || 'Lỗi tạo deck',
      details: error.toString()
    }, { status: 500 });
  }
}