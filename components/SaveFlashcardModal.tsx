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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative transform transition-all">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full p-1.5 transition-all"
          disabled={processing}
          aria-label="Đóng"
        >
          <X size={22} />
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-3 shadow-lg shadow-orange-200">
            <Bookmark className="text-white" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">
            Lưu vào Flashcard
          </h3>
        </div>

        {saveStatus === 'success' ? (
          <div className="flex flex-col items-center justify-center py-12 text-green-600 animate-scale-up">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-200">
              <Check size={40} className="text-white" strokeWidth={3} />
            </div>
            <p className="font-bold text-xl mb-2">Đã lưu thành công!</p>
            <p className="text-slate-500 text-sm">Flashcard của bạn đã được thêm vào bộ thẻ</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Preview Card */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-5 rounded-2xl border-2 border-slate-200 shadow-sm">
              <div className="mb-4">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                  Mặt trước
                </div>
                <div className="font-bold text-slate-800 text-base leading-relaxed line-clamp-2">
                  {inputText}
                </div>
              </div>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-4"></div>
              
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  Mặt sau
                </div>
                <div className="text-blue-600 font-semibold text-base leading-relaxed line-clamp-2">
                  {translatedText}
                </div>
              </div>
            </div>

            {/* Select Deck */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Chọn bộ thẻ có sẵn
              </label>
              <div className="relative">
                <select
                  className="w-full p-4 pr-10 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-slate-800 font-medium transition-all hover:border-slate-300 disabled:bg-slate-50 disabled:text-slate-400 appearance-none cursor-pointer"
                  value={selectedDeckId}
                  onChange={(e) => {
                    setSelectedDeckId(e.target.value);
                    setNewDeckName('');
                  }}
                  disabled={userDecks.length === 0 || processing}
                >
                  {userDecks.length === 0 ? (
                    <option value="">Chưa có bộ thẻ nào</option>
                  ) : null}
                  {userDecks.map((deck) => (
                    <option key={deck.id} value={deck.id}>
                      {deck.title} ({deck.cards.length} thẻ)
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 py-1 text-slate-500 font-semibold tracking-wider">
                  Hoặc tạo mới
                </span>
              </div>
            </div>

            {/* Create New Deck */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nhập tên bộ thẻ mới..."
                  className="w-full p-4 pr-14 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-800 placeholder:text-slate-400 transition-all hover:border-slate-300 disabled:bg-slate-50"
                  value={newDeckName}
                  onChange={(e) => {
                    setNewDeckName(e.target.value);
                    setSelectedDeckId('');
                  }}
                  disabled={processing}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg text-white shadow-md">
                  <Plus size={20} strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={onSave}
              disabled={processing}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-300/50 mt-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] text-base"
            >
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Đang lưu...
                </span>
              ) : (
                'Lưu Ngay'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}