// app/translate/page.tsx
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
// 1. Import thêm các icon cần thiết và Hook Auth, Service
import { ArrowRightLeft, Copy, RotateCcw, Volume2, Check, Bookmark, Plus, X } from 'lucide-react';
import Navbar from '@/components/Navbar'; 
import { FlashcardService, Deck } from '@/lib/flashcardService';
import { useAuth } from '@/context/AuthContext';

function TranslateContent() {
  const searchParams = useSearchParams();
  const { user } = useAuth(); // Lấy thông tin user đăng nhập
  
  // State dịch thuật
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('ja');
  const [targetLanguage, setTargetLanguage] = useState('vi');

  // --- STATE MỚI CHO TÍNH NĂNG LƯU FLASHCARD ---
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [userDecks, setUserDecks] = useState<Deck[]>([]);
  const [selectedDeckId, setSelectedDeckId] = useState<string>('');
  const [newDeckName, setNewDeckName] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success'>('idle');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const textFromUrl = searchParams.get('text');
    if (textFromUrl) {
      setInputText(textFromUrl);
      handleTranslate(textFromUrl);
    }
  }, [searchParams]);

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const handleTranslate = async (text: string) => {
    const textToTranslate = text || inputText; 
    if (!textToTranslate.trim()) return;
    
    setIsTranslating(true);
    setTranslatedText(''); 
    
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToTranslate,
          source: sourceLanguage,
          target: targetLanguage
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Lỗi kết nối server');
      }
      
      setTranslatedText(data.translation); 

    } catch (error) {
      console.error('Lỗi dịch:', error);
      setTranslatedText('Xin lỗi, hệ thống đang bận hoặc không thể dịch từ này.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Lỗi copy:', error);
    }
  };

  const handleSpeak = (text: string, lang: string) => {
    if (!text.trim()) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ja' ? 'ja-JP' : 'vi-VN'; 
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const getLanguageName = (lang: string) => {
    return lang === 'ja' ? 'Tiếng Nhật' : 'Tiếng Việt';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        handleTranslate(inputText);
    }
  };

  // --- LOGIC MỚI: Xử lý Modal Lưu Flashcard ---
  const openSaveModal = async () => {
    if (!user) {
      alert('❌ Vui lòng đăng nhập để sử dụng tính năng này!');
      return;
    }

    if (!translatedText.trim()) {
      alert('❌ Vui lòng dịch trước khi lưu!');
      return;
    }
    
    try {
      const decks = await FlashcardService.getDecks();
      setUserDecks(decks);
      
      if (decks.length > 0) {
        setSelectedDeckId(decks[0].id);
      }
      
      setSaveStatus('idle');
      setNewDeckName('');
      setShowSaveModal(true);
    } catch (error: any) {
      alert('❌ Lỗi tải decks: ' + error.message);
    }
  };

  const handleSaveToDeck = async () => {
    if (!user || !inputText.trim() || !translatedText.trim()) {
      alert('❌ Vui lòng nhập dữ liệu đầy đủ');
      return;
    }

    setProcessing(true);
    try {
      let targetDeckId = selectedDeckId;

      // Nếu người dùng nhập tên deck mới -> tạo deck
      if (newDeckName.trim()) {
        const newDeck = await FlashcardService.createDeck(newDeckName.trim(), `Deck từ Translate`);
        targetDeckId = newDeck.id;
        // Reset form
        setNewDeckName('');
      }

      if (!targetDeckId) {
        alert('❌ Vui lòng chọn hoặc tạo bộ thẻ!');
        return;
      }

      // Thêm thẻ vào deck
      await FlashcardService.addCardToDeck(targetDeckId, {
        front: inputText.trim(),
        back: translatedText.trim(),
        example: `(Từ Translate)`
      });

      setSaveStatus('success');
      alert('✅ Lưu thẻ thành công!');
      
      // Reset
      setTimeout(() => {
        setShowSaveModal(false);
        setInputText('');
        setTranslatedText('');
        setSelectedDeckId('');
        setSaveStatus('idle');
      }, 1000);
    } catch (error: any) {
      console.error('❌ Lỗi lưu:', error);
      alert('❌ Lỗi: ' + (error.message || 'Không xác định'));
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 relative z-10">
      <div className="bg-white shadow-sm"><Navbar /></div>

      <div className="container mx-auto px-4 pt-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Dịch Thuật AI & Phân Tích</h1>
          <p className="text-slate-500">Tra cứu từ vựng, ngữ pháp và dịch câu chuẩn xác với JapaLyze AI</p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-md min-w-[100px] text-center">
                {getLanguageName(sourceLanguage)}
              </span>
              
              <button onClick={swapLanguages} className="p-2 hover:bg-slate-100 rounded-lg transition-all group" title="Đổi ngôn ngữ">
                <ArrowRightLeft size={18} className="text-slate-400 group-hover:text-blue-600 group-hover:rotate-180 transition-all duration-300" />
              </button>
              
              <span className="font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-md min-w-[100px] text-center">
                {getLanguageName(targetLanguage)}
              </span>
            </div>
            
            <button 
              onClick={() => { setInputText(''); setTranslatedText(''); window.speechSynthesis.cancel(); }}
              className="text-slate-400 hover:text-red-500 flex items-center gap-1 text-sm transition-colors"
            >
              <RotateCcw size={14} /> Xóa
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Area */}
            <div className="flex flex-col relative">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Văn bản gốc</label>
                {inputText && (
                  <button onClick={() => handleSpeak(inputText, sourceLanguage)} className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs font-medium px-2 py-1 hover:bg-blue-50 rounded transition-all">
                    <Volume2 size={14} /> Đọc
                  </button>
                )}
              </div>
              
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown} 
                className="border border-slate-200 bg-slate-50 p-4 h-64 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white resize-none transition-all text-lg text-slate-800" 
                placeholder="Nhập văn bản cần dịch... (Ctrl + Enter để dịch)"
              ></textarea>
              <span className="absolute bottom-4 right-4 text-xs text-slate-400">{inputText.length} ký tự</span>
            </div>

            {/* Output Area */}
            <div className="flex flex-col relative">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Kết quả dịch</label>
                <div className="flex gap-2">
                  {translatedText && (
                    <>
                      {/* NÚT LƯU FLASHCARD MỚI */}
                      <button 
                        onClick={openSaveModal}
                        className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium px-2 py-1 hover:bg-orange-50 rounded transition-all"
                        title="Lưu vào Flashcard"
                      >
                        <Bookmark size={14} /> Lưu từ
                      </button>

                      <button onClick={() => handleSpeak(translatedText, targetLanguage)} className="flex items-center gap-1 text-green-600 hover:text-green-700 text-xs font-medium px-2 py-1 hover:bg-green-50 rounded transition-all">
                        <Volume2 size={14} /> Đọc
                      </button>
                      <button onClick={handleCopy} className="flex items-center gap-1 text-slate-600 hover:text-slate-700 text-xs font-medium px-2 py-1 hover:bg-slate-100 rounded transition-all">
                        {copied ? <><Check size={14} className="text-green-600" /><span className="text-green-600">Đã copy</span></> : <><Copy size={14} /> Copy</>}
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="border border-slate-200 bg-blue-50/30 p-4 h-64 rounded-xl overflow-auto relative">
                {isTranslating ? (
                  <div className="flex items-center justify-center h-full text-blue-500 gap-2">
                    <span className="animate-spin text-2xl">⏳</span> Đang phân tích...
                  </div>
                ) : translatedText ? (
                  <p className="text-lg text-slate-800 leading-relaxed whitespace-pre-wrap">{translatedText}</p>
                ) : (
                  <p className="text-slate-400 italic">Bản dịch sẽ xuất hiện tại đây...</p>
                )}
              </div>
            </div>
          </div>

          <button 
            onClick={() => handleTranslate(inputText)}
            disabled={!inputText || isTranslating}
            className="mt-4 bg-blue-600 text-white py-3 px-8 rounded-xl font-bold hover:bg-blue-700 transition-all self-center w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
          >
            {isTranslating ? 'Đang dịch...' : 'Dịch Ngay'}
          </button>
        </div>
      </div>

      {/* --- MODAL (POPUP) LƯU FLASHCARD --- */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
            
            {/* Nút đóng */}
            <button 
              onClick={() => setShowSaveModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
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
                {/* Preview Card */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Mặt trước</div>
                  <div className="font-bold text-slate-800 mb-3 line-clamp-2">{inputText}</div>
                  <div className="w-full h-[1px] bg-slate-200 mb-3"></div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Mặt sau</div>
                  <div className="text-blue-600 font-medium line-clamp-2">{translatedText}</div>
                </div>

                {/* Chọn Deck */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Chọn bộ thẻ</label>
                  <select 
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    value={selectedDeckId}
                    onChange={(e) => { setSelectedDeckId(e.target.value); setNewDeckName(''); }}
                    disabled={userDecks.length === 0}
                  >
                    {userDecks.length === 0 ? <option value="">Chưa có bộ thẻ nào</option> : null}
                    {userDecks.map(deck => (
                      <option key={deck.id} value={deck.id}>{deck.title} ({deck.cards.length} thẻ)</option>
                    ))}
                  </select>
                </div>

                {/* Hoặc tạo mới */}
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
                      onChange={(e) => { setNewDeckName(e.target.value); setSelectedDeckId(''); }}
                  />
                  <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                    <Plus size={20} />
                  </div>
                </div>

                <button 
                  onClick={handleSaveToDeck}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 mt-2 transition-all"
                >
                  Lưu Ngay
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TranslatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600">Đang tải...</p>
      </div>
    }>
      <TranslateContent />
    </Suspense>
  );
}