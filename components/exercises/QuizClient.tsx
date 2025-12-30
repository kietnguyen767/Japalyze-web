//// components/exercises/QuizClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, RefreshCw, Trophy, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

// Helper trộn mảng
function shuffleArray(array: any[]) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

type QuizClientProps = {
  data: any[];       
  title: string;
  lessonId: string;
};

export default function QuizClient({ data, title, lessonId }: QuizClientProps) {
  const { user } = useAuth();
  const [quizData, setQuizData] = useState<any[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);

  // Khởi tạo đề thi
  useEffect(() => {
    const questions = shuffleArray(data).map((item, index) => {
      const wrongOptions = data
        .filter(i => i.romaji !== item.romaji)
        .map(i => i.romaji);
      const shuffledWrong = shuffleArray(wrongOptions).slice(0, 3);
      const finalOptions = shuffleArray([...shuffledWrong, item.romaji]);

      return {
        id: index,
        questionChar: item,
        options: finalOptions
      };
    });
    setQuizData(questions);
  }, [data]);

  const handleSelectOption = (qId: number, opt: string, correct: string) => {
    if (userAnswers[qId]) return;
    setUserAnswers(prev => ({ ...prev, [qId]: opt }));
    if (opt === correct) setScore(s => s + 1);
  };

  const handleRestart = () => window.location.reload();

  const answeredCount = Object.keys(userAnswers).length;
  const totalCount = quizData.length;
  const isAllDone = answeredCount === totalCount && totalCount > 0;
  const isPerfectScore = score === totalCount; // Kiểm tra điểm tuyệt đối

  // === 🔥 LOGIC MỚI: CHỈ LƯU KHI ĐIỂM TUYỆT ĐỐI 🔥 ===
  useEffect(() => {
    if (isAllDone && isPerfectScore && user) {
        // 👇 GỌI API MỚI
        fetch('/api/exercises/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lessonId }) // Bỏ email
        }).then(() => console.log("Đã lưu hoàn thành bài học (100% điểm)"));
    }
  }, [isAllDone, isPerfectScore, user, lessonId]);


  if (quizData.length === 0) return <div className="p-10 text-center">Đang tạo đề thi...</div>;

  return (
    <div className="max-w-3xl mx-auto pb-10">
      {/* Header Sticky */}
      <div className="flex justify-between items-center mb-6 sticky top-20 z-40 backdrop-blur py-2">
        <Link href="/exercises" className="text-slate-500 hover:text-blue-600 flex items-center gap-1 font-medium">
          <ArrowLeft size={20} /> Thư viện
        </Link>

        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
           <span className="font-bold text-slate-700 hidden sm:inline">{title}</span>
           <span className="text-sm text-slate-400">{answeredCount}/{totalCount}</span>
           <div className="w-[1px] h-4 bg-slate-300"></div>
           <div className={`flex items-center gap-2 font-bold ${score === answeredCount ? 'text-green-600' : 'text-orange-500'}`}>
              <Trophy size={18} /> {score} điểm
           </div>
        </div>
      </div>

      {/* Thông báo Kết quả (Hiển thị khi làm xong) */}
      {isAllDone && (
         <div className={`p-6 rounded-2xl shadow-lg mb-8 animate-fade-in-down text-white flex flex-col md:flex-row items-center justify-between gap-4 ${isPerfectScore ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-orange-400 to-red-500'}`}>
            <div>
               <h2 className="text-xl font-bold flex items-center gap-2">
                 {isPerfectScore ? <><CheckCircle/> Xuất sắc! Bạn đã thuộc bài.</> : <><AlertTriangle/> Chưa đạt!</>}
               </h2>
               <p className="opacity-90 mt-1">
                 {isPerfectScore 
                    ? "Bạn đã trả lời đúng tất cả câu hỏi. Bài học đã được đánh dấu hoàn thành." 
                    : `Bạn chỉ đúng ${score}/${totalCount} câu. Hãy làm lại để đạt 100% nhé.`}
               </p>
            </div>
            <button onClick={handleRestart} className="bg-white text-slate-800 px-5 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-slate-100 shadow-md">
               <RefreshCw size={18}/> Làm lại ngay
            </button>
         </div>
      )}

      {/* Danh sách câu hỏi */}
      <div className="space-y-6">
        {quizData.map((q, index) => {
          const userAnswer = userAnswers[q.id];
          const isAnswered = !!userAnswer;
          const isCorrect = userAnswer === q.questionChar.romaji;
          
          let borderClass = "border-slate-200";
          if (isAnswered) borderClass = isCorrect ? "border-green-500 bg-green-50/30" : "border-red-300 bg-red-50/30";

          return (
            <div key={q.id} className={`bg-white p-6 rounded-2xl shadow-sm border-2 ${borderClass} transition-all`}>
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full text-xs font-bold text-slate-500">{index + 1}</span>
                    <span className="text-sm text-slate-500 font-bold uppercase">Chọn Romaji</span>
                 </div>
                 {isAnswered && (isCorrect ? <CheckCircle className="text-green-500"/> : <XCircle className="text-red-500"/>)}
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                 <div className="text-6xl font-black text-slate-800 min-w-[80px] text-center">{q.questionChar.kana}</div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                    {q.options.map((opt: string) => {
                       const isSelected = userAnswer === opt;
                       const isTrue = opt === q.questionChar.romaji;
                       
                       let btnClass = "bg-white border-slate-200 text-slate-600 hover:border-blue-300";
                       if (isAnswered) {
                          if (isSelected && isTrue) btnClass = "bg-green-500 border-green-500 text-white";
                          else if (isSelected && !isTrue) btnClass = "bg-red-500 border-red-500 text-white";
                          else if (!isSelected && isTrue) btnClass = "bg-green-50 border-green-300 text-green-700 border-dashed";
                          else btnClass = "opacity-40 bg-slate-50 border-transparent";
                       }

                       return (
                          <button key={opt}
                             onClick={() => handleSelectOption(q.id, opt, q.questionChar.romaji)}
                             disabled={isAnswered}
                             className={`py-3 px-4 rounded-xl border-2 font-bold text-lg transition-all ${btnClass}`}
                          >{opt}</button>
                       );
                    })}
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}