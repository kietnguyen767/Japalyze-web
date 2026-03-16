//app/flashcards/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Plus,
  Book,
  RotateCw,
  Trash2,
  Pencil,
  Layers,
  GraduationCap,
  ArrowRight,
  Loader2,
  LayoutGrid,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getTokenFromCookie, createAuthHeaders, is401Error, handle401Error } from '@/lib/tokenUtils';
import ConfirmModal from '@/components/ConfirmModal';

// --- TYPES ---
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
  learnedCount?: number;
};

export default function FlashcardsPage() {
  const { user, loading: authLoading } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  // 1. DATA FETCHING WITH REACT QUERY
  const { data: decks = [], isLoading: isInitialLoading } = useQuery<Deck[]>({
    queryKey: ['decks'],
    queryFn: async () => {
      const token = getTokenFromCookie();
      const headers = createAuthHeaders(token);
      const res = await fetch('/api/flashcards/decks', { headers });

      if (res.ok) {
        const data = await res.json();
        return data.decks || [];
      }
      return [];
    },
    enabled: true, // Cho phép fetch ngay cả khi chưa login
    staleTime: 5 * 60 * 1000,
  });

  const sampleDecks = decks.filter(d => d.description?.includes('[SAMPLE]'));
  const userDecks = decks.filter(d => !d.description?.includes('[SAMPLE]'));

  // Pagination state for Sample Decks
  const [displayCount, setDisplayCount] = useState(3);
  const visibleSamples = sampleDecks.slice(0, displayCount);

  // UI state
  const [isCreating, setIsCreating] = useState(false);
  const [newDeckName, setNewDeckName] = useState('');
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [editingDeckId, setEditingDeckId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [deletingDeckId, setDeletingDeckId] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // 2. CREATE DECK
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
        showToast('Phiên đăng nhập hết hạn.', 'error');
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
        queryClient.setQueryData(['decks'], (old: Deck[] = []) => [{ ...newDeck, cards: [] }, ...old]);
        setNewDeckName('');
        setIsCreating(false);
        showToast('Tạo bộ thẻ mới thành công!');
      } else if (is401Error(res.status)) {
        handle401Error(router);
      } else {
        showToast('Lỗi khi tạo bộ thẻ', 'error');
      }
    } catch (e) {
      console.error(e);
      showToast('Lỗi hệ thống khi tạo bộ thẻ', 'error');
    } finally {
      setIsDataLoading(false);
    }
  };

  // 3. DELETE DECK
  const handleDeleteDeckClick = (deckId: string) => {
    setDeletingDeckId(deckId);
    setIsConfirmOpen(true);
  };

  const confirmDeleteDeck = async () => {
    const deckId = deletingDeckId;
    if (!deckId) return;

    setIsDataLoading(true);
    try {
      const token = getTokenFromCookie();
      const headers = createAuthHeaders(token);
      const res = await fetch(`/api/flashcards/decks/${deckId}`, {
        method: 'DELETE',
        headers
      });

      if (res.ok) {
        queryClient.setQueryData(['decks'], (old: Deck[] = []) => old.filter(d => d.id !== deckId));
        showToast('Đã xóa bộ thẻ thành công');
      } else if (is401Error(res.status)) {
        handle401Error(router);
      } else {
        showToast('Lỗi khi xóa bộ thẻ', 'error');
      }
    } catch (e) {
      console.error(e);
      showToast('Lỗi hệ thống khi xóa', 'error');
    } finally {
      setIsDataLoading(false);
      setDeletingDeckId(null);
    }
  };

  // 4. RENAME DECK
  const handleRenameDeck = async (deckId: string) => {
    if (!editingName.trim()) {
      showToast('Tên không được để trống', 'warning');
      return;
    }

    try {
      const token = getTokenFromCookie();
      const res = await fetch(`/api/flashcards/decks/${deckId}`, {
        method: 'PATCH',
        headers: createAuthHeaders(token),
        body: JSON.stringify({ title: editingName.trim() })
      });

      if (res.ok) {
        const updated = await res.json();
        queryClient.setQueryData(['decks'], (old: Deck[] = []) =>
          old.map(d => d.id === deckId ? { ...d, title: updated.title } : d)
        );
        setEditingDeckId(null);
        setEditingName('');
        showToast('Cập nhật tên thành công!');
      } else if (is401Error(res.status)) {
        handle401Error(router);
      } else {
        showToast('Lỗi khi cập nhật tên', 'error');
      }
    } catch (e) {
      console.error(e);
      showToast('Lỗi hệ thống khi cập nhật tên', 'error');
    }
  };

  // Chỉ hiện loading nhẹ nếu đang check auth lần đầu để tránh flash giao diện không đúng quyền
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 size={32} className="text-blue-600 animate-spin" strokeWidth={2} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {isDataLoading && (
          <div className="fixed inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center z-[100] animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl p-6 shadow-2xl border border-slate-100 flex flex-col items-center gap-3 active:scale-95 transition-transform">
              <Loader2 size={32} className="text-blue-600 animate-spin" strokeWidth={3} />
              <p className="text-slate-700 font-bold text-sm">Đang xử lý...</p>
            </div>
          </div>
        )}

        <div className="mb-8 border-b border-slate-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <LayoutGrid className="text-blue-600" /> Thư viện Flashcards
          </h1>
        </div>

        {isCreating && (
          <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-blue-100 flex flex-col md:flex-row gap-4 animate-in slide-in-from-top-2">
            <div className="flex-1 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Tên bộ thẻ mới</label>
              <input
                autoFocus
                value={newDeckName}
                onChange={(e) => setNewDeckName(e.target.value)}
                placeholder="VD: Từ vựng N5 - Bài 1..."
                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-medium"
              />
            </div>
            <div className="flex items-end gap-2 pb-0.5">
              <button
                onClick={handleCreateDeck}
                disabled={!newDeckName.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-200"
              >
                Lưu lại
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-3 rounded-xl font-bold transition-all"
              >
                Hủy
              </button>
            </div>
          </div>
        )}

        {/* --- KHU VỰC BỘ THẺ MẪU --- */}
        {sampleDecks.length > 0 && (
          <div className="mb-14">
            <h2 className="text-lg font-bold text-indigo-700 mb-6 border-l-4 border-indigo-500 pl-3 flex items-center gap-2">
              <GraduationCap className="text-indigo-500" size={24} /> Danh sách bộ thẻ mẫu
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {visibleSamples.map((deck) => {
                 const totalCount = deck.cards?.length ?? 0;
                 const learnedCount = deck.learnedCount || 0;
                const progress = totalCount > 0
                  ? Math.round((learnedCount / totalCount) * 100)
                  : 0;

                return (
                  <div
                    key={deck.id}
                    className="group relative flex flex-col p-5 bg-gradient-to-br from-white to-indigo-50/30 rounded-2xl border-2 border-indigo-100 shadow-sm transition hover:border-indigo-400 hover:shadow-md"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-100">
                          <Book size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="font-bold text-slate-800 leading-tight">{deck.title}</h3>
                            <span className="text-[9px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter">Official</span>
                          </div>
                            <p className="text-xs text-slate-400 font-medium">{deck.cards?.length ?? 0} thẻ ghi nhớ</p>
                        </div>
                      </div>
                      {/* Bỏ nút xóa bộ thẻ mẫu */}
                    </div>

                    <div className="mt-auto pt-4 border-t border-indigo-100/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Tiến độ cá nhân</span>
                        <span className="text-xs font-bold text-indigo-600">{progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 transition-all duration-700"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <button
                        onClick={() => {
                          if (!user) {
                            router.push('/login');
                            return;
                          }
                          router.push(`/flashcards/${deck.id}`);
                        }}
                        onMouseEnter={async () => {
                          if (!user) return;
                          await queryClient.prefetchQuery({
                            queryKey: ['deck', deck.id],
                            queryFn: async () => {
                              const token = getTokenFromCookie();
                              const headers = createAuthHeaders(token);
                              const res = await fetch(`/api/flashcards/decks/${deck.id}`, { headers });
                              if (res.ok) return await res.json();
                              return null;
                            },
                            staleTime: 5 * 60 * 1000,
                          });
                        }}
                        className="w-full flex items-center justify-between bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition-all group/btn shadow-lg shadow-indigo-100 active:scale-95"
                      >
                        <span className="text-sm">Bắt đầu học ngay</span>
                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Điều khiển xem thêm / xem tất cả */}
            {sampleDecks.length > 3 && (
              <div className="mt-8 flex justify-center gap-4">
                {displayCount < sampleDecks.length && (
                  <button
                    onClick={() => setDisplayCount(prev => Math.min(prev + 3, sampleDecks.length))}
                    className="flex items-center gap-2 text-indigo-600 font-bold px-6 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-all active:scale-95 text-sm"
                  >
                    Xem thêm
                  </button>
                )}
                <button
                  onClick={() => setDisplayCount(displayCount === sampleDecks.length ? 3 : sampleDecks.length)}
                  className="flex items-center gap-2 text-slate-500 font-bold px-6 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all active:scale-95 text-sm"
                >
                  {displayCount === sampleDecks.length ? 'Ẩn bớt' : 'Xem tất cả'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- KHU VỰC BỘ THẺ CỦA BẠN --- */}
        <div>
          <h2 className="text-lg font-bold text-slate-700 mb-6 border-l-4 border-blue-500 pl-3">
            Danh sách bộ thẻ của bạn ({userDecks.length})
          </h2>

          {userDecks.length === 0 && !isDataLoading ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200 animate-fade-in-up">
              <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Layers className="text-blue-500" size={32} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">Chưa có bộ thẻ nào</h2>
              <p className="text-slate-500 max-w-sm mx-auto mb-8 text-sm">
                Hãy bắt đầu bằng cách tạo bộ thẻ đầu tiên của bạn để luyện tập trắc nghiệm và ghi nhớ từ vựng hiệu quả hơn.
              </p>
              <button
                onClick={() => setIsCreating(true)}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
              >
                <Plus size={20} /> Tạo bộ thẻ đầu tiên
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {userDecks.map((deck) => {
                 const totalCount = deck.cards?.length ?? 0;
                 const learnedCount = deck.learnedCount || 0;
                const progress = totalCount > 0
                  ? Math.round((learnedCount / totalCount) * 100)
                  : 0;

                return (
                  <div
                    key={deck.id}
                    className="group relative flex flex-col p-5 bg-white rounded-2xl border border-slate-200 shadow-sm transition hover:border-blue-400 hover:shadow-md"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Book size={20} />
                        </div>
                        {editingDeckId === deck.id ? (
                          <div className="flex flex-col gap-2">
                            <input
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              className="border border-blue-400 p-1.5 rounded-lg w-full text-sm outline-none"
                              autoFocus
                            />
                            <div className="flex gap-2">
                              <button onClick={() => handleRenameDeck(deck.id)} className="text-xs font-bold text-blue-600">Lưu</button>
                              <button onClick={() => setEditingDeckId(null)} className="text-xs font-bold text-slate-400">Hủy</button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h3 className="font-bold text-slate-800 leading-tight">{deck.title}</h3>
                            <p className="text-xs text-slate-400 font-medium">{deck.cards?.length ?? 0} thẻ ghi nhớ</p>
                          </div>
                        )}
                      </div>

                      {!editingDeckId && (
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => {
                              setEditingDeckId(deck.id);
                              setEditingName(deck.title);
                            }}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteDeckClick(deck.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tiến độ</span>
                        <span className="text-xs font-bold text-blue-600">{progress}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-700"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <button
                        onClick={() => router.push(`/flashcards/${deck.id}`)}
                        onMouseEnter={async () => {
                          if (!user) return;
                          await queryClient.prefetchQuery({
                            queryKey: ['deck', deck.id],
                            queryFn: async () => {
                              const token = getTokenFromCookie();
                              const headers = createAuthHeaders(token);
                              const res = await fetch(`/api/flashcards/decks/${deck.id}`, { headers });
                              if (res.ok) return await res.json();
                              return null;
                            },
                            staleTime: 5 * 60 * 1000,
                          });
                        }}
                        className="w-full flex items-center justify-between bg-slate-50 border border-slate-100 text-slate-700 font-bold py-2.5 px-4 rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all group/btn shadow-sm"
                      >
                        <span className="text-sm">Học ngay</span>
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}

              <button
                onClick={() => setIsCreating(true)}
                className="group flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-white transition-all min-h-[160px]"
              >
                <div className="p-3 bg-white border border-slate-200 rounded-xl text-slate-300 group-hover:text-blue-500 group-hover:border-blue-200 transition-all shadow-sm mb-3">
                  <Plus size={24} />
                </div>
                <span className="font-bold text-slate-400 group-hover:text-blue-600 transition-colors">Tạo bộ mới</span>
              </button>
            </div>
          )}
        </div>

        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 pointer-events-none">
              <GraduationCap size={160} />
            </div>
            <div className="relative z-10 max-w-md text-center md:text-left">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Chưa biết bắt đầu từ đâu?</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Tham khảo danh sách từ vựng theo chủ đề có sẵn trong thư viện bài tập của chúng tôi để ôn tập ngay hôm nay.
              </p>
            </div>
            <button
              onClick={() => router.push('/exercises')}
              className="relative z-10 group flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
            >
              <div className="p-1.5 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                <GraduationCap size={20} />
              </div>
              Thư viện Bài tập mẫu
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => {
            setIsConfirmOpen(false);
            setDeletingDeckId(null);
          }}
          onConfirm={confirmDeleteDeck}
          title="Xác nhận xóa"
          message="Bạn có chắc chắn muốn xóa bộ thẻ này không? Toàn bộ thẻ bên trong sẽ bị mất vĩnh viễn."
          confirmText="Xóa ngay"
          cancelText="Để tôi xem lại"
        />
      </main>
    </div>
  );
}