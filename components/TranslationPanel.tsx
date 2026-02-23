//components/TranslationPanel.tsx
'use client';

import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ArrowRightLeft, Copy, Volume2, Check, Bookmark, X, Search, Sparkles,
  Mic, MicOff, History, Clock, BookOpen, ChevronRight
} from 'lucide-react';
import * as wanakana from 'wanakana';

import { FlashcardService, Deck } from '@/lib/flashcardService';
import { useAuth } from '@/context/AuthContext';
import SaveFlashcardModal from '@/components/SaveFlashcardModal';
import { getDashboardVocabulary, getTranslationHistory } from '@/app/actions/translation-data';

// --- Types ---
type SuggestItem = {
  id: string;
  lemma: string;
  reading?: string | null;
  romaji?: string | null;
  posTag: string;
  meaningVi?: string | null;
};

type WordDetailResponse = {
  success: boolean;
  entry?: {
    id: string;
    lang: string;
    lemma: string;
    reading: string;
    romaji: string;
    posTag: string;
    pos: { jp: string; vi: string; extra?: any };
    meaningVi: string;
  };
  examples?: { jp: string; romaji?: string; vi?: string }[];
  relatedWords?: SuggestItem[];
  error?: string;
  cached?: boolean;
};

type TranslateApiResponse = {
  translation?: string;
  provider?: 'Gemini' | 'MyMemory' | 'Redis' | string;
  cached?: boolean;
  degraded?: boolean;
  error?: string;
};

type AnalysisResult = {
  sentence_structure: { text: string; romaji: string; role: string; meaning: string; explanation: string }[];
  grammar_points: { point: string; explanation: string }[];
  nuance: string;
  corrections: string | null;
  alternatives: { text: string; tone: string; explanation: string }[];
};

type DashboardVocabData = {
  nouns: SuggestItem[];
  verbs: SuggestItem[];
  adjs: SuggestItem[];
  others: SuggestItem[];
};

type HistoryItem = {
  id: string;
  sourceText: string;
  targetText: string;
  createdAt: Date;
};

