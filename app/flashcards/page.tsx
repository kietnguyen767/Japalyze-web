//app/flashcards/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import {
  Plus,
  Book,
  ChevronRight,
  RotateCw,
  Trash2,
  Pencil,
  Check,
  X,
  Layers,
  Sparkles,
  GraduationCap,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getTokenFromCookie, createAuthHeaders, is401Error, handle401Error } from '@/lib/tokenUtils';

// --- TYPE MỚI (Khớp với Prisma) ---
type Card = {
  id: string;
  front: string;
  back: string;
  isLearned: boolean; // Prisma dùng isLearned
};

type Deck = {
  id: string;
  title: string; // Prisma dùng title
  description?: string | null;
  cards: Card[];
};

export default function FlashcardsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [decks, setDecks] = useState<Deck[]>([]);

  // UI state
  const [isCreating, setIsCreating] = useState(false);
  const [newDeckName, setNewDeckName] = useState('');
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [editingDeckId, setEditingDeckId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [deletingDeckId, setDeletingDeckId] = useState<string | null>(null);

  // 1. LOAD DATA TỪ API MỚI
  useEffect(() => {
    const loadDecks = async () => {
      if (!user) return;
      setIsDataLoading(true);
      try {
        const token = getTokenFromCookie();
        console.log('👤 [Flashcards] User:', user?.email);

        const headers = createAuthHeaders(token);

        const res = await fetch('/api/flashcards/decks', { headers });
        
        console.log('📥 [Flashcards] Response status:', res.status);
        
        if (res.ok) {
            const data = await res.json();
            console.log('✅ [Flashcards] Lấy thành công:', data.decks?.length || 0, 'decks');
            setDecks(data.decks || []);
        } else if (is401Error(res.status)) {
            console.error('❌ [Flashcards] 401 Unauthorized');
            handle401Error(router);
        } else {
            const errorText = await res.text();
            console.error('❌ [Flashcards] Lỗi load decks:', res.status, errorText);
            alert('❌ Lỗi tải dữ liệu. Vui lòng thử lại.');
        }
      } catch (e) {
        console.error('❌ [Flashcards] Exception:', e);
        alert('❌ Lỗi kết nối. Vui lòng thử lại.');
      } finally {
        setIsDataLoading(false);
      }
    };

    if (!loading && user) loadDecks();
  }, [user, loading, router]);

  // 2. TẠO BỘ THẺ MỚI
  const handleCreateDeck = async () => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    if (!newDeckName.trim()) return;
    setIsDataLoading(true);
    try {
        const token = getTokenFromCookie();
        if (!token) {
          alert('❌ Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
          router.push('/login');
          return;
        }

        const headers = createAuthHeaders(token);

        const res = await fetch('/api/flashcards/decks', {
            method: 'POST',
            headers,
            body: JSON.stringify({ title: newDeckName.trim() })
        });
        
        if (res.ok) {
            const newDeck = await res.json();
            console.log('✅ Deck tạo thành công:', newDeck.id);
            setDecks(prev => [{ ...newDeck, cards: [] }, ...prev]); 
            setNewDeckName('');
            setIsCreating(false);
        } else if (is401Error(res.status)) {
            handle401Error(router);
        } else {
            console.error('❌ Lỗi tạo deck:', res.status);
            alert('❌ Lỗi tạo deck. Vui lòng thử lại.');
        }
    } catch (e) {
        console.error(e);
        alert('❌ Lỗi: ' + (e as any).message);
    } finally {
        setIsDataLoading(false);
    }
  };

  // 3. XÓA DECK
  const handleDeleteDeck = async (deckId: string) => {
    if (!confirm('Bạn chắc chắn muốn xóa bộ thẻ này?')) return;
    
    setDeletingDeckId(deckId);
    try {
      const token = getTokenFromCookie();
      if (!token) {
        alert('❌ Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
        router.push('/login');
        return;
      }

      const headers = createAuthHeaders(token);

      const res = await fetch(`/api/flashcards/decks/${deckId}`, {
        method: 'DELETE',
        headers
      });

      if (res.ok) {
        setDecks(decks.filter(d => d.id !== deckId));
        alert('✅ Xóa thành công');
      } else if (is401Error(res.status)) {
        handle401Error(router);
      } else {
        alert('❌ Lỗi xóa deck');
      }
    } catch (e) {
      console.error(e);
      alert('❌ Lỗi: ' + (e as any).message);
    } finally {
      setDeletingDeckId(null);
    }
  };

  // 4. ĐỔI TÊN DECK
  const handleRenameDeck = async (deckId: string) => {
    if (!editingName.trim()) {
      alert('Tên deck không được để trống');
      return;
    }

    try {
      const token = getTokenFromCookie();
      if (!token) {
        alert('❌ Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
        router.push('/login');
        return;
      }

      const res = await fetch(`/api/flashcards/decks/${deckId}`, {
        method: 'PATCH',
        headers: { 
          ...createAuthHeaders(token)
        },
        body: JSON.stringify({ title: editingName.trim() })
      });

      if (res.ok) {
        const updated = await res.json();
        setDecks(decks.map(d => d.id === deckId ? { ...d, title: updated.title } : d));
        setEditingDeckId(null);
        setEditingName('');
        alert('✅ Cập nhật thành công');
      } else if (is401Error(res.status)) {
        handle401Error(router);
      } else {
        alert('❌ Lỗi cập nhật');
      }
    } catch (e) {
      console.error(e);
      alert('❌ Lỗi: ' + (e as any).message);
    }
  };

  if (loading) return <div className="p-10 text-center">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      <main className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {isDataLoading && (
          <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-[100]">
            <div className="bg-white rounded-2xl p-8 shadow-xl flex flex-col items-center gap-4">
              <Loader2 size={40} className="text-blue-600 animate-spin" />
              <p className="text-slate-700 font-semibold">Đang tải thư viện...</p>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Thư viện của tôi 🎴
          </h1>
          <button
            onClick={() => {
              if (!user) {
                router.push('/login');
                return;
              }
              setIsCreating(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700"
          >
            <Plus size={20} /> Bộ mới
          </button>
        </header>

        {isCreating && (
  <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex gap-2">
    <input
      autoFocus
      value={newDeckName}
      onChange={(e) => setNewDeckName(e.target.value)}
      placeholder="Nhập tên bộ thẻ mới..."
      // 👇 QUAN TRỌNG: outline-none để tắt viền đen, focus:border-blue-500 để hiện màu xanh khi nhập
      className="flex-1 border border-slate-300 p-2 rounded-lg outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-slate-800"
    />
    <button
      onClick={handleCreateDeck}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition-colors"
    >
      Lưu
    </button>
    <button
      onClick={() => setIsCreating(false)}
      className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition-colors"
    >
      Hủy
    </button>
  </div>
)}

        {/* EMPTY STATE + LIST */}
        {decks.length === 0 && !isDataLoading ? (
          <div className="bg-white rounded-3xl p-10 md:p-16 text-center shadow-sm border border-slate-200 animate-fade-in-up">
            <div className="w-24 h-24 bg-linear-to-tr from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <Layers className="text-blue-500" size={40} />
              <Sparkles
                className="text-yellow-400 absolute top-0 right-0 animate-bounce"
                size={24}
              />
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Thư viện của bạn đang trống
            </h2>
            <p className="text-slate-500 max-w-md mx-auto mb-8 italic">
              "Hành trình vạn dặm bắt đầu từ một bước chân." <br />
              Hãy tạo bộ thẻ đầu tiên để ghi nhớ từ vựng lâu hơn gấp 3 lần nhé!
            </p>

            <button
              onClick={() => setIsCreating(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-transform hover:scale-105 mb-10"
            >
              + Tạo bộ thẻ đầu tiên
            </button>

            <div className="border-t border-slate-100 pt-8 max-w-lg mx-auto">
              <p className="text-slate-400 text-sm mb-4 font-medium uppercase tracking-wide">
                Hoặc nếu bạn chưa biết bắt đầu từ đâu?
              </p>

              <button
                onClick={() => router.push('/exercises')}
                className="group w-full md:w-auto inline-flex items-center justify-center gap-3 bg-slate-50 hover:bg-white text-slate-700 hover:text-blue-600 font-bold px-6 py-4 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div className="bg-white p-2 rounded-lg border border-slate-100 group-hover:border-blue-100">
                  <GraduationCap
                    size={24}
                    className="text-indigo-500"
                  />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold">
                    Tham khảo Thư viện Bài tập
                  </div>
                  <div className="text-xs text-slate-400 group-hover:text-blue-400 font-normal">
                    Số đếm, Bảng chữ cái có sẵn...
                  </div>
                </div>
                <ArrowRight
                  size={20}
                  className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all ml-2"
                />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {decks.map((deck) => {
                // 👇 SỬA LOGIC TÍNH TIẾN ĐỘ THEO 'isLearned'
                const learnedCount = deck.cards.filter(
                  (c) => c.isLearned
                ).length;
                const progress =
                  deck.cards.length > 0
                    ? Math.round(
                        (learnedCount / deck.cards.length) * 100
                      )
                    : 0;

                return (
                  <div
                    key={deck.id}
                    className="bg-white p-6 rounded-2xl border-2 border-slate-200 hover:border-blue-400 transition-all shadow-sm hover:shadow-md"
                  >
                    {editingDeckId === deck.id ? (
                      <div className="flex gap-2 mb-2">
                        <input
                          value={editingName}
                          onChange={(e) =>
                            setEditingName(e.target.value)
                          }
                          className="border p-1 rounded w-full"
                          autoFocus
                        />
                        <button
                          onClick={() =>
                            handleRenameDeck(deck.id)
                          }
                          className="text-green-600"
                        >
                          <Check />
                        </button>
                        <button
                          onClick={() =>
                            setEditingDeckId(null)
                          }
                          className="text-red-500"
                        >
                          <X />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-slate-800">
                          {deck.title} {/* 👇 Thay .name thành .title */}
                        </h3>
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              setEditingDeckId(deck.id);
                              setEditingName(deck.title);
                            }}
                            className="text-slate-400 hover:text-blue-600 p-1"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteDeck(deck.id)
                            }
                            disabled={deletingDeckId === deck.id}
                            className="text-slate-400 hover:text-red-600 p-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          >
                            {deletingDeckId === deck.id ? (
                              <div className="animate-spin">
                                <RotateCw size={16} />
                              </div>
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Tiến độ</span>
                        <span className="font-bold text-blue-600">
                          {progress}%
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-2">
                        {learnedCount}/{deck.cards.length} đã thuộc
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        router.push(`/flashcards/${deck.id}`)
                      }
                      className="w-full flex items-center justify-between bg-blue-50 text-blue-700 font-bold py-3 px-4 rounded-xl hover:bg-blue-100 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Book size={18} /> Học ngay
                      </span>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Nút Thư viện Bài tập - Luôn hiển thị */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <p className="text-slate-400 text-sm mb-4 font-medium uppercase tracking-wide text-center">
                Hoặc khám phá thêm từ thư viện của chúng tôi
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => router.push('/exercises')}
                  className="group md:w-auto inline-flex items-center justify-center gap-3 bg-slate-50 hover:bg-white text-slate-700 hover:text-blue-600 font-bold px-6 py-4 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <div className="bg-white p-2 rounded-lg border border-slate-100 group-hover:border-blue-100">
                    <GraduationCap
                      size={24}
                      className="text-indigo-500"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold">
                      Tham khảo Thư viện Bài tập
                    </div>
                    <div className="text-xs text-slate-400 group-hover:text-blue-400 font-normal">
                      Số đếm, Bảng chữ cái có sẵn...
                    </div>
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all ml-2"
                  />
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}