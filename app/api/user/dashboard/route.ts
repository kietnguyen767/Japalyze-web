import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import redis from '@/lib/redis';
import { N5_WEEKS, N4_WEEKS, N3_WEEKS, N2_WEEKS, N1_WEEKS } from '@/lib/data';

const ROADMAPS: Record<string, any[]> = {
    'N5': N5_WEEKS,
    'N4': N4_WEEKS,
    'N3': N3_WEEKS,
    'N2': N2_WEEKS,
    'N1': N1_WEEKS,
};

interface Quest {
    id: string;
}

interface Phase {
    id: number;
    quests: Quest[];
}

interface Week {
    week: number;
    quests: Quest[];
}

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('session_token')?.value;

        if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const userId = await redis.get(`session:${token}`);
        if (!userId || typeof userId !== 'string') {
            return NextResponse.json({ error: 'Session expired' }, { status: 401 });
        }

        // 1. Lấy dữ liệu cơ bản
        const translationHistory = await prisma.translationHistory.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 3 });
        const testResult = await prisma.testResult.findFirst({ where: { userId }, orderBy: { completedAt: 'desc' }, include: { test: true } });
        const decks = await prisma.deck.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 4, include: { _count: { select: { cards: true } } } });

        // Khởi tạo user
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                currentLevel: true,
                progress: true,
                streakCount: true,
                lastActiveAt: true
            }
        });

        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        // =========================================================
        // 2. TÍNH TOÁN TIẾN ĐỘ & STREAK (BỌC TRONG TRY-CATCH)
        // =========================================================
        let currentPhase = 1;
        let phaseTitle = '';
        let phasePercentage = 0;
        let totalN5Percentage = 0;
        let streakCount = user.streakCount || 0;

        try {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const lastActive = user.lastActiveAt ? new Date(user.lastActiveAt) : null;

            if (!lastActive) {
                // Lần đầu tiên tham gia: Chắc chắn là 1
                streakCount = 1;
                await prisma.user.update({
                    where: { id: userId },
                    data: { streakCount: 1, lastActiveAt: now }
                });
            } else {
                const lastDate = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate());
                const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

                if (diffDays === 1) {
                    // Sang ngày mới: Tăng streak
                    streakCount += 1;
                    await prisma.user.update({
                        where: { id: userId },
                        data: { streakCount, lastActiveAt: now }
                    });
                } else if (diffDays > 1) {
                    // Quá 1 ngày không học: Reset về 1
                    streakCount = 1;
                    await prisma.user.update({
                        where: { id: userId },
                        data: { streakCount: 1, lastActiveAt: now }
                    });
                } else {
                    // Trong cùng một ngày hoặc có lỗi thời gian: Chỉ cập nhật giờ active cuối
                    // Giữ nguyên streakCount hiện tại
                    await prisma.user.update({
                        where: { id: userId },
                        data: { lastActiveAt: now }
                    });
                }
            }

            if (user.progress) {
                // Chỉ lấy bộ ID duy nhất đã hoàn thành
                const completedQuestIds = new Set(user.progress.map((p: any) => p.questId));

                // Lấy lộ trình hiện tại của user
                const currentLevel = user.currentLevel || 'N5';
                const currentRoadmap = ROADMAPS[currentLevel] || [];

                // ── Tính theo Roadmaps ──
                if (currentRoadmap.length > 0) {
                    let totalQuests = 0;
                    let totalCompleted = 0;
                    let foundActiveWeek = false;

                    for (const week of currentRoadmap) {
                        const wTotal = week.quests?.length || 0;
                        const wCompleted = week.quests?.filter((q: any) => completedQuestIds.has(q.id)).length || 0;
                        totalQuests += wTotal;
                        totalCompleted += wCompleted;

                        if (!foundActiveWeek) {
                            if (wCompleted < wTotal) {
                                currentPhase = week.week;
                                phaseTitle = week.title;
                                phasePercentage = wTotal > 0 ? Math.round((wCompleted / wTotal) * 100) : 0;
                                foundActiveWeek = true;
                            } else if (week.week === currentRoadmap.length) {
                                currentPhase = week.week;
                                phaseTitle = week.title;
                                phasePercentage = 100;
                                foundActiveWeek = true;
                            }
                        }
                    }

                    totalN5Percentage = totalQuests > 0
                        ? Math.round((totalCompleted / totalQuests) * 100)
                        : 0;
                }
            }
        } catch (calcError) {
            console.error("⚠️ Lỗi tính toán tiến độ:", calcError);
        }

        // =========================================================
        // 3. TRẢ VỀ JSON AN TOÀN
        // =========================================================
        return NextResponse.json({
            history: {
                translation: translationHistory.map((t: { sourceText: string; targetText: string; createdAt: Date | string }) => ({
                    source: t.sourceText,
                    target: t.targetText,
                    time: new Date(t.createdAt).toLocaleDateString('vi-VN')
                })),
                test: testResult ? {
                    lastScore: testResult.score,
                    total: testResult.totalQuestions,
                    name: testResult.test.title,
                    date: new Date(testResult.completedAt).toLocaleDateString('vi-VN')
                } : null,
                decks: decks.map((d: { id: string; title: string; _count: { cards: number } }) => ({
                    id: d.id,
                    title: d.title,
                    count: d._count.cards
                }))
            },
            progress: {
                currentLevel: user.currentLevel || null,
                totalN5Percentage: totalN5Percentage,
                currentPhase: currentPhase,
                phaseTitle: phaseTitle,
                phasePercentage: phasePercentage,
                streakDays: streakCount
            }
        });

    } catch (error) {
        console.error("Dashboard API Critical Error:", error);
        // Vẫn trả về JSON rỗng để Frontend không bị treo
        return NextResponse.json({
            history: { translation: [], decks: [], test: null },
            progress: { currentLevel: null, totalN5Percentage: 0, currentPhase: 1, phaseTitle: '', phasePercentage: 0, streakDays: 0 }
        });
    }
}