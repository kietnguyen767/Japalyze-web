// lib/flashcardUtils.ts
import prisma from '@/lib/prisma';
import { SAMPLE_DECKS } from './flashcardData';

/**
 * Đảm bảo người dùng có ít nhất một bộ thẻ mẫu nếu họ chưa có bộ thẻ nào.
 */
export async function ensureSampleDeck(userId: string) {
    try {
        // 0. KIỂM TRA NHANH: Nếu user đã có bất kỳ bộ thẻ nào (kể cả mẫu hay tự tạo), bỏ qua.
        // Điều này giúp tránh chạy logic dọn dẹp/cập nhật phức tạp mỗi lần load trang.
        const deckCount = await prisma.deck.count({ where: { userId } });
        if (deckCount > 0) {
            return;
        }

        console.log(`🚀 Initializing sample decks for user ${userId}...`);

        // 1. DỌN DẸP & ĐỒNG BỘ (Chỉ chạy khi deckCount === 0 - trường hợp hiếm hoặc lần đầu)
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

        // 2. Tạo các bộ thẻ mẫu
        for (const sample of SAMPLE_DECKS) {
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
