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

    // ✅ TẠO SESSION VÀO REDIS (Giữ nguyên cơ chế session cũ của bạn)
    // Lý do: Redis nhanh hơn DB cho việc check session mỗi lần load trang
    const sessionToken = uuidv4();
    // Lưu session trỏ về User ID (thay vì email như cũ để chuẩn hơn, hoặc giữ email tùy bạn)
    // Ở đây tôi trỏ về ID để sau này query DB cho dễ
    await redis.setex(`session:${sessionToken}`, 86400, user.id);

    return NextResponse.json({ 
        message: 'Thành công', 
        user: { ...user, createdAt: user.createdAt.toISOString() },
        token: sessionToken // Trả token về để client lưu cookie (nếu cần)
    });
  } catch (error) {
    return NextResponse.json({ message: 'Lỗi server' }, { status: 500 });
  }
}