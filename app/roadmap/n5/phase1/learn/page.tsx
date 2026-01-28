'use client';

import { useState } from 'react';
import { HIRAGANA_DATA, KATAKANA_DATA, KanaChar } from '@/lib/kanaData';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Loader2, Volume2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar'; // Đảm bảo import Navbar

export default function LearnKanaPage() {
  const [activeTab, setActiveTab] = useState<'hira' | 'kata'>('hira');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // Hàm xử lý: Lưu quest xong thì chuyển thẳng sang bài tập
  const handleNext = async () => {
    setSubmitting(true);
    try {
      // 1. Lưu tiến độ Quest 1
      await fetch('/api/user/complete-quest', {
        method: 'POST',
        body: JSON.stringify({ questId: 'q1_1' })
      });
      
      // 2. Chuyển hướng sang trang Bài tập (Practice)
      router.push('/roadmap/n5/phase1/practice'); 
    } catch (e) {
      setSubmitting(false);
    }
  };

  const currentData = activeTab === 'hira' ? HIRAGANA_DATA : KATAKANA_DATA;

  // --- CẤU HÌNH GIAO DIỆN 5 CỘT (GOJUON) ---
  const ROWS = [
    { id: 'a', prefix: '' },
    { id: 'k', prefix: 'k' },
    { id: 's', prefix: 's' },
    { id: 't', prefix: 't' },
    { id: 'n', prefix: 'n' },
    { id: 'h', prefix: 'h' },
    { id: 'm', prefix: 'm' },
    { id: 'y', prefix: 'y' },
    { id: 'r', prefix: 'r' },
    { id: 'w', prefix: 'w' }, 
  ];

  const COLS = ['a', 'i', 'u', 'e', 'o'];

  const getCellData = (rowId: string, colVowel: string): KanaChar | null => {
    if (rowId === 'y') {
        if (colVowel === 'i' || colVowel === 'e') return null;
    }
    // Hàng cuối: Wa - Wo - N (Xếp N vào cột cuối cùng cho đẹp đội hình)
    if (rowId === 'w') {
        if (colVowel === 'a') return currentData.find(c => c.romaji === 'wa') || null;
        if (colVowel === 'u') return currentData.find(c => c.romaji === 'wo' || c.romaji === 'o') || null; 
        if (colVowel === 'o') return currentData.find(c => c.romaji === 'n') || null; 
        return null; 
    }

    let searchRomaji = rowId + colVowel;
    
    if (rowId === 's' && colVowel === 'i') searchRomaji = 'shi';
    if (rowId === 't' && colVowel === 'i') searchRomaji = 'chi';
    if (rowId === 't' && colVowel === 'u') searchRomaji = 'tsu';
    if (rowId === 'h' && colVowel === 'u') searchRomaji = 'fu';
    
    return currentData.find(c => c.romaji === searchRomaji) || null;
  };

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-700">
      {/* 1. Navbar giữ nguyên */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Header Breadcrumb */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/roadmap/n5" className="group flex items-center text-slate-500 hover:text-blue-600 font-bold transition-colors text-sm">
            <div className="p-2 bg-white border border-slate-200 rounded-full mr-3 group-hover:border-blue-200 transition-colors">
                <ArrowLeft size={16}/> 
            </div>
            Quay lại Lộ trình
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase">
            <BookOpen size={14} /> Lý thuyết
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-6 md:p-10 relative overflow-hidden">
             
             {/* Trang trí background */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-50"></div>

             <div className="relative z-10 text-center mb-8">
                <h1 className="text-3xl font-black text-slate-800 mb-2">Bảng Chữ Cái</h1>
                <p className="text-slate-500">Bấm vào từng chữ để nghe phát âm</p>
             </div>

            {/* Tabs Switcher (Màu Blue/Indigo) */}
            <div className="flex justify-center mb-8">
                <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                    <button 
                        onClick={() => setActiveTab('hira')} 
                        className={`px-6 md:px-10 py-2.5 rounded-xl font-bold transition-all text-sm md:text-base ${activeTab === 'hira' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Hiragana
                    </button>
                    <button 
                        onClick={() => setActiveTab('kata')} 
                        className={`px-6 md:px-10 py-2.5 rounded-xl font-bold transition-all text-sm md:text-base ${activeTab === 'kata' ? 'bg-white text-orange-500 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Katakana
                    </button>
                </div>
            </div>

            {/* --- GRID 5 CỘT --- */}
            <div className="grid grid-cols-5 gap-3 md:gap-4 select-none max-w-2xl mx-auto">
                {ROWS.map((row) => (
                    COLS.map((colVowel) => {
                        const char = getCellData(row.id, colVowel);
                        
                        if (!char) return <div key={`${row.id}-${colVowel}`} className="aspect-square"></div>;

                        return (
                            <div 
                                key={char.romaji} 
                                className="aspect-square bg-slate-50 border-2 border-slate-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 hover:-translate-y-1 hover:shadow-md transition-all group relative"
                                onClick={() => playAudio(char.kana)}
                            >
                                <span className={`text-3xl md:text-4xl font-black mb-0.5 transition-colors ${activeTab === 'hira' ? 'text-slate-700 group-hover:text-blue-600' : 'text-slate-700 group-hover:text-orange-500'}`}>
                                    {char.kana}
                                </span>
                                <span className="text-xs font-bold text-slate-400 uppercase group-hover:text-slate-600">
                                    {char.romaji}
                                </span>
                                <Volume2 size={14} className="absolute top-2 right-2 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        );
                    })
                ))}
            </div>

        </div>

        {/* Footer Action Bar */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 md:p-6 z-50">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left hidden md:block">
                    <p className="font-bold text-slate-700">Đã nhớ mặt chữ?</p>
                    <p className="text-xs text-slate-500">Chuyển sang phần bài tập để kiểm tra trí nhớ.</p>
                </div>
                
                <button 
                    onClick={handleNext} 
                    disabled={submitting}
                    className="w-full md:w-auto px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                    {submitting ? <Loader2 className="animate-spin" size={20}/> : null} 
                    {submitting ? 'Đang lưu...' : 'Hoàn thành & Luyện tập ngay'} 
                    {!submitting && <ArrowRight size={20}/>}
                </button>
            </div>
        </div>
        
        {/* Spacer cho Footer cố định */}
        <div className="h-24"></div>

      </div>
    </div>
  );
}