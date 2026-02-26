import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import redis from '@/lib/redis';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('session_token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = await redis.get(`session:${token}`);
        if (!userId || typeof userId !== 'string') {
            return NextResponse.json({ error: 'Session expired' }, { status: 401 });
        }

        const { oldPassword, newPassword } = await request.json();

        if (!oldPassword || !newPassword) {
            return NextResponse.json({ message: 'Vui lòng nhập đầy đủ thông tin' }, { status: 400 });
        }

        // Lấy user từ DB
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user || user.provider === 'google') {
            return NextResponse.json({ message: 'Tài khoản Google không cần đổi mật khẩu' }, { status: 400 });
        }

        // Kiểm tra mật khẩu cũ
        const isMatch = await bcrypt.compare(oldPassword, user.password || "");
        if (!isMatch) {
            return NextResponse.json({ message: 'Mật khẩu cũ không chính xác' }, { status: 401 });
        }

        // Kiểm tra độ mạnh mật khẩu mới
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            return NextResponse.json({
                message: 'Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.'
            }, { status: 400 });
        }

        // Cập nhật mật khẩu mới
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });

        return NextResponse.json({ success: true, message: 'Đổi mật khẩu thành công!' });

    } catch (error) {
        console.error("Change Password Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
