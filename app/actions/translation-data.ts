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
        // Helper function để lấy từ theo loại (PosTag) bằng Raw SQL để ngẫu nhiên nhanh hơn
        const getWords = async (tag: string) => {
            try {
                // Sử dụng TABLESAMPLE hoặc ORDER BY RANDOM() để lấy dữ liệu ngẫu nhiên nhanh
                // PostgreSQL: ORDER BY RANDOM() nhanh vừa đủ cho bảng cỡ này
                return await prisma.$queryRaw`
                    SELECT id, lemma, "meaningVi", romaji, "posTag"
                    FROM "DictionaryEntry"
                    WHERE "posTag" LIKE ${'%' + tag + '%'} 
                      AND "meaningVi" IS NOT NULL
                    ORDER BY RANDOM()
                    LIMIT 4
                `;
            } catch (e) {
                console.error(`Lỗi lấy từ random (${tag}):`, e);
                return [];
            }
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