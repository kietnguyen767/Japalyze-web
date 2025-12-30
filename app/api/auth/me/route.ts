// app/api/auth/me/route.ts
import { NextResponse } from 'next/server';
import redis from '@/lib/redis';
import prisma from '@/lib/prisma'; // 👈 Thêm Prisma

export async function GET(request: Request) {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Kiểm tra Session trong Redis (Vẫn dùng Redis để check token cho nhanh)
    const userId = await redis.get(`session:${token}`);
    
    if (!userId) {
        return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    // 2. Lấy thông tin User chi tiết từ PostgreSQL (Thay vì Redis user:...)
    // Điều này giúp dữ liệu luôn chuẩn xác (ví dụ vừa lên Premium xong là thấy ngay)
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Trả về user (Prisma tự trả về object, không cần JSON.parse)
    return NextResponse.json({ user });
}