//app/flashcards/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Check, RotateCw, Volume2, Gamepad2, BookOpen } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import DeckQuiz from '@/components/flashcards/DeckQuiz';
import ConfirmModal from '@/components/ConfirmModal';

type Card = {
  id: string;
  front: string;
  back: string;
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

  const [deck, setDeck] = useState<Deck | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'flip' | 'quiz'>('flip');
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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

  const loadDeck = async () => {
    if (!user || !deckId) return;
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('session_token='))
        ?.split('=')[1];

      console.log('🔑 [DeckDetail] Token:', token ? token.substring(0, 20) + '...' : 'NULL');

      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else {
        console.warn('⚠️ [DeckDetail] Không có token');
      }

      const res = await fetch('/api/flashcards/decks', { headers });

      if (res.status === 401) {
        console.error('❌ 401 Unauthorized');
        showToast('Phiên đăng nhập hết hạn.', 'error');
        router.push('/login');
        return;
      }

      if (!res.ok) {
        console.error('❌ Lỗi fetch deck:', res.status);
        return;
      }

      const data = await res.json();
      const found = (data.decks || []).find((d: any) => d.id === deckId);
      if (found) setDeck(found);
    } catch (e) {
      console.error('❌ Exception:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeck();
  }, [user, deckId]);

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
          back: newBack
        })
      });

      if (res.ok) {
        const newCard = await res.json();
        setDeck({
          ...deck,
          cards: [...deck.cards, newCard]
        });
        setNewFront(''); setNewBack(''); setShowAddForm(false);
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
        setDeck({
          ...deck,
          cards: newCards
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
    setDeck({ ...deck, cards: updatedCards });

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
    setDeck({ ...deck, cards: updatedCards });

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
    setDeck({ ...deck, cards: newCards });

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
            <button
              onClick={() => setMode('flip')}
              className="flex items-center gap-2 bg-white text-blue-600 border-2 border-blue-200 px-5 py-2.5 rounded-xl font-bold hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm"
            >
              <BookOpen size={20} /> Quay lại học từ
            </button>
          )}
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent mb-2">
            {deck.title}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto"></div>
        </div>

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
                          onClick={() => speakText(deck.cards[index].front)}
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
                        <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">
                          Nghĩa
                        </p>
                        <h2 className="font-bold leading-tight text-3xl text-blue-600 break-words">
                          {deck.cards[index].back}
                        </h2>
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

            {/* Form Thêm thẻ */}
            <div className="mt-12 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-2 border-slate-200 max-w-xl mx-auto hover:shadow-xl transition-shadow">
              <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Plus size={20} className="text-blue-600" />
                </div>
                Thêm thẻ mới
              </h3>

              <div className="space-y-3">
                <input
                  value={newFront}
                  onChange={e => setNewFront(e.target.value)}
                  placeholder="Từ vựng (Mặt trước)"
                  className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />

                <input
                  value={newBack}
                  onChange={e => setNewBack(e.target.value)}
                  placeholder="Nghĩa (Mặt sau)"
                  className="w-full border-2 border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />

                <button
                  onClick={handleAddCard}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:scale-105"
                >
                  Thêm
                </button>
              </div>
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