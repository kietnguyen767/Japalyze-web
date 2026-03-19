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
    //  FIX: guard cho TypeScript + App Router
    if (!searchParams) return;

    const token = searchParams.get('token');

    if (!token) {
      router.replace('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch user');
        }

        const data = await res.json();

        // Lưu session token
        const isProd = window.location.protocol === 'https:';
        document.cookie = `session_token=${token}; path=/; max-age=86400; SameSite=Lax${isProd ? '; Secure' : ''}`;

        // Lưu user vào context
        login(data.user);

        router.replace('/');
      } catch (error) {
        console.error('AUTH SUCCESS ERROR:', error);
        router.replace('/login?error=login_failed');
      }
    };

    fetchUser();
  }, [searchParams, router, login]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
      <h2 className="text-xl font-bold text-slate-700">
        Đang đăng nhập...
      </h2>
    </div>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <h2 className="text-xl font-bold text-slate-700">
            Đang đăng nhập...
          </h2>
        </div>
      }
    >
      <AuthSuccessContent />
    </Suspense>
  );
}
