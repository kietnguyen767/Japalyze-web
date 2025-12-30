// app/api/user/premium/route.ts
import { NextResponse } from 'next/server';
import redis from '@/lib/redis';
import prisma from '@/lib/prisma'; // 👈 Thêm Prisma
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  try {
    const { email, action } = await request.json(); // action: 'trial' | 'buy_1_month'

    if (!email) return NextResponse.json({ error: 'Thiếu email' }, { status: 400 });

    // Key đánh dấu đã dùng thử (Vẫn lưu Redis để check cho nhanh)
    const trialUsedKey = `user_trial_used:${email}`;

    // --- LOGIC 1: DÙNG THỬ 7 NGÀY ---
    if (action === 'trial') {
      // 1. Kiểm tra xem user này có tồn tại trong DB không
      const user = await prisma.user.findUnique({
         where: { email }
      });

      if (!user) {
         return NextResponse.json({ error: 'User chưa đăng ký tài khoản' }, { status: 404 });
      }

      // 2. Kiểm tra Redis xem đã dùng thử chưa
      const hasUsedTrial = await redis.get(trialUsedKey);
      
      // Hoặc nếu user đã là Premium rồi thì thôi
      if (hasUsedTrial || user.isPremium) {
        return NextResponse.json({ error: 'Bạn đã dùng hết lượt trải nghiệm hoặc đã là VIP!' }, { status: 403 });
      }

      // 3. Kích hoạt Premium trong PostgreSQL
      // ⚠️ LƯU Ý: Postgres không tự hết hạn. Bạn sẽ cần tắt thủ công sau 7 ngày hoặc dùng Cron Job sau này.
      await prisma.user.update({
         where: { email },
         data: { isPremium: true }
      });

      // 4. Đánh dấu đã dùng thử vào Redis (Lưu vĩnh viễn để không hack được)
      await redis.set(trialUsedKey, 'true');

      return NextResponse.json({ success: true, message: 'Kích hoạt 7 ngày dùng thử thành công!' });
    }

    // --- LOGIC 2: MUA GÓI 1 THÁNG (Dành cho test thủ công hoặc API cũ) ---
    // (Lưu ý: Luồng thanh toán thật bây giờ chạy qua Webhook, đây chỉ là API phụ trợ)
    if (action === 'buy_1_month') {
       
       // Update thẳng vào DB
       await prisma.user.update({
          where: { email },
          data: { isPremium: true }
       });

      return NextResponse.json({ success: true, message: 'Nâng cấp gói 1 tháng thành công!' });
    }

    return NextResponse.json({ error: 'Hành động không hợp lệ' }, { status: 400 });

  } catch (error) {
    console.error("Premium API Error:", error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}