'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { 
  Sprout, Coffee, Mountain, Plane, Trophy, 
  Play, Book, CaseSensitive, Star, ArrowRight,
  Target, AlertTriangle, Gift, Clock
} from 'lucide-react';

// --- DATA: CẬP NHẬT LẠI ẢNH N3 ---
const JLPT_LEVELS = [
  {
    id: 'n5',
    level: 'N5',
    title: 'Khởi động hành trình',
    // Ảnh Hoa Anh Đào (Sakura)
    bgImage: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=2076&auto=format&fit=crop',
    color: 'from-emerald-500 to-green-600',
    icon: Sprout,
    stats: { kanji: '100', vocab: '800', hours: '150h' },
    details: {
        achieve: 'Bạn sẽ đọc thông thạo 2 bảng chữ cái Hiragana & Katakana. Tự tin giới thiệu bản thân, hỏi giờ, mua sắm tại Konbini và giao tiếp sinh tồn cơ bản.',
        challenge: 'Khó khăn lớn nhất là ghi nhớ mặt chữ tượng hình và làm quen với trật tự câu "ngược" (Chủ ngữ - Tân ngữ - Động từ) của tiếng Nhật.',
        result: 'Đủ hành trang để đi du lịch Nhật Bản tự túc. Hiểu được các câu chào hỏi đơn giản trong Anime/Manga mà không cần phụ đề.'
    }
  },
  {
    id: 'n4',
    level: 'N4',
    title: 'Sơ cấp & Giao tiếp',
    // Ảnh Núi Phú Sĩ (Mt. Fuji)
    bgImage: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=80&w=2070&auto=format&fit=crop',
    color: 'from-cyan-500 to-blue-600',
    icon: Coffee,
    stats: { kanji: '300', vocab: '1.500', hours: '300h' },
    details: {
        achieve: 'Nắm vững các thể động từ quan trọng. Sử dụng được Kính ngữ cơ bản. Có thể diễn đạt mong muốn, dự định và mệnh lệnh.',
        challenge: 'Cơn ác mộng "Chia thể động từ" (Thể Te, Thể Ta, Thể Nai...). Các trợ từ bắt đầu trở nên phức tạp và dễ nhầm lẫn.',
        result: 'Đạt điều kiện tối thiểu để đi Xuất khẩu lao động hoặc Du học. Giao tiếp cơ bản được với người bản xứ trong đời sống.'
    }
  },
  {
    id: 'n3',
    level: 'N3',
    title: 'Cầu nối trung cấp',
    // 👇 ĐÃ THAY ĐỔI ẢNH MỚI (Cổng Torii Fushimi Inari) 👇
    bgImage: 'https://vietkite.com.vn/wp-content/uploads/2024/03/Fushimi-Inari.png',
    color: 'from-amber-400 to-orange-600',
    icon: Mountain,
    stats: { kanji: '650', vocab: '3.700', hours: '450h' },
    details: {
        achieve: 'Đọc hiểu văn bản dài, email công việc. Hiểu được sắc thái cảm xúc của người nói. Sử dụng linh hoạt giữa văn nói (Suồng sã) và văn viết.',
        challenge: 'Cú sốc trung cấp: Lượng từ vựng tăng đột biến gấp đôi N4. Xuất hiện nhiều mẫu ngữ pháp có ý nghĩa gần giống nhau.',
        result: 'Làm việc tại nhà hàng, khách sạn Nhật. Xem phim Nhật hiểu khoảng 60-70%. Điều kiện để xin việc văn phòng sơ cấp.'
    }
  },
  {
    id: 'n2',
    level: 'N2',
    title: 'Tiếng Nhật thương mại',
    // Ảnh Thành phố hiện đại (Tokyo Night)
    bgImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop',
    color: 'from-rose-500 to-red-600',
    icon: Plane,
    stats: { kanji: '1.000', vocab: '6.000', hours: '600h' },
    details: {
        achieve: 'Thảo luận, tranh luận, thuyết trình trong công việc. Đọc hiểu báo chí, tạp chí. Sử dụng thành thạo Kính ngữ (Keigo) trong môi trường Business.',
        challenge: 'Kính ngữ cực kỳ phức tạp và dễ dùng sai. Ngữ pháp N2 mang tính trừu tượng và trang trọng, ít dùng trong hội thoại thường ngày.',
        result: 'Mức lương cao đột phá. Cơ hội làm nhân viên chính thức (Full-time), Kỹ sư cầu nối (BrSE), Phiên dịch viên cao cấp.'
    }
  },
  {
    id: 'n1',
    level: 'N1',
    title: 'Đỉnh cao ngôn ngữ',
    // Ảnh Văn hóa/Nghệ thuật (Zen Garden / Great Wave)
    bgImage: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2070&auto=format&fit=crop',
    color: 'from-violet-600 to-purple-700',
    icon: Trophy,
    stats: { kanji: '2.000', vocab: '10.000', hours: '900h' },
    details: {
        achieve: 'Hiểu mọi hàm ý, ẩn ý văn hóa. Đọc luận văn, tài liệu nghiên cứu. Trình độ tiệm cận người bản xứ có học thức cao.',
        challenge: 'Từ vựng mang tính hàn lâm, văn cổ, rất ít gặp trong đời sống. Đòi hỏi tư duy logic cao để đọc hiểu văn bản phức tạp.',
        result: 'Chuyên gia ngôn ngữ, Giảng viên Đại học, Nhà nghiên cứu, Quản lý cấp cao tại các tập đoàn đa quốc gia.'
    }
  }
];

