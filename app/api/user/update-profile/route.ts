import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import redis from '@/lib/redis';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // 1. Lấy token từ Cookie (Ưu tiên) hoặc Header
    const cookieStore = await cookies();
    let token = cookieStore.get('session_token')?.value;

    if (!token) {
        const authHeader = request.headers.get('Authorization');
        if (authHeader) token = authHeader.replace('Bearer ', '');
    }

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Check Redis
    const userId = await redis.get(`session:${token}`);
    if (!userId || typeof userId !== 'string') {
        return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    // 3. Lấy dữ liệu gửi lên (Level)
    const body = await request.json();
    const { currentLevel, onboardingCompleted } = body;

    // 4. Cập nhật vào DB
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            currentLevel: currentLevel,
            onboardingCompleted: onboardingCompleted === true // Đảm bảo là boolean
        }
    });

    return NextResponse.json({ success: true, user: updatedUser });

  } catch (error) {
    console.error("Update Profile Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}