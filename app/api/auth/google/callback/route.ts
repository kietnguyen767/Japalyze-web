// app/api/auth/google/callback/route.ts
import { NextResponse } from 'next/server';
import redis from '@/lib/redis';
import prisma from '@/lib/prisma'; // 👈 Thêm Prisma vào để lưu User
import { v4 as uuidv4 } from 'uuid';
export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Không tìm thấy mã xác thực' }, { status: 400 });
    }

    // 1. Đổi Code lấy Access Token (Giữ nguyên)
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok) throw new Error(tokenData.error_description || 'Lỗi lấy Token');

    // 2. Lấy thông tin User từ Google (Giữ nguyên)
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const googleUser = await userResponse.json();

    // 3. Xử lý Logic: LƯU VÀO POSTGRESQL (PRISMA) 
    // Thay vì Redis hset, ta dùng prisma.upsert (Update nếu có, Insert nếu chưa)

    const user = await prisma.user.upsert({
      where: { email: googleUser.email },

      // Nếu user đã tồn tại -> Cập nhật tên và avatar (đề phòng họ đổi avatar Google)
      update: {
        name: googleUser.name,
        avatar: googleUser.picture,
        // Không update isPremium hay provider để tránh mất dữ liệu cũ
      },

      // Nếu user chưa tồn tại -> Tạo mới
      create: {
        email: googleUser.email,
        name: googleUser.name,
        avatar: googleUser.picture,
        provider: 'google',
        isPremium: false, // PostgreSQL dùng Boolean (false), không phải String ('false')
        role: 'user'
      }
    });

    // 4. Tạo Session Token vào Redis (Giữ nguyên cơ chế session tốc độ cao)
    const sessionToken = uuidv4();
    const userIdString = String(user.id); // Convert to string

    console.log('🔑 Google Auth - Tạo session:', sessionToken.substring(0, 10) + '...');
    console.log('💾 User ID:', user.id, '| Type:', typeof user.id);
    console.log('💾 User ID as String:', userIdString, '| Type:', typeof userIdString);

    const redisKey = `session:${sessionToken}`;
    console.log('💾 Lưu vào Redis - Key:', redisKey, '| Value:', userIdString);

    try {
      const setResult = await redis.setex(redisKey, 86400, userIdString);
      console.log('✅ redis.setex OK - Result:', setResult);

      // Verify ngay lập tức
      const verify = await redis.get(redisKey);
      console.log('🔍 Verify Redis - Retrieved:', verify, '| Expected:', userIdString, '| Match:', verify === userIdString ? '✅' : '❌');
    } catch (redisError: any) {
      console.error('❌ REDIS ERROR:', redisError.message);
      throw redisError;
    }

    // 🔥 QUAN TRỌNG: Lưu user.id (UUID của Postgres) vào session thay vì email
    // Để sau này các API khác dễ dàng query database 

    // 5. Đá người dùng về trang xử lý thành công (Giữ nguyên)
    // Lưu ý: Đảm bảo biến NEXT_PUBLIC_DOMAIN trong .env đã đúng (http://localhost:3000 hoặc domain thật)
    const rawBaseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';
    const baseUrl = rawBaseUrl.replace(/\/$/, ''); // Xóa dấu / ở cuối nếu có

    console.log('🔗 [Google Auth] Final redirect URL:', `${baseUrl}/auth-success?token=${sessionToken}`);

    return NextResponse.redirect(`${baseUrl}/auth-success?token=${sessionToken}`);

  } catch (error: any) {
    console.error('Google Auth Error:', error);
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';
    return NextResponse.redirect(`${baseUrl}/login?error=google_auth_failed`);
  }
}