// components/flashcards/DeckQuiz.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Trophy, ArrowLeft, RefreshCw, Star, XCircle } from 'lucide-react';

/* =======================
   TYPES
======================= */
type Card = {
  id: string;
  front: string;
  back: string;
  isLearned: boolean;
};

type DeckQuizProps = {
  cards: Card[];
  deckId: string;
  onBack: () => void;
  onUpdateProgress: (cardId: string) => void;
  onStatsChange?: (stats: { score: number; answeredCount: number; total: number }) => void;
};

type QuizQuestion = {
  id: string;
  question: string;
  correctAnswer: string;
  options: string[];
};

/* =======================
   UTILS
======================= */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* =======================
   COMPONENT
======================= */
export default function DeckQuiz({
  cards,
  onBack,
  onUpdateProgress,
  onStatsChange
}: DeckQuizProps) {
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);

  /* =======================
     INIT QUIZ (RUN ONCE WHEN READY)
  ======================= */
  useEffect(() => {
    // Only initialize if we have enough cards and haven't initialized yet
    if (cards.length < 4 || quizData.length > 0) return;

    const shuffledCards = shuffleArray(cards);

    const questions: QuizQuestion[] = shuffledCards.map(card => {
      // Get all possible wrong translations (unique)
      const allWrongBacks = Array.from(new Set(
        cards
          .filter(c => c.back !== card.back) // Must have different meaning
          .map(c => c.back)
      ));

      // Shuffle and pick up to 3 wrong options
      const shuffledWrong = shuffleArray(allWrongBacks).slice(0, 3);

      // Final options: Correct answer + up to 3 wrong ones
      const options = shuffleArray([...shuffledWrong, card.back]);

      return {
        id: card.id,
        question: card.front,
        correctAnswer: card.back,
        options
      };
    });

    setQuizData(questions);
    onStatsChange?.({ score: 0, answeredCount: 0, total: questions.length });
  }, [cards, quizData.length]);

  /* =======================
     NOTIFY PARENT OF STATS
  ======================= */
  useEffect(() => {
    if (quizData.length === 0) return;
    onStatsChange?.({
      score,
      answeredCount: Object.keys(userAnswers).length,
      total: quizData.length
    });
  }, [score, userAnswers, quizData.length]);

  /* =======================
     HANDLERS
  ======================= */
  const handleSelectOption = (
    cardId: string,
    option: string,
    correct: string
  ) => {
    if (userAnswers[cardId]) return;

    setUserAnswers(prev => ({ ...prev, [cardId]: option }));

    if (option === correct) {
      setScore(prev => prev + 1);
      onUpdateProgress(cardId);
    }
  };

  /* =======================
     STATES
  ======================= */
  if (cards.length < 4) {
    return (
      <div className="p-8 md:p-10 text-center border-2 border-dashed border-red-200 rounded-xl bg-red-50">
        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <XCircle size={32} />
        </div>
        <h3 className="text-red-600 font-bold text-xl mb-2">
          Không đủ dữ liệu
        </h3>
        <p className="text-slate-500 mb-6">
          Cần ít nhất 4 thẻ trong bộ này để tạo bài trắc nghiệm.
        </p>
      </div>
    );
  }

  if (quizData.length === 0) {
    return (
      <div className="p-10 text-center text-slate-500">
        Đang trộn đề thi...
      </div>
    );
  }

  const answeredCount = Object.keys(userAnswers).length;
  const isFinished = answeredCount === quizData.length;

  /* =======================
     RENDER
  ======================= */
  return (
    <div className="animate-fade-in-up pb-20">
      {/* Questions */}
      <div className="space-y-8">
        {quizData.map((q, index) => {
          const userAnswer = userAnswers[q.id];
          const isAnswered = !!userAnswer;
          const isCorrect = userAnswer === q.correctAnswer;

          let borderClass =
            'border-slate-100 hover:border-blue-200';

          if (isAnswered) {
            borderClass = isCorrect
              ? 'border-green-500 bg-green-50/30'
              : 'border-red-300 bg-red-50/30';
          }

          return (
            <div
              key={q.id}
              className={`bg-white p-6 md:p-8 rounded-3xl shadow-sm border-2 ${borderClass}`}
            >
              <div className="text-center mb-8">
                <p className="text-xs text-slate-400 uppercase font-bold mb-2 tracking-widest">
                  Câu hỏi {index + 1}
                </p>
                <div className="text-2xl md:text-4xl font-black text-slate-800">
                  {q.question}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.options.map(opt => {
                  const isSelected = userAnswer === opt;
                  const isTrue = opt === q.correctAnswer;

                  let btnClass =
                    'bg-white border-slate-200 text-slate-700 hover:bg-slate-50';

                  let icon = null;

                  if (isAnswered) {
                    if (isSelected && isTrue) {
                      btnClass =
                        'bg-green-600 border-green-600 text-white shadow-lg';
                      icon = <CheckCircle size={20} />;
                    } else if (isSelected && !isTrue) {
                      btnClass =
                        'bg-red-500 border-red-500 text-white shadow-md';
                      icon = <XCircle size={20} />;
                    } else if (!isSelected && isTrue) {
                      btnClass =
                        'bg-green-50 border-green-400 text-green-700 border-dashed';
                    } else {
                      btnClass =
                        'opacity-50 bg-slate-50 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={`${q.id}-${opt}`} // ✅ FIX KEY
                      disabled={isAnswered}
                      onClick={() =>
                        handleSelectOption(
                          q.id,
                          opt,
                          q.correctAnswer
                        )
                      }
                      className={`py-3 px-4 rounded-2xl border-2 font-bold text-base text-left flex items-center justify-between gap-3 transition-all ${btnClass}`}
                    >
                      <span className="flex-1">{opt}</span>
                      {icon}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Result */}
      {isFinished && (
        <div className="mt-12 text-center bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-xl">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star size={40} className="text-yellow-300 fill-yellow-300" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Hoàn thành xuất sắc!
          </h2>

          <p className="text-blue-100 mb-8 text-lg">
            Bạn đã trả lời đúng{' '}
            <strong className="text-yellow-200 text-2xl">
              {score}/{quizData.length}
            </strong>{' '}
            câu hỏi.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-blue-50 transition-all active:scale-95"
            >
              <RefreshCw size={20} /> Làm lại bài này
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
