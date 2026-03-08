//app/flashcards/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Check, RotateCw, Volume2, Gamepad2, BookOpen, Trophy, Layers } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import DeckQuiz from '@/components/flashcards/DeckQuiz';
import ConfirmModal from '@/components/ConfirmModal';
import * as wanakana from 'wanakana';


type Card = {
  id: string;
  front: string;
  back: string;
  example?: string | null;
  isLearned: boolean;
  nextReviewAt?: string | Date;
  interval?: number;
  repetitions?: number;
};

type Deck = {
  id: string;
  title: string;
  description?: string | null;
  cards: Card[];
};

export default function DeckDetailPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const params = useParams();
  const router = useRouter();
  const deckId = params?.id as string;

  const queryClient = useQueryClient();

  const { data: deck, isLoading: loading } = useQuery<Deck | null>({
    queryKey: ['deck', deckId],
    queryFn: async () => {
      if (!user || !deckId) return null;
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('session_token='))
          ?.split('=')[1];

        const headers: HeadersInit = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch('/api/flashcards/decks', { headers });

        if (res.status === 401) {
          showToast('Phiên đăng nhập hết hạn.', 'error');
          router.push('/login');
          return null;
        }

        if (!res.ok) return null;

        const data = await res.json();
        return (data.decks || []).find((d: any) => d.id === deckId) || null;
      } catch (e) {
        console.error('❌ Error fetching deck:', e);
        return null;
      }
    },
    enabled: !!user && !!deckId,
    // Giữ dữ liệu trong cache để load tức thì khi quay lại
    staleTime: 5 * 60 * 1000,
  });

  const [mode, setMode] = useState<'flip' | 'quiz'>('flip');
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');
  const [newExample, setNewExample] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [quizStats, setQuizStats] = useState({ score: 0, answeredCount: 0, total: 0 });


  // CSS cho hiệu ứng lật 3D
  const flipCardStyle = `
    .flip-card-container { 
      perspective: 1000px;
      height: 320px;
    }
    .flip-card {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.6s;
      transform-style: preserve-3d;
    }
    .flip-card.flipped {
      transform: rotateY(180deg);
    }
    .flip-card-face {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      -moz-backface-visibility: hidden;
    }
    .flip-card-back {
      transform: rotateY(180deg);
    }
  `;

  // useQuery handles loading automatically


  // Xử lý phím tắt bàn phím
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!deck || deck.cards.length === 0) return;

      // Tránh xử lý khi đang focus vào input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case 'ArrowLeft':
          setFlip(false);
          setIndex(i => i > 0 ? i - 1 : deck.cards.length - 1);
          break;
        case 'ArrowRight':
          setFlip(false);
          setIndex(i => i < deck.cards.length - 1 ? i + 1 : 0);
          break;
        case ' ':
        case 'Enter':
          e.preventDefault();
          setFlip(f => !f);
          break;
        case '1':
          if (flip) handleRateCard('hard');
          break;
        case '2':
          if (flip) handleRateCard('good');
          break;
        case '3':
          if (flip) handleRateCard('easy');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [deck, flip]);

  const speakText = (text: string) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    window.speechSynthesis.speak(u);
  };

  const handleAddCard = async () => {
    if (!user || !deck || !newFront || !newBack) return;

    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('session_token='))
        ?.split('=')[1];

      if (!token) {
        alert('❌ Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
        router.push('/login');
        return;
      }

      const res = await fetch('/api/flashcards/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          deckId: deck.id,
          front: newFront,
          back: newBack,
          example: newExample
        })
      });

      if (res.ok) {
        const newCard = await res.json();
        queryClient.setQueryData(['deck', deckId], (old: Deck | null) => {
          if (!old) return old;
          return {
            ...old,
            cards: [...old.cards, newCard]
          };
        });

        setNewFront(''); setNewBack(''); setNewExample(''); setShowAddForm(false);
        showToast('Đã thêm thẻ mới thành công!');
      } else if (res.status === 401) {
        showToast('Phiên đăng nhập hết hạn.', 'error');
        router.push('/login');
      } else {
        showToast('Lỗi khi thêm thẻ', 'error');
        console.error('Lỗi:', res.status);
      }
    } catch (e) {
      console.error(e);
      showToast('Lỗi: ' + (e as any).message, 'error');
    }
  };

  const handleDeleteCardClick = () => {
    if (!user || !deck) return;
    setIsConfirmOpen(true);
  };

  const confirmDeleteCard = async () => {
    if (!user || !deck) return;

    const card = deck.cards[index];
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('session_token='))
        ?.split('=')[1];

      if (!token) {
        showToast('Phiên đăng nhập hết hạn.', 'error');
        router.push('/login');
        return;
      }

      const res = await fetch(`/api/flashcards/cards/${card.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        const newCards = deck.cards.filter(c => c.id !== card.id);
        queryClient.setQueryData(['deck', deckId], (old: Deck | null) => {
          if (!old) return old;
          return {
            ...old,
            cards: newCards
          };
        });

        if (index >= newCards.length) setIndex(Math.max(0, newCards.length - 1));
        showToast('Đã xóa thẻ');
      } else if (res.status === 401) {
        showToast('Phiên đăng nhập hết hạn.', 'error');
        router.push('/login');
      } else {
        showToast('Lỗi khi xóa thẻ', 'error');
      }

    } catch (e) {
      console.error("❌ Lỗi xóa:", e);
      showToast('Lỗi hệ thống khi xóa', 'error');
    }
  };

  const handleRateCard = async (rating: 'hard' | 'good' | 'easy') => {
    if (!user || !deck) return;
    const card = deck.cards[index];

    // Optimistic UI update
    const updatedCards = deck.cards.map(c => {
      if (c.id === card.id) {
        let nextDate = new Date();
        let interval = 0;
        let repetitions = (c.repetitions || 0) + 1; // Mặc định tăng rep để đánh dấu không còn mới

        if (rating === 'hard') {
          nextDate = new Date(Date.now() + 10 * 60 * 1000);
          interval = 0;
          // Hard có thể giữ nguyên rep hoặc tăng 1 để đánh dấu đã học (tùy logic backend)
          // Ở đây ta theo logic backend: hễ click là rep ít nhất lên 1 nếu đang là 0
          repetitions = Math.max(1, (c.repetitions || 0));
        } else if (rating === 'good') {
          nextDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
          interval = 1;
        } else if (rating === 'easy') {
          nextDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000);
          interval = 4;
        }
        return { ...c, isLearned: rating !== 'hard', nextReviewAt: nextDate, interval, repetitions };
      }
      return c;
    });
    queryClient.setQueryData(['deck', deckId], (old: Deck | null) => {
      if (!old) return old;
      return { ...old, cards: updatedCards };
    });


    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('session_token='))
        ?.split('=')[1];

      // Chuyển card ngay (Optimistic)
      setTimeout(() => {
        setFlip(false);
        setIndex(i => i < deck.cards.length - 1 ? i + 1 : 0);
      }, 200);

      await fetch(`/api/flashcards/cards/${card.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rating })
      });
    } catch (e) {
      console.error('❌ [handleRateCard] Error:', e);
    }
  };

  const toggleLearned = async () => {
    if (!user || !deck) return;
    const card = deck.cards[index];
    const newStatus = !card.isLearned;

    const updatedCards = deck.cards.map(c =>
      c.id === card.id ? { ...c, isLearned: newStatus } : c
    );
    queryClient.setQueryData(['deck', deckId], (old: Deck | null) => {
      if (!old) return old;
      return { ...old, cards: updatedCards };
    });


    try {
      await fetch(`/api/flashcards/cards/${card.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isLearned: newStatus })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleQuizProgress = async (cardId: string) => {
    if (!user || !deck) return;

    const newCards = deck.cards.map(c => c.id === cardId ? { ...c, isLearned: true } : c);
    queryClient.setQueryData(['deck', deckId], (old: Deck | null) => {
      if (!old) return old;
      return { ...old, cards: newCards };
    });


    await fetch(`/api/flashcards/cards/${cardId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isLearned: true })
    });
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium">Đang tải...</p>
      </div>
    </div>
  );

  if (!deck) return (
    <div className="min-h-screen from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
        <p className="text-slate-700 text-lg">Không tìm thấy bộ thẻ.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen from-slate-50 via-blue-50 to-indigo-50">
      <style>{flipCardStyle}</style>
      <main className="container mx-auto px-4 py-8 max-w-4xl relative z-10">

        {/* Header điều hướng */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.push('/flashcards')}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-all hover:gap-3 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Thư viện</span>
          </button>

          {mode === 'flip' ? (
            <button
              onClick={() => setMode('quiz')}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <Gamepad2 size={20} /> Tự tạo bài tập
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-4 mr-2 py-1.5 px-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white shadow-sm">
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Tiến độ</span>
                  <span className="text-xs font-black text-slate-700">{quizStats.answeredCount}/{quizStats.total}</span>
                </div>
                <div className="w-[1px] h-6 bg-slate-200" />
                <div className="flex items-center gap-1.5 text-yellow-600 font-bold">
                  <Trophy size={14} className="text-yellow-500" />
                  <span className="text-sm">{quizStats.score}</span>
                </div>
              </div>

              <button
                onClick={() => setMode('flip')}
                className="flex items-center gap-2 bg-white text-blue-600 border-2 border-blue-200 px-5 py-2.5 rounded-xl font-bold hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm"
              >
                <BookOpen size={20} /> Quay lại học từ
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent mb-2">
              {deck.title}
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto md:mx-0"></div>
          </div>

          {/* Nút thêm thẻ mới - Compact */}
          {!deck.description?.includes('[SAMPLE]') && mode === 'flip' && (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold transition-all shadow-lg hover:scale-105 active:scale-95 ${showAddForm
                ? 'bg-slate-800 text-white'
                : 'bg-white text-blue-600 border-2 border-blue-100 hover:border-blue-400'
                }`}
            >
              {showAddForm ? <Check size={18} /> : <Plus size={18} />}
              <span>{showAddForm ? 'Đóng form' : 'Thêm thẻ mới'}</span>
            </button>
          )}
        </div>

        {/* Form Thêm thẻ - Slide down animation effect logic */}
        {showAddForm && !deck.description?.includes('[SAMPLE]') && (
          <div className="mb-8 bg-white p-6 rounded-2xl shadow-xl border-2 border-blue-400 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-[1.5] flex flex-col gap-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase ml-2">Chữ Hán/Từ vựng</p>
                <input
                  value={newFront}
                  onChange={e => setNewFront(e.target.value)}
                  placeholder="VD: 日本語"
                  className="w-full border-2 border-slate-100 p-3 rounded-xl focus:border-blue-400 outline-none transition-all"
                  autoFocus
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p className="text-[10px] font-bold text-blue-400 uppercase ml-2">Cách đọc (Auto-Romaji)</p>
                <input
                  value={newBack}
                  onChange={e => {
                    const val = e.target.value;
                    setNewBack(val);
                  }}
                  onBlur={() => {
                    // Tự động chuyển hiragana sang romaji nếu user chưa làm
                    if (newBack && wanakana.isHiragana(newBack)) {
                      setNewBack(prev => `${prev} (${wanakana.toRomaji(prev)})`);
                    }
                  }}
                  placeholder="VD: にほんご"
                  className="w-full border-2 border-slate-100 p-3 rounded-xl focus:border-blue-400 outline-none transition-all"
                />
              </div>
              <div className="flex-[1.5] flex flex-col gap-1">
                <p className="text-[10px] font-bold text-indigo-400 uppercase ml-2">Nghĩa tiếng Việt</p>
                <input
                  value={newExample}
                  onChange={e => setNewExample(e.target.value)}
                  placeholder="Nghĩa của từ"
                  className="w-full border-2 border-slate-100 p-3 rounded-xl focus:border-blue-400 outline-none transition-all"
                />
              </div>
              <div className="flex-none flex items-end">
                <button
                  onClick={handleAddCard}
                  className="w-full bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all active:scale-95 h-[52px]"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Thống kê SRS - Thông minh hơn */}
        {mode === 'flip' && deck.cards.length > 0 && (
          (() => {
            const stats = {
              hard: deck.cards.filter(c => c.interval === 0 && (c.repetitions || 0) > 0).length,
              good: deck.cards.filter(c => c.interval === 1).length,
              easy: deck.cards.filter(c => c.interval === 4).length,
              new: deck.cards.filter(c => c.interval === 0 && (c.repetitions || 0) === 0).length,
            };

            return (
              <div className="flex flex-col items-center mb-8 w-full max-w-2xl mx-auto">
                <div className="flex w-full h-3 rounded-full overflow-hidden shadow-inner bg-slate-200 mb-3">
                  <div style={{ width: `${(stats.hard / deck.cards.length) * 100}%` }} className="bg-gradient-to-r from-red-400 to-red-500 transition-all duration-500"></div>
                  <div style={{ width: `${(stats.good / deck.cards.length) * 100}%` }} className="bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-500"></div>
                  <div style={{ width: `${(stats.easy / deck.cards.length) * 100}%` }} className="bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"></div>
                  <div style={{ width: `${(stats.new / deck.cards.length) * 100}%` }} className="bg-gradient-to-r from-slate-400 to-slate-500 transition-all duration-500"></div>
                </div>

                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <span className="text-xs font-bold text-slate-600">Hard: <span className="text-red-600">{stats.hard}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                    <span className="text-xs font-bold text-slate-600">Good: <span className="text-blue-600">{stats.good}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    <span className="text-xs font-bold text-slate-600">Easy: <span className="text-emerald-600">{stats.easy}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div>
                    <span className="text-xs font-bold text-slate-600">Mới: <span className="text-slate-500">{stats.new}</span></span>
                  </div>
                </div>
              </div>
            );
          })()
        )}

        {mode === 'quiz' ? (
          <DeckQuiz
            cards={deck.cards}
            deckId={deck.id}
            onBack={() => setMode('flip')}
            onUpdateProgress={handleQuizProgress}
            onStatsChange={(stats) => setQuizStats(stats)}
          />
        ) : (
          <>
            {deck.cards.length === 0 ? (
              <div className="text-center py-16 bg-white/60 backdrop-blur-sm border-2 border-dashed border-slate-300 rounded-2xl">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus size={32} className="text-slate-400" />
                </div>
                <p className="text-slate-600 text-lg mb-4">Chưa có thẻ nào trong bộ này</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="text-blue-600 font-bold hover:text-blue-700 underline decoration-2 underline-offset-4"
                >
                  Thêm thẻ đầu tiên ngay
                </button>
              </div>
            ) : (
              <div className="max-w-xl mx-auto">
                {/* Flashcard với hiệu ứng lật 3D - Không đè chữ */}
                <div className="flip-card-container">
                  <div
                    onClick={() => setFlip(!flip)}
                    className={`flip-card cursor-pointer ${flip ? 'flipped' : ''}`}
                  >
                    {/* Mặt trước */}
                    <div
                      className="flip-card-face bg-white rounded-3xl shadow-2xl border-2 border-slate-200 flex flex-col items-center justify-center group hover:border-blue-400 transition-colors overflow-hidden"
                      style={{ visibility: flip ? 'hidden' : 'visible' }}
                    >
                      {/* Rotate icon */}
                      <div className="absolute top-5 right-5 text-slate-300 group-hover:text-blue-500 group-hover:rotate-180 transition-all duration-300 z-20">
                        <RotateCw size={24} />
                      </div>

                      {/* SRS Badge */}
                      {(() => {
                        const card = deck.cards[index];
                        if (card.interval === 0 && (card.repetitions || 0) === 0) return null;

                        let label = "Mới";
                        let color = "from-slate-400 to-slate-500";

                        if (card.interval === 0 && (card.repetitions || 0) > 0) { label = "Hard"; color = "from-red-400 to-red-500"; }
                        else if (card.interval === 1) { label = "Good"; color = "from-blue-400 to-blue-500"; }
                        else if (card.interval === 4) { label = "Easy"; color = "from-green-400 to-emerald-500"; }

                        return (
                          <div className={`absolute top-5 left-5 bg-gradient-to-r ${color} text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md z-20`}>
                            <Check size={14} /> {label}
                          </div>
                        );
                      })()}

                      {/* Card content */}
                      <div className="relative z-10 text-center px-8">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                          Từ vựng
                        </p>
                        <h2 className="font-bold leading-tight text-5xl text-slate-800 break-words">
                          {deck.cards[index].front}
                        </h2>
                        {deck.cards[index].nextReviewAt && (
                          <p className="text-[10px] text-slate-400 mt-4 font-medium italic">
                            Ôn lại: {new Date(deck.cards[index].nextReviewAt!).toLocaleDateString('vi-VN')}
                          </p>
                        )}
                      </div>

                      {/* Speaker button */}
                      <div className="absolute bottom-6 z-20" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakText(deck.cards[index].front);
                          }}
                          className="p-3 from-slate-100 to-slate-200 rounded-full hover:from-blue-100 hover:to-blue-200 text-blue-600 shadow-md hover:shadow-lg transition-all hover:scale-110"
                        >
                          <Volume2 size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Mặt sau */}
                    <div
                      className="flip-card-face flip-card-back bg-white rounded-3xl shadow-2xl border-2 border-blue-300 flex flex-col items-center justify-center overflow-hidden"
                      style={{ visibility: flip ? 'visible' : 'hidden' }}
                    >
                      {/* Background decoration */}
                      <div className="absolute inset-0 from-blue-100/50 to-indigo-100/50 z-0"></div>

                      {/* Rotate icon */}
                      <div className="absolute top-5 right-5 text-blue-400 z-20">
                        <RotateCw size={24} />
                      </div>

                      {/* SRS Badge (Same as front) */}
                      {(() => {
                        const card = deck.cards[index];
                        if (card.interval === 0 && (card.repetitions || 0) === 0) return null;

                        let label = "Mới";
                        let color = "from-slate-400 to-slate-500";

                        if (card.interval === 0 && (card.repetitions || 0) > 0) { label = "Hard"; color = "from-red-400 to-red-500"; }
                        else if (card.interval === 1) { label = "Good"; color = "from-blue-400 to-blue-500"; }
                        else if (card.interval === 4) { label = "Easy"; color = "from-green-400 to-emerald-500"; }

                        return (
                          <div className={`absolute top-5 left-5 bg-gradient-to-r ${color} text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md z-20`}>
                            <Check size={14} /> {label}
                          </div>
                        );
                      })()}

                      {/* Card content */}
                      <div className="relative z-10 text-center px-8">
                        <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
                          Nghĩa
                        </p>
                        <h2 className="font-bold leading-tight text-3xl text-blue-600 break-words mb-4">
                          {deck.cards[index].example || deck.cards[index].back}
                        </h2>
                        <div className="h-[1px] w-12 bg-blue-100 mx-auto mb-4"></div>
                        <p className="text-sm font-medium text-slate-400 italic">
                          {deck.cards[index].back}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={() => { setFlip(false); setIndex(i => i > 0 ? i - 1 : deck.cards.length - 1) }}
                    className="p-4 bg-white shadow-lg rounded-full hover:bg-blue-50 hover:shadow-xl transition-all hover:scale-110 border border-slate-200"
                    title="Phím mũi tên trái ←"
                  >
                    <span className="text-2xl font-bold text-slate-700">←</span>
                  </button>

                  <div className="text-center">
                    <div className="bg-white px-6 py-2 rounded-full shadow-md border border-slate-200 mb-4">
                      <span className="font-bold text-slate-700 text-lg">
                        {index + 1} / {deck.cards.length}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-3">
                      ⌨️ Space/Enter: Lật thẻ | ← →: Chuyển thẻ
                    </p>
                    <div className="flex flex-col gap-3">
                      {flip ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRateCard('hard')}
                            className="flex-1 py-3 px-2 bg-red-50 text-red-600 border-2 border-red-200 rounded-xl text-xs font-bold hover:bg-red-600 hover:text-white transition-all shadow-sm flex flex-col items-center"
                          >
                            <span>Hard</span>
                            <span className="text-[9px] opacity-70">10-15m</span>
                          </button>
                          <button
                            onClick={() => handleRateCard('good')}
                            className="flex-1 py-3 px-2 bg-blue-50 text-blue-600 border-2 border-blue-200 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm flex flex-col items-center"
                          >
                            <span>Good</span>
                            <span className="text-[9px] opacity-70">1 ngày</span>
                          </button>
                          <button
                            onClick={() => handleRateCard('easy')}
                            className="flex-1 py-3 px-2 bg-green-50 text-green-600 border-2 border-green-200 rounded-xl text-xs font-bold hover:bg-green-600 hover:text-white transition-all shadow-sm flex flex-col items-center"
                          >
                            <span>Easy</span>
                            <span className="text-[9px] opacity-70">4 ngày</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-3">
                          <button
                            onClick={toggleLearned}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 ${deck.cards[index].isLearned
                              ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                              : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-green-300'
                              }`}
                          >
                            {deck.cards[index].isLearned ? '✓ Đã thuộc' : 'Đánh dấu thuộc'}
                          </button>
                          <button
                            onClick={handleDeleteCardClick}
                            className="px-5 py-2.5 rounded-xl text-sm font-bold bg-white text-red-500 border-2 border-red-200 hover:bg-red-50 hover:border-red-300 shadow-md hover:shadow-lg transition-all hover:scale-105"
                          >
                            <Trash2 size={16} className="inline mr-1" /> Xóa
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => { setFlip(false); setIndex(i => i < deck.cards.length - 1 ? i + 1 : 0) }}
                    className="p-4 bg-white shadow-lg rounded-full hover:bg-blue-50 hover:shadow-xl transition-all hover:scale-110 border border-slate-200"
                    title="Phím mũi tên phải →"
                  >
                    <span className="text-2xl font-bold text-slate-700">→</span>
                  </button>
                </div>
              </div>
            )}

            {/* Danh sách thẻ - Quizlet style */}
            <div className="mt-20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-2xl text-slate-800 flex items-center gap-3">
                  <Layers className="text-blue-500" />
                  Danh sách thẻ ({deck.cards.length})
                </h3>
              </div>

              <div className="space-y-4">
                {deck.cards.map((card, idx) => (
                  <div
                    key={card.id}
                    className="group bg-white rounded-2xl p-5 border-2 border-slate-100 shadow-sm hover:border-blue-300 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
                  >
                    <div className="flex-none text-slate-300 font-bold text-sm w-6">{idx + 1}</div>

                    <div className="flex-1 md:border-r border-slate-100 pr-4">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Chữ Hán</p>
                      <p className="text-xl font-bold text-slate-800 break-words">{card.front}</p>
                    </div>

                    <div className="flex-1 md:border-r border-slate-100 pr-4">
                      <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Phát âm</p>
                      <p className="text-lg font-medium text-slate-500 italic break-words">{card.back}</p>
                    </div>

                    <div className="flex-[1.5]">
                      <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Nghĩa</p>
                      <p className="text-xl font-bold text-slate-700 break-words">{card.example || card.back}</p>
                    </div>

                    <div className="flex-none flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => speakText(card.front)}
                        className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        title="Nghe phát âm"
                      >
                        <Volume2 size={20} />
                      </button>
                      {!deck.description?.includes('[SAMPLE]') && (
                        <button
                          onClick={() => {
                            setIndex(idx);
                            handleDeleteCardClick();
                          }}
                          className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          title="Xóa thẻ"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {deck.cards.length === 0 && (
                <div className="text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-medium italic">Không có thẻ nào để hiển thị trong danh sách</p>
                </div>
              )}
            </div>
          </>
        )}

        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={confirmDeleteCard}
          title="Xác nhận xóa"
          message="Bạn có chắc chắn muốn xóa thẻ này khỏi bộ sưu tập không?"
          confirmText="Xóa ngay"
          cancelText="Giữ lại"
        />
      </main>
    </div>
  );
}
