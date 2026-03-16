// app/api/payment/create-link/route.ts
import { NextResponse } from 'next/server';
import payOS from '@/lib/payos';
import redis from '@/lib/redis';

export async function POST(request: Request) {
  try {
    // 1. Lấy Session Token từ Header (Authorization) hoặc Cookie
    // Frontend nên gửi header: "Authorization": "Bearer <token>"
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    // Nếu không có token ở header, thử tìm trong Cookie (dự phòng)
    // const token = request.cookies.get('session_token')?.value; 

    if (!token) {
      return NextResponse.json({ error: 'Bạn chưa đăng nhập (Thiếu Token)' }, { status: 401 });
    }

    // 2. Lấy UserID từ Redis Session (Cực nhanh)
    const userId = await redis.get(`session:${token}`);

    if (!userId) {
      return NextResponse.json({ error: 'Phiên đăng nhập hết hạn' }, { status: 401 });
    }

    // 3. Tạo mã đơn hàng ngẫu nhiên (hoặc dùng Time)
    const orderCode = Number(String(Date.now()).slice(-6));

    // 4. Tạo Payment Link với PayOS
    const paymentData = {
      orderCode: orderCode,
      amount: 59000,
      description: `Premium 1 thang`,
      // Nhớ dùng biến môi trường cho đúng domain thật / localhost
      cancelUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/?status=cancelled`,
      returnUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/payment-success`,
    };

    const paymentLink = await payOS.paymentRequests.create(paymentData);

    // 5. 🔥 QUAN TRỌNG: Lưu UserID vào Redis để Webhook biết đơn này của ai
    // Key: order_pending:123456 -> Value: user-uuid-tu-supabase
    await redis.setex(`order_pending:${orderCode}`, 1800, userId);

    return NextResponse.json({
      success: true,
      checkoutUrl: paymentLink.checkoutUrl
    });

  } catch (error: any) {
    console.error("Create Link Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}