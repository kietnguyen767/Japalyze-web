//app/api/admin/analytics/stats/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserId } from '@/lib/get-user';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const offset = parseInt(searchParams.get('offset') || '0');

    const userId = await getUserId();

    // Kiểm tra quyền admin
    const user = await prisma.user.findUnique({
        where: { id: userId || '' },
        select: { role: true }
    });

    if (!user || user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // 1. Tính toán mốc thời gian: Thứ 2 của tuần được yêu cầu (dựa trên offset)
        const now = new Date();
        const day = now.getDay(); // 0 is Sunday, 1 is Monday...
        const diff = now.getDate() - day + (day === 0 ? -6 : 1) + (offset * 7); // Adjust to Monday + offset weeks

        const targetMonday = new Date(now.setDate(diff));
        targetMonday.setHours(0, 0, 0, 0);

        const targetSunday = new Date(targetMonday);
        targetSunday.setDate(targetMonday.getDate() + 6);
        targetSunday.setHours(23, 59, 59, 999);

        // 2. Fetch visit trong khoảng từ Thứ 2 đến Chủ Nhật của tuần đó
        const weeklyVisits = await prisma.visit.findMany({
            where: {
                timestamp: {
                    gte: targetMonday,
                    lte: targetSunday
                }
            },
            orderBy: { timestamp: 'asc' }
        });

        // 3. Fetch tổng lượt truy cập mọi lúc
        const totalVisitsCount = await prisma.visit.count();

        // 4. Phân nhóm theo ngày (Thứ 2 -> Chủ Nhật)
        const dayNames = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

        const chartData = dayNames.map((dayName, index) => {
            const dayDate = new Date(targetMonday);
            dayDate.setDate(targetMonday.getDate() + index);

            const dayString = dayDate.toLocaleDateString('en-CA');
            const displayDate = `${dayDate.getDate().toString().padStart(2, '0')}/${(dayDate.getMonth() + 1).toString().padStart(2, '0')}`;

            const count = weeklyVisits.filter((v: any) => {
                const vDate = new Date(v.timestamp).toLocaleDateString('en-CA');
                return vDate === dayString;
            }).length;

            return {
                name: dayName,
                date: displayDate,
                visits: count
            };
        });

        return NextResponse.json({
            summary: {
                totalVisits: totalVisitsCount,
                range: {
                    start: targetMonday.toISOString(),
                    end: targetSunday.toISOString()
                }
            },
            chartData
        });
    } catch (error) {
        console.error('❌ Error fetching analytics stats:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
