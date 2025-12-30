// app/auth-success/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      router.push('/login');
      return;
    }

    // Gọi API để lấy thông tin user dựa trên session token vừa nhận được
    const fetchUser = async () => {
      try {
        // Ta tận dụng API /api/auth/me (nếu bạn đã có) hoặc tạo logic verify token tại đây
        // Để đơn giản, giả sử ta gọi API get-profile bằng token này
        const res = await fetch('/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` } 
        });
        
        // *Lưu ý: Bạn cần đảm bảo Backend của bạn có API để lấy thông tin user từ session token
        // Nếu chưa có, logic ở đây sẽ cần điều chỉnh tùy theo cách bạn lưu session.
        
        if (res.ok) {
            const data = await res.json();
            // Lưu vào cookie trình duyệt (để các lần sau tự login)
            document.cookie = `session_token=${token}; path=/; max-age=86400`;
            
            // Lưu vào Context
            login(data.user);
            
            // Về trang chủ
            router.push('/');
        } else {
            throw new Error('Lỗi lấy thông tin user');
        }

      } catch (error) {
        console.error(error);
        router.push('/login?error=login_failed');
      }
    };

    fetchUser();
  }, [searchParams, router, login]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
      <h2 className="text-xl font-bold text-slate-700">Đang đăng nhập...</h2>
    </div>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <h2 className="text-xl font-bold text-slate-700">Đang đăng nhập...</h2>
      </div>
    }>
      <AuthSuccessContent />
    </Suspense>
  );
}