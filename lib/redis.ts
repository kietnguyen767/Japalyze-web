import { Redis } from '@upstash/redis';

// 1. Khởi tạo Client (Sử dụng check để tránh crash nếu thiếu biến môi trường)
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!redisUrl || !redisToken) {
  console.error('❌ LỖI: Thiếu cấu hình UPSTASH_REDIS_REST_URL hoặc TOKEN trong .env');
}

const redis = new Redis({
  url: redisUrl || '',
  token: redisToken || '',
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