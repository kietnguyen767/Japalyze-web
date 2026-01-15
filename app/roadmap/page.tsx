'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { 
  Sprout, Coffee, Mountain, Plane, Trophy, 
  Play, Target, AlertTriangle, Gift, ArrowRight, ChevronDown, Map, LucideIcon
} from 'lucide-react';

// --- INTERFACES ---
interface LevelStats {
  kanji: string;
  vocab: string;
  hours: string;
}

interface LevelDetails {
  achieve: string;
  challenge: string;
  result: string;
}

interface JLPTLevel {
  id: string;
  level: string;
  title: string;
  bgImage: string;
  color: string;
  icon: LucideIcon;
  stats: LevelStats;
  details: LevelDetails;
}

// --- DATA GIỮ NGUYÊN ---
const JLPT_LEVELS: JLPTLevel[] = [
  {
    id: 'n5',
    level: 'N5',
    title: 'Khởi động hành trình',
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
  // Có thể là null nếu người dùng đóng hết lại
  const [activeLevel, setActiveLevel] = useState<JLPTLevel | null>(JLPT_LEVELS[0]);

  // ✅ HÀM TOGGLE: Nếu đang mở thì đóng, nếu đang đóng/khác thì mở
  const handleToggle = (item: JLPTLevel) => {
    if (activeLevel && activeLevel.id === item.id) {
        setActiveLevel(null); // Đóng lại
    } else {
        setActiveLevel(item); // Mở ra
    }
  };

  return (
    <div className="md:h-screen min-h-screen flex flex-col bg-slate-50 overflow-x-hidden">
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full p-4 md:p-6 gap-6 md:h-[calc(100vh-80px)]">
        
        {/* --- DANH SÁCH LEVEL (BÊN TRÁI) --- */}
        <div className="w-full md:w-[25%] flex flex-col gap-3 md:h-full md:overflow-y-auto md:pr-2 md:pt-10 md:pb-4">
            
            {JLPT_LEVELS.map((item) => {
                // Kiểm tra xem item này có đang Active không
                const isActive = activeLevel?.id === item.id;

                return (
                    <div key={item.id} className="flex flex-col">
                        {/* --- HEADER CỦA TỪNG LEVEL --- */}
                        <div 
                            onClick={() => handleToggle(item)} // 👈 Gọi hàm Toggle ở đây
                            className={`
                                relative p-4 rounded-2xl cursor-pointer transition-all duration-300 border
                                flex items-center gap-4 group shrink-0 backdrop-blur-md select-none
                                ${isActive 
                                    ? 'bg-white border-blue-200 shadow-md ring-1 ring-blue-100 md:translate-x-2 z-10' 
                                    : 'bg-white/60 border-white/40 hover:bg-white hover:shadow-sm'
                                }
                            `}
                        >
                            {/* Icon Box */}
                            <div className={`
                                w-10 h-10 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-white shadow-sm transition-all shrink-0
                                ${isActive 
                                    ? `bg-gradient-to-br ${item.color} shadow-md scale-110` 
                                    : 'bg-slate-200 text-slate-500'
                                }
                            `}>
                                <item.icon size={18} />
                            </div>

                            <div className="flex-1">
                                <h3 className={`font-bold text-base ${isActive ? 'text-slate-800' : 'text-slate-600'}`}>
                                    {item.level}
                                </h3>
                                <p className="text-xs font-medium text-slate-500 line-clamp-1">
                                    {item.title}
                                </p>
                            </div>

                            {/* Mũi tên chỉ thị */}
                            <div className="text-slate-400">
                                {/* Desktop: Mũi tên ngang */}
                                <ArrowRight className={`hidden md:block transition-all ${isActive ? 'text-blue-600 opacity-100' : 'opacity-0'}`} size={16} />
                                {/* Mobile: Mũi tên xổ xuống xoay 180 độ */}
                                <ChevronDown size={20} className={`md:hidden transition-transform duration-300 ${isActive ? 'rotate-180 text-blue-600' : ''}`} />
                            </div>
                        </div>

                        {/* --- [MOBILE ONLY] NỘI DUNG XỔ XUỐNG --- */}
                        <div className={`
                            md:hidden overflow-hidden transition-[max-height] duration-500 ease-in-out
                            ${isActive ? 'max-h-[2000px] opacity-100 mt-2 mb-4' : 'max-h-0 opacity-0'}
                        `}>
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-4 space-y-4">
                                {/* Ảnh nền Mobile */}
                                <div className="relative h-32 rounded-xl overflow-hidden">
                                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${item.bgImage}')` }}></div>
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <h3 className="text-white font-bold text-xl drop-shadow-md">{item.title}</h3>
                                    </div>
                                </div>

                                {/* Thông số Mobile */}
                                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                                    <div><p className="text-[10px] text-slate-400 font-bold uppercase">Giờ</p><p className="font-bold text-slate-700">{item.stats.hours}</p></div>
                                    <div><p className="text-[10px] text-slate-400 font-bold uppercase">Kanji</p><p className="font-bold text-slate-700">{item.stats.kanji}</p></div>
                                    <div><p className="text-[10px] text-slate-400 font-bold uppercase">Từ vựng</p><p className="font-bold text-slate-700">{item.stats.vocab}</p></div>
                                </div>

                                {/* Chi tiết Mobile */}
                                <div className="space-y-3">
                                    <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                        <h4 className="font-bold text-green-700 text-sm mb-1 flex items-center gap-2"><Target size={14}/> Đạt được</h4>
                                        <p className="text-xs text-slate-600">{item.details.achieve}</p>
                                    </div>
                                    <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                                        <h4 className="font-bold text-orange-700 text-sm mb-1 flex items-center gap-2"><AlertTriangle size={14}/> Thách thức</h4>
                                        <p className="text-xs text-slate-600">{item.details.challenge}</p>
                                    </div>
                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                        <h4 className="font-bold text-blue-700 text-sm mb-1 flex items-center gap-2"><Gift size={14}/> Kết quả</h4>
                                        <p className="text-xs text-slate-600">{item.details.result}</p>
                                    </div>
                                </div>

                                {/* Nút bấm Mobile */}
                                <Link 
                                    href={`/roadmap/${item.id}`} 
                                    className={`
                                        block w-full py-3 rounded-xl font-bold text-white text-center text-sm shadow-md
                                        bg-gradient-to-r ${item.color} active:scale-95 transition-transform
                                    `}
                                >
                                    Bắt đầu lộ trình {item.level}
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>

        {/* --- [DESKTOP ONLY] DETAIL CARD LỚN BÊN PHẢI --- */}
        {/* Logic: Nếu có activeLevel thì hiện Card, nếu không (đã đóng hết) thì hiện Placeholder */}
        <div className="hidden md:flex flex-1 w-full md:w-[75%] bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex-col h-full relative transition-all duration-500">
            
            {activeLevel ? (
                <>
                    {/* 1. Header Ảnh Desktop */}
                    <div className="relative h-[35%] w-full overflow-hidden shrink-0 group animate-in fade-in duration-500">
                        <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url('${activeLevel.bgImage}')` }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 w-full p-8 flex items-end gap-6 text-white z-10">
                            <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl">
                                <span className="text-5xl font-black text-white">{activeLevel.level}</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                     <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${activeLevel.color} shadow-lg`}>
                                         JLPT ROADMAP
                                     </span>
                                </div>
                                <h1 className="text-4xl font-bold leading-tight shadow-black drop-shadow-lg">{activeLevel.title}</h1>
                            </div>
                        </div>
                    </div>

                    {/* 2. Stats Bar Desktop */}
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

                    {/* 3. Content Body Desktop */}
                    <div className="flex-1 p-6 overflow-y-auto bg-white">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="flex flex-col">
                                <h4 className="font-bold text-green-700 text-base mb-3 flex items-center gap-2"><Target size={18} className="fill-green-100"/> Bạn sẽ làm được gì?</h4>
                                <p className="text-slate-600 text-sm leading-relaxed text-justify bg-green-50/50 p-4 rounded-xl border border-green-50">{activeLevel.details.achieve}</p>
                            </div>
                            <div className="flex flex-col">
                                <h4 className="font-bold text-orange-700 text-base mb-3 flex items-center gap-2"><AlertTriangle size={18} className="fill-orange-100"/> Thách thức</h4>
                                <p className="text-slate-600 text-sm leading-relaxed text-justify bg-orange-50/50 p-4 rounded-xl border border-orange-50">{activeLevel.details.challenge}</p>
                            </div>
                            <div className="flex flex-col">
                                <h4 className="font-bold text-blue-700 text-base mb-3 flex items-center gap-2"><Gift size={18} className="fill-blue-100"/> Kết quả</h4>
                                <p className="text-slate-600 text-sm leading-relaxed text-justify bg-blue-50/50 p-4 rounded-xl border border-blue-50">{activeLevel.details.result}</p>
                            </div>
                        </div>
                    </div>

                    {/* 4. Footer Desktop */}
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
                </>
            ) : (
                /* --- PLACEHOLDER KHI KHÔNG CHỌN GÌ (TRÊN DESKTOP) --- */
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-4">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                        <Map size={40} className="text-slate-300" />
                    </div>
                    <p className="text-lg font-medium">Chọn một cấp độ bên trái để xem chi tiết lộ trình</p>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}