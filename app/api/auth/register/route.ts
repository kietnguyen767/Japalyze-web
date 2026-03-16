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

    // 🔒 KIỂM TRA ĐỘ MẠNH MẬT KHẨU
    // Tối thiểu 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường và 1 số
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json({
        message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.'
      }, { status: 400 });
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
    const userIdString = String(user.id); // Convert to string
    console.log('🔑 Register - Tạo session:', sessionToken.substring(0, 10) + '...');
    console.log('💾 User ID:', user.id, '| Type:', typeof user.id);
    console.log('💾 User ID as String:', userIdString, '| Type:', typeof userIdString);

    const redisKey = `session:${sessionToken}`;
    console.log('💾 Lưu vào Redis - Key:', redisKey, '| Value:', userIdString);

    try {
      const setResult = await redis.set(redisKey, userIdString, { ex: 86400 });
      console.log('✅ redis.set OK - Result:', setResult);

      // Verify ngay lập tức
      const verify = await redis.get(redisKey);
      console.log('🔍 Verify Redis - Retrieved:', verify, '| Expected:', userIdString, '| Match:', verify === userIdString ? '✅' : '❌');
    } catch (redisError) {
      const err = redisError as { message?: string };
      console.error('❌ REDIS ERROR:', err.message);
      throw err;
    }

    return NextResponse.json({
      message: 'Đăng ký thành công',
      user: { ...user, createdAt: user.createdAt.toISOString() },
      token: sessionToken
    }, { status: 201 });
  } catch (error) {
    const err = error as { message?: string };
    console.error('❌ Register API error:', err.message);
    return NextResponse.json({ message: err.message || 'Lỗi server' }, { status: 500 });
  }
}