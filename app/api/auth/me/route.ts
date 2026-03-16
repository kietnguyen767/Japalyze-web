import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import redis from '@/lib/redis';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get('session_token')?.value;

    if (!token) {
        const authHeader = request.headers.get('Authorization');
        if (authHeader) {
            token = authHeader.replace('Bearer ', '');
        }
    }

    // Nếu không có token -> Trả về 401 (AuthContext sẽ hiểu là Khách)
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userIdRaw = await redis.get(`session:${token}`);
    const userId = typeof userIdRaw === 'string' ? userIdRaw : null;
    
    if (!userId) {
        return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            name: true,
            avatar: true,
            role: true,
            isPremium: true,
            currentLevel: true, 
            onboardingCompleted: true,
            // 👇 THÊM DÒNG NÀY: Để AuthContext biết đang ở Phase mấy
            currentPhase: true 
        }
    });

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
    
  } catch (error) {
    console.error("Auth API Error:", error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}