'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { 
  Clock, FileText, Lock, Crown, Play, LayoutGrid, 
  Loader2, FileQuestion, Sparkles, RotateCcw, CheckCircle, HelpCircle, XCircle 
} from 'lucide-react';
import TakingTest from '@/components/tests/TakingTest';

// --- TYPES ---
export type Question = {
  id: string;
  type: 'vocab' | 'grammar' | 'reading';
  content: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
};

export type MockTest = {
  id: string;
  title: string;
  level: string;
  duration: number;
  isPremium: boolean;
  questions: Question[];
  _count?: { questions: number };
};

const LEVELS = [
  { id: 'N5', label: 'N5' }, { id: 'N4', label: 'N4' },
  { id: 'N3', label: 'N3' }, { id: 'N2', label: 'N2' }, { id: 'N1', label: 'N1' },
];

export default function TestsPage() {
  const { user } = useAuth();
  
  // Navigation & Data State
  const [activeTab, setActiveTab] = useState('N5');
  const [viewState, setViewState] = useState<'list' | 'taking' | 'result'>('list');
  const [loading, setLoading] = useState(true);
  const [testList, setTestList] = useState<MockTest[]>([]);
  const [currentTest, setCurrentTest] = useState<MockTest | null>(null);
  
  // Exam State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Result State
  const [score, setScore] = useState(0);
  const [expandedExplanation, setExpandedExplanation] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Fetch Data
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await fetch('/api/tests');
        if (res.ok) setTestList(await res.json());
      } catch (error) {
        console.error("Lỗi tải đề:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  // --- LOGIC FUNCTIONS ---

  const handleStartTest = async (testId: string, isPremium: boolean) => {
    if (isPremium && !user?.isPremium) {
      alert("🔒 Bài thi này dành riêng cho thành viên Premium. Vui lòng nâng cấp!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/tests/${testId}`);
      if (!res.ok) throw new Error("Err");
      const fullTest = await res.json();
      
      // Safety check
      if (!fullTest || !fullTest.questions || fullTest.questions.length === 0) {
          alert("Đề thi này đang cập nhật câu hỏi.");
          setLoading(false);
          return;
      }

      setCurrentTest(fullTest);
      setCurrentQIndex(0);
      setAnswers({});
      setTimeLeft(fullTest.duration * 60);
      setIsPaused(false);
      setViewState('taking');
      
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) { handleSubmitTest(); return 0; }
          return prev - 1;
        });
      }, 1000);

    } catch { alert("Lỗi tải đề."); } finally { setLoading(false); }
  };

  const handleTogglePause = () => {
    if (isPaused) { 
        setIsPaused(false); 
        timerRef.current = setInterval(() => setTimeLeft(prev => prev - 1), 1000); 
    } else { 
        setIsPaused(true); 
        if (timerRef.current) clearInterval(timerRef.current); 
    }
  };

  const handleSubmitTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!currentTest) return;
    let correctCount = 0;
    currentTest.questions.forEach(q => { if (answers[q.id] === q.correctAnswer) correctCount++; });
    setScore(Math.round((correctCount / currentTest.questions.length) * 100));
    setViewState('result');
  };

  const handleExit = () => {
    if (confirm("Thoát bài thi? Kết quả sẽ không được lưu.")) {
        if (timerRef.current) clearInterval(timerRef.current);
        setViewState('list'); setCurrentTest(null); setAnswers({});
    }
  };

  const handleReturnList = () => {
      setViewState('list'); setCurrentTest(null); setAnswers({});
  };

  // --- RENDERERS ---

  // 1. LIST VIEW (Style giống Reading)
  const renderTestList = () => {
    const filteredTests = testList.filter(t => t.level === activeTab);

    // Helper tạo màu nền gradient cho đẹp
    const getLevelColor = (level: string) => {
        switch(level) {
            case 'N5': return 'from-emerald-400 to-green-600';
            case 'N4': return 'from-teal-400 to-emerald-600';
            case 'N3': return 'from-cyan-400 to-blue-600';
            case 'N2': return 'from-indigo-400 to-purple-600';
            case 'N1': return 'from-orange-400 to-red-600';
            default: return 'from-slate-400 to-slate-600';
        }
    };

    return (
      <div className="max-w-7xl mx-auto w-full p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 flex items-center gap-3">
              <FileQuestion className="text-blue-600" size={40} />
              Luyện thi JLPT
            </h1>
            <p className="text-slate-500 text-lg">
              Kho đề thi chuẩn từ N5 đến N1. Có chấm điểm và giải thích.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-slate-200">
          {LEVELS.map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => setActiveTab(lvl.id)}
              className={`
                px-5 py-2.5 rounded-full font-bold text-sm transition-all
                ${activeTab === lvl.id 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}
              `}
            >
              {lvl.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTests.length > 0 ? (
                    filteredTests.map((test) => {
                        const isLocked = test.isPremium && !user?.isPremium;
                        return (
                            <div key={test.id} onClick={() => handleStartTest(test.id, test.isPremium)} className="group cursor-pointer">
                                <div className={`bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-full flex flex-col ${isLocked ? 'opacity-80' : ''}`}>
                                    {/* Image Placeholder (Gradient) */}
                                    <div className={`relative h-44 bg-gradient-to-br ${getLevelColor(test.level)} flex items-center justify-center overflow-hidden`}>
                                        <div className="text-white text-7xl font-black opacity-20 select-none transform group-hover:scale-110 transition-transform duration-500">{test.level}</div>
                                        
                                        <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold uppercase flex items-center gap-1 border border-white/10">
                                            {test.isPremium ? <><Crown size={12} className="text-yellow-400"/> VIP</> : 'FREE'}
                                        </div>

                                        {/* Play Overlay */}
                                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                                                {isLocked ? <Lock className="text-slate-400" size={24}/> : <Play className="text-blue-600 fill-blue-600 ml-1" size={28}/>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="font-bold text-xl text-slate-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {test.title}
                                        </h3>
                                        
                                        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mt-auto pt-4 border-t border-slate-100">
                                            <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded"><Clock size={14}/> {test.duration} phút</span>
                                            <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded"><FileText size={14}/> {test._count?.questions || 0} câu</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                        <div className="inline-flex p-4 bg-slate-50 rounded-full mb-4 text-slate-300">
                            <LayoutGrid size={40} />
                        </div>
                        <p className="text-slate-500 font-medium">Chưa có đề thi nào cho cấp độ này.</p>
                    </div>
                )}
            </div>
        )}
      </div>
    );
  };

  // 2. RESULT VIEW (Style giống Reading)
  const renderResult = () => {
    if (!currentTest) return null;
    const isPassed = score >= 50; 

    return (
      <div className="max-w-5xl mx-auto w-full p-4 md:p-8 animate-in slide-in-from-bottom-8">
         <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            {/* Banner Kết quả */}
            <div className={`p-10 text-center text-white relative overflow-hidden ${isPassed ? 'bg-gradient-to-br from-emerald-500 to-green-600' : 'bg-gradient-to-br from-orange-500 to-red-600'}`}>
                <div className="relative z-10">
                    <h2 className="text-4xl font-black mb-2 tracking-tight drop-shadow-md">{isPassed ? 'XUẤT SẮC!' : 'CỐ GẮNG HƠN!'}</h2>
                    <p className="opacity-90 font-medium text-lg max-w-2xl mx-auto">{currentTest.title}</p>
                    
                    <div className="mt-8 inline-flex items-center gap-8 bg-black/10 px-8 py-4 rounded-2xl backdrop-blur-sm border border-white/10 shadow-inner">
                        <div className="text-center">
                            <div className="text-5xl font-black">{score}</div>
                            <div className="text-[10px] uppercase font-bold tracking-widest opacity-80 mt-1">Điểm số</div>
                        </div>
                        <div className="w-px h-12 bg-white/20"></div>
                        <div className="text-center">
                            <div className="text-5xl font-black">{Object.keys(answers).length}<span className="text-2xl opacity-60">/{currentTest.questions.length}</span></div>
                            <div className="text-[10px] uppercase font-bold tracking-widest opacity-80 mt-1">Đã làm</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chi tiết đáp án */}
            <div className="p-6 md:p-10 bg-slate-50">
               <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                   <h3 className="font-bold text-2xl text-slate-800 flex items-center gap-2">
                       <RotateCcw size={24} className="text-blue-600"/> Đáp án chi tiết
                   </h3>
                   <button onClick={handleReturnList} className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-800 shadow-sm transition-all">
                       Về danh sách
                   </button>
               </div>
               
               <div className="space-y-6">
                  {currentTest.questions.map((q, idx) => {
                     const userAnswer = answers[q.id];
                     const isCorrect = userAnswer === q.correctAnswer;
                     const isExpanded = expandedExplanation === q.id;
                     
                     return (
                        <div key={q.id} className={`bg-white p-6 rounded-2xl border shadow-sm transition-all ${isCorrect ? 'border-emerald-200' : 'border-red-200'}`}>
                           <div className="flex gap-5">
                              <span className={`flex items-center justify-center w-10 h-10 rounded-xl font-black text-lg shrink-0 ${isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                  {idx + 1}
                              </span>
                              <div className="flex-1">
                                 <p className="font-bold text-slate-800 mb-4 text-lg">{q.content}</p>
                                 
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {q.options.map((opt, oIdx) => {
                                       let style = 'bg-slate-50 border-slate-200 text-slate-500';
                                       let icon = null;

                                       if (oIdx === q.correctAnswer) {
                                           style = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold';
                                           icon = <CheckCircle size={18} className="text-emerald-600"/>;
                                       } else if (oIdx === userAnswer && !isCorrect) {
                                           style = 'bg-red-50 border-red-300 text-red-700 line-through opacity-80';
                                           icon = <XCircle size={18} className="text-red-600"/>;
                                       }

                                       return (
                                           <div key={oIdx} className={`px-4 py-3 rounded-xl border-2 flex items-center justify-between text-sm ${style}`}>
                                              <span className="flex items-center gap-3">
                                                  <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[10px] opacity-60">
                                                      {['A','B','C','D'][oIdx]}
                                                  </span>
                                                  {opt}
                                              </span>
                                              <div className="flex items-center gap-2">
                                                  {icon}
                                                  {oIdx === q.correctAnswer && q.explanation && (
                                                      <button onClick={() => setExpandedExplanation(isExpanded ? null : q.id)} className="text-shadow-amber-800 hover:bg-blue-100 p-1.5 rounded-full transition-colors" title="Giải thích">
                                                          <HelpCircle size={20}/>
                                                      </button>
                                                  )}
                                              </div>
                                           </div>
                                       )
                                    })}
                                 </div>

                                 {isExpanded && (
                                    <div className="mt-4 p-5 bg-sky-50 rounded-2xl border border-blue-100 text-slate-700 animate-in slide-in-from-top-2">
                                       <strong className="text-blue-700 flex items-center gap-2 mb-2 text-sm uppercase tracking-wider">
                                           <Sparkles size={16}/> Giải thích chi tiết
                                       </strong>
                                       <p className="leading-relaxed">{q.explanation}</p>
                                    </div>
                                 )}
                              </div>
                           </div>
                        </div>
                     )
                  })}
               </div>
            </div>
         </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {viewState !== 'taking' && <Navbar />}
      
      {/* Dynamic Content */}
      {viewState === 'list' && renderTestList()}
      
      {viewState === 'taking' && currentTest && (
        <TakingTest 
          test={currentTest}
          currentQIndex={currentQIndex} setCurrentQIndex={setCurrentQIndex}
          answers={answers} setAnswers={setAnswers}
          timeLeft={timeLeft} isPaused={isPaused} 
          togglePause={handleTogglePause}
          onSubmit={() => { if(confirm("Nộp bài ngay?")) handleSubmitTest(); }} 
          onExit={handleExit}
        />
      )}
      
      {viewState === 'result' && renderResult()}
    </div>
  );
}