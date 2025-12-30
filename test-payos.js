// test-payos.js
require('dotenv').config({ path: '.env.local' }); // Load biến môi trường
const PayOS = require('@payos/node').PayOS;

// Log ra xem có lấy được key không
console.log("Client ID:", process.env.PAYOS_CLIENT_ID);

try {
    // Thử khởi tạo
    const payOS = new PayOS(
        process.env.PAYOS_CLIENT_ID,
        process.env.PAYOS_API_KEY,
        process.env.PAYOS_CHECKSUM_KEY
    );
    console.log("✅ Khởi tạo PayOS thành công!");

    // 🔥 KIỂM TRA BÊN TRONG paymentRequests CÓ GÌ
    console.log("🔍 Kiểm tra payOS.paymentRequests:");
    const service = payOS.paymentRequests;
    
    // In ra các hàm có trong đó
    console.log(Object.getPrototypeOf(service));

    // Thử tạo link
    const body = {
        orderCode: Number(String(Date.now()).slice(-6)),
        amount: 2000,
        description: "Test PayOS",
        cancelUrl: "http://localhost:3000",
        returnUrl: "http://localhost:3000"
    };

    payOS.createPaymentLink(body)
        .then(res => {
            console.log("🎉 TẠO LINK THÀNH CÔNG:", res.checkoutUrl);
        })
        .catch(err => {
            console.error("❌ Lỗi tạo link:", err);
        });

} catch (error) {
    console.error("❌ Lỗi khởi tạo:", error);
}