export default function TranslationPanel() {
  const searchParams = useSearchParams();
  const { user } = useAuth();

  // ===== STATES =====
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copied, setCopied] = useState(false);

  const [sourceLanguage, setSourceLanguage] = useState<'ja' | 'vi'>('ja');
  const [targetLanguage, setTargetLanguage] = useState<'ja' | 'vi'>('vi');

  const [translateProvider, setTranslateProvider] = useState<'Gemini' | 'MyMemory' | 'Redis' | ''>('');
  const [translateCached, setTranslateCached] = useState(false);
  const [translateDegraded, setTranslateDegraded] = useState(false);

  const [wordDetail, setWordDetail] = useState<WordDetailResponse | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [userDecks, setUserDecks] = useState<Deck[]>([]);
  const [selectedDeckId, setSelectedDeckId] = useState<string>('');
  const [newDeckName, setNewDeckName] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success'>('idle');
  const [processing, setProcessing] = useState(false);

  const [showHistory, setShowHistory] = useState(false);
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
  const [vocabData, setVocabData] = useState<DashboardVocabData | null>(null);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(true);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // [LOGIC MỚI] Hàm riêng để tải từ vựng mới
  const refreshDashboardVocab = async () => {
    setIsLoadingDashboard(true);
    try {
      const vocabRes = await getDashboardVocabulary();
      if (vocabRes.success && vocabRes.data) {
        setVocabData(vocabRes.data as unknown as DashboardVocabData);
      }
    } catch (e) {
      console.error("Lỗi tải từ vựng:", e);
    } finally {
      setIsLoadingDashboard(false);
    }
  };

  // ===== EFFECTS =====
  useEffect(() => {
    const initData = async () => {
      // 1. Tải từ vựng lần đầu tiên
      if (!vocabData) {
        await refreshDashboardVocab();
      }

      // 2. Tải lịch sử
      if (user?.id) {
        try {
          const historyRes = await getTranslationHistory(user.id);
          if (historyRes.success) {
            setHistoryList(historyRes.data as HistoryItem[]);
          }
        } catch (e) { console.error(e); }
      }
    };
    initData();
  }, [user]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [inputText]);

  const getLanguageName = (lang: string) => (lang === 'ja' ? 'Tiếng Nhật' : 'Tiếng Việt');

  const resetTranslateMeta = () => {
    setTranslateProvider('');
    setTranslateCached(false);
    setTranslateDegraded(false);
  };

  const romajiPreview = useMemo(() => {
    const t = inputText.trim();
    const isSingleToken = t.length > 0 && !/\s/.test(t);
    if (sourceLanguage !== 'ja' || !isSingleToken) return '';
    const fromDetail = wordDetail?.entry?.romaji?.trim();
    if (fromDetail) return fromDetail;
    try {
      if (wanakana.isKana(t)) return wanakana.toRomaji(t);
    } catch { }
    return '';
  }, [inputText, sourceLanguage, wordDetail]);

  useEffect(() => {
    if (!searchParams) return;
    const textFromUrl = searchParams.get('text');
    if (textFromUrl) {
      setInputText(textFromUrl);
      void loadWordDetailByText(textFromUrl);
    }
  }, [searchParams]);

  // ===== Actions =====
  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setInputText(translatedText);
    setTranslatedText(inputText);
    setWordDetail(null);
    setAnalysis(null);
    resetTranslateMeta();
  };

  const clearAll = () => {
    setInputText('');
    setTranslatedText('');
    setWordDetail(null);
    setDetailLoading(false);
    setAnalysis(null);
    resetTranslateMeta();
    window.speechSynthesis.cancel();
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleQuickSelect = (text: string) => {
    setInputText(text);
    setShowHistory(false);
    void handleTranslate(text);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Trình duyệt không hỗ trợ nhập giọng nói.");
      return;
    }
    if (isListening) {
      setIsListening(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = sourceLanguage === 'ja' ? 'ja-JP' : 'vi-VN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setIsListening(true);
    recognition.start();
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
      void handleTranslate(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  const handleTranslate = async (text?: string) => {
    const textToTranslate = (text ?? inputText).trim();
    if (!textToTranslate) return;

    setIsTranslating(true);
    setTranslatedText('');
    setAnalysis(null);
    resetTranslateMeta();
    setShowHistory(false);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToTranslate, source: sourceLanguage, target: targetLanguage }),
      });

      const data: TranslateApiResponse = await response.json();
      if (!response.ok) throw new Error(data.error || 'Lỗi kết nối server');

      setTranslatedText(data.translation ?? '');
      const p = (data.provider ?? '') as any;
      setTranslateProvider(p === 'OpenAI' || p === 'MyMemory' || p === 'Redis' ? p : '');
      setTranslateCached(!!data.cached);
      setTranslateDegraded(!!data.degraded);

      void loadWordDetailByText(textToTranslate);

      if (user?.id) {
        getTranslationHistory(user.id).then(res => res.success && setHistoryList(res.data as HistoryItem[]));
      }

    } catch (error) {
      console.error('Lỗi dịch:', error);
      setTranslatedText('Xin lỗi, hệ thống đang bận hoặc không thể dịch từ này.');
      resetTranslateMeta();
    } finally {
      setIsTranslating(false);
    }
  };

  const handleAnalyze = async () => {
    if (!translatedText || !inputText) return;
    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          translatedText: translatedText,
          source: sourceLanguage
        }),
      });
      const data = await res.json();
      if (res.status === 403 && data.error === 'LIMIT_REACHED') {
        alert(data.message);
        return;
      }
      if (!res.ok) throw new Error(data.error);
      setAnalysis(data.data);
    } catch (err: any) {
      alert("Lỗi phân tích: " + err.message);
    } finally {
      setIsAnalyzing(false);
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      void handleTranslate(inputText);
    }
  };

  const loadWordDetailById = async (entryId: string) => {
    setDetailLoading(true);
    try {
      const res = await fetch('/api/word-detail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entryId, source: sourceLanguage }),
      });
      const data: WordDetailResponse = await res.json();
      setWordDetail(data?.success ? data : null);
    } catch (err) {
      setWordDetail(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const loadWordDetailByText = async (text: string) => {
    const t = (text || '').trim();
    if (t.length < 1 || t.length > 40) {
      setWordDetail(null);
      return;
    }
    if (sourceLanguage === 'ja') {
      const isSingleToken = !/\s/.test(t);
      if (!isSingleToken) {
        setWordDetail(null);
        return;
      }
    }
    setDetailLoading(true);
    try {
      const res = await fetch('/api/word-detail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: t, source: sourceLanguage }),
      });
      const data: WordDetailResponse = await res.json();
      setWordDetail(data?.success ? data : null);
    } catch (err) {
      setWordDetail(null);
    } finally {
      setDetailLoading(false);
    }
  };

  // [LOGIC MỚI] Xử lý khi click vào từ gợi ý
  const selectSuggestion = async (item: SuggestItem) => {
    // 1. Dịch từ đó
    setInputText(item.lemma);
    await loadWordDetailById(item.id);
    void handleTranslate(item.lemma);

    // 2. Cuộn lên đầu
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 3. Làm mới danh sách từ gợi ý (Chỉ đổi khi click chọn từ gợi ý)
    void refreshDashboardVocab();
  };

  const openSaveModal = async () => {
    if (!user) return alert('❌ Vui lòng đăng nhập để sử dụng tính năng này!');
    if (!translatedText.trim()) return alert('❌ Vui lòng dịch trước khi lưu!');
    try {
      const decks = await FlashcardService.getDecks();
      setUserDecks(decks);
      if (decks.length > 0) setSelectedDeckId(decks[0].id);
      setSaveStatus('idle');
      setNewDeckName('');
      setShowSaveModal(true);
    } catch (error: any) {
      alert('❌ Lỗi tải decks: ' + error.message);
    }
  };

  const handleSaveToDeck = async (editedFront: string, editedBack: string) => {
    if (!user || !editedFront.trim() || !editedBack.trim()) {
      alert('❌ Vui lòng nhập dữ liệu đầy đủ');
      return;
    }
    setProcessing(true);
    try {
      let targetDeckId = selectedDeckId;
      if (newDeckName.trim()) {
        const newDeck = await FlashcardService.createDeck(newDeckName.trim(), `Deck từ Translate`);
        targetDeckId = newDeck.id;
        setNewDeckName('');
      }
      if (!targetDeckId) return alert('❌ Vui lòng chọn hoặc tạo bộ thẻ!');
      await FlashcardService.addCardToDeck(targetDeckId, {
        front: editedFront.trim(),
        back: editedBack.trim(),
        example: `(Từ Translate)`,
      });
      setSaveStatus('success');
      setTimeout(() => {
        setShowSaveModal(false);
        setInputText('');
        setTranslatedText('');
        setSelectedDeckId('');
        setSaveStatus('idle');
        setWordDetail(null);
        setAnalysis(null);
        resetTranslateMeta();
      }, 1000);
    } catch (error: any) {
      console.error('❌ Lỗi lưu:', error);
      alert('❌ Lỗi: ' + (error.message || 'Không xác định'));
    } finally {
      setProcessing(false);
    }
  };

  const renderTranslateBadge = () => {
    if (!translatedText || !translateProvider) return null;
    const cls =
      translateProvider === 'Gemini'
        ? 'bg-blue-50 text-blue-700 border-blue-200'
        : translateProvider === 'MyMemory'
          ? 'bg-amber-50 text-amber-700 border-amber-200'
          : 'bg-slate-50 text-slate-700 border-slate-200';
    return (
      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${cls}`}>
        {translateProvider} {translateCached ? '• Cache' : ''}
      </span>
    );
  };

  const renderVocabCard = (word: any) => (
    <div
      key={word.id}
      onClick={() => selectSuggestion(word)}
      // Card tự động chiều cao (h-auto)
      className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-300 hover:-translate-y-1 transition-all cursor-pointer group flex flex-col gap-2 h-auto"
    >
      <div>
        <div className="flex justify-between items-start mb-1">
          {/* Tự động xuống dòng (break-words) */}
          <div className="font-bold text-slate-800 text-lg group-hover:text-blue-600 break-words pr-2">{word.lemma}</div>
          {word.posTag && (
            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase shrink-0 whitespace-nowrap">
              {word.posTag.split(',')[0].replace('n', 'N').replace('v', 'V')}
            </span>
          )}
        </div>
        <div className="text-xs text-slate-500 break-words leading-relaxed">{word.meaningVi}</div>
      </div>
      {word.romaji && (
        <div className="text-[10px] text-slate-300 font-mono pt-2 border-t border-slate-50 break-words">
          {word.romaji}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">

      {/* 1. TRANSLATION BOX */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative z-20">

        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="text-blue-600 font-bold text-sm uppercase tracking-wide">{getLanguageName(sourceLanguage)}</div>
            <button
              onClick={swapLanguages}
              className="p-2 bg-white rounded-full shadow-sm border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all hover:rotate-180 duration-300"
            >
              <ArrowRightLeft size={16} />
            </button>
            <div className="text-blue-600 font-bold text-sm uppercase tracking-wide">{getLanguageName(targetLanguage)}</div>
          </div>

          <div className="flex items-center gap-2">
            {renderTranslateBadge()}

            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2 rounded-lg transition-all flex items-center gap-2 border ${showHistory ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-white text-slate-400 border-transparent hover:text-blue-600 hover:bg-blue-50'}`}
              title="Lịch sử dịch"
            >
              <History size={18} />
              <span className="text-xs font-bold hidden sm:inline">Lịch sử</span>
            </button>

            {inputText && (
              <button
                onClick={clearAll}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Xóa tất cả"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* PANEL LỊCH SỬ */}
        {showHistory && (
          <div className="bg-slate-50 border-b border-slate-200 animate-in slide-in-from-top-2 overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                  <Clock size={14} /> Gần đây
                </h3>
                <button onClick={() => setShowHistory(false)} className="text-slate-400 hover:text-slate-600"><X size={14} /></button>
              </div>

              {!user ? (
                <div className="text-center py-6 text-slate-400 text-sm">
                  <Bookmark size={24} className="mx-auto mb-2 opacity-50" />
                  Đăng nhập để lưu lịch sử dịch của bạn.
                </div>
              ) : historyList.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-sm italic">Chưa có lịch sử dịch.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                  {historyList.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleQuickSelect(item.sourceText)}
                      className="text-left bg-white p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group relative"
                    >
                      <div className="font-bold text-slate-700 line-clamp-1 group-hover:text-blue-600 text-sm">{item.sourceText}</div>
                      <div className="text-xs text-slate-500 line-clamp-1 mt-1 opacity-80">{item.targetText}</div>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight size={14} className="text-blue-400" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Input & Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="relative flex flex-col p-6 min-h-[300px]">
            <div className="rounded-2xl transition-all ring-1 ring-transparent flex-1">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                className="w-full text-lg md:text-xl text-slate-800 bg-transparent outline-none resize-none placeholder:text-slate-300 font-medium p-2 overflow-hidden min-h-[120px]"
                placeholder="Nhập văn bản cần dịch..."
                spellCheck={false}
              />
            </div>
            {romajiPreview && (
              <div className="text-sm text-blue-500 font-mono mt-2 pt-2 border-t border-slate-100 border-dashed">
                {romajiPreview}
              </div>
            )}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-full transition-all ${isListening
                    ? 'bg-red-100 text-red-600 animate-pulse'
                    : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  title="Nhập bằng giọng nói"
                >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
                {inputText && (
                  <button onClick={() => handleSpeak(inputText, sourceLanguage)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
                    <Volume2 size={20} />
                  </button>
                )}
                <button
                  onClick={() => handleTranslate(inputText)}
                  disabled={!inputText.trim() || isTranslating}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full font-bold text-sm shadow-md hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isTranslating ? <span className="animate-spin">⏳</span> : <Sparkles size={16} />}
                  Dịch
                </button>
              </div>
              <span className="text-xs text-slate-300">{inputText.length}/5000</span>
            </div>
          </div>

          <div className="relative flex flex-col p-6 min-h-[300px] bg-slate-50/30">
            {isTranslating ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-3 animate-pulse">
                <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                <div className="h-4 w-32 bg-slate-200 rounded"></div>
                <div className="h-4 w-48 bg-slate-200 rounded"></div>
              </div>
            ) : translatedText ? (
              <>
                {translateDegraded && (
                  <div className="mb-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    AI tạm thời không khả dụng → đang dùng dịch cơ bản.
                  </div>
                )}
                <div className="flex-1 text-lg md:text-xl text-slate-800 font-medium leading-relaxed whitespace-pre-wrap">
                  {translatedText}
                </div>
                <div className="mt-4 flex items-center gap-2 pt-4 border-t border-slate-200 border-dashed">
                  <button onClick={() => handleSpeak(translatedText, targetLanguage)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all" title="Nghe">
                    <Volume2 size={20} />
                  </button>
                  <button onClick={handleCopy} className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all" title="Sao chép">
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                  <div className="h-4 w-px bg-slate-300 mx-2"></div>
                  <button onClick={openSaveModal} className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 hover:bg-orange-200 hover:text-orange-800 rounded-full text-sm font-bold transition-all ml-auto">
                    <Bookmark size={16} /> Lưu thẻ
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-300 italic">
                Bản dịch sẽ hiện ở đây...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. NÚT PHÂN TÍCH CHUYÊN SÂU */}
      {translatedText && !isAnalyzing && !analysis && (
        <div className="flex justify-center animate-fade-in">
          <button
            onClick={handleAnalyze}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-indigo-200 hover:scale-105 hover:shadow-xl transition-all"
          >
            <Sparkles size={18} /> Phân tích ngữ pháp chuyên sâu
          </button>
        </div>
      )}

      {/* LOADING ANALYSIS */}
      {isAnalyzing && (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-100 flex flex-col items-center justify-center gap-3 animate-pulse">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-indigo-600 font-medium">Đang phân tích cấu trúc ngữ pháp...</p>
        </div>
      )}

      {/* 3. KẾT QUẢ PHÂN TÍCH */}
      {analysis && (
        <div className="bg-white rounded-2xl border border-indigo-100 shadow-xl overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 text-white font-bold flex items-center gap-2 text-lg">
            <Sparkles size={24} className="text-yellow-300" /> JapaLyze Analysis
          </div>
          <div className="p-6 space-y-8">
            {analysis.corrections && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
                <h4 className="text-red-700 font-bold mb-1 flex items-center gap-2">⚠️ Gợi ý sửa lỗi:</h4>
                <p className="text-slate-800 font-medium">{analysis.corrections}</p>
              </div>
            )}
            <div>
              <h4 className="text-slate-500 font-bold uppercase text-xs tracking-wider mb-3">Cấu trúc câu</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.sentence_structure.map((item, idx) => (
                  <div key={idx} className="group relative bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-help text-center min-w-[80px]">
                    <div className="text-lg font-bold text-slate-800">{item.text}</div>
                    <div className="text-xs text-slate-400 uppercase font-semibold mt-1">{item.role}</div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 bg-slate-800 text-white text-xs p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
                      <div className="font-bold text-yellow-300 mb-1 text-sm">{item.meaning} ({item.romaji})</div>
                      <div className="leading-relaxed opacity-90">{item.explanation}</div>
                      <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 rotate-45"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                <h4 className="text-blue-700 font-bold mb-3 flex items-center gap-2">📚 Điểm ngữ pháp</h4>
                <ul className="space-y-3">
                  {analysis.grammar_points.map((g, i) => (
                    <li key={i} className="text-sm text-slate-700 leading-relaxed">
                      <span className="font-bold bg-white px-2 py-0.5 rounded border border-blue-200 text-blue-600 mr-2">{g.point}</span>
                      {g.explanation}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-purple-50/50 p-5 rounded-2xl border border-purple-100 h-full">
                <h4 className="text-purple-700 font-bold mb-3 flex items-center gap-2">🎨 Sắc thái & Văn phong</h4>
                <p className="text-sm text-slate-700 leading-relaxed italic border-l-4 border-purple-300 pl-3">
                  "{analysis.nuance}"
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-slate-500 font-bold uppercase text-xs tracking-wider mb-3">Cách diễn đạt khác</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analysis.alternatives.map((alt, i) => (
                  <div key={i} className="flex flex-col bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-bold text-slate-500 bg-white px-2 py-1 rounded border border-slate-200 uppercase">{alt.tone}</div>
                    </div>
                    <div className="font-bold text-slate-800 text-lg mb-1">{alt.text}</div>
                    <div className="text-xs text-slate-500">{alt.explanation}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. WORD DETAIL SECTION */}
      {wordDetail?.success && wordDetail.entry && !isTranslating ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-blue-600 p-1 h-1 w-full"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            <div className="p-6 lg:col-span-1 bg-blue-50/30">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Search size={14} /> Từ điển Nhật - Việt
              </div>
              <h2 className="text-4xl font-black text-slate-800 mb-1">{wordDetail.entry.lemma}</h2>
              <div className="text-xl text-slate-500 font-light mb-4">{wordDetail.entry.reading}</div>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                  <span className="block text-xs text-slate-400 font-bold uppercase mb-1">Romaji</span>
                  <span className="font-mono text-blue-600 font-medium">{wordDetail.entry.romaji}</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                  <span className="block text-xs text-slate-400 font-bold uppercase mb-1">Loại từ</span>
                  <span className="font-medium text-slate-700">{wordDetail.entry.pos.vi}</span>
                  {wordDetail.entry.pos?.extra?.group && (
                    <span className="text-slate-400 text-xs ml-2">({wordDetail.entry.pos.extra.group})</span>
                  )}
                </div>
                {!!wordDetail.relatedWords?.length && (
                  <div className="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 shadow-sm mt-4">
                    <span className="block text-xs text-indigo-400 font-bold uppercase mb-2 flex items-center gap-1">
                      <Sparkles size={10} /> Từ liên quan
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {wordDetail.relatedWords
                        .filter(rw => rw.lemma !== wordDetail.entry?.lemma)
                        .slice(0, 5)
                        .map((rw) => (
                          <button
                            key={rw.id}
                            onClick={() => selectSuggestion(rw)}
                            className="text-xs px-2 py-1 bg-white border border-indigo-200 text-indigo-700 rounded hover:bg-indigo-600 hover:text-white transition-all font-medium"
                          >
                            {rw.lemma}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="w-2 h-6 bg-blue-600 rounded-full"></span> Nghĩa tiếng Việt
                </h3>
                <p className="text-xl text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {wordDetail.entry.meaningVi}
                </p>
              </div>
              {!!wordDetail.examples?.length && (
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Ví dụ mẫu câu</h3>
                  <div className="space-y-3">
                    {wordDetail.examples.slice(0, 3).map((ex, idx) => (
                      <div key={idx} className="group p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                        <div className="text-lg text-slate-800 font-medium mb-1">{idx + 1}. {ex.jp}</div>
                        {ex.romaji && <div className="text-xs text-slate-400 font-mono mb-2 group-hover:text-blue-500 transition-colors">{ex.romaji}</div>}
                        {ex.vi && <div className="text-slate-600 italic border-l-2 border-slate-200 pl-3 group-hover:border-blue-400 transition-colors">{ex.vi}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* 5. VOCAB DASHBOARD (LUÔN HIỂN THỊ) */}
      <div className="border-t border-slate-100 pt-8 mt-10">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-700 flex items-center justify-center gap-2">
            <BookOpen className="text-blue-500" size={24} /> Khám phá từ vựng
          </h2>
          <p className="text-slate-400 text-sm mt-1">Gợi ý từ mới dành cho bạn</p>
        </div>

        {isLoadingDashboard ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-slate-100 rounded-xl animate-pulse"></div>)}
          </div>
        ) : vocabData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wide px-2">Danh từ (名詞)</h3>
              {vocabData.nouns.map(renderVocabCard)}
            </div>
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-red-500 uppercase tracking-wide px-2">Động từ (動詞)</h3>
              {vocabData.verbs.map(renderVocabCard)}
            </div>
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-amber-600 uppercase tracking-wide px-2">Tính từ (形容詞)</h3>
              {vocabData.adjs.map(renderVocabCard)}
            </div>
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-purple-500 uppercase tracking-wide px-2">Khác (その他)</h3>
              {vocabData.others.map(renderVocabCard)}
            </div>
          </div>
        ) : null}
      </div>

      <SaveFlashcardModal
        open={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        processing={processing}
        saveStatus={saveStatus}
        inputText={inputText}
        translatedText={translatedText}
        userDecks={userDecks}
        selectedDeckId={selectedDeckId}
        setSelectedDeckId={setSelectedDeckId}
        newDeckName={newDeckName}
        setNewDeckName={setNewDeckName}
        onSave={handleSaveToDeck}
      />
    </div>
  );
}