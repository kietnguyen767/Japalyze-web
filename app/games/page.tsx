'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Gamepad2, Ghost, Keyboard, Sparkles, Play,
  Zap, Star, Moon, Swords, Flower2
} from 'lucide-react';

const GAMES = [
  {
    id: 'monster-typer',
    title: 'Huyền Thoại Diệt Quái',
    subtitle: 'RPG Luyện Gõ & Phản Xạ',
    description: 'Nhập vai chiến binh Samurai đối đầu với các Yo-kai (Yêu quái). Gõ đúng phiên âm hoặc nghĩa của từ vựng thật nhanh để tung chiêu tấn công trước khi bị quái vật hạ gục.',
    icon: Swords,
    secondaryIcon: Keyboard,
    color: 'from-red-500 to-orange-600',
    //  THÊM DÒNG NÀY: Màu chữ cụ thể cho Icon chính
    textColor: 'text-red-600',
    shadow: 'shadow-red-200',
    tags: ['Nhập vai (RPG)', 'Gõ máy', 'Phản xạ'],
    stats: { players: '2.4k', rating: 4.9 },
    href: '#'
  },
  {
    id: 'tarot',
    title: 'Tiên Tri Tarot',
    subtitle: 'Gieo quẻ phong cách Nhật',
    description: 'Hòa mình vào không gian huyền bí đậm chất Nhật Bản. Rút các lá bài Tarot được vẽ theo phong cách Ukiyo-e để nhận lời khuyên về vận mệnh, tình yêu và công việc.',
    icon: Moon,
    secondaryIcon: Flower2,
    color: 'from-violet-500 to-indigo-600',
    //  THÊM DÒNG NÀY: Màu chữ cụ thể cho Icon chính
    textColor: 'text-violet-600',
    shadow: 'shadow-violet-200',
    tags: ['Văn hóa', 'Đọc hiểu', 'Thư giãn'],
    stats: { players: '1.8k', rating: 4.8 },
    href: '/games/tarot'
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
    <div className="min-h-screen bg-slate-50 flex flex-col">

      <div className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-8">

        {/* HEADER SECTION */}
        <div className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-3xl shadow-sm mb-2 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <Gamepad2 size={40} className="text-indigo-600 group-hover:text-white transition-colors relative z-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight">
            Game Center
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Vừa chơi vừa học. Rèn luyện phản xạ ngôn ngữ qua những trận chiến kịch tính hoặc thư giãn với văn hóa Nhật Bản.
          </p>
        </div>

        {/* GAMES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {GAMES.map((game) => (
            <div
              key={game.id}
              className="group relative bg-white rounded-[2rem] border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col h-full"
            >
              {/* Card Header Background */}
              <div className={`h-40 bg-gradient-to-br ${game.color} relative overflow-hidden`}>
                {/* Hiệu ứng nền động */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                {/* Icon phụ trang trí */}
                <game.secondaryIcon className="absolute right-6 bottom-6 text-white/20 w-24 h-24 rotate-12" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <div className="flex items-center gap-5">
                    {/* KHỐI CHỨA ICON CHÍNH */}
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      {/*  ĐÃ SỬA: Dùng textColor thay vì bg-clip-text */}
                      <game.icon size={32} className={game.textColor} />
                    </div>

                    <div>
                      <h3 className="font-black text-2xl md:text-3xl text-white drop-shadow-md leading-none mb-1">
                        {game.title}
                      </h3>
                      <p className="text-white/90 text-sm font-bold uppercase tracking-wider">
                        {game.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 flex-1 flex flex-col">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {game.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold rounded-full uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-slate-600 text-base leading-relaxed mb-8 flex-1">
                  {game.description}
                </p>

                {/* Stats & Action */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-4 text-sm text-slate-400 font-bold">
                    <div className="flex items-center gap-1">
                      <Zap size={16} className="text-yellow-500 fill-yellow-500" />
                      <span>{game.stats.players}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-orange-400 fill-orange-400" />
                      <span>{game.stats.rating}</span>
                    </div>
                  </div>

                  <Link
                    href={game.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePlayGame(game.href);
                    }}
                    className={`
                      px-8 py-3 rounded-xl font-bold text-white shadow-lg 
                      flex items-center gap-2 transition-all transform active:scale-95
                      bg-gradient-to-r ${game.color} ${game.shadow}
                      group-hover:brightness-110 cursor-pointer
                    `}
                  >
                    <Play size={20} fill="currentColor" /> Chơi Ngay
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-20 relative p-8 rounded-3xl bg-slate-900 overflow-hidden text-center text-white">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>

          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-md rounded-full mb-2">
              <Sparkles size={28} className="text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold">Bạn muốn thêm trò chơi nào?</h3>
            <p className="text-slate-400 max-w-lg mx-auto">
              Chúng tôi luôn lắng nghe ý kiến cộng đồng. Hãy chia sẻ ý tưởng game học tập mà bạn muốn trải nghiệm nhé!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}