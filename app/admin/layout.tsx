'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role !== 'admin') {
      alert("Bạn không có quyền truy cập trang Quản trị!");
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== 'admin') {
    return <div className="p-10 text-center">Đang kiểm tra quyền truy cập...</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-100 relative z-10">
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}