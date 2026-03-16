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

        // 📧 XỬ LÝ GỬI EMAIL
        const resetLink = `${process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'}/reset-password?token=${token}`;

        if (process.env.RESEND_API_KEY) {
            try {
                const { Resend } = await import('resend');
                const resend = new Resend(process.env.RESEND_API_KEY);

                await resend.emails.send({
                    from: 'JapaLyze <onboarding@resend.dev>',
                    to: email,
                    subject: 'Khôi phục mật khẩu JapaLyze',
                    html: `
                        <h1>Khôi phục mật khẩu</h1>
                        <p>Bạn đã yêu cầu khôi phục mật khẩu cho tài khoản JapaLyze.</p>
                        <p>Nhấn vào liên kết bên dưới để thiết lập mật khẩu mới (hết hạn trong 1 giờ):</p>
                        <a href="${resetLink}" style="padding: 10px 20px; background: #2563eb; color: white; text-decoration: none; border-radius: 8px;">Đặt lại mật khẩu</a>
                        <p>Nếu không phải bạn yêu cầu, hãy bỏ qua email này.</p>
                    `
                });
                console.log(`✅ Real email sent to ${email} via Resend`);
            } catch (resendError) {
                console.error('❌ Resend API Error:', resendError);
                // Vẫn tiếp tục để không làm treo flow người dùng, họ có thể check log terminal nếu là dev
            }
        } else {
            // 📧 GIẢ LẬP GỬI EMAIL (In ra console khi chưa có Resend)
            console.log('\n==========================================');
            console.log('📧 THÔNG BÁO KHÔI PHỤC MẬT KHẨU (DEVELOPMENT)');
            console.log(`Người nhận: ${email}`);
            console.log(`Link: ${resetLink}`);
            console.log('==========================================\n');
        }

        return NextResponse.json({
            message: 'Nếu email tồn tại trong hệ thống, bạn sẽ nhận được mã khôi phục.'
        });

    } catch (error) {
        const err = error as { message?: string };
        console.error('Forgot Password Error:', err.message);
        return NextResponse.json({ message: 'Lỗi server' }, { status: 500 });
    }
}
