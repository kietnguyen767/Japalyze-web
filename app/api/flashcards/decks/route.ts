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
      _count: {
        cards: s.cards.length
      },
      learnedCount: 0, // Mặc định 0 cho mẫu khi chưa login
      cards: []
    }));
    return NextResponse.json({ decks: formattedSamples });
  }

  // Đảm bảo có deck mẫu nếu user đã đăng nhập nhưng chưa có gì
  const { ensureSampleDeck } = await import('@/lib/flashcardUtils');
  await ensureSampleDeck(userId);

  try {
    // Lấy decks kèm theo count cards
    const decks = await prisma.deck.findMany({
      where: { userId },
      include: {
        _count: {
          select: { cards: true }
        },
        // Ta không lấy cards, nhưng muốn lấy số card đã learned
        // Prisma không hỗ trợ đếm filter trực tiếp trong include dễ dàng ở bản cũ hoặc tùy setup, 
        // nhưng ta có thể dùng một query riêng hoặc chấp nhận query thô hơn.
        // Cách tối ưu: dùng select
      },
      orderBy: { createdAt: 'desc' }
    });

    // Để lấy learnedCount, ta cần chạy thêm 1 query aggregate hoặc map (nhưng map sẽ chậm nếu dùng prisma gọi nhiều lần)
    // Thay vào đó, ta fetch card count có điều kiện:
    const decksWithLearned = await Promise.all(decks.map(async (deck: any) => {
      const learned = await prisma.card.count({
        where: {
          deckId: deck.id,
          isLearned: true
        }
      });
      return {
        ...deck,
        learnedCount: learned
      };
    }));

    console.log('✅ Tìm thấy decks:', decksWithLearned.length);
    return NextResponse.json({ decks: decksWithLearned });
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