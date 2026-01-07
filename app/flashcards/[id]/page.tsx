'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Check, RotateCw, Volume2, Gamepad2, BookOpen } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import DeckQuiz from '@/components/flashcards/DeckQuiz';

type Card = {
    id: string;
    front: string;
    back: string;
    isLearned: boolean;
};
  
type Deck = {
    id: string;
    title: string;
    description?: string | null;
    cards: Card[];
};

export default function DeckDetailPage() {
  const { user } = useAuth();
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
          alert('❌ Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
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
      
      switch(e.key) {
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
        } else if (res.status === 401) {
            alert('❌ Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
            router.push('/login');
        } else {
            alert('❌ Lỗi thêm thẻ');
            console.error('Lỗi:', res.status);
        }
    } catch (e) {
        console.error(e);
        alert('❌ Lỗi: ' + (e as any).message);
    }
  };

  const handleDeleteCard = async () => {
    if (!user || !deck) return;
    if (!confirm("Xóa thẻ này?")) return;
    
    const card = deck.cards[index];
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

        const res = await fetch(`/api/flashcards/cards/${card.id}`, { 
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
          const newCards = deck.cards.filter(c => c.id !== card.id);
          setDeck({...deck, cards: newCards});
          if(index >= newCards.length) setIndex(Math.max(0, newCards.length - 1));
        } else if (res.status === 401) {
          alert('❌ Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
          router.push('/login');
        } else {
          alert('❌ Lỗi xóa thẻ');
        }
        
    } catch (e) {
        console.error("❌ Lỗi xóa:", e);
        alert('❌ Lỗi: ' + (e as any).message);
    }
  };

  const toggleLearned = async () => {
    if (!user || !deck) return;
    const card = deck.cards[index];
    const newStatus = !card.isLearned;

    const updatedCards = deck.cards.map(c => 
        c.id === card.id ? { ...c, isLearned: newStatus } : c
    );
    setDeck({...deck, cards: updatedCards});

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
    if(!user || !deck) return;
    
    const newCards = deck.cards.map(c => c.id === cardId ? {...c, isLearned: true} : c);
    setDeck({...deck, cards: newCards});

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
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200">
        <Navbar />
      </div>
      
      <main className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        
        {/* Header điều hướng */}
        <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => router.push('/flashcards')} 
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-all hover:gap-3 group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/> 
                <span>Thư viện</span>
            </button>
            
            {mode === 'flip' ? (
                <button 
                    onClick={() => setMode('quiz')}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                    <Gamepad2 size={20}/> Tự tạo bài tập
                </button>
            ) : (
                <button 
                    onClick={() => setMode('flip')}
                    className="flex items-center gap-2 bg-white text-blue-600 border-2 border-blue-200 px-5 py-2.5 rounded-xl font-bold hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm"
                >
                    <BookOpen size={20}/> Quay lại học từ
                </button>
            )}
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent mb-2">
            {deck.title}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto"></div>
        </div>

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
                          <Plus size={32} className="text-slate-400"/>
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
                                <RotateCw size={24}/>
                              </div>
                              
                              {/* Learned badge */}
                              {deck.cards[index].isLearned && (
                                  <div className="absolute top-5 left-5 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md z-20">
                                      <Check size={14}/> Đã thuộc
                                  </div>
                              )}
                              
                              {/* Card content */}
                              <div className="relative z-10 text-center px-8">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                  Từ vựng
                                </p>
                                <h2 className="font-bold leading-tight text-5xl text-slate-800 break-words">
                                    {deck.cards[index].front}
                                </h2>
                              </div>

                              {/* Speaker button */}
                              <div className="absolute bottom-6 z-20" onClick={e => e.stopPropagation()}>
                                  <button 
                                    onClick={() => speakText(deck.cards[index].front)} 
                                    className="p-3 from-slate-100 to-slate-200 rounded-full hover:from-blue-100 hover:to-blue-200 text-blue-600 shadow-md hover:shadow-lg transition-all hover:scale-110"
                                  >
                                    <Volume2 size={20}/>
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
                                <RotateCw size={24}/>
                              </div>
                              
                              {/* Learned badge */}
                              {deck.cards[index].isLearned && (
                                  <div className="absolute top-5 left-5 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md z-20">
                                      <Check size={14}/> Đã thuộc
                                  </div>
                              )}
                              
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
                              onClick={() => { setFlip(false); setIndex(i => i > 0 ? i-1 : deck.cards.length-1) }} 
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
                                <div className="flex gap-3">
                                    <button 
                                      onClick={toggleLearned} 
                                      className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 ${
                                        deck.cards[index].isLearned 
                                          ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' 
                                          : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-green-300'
                                      }`}
                                    >
                                        {deck.cards[index].isLearned ? '✓ Đã thuộc' : 'Đánh dấu thuộc'}
                                    </button>
                                    <button 
                                      onClick={handleDeleteCard} 
                                      className="px-5 py-2.5 rounded-xl text-sm font-bold bg-white text-red-500 border-2 border-red-200 hover:bg-red-50 hover:border-red-300 shadow-md hover:shadow-lg transition-all hover:scale-105"
                                    >
                                      <Trash2 size={16} className="inline mr-1"/> Xóa
                                    </button>
                                </div>
                            </div>

                            <button 
                              onClick={() => { setFlip(false); setIndex(i => i < deck.cards.length-1 ? i+1 : 0) }} 
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
                      <Plus size={20} className="text-blue-600"/>
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
      </main>
    </div>
  );
}