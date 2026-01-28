import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import redis from '@/lib/redis';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;
    const userId = await redis.get(`session:${token}`);

    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { questId } = await request.json();

    if (!questId) return NextResponse.json({ error: 'Missing questId' }, { status: 400 });

    // Lưu vào DB (dùng upsert hoặc create với catch error unique)
    // Ở đây dùng create đơn giản, nếu trùng nó sẽ throw error (ta catch bỏ qua)
    try {
        await prisma.userProgress.create({
            data: {
                userId: userId as string,
                questId: questId
            }
        });
    } catch (e) {
        // Nếu lỗi do đã tồn tại (Unique constraint) thì bỏ qua, coi như thành công
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}