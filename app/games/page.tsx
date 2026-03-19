'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Gamepad2, Play, Zap, Star, Moon, Sun, Sparkles } from 'lucide-react';

const GAMES = [
  {
    id: 'tarot',
    title: 'Tiên Tri Tarot',
    subtitle: 'Gieo quẻ phong cách Nhật',
    description: 'Rút các lá bài Tarot phong cách Ukiyo-e để nhận lời khuyên về vận mệnh, tình yêu và công việc.',
    icon: Moon,
    theme: {
      blob: 'from-violet-100',
      iconBg: 'bg-violet-100',
      iconText: 'text-violet-700',
      btn: 'bg-gradient-to-r from-violet-500 to-indigo-600 shadow-violet-200',
      hoverText: 'group-hover:text-violet-700',
      borderHover: 'group-hover:border-violet-300',
      cardHover: 'hover:shadow-violet-100 hover:border-violet-200'
    },
    tags: ['Văn hóa', 'Đọc hiểu', 'Thư giãn'],
    stats: { players: '1.8k', rating: 4.8 },
    href: '/games/tarot'
  },
  {
    id: 'tuvi',
    title: 'Tử Vi Bát Tự',
    subtitle: 'Bản đồ vận mệnh',
    description: 'Phân tích Ngũ Hành, Thiên Can, Địa Chi để hiểu rõ tính cách, sự nghiệp và hướng phát triển trong cuộc đời.',
    icon: Sun,
    theme: {
      blob: 'from-orange-100',
      iconBg: 'bg-orange-100',
      iconText: 'text-orange-700',
      btn: 'bg-gradient-to-r from-amber-500 to-orange-600 shadow-orange-200',
      hoverText: 'group-hover:text-orange-700',
      borderHover: 'group-hover:border-orange-300',
      cardHover: 'hover:shadow-orange-100 hover:border-orange-200'
    },
    tags: ['Văn hóa', 'Phân tích', 'Thư giãn'],
    stats: { players: '1.2k', rating: 4.7 },
    href: '/games/tuvi'
  }
];

export default function GamesPage() {
  const router = useRouter();
  const { user } = useAuth();

  const handlePlayGame = (href: string) => {
    if (!user) {
      router.push('/login');
      return;
    }
    router.push(href);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <div className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-8 pt-8 md:pt-12">
        {/* HEADER SECTION */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-wider mb-3">
            <Gamepad2 size={16} /> Khu vực Giải trí
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
            Game Center
          </h1>
          <p className="text-slate-500 font-medium mt-2 max-w-2xl text-base">
            Vừa chơi vừa học. Rèn luyện phản xạ ngôn ngữ qua những màn đấu kịch tính hoặc thư giãn tìm hiểu văn hóa phương Đông truyền thống.
          </p>
        </div>

        {/* GAMES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {GAMES.map((game) => (
            <div
              key={game.id}
              onClick={() => handlePlayGame(game.href)}
              className={`bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 relative overflow-hidden group flex flex-col h-full cursor-pointer hover:-translate-y-1 ${game.theme.cardHover}`}
            >
              {/* Subtle decorative blob */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${game.theme.blob} to-transparent rounded-bl-[4rem] opacity-60 group-hover:scale-110 transition-transform duration-700 pointer-events-none`}></div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Header: Icon + Title */}
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${game.theme.iconBg} ${game.theme.iconText} shadow-sm group-hover:bg-white border border-transparent ${game.theme.borderHover}`}>
                    <game.icon size={26} strokeWidth={2.5} />
                  </div>
                  <div className="pt-1">
                    <h3 className={`font-bold text-xl md:text-2xl text-slate-800 transition-colors ${game.theme.hoverText}`}>
                      {game.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5">
                      {game.subtitle}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {game.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-500 text-[10px] sm:text-[11px] font-bold rounded-lg uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                  {game.description}
                </p>

                {/* Footer: Stats & Action */}
                <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-[13px] text-slate-400 font-bold">
                    <div className="flex items-center gap-1.5" title="Người đã chơi">
                      <Zap size={14} className="text-yellow-500 fill-yellow-500" />
                      <span>{game.stats.players}</span>
                    </div>
                    <div className="flex items-center gap-1.5" title="Đánh giá">
                      <Star size={14} className="text-orange-400 fill-orange-400" />
                      <span>{game.stats.rating}</span>
                    </div>
                  </div>

                  <button className={`px-5 py-2 w-auto ${game.theme.btn} text-white rounded-xl text-sm font-bold shadow-md flex items-center gap-1.5 transition-all hover:brightness-110 active:scale-95`}>
                    <Play size={14} fill="currentColor" /> Chơi Ngay
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Coming Soon Card */}
          <div className="bg-slate-50/80 rounded-3xl p-6 md:p-8 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center h-full min-h-[300px] hover:border-blue-300 hover:bg-blue-50/30 transition-colors cursor-pointer group">
            <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles size={24} className="text-slate-400 group-hover:text-blue-500" />
            </div>
            <h3 className="font-bold text-lg text-slate-700 mb-2">Đang phát triển...</h3>
            <p className="text-sm text-slate-500 max-w-[200px]">
              Nhiều tựa game thú vị khác đang được chúng tôi ấp ủ.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}