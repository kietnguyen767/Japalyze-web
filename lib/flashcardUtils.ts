// lib/flashcardUtils.ts
import prisma from '@/lib/prisma';
import { SAMPLE_DECKS } from './flashcardData';

/**
 * Đảm bảo người dùng có ít nhất một bộ thẻ mẫu nếu họ chưa có bộ thẻ nào.
 */
export async function ensureSampleDeck(userId: string) {
    try {
        // 0. DỌN DẸP: Xóa các bộ thẻ mẫu cũ không còn nằm trong danh sách SAMPLE_DECKS hiện tại
        const currentSampleTitles = SAMPLE_DECKS.map(s => s.title);

        await prisma.deck.deleteMany({
            where: {
                userId,
                description: { contains: '[SAMPLE]' },
                title: { notIn: currentSampleTitles }
            }
        });

        // 1. Gắn nhãn lại cho các bộ thẻ đã tồn tại nhưng có tiêu đề trùng với bộ mẫu mới
        // (Bao gồm cả các bộ mẫu cũ bạn đã tạo trước đây)
        for (const sample of SAMPLE_DECKS) {
            await prisma.deck.updateMany({
                where: {
                    userId,
                    title: sample.title,
                    NOT: {
                        description: { contains: '[SAMPLE]' }
                    }
                },
                data: {
                    description: `[SAMPLE] ${sample.description}`
                }
            });
        }

        // 2. Tìm danh sách các tiêu đề mẫu đã có (đã gắn tag) của User
        const existingSamples = await prisma.deck.findMany({
            where: {
                userId,
                description: { contains: '[SAMPLE]' }
            },
            select: { title: true }
        });

        const existingTitles = existingSamples.map(d => d.title);

        // 3. Tạo các bộ thẻ mẫu CHƯA CÓ
        const decksToCreate = SAMPLE_DECKS.filter(s => !existingTitles.includes(s.title));

        if (decksToCreate.length === 0) {
            return;
        }

        console.log(`🚀 Creating ${decksToCreate.length} new sample decks for user ${userId}...`);

        for (const sample of decksToCreate) {
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
