import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { path } = await request.json();

        // Để đơn giản, ta chỉ track trang chủ ("/") hoặc các trang chính
        // Bạn có thể mở rộng nếu muốn track cụ thể từng trang roadmap
        await prisma.visit.create({
            data: {
                path: path || '/',
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('❌ Error collecting analytics:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
