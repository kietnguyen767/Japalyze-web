// lib/flashcardUtils.ts
import prisma from '@/lib/prisma';
import { SAMPLE_DECKS } from './flashcardData';

/**
 * Đảm bảo người dùng có ít nhất một bộ thẻ mẫu nếu họ chưa có bộ thẻ nào.
 */
export async function ensureSampleDeck(userId: string) {
    try {
        // 0. KIỂM TRA USER TỒN TẠI TRONG DB: Nhằm tránh lỗi Foreign Key P2003 nếu session tồn tại nhưng user đã bị xóa.
        const userExists = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
        if (!userExists) {
            console.warn(`⚠️ User ${userId} not found in database. Skipping sample deck initialization.`);
            return;
        }

        // 1. KIỂM TRA NHANH: Nếu user đã có đủ các bộ thẻ mẫu, bỏ qua.
        const sampleCount = await prisma.deck.count({
            where: {
                userId,
                description: { contains: '[SAMPLE]' }
            }
        });

        // Nếu đã có đủ số lượng mẫu (hoặc tương đương), ta không cần tạo lại.
        if (sampleCount >= SAMPLE_DECKS.length) {
            return;
        }

        console.log(`🚀 Initializing/Syncing sample decks for user ${userId}...`);

        // 2. DỌN DẸP & ĐỒNG BỘ 
        const currentSampleTitles = SAMPLE_DECKS.map(s => s.title);

        // (Logic này thực tế chỉ cần thiết nếu ta muốn "reset" mẫu, 
        // nhưng với deckCount === 0 thì các lệnh delete/update dưới đây sẽ nhanh vì không có data)

        await prisma.deck.deleteMany({
            where: {
                userId,
                description: { contains: '[SAMPLE]' },
                title: { notIn: currentSampleTitles }
            }
        });

        // 3. Tạo các bộ thẻ mẫu (chỉ tạo những bộ chưa có)
        const existingSamples = await prisma.deck.findMany({
            where: { userId, description: { contains: '[SAMPLE]' } },
            select: { title: true }
        });
        const existingTitles = existingSamples.map(s => s.title);

        for (const sample of SAMPLE_DECKS) {
            if (existingTitles.includes(sample.title)) {
                continue; // Bỏ qua nếu đã có
            }

            await prisma.deck.create({
                data: {
                    title: sample.title,
                    description: `[SAMPLE] ${sample.description}`,
                    userId: userId,
                    cards: {
                        create: sample.cards.map(card => ({
                            front: card.front,
                            back: card.back,
                            example: card.example,
                        }))
                    }
                }
            });
        }

        console.log(`✅ Finished ensuring sample decks for user ${userId}`);
    } catch (error) {
        console.error('❌ Error in ensureSampleDeck:', error);
    }
}
