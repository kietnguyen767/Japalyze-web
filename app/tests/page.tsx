'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { 
  Clock, FileText, Lock, Crown, Play, LayoutGrid, 
  Loader2, FileQuestion, History, ArrowRight 
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
  imageUrl?: string;
  audioUrl?: string;
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
  { id: 'N5', label: 'N5', color: 'bg-green-500' },    
  { id: 'N4', label: 'N4', color: 'bg-purple-500' },      
  { id: 'N3', label: 'N3', color: 'bg-blue-600' },    
  { id: 'N2', label: 'N2', color: 'bg-orange-500' },  
  { id: 'N1', label: 'N1', color: 'bg-red-500' },      
];

export default function TestsPage() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState('N5');
  const [viewState, setViewState] = useState<'list' | 'taking'>('list');
  const [loading, setLoading] = useState(true);
  const [testList, setTestList] = useState<MockTest[]>([]);
  const [currentTest, setCurrentTest] = useState<MockTest | null>(null);
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
          if (prev <= 1) { submitToApi(fullTest.id, {}); return 0; }
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

  const submitToApi = async (testId: string, userAnswers: any) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSubmitting(true);
    try {
        const res = await fetch('/api/tests/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ testId: testId, answers: userAnswers }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
            router.push(`/tests/result/${data.resultId}`);
        } else {
            alert('Lỗi nộp bài: ' + (data.error || 'Vui lòng thử lại'));
            setIsSubmitting(false);
        }
    } catch (error) {
        alert('Lỗi kết nối. Vui lòng kiểm tra mạng.');
        setIsSubmitting(false);
    }
  };

  const handleSubmitTest = () => {
    if (!currentTest) return;
    submitToApi(currentTest.id, answers);
  };

  const handleExit = () => {
    if (confirm("Thoát bài thi? Kết quả sẽ không được lưu.")) {
        if (timerRef.current) clearInterval(timerRef.current);
        setViewState('list'); setCurrentTest(null); setAnswers({});
    }
  };

  // --- RENDERERS ---
  const renderTestList = () => {
    const filteredTests = testList.filter(t => t.level === activeTab);

    return (
      <div className="max-w-7xl mx-auto w-full px-4 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8 border-b border-slate-200 pb-6">
            <div>
                <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 tracking-tight">Thư viện đề thi JLPT</h1>
                <p className="text-slate-500 text-lg">Kho đề thi chuẩn từ N5 đến N1. Tự tin chinh phục kỳ thi thật.</p>
            </div>

            <Link 
                href="/tests/history" 
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all active:scale-95 shrink-0"
            >
                <History size={18} />
                Lịch sử thi
            </Link>
        </div>

        {/* Level Tabs */}
        <div className="mb-8">
            <div className="flex flex-wrap gap-2">
                {LEVELS.map((lvl) => {
                    const isActive = activeTab === lvl.id;
                    return (
                        <button
                            key={lvl.id}
                            onClick={() => setActiveTab(lvl.id)}
                            className={`
                                flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all border
                                ${isActive 
                                    ? 'bg-slate-800 text-white border-slate-800 shadow-md' 
                                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                            `}
                        >
                            <span className={`w-2.5 h-2.5 rounded-full ${lvl.color} ${isActive ? 'ring-2 ring-white/30' : ''}`}></span>
                            {lvl.label}
                        </button>
                    )
                })}
            </div>
        </div>

        {/* Test Grid */}
        {loading ? (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTests.length > 0 ? (
                    filteredTests.map((test) => {
                        const isLocked = test.isPremium && !user?.isPremium;
                        // Tìm màu tương ứng với Level của bài thi để hiển thị badge
                        const levelInfo = LEVELS.find(l => l.id === test.level) || LEVELS[0];

                        return (
                            <div key={test.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition-all group flex flex-col h-full relative overflow-hidden">
                                {/* Top Badges */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2">
                                        {/* Badge Level: Sử dụng màu từ levelInfo */}
                                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-black text-white ${levelInfo.color}`}>
                                            {test.level}
                                        </span>
                                    </div>
                                    {test.isPremium ? (
                                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-wider border border-amber-200">
                                            <Crown size={12} fill="currentColor" /> VIP
                                        </div>
                                    ) : (
                                        <div className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider border border-blue-100">
                                            FREE
                                        </div>
                                    )}
                                </div>

                                {/* Title & Desc */}
                                <div className="mb-6 flex-1">
                                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {test.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                                        <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                            <Clock size={14} className="text-slate-400"/> {test.duration} phút
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                            <FileText size={14} className="text-slate-400"/> {test._count?.questions || 0} câu
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button 
                                    onClick={() => handleStartTest(test.id, test.isPremium)}
                                    disabled={isLocked}
                                    className={`
                                        w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm
                                        ${isLocked 
                                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
                                            : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200 hover:shadow-lg active:scale-[0.98]'}
                                    `}
                                >
                                    {isLocked ? (
                                        <><Lock size={16}/> Mở khóa VIP</>
                                    ) : (
                                        <><span className="text-sm">Bắt đầu thi</span> <ArrowRight size={18}/></>
                                    )}
                                </button>
                            </div>
                        )
                    })
                ) : (
                    <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {viewState !== 'taking' && <Navbar />} 
      
      {isSubmitting && (
        <div className="fixed inset-0 z-[110] bg-white/90 backdrop-blur-sm flex items-center justify-center flex-col gap-4">
            <Loader2 className="animate-spin text-blue-600" size={50}/>
            <p className="text-slate-600 font-bold text-lg animate-pulse">Đang chấm điểm...</p>
        </div>
      )}

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
    </div>
  );
}