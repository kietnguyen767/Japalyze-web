import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // 1. Lấy ngẫu nhiên từ vựng theo từng loại
        // Lưu ý: Prisma chưa hỗ trợ ORDER BY RANDOM() trực tiếp một cách đa nền tảng tốt nhất
        // Nhưng với PostgreSQL (Supabase), ta có thể dùng raw query hoặc lấy mẫu rồi xáo trộn.
        // Để tối ưu hiệu năng, ta sẽ lấy một số lượng bản ghi nhất định rồi random ở code.

        const [nouns, verbs, adjs, others] = await Promise.all([
            prisma.dictionaryEntry.findMany({
                where: { posTag: { contains: 'n' } },
                take: 30,
                orderBy: { updatedAt: 'desc' }
            }),
            prisma.dictionaryEntry.findMany({
                where: { OR: [{ posTag: { contains: 'v' } }, { posTag: { contains: 'v1' } }, { posTag: { contains: 'v5' } }] },
                take: 30,
                orderBy: { updatedAt: 'desc' }
            }),
            prisma.dictionaryEntry.findMany({
                where: { posTag: { contains: 'adj' } },
                take: 30,
                orderBy: { updatedAt: 'desc' }
            }),
            prisma.dictionaryEntry.findMany({
                where: {
                    NOT: [
                        { posTag: { contains: 'n' } },
                        { posTag: { contains: 'v' } },
                        { posTag: { contains: 'adj' } }
                    ]
                },
                take: 30,
                orderBy: { updatedAt: 'desc' }
            })
        ]);

        // Hàm xáo trộn mảng
        const shuffleArray = (array: any[]) => {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };

        // Lấy tối đa 4 từ mỗi loại sau khi xáo trộn
        const pickRandom = (arr: any[], count: number) => shuffleArray(arr).slice(0, count);

        return NextResponse.json({
            success: true,
            data: {
                nouns: pickRandom(nouns, 4),
                verbs: pickRandom(verbs, 4),
                adjs: pickRandom(adjs, 4),
                others: pickRandom(others, 4)
            }
        });

    } catch (error) {
        console.error('Error in random-vocabulary API:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
