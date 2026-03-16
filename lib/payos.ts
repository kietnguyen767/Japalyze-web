// lib/payos.ts
const PayOSLib = require("@payos/node");

// LẤY ĐÚNG CÁI RUỘT BÊN TRONG (Đây là chỗ bạn bị lỗi nãy giờ)
const PayOSConstructor = PayOSLib.PayOS;

// Kỹ thuật Global Singleton (Giữ nguyên để tránh lỗi Next.js)
const globalForPayOS = global as unknown as { payOS: any };

if (!globalForPayOS.payOS) {
    if (!process.env.PAYOS_CLIENT_ID || !process.env.PAYOS_API_KEY || !process.env.PAYOS_CHECKSUM_KEY) {
        throw new Error("Thiếu biến môi trường PAYOS");
    }

    // Khởi tạo
    globalForPayOS.payOS = new PayOSConstructor(
        process.env.PAYOS_CLIENT_ID,
        process.env.PAYOS_API_KEY,
        process.env.PAYOS_CHECKSUM_KEY
    );
}

const payOS = globalForPayOS.payOS;

export default payOS;