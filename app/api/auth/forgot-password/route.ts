import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ message: 'Vui lòng nhập email' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            // Vì lý do bảo mật, không báo lỗi "Email không tồn tại"
            return NextResponse.json({ message: 'Nếu email tồn tại trong hệ thống, bạn sẽ nhận được mã khôi phục.' });
        }

        // Tạo token khôi phục
        const token = uuidv4();
        const expires = new Date(Date.now() + 3600000); // 1 giờ sau

        // Lưu vào DB
        await prisma.passwordResetToken.create({
            data: {
                email,
                token,
                expires,
            },
        });

        // 📧 GIẢ LẬP GỬI EMAIL (In ra console)
        console.log('\n==========================================');
        console.log('📧 THÔNG BÁO KHÔI PHỤC MẬT KHẨU');
        console.log('Người gửi: JapaLyze Auth Service');
        console.log(`Người nhận: ${email}`);
        console.log(`Link: http://localhost:3000/reset-password?token=${token}`);
        console.log('==========================================\n');

        return NextResponse.json({
            message: 'Nếu email tồn tại trong hệ thống, bạn sẽ nhận được mã khôi phục.'
        });

    } catch (error) {
        console.error('Forgot Password Error:', error);
        return NextResponse.json({ message: 'Lỗi server' }, { status: 500 });
    }
}
