'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Check, RotateCw, Volume2, Gamepad2, BookOpen } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
// Import component Quiz mới
import DeckQuiz from '@/components/flashcards/DeckQuiz';

// --- TYPE MỚI ---
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
  
  // State: 'flip' (lật thẻ) hoặc 'quiz' (trắc nghiệm)
  const [mode, setMode] = useState<'flip' | 'quiz'>('flip');
  
  // State cho Flashcard
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form add card
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');

  // 1. Fetch Deck (Dùng lại API lấy danh sách rồi lọc - Logic tạm thời)
  const loadDeck = async () => {
    if (!user || !deckId) return;
    try {
        const res = await fetch('/api/flashcards/decks');
        const data = await res.json();
        const found = (data.decks || []).find((d: any) => d.id === deckId);
        if (found) setDeck(found);
    } catch (e) {
        console.error(e);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    loadDeck();
  }, [user, deckId]);

  // 2. Các hàm xử lý
  const speakText = (text: string) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    window.speechSynthesis.speak(u);
  };

  const handleAddCard = async () => {
    if (!user || !deck || !newFront || !newBack) return;
    
    try {
        const res = await fetch('/api/flashcards/cards', { // 👈 API MỚI
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                deckId: deck.id,
                front: newFront,
                back: newBack
            })
        });

        if (res.ok) {
            const newCard = await res.json();
            // Update local state
            setDeck({
                ...deck,
                cards: [...deck.cards, newCard]
            });
            setNewFront(''); setNewBack(''); setShowAddForm(false);
        }
    } catch (e) {
        console.error(e);
    }
  };

  const handleDeleteCard = async () => {
    if (!user || !deck) return;
    if (!confirm("Xóa thẻ này?")) return;
    
    const card = deck.cards[index];
    try {
        await fetch(`/api/flashcards/cards/${card.id}`, { method: 'DELETE' }); // 👈 API MỚI (Cần bổ sung ở backend nếu chưa có)
        
        // Update UI
        const newCards = deck.cards.filter(c => c.id !== card.id);
        setDeck({...deck, cards: newCards});
        if(index >= newCards.length) setIndex(Math.max(0, newCards.length - 1));
        
    } catch (e) {
        console.error("Lỗi xóa");
    }
  };

  // Logic đánh dấu thuộc (Manual)
  const toggleLearned = async () => {
    if (!user || !deck) return;
    const card = deck.cards[index];
    const newStatus = !card.isLearned;

    // Optimistic UI
    const updatedCards = deck.cards.map(c => 
        c.id === card.id ? { ...c, isLearned: newStatus } : c
    );
    setDeck({...deck, cards: updatedCards});

    try {
        await fetch(`/api/flashcards/cards/${card.id}`, { // 👈 API MỚI (PUT)
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isLearned: newStatus })
        });
    } catch (e) {
        console.error(e);
    }
  };

  // Logic Callback từ Quiz (Khi trả lời đúng)
  const handleQuizProgress = async (cardId: string) => {
    if(!user || !deck) return;
    
    // Cập nhật UI ngay lập tức
    const newCards = deck.cards.map(c => c.id === cardId ? {...c, isLearned: true} : c);
    setDeck({...deck, cards: newCards});

    // Gọi API
    await fetch(`/api/flashcards/cards/${cardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isLearned: true })
    });
  };

  if (loading) return <div className="p-10 text-center">Đang tải...</div>;
  if (!deck) return <div className="p-10 text-center">Không tìm thấy bộ thẻ.</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-50 bg-white shadow-sm"><Navbar /></div>
      <main className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        
        {/* Header điều hướng */}
        <div className="flex justify-between items-center mb-6">
            <button onClick={() => router.push('/flashcards')} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium">
                <ArrowLeft size={20}/> Thư viện
            </button>
            
            {/* Toggle Mode Button */}
            {mode === 'flip' ? (
                <button 
                    onClick={() => setMode('quiz')}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
                >
                    <Gamepad2 size={20}/> Tự tạo bài tập
                </button>
            ) : (
                <button 
                    onClick={() => setMode('flip')}
                    className="flex items-center gap-2 bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-xl font-bold hover:bg-blue-50"
                >
                    <BookOpen size={20}/> Quay lại học từ
                </button>
            )}
        </div>

        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">{deck.title}</h1> {/* .title */}

        {/* --- MODE: QUIZ --- */}
        {mode === 'quiz' ? (
            <DeckQuiz 
                cards={deck.cards} 
                deckId={deck.id} 
                onBack={() => setMode('flip')} 
                onUpdateProgress={handleQuizProgress}
            />
        ) : (
        /* --- MODE: FLIP (Lật thẻ) --- */
            <>
                {deck.cards.length === 0 ? (
                    <div className="text-center py-10 border-2 border-dashed rounded-xl">
                        <p className="text-slate-500 mb-4">Chưa có thẻ nào.</p>
                        <button onClick={() => setShowAddForm(true)} className="text-blue-600 font-bold">+ Thêm thẻ ngay</button>
                    </div>
                ) : (
                    <div className="max-w-xl mx-auto">
                        <div onClick={() => setFlip(!flip)} className="relative h-80 bg-white rounded-3xl shadow-xl border-4 border-slate-100 flex flex-col items-center justify-center cursor-pointer hover:border-blue-300 transition-all group">
                            <div className="absolute top-4 right-4 text-slate-300 group-hover:text-blue-400"><RotateCw/></div>
                            {deck.cards[index].isLearned && ( // .isLearned
                                <div className="absolute top-4 left-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                    <Check size={14}/> Đã thuộc
                                </div>
                            )}
                            
                            <p className="text-xs font-bold text-slate-400 uppercase mb-2">{flip ? 'Nghĩa' : 'Từ vựng'}</p>
                            <h2 className={`font-bold ${flip ? 'text-3xl text-blue-600' : 'text-5xl text-slate-800'}`}>
                                {flip ? deck.cards[index].back : deck.cards[index].front}
                            </h2>

                            <div className="absolute bottom-6" onClick={e => e.stopPropagation()}>
                                <button onClick={() => speakText(deck.cards[index].front)} className="p-3 bg-slate-100 rounded-full hover:bg-blue-100 text-blue-600"><Volume2/></button>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex justify-between items-center mt-8">
                            <button onClick={() => { setFlip(false); setIndex(i => i > 0 ? i-1 : deck.cards.length-1) }} className="p-3 bg-white shadow rounded-full hover:bg-slate-50">←</button>
                            
                            <div className="text-center">
                                <span className="font-bold text-slate-700">{index + 1} / {deck.cards.length}</span>
                                <div className="flex gap-2 mt-2">
                                    <button onClick={toggleLearned} className={`px-4 py-2 rounded-lg text-sm font-bold ${deck.cards[index].isLearned ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                                        {deck.cards[index].isLearned ? 'Đã thuộc' : 'Đánh dấu thuộc'}
                                    </button>
                                    <button onClick={handleDeleteCard} className="px-4 py-2 rounded-lg text-sm font-bold bg-red-50 text-red-500 hover:bg-red-100">Xóa</button>
                                </div>
                            </div>

                            <button onClick={() => { setFlip(false); setIndex(i => i < deck.cards.length-1 ? i+1 : 0) }} className="p-3 bg-white shadow rounded-full hover:bg-slate-50">→</button>
                        </div>
                    </div>
                )}

                {/* Form Thêm thẻ (Luôn hiện ở dưới hoặc toggle) */}
                <div className="mt-12 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-xl mx-auto">
                    <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Plus size={18}/> Thêm thẻ mới</h3>
                    <div className="flex gap-2">
                        <input value={newFront} onChange={e => setNewFront(e.target.value)} placeholder="Từ vựng (Mặt trước)" className="flex-1 border p-2 rounded-lg" />
                        <input value={newBack} onChange={e => setNewBack(e.target.value)} placeholder="Nghĩa (Mặt sau)" className="flex-1 border p-2 rounded-lg" />
                        <button onClick={handleAddCard} className="bg-blue-600 text-white px-4 rounded-lg font-bold">Thêm</button>
                    </div>
                </div>
            </>
        )}
      </main>
    </div>
  );
}