// components/exercises/ConversationClient.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, ArrowLeft, Mic, CheckCircle, XCircle, Play, MessageCircle, HelpCircle, Heart, AlertTriangle, List, Home, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ConversationLesson, DialogueLine, CharacterName, Segment } from '@/lib/conversationData';
import { useAuth } from '@/context/AuthContext';

const CHAR_COLORS: Record<CharacterName, string> = {
  Aki: 'bg-blue-600',
  Daigo: 'bg-emerald-600',
  Chiki: 'bg-pink-500',
  Isora: 'bg-purple-500',
};

// Component hiển thị chữ có Furigana
const FuriganaText = ({ segments, isLeft, isQuizTitle }: { segments: Segment[], isLeft?: boolean, isQuizTitle?: boolean }) => {
  return (
    <div className={`font-bold leading-relaxed flex flex-wrap items-baseline gap-x-0.5 ${isQuizTitle ? 'text-xl text-slate-800 justify-center' : 'text-lg mb-1'}`}>
      {segments.map((seg, i) => {
        if (seg.furigana) {
          return (
            <span key={i} className="group relative inline-block cursor-pointer">
              <span className={`border-b-2 border-dotted ${isQuizTitle ? 'border-orange-400' : (isLeft ? 'border-slate-400' : 'border-indigo-300')}`}>
                {seg.text}
              </span>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block whitespace-nowrap px-2 py-0.5 bg-slate-800 text-white text-xs rounded shadow-lg z-10 animate-fade-in">
                {seg.furigana}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></span>
              </span>
            </span>
          );
        }
        return <span key={i}>{seg.text}</span>;
      })}
    </div>
  );
};

