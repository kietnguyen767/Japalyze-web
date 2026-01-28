'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Clock, PauseCircle, PlayCircle, List, ArrowLeft, 
  Flag, X, Loader2, CheckCircle2, Circle, Image as ImageIcon 
} from 'lucide-react';

// Định nghĩa Type cục bộ (Cập nhật thêm imageUrl, audioUrl)
interface TakingTestProps {
  test: {
    title: string;
    questions: {
      id: string;
      type: string;
      content: string;
      options: string[];
      imageUrl?: string | null; // <-- Thêm
      audioUrl?: string | null; // <-- Thêm
    }[];
  } | null;
  currentQIndex: number;
  setCurrentQIndex: (idx: number) => void;
  answers: {[key: string]: number};
  setAnswers: React.Dispatch<React.SetStateAction<{[key: string]: number}>>;
  timeLeft: number;
  isPaused: boolean;
  togglePause: () => void;
  onSubmit: () => void;
  onExit: () => void;
}

export default function TakingTest({ 
  test, currentQIndex, setCurrentQIndex, answers, setAnswers, 
  timeLeft, isPaused, togglePause, onSubmit, onExit 
}: TakingTestProps) {
    
  const [showPalette, setShowPalette] = useState(false);
  const questionRefs = useRef<{[key: number]: HTMLDivElement | null}>({});

  // --- SAFETY CHECK ---
  if (!test || !test.questions || test.questions.length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-50 z-[100]">
        <div className="text-center">
          <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={48} strokeWidth={2.5}/>
          <p className="text-slate-500 font-semibold text-lg">Đang tải câu hỏi...</p>
        </div>
      </div>
    );
  }

  // Scroll to question khi click
  const scrollToQuestion = (idx: number) => {
    questionRefs.current[idx]?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
    setCurrentQIndex(idx);
    setShowPalette(false);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleAnswer = (questionId: string, optIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optIndex }));
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / test.questions.length) * 100;

  return (
    // EDIT: Đổi nền gradient thành màu xám nhẹ (bg-slate-50)
    <div className="fixed inset-0 bg-slate-50 z-[100] flex flex-col h-screen text-slate-800">
      {/* Màn hình Pause */}
      {isPaused && (
        <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in">
          <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-sm mx-4 border border-slate-200">
            <div className="bg-orange-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <PauseCircle className="text-orange-500" size={40} strokeWidth={2.5}/>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Đang tạm dừng</h3>
            <p className="text-slate-500 mb-6">Nhấn nút bên dưới để tiếp tục làm bài</p>
            <button 
              onClick={togglePause} 
              // EDIT: Nút bấm phẳng, màu xanh chuẩn
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md flex items-center gap-2 mx-auto"
            >
              <PlayCircle size={20}/> Tiếp tục làm bài
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      {/* EDIT: Bỏ gradient, viền slate-200, shadow nhẹ */}
      <div className="bg-white px-6 py-4 flex justify-between items-center shadow-sm z-20 border-b border-slate-200 h-20 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onExit} 
            className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-red-500 transition-all active:scale-95"
          >
            <ArrowLeft size={22} strokeWidth={2.5}/>
          </button>
          <div>
            <h2 className="font-bold text-slate-800 text-base line-clamp-1 max-w-[150px] md:max-w-md mb-1">
              {test.title}
            </h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-600 font-semibold">
                {answeredCount}/{test.questions.length} đã hoàn thành
              </span>
            </div>
          </div>
        </div>
        
        {/* EDIT: Đồng hồ đơn giản */}
        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono font-bold text-lg border transition-all ${timeLeft < 60 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
          <Clock size={20}/>
          {formatTime(timeLeft)}
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={togglePause} 
            className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-all active:scale-95"
          >
            {isPaused ? <PlayCircle size={24} strokeWidth={2.5}/> : <PauseCircle size={24} strokeWidth={2.5}/>}
          </button>
          
          <button 
            onClick={() => setShowPalette(!showPalette)} 
            className="md:hidden p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-all active:scale-95"
          >
            <List size={24} strokeWidth={2.5}/>
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 flex overflow-hidden">
        {/* CỘT TRÁI: Palette */}
        {/* EDIT: Nền trắng, viền slate-200 */}
        <div className={`w-80 bg-white border-r border-slate-200 flex flex-col absolute md:static inset-y-0 left-0 z-10 transition-transform duration-300 shadow-xl md:shadow-none ${showPalette ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <div className="p-5 border-b border-slate-200 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 text-base">Danh sách câu hỏi</h3>
              <p className="text-xs text-slate-500 mt-0.5">Nhấn để chuyển câu</p>
            </div>
            <button 
              onClick={() => setShowPalette(false)} 
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-all"
            >
              <X size={20}/>
            </button>
          </div>
          
          {/* Progress bar */}
          {/* EDIT: Nền xám nhạt */}
          <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
            <div className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
              <span>Tiến độ</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-green-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-5 gap-2.5">
              {test.questions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isCurrent = currentQIndex === idx;
                return (
                  <button 
                    key={q.id} 
                    onClick={() => scrollToQuestion(idx)} 
                    // EDIT: Màu nút điều hướng: Xanh (Current), Lục (Answered), Trắng (Default)
                    className={`h-11 rounded-xl font-bold text-sm transition-all border active:scale-95 relative ${
                      isCurrent 
                        ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200 z-10' 
                        : isAnswered 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-300' 
                          : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    {idx + 1}
                    {isAnswered && !isCurrent && (
                      <div className="absolute -top-1 -right-1 bg-emerald-500 rounded-full p-0.5 border-2 border-white">
                        <CheckCircle2 size={10} className="text-white" strokeWidth={4}/>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
          
          {/* Legend & Submit */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <CheckCircle2 size={12} className="text-emerald-600"/>
                </div>
                <span className="text-slate-600 font-medium">Đã trả lời</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-white border border-slate-300"/>
                <span className="text-slate-600 font-medium">Chưa trả lời</span>
              </div>
            </div>
            
            <button 
              onClick={() => { if(confirm("Bạn có chắc chắn muốn nộp bài?")) onSubmit(); }} 
              // EDIT: Nút Nộp bài màu xanh phẳng
              className="w-full py-3.5 bg-green-600 text-white rounded-xl font-bold text-base  shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-100"
            >
              <Flag size={20} strokeWidth={2.5}/> NỘP BÀI
            </button>
          </div>
        </div>

        {/* CỘT PHẢI: Scroll all questions */}
        <div className={`flex-1 overflow-y-auto ${isPaused ? 'blur-sm pointer-events-none' : ''}`}>
          <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-6 pb-16">
            {test.questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              return (
                <div 
                  key={q.id}
                  ref={(el) => { questionRefs.current[idx] = el; }}
                  // EDIT: Card câu hỏi nền trắng, viền slate-200
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-6 hover:shadow-md transition-all scroll-mt-24"
                >
                  {/* Question header */}
                  <div className="flex items-center justify-between mb-4">
                    {/* EDIT: Badge câu hỏi màu xám/xanh nhẹ */}
                    <div className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-lg font-bold text-sm">
                      Câu {idx + 1}
                    </div>
                    {isAnswered ? (
                      <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-100 flex items-center gap-1.5">
                        <CheckCircle2 size={14} strokeWidth={3}/> Đã trả lời
                      </div>
                    ) : (
                      <div className="bg-slate-50 text-slate-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-100 flex items-center gap-1.5">
                        <Circle size={14} strokeWidth={2}/> Chưa làm
                      </div>
                    )}
                  </div>
                  
                  {/* --- HIỂN THỊ MEDIA (MỚI) --- */}
                  <div className="mb-5 space-y-4">
                    {/* AUDIO PLAYER */}
                    {q.audioUrl && (
                        <div className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                                <PlayCircle size={20} fill="currentColor" className="text-blue-600"/>
                            </div>
                            <audio controls className="w-full h-8 outline-none" src={q.audioUrl}>
                                Trình duyệt không hỗ trợ audio.
                            </audio>
                        </div>
                    )}

                    {/* IMAGE VIEWER */}
                    {q.imageUrl && (
                        <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                            <img 
                                src={q.imageUrl} 
                                alt={`Hình ảnh cho câu ${idx + 1}`} 
                                className="w-full h-auto max-h-[350px] object-contain mx-auto"
                            />
                        </div>
                    )}
                  </div>
                  {/* --------------------------- */}

                  <h3 className="text-base md:text-lg font-semibold text-slate-800 leading-relaxed mb-6 whitespace-pre-line break-words">
                    {q.content}
                  </h3>
                  
                  <div className="space-y-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = answers[q.id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleAnswer(q.id, optIdx)}
                          // EDIT: Style option phẳng, rõ ràng
                          className={`w-full p-4 rounded-xl text-left border-2 transition-all flex items-start gap-3 group relative overflow-hidden ${
                            isSelected 
                              ? 'border-blue-600 bg-blue-50/50 shadow-inner' // Chọn: Xanh
                              : 'border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50' // Thường: Trắng
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 transition-all ${
                            isSelected 
                              ? 'bg-blue-600 text-white shadow-md' 
                              : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm'
                          }`}>
                            {['A', 'B', 'C', 'D'][optIdx]}
                          </div>
                          <span className={`text-base font-medium transition-all leading-relaxed pt-0.5 break-words flex-1 ${
                            isSelected 
                              ? 'text-blue-900 font-semibold' 
                              : 'text-slate-600'
                          }`}>
                            {opt}
                          </span>
                          
                          {isSelected && (
                             <div className="absolute top-4 right-4 text-blue-600 animate-in zoom-in spin-in-12 duration-300">
                                <CheckCircle2 size={20} fill="currentColor" className="text-white"/>
                             </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}