// debug-payos.js
require('dotenv').config({ path: '.env.local' });
const Lib = require('@payos/node');

console.log("=== BẮT ĐẦU DÒ TÌM PAYOS ===");

// 1. In ra cấu trúc thô của thư viện
console.log("📦 Cấu trúc thư viện import vào:", Lib);

// Hàm test thử constructor
function tryInit(Name, Constructor) {
    console.log(`\n--- Thử nghiệm: ${Name} ---`);
    if (typeof Constructor !== 'function') {
        console.log("❌ Không phải Class/Function.");
        return;
    }

    try {
        const instance = new Constructor(
            process.env.PAYOS_CLIENT_ID,
            process.env.PAYOS_API_KEY,
            process.env.PAYOS_CHECKSUM_KEY
        );
        console.log("✅ New thành công!");
        
        // KIỂM TRA XEM CÓ HÀM KHÔNG
        if (typeof instance.createPaymentLink === 'function') {
            console.log("🎯 BINGO! TÌM THẤY HÀM createPaymentLink!");
            console.log("👉 Đây chính là Constructor đúng!");
        } else {
            console.log("⚠️ New được nhưng instance không có hàm createPaymentLink.");
            console.log("Instance keys:", Object.keys(instance));
            // Kiểm tra prototype
            const proto = Object.getPrototypeOf(instance);
            console.log("Prototype keys:", Object.getOwnPropertyNames(proto));
        }
    } catch (e) {
        console.log("❌ Lỗi khi new:", e.message);
    }
}

// 2. Test các trường hợp
tryInit("require('@payos/node')", Lib);
tryInit("require('@payos/node').PayOS", Lib.PayOS);
tryInit("require('@payos/node').default", Lib.default);