// app/api/payment/webhook/route.ts
import { NextResponse } from 'next/server';
import redis from '@/lib/redis';
import prisma from '@/lib/prisma'; // 👈 Thêm Prisma

export async function POST(request: Request) {
  try {
    console.log("--- 📥 WEBHOOK ĐANG CHẠY (PRISMA VERSION) ---");

    const body = await request.json();
    
    // Tạm thời bỏ qua verify để test như bạn yêu cầu
    const webhookData = body.data;

    if (!webhookData) {
        console.error("❌ Không có dữ liệu data");
        return NextResponse.json({ error: 'No data' }, { status: 400 });
    }

    // Kiểm tra code = "00" (Thành công)
    if (body.code == "00") {
        const orderCode = webhookData.orderCode;
        console.log("🔍 OrderCode:", orderCode);

        // 1. Tìm UserID sở hữu đơn hàng này trong Redis
        // (Lưu ý: Ở file create-link, bạn nhớ lưu redis dạng: order_pending:123 = userId nhé)
        const userId = await redis.get(`order_pending:${orderCode}`);
        
        console.log("👤 UserID tìm thấy:", userId);

        if (userId) {
            // 2. CẬP NHẬT DATABASE CHÍNH (POSTGRESQL)
            
            // a. Kích hoạt Premium cho User
            await prisma.user.update({
                where: { id: userId },
                data: { isPremium: true } // PostgreSQL dùng boolean true, không phải string 'true'
            });
            console.log(`✅ Đã update Premium cho user ${userId}`);

            // b. (Tùy chọn) Lưu lịch sử giao dịch vào bảng Payment để đối soát sau này
            // Nếu bạn chưa tạo bảng Payment thì có thể bỏ qua đoạn này, nhưng tôi khuyên nên có
            try {
                await prisma.payment.create({
                    data: {
                        orderCode: orderCode,
                        amount: webhookData.amount,
                        status: 'PAID',
                        userId: userId
                    }
                });
                console.log("✅ Đã lưu lịch sử giao dịch");
            } catch (e) {
                console.log("⚠️ Không lưu được history (có thể do trùng orderCode)", e);
            }

            // 3. Xóa key tạm trong Redis
            await redis.del(`order_pending:${orderCode}`);
            
        } else {
            console.error("❌ Không tìm thấy User cho Order này (Redis expired hoặc lỗi logic)");
        }
    } else {
        console.log("⚠️ Giao dịch thất bại hoặc bị hủy");
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("❌ Webhook Lỗi:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}