export default function RoadmapPage() {
  const [activeLevel, setActiveLevel] = useState(JLPT_LEVELS[0]);

  return (
    // Layout Full Screen - Không cuộn trang
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      <Navbar />

      {/* Main Container - Chiếm toàn bộ phần còn lại */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full p-4 md:p-6 gap-6 h-[calc(100vh-80px)]">
        
        {/* --- LEFT SIDE: MENU LIST (25%) --- */}
        {/* Thêm pt-10 để đẩy danh sách xuống thấp hơn */}
        <div className="w-full md:w-[25%] flex flex-col gap-3 h-full overflow-y-auto pr-2 pt-10 pb-4">
            
            {JLPT_LEVELS.map((item) => {
                const isActive = activeLevel.id === item.id;
                return (
                    <div 
                        key={item.id}
                        onClick={() => setActiveLevel(item)}
                        className={`
                            relative p-3 rounded-2xl cursor-pointer transition-all duration-300 border
                            flex items-center gap-3 group shrink-0 backdrop-blur-md
                            ${isActive 
                                /* Active: Màu trắng rõ, bóng đổ, viền xanh */
                                ? 'bg-white/95 border-blue-200 shadow-xl translate-x-2 ring-1 ring-blue-100' 
                                /* Inactive: Trong suốt (Kính mờ), để lộ hình nền phía sau */
                                : 'bg-white/30 border-white/20 hover:bg-white/50 hover:border-white/50 hover:shadow-lg hover:translate-x-1'
                            }
                        `}
                    >
                        {/* Icon Box */}
                        <div className={`
                            w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm transition-all
                            ${isActive 
                                ? `bg-gradient-to-br ${item.color} shadow-md scale-110` 
                                : 'bg-slate-800/20 group-hover:bg-slate-800/40' // Icon tối màu khi chưa chọn để dễ nhìn trên nền sáng
                            }
                        `}>
                            <item.icon size={18} />
                        </div>

                        <div className="flex-1">
                            <h3 className={`font-bold text-base ${isActive ? 'text-slate-800' : 'text-slate-800'}`}>
                                {item.level}
                            </h3>
                            <p className={`text-xs font-medium line-clamp-1 ${isActive ? 'text-slate-500' : 'text-slate-600'}`}>
                                {item.title}
                            </p>
                        </div>

                        {isActive && (
                            <div className="bg-blue-100 p-1 rounded-full">
                                <ArrowRight className="text-blue-600" size={14} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>

        {/* --- RIGHT SIDE: DETAIL CARD (75%) --- */}
        <div className="w-full md:w-[75%] bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col h-full transition-all duration-500 relative">
            
            {/* 1. HEADER ẢNH (Chiếm 35% chiều cao) */}
            <div className="relative h-[35%] w-full overflow-hidden shrink-0 group">
                {/* Hình ảnh nền thay đổi theo cấp độ */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${activeLevel.bgImage}')` }}
                ></div>
                
                {/* Lớp phủ Gradient để làm rõ chữ */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                {/* Nội dung trên ảnh */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex items-end gap-6 text-white z-10">
                    <div className="hidden md:flex w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 items-center justify-center shadow-2xl">
                        <span className="text-5xl font-black text-white">{activeLevel.level}</span>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                             <span className="md:hidden text-3xl font-black">{activeLevel.level}</span>
                             <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${activeLevel.color} shadow-lg`}>
                                 JLPT ROADMAP
                             </span>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold leading-tight shadow-black drop-shadow-lg">{activeLevel.title}</h1>
                    </div>
                </div>
            </div>

            {/* 2. STATS BAR (Thông số) */}
            <div className="flex border-b border-slate-100 bg-slate-50/50 shrink-0">
                <div className="flex-1 py-3 px-4 text-center border-r border-slate-100">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Thời gian</p>
                    <p className="text-lg font-bold text-slate-700">{activeLevel.stats.hours}</p>
                </div>
                <div className="flex-1 py-3 px-4 text-center border-r border-slate-100">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Kanji</p>
                    <p className="text-lg font-bold text-slate-700">{activeLevel.stats.kanji}</p>
                </div>
                <div className="flex-1 py-3 px-4 text-center">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Từ vựng</p>
                    <p className="text-lg font-bold text-slate-700">{activeLevel.stats.vocab}</p>
                </div>
            </div>

            {/* 3. CONTENT BODY (Chia 3 cột, nội dung dài hơn) */}
            <div className="flex-1 p-6 overflow-hidden flex flex-col justify-center bg-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                    
                    {/* Cột 1: Mục tiêu */}
                    <div className="flex flex-col">
                        <h4 className="font-bold text-green-700 text-base mb-3 flex items-center gap-2">
                            <Target size={18} className="fill-green-100"/> Bạn sẽ làm được gì?
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed text-justify bg-green-50/50 p-3 rounded-lg border border-green-50 h-full overflow-y-auto">
                            {activeLevel.details.achieve}
                        </p>
                    </div>

                    {/* Cột 2: Thách thức */}
                    <div className="flex flex-col">
                        <h4 className="font-bold text-orange-700 text-base mb-3 flex items-center gap-2">
                            <AlertTriangle size={18} className="fill-orange-100"/> Thách thức cần vượt qua
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed text-justify bg-orange-50/50 p-3 rounded-lg border border-orange-50 h-full overflow-y-auto">
                            {activeLevel.details.challenge}
                        </p>
                    </div>

                    {/* Cột 3: Kết quả */}
                    <div className="flex flex-col">
                        <h4 className="font-bold text-blue-700 text-base mb-3 flex items-center gap-2">
                            <Gift size={18} className="fill-blue-100"/> Kết quả & Cơ hội
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed text-justify bg-blue-50/50 p-3 rounded-lg border border-blue-50 h-full overflow-y-auto">
                            {activeLevel.details.result}
                        </p>
                    </div>
                </div>
            </div>

            {/* 4. FOOTER ACTION */}
            <div className="p-5 border-t border-slate-100 bg-white shrink-0">
                <Link 
                    href={`/roadmap/${activeLevel.id}`} 
                    className={`
                        w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-blue-200/50
                        text-lg flex items-center justify-center gap-3 transition-all 
                        hover:scale-[1.01] hover:shadow-xl bg-gradient-to-r ${activeLevel.color}
                    `}
                >
                    <Play size={24} fill="currentColor" /> 
                    Bắt đầu lộ trình {activeLevel.level} ngay
                </Link>
            </div>
        </div>

      </div>
    </div>
  );
}