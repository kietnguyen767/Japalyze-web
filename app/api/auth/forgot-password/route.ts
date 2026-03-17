import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { resend } from '@/lib/resend';
import { headers } from 'next/headers';

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

        // Lấy host để tạo link động
        const headersList = await headers();
        const host = headersList.get('host') || 'localhost:3000';
        const protocol = host.includes('localhost') ? 'http' : 'https';
        const resetLink = `${protocol}://${host}/reset-password?token=${token}`;

        // 📧 GỬI EMAIL THẬT QUA RESEND
        if (resend) {
            try {
                await resend.emails.send({
                    from: 'JapaLyze <onboarding@resend.dev>', // Dùng mặc định của resend nếu chưa verify domain
                    to: email,
                    subject: '[JapaLyze] Khôi phục mật khẩu',
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
                            <h2 style="color: #4f46e5; text-align: center;">Khôi phục mật khẩu</h2>
                            <p>Chào bạn,</p>
                            <p>Chúng tôi nhận được yêu cầu khôi phục mật khẩu cho tài khoản JapaLyze của bạn. Nhấn vào nút bên dưới để đặt lại mật khẩu của mình:</p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${resetLink}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                                    Đặt lại mật khẩu
                                </a>
                            </div>
                            <p>Link này sẽ hết hạn trong 1 giờ. Nếu bạn không yêu cầu điều này, hãy bỏ qua email này.</p>
                            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                            <p style="color: #64748b; font-size: 12px; text-align: center;">JapaLyze - Học tiếng Nhật thông minh</p>
                        </div>
                    `,
                });
            } catch (emailError) {
                console.error('Lỗi khi gửi email (Resend):', emailError);
                // Back up log console cho dev
                console.log(`Reset Link for ${email}: ${resetLink}`);
            }
        } else {
            console.warn('Email không được gửi vì chưa cấu hình RESEND_API_KEY');
            console.log(`Reset Link for ${email}: ${resetLink}`);
        }

        return NextResponse.json({
            message: 'Nếu email tồn tại trong hệ thống, bạn sẽ nhận được mã khôi phục.'
        });

    } catch (error) {
        console.error('Forgot Password Error:', error);
        return NextResponse.json({ message: 'Lỗi server' }, { status: 500 });
    }
}


