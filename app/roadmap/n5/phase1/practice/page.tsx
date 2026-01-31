'use client';

import Navbar from '@/components/Navbar';
import { ArrowLeft, BookOpen, Sword } from 'lucide-react'; // Sword icon cho ngầu
import Link from 'next/link';

export default function Phase1PracticeMenu() {
  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-700">
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Breadcrumb */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/roadmap/n5" className="group flex items-center text-slate-500 hover:text-blue-600 font-bold transition-colors text-sm">
            <div className="p-2 bg-white border border-slate-200 rounded-full mr-3 group-hover:border-blue-200 transition-colors">
                <ArrowLeft size={16}/> 
            </div>
            Quay lại Lộ trình
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-bold uppercase">
            <Sword size={14} /> Thực chiến
          </div>
        </div>

        <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-slate-800 mb-2">Ghi Nhớ Mặt Chữ</h1>
            <p className="text-slate-500">Chọn một trong hai bộ thẻ để bắt đầu luyện tập phản xạ.</p>
        </div>

        {/* Menu Lựa chọn */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Thẻ Hiragana */}
            <Link 
                // 👇 QUAN TRỌNG: Truyền thêm tham số context=roadmap
                href="/exercises/hiragana?context=roadmap&questId=q1_2" 
                className="group bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all text-center relative overflow-hidden"
            >
                <div className="w-20 h-20 bg-white text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-4xl font-black">あ</span>
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600">Luyện Hiragana</h2>
                <p className="text-sm text-slate-500">Ôn tập bảng chữ mềm qua bài tập trắc nghiệm.</p>
                <div className="mt-6 py-3 px-6 bg-slate-50 rounded-xl text-blue-600 font-bold text-sm group-hover:bg-blue-600 transition-colors">
                    Bắt đầu ngay
                </div>
            </Link>

            {/* Thẻ Katakana */}
            <Link 
                // 👇 QUAN TRỌNG: Truyền thêm tham số context=roadmap
                href="/exercises/katakana?context=roadmap&questId=q1_2" 
                className="group bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm hover:border-orange-400 hover:shadow-xl hover:-translate-y-1 transition-all text-center relative overflow-hidden"
            >
                <div className="w-20 h-20 bg-white text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-4xl font-black">ア</span>
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-orange-600">Luyện Katakana</h2>
                <p className="text-sm text-slate-500">Ôn tập bảng chữ cứng qua bài tập trắc nghiệm.</p>
                <div className="mt-6 py-3 px-6 bg-slate-50 rounded-xl text-orange-600 font-bold text-sm hover:bg-orange-600 transition-colors">
                    Bắt đầu ngay
                </div>
            </Link>
        </div>

      </div>
    </div>
  );
}