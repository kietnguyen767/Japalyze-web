import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import redis from '@/lib/redis'; // Vẫn dùng Redis để lưu Session
import { v4 as uuidv4 } from 'uuid';
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Tìm user trong DB
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'Sai email hoặc mật khẩu' }, { status: 401 });
    }

    if (user.provider === 'google') {
      return NextResponse.json({ message: 'Vui lòng đăng nhập bằng Google' }, { status: 400 });
    }

    // Check pass
    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) {
      return NextResponse.json({ message: 'Sai email hoặc mật khẩu' }, { status: 401 });
    }

    // ✅ TẠO SESSION VÀO REDIS
    const sessionToken = uuidv4();
    const userIdString = String(user.id); // Convert to string

    console.log('🔑 Tạo session token:', sessionToken);
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
      message: 'Thành công',
      user: { ...user, createdAt: user.createdAt.toISOString() },
      token: sessionToken
    });
  } catch (error) {
    const err = error as { message?: string };
    console.error('❌ Login API error:', err.message);
    return NextResponse.json({ message: err.message || 'Lỗi server' }, { status: 500 });
  }
}