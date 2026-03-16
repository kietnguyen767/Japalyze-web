import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import redis from '@/lib/redis';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('session_token')?.value;

        if (!token) return NextResponse.json({ completedQuestIds: [] }, { status: 200 });

        const userId = await redis.get(`session:${token}`);
        if (!userId || typeof userId !== 'string') {
            return NextResponse.json({ completedQuestIds: [] }, { status: 200 });
        }

        const progress = await prisma.userProgress.findMany({
            where: { userId },
            select: { questId: true },
        });

        const completedQuestIds = progress.map((p: any) => p.questId);

        return NextResponse.json({ completedQuestIds });
    } catch (error) {
        console.error('Roadmap progress API error:', error);
        return NextResponse.json({ completedQuestIds: [] }, { status: 200 });
    }
}
