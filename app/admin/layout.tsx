'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react'; // Thêm icon loading cho đẹp

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // 👇 SỬA Ở ĐÂY: Dùng 'loading' thay vì 'isLoading'
  const { user, loading } = useAuth(); 
  const router = useRouter();

  useEffect(() => {
    // 1. Nếu đang tải thì chờ, chưa làm gì cả
    if (loading) return;

    // 2. Tải xong mà không có user -> Đá về login
    if (!user) {
      router.push('/login');
      return;
    }

    // 3. Có user nhưng không phải admin -> Đá về trang chủ
    if (user.role !== 'admin') {
      // Có thể bỏ alert đi cho mượt, hoặc giữ lại tùy bạn
      // alert("Bạn không có quyền truy cập trang Quản trị!"); 
      router.push('/');
    }
  }, [user, loading, router]);

  // 4. Màn hình chờ: Hiện khi đang loading HOẶC chưa xác định được quyền
  if (loading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-blue-600" size={48} />
            <p className="text-slate-500 font-medium">Đang kiểm tra quyền Admin...</p>
        </div>
      </div>
    );
  }

  // 5. Đã qua hết các bài kiểm tra -> Cho vào Admin Panel
  return (
    <div className="flex min-h-screen bg-slate-100 relative z-10">
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}