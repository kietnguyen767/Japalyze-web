// components/flashcards/DeckQuiz.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Trophy, ArrowLeft, RefreshCw, Star, XCircle } from 'lucide-react';

// 👇 SỬA LẠI TYPE CHO KHỚP VỚI PRISMA
type Card = {
  id: string;
  front: string; 
  back: string; 
  isLearned: boolean; // Đổi 'learned' thành 'isLearned'
};

type DeckQuizProps = {
  cards: Card[];
  deckId: string;
  onBack: () => void;
  onUpdateProgress: (cardId: string) => void; 
};

function shuffleArray(array: any[]) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default function DeckQuiz({ cards, onBack, onUpdateProgress }: DeckQuizProps) {
  const [quizData, setQuizData] = useState<any[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (cards.length < 4) return; 
    
    // Logic: Ưu tiên trộn các thẻ CHƯA thuộc lên đầu, nhưng vẫn lấy hết để đủ đáp án sai
    const shuffledCards = shuffleArray(cards);

    const questions = shuffledCards.map((card) => {
      // Lấy 3 đáp án sai ngẫu nhiên từ các thẻ khác
      const otherCards = cards.filter(c => c.id !== card.id);
      const wrongOptions = shuffleArray(otherCards).slice(0, 3).map(c => c.back);
      
      // Trộn đáp án đúng vào
      const finalOptions = shuffleArray([...wrongOptions, card.back]);

      return {
        id: card.id,
        question: card.front,
        correctAnswer: card.back,
        options: finalOptions
      };
    });

    setQuizData(questions);
  }, [cards]);

  const handleSelectOption = (cardId: string, option: string, correct: string) => {
    if (userAnswers[cardId]) return; // Chặn click lại

    setUserAnswers(prev => ({ ...prev, [cardId]: option }));

    if (option === correct) {
      setScore(prev => prev + 1);
      onUpdateProgress(cardId); // Gọi callback để lưu vào DB ngay lập tức
    }
  };

  // --- MÀN HÌNH: KHÔNG ĐỦ THẺ ---
  if (cards.length < 4) {
    return (
      <div className="p-8 md:p-10 text-center border-2 border-dashed border-red-200 rounded-xl bg-red-50">
        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle size={32} />
        </div>
        <h3 className="text-red-600 font-bold text-xl mb-2">Không đủ dữ liệu</h3>
        <p className="text-slate-500 mb-6">Cần ít nhất 4 thẻ trong bộ này để tạo bài trắc nghiệm.</p>
        <button onClick={onBack} className="bg-white border-2 border-red-300 px-6 py-2 rounded-lg font-bold text-red-600 hover:bg-red-100 transition-all">
            ← Quay lại
        </button>
      </div>
    );
  }

  if (quizData.length === 0) return <div className="p-10 text-center text-slate-500">Đang trộn đề thi...</div>;

  const answeredCount = Object.keys(userAnswers).length;
  const isFinished = answeredCount === quizData.length;

  return (
    <div className="animate-fade-in-up pb-20">
      
      {/* Header Sticky */}
      <div className="flex justify-between items-center mb-6 sticky top-20 bg-white/90 p-4 rounded-xl shadow-sm z-40 backdrop-blur border border-slate-100">
        <button onClick={onBack} className="text-slate-500 hover:text-blue-600 flex items-center gap-1 font-medium transition-colors">
          <ArrowLeft size={20} /> Dừng bài
        </button>
        <div className="flex items-center gap-4">
           <span className="text-sm font-bold text-slate-400">{answeredCount}/{quizData.length}</span>
           <div className="flex items-center gap-2 text-yellow-600 font-bold bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
              <Trophy size={16} /> {score} điểm
           </div>
        </div>
      </div>

      {/* Danh sách câu hỏi */}
      <div className="space-y-8">
        {quizData.map((q, index) => {
          const userAnswer = userAnswers[q.id];
          const isAnswered = !!userAnswer;
          const isCorrect = userAnswer === q.correctAnswer;
          
          let borderClass = "border-slate-100 hover:border-blue-200";
          if (isAnswered) borderClass = isCorrect ? "border-green-500 bg-green-50/30" : "border-red-300 bg-red-50/30";

          return (
            <div key={q.id} className={`bg-white p-6 md:p-8 rounded-3xl shadow-sm border-2 ${borderClass} transition-all`}>
              <div className="text-center mb-8">
                 <p className="text-xs text-slate-400 uppercase font-bold mb-2 tracking-widest">Câu hỏi {index + 1}</p>
                 <div className="text-2xl md:text-4xl font-black text-slate-800">{q.question}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {q.options.map((opt: string, idx: number) => {
                    const isSelected = userAnswer === opt;
                    const isTrue = opt === q.correctAnswer;
                    
                    let btnClass = "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-blue-300";
                    let icon = null;

                    if (isAnswered) {
                        if (isSelected && isTrue) {
                            btnClass = "bg-green-600 border-green-600 text-white shadow-lg";
                            icon = <CheckCircle size={20} />;
                        }
                        else if (isSelected && !isTrue) {
                            btnClass = "bg-red-500 border-red-500 text-white shadow-md";
                            icon = <XCircle size={20} />;
                        }
                        else if (!isSelected && isTrue) {
                            btnClass = "bg-green-50 border-green-400 text-green-700 border-dashed";
                        }
                        else {
                            btnClass = "opacity-50 bg-slate-50 text-slate-400 cursor-not-allowed";
                        }
                    }

                    return (
                       <button key={idx}
                          onClick={() => handleSelectOption(q.id, opt, q.correctAnswer)}
                          disabled={isAnswered}
                          className={`py-3 px-4 rounded-2xl border-2 font-bold text-base transition-all text-left flex items-center justify-between gap-3 ${btnClass}`}
                       >
                           <span className="flex-1">{opt}</span>
                           {icon && <span>{icon}</span>}
                       </button>
                    );
                 })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Màn hình kết thúc (Hiện ở cuối trang khi làm xong) */}
      {isFinished && (
         <div className="mt-12 text-center bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-xl">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <Star size={40} className="text-yellow-300 fill-yellow-300" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Hoàn thành xuất sắc!</h2>
            <p className="text-blue-100 mb-8 text-lg">Bạn đã trả lời đúng <strong className="text-yellow-200 text-2xl">{score}/{quizData.length}</strong> câu hỏi.</p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
                <button onClick={onBack} className="bg-white/20 hover:bg-white/30 text-white border-2 border-white px-6 md:px-8 py-3 rounded-xl font-bold transition-all">
                    ← Quay lại
                </button>
                <button onClick={() => window.location.reload()} className="bg-white text-blue-600 px-6 md:px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                    <RefreshCw size={20}/> Làm lại
                </button>
            </div>
         </div>
      )}
    </div>
  );
}