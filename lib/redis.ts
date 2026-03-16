import { Redis } from '@upstash/redis';

// 1. Khởi tạo Client (Dùng biến môi trường UPSTASH...)
// Nếu chưa cấu hình biến môi trường, nó sẽ báo lỗi rõ ràng.
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// --- HELPER FUNCTIONS ---

// Lưu dữ liệu
// Ưu điểm Upstash: Bạn truyền Object vào, nó tự biến thành JSON. Không cần JSON.stringify thủ công.
export async function setCache(key: string, value: any, ttl: number = 3600): Promise<void> {
  // cú pháp: .set(key, value, { ex: thời_gian_hết_hạn_giây })
  await redis.set(key, value, { ex: ttl });
}

// Lấy dữ liệu
// Ưu điểm Upstash: Nó tự parse JSON ra Object cho bạn luôn.
export async function getCache<T = any>(key: string): Promise<T | null> {
  try {
    const data = await redis.get<T>(key);
    return data; 
  } catch (error) {
    console.error(`Lỗi lấy cache key "${key}":`, error);
    return null;
  }
}

// Xóa dữ liệu
export async function deleteCache(key: string): Promise<void> {
  await redis.del(key);
}

// Xóa sạch Database (Dùng cẩn thận)
export async function clearCache(): Promise<void> {
  await redis.flushdb();
}

export default redis;