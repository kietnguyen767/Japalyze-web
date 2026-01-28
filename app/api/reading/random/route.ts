import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Lấy bài N5/Beginner để làm thử thách
    const articles = await prisma.readingArticle.findMany({
      where: { 
        OR: [{ level: 'N5' }, { level: 'Beginner' }] 
      },
      select: {
        id: true, title: true, content: true, 
        contentRomaji: true, contentMeaning: true, level: true
      }
    });

    // Nếu không có bài nào thì tạo bài giả để test
    if (!articles || articles.length === 0) {
      return NextResponse.json([
        { id: 'mock1', title: 'Jiko Shoukai', level: 'N5', content: 'はじめまして。 わたしは トゥアン です。 ベトナム から きました。' },
        { id: 'mock2', title: 'Suki na mono', level: 'N5', content: 'わたしは コーヒー が すきです。 まいにち のみます。' }
      ]);
    }

    // Trộn ngẫu nhiên
    const shuffled = articles.sort(() => 0.5 - Math.random());
    return NextResponse.json(shuffled.slice(0, 5)); // Lấy 5 bài
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}