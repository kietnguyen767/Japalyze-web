import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import redis from '@/lib/redis';
import { N5_PHASES, N5_WEEKS } from '@/lib/data';

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
                const completedQuestIds = new Set(user.progress.map(p => (p as any).questId));

                // Lấy tất cả ID hợp lệ của lộ trình N5 để lọc
                const allOfficialN5QuestIds = new Set(N5_WEEKS.flatMap(w => w.quests.map(q => q.id)));
                const officialCompletedIds = new Set([...completedQuestIds].filter(id => allOfficialN5QuestIds.has(id)));

                // ── Tính theo N5_WEEKS ──
                if (N5_WEEKS.length > 0) {
                    let totalQuestsN5 = 0;
                    let totalCompletedN5 = 0;
                    let foundActiveWeek = false;

                    for (const week of N5_WEEKS) {
                        const wTotal = week.quests?.length || 0;
                        const wCompleted = week.quests?.filter((q) => completedQuestIds.has(q.id)).length || 0;
                        totalQuestsN5 += wTotal;
                        totalCompletedN5 += wCompleted;

                        if (!foundActiveWeek) {
                            if (wCompleted < wTotal) {
                                currentPhase = week.week; // reuse currentPhase field for week number
                                phasePercentage = wTotal > 0 ? Math.round((wCompleted / wTotal) * 100) : 0;
                                foundActiveWeek = true;
                            } else if (week.week === N5_WEEKS.length) {
                                currentPhase = week.week;
                                phasePercentage = 100;
                                foundActiveWeek = true;
                            }
                        }
                    }

                    totalN5Percentage = totalQuestsN5 > 0
                        ? Math.round((totalCompletedN5 / totalQuestsN5) * 100)
                        : 0;

                    // ── Fallback về N5_PHASES nếu chưa có N5_WEEKS ──
                } else if (N5_PHASES.length > 0) {
                    let totalQuestsN5 = 0;
                    let totalCompletedN5 = 0;
                    let foundActivePhase = false;

                    for (const phase of N5_PHASES) {
                        const phaseTotal = phase.quests?.length || 0;
                        const phaseCompleted = phase.quests?.filter((q: { id: string }) => completedQuestIds.has(q.id)).length || 0;
                        totalQuestsN5 += phaseTotal;
                        totalCompletedN5 += phaseCompleted;

                        if (!foundActivePhase) {
                            if (phaseCompleted < phaseTotal) {
                                currentPhase = phase.id;
                                phasePercentage = phaseTotal > 0 ? Math.round((phaseCompleted / phaseTotal) * 100) : 0;
                                foundActivePhase = true;
                            } else if (phase.id === N5_PHASES.length) {
                                currentPhase = phase.id;
                                phasePercentage = 100;
                                foundActivePhase = true;
                            }
                        }
                    }
                    totalN5Percentage = totalQuestsN5 > 0
                        ? Math.round((totalCompletedN5 / totalQuestsN5) * 100)
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
                phasePercentage: phasePercentage,
                streakDays: streakCount
            }
        });

    } catch (error) {
        console.error("Dashboard API Critical Error:", error);
        // Vẫn trả về JSON rỗng để Frontend không bị treo
        return NextResponse.json({
            history: { translation: [], decks: [], test: null },
            progress: { currentLevel: null, totalN5Percentage: 0, currentPhase: 1, phasePercentage: 0 }
        });
    }
}