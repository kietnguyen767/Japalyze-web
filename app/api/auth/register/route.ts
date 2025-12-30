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
    const userIdString = String(user.id); // Convert to string
    console.log('🔑 Register - Tạo session:', sessionToken.substring(0, 10) + '...');
    console.log('💾 User ID:', user.id, '| Type:', typeof user.id);
    console.log('💾 User ID as String:', userIdString, '| Type:', typeof userIdString);
    
    const redisKey = `session:${sessionToken}`;
    console.log('💾 Lưu vào Redis - Key:', redisKey, '| Value:', userIdString);
    
    try {
      const setResult = await redis.setex(redisKey, 86400, userIdString);
      console.log('✅ redis.setex OK - Result:', setResult);
      
      // Verify ngay lập tức
      const verify = await redis.get(redisKey);
      console.log('🔍 Verify Redis - Retrieved:', verify, '| Expected:', userIdString, '| Match:', verify === userIdString ? '✅' : '❌');
    } catch (redisError: any) {
      console.error('❌ REDIS ERROR:', redisError.message);
      throw redisError;
    }

    return NextResponse.json({ 
      message: 'Đăng ký thành công',
      user: { ...user, createdAt: user.createdAt.toISOString() },
      token: sessionToken
    }, { status: 201 });
  } catch (error) {
    console.error('Register Error:', error);
    return NextResponse.json({ message: 'Lỗi server' }, { status: 500 });
  }
}