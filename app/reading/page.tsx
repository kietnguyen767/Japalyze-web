//app/reading/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { 
  BookOpenText, Search, Signal, Play, 
  Clock, Mic, Star, GraduationCap, Loader2
} from 'lucide-react';

// Định nghĩa lại kiểu dữ liệu khớp với Database
type Article = {
  id: string;
  title: string;
  excerpt: string;
  level: string;
  image: string;
  topic: string;
  createdAt: string;
};

const LEVELS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'beginner', label: 'Mới bắt đầu' },
  { id: 'n5', label: 'N5' }, { id: 'n4', label: 'N4' },
  { id: 'n3', label: 'N3' }, { id: 'n2', label: 'N2' }, { id: 'n1', label: 'N1' },
];

export default function ReadingLibraryPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. FETCH DỮ LIỆU THẬT TỪ API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Gọi lại API mà Admin dùng để lấy danh sách (hoặc tạo API riêng cho public nếu muốn bảo mật kỹ hơn)
        const res = await fetch('/api/admin/reading'); 
        if (res.ok) {
          setArticles(await res.json());
        }
      } catch (error) {
        console.error("Lỗi tải bài đọc:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // 2. Filter Logic
  const filteredArticles = articles.filter(article => {
    const matchLevel = selectedLevel === 'all' || article.level === selectedLevel;
    const matchSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchLevel && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 flex items-center gap-3">
              <BookOpenText className="text-blue-600" size={40} />
              Thư viện Luyện đọc
            </h1>
            <p className="text-slate-500 text-lg">
              Cải thiện phát âm và ngữ điệu qua các bài đọc được biên soạn kỹ lưỡng.
            </p>
          </div>

          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Tìm kiếm chủ đề..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>
        </div>

        {/* FILTER TABS */}
        <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-slate-200">
          {LEVELS.map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevel(lvl.id)}
              className={`
                px-4 py-2 rounded-full font-bold text-sm transition-all
                ${selectedLevel === lvl.id 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}
              `}
            >
              {lvl.label}
            </button>
          ))}
        </div>

        {/* LOADING STATE */}
        {loading ? (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        ) : (
            /* ARTICLES GRID */
            filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((item) => (
                <Link href={`/reading/${item.id}`} key={item.id} className="group">
                    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-full flex flex-col">
                    
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-slate-200">
                        {item.image ? (
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400"><BookOpenText size={40}/></div>
                        )}
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold uppercase flex items-center gap-1">
                        <Signal size={12} /> {item.level}
                        </div>
                        
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <Play className="text-blue-600 fill-blue-600 ml-1" size={24} />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-bold text-xl text-slate-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {item.title}
                        </h3>
                        <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">
                        {item.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-slate-400 font-medium pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1"><Clock size={14}/> {new Date(item.createdAt).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="flex items-center gap-1 text-orange-400">
                            <Star size={14} fill="currentColor"/> Mới
                        </div>
                        </div>
                    </div>
                    </div>
                </Link>
                ))}
            </div>
            ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                <div className="inline-flex p-4 bg-slate-50 rounded-full mb-4 text-slate-300">
                    <GraduationCap size={40} />
                </div>
                <h3 className="text-lg font-bold text-slate-700">Chưa có bài đọc nào</h3>
                <p className="text-slate-500">Hãy chờ Admin cập nhật thêm nhé!</p>
            </div>
            )
        )}

      </div>
    </div>
  );
}