export default function ConversationClient({
  lesson,
  isRoadmapMode,
  questId
}: {
  lesson: ConversationLesson,
  isRoadmapMode?: boolean,
  questId?: string
}) {
  const { user } = useAuth();
  const router = useRouter();

  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<DialogueLine[]>([]);

  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // --- SETUP GIỌNG NÓI ---
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const getVoice = (speaker: CharacterName) => {
    const jpVoices = availableVoices.filter(v => v.lang.includes('ja') || v.lang.includes('JP'));
    const isMale = speaker === 'Aki' || speaker === 'Daigo';

    if (isMale) {
      const maleVoice = jpVoices.find(v => v.name.includes('Male') || v.name.includes('Ichiro'));
      if (maleVoice) return { voice: maleVoice, pitch: 1.0, rate: 1.0 };
    }
    const defaultVoice = jpVoices[0] || null;
    let pitch = 1.0;
    if (speaker === 'Aki') pitch = 0.6;
    if (speaker === 'Daigo') pitch = 0.75;
    if (speaker === 'Chiki') pitch = 1.1;
    if (speaker === 'Isora') pitch = 1.3;

    return { voice: defaultVoice, pitch, rate: 1.0 };
  };

  const speak = (text: string, speaker: CharacterName) => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    const config = getVoice(speaker);
    if (config.voice) u.voice = config.voice;
    u.pitch = config.pitch;
    u.rate = config.rate;
    window.speechSynthesis.speak(u);
  };

  // --- LOGIC SCROLL ---
  useEffect(() => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({ top: scrollHeight - clientHeight, behavior: 'smooth' });
    }
  }, [history, isQuizActive]);

  // --- LOGIC LƯU TIẾN ĐỘ ---
  useEffect(() => {
    // Điều kiện: Đã bắt đầu + Đã chạy hết hội thoại + Có user + Chưa lưu
    if (hasStarted && currentIndex >= lesson.lines.length && user && saveStatus === 'idle') {
      setSaveStatus('saving');

      // 1. Lưu bài tập thường
      fetch('/api/exercises/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: lesson.id })
      })
        .then(async (res) => {
          if (res.ok) {
            new BroadcastChannel('exercise-progress').postMessage({ lessonId: lesson.id });

            // 2. Lưu Quest Roadmap (Nếu có)
            if (isRoadmapMode && questId) {
              await fetch('/api/user/complete-quest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ questId })
              });
            }
            setSaveStatus('success');
          } else {
            setSaveStatus('error');
          }
        })
        .catch(() => setSaveStatus('error'));
    }
  }, [currentIndex, hasStarted, lesson.lines.length, lesson.id, user, saveStatus]);

  // --- LOGIC CHẠY HỘI THOẠI ---
  useEffect(() => {
    if (!hasStarted || isGameOver) return;
    if (currentIndex >= lesson.lines.length) return;

    const currentLine = lesson.lines[currentIndex];

    if (currentLine.isQuiz && !history.includes(currentLine)) {
      setIsQuizActive(true);
    }
    else if (!history.find(h => h.id === currentLine.id)) {
      setHistory(prev => [...prev, currentLine]);
      setTimeout(() => speak(currentLine.kana, currentLine.speaker), 500);
      const duration = currentLine.kana.length * 150 + 3500;
      const timer = setTimeout(() => {
        if (currentIndex < lesson.lines.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setCurrentIndex(prev => prev + 1);
        }
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [hasStarted, currentIndex, lesson.lines, isGameOver]);

  const handleQuizAnswer = (optionIndex: number) => {
    const currentLine = lesson.lines[currentIndex];

    if (optionIndex === currentLine.correctOptionIndex) {
      setQuizFeedback('correct');
      setTimeout(() => {
        setQuizFeedback(null);
        setIsQuizActive(false);
        setHistory(prev => [...prev, currentLine]);
        setTimeout(() => {
          speak(currentLine.kana, currentLine.speaker);
          const duration = currentLine.kana.length * 150 + 2000;
          setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
          }, duration);
        }, 600);
      }, 1000);
    } else {
      setQuizFeedback('wrong');
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      if (newMistakes >= 3) {
        setTimeout(() => setIsGameOver(true), 1000);
      } else {
        setTimeout(() => setQuizFeedback(null), 1000);
      }
    }
  };

  const handleStart = () => {
    setHasStarted(true);
    setMistakes(0);
    setIsGameOver(false);
    setHistory([]);
    setCurrentIndex(0);
    setSaveStatus('idle');
  };

  const handleReset = () => {
    setHasStarted(false);
    setMistakes(0);
    setIsGameOver(false);
    setHistory([]);
    setCurrentIndex(0);
    setQuizFeedback(null);
    setIsQuizActive(false);
    setSaveStatus('idle');
  };

  const handleGoBack = () => {
    if (isRoadmapMode) {
      router.back();
    } else {
      router.push('/exercises');
      router.refresh();
    }
  };

  // --- RENDER ---
  if (isGameOver) {
    return (
      <div className="max-w-4xl mx-auto h-[75vh] flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl border border-red-100 my-6 animate-fade-in p-8 text-center">
        <div className="w-24 h-24 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <AlertTriangle size={48} />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Hết mạng rồi!</h2>
        <p className="text-slate-500 mb-8">Bạn đã sai quá 3 lần. Hãy thử lại từ đầu nhé.</p>
        <button onClick={handleReset} className="px-8 py-3 bg-red-500 text-white rounded-full font-bold shadow-lg hover:bg-red-600 transition-all flex items-center gap-2">
          <RotateCcw size={20} /> Làm lại bài tập
        </button>
      </div>
    )
  }

  if (!hasStarted) {
    return (
      <div className="max-w-4xl mx-auto min-h-[80vh] flex flex-col items-center justify-center p-6 animate-fade-in relative">
        <div className="absolute top-0 left-4">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold py-4"
          >
            <ArrowLeft size={20} /> Quay lại {isRoadmapMode ? 'Lộ trình' : 'Thư viện'}
          </button>
        </div>
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 w-full max-w-lg text-center">
          <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle size={40} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">{lesson.title}</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">{lesson.description}</p>
          <div className="mb-8 p-4 bg-slate-50 rounded-2xl">
            <h3 className="text-xs font-bold uppercase text-slate-400 mb-4 tracking-wider">Nhân vật tham gia</h3>
            <div className="flex justify-center gap-6">
              {lesson.characters.map(char => (
                <div key={char} className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md transform hover:scale-110 transition-transform ${CHAR_COLORS[char]}`}>
                    {char[0]}
                  </div>
                  <span className="text-sm font-bold text-slate-600">{char}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4 text-slate-400 text-sm">
            <Heart className="text-red-500 fill-red-500" size={16} /> Bạn có 3 mạng cho bài tập này
          </div>
          <button onClick={handleStart} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 text-lg">
            <Play size={24} fill="currentColor" /> Bắt đầu ngay
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto h-[75vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
      <div className="bg-slate-50 p-4 border-b flex items-center justify-between shrink-0 h-16">
        <button onClick={handleGoBack} className="text-slate-500 hover:text-indigo-600 flex items-center gap-2 text-sm font-bold bg-white px-3 py-1.5 rounded-lg border border-slate-200 hover:border-indigo-300 transition-all">
          <ArrowLeft size={18} /> Thư viện
        </button>
        <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
          {[...Array(3)].map((_, i) => (
            <Heart key={i} size={20} className={`${i < (3 - mistakes) ? 'text-red-500 fill-red-500' : 'text-slate-300 fill-slate-200'} transition-all`} />
          ))}
        </div>
        <button onClick={handleReset} className="text-slate-400 hover:text-indigo-600 p-2 hover:bg-slate-100 rounded-full transition-all" title="Làm lại từ đầu">
          <RotateCcw size={20} />
        </button>
      </div>

      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/50 scroll-smooth">
        {history.map((line) => {
          const isLeft = line.speaker === lesson.characters[0];
          return (
            <div key={line.id} className={`flex w-full ${isLeft ? 'justify-start' : 'justify-end'} animate-fade-in-up`}>
              <div className={`flex flex-col items-center gap-1 ${isLeft ? 'order-1 mr-4' : 'order-2 ml-4'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ${CHAR_COLORS[line.speaker]}`}>
                  {line.speaker}
                </div>
              </div>
              <div className={`max-w-[80%] ${isLeft ? 'order-2' : 'order-1'}`}>
                <div className={`p-5 rounded-2xl shadow-sm border relative group transition-all
                  ${isLeft ? 'bg-white border-slate-200 rounded-tl-none text-slate-700' : 'bg-indigo-600 text-white border-indigo-600 rounded-tr-none'}`}>

                  {/* 🔥 BUTTON MIC (ĐÃ SỬA) 🔥 */}
                  <button
                    onClick={() => speak(line.kana, line.speaker)}
                    className={`absolute top-2 p-2 rounded-full hover:bg-slate-200 transition-colors text-slate-400
                        ${isLeft ? '-right-10' : '-left-10'}
                     `}
                    title="Nghe lại"
                  >
                    <Mic size={18} />
                  </button>

                  <FuriganaText segments={line.segments} isLeft={isLeft} />
                  <p className={`text-xs mb-1 opacity-80 ${isLeft ? 'text-slate-500' : 'text-indigo-100'}`}>{line.kana}</p>
                  <p className={`text-[10px] uppercase font-bold tracking-wide mb-3 opacity-60 ${isLeft ? 'text-slate-400' : 'text-indigo-200'}`}>{line.romaji}</p>
                  <div className={`border-t pt-2 mt-1 text-sm italic opacity-90 ${isLeft ? 'border-slate-100' : 'border-indigo-400'}`}>{line.meaning}</div>
                </div>
              </div>
            </div>
          );
        })}

        {isQuizActive && (
          <div className="flex justify-end animate-fade-in my-6">
            <div className="max-w-[85%] w-full bg-white p-6 rounded-2xl rounded-tr-none shadow-xl border-2 border-orange-200">
              <div className="flex items-center gap-3 mb-4 text-orange-600 font-bold text-base">
                <HelpCircle size={20} className="animate-bounce" />
                {lesson.lines[currentIndex].speaker} đang hỏi bạn:
              </div>
              {lesson.lines[currentIndex].quizQuestion && (
                <div className="mb-6 p-4 bg-orange-50 border border-orange-100 rounded-xl text-center">
                  <FuriganaText segments={lesson.lines[currentIndex].quizQuestion!} isQuizTitle={true} />
                </div>
              )}
              <div className="grid grid-cols-1 gap-3">
                {lesson.lines[currentIndex].quizOptions?.map((opt, idx) => (
                  <button key={idx} onClick={() => handleQuizAnswer(idx)} disabled={quizFeedback !== null} className={`w-full text-left p-4 rounded-xl border-2 transition-all text-base font-medium ${quizFeedback === null ? 'hover:bg-orange-50 border-slate-100 hover:border-orange-200 text-slate-700' : ''} ${quizFeedback === 'correct' && idx === lesson.lines[currentIndex].correctOptionIndex ? 'bg-green-50 border-green-500 text-green-700' : ''} ${quizFeedback === 'wrong' && idx !== lesson.lines[currentIndex].correctOptionIndex ? 'opacity-40 border-slate-100' : ''} ${quizFeedback === 'wrong' && idx === lesson.lines[currentIndex].correctOptionIndex ? 'bg-green-50 border-green-500 text-green-700 ring-2 ring-green-200' : ''}`}>
                    <div className="flex justify-between items-center">
                      <span>{opt}</span>
                      {quizFeedback === 'correct' && idx === lesson.lines[currentIndex].correctOptionIndex && <CheckCircle size={20} className="text-green-600" />}
                      {quizFeedback === 'wrong' && idx !== lesson.lines[currentIndex].correctOptionIndex && <XCircle size={20} className="text-red-400" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="h-4"></div>
      </div>

      {currentIndex >= lesson.lines.length && (
        <div className="p-8 bg-white border-t flex flex-col items-center animate-slide-up shrink-0">
          <h3 className="font-bold text-slate-800 text-2xl mb-2">🎉 Chúc mừng!</h3>
          <p className="text-slate-500 mb-6 text-center">
            {saveStatus === 'success' ? (
              <span className="flex items-center justify-center gap-2 text-green-600 font-medium">
                <CheckCircle size={20} /> Đã lưu kết quả hoàn thành!
              </span>
            ) : saveStatus === 'saving' ? (
              <span className="flex items-center justify-center gap-2 text-blue-600">
                <RotateCcw size={20} className="animate-spin" /> Đang lưu kết quả...
              </span>
            ) : saveStatus === 'error' ? (
              <span className="text-red-500">
                Lỗi khi lưu kết quả. Vui lòng thử lại.
              </span>
            ) : "Đang xử lý..."}
          </p>

          <div className="flex gap-4 w-full justify-center">
            <button
              onClick={handleGoBack}
              disabled={saveStatus === 'saving'}
              className={`px-6 py-3 text-white rounded-full font-bold shadow-lg transition-all flex items-center gap-2
                      ${saveStatus === 'saving' ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl'}
                    `}
            >
              <List size={20} /> Quay về danh sách
            </button>

            <button onClick={handleReset} className="px-6 py-3 bg-white text-slate-600 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
              <RotateCcw size={20} /> Làm lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
}