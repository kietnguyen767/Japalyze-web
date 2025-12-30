// app/register/page.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
// 👇 Thêm ArrowLeft vào import
import { Mail, Lock, User, ArrowRight, Loader2, Sparkles, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // 🔥 LƯU TOKEN VÀO COOKIE
        if (data.token) {
          document.cookie = `session_token=${data.token}; path=/; max-age=86400; SameSite=Lax`;
          console.log("✅ Token đã lưu vào cookie");
        }
        
        // Tự động login
        login(data.user);
        router.push('/');
      } else {
        alert(data.message || 'Đăng ký thất bại');
      }
    } catch (error) {
      alert('Đã xảy ra lỗi kết nối');
    } finally {
        setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = '/api/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative">
      
      {/* Nút quay lại dành cho Mobile (Hiện bên ngoài khung) */}
      <Link href="/" className="absolute top-4 left-4 md:hidden text-slate-500 hover:text-blue-600 flex items-center gap-2 font-medium">
          <ArrowLeft size={20} /> Trang chủ
      </Link>

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col-reverse md:flex-row animate-fade-in-up">
        
        {/* --- CỘT TRÁI: FORM --- */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative">
          
          {/* 🔥 NÚT QUAY LẠI (Desktop) 🔥 */}
          <Link href="/" className="hidden md:flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors w-fit mb-6 font-medium text-sm group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Quay lại trang chủ
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Tạo tài khoản mới</h1>
            <p className="text-slate-500">Bắt đầu hành trình chinh phục tiếng Nhật của bạn.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Họ và tên</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="password"
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" /> : <><Sparkles size={20}/> Đăng Ký Miễn Phí</>}
            </button>
          </form>

          <div className="relative my-6">
             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
             <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-slate-500">Hoặc</span></div>
          </div>

           <button 
             onClick={handleGoogleRegister}
             className="w-full py-3 border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
           >
             <svg className="w-5 h-5" viewBox="0 0 24 24">
                 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
             </svg>
             Đăng ký bằng Google
           </button>

          <p className="mt-8 text-center text-slate-600">
            Đã có tài khoản?{' '}
            <Link href="/login" className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1">
              Đăng nhập <ArrowRight size={16}/>
            </Link>
          </p>
        </div>

        {/* --- CỘT PHẢI: HÌNH ẢNH --- */}
        <div className="md:w-1/2 bg-slate-900 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=1792&auto=format&fit=crop')] bg-cover bg-center opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            
            <div className="relative z-10 p-10 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Cộng đồng học tiếng Nhật năng động</h2>
                <p className="text-slate-300">
                    Tham gia cùng hàng nghìn học viên khác. Luyện tập Kaiwa, làm bài tập và thăng hạng mỗi ngày.
                </p>
                <div className="mt-8 p-4 bg-white/10 backdrop-blur-md rounded-xl text-left border border-white/20">
                    <p className="text-sm italic mb-2">"Nhờ JapaLyze mà mình đã đỗ N3 chỉ sau 3 tháng luyện tập. Flashcard và Roleplay AI thực sự hữu ích!"</p>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-slate-900 font-bold">L</div>
                        <span className="text-xs font-bold">Linh Chi - Học viên</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}