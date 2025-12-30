// lib/get-user.ts
import { headers, cookies } from 'next/headers';
import redis from '@/lib/redis';

export async function getUserId() {
  try {
    // 1. Lấy token từ Header (Ưu tiên)
    // Trong Next.js 15+, headers() là hàm async, phải await
    const headersList = await headers(); 
    const authHeader = headersList.get('authorization');
    let token = authHeader?.replace('Bearer ', '');

    // 2. Nếu không có ở Header, lấy ở Cookie
    if (!token) {
      const cookieStore = await cookies(); // cookies() cũng phải await
      token = cookieStore.get('session_token')?.value;
    }

    if (!token) return null;

    // 3. Lấy UserID từ Redis
    const userId = await redis.get(`session:${token}`);
    
    // Ép kiểu về string hoặc null để Typescript không báo lỗi
    return (userId as string) || null;
    
  } catch (error) {
    console.error("Lỗi lấy UserID:", error);
    return null;
  }
}