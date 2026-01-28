import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import redis from '@/lib/redis';

// Thử import dữ liệu, nếu không có thì dùng mảng rỗng để không crash app
let N5_PHASES: any[] = [];
try {
  const dataModule = require('@/lib/data');
  N5_PHASES = dataModule.N5_PHASES;
} catch (e) {
  console.warn("⚠️ Chưa có file lib/data.ts, sử dụng cấu hình mặc định.");
}

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get('session_token')?.value;

    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const userId = await redis.get(`session:${token}`);
    if (!userId || typeof userId !== 'string') {
        return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    // 1. Lấy dữ liệu cơ bản (Dùng Promise.allSettled để nếu 1 cái lỗi cũng không chết cả đám)
    const [translationRes, testRes, deckRes, userRes] = await Promise.allSettled([
        prisma.translationHistory.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 3 }),
        prisma.testResult.findFirst({ where: { userId }, orderBy: { completedAt: 'desc' }, include: { test: true } }),
        prisma.deck.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 4, include: { _count: { select: { cards: true } } } }),
        prisma.user.findUnique({ 
            where: { id: userId }, 
            include: { progress: true } // Cố gắng lấy progress
        })
    ]);

    // Xử lý kết quả trả về an toàn
    const translationHistory = translationRes.status === 'fulfilled' ? translationRes.value : [];
    const testResult = testRes.status === 'fulfilled' ? testRes.value : null;
    const decks = deckRes.status === 'fulfilled' ? deckRes.value : [];
    const user = userRes.status === 'fulfilled' ? userRes.value : null;

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // =========================================================
    // 2. TÍNH TOÁN TIẾN ĐỘ (BỌC TRONG TRY-CATCH ĐỂ KHÔNG BAO GIỜ TREO)
    // =========================================================
    let currentPhase = 1;
    let phasePercentage = 0;
    let totalN5Percentage = 0;

    try {
        if (N5_PHASES.length > 0 && user.progress) {
            const completedQuestIds = new Set(user.progress.map((p: any) => p.questId));
            let totalQuestsN5 = 0;
            let totalCompletedN5 = 0;
            let foundActivePhase = false;

            for (const phase of N5_PHASES) {
                const phaseTotal = phase.quests?.length || 0;
                const phaseCompleted = phase.quests?.filter((q: any) => completedQuestIds.has(q.id)).length || 0;
                
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
            
            // Xử lý trường hợp xong hết
            if (!foundActivePhase && totalQuestsN5 > 0 && totalCompletedN5 === totalQuestsN5) {
                currentPhase = 5;
                phasePercentage = 100;
            }

            totalN5Percentage = totalQuestsN5 > 0 
                ? Math.round((totalCompletedN5 / totalQuestsN5) * 100) 
                : 0;
        }
    } catch (calcError) {
        console.error("⚠️ Lỗi tính toán tiến độ:", calcError);
        // Nếu lỗi thì giữ nguyên mặc định: Phase 1, 0%
    }

    // =========================================================
    // 3. TRẢ VỀ JSON AN TOÀN
    // =========================================================
    return NextResponse.json({
        history: {
            translation: translationHistory.map(t => ({
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
            decks: decks.map(d => ({
                id: d.id,
                title: d.title,
                count: d._count.cards
            }))
        },
        progress: {
            currentLevel: user.currentLevel || null,
            totalN5Percentage: totalN5Percentage,
            currentPhase: currentPhase,
            phasePercentage: phasePercentage
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