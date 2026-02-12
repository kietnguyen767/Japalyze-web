'use server'

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. Lấy lịch sử dịch (Giống logic trong Dashboard của bạn nhưng chỉ lấy 10 dòng mới nhất)
export async function getTranslationHistory(userId: string) {
    if (!userId) return { success: false, data: [] };

    try {
        const history = await prisma.translationHistory.findMany({
            where: { userId: userId }, // Lọc theo User đang đăng nhập
            take: 10,
            orderBy: { createdAt: 'desc' },
        });
        return { success: true, data: history };
    } catch (error) {
        console.error("Lỗi lấy history:", error);
        return { success: false, data: [] };
    }
}

// 2. Lấy từ vựng ngẫu nhiên cho Dashboard (Khi chưa dịch)
export async function getDashboardVocabulary() {
    try {
        // Helper function để lấy từ theo loại (PosTag)
        const getWords = async (tag: string) => {
            // Lưu ý: Prisma raw query dùng random() sẽ tối ưu hơn nếu DB lớn, 
            // nhưng ở đây dùng findMany skip/take đơn giản để demo.
            const count = await prisma.dictionaryEntry.count({ where: { posTag: { contains: tag }, meaningVi: { not: null } } });
            const skip = Math.floor(Math.random() * (count > 4 ? count - 4 : 0));

            return await prisma.dictionaryEntry.findMany({
                where: { posTag: { contains: tag }, meaningVi: { not: null } },
                take: 4,
                skip: skip,
                select: { id: true, lemma: true, meaningVi: true, romaji: true, posTag: true }
            });
        };

        const [nouns, verbs, adjs, others] = await Promise.all([
            getWords('n'),   // Danh từ
            getWords('v'),   // Động từ
            getWords('adj'), // Tính từ
            getWords('exp')  // Cụm từ/Khác
        ]);

        return {
            success: true,
            data: { nouns, verbs, adjs, others }
        };
    } catch (error) {
        return { success: false, data: null };
    }
}