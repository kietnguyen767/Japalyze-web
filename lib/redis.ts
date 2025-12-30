// lib/redis.ts
import Redis from 'ioredis';

const getRedisUrl = (): string => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }
  throw new Error("REDIS_URL is not defined in .env.local");
};

// --- FIX LỖI TRÀN KẾT NỐI (Singleton Pattern) ---
// Khai báo biến global để Next.js không tạo lại kết nối khi Hot Reload
const globalForRedis = global as unknown as { redis: Redis };

const redis = globalForRedis.redis || new Redis(getRedisUrl());

if (process.env.NODE_ENV !== 'production') {
  globalForRedis.redis = redis;
}

redis.on('connect', () => {
  console.log('✅ Connected to Redis');
});

redis.on('error', (error) => {
  console.error('❌ Redis connection error:', error);
});

// --- HELPER FUNCTIONS (Đã nâng cấp để hỗ trợ JSON) ---

// Lưu dữ liệu (Tự động chuyển Object/Array thành String JSON)
export async function setCache(key: string, value: any, ttl: number = 3600): Promise<void> {
  const stringValue = JSON.stringify(value);
  await redis.setex(key, ttl, stringValue);
}

// Lấy dữ liệu (Tự động chuyển String JSON thành Object/Array)
// Sử dụng Generic <T> để bạn có thể định nghĩa kiểu dữ liệu trả về
export async function getCache<T = any>(key: string): Promise<T | null> {
  const data = await redis.get(key);
  if (!data) return null;
  
  try {
    return JSON.parse(data) as T;
  } catch (error) {
    // Nếu dữ liệu không phải JSON (ví dụ chỉ là string thường), trả về nguyên gốc
    return data as unknown as T;
  }
}

export async function deleteCache(key: string): Promise<void> {
  await redis.del(key);
}

export async function clearCache(): Promise<void> {
  await redis.flushdb();
}

export default redis;