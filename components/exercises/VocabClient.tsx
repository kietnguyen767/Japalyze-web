// components/exercises/VocabClient.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react'; // Thêm useRef
import Link from 'next/link';
import {
  ArrowLeft,
  Volume2,
  Bookmark,
  Dumbbell,
  RefreshCw,
  Trophy,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

/* ================= TYPES ================= */

type QuizItem = {
  id: number;
  question: any;
  options: string[];
  correctAnswer: string;
};

type VocabClientProps = {
  sections: any[];
  title: string;
  lessonId: string;
  isRoadmapMode?: boolean;
  questId?: string;
};

/* ================= HELPERS ================= */

function shuffleArray(array: any[]) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

/* ================= MAIN COMPONENT ================= */

export default function VocabClient({
  sections,
  title,
  lessonId,
  isRoadmapMode,
  questId
}: VocabClientProps) {
  const router = useRouter();
  const [mode, setMode] = useState<'learning' | 'quiz'>('learning');

  const handleGoBack = () => {
    if (isRoadmapMode) {
      router.back();
    } else {
      router.push('/exercises');
    }
  };

  const playAudio = (text: string) => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };

  /* ========== 1. LEARNING MODE UI (GIAO DIỆN HỌC) ========== */
  if (mode === 'learning') {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in-up pb-24">
        {/* Header Sticky */}
        <div className="sticky top-16 md:top-20 z-40 backdrop-blur py-4 mb-6 flex justify-between items-center border-b border-slate-200/50">
          <button
            onClick={handleGoBack}
            className="text-slate-500 hover:text-blue-600 flex items-center gap-2 font-medium transition-colors"
          >
            <ArrowLeft size={20} /> <span className="hidden sm:inline">{isRoadmapMode ? 'Lộ trình' : 'Thư viện'}</span>
          </button>
          <h1 className="text-lg md:text-xl font-bold text-slate-800 bg-white px-5 py-2 rounded-full border shadow-sm truncate max-w-[200px] md:max-w-none">
            {title}
          </h1>
        </div>

        {/* Danh sách từ vựng */}
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                  <Bookmark size={18} className="text-blue-500 fill-blue-500" />
                  {section.title}
                </h2>
              </div>

              <div className="divide-y divide-slate-100">
                {section.items.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-blue-50/30 transition-colors group gap-4"
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <button
                        onClick={() => playAudio(item.kana)}
                        className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm group-hover:scale-110"
                        title="Nghe phát âm"
                      >
                        <Volume2 size={22} />
                      </button>

                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-3">
                          {item.kanji && (
                            <span className="text-2xl font-bold text-slate-800">
                              {item.kanji}
                            </span>
                          )}
                          <span className="text-xl font-medium text-blue-600">
                            {item.kana}
                          </span>
                        </div>
                        {item.romaji && (
                          <p className="text-xs text-slate-400 font-mono mt-1">
                            {item.romaji}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-left sm:text-right pl-16 sm:pl-0">
                      <p className="text-slate-700 font-bold text-lg">{item.meaning}</p>
                      {item.note && (
                        <p className="text-xs italic text-slate-400 mt-1">
                          {item.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Floating CTA Button */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-50 md:relative md:bg-transparent md:border-none md:shadow-none md:mt-12 md:p-0">
          <div className="container mx-auto max-w-3xl">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMode('quiz');
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl text-lg shadow-xl shadow-blue-200 transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Dumbbell size={24} /> Ôn luyện trắc nghiệm
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ========== 2. QUIZ MODE (CHẾ ĐỘ THI) ========== */
  return (
    <VocabQuizView
      sections={sections}
      title={title}
      lessonId={lessonId}
      onBack={() => setMode('learning')}
      playAudio={playAudio}
      isRoadmapMode={isRoadmapMode}
      questId={questId}
    />
  );
}

/* ================= SUB-COMPONENT: QUIZ VIEW ================= */

function VocabQuizView({
  sections,
  title,
  onBack,
  playAudio,
  lessonId,
  isRoadmapMode,
  questId
}: {
  sections: any[];
  title: string;
  lessonId: string;
  onBack: () => void;
  playAudio: (t: string) => void;
  isRoadmapMode?: boolean;
  questId?: string;
}) {
  const { user } = useAuth();
  const [quizData, setQuizData] = useState<QuizItem[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);

  // 1. Tạo Refs để lưu vị trí các câu hỏi
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Hàm tạo lại đề thi
  const generateQuiz = () => {
    const allVocab = sections.flatMap(s => s.items);
    const selected = shuffleArray(allVocab).slice(0, 25);

    const questions = selected.map((item, i) => {
      const wrong = shuffleArray(
        allVocab.filter(v => v.meaning !== item.meaning)
      ).slice(0, 3).map(v => v.meaning);

      return {
        id: i,
        question: item,
        options: shuffleArray([...wrong, item.meaning]),
        correctAnswer: item.meaning
      };
    });

    setQuizData(questions);
    setUserAnswers({});
    setScore(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    generateQuiz();
  }, [sections]);

  // 🔥 UPDATE LOGIC: Xử lý chọn và tự động cuộn
  const handleSelect = (qId: number, index: number, opt: string, correct: string, speak: string) => {
    if (userAnswers[qId]) return;

    // 1. Lưu kết quả
    setUserAnswers(p => ({ ...p, [qId]: opt }));
    if (opt === correct) {
      setScore(s => s + 1);
    }
    playAudio(speak);

    // 2. Tự động chuyển câu (Auto Scroll)
    const isLastQuestion = index === quizData.length - 1;

    setTimeout(() => {
      if (!isLastQuestion) {
        // Chưa hết -> Cuộn xuống câu tiếp theo
        const nextElement = questionRefs.current[index + 1];
        if (nextElement) {
          nextElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        // Hết rồi -> Cuộn lên đầu trang để xem kết quả
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 700); // Chờ 0.7s để user kịp nhìn thấy màu Xanh/Đỏ
  };

  const answeredCount = Object.keys(userAnswers).length;
  const totalCount = quizData.length;
  const isAllDone = answeredCount === totalCount && totalCount > 0;
  const isPerfectScore = score === totalCount;

  useEffect(() => {
    if (isAllDone && isPerfectScore && user) {
      // 1. Lưu tiến độ bài tập thường
      fetch('/api/exercises/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId })
      }).then(() => {
        new BroadcastChannel('exercise-progress').postMessage({ lessonId });
      });

      // 2. Lưu tiến độ Roadmap (Nếu có)
      if (isRoadmapMode && questId) {
        fetch('/api/user/complete-quest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questId })
        }).then(() => console.log('Saved roadmap quest progress'));
      }
    }
  }, [isAllDone, isPerfectScore, user, lessonId, isRoadmapMode, questId]);

  if (quizData.length === 0) return <div className="p-10 text-center">Đang tạo bài kiểm tra...</div>;

  return (
    <div className="max-w-3xl mx-auto pb-24">
      {/* Header Sticky */}
      <div className="flex justify-between items-center sticky top-16 md:top-20 py-2 mb-6 z-40">
        <button onClick={onBack} className="text-slate-500 hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft size={20} /> Dừng ôn tập
        </button>

        <div className={`flex items-center gap-3 bg-white px-4 py-2 rounded-full border shadow-sm ${isPerfectScore && isAllDone ? 'border-green-500 ring-1 ring-green-200' : ''}`}>
          <span className="text-sm font-medium text-slate-500">{answeredCount}/{totalCount}</span>
          <div className="w-[1px] h-4 bg-slate-200"></div>
          <div className={`flex items-center gap-1 font-bold ${score === answeredCount ? 'text-green-600' : 'text-red-500'}`}>
            <Trophy size={18} /> {score}
          </div>
        </div>
      </div>

      {/* Thông báo kết quả (Chỉ hiện khi làm xong - Cuộn lên đầu sẽ thấy cái này) */}
      {isAllDone && (
        <div className={`mb-8 p-6 rounded-2xl text-white shadow-lg animate-fade-in-down flex flex-col sm:flex-row items-center justify-between gap-4 ${isPerfectScore ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-slate-700'}`}>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              {isPerfectScore ? <CheckCircle size={32} /> : <XCircle size={32} />}
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">
                {isPerfectScore ? "🎉 Tuyệt vời! Bạn đã thuộc bài." : "⚠️ Tiếc quá! Chưa đạt 100%."}
              </h3>
              <p className="text-sm opacity-90">
                {isPerfectScore ? "Bài học đã được đánh dấu hoàn thành." : `Bạn đúng ${score}/${totalCount} câu. Hãy thử lại để lấy tích xanh nhé.`}
              </p>
            </div>
          </div>
          {!isPerfectScore && (
            <button onClick={generateQuiz} className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-lg text-sm font-bold whitespace-nowrap">
              Làm lại
            </button>
          )}
        </div>
      )}

      {/* Danh sách câu hỏi */}
      {quizData.map((q, i) => {
        const userAnswer = userAnswers[q.id];
        const isCorrect = userAnswer === q.correctAnswer;
        const isAnswered = !!userAnswer;

        return (
          <div
            key={q.id}
            // Gán ref cho từng thẻ câu hỏi
            ref={(el) => { questionRefs.current[i] = el; }}
            className={`bg-white p-6 rounded-2xl border-2 mb-6 transition-all scroll-mt-32 ${isAnswered ? (isCorrect ? 'border-green-500 bg-green-50/20' : 'border-red-400 bg-red-50/20') : 'border-slate-200'}`}
          >
            <div className="flex justify-between mb-4">
              <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${isAnswered ? (isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700') : 'bg-slate-100 text-slate-500'}`}>{i + 1}</span>
              <button onClick={() => playAudio(q.question.kana)} className="text-blue-500 hover:scale-110 transition-transform"><Volume2 size={24} /></button>
            </div>

            <div className="text-center text-4xl md:text-5xl font-black mb-2 text-slate-800">
              {q.question.kanji || q.question.kana}
            </div>
            {q.question.kanji && <div className="text-center text-blue-600 font-medium mb-6">{q.question.kana}</div>}
            {!q.question.kanji && <div className="mb-8"></div>}

            <div className="grid md:grid-cols-2 gap-3">
              {q.options.map(opt => {
                const isSelected = userAnswer === opt;
                const isTrue = opt === q.correctAnswer;
                let btnClass = "hover:border-blue-400 bg-white border-slate-200";

                if (isAnswered) {
                  if (isSelected && isTrue) btnClass = "bg-green-600 text-white border-green-600 shadow-md";
                  else if (isSelected && !isTrue) btnClass = "bg-red-500 text-white border-red-500 shadow-md";
                  else if (!isSelected && isTrue) btnClass = "bg-green-50 text-green-700 border-green-300 border-dashed opacity-70";
                  else btnClass = "opacity-30 bg-slate-100 border-transparent";
                }

                return (
                  <button
                    key={opt}
                    disabled={isAnswered}
                    // Truyền thêm index (i) để biết vị trí câu hỏi
                    onClick={() => handleSelect(q.id, i, opt, q.correctAnswer, q.question.kana)}
                    className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${btnClass}`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        );
      })}

      {/* Footer làm mới */}
      <div className="mt-12 text-center">
        <div className="inline-block p-1 rounded-full bg-slate-100 border border-slate-200">
          <button
            onClick={generateQuiz}
            className="flex items-center gap-2 px-8 py-3 bg-white text-blue-600 font-bold rounded-full shadow-sm hover:bg-blue-50 hover:shadow-md transition-all active:scale-95 border border-slate-100"
          >
            <RefreshCw size={20} className={quizData.length > 0 ? "" : "animate-spin"} />
            Làm lại bộ câu hỏi
          </button>
        </div>
      </div>
    </div>
  );
}