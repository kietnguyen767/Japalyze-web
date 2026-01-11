// components/SaveFlashcardModal.tsx
'use client';

import React from 'react';
import { Bookmark, Check, Plus, X } from 'lucide-react';
import type { Deck } from '@/lib/flashcardService';

type Props = {
  open: boolean;
  onClose: () => void;

  processing: boolean;
  saveStatus: 'idle' | 'success';

  inputText: string;
  translatedText: string;

  userDecks: Deck[];
  selectedDeckId: string;
  setSelectedDeckId: (v: string) => void;

  newDeckName: string;
  setNewDeckName: (v: string) => void;

  onSave: () => void;
};

export default function SaveFlashcardModal({
  open,
  onClose,
  processing,
  saveStatus,
  inputText,
  translatedText,
  userDecks,
  selectedDeckId,
  setSelectedDeckId,
  newDeckName,
  setNewDeckName,
  onSave,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
          disabled={processing}
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Bookmark className="text-orange-500" /> Lưu vào Flashcard
        </h3>

        {saveStatus === 'success' ? (
          <div className="flex flex-col items-center justify-center py-8 text-green-600 animate-scale-up">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check size={32} />
            </div>
            <p className="font-bold text-lg">Đã lưu thành công!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {/* Preview */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Mặt trước</div>
              <div className="font-bold text-slate-800 mb-3 line-clamp-2">{inputText}</div>
              <div className="w-full h-[1px] bg-slate-200 mb-3"></div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Mặt sau</div>
              <div className="text-blue-600 font-medium line-clamp-2">{translatedText}</div>
            </div>

            {/* Select deck */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Chọn bộ thẻ</label>
              <select
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={selectedDeckId}
                onChange={(e) => {
                  setSelectedDeckId(e.target.value);
                  setNewDeckName('');
                }}
                disabled={userDecks.length === 0 || processing}
              >
                {userDecks.length === 0 ? <option value="">Chưa có bộ thẻ nào</option> : null}
                {userDecks.map((deck) => (
                  <option key={deck.id} value={deck.id}>
                    {deck.title} ({deck.cards.length} thẻ)
                  </option>
                ))}
              </select>
            </div>

            {/* Or create new */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400">Hoặc tạo mới</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Nhập tên bộ thẻ mới..."
                className="flex-1 p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={newDeckName}
                onChange={(e) => {
                  setNewDeckName(e.target.value);
                  setSelectedDeckId('');
                }}
                disabled={processing}
              />
              <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                <Plus size={20} />
              </div>
            </div>

            <button
              onClick={onSave}
              disabled={processing}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 mt-2 transition-all disabled:opacity-50"
            >
              {processing ? 'Đang lưu...' : 'Lưu Ngay'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
