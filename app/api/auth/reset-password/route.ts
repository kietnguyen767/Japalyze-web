import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { token, password } = await request.json();

        if (!token || !password) {
            return NextResponse.json({ message: 'Thiếu thông tin' }, { status: 400 });
        }

        // Kiểm tra độ mạnh mật khẩu mới
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            return NextResponse.json({
                message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.'
            }, { status: 400 });
        }

        // Tìm token trong DB
        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
        });

        if (!resetToken || resetToken.expires < new Date()) {
            return NextResponse.json({ message: 'Mã khôi phục không hợp lệ hoặc đã hết hạn' }, { status: 400 });
        }

        // Cập nhật mật khẩu user
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.update({
            where: { email: resetToken.email },
            data: { password: hashedPassword },
        });

        // Xóa token đã dùng
        await prisma.passwordResetToken.delete({
            where: { id: resetToken.id },
        });

        return NextResponse.json({ message: 'Cập nhật mật khẩu thành công!' });

    } catch (error) {
        const err = error as { message?: string };
        console.error('Reset Password Error:', err.message);
        return NextResponse.json({ message: 'Lỗi server' }, { status: 500 });
    }
}
