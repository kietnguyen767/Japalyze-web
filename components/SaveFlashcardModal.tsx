// components/SaveFlashcardModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
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

  onSave: (editedFront: string, editedBack: string) => void;
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
  const [editFront, setEditFront] = useState(inputText);
  const [editBack, setEditBack] = useState(translatedText);

  // Cập nhật giá trị edit khi props thay đổi
  useEffect(() => {
    if (open) {
      setEditFront(inputText);
      setEditBack(translatedText);
    }
  }, [open, inputText, translatedText]);

  const handleSaveWithEdits = () => {
    onSave(editFront, editBack);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5 relative transform transition-all">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full p-1 transition-all"
          disabled={processing}
          aria-label="Đóng"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg p-2 shadow-lg shadow-orange-200">
            <Bookmark className="text-white" size={18} />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            Lưu vào Flashcard
          </h3>
        </div>

        {saveStatus === 'success' ? (
          <div className="flex flex-col items-center justify-center py-8 text-green-600 animate-scale-up">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-3 shadow-lg shadow-green-200">
              <Check size={32} className="text-white" strokeWidth={3} />
            </div>
            <p className="font-bold text-lg mb-1">Đã lưu thành công!</p>
            <p className="text-slate-500 text-xs">Flashcard của bạn đã được thêm vào bộ thẻ</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Editable Preview Card */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-3 rounded-xl border-2 border-slate-200 shadow-sm">
              <div className="mb-2">
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                  Mặt trước
                </div>
                <textarea
                  value={editFront}
                  onChange={(e) => setEditFront(e.target.value)}
                  disabled={processing}
                  className="w-full p-2 bg-white border border-slate-300 rounded text-slate-800 font-bold text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all disabled:bg-slate-50"
                  rows={2}
                />
              </div>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-2"></div>
              
              <div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                  Mặt sau
                </div>
                <textarea
                  value={editBack}
                  onChange={(e) => setEditBack(e.target.value)}
                  disabled={processing}
                  className="w-full p-2 bg-white border border-slate-300 rounded text-blue-600 font-semibold text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all disabled:bg-slate-50"
                  rows={2}
                />
              </div>
            </div>

            {/* Select Deck */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Chọn bộ thẻ
              </label>
              <div className="relative">
                <select
                  className="w-full p-2.5 pr-8 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-slate-800 font-medium text-sm transition-all hover:border-slate-300 disabled:bg-slate-50 disabled:text-slate-400 appearance-none cursor-pointer"
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
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white px-2 py-0.5 text-slate-500 font-semibold tracking-wider">
                  Hoặc tạo mới
                </span>
              </div>
            </div>

            {/* Create New Deck */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tên bộ thẻ mới..."
                  className="w-full p-2.5 pr-10 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-800 placeholder:text-slate-400 text-sm transition-all hover:border-slate-300 disabled:bg-slate-50"
                  value={newDeckName}
                  onChange={(e) => {
                    setNewDeckName(e.target.value);
                    setSelectedDeckId('');
                  }}
                  disabled={processing}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-br from-blue-500 to-blue-600 p-1.5 rounded text-white shadow-md">
                  <Plus size={16} strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveWithEdits}
              disabled={processing}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-300/50 mt-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] text-sm"
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