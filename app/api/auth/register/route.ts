//app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma'; // 👈 Dùng Prisma thay Redis
import redis from '@/lib/redis';
import { v4 as uuidv4 } from 'uuid';
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json({ message: 'Thiếu thông tin' }, { status: 400 });
    }

    // Kiểm tra email trong PostgreSQL
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json({ message: 'Email đã tồn tại' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo User mới trong PostgreSQL
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        provider: 'email',
      },
    });

    // 🔥 TẠO SESSION VÀO REDIS (Giống login)
    const sessionToken = uuidv4();
    await redis.setex(`session:${sessionToken}`, 86400, user.id);

    return NextResponse.json({ 
      message: 'Đăng ký thành công',
      user: { ...user, createdAt: user.createdAt.toISOString() },
      token: sessionToken // 👈 Trả về token
    }, { status: 201 });
  } catch (error) {
    console.error('Register Error:', error);
    return NextResponse.json({ message: 'Lỗi server' }, { status: 500 });
  }
}