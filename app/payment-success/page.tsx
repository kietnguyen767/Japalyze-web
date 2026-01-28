// app/payment-success/page.tsx
'use client';
import Link from 'next/link';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function PaymentSuccessPage() {
  const { user, refreshUser } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkStatus = async () => {
      // Gọi hàm refreshUser để lấy dữ liệu mới nhất từ server
      await refreshUser();
    };

    // Nếu user chưa có Premium, cứ 2 giây check lại 1 lần
    if (user && !user.isPremium) {
      intervalId = setInterval(checkStatus, 2000);
    } else {
      // Nếu đã có Premium rồi thì tắt loading
      setIsChecking(false);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [user, refreshUser]); // Chạy lại mỗi khi user thay đổi

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 relative z-10">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full animate-fade-in-up">
        
        {/* TRẠNG THÁI 1: ĐANG CẬP NHẬT (Chờ Webhook) */}
        {isChecking ? (
           <>
             <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
               <Loader2 size={40} className="animate-spin" />
             </div>
             <h1 className="text-2xl font-bold text-slate-800 mb-2">Đang xác nhận giao dịch...</h1>
             <p className="text-slate-500 mb-6">
               Hệ thống đang đồng bộ dữ liệu từ ngân hàng. <br/>Vui lòng đợi trong giây lát.
             </p>
           </>
        ) : (
        /* TRẠNG THÁI 2: ĐÃ THÀNH CÔNG (Premium đã kích hoạt) */
           <>
             <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
               <CheckCircle size={40} />
             </div>
             <h1 className="text-2xl font-bold text-slate-800 mb-2">Thanh toán thành công!</h1>
             <p className="text-slate-500 mb-6">
               Chúc mừng <b>{user?.name}</b>! <br/>
               Tài khoản của bạn đã được nâng cấp lên <span className="text-orange-500 font-bold">Premium</span>.
             </p>
             <div className="space-y-3">
                <Link href="/exercises" className="block w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Vào học ngay
                </Link>
                <Link href="/" className="block w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all">
                  Về trang chủ
                </Link>
             </div>
           </>
        )}
      </div>
    </div>
  );
}