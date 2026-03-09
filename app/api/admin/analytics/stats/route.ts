//app/api/admin/analytics/stats/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserId } from '@/lib/get-user';

export async function GET() {
    const userId = await getUserId();

    // Kiểm tra quyền admin (Cần check role trong user model)
    const user = await prisma.user.findUnique({
        where: { id: userId || '' },
        select: { role: true }
    });

    if (!user || user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // 1. Tính toán mốc thời gian: Thứ 2 của tuần này
        const now = new Date();
        const day = now.getDay(); // 0 is Sunday, 1 is Monday...
        const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday

        const monday = new Date(now.setDate(diff));
        monday.setHours(0, 0, 0, 0);

        // 2. Fetch toàn bộ visit từ Thứ 2 để làm biểu đồ tuần
        const weeklyVisits = await prisma.visit.findMany({
            where: {
                timestamp: {
                    gte: monday
                }
            },
            orderBy: { timestamp: 'asc' }
        });

        // 3. Fetch tổng lượt truy cập mọi lúc (hoặc bạn có thể giới hạn tùy ý)
        const totalVisitsCount = await prisma.visit.count();

        // 4. Phân nhóm theo ngày (Thứ 2 -> Chủ Nhật)
        const dayNames = [
            'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'
        ];

        const chartData = dayNames.map((dayName, index) => {
            const dayDate = new Date(monday);
            dayDate.setDate(monday.getDate() + index);

            // Sử dụng định dạng YYYY-MM-DD theo giờ địa phương để so sánh chính xác
            const dayString = dayDate.toLocaleDateString('en-CA'); // Trả về 'YYYY-MM-DD'

            // Format ngày hiển thị (VD: 09/03)
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
                totalVisits: totalVisitsCount
            },
            chartData
        });
    } catch (error) {
        console.error('❌ Error fetching analytics stats:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
