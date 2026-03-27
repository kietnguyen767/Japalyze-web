// lib/get-user.ts
import { headers, cookies } from 'next/headers';
import redis from '@/lib/redis';

export async function getUserId() {
  try {
    // 1. Lấy token từ Header (Ưu tiên)
    const headersList = await headers();
    const authHeader = headersList.get('authorization');
    console.log('🔐 [getUserId] authHeader:', authHeader);

    let token = authHeader?.replace('Bearer ', '');
    console.log('🔐 [getUserId] token after replace Bearer:', token?.substring(0, 20) + '...');

    // 2. Nếu không có ở Header, lấy ở Cookie
    if (!token) {
      const cookieStore = await cookies();
      const sessionCookie = cookieStore.get('session_token');
      token = sessionCookie?.value?.replace('Bearer ', '');
      console.log('🔐 [getUserId] token từ cookie (sau khi xử lý):', token?.substring(0, 20) + '...');
    }

    if (!token) {
      console.log('🔐 [getUserId] ❌ FAIL - Không tìm thấy token');
      return null;
    }

    // 3. Lấy UserID từ Redis
    const redisKey = `session:${token}`;
    console.log(`🔐 [getUserId] Đang lookup Redis: ${redisKey.substring(0, 30)}...`);
    console.log(`🔐 [getUserId] Token length: ${token.length}`);

    try {
      const userId = await redis.get(redisKey);
      console.log(`🔐 [getUserId] Redis.get('${redisKey}') = ${userId}`);
      console.log(`🔐 [getUserId] Result type: ${typeof userId}, Value: ${userId}`);

      if (userId) {
        return (userId as string) || null;
      }
    } catch (redisError: any) {
      console.error(`❌ [getUserId] Redis Error: ${redisError.message}`);
      console.error(`❌ [getUserId] UPSTASH_REDIS_REST_URL: ${process.env.UPSTASH_REDIS_REST_URL ? '✅ SET' : '❌ NOT SET'}`);
      console.error(`❌ [getUserId] UPSTASH_REDIS_REST_TOKEN: ${process.env.UPSTASH_REDIS_REST_TOKEN ? '✅ SET' : '❌ NOT SET'}`);
    }

    console.log(`❌ [getUserId] Token ${token.substring(0, 20)}... không tồn tại trong Redis hoặc Redis không hoạt động`);
    return null;

  } catch (error: any) {
    console.error("🔐 [getUserId] Exception:", error.message);
    return null;
  }
}