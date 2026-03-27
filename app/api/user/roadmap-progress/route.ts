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

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('session_token')?.value;

        if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const userId = await redis.get(`session:${token}`);
        if (!userId || typeof userId !== 'string') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { questId } = await req.json();
        if (!questId) return NextResponse.json({ error: 'Quest ID is required' }, { status: 400 });

        // Mark as completed
        await prisma.userProgress.upsert({
            where: {
                userId_questId: {
                    userId,
                    questId,
                },
            },
            create: {
                userId,
                questId,
            },
            update: {}, // No change if already exists
        });

        // Optional: Update streak or points here if needed, 
        // but for now just completion is enough as requested.

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Roadmap progress POST error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
