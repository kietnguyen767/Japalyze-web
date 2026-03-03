//app/roadmap/n5/week1_2/learn/page.tsx
'use client';

import { useState } from 'react';
import { HIRAGANA_DATA, KATAKANA_DATA, HIRAGANA_DAKUTEN, KATAKANA_DAKUTEN, KanaChar } from '@/lib/kanaData';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Loader2, Volume2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';

export default function LearnKanaPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const initialTab = (searchParams?.get('tab') as 'hira' | 'kata') || 'hira';
  const questId = searchParams?.get('questId') || 'w1_1';

  const [activeTab, setActiveTab] = useState<'hira' | 'kata'>(initialTab);
  const [submitting, setSubmitting] = useState(false);

  const handleNext = async () => {
    // Determine the actual questId based on the active tab
    let finalQuestId = questId;
    if (activeTab === 'kata' && questId.startsWith('w1')) {
      finalQuestId = questId.replace('w1', 'w2');
    } else if (activeTab === 'hira' && questId.startsWith('w2')) {
      finalQuestId = questId.replace('w2', 'w1');
    }

    setSubmitting(true);
    try {
      await fetch('/api/user/complete-quest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questId: finalQuestId }),
      });

      // Invalidate cache and go back
      queryClient.invalidateQueries({ queryKey: ['roadmap-progress'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-data'] });
      router.back();
    } catch {
      setSubmitting(false);
    }
  };

  const currentData = activeTab === 'hira' ? HIRAGANA_DATA : KATAKANA_DATA;
  const currentDakutenData = activeTab === 'hira' ? HIRAGANA_DAKUTEN : KATAKANA_DAKUTEN;

  const ROWS = [
    { id: 'a' }, { id: 'k' }, { id: 's' }, { id: 't' }, { id: 'n' },
    { id: 'h' }, { id: 'm' }, { id: 'y' }, { id: 'r' }, { id: 'w' },
  ];
  const COLS = ['a', 'i', 'u', 'e', 'o'];

  const getCellData = (rowId: string, colVowel: string): KanaChar | null => {
    if (rowId === 'y' && (colVowel === 'i' || colVowel === 'e')) return null;
    if (rowId === 'w') {
      if (colVowel === 'a') return currentData.find(c => c.romaji === 'wa') || null;
      if (colVowel === 'u') return currentData.find(c => c.romaji === 'wo' || c.romaji === 'o') || null;
      if (colVowel === 'o') return currentData.find(c => c.romaji === 'n') || null;
      return null;
    }
    let r = rowId + colVowel;
    if (rowId === 's' && colVowel === 'i') r = 'shi';
    if (rowId === 't' && colVowel === 'i') r = 'chi';
    if (rowId === 't' && colVowel === 'u') r = 'tsu';
    if (rowId === 'h' && colVowel === 'u') r = 'fu';
    return currentData.find(c => c.romaji === r) || null;
  };

  const playAudio = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    window.speechSynthesis.speak(u);
  };

  const isHira = activeTab === 'hira';
  const accent = isHira ? 'text-blue-600' : 'text-orange-500';
  const hoverBorder = isHira ? 'hover:border-blue-400 hover:bg-blue-50' : 'hover:border-orange-400 hover:bg-orange-50';
  const hoverText = isHira ? 'group-hover:text-blue-600' : 'group-hover:text-orange-500';

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">

      {/* ── Top bar: back + title + tab switcher ── */}
      <div className="shrink-0  border-b border-slate-200 px-4 md:px-8 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          {/* Back link */}
          <button
            onClick={() => router.back()}
            className="group flex items-center text-slate-500 hover:text-blue-600 font-bold transition-colors text-sm"
          >
            <div className="p-2 bg-white border border-slate-200 rounded-full mr-3 group-hover:border-blue-200 transition-colors">
              <ArrowLeft size={16} />
            </div>
            Quay lại Lộ trình
          </button>

          {/* Title */}
          <div className="flex items-center gap-2 font-black text-slate-800 text-base md:text-lg">
            <BookOpen size={18} className={accent} />
            <span>Bảng Chữ Cái Kana</span>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setActiveTab('hira')}
              className={`px-3 md:px-5 py-1.5 rounded-lg font-bold text-xs md:text-sm transition-all
                ${isHira ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Hiragana
            </button>
            <button
              onClick={() => setActiveTab('kata')}
              className={`px-3 md:px-5 py-1.5 rounded-lg font-bold text-xs md:text-sm transition-all
                ${!isHira ? 'bg-white text-orange-500 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Katakana
            </button>
          </div>
        </div>
      </div>

      {/* ── Hint ── */}
      <div className="shrink-0 text-center py-1">
        <p className="text-[10px] text-slate-400 font-medium">
          Bấm vào ô để nghe phát âm <Volume2 size={10} className="inline mb-0.5" />
        </p>
      </div>

      {/* ── Two-column grid area – scrollable ── */}
      <div className="flex-1 overflow-y-auto px-2 md:px-6 pb-4">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center md:items-start pt-2">

          {/* LEFT – 清音 Gojuon */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[12px] font-bold text-slate-400 tracking-widest whitespace-nowrap">
                清音 · Basic
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="grid gap-2 select-none" style={{ gridTemplateColumns: 'repeat(5,5rem)' }}>
              {ROWS.map((row) =>
                COLS.map((colVowel) => {
                  const char = getCellData(row.id, colVowel);
                  if (!char) return <div key={`${row.id}-${colVowel}`} className="" />;
                  return (
                    <div
                      key={char.romaji}
                      onClick={() => playAudio(char.kana)}
                      className={`h-[4.5rem] bg-white border-2 border-slate-100 rounded-xl
                        flex flex-col items-center justify-center cursor-pointer
                        hover:-translate-y-0.5 hover:shadow-md transition-all group relative
                        ${hoverBorder}
                      `}
                    >
                      <span className={`text-2xl font-black leading-none mb-1 text-slate-700 transition-colors ${hoverText}`}>
                        {char.kana}
                      </span>
                      <span className="text-[12px] font-bold text-slate-400 group-hover:text-slate-600 tracking-wide">
                        {char.romaji}
                      </span>
                      <Volume2 size={8} className="absolute top-1 right-1 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Vertical divider (desktop only) */}
          <div className="hidden md:block w-px bg-slate-200 shrink-0" />

          {/* RIGHT – 濁音 / 半濁音 Voiced */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[10px] font-bold text-slate-400 tracking-widest whitespace-nowrap">
                濁音 / 半濁音 · Voiced
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="grid gap-2 select-none" style={{ gridTemplateColumns: 'repeat(5,5rem)' }}>
              {currentDakutenData.map((char: KanaChar) => (
                <div
                  key={`daku-${char.romaji}`}
                  onClick={() => playAudio(char.kana)}
                  className={`h-[4.5rem] bg-white border-2 border-slate-100 rounded-xl
                    flex flex-col items-center justify-center cursor-pointer
                    hover:-translate-y-0.5 hover:shadow-md transition-all group relative
                    ${isHira ? 'hover:border-blue-400 hover:bg-blue-50' : 'hover:border-orange-400 hover:bg-orange-50'}
                  `}
                >
                  <span className={`text-2xl font-black leading-none mb-1 text-slate-700 transition-colors
                    ${isHira ? 'group-hover:text-blue-600' : 'group-hover:text-orange-500'}
                  `}>
                    {char.kana}
                  </span>
                  <span className="text-[12px] font-bold text-slate-400 group-hover:text-slate-600 tracking-wide">
                    {char.romaji}
                  </span>
                  <Volume2 size={8} className="absolute top-1 right-1 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom action bar ── */}
      <div className="shrink-0 bg-white border-t border-slate-200 px-4 md:px-8 py-3 md:py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden md:block">
            <p className="font-bold text-slate-700 text-sm">Đã nhớ mặt chữ?</p>
            <p className="text-xs text-slate-500">Chuyển sang bài tập để kiểm tra trí nhớ.</p>
          </div>
          <button
            onClick={handleNext}
            disabled={submitting}
            className={`w-full md:w-auto flex items-center justify-center gap-2
              px-8 py-4 rounded-2xl font-black text-sm md:text-lg shadow-xl 
              transition-all flex-shrink-0 active:scale-95
              ${submitting
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : isHira
                  ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200/50 hover:-translate-y-1 shadow-blue-500/20'
                  : 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-orange-200/50 hover:-translate-y-1 shadow-orange-500/20'
              }`}
          >
            {submitting
              ? <><Loader2 size={22} className="animate-spin" /> Đang lưu tiến độ...</>
              : <><span>Hoàn thành &amp; Luyện tập</span><ArrowRight size={22} /></>
            }
          </button>
        </div>
      </div>
    </div>
  );
}