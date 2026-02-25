'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    BookOpenText, Search, Signal, Play, Clock, Mic, Star,
    GraduationCap, Loader2, ArrowLeft, Eye, EyeOff,
    Volume2, VolumeX, Square, RotateCcw, CheckCircle2,
    AlertCircle, Award, Gauge, Languages, ChevronLeft, ArrowRight
} from 'lucide-react';

// --- HELPERS & COMPONENTS ---

// Helper: Lấy text thuần (bỏ Furigana) cho TTS và So sánh
const getRawText = (text: string) => text.replace(/\[.*?\]/g, '');

// Component: Hiển thị Furigana
const FuriganaText = ({ text, showFurigana }: { text: string, showFurigana: boolean }) => {
    const parts = text.split(/([^\[\s\u3000-\u303f\uff00-\uffef]+\[[^\]]+\])/g);
    return (
        <div className="leading-[3.5rem] text-xl md:text-2xl text-justify break-words whitespace-pre-wrap font-medium font-serif text-slate-700">
            {parts.map((part, index) => {
                const match = part.match(/^(.+?)\[(.+?)\]$/);
                if (match) {
                    return (
                        <ruby key={index} className="mx-[2px]">
                            {match[1]}
                            <rt className={`text-[0.6em] text-blue-600 font-normal select-none text-center transition-all duration-300 ${showFurigana ? 'opacity-100' : 'text-transparent select-none'}`}>
                                {match[2]}
                            </rt>
                        </ruby>
                    );
                }
                return <span key={index}>{part}</span>;
            })}
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---

export default function ReadingPage() {
    const router = useRouter();

    // Read URL search params on client-side to avoid prerender/SSR issues
    const [modeParam, setModeParam] = useState<string | null>(null);
    const [questId, setQuestId] = useState<string | null>(null);
    const isChallengeMode = modeParam === 'challenge';

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const sp = new URLSearchParams(window.location.search);
        setModeParam(sp.get('mode'));
        setQuestId(sp.get('questId'));
    }, []);

    // --- STATE CHO LIST VIEW (Code cũ) ---
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLevel, setSelectedLevel] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // --- STATE CHO CHALLENGE MODE (Code UI mới) ---
    const [challengeArticles, setChallengeArticles] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [streak, setStreak] = useState(0);
    const [showFurigana, setShowFurigana] = useState(true);
    const [showTranslation, setShowTranslation] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [score, setScore] = useState<number | null>(null);
    const [transcript, setTranscript] = useState('');
    const [audioBars, setAudioBars] = useState<number[]>(new Array(20).fill(10));
    const [readingSpeed, setReadingSpeed] = useState(0.8);
    const [submitting, setSubmitting] = useState(false);

    const recognitionRef = useRef<any>(null);
    const LEVELS = [{ id: 'all', label: 'Tất cả' }, { id: 'beginner', label: 'Beginner' }, { id: 'n5', label: 'N5' }, { id: 'n4', label: 'N4' }, { id: 'n3', label: 'N3' }, { id: 'n2', label: 'N2' }, { id: 'n1', label: 'N1' }];

    // 1. FETCH DATA
    useEffect(() => {
        if (isChallengeMode) {
            // Mode Thử thách: Lấy bài Random
            fetch('/api/reading/random')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setChallengeArticles(data);
                    setLoading(false);
                });
        } else {
            // Mode Thường: Lấy danh sách
            fetch('/api/reading')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setArticles(data);
                    setLoading(false);
                });
        }
    }, [isChallengeMode]);

    // 2. SETUP SPEECH RECOGNITION (CHALLENGE MODE)
    useEffect(() => {
        if (isChallengeMode && typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.lang = 'ja-JP';
                recognition.continuous = false;
                recognition.interimResults = false;

                recognition.onstart = () => setIsRecording(true);
                recognition.onend = () => setIsRecording(false);
                recognition.onerror = () => setIsRecording(false);

                recognition.onresult = (event: any) => {
                    const text = event.results[0][0].transcript;
                    setTranscript(text);
                    calculateScore(text);
                };
                recognitionRef.current = recognition;
            }
        }
    }, [isChallengeMode, currentIndex, challengeArticles]);

    // 3. ANIMATION SÓNG ÂM
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRecording || isSpeaking) {
            interval = setInterval(() => setAudioBars(prev => prev.map(() => Math.random() * 40 + 10)), 100);
        } else {
            setAudioBars(new Array(20).fill(10));
        }
        return () => clearInterval(interval);
    }, [isRecording, isSpeaking]);

    // --- LOGIC CHALLENGE ---
    const calculateScore = (speech: string) => {
        const current = challengeArticles[currentIndex];
        if (!current) return;

        // Chuẩn hóa text để so sánh
        const cleanTarget = getRawText(current.content).replace(/[.,、。！？\s]/g, '');
        const cleanInput = speech.replace(/[.,、。！？\s]/g, '');

        let matchCount = 0;
        for (const char of cleanInput) {
            if (cleanTarget.includes(char)) matchCount++;
        }

        let finalScore = 0;
        if (cleanTarget.length > 0) {
            finalScore = Math.min(100, Math.round((matchCount / cleanTarget.length) * 100));
        }
        // Phạt nếu nói quá ngắn
        if (cleanInput.length < cleanTarget.length * 0.4) finalScore = Math.floor(finalScore / 2);

        setScore(finalScore);

        // Logic Streak
        if (finalScore >= 70) setStreak(s => s + 1);
        else setStreak(0);
    };

    const nextChallenge = () => {
        setScore(null);
        setTranscript('');
        setShowTranslation(false);
        setCurrentIndex(prev => (prev + 1) % challengeArticles.length);
    };

    const finishQuest = async () => {
        setSubmitting(true);
        try {
            if (questId) {
                await fetch('/api/user/complete-quest', {
                    method: 'POST',
                    body: JSON.stringify({ questId })
                });
            }
            router.push('/roadmap/n5');
        } catch (e) { setSubmitting(false); }
    };

    // --- CÁC HÀM TIỆN ÍCH (TTS, Mic...) ---
    const handleSpeakToggle = () => {
        const text = getRawText(challengeArticles[currentIndex]?.content || '');
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP';
            utterance.rate = readingSpeed;
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    };

    const handleRecordToggle = () => {
        if (!recognitionRef.current) return alert("Trình duyệt không hỗ trợ Mic");
        if (isRecording) recognitionRef.current.stop();
        else {
            setScore(null);
            recognitionRef.current.start();
        }
    };

    const cycleSpeed = () => {
        setReadingSpeed(prev => (prev === 1.0 ? 0.75 : prev === 0.75 ? 0.5 : 1.0));
        if (isSpeaking) { window.speechSynthesis.cancel(); setIsSpeaking(false); }
    };

    // =========================================================================================
    // VIEW 1: CHALLENGE MODE (Giao diện UI đẹp lấy từ trang Detail)
    // =========================================================================================
    if (isChallengeMode) {
        if (loading || challengeArticles.length === 0) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

        const article = challengeArticles[currentIndex];
        const isQuestDone = streak >= 2;

        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">

                <div className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-8 flex flex-col">
                    {/* Header Challenge */}
                    <div className="flex items-center justify-between mb-6 sticky top-20 z-20 bg-slate-50/95 backdrop-blur-sm py-3 px-1 rounded-xl">
                        <Link href="/roadmap/n5" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm">
                            <ArrowLeft size={18} /> Thoát thử thách
                        </Link>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setShowFurigana(!showFurigana)} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${showFurigana ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-white text-slate-500 border-slate-200'}`}>
                                {showFurigana ? <Eye size={14} /> : <EyeOff size={14} />} Furigana
                            </button>
                            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase ${isQuestDone ? 'bg-green-100 text-green-700 border-green-200 animate-pulse' : 'bg-white text-orange-500 border-orange-200'}`}>
                                🔥 Chuỗi thắng: {streak}/2
                            </div>
                        </div>
                    </div>

                    {isQuestDone ? (
                        // MÀN HÌNH HOÀN THÀNH
                        <div className="bg-white p-12 rounded-[2.5rem] shadow-xl text-center border border-green-100 flex flex-col items-center justify-center flex-1 animate-in zoom-in">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                <CheckCircle2 size={48} className="text-green-600" />
                            </div>
                            <h1 className="text-3xl font-black text-slate-800 mb-2">Thử thách hoàn thành! 🎉</h1>
                            <p className="text-slate-500 mb-8 max-w-md">Bạn đã đọc trôi chảy 2 bài liên tiếp. Kỹ năng đọc của bạn đang tiến bộ rất nhanh.</p>
                            <button onClick={finishQuest} disabled={submitting} className="px-10 py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 shadow-xl shadow-green-200 hover:-translate-y-1 transition-all flex items-center gap-2">
                                {submitting ? <Loader2 className="animate-spin" /> : 'Nhận điểm & Quay về Map'}
                            </button>
                        </div>
                    ) : (
                        // GIAO DIỆN BÀI ĐỌC (UI ĐẸP)
                        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex-1 flex flex-col relative">
                            {/* Title Bar */}
                            <div className="bg-slate-900 text-white p-8 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900 opacity-90"></div>
                                <div className="relative z-10">
                                    <span className="inline-block px-3 py-1 rounded-lg bg-white/10 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-blue-200 mb-2 border border-white/10">Nhiệm vụ đọc</span>
                                    <h1 className="text-2xl font-black leading-tight">{article.title}</h1>
                                </div>
                            </div>

                            {/* Reading Content */}
                            <div className="p-6 md:p-10 flex-1 flex flex-col items-center">
                                <FuriganaText text={article.content} showFurigana={showFurigana} />

                                {/* Visualizer */}
                                <div className="h-8 flex items-center justify-center gap-1 mt-8 mb-4">
                                    {audioBars.map((h, i) => (
                                        <div key={i} className={`w-1 rounded-full transition-all duration-100 ${isRecording ? 'bg-red-500' : isSpeaking ? 'bg-blue-500' : 'bg-slate-200'}`} style={{ height: `${h}px` }}></div>
                                    ))}
                                </div>

                                {/* Feedback Area */}
                                {score !== null && (
                                    <div className={`w-full p-4 rounded-xl border mb-6 flex items-center gap-4 animate-in slide-in-from-bottom-2 ${score >= 70 ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'}`}>
                                        <div className={`text-2xl font-black ${score >= 70 ? 'text-green-600' : 'text-orange-500'}`}>{score}%</div>
                                        <div className="text-sm text-slate-600">
                                            <span className="block font-bold">{score >= 70 ? 'Chính xác!' : 'Cần cố gắng hơn'}</span>
                                            AI nghe: &quot;{transcript}&quot;
                                        </div>
                                    </div>
                                )}

                                {/* Controls */}
                                <div className="flex items-center gap-6 mt-auto pt-4">
                                    <button onClick={cycleSpeed} className="flex flex-col items-center gap-1 group">
                                        <div className="p-3 rounded-full border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-400 transition-all">
                                            <Gauge size={20} />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400">{readingSpeed}x</span>
                                    </button>

                                    <button onClick={handleSpeakToggle} className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 ${isSpeaking ? 'bg-blue-100 border-blue-400 text-blue-600' : 'bg-white border-slate-100 text-slate-400 hover:text-blue-500'}`}>
                                        {isSpeaking ? <VolumeX size={24} /> : <Volume2 size={24} />}
                                    </button>

                                    <button onClick={handleRecordToggle} className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-105 active:scale-95 border-4 ${isRecording ? 'bg-white border-red-500 text-red-500 animate-pulse' : 'bg-gradient-to-br from-blue-600 to-indigo-600 border-white ring-4 ring-blue-50 text-white'}`}>
                                        {isRecording ? <Square size={32} fill="currentColor" /> : <Mic size={32} />}
                                    </button>

                                    <button onClick={() => { setScore(null); setTranscript(''); }} className="flex flex-col items-center gap-1 group">
                                        <div className="p-3 rounded-full border border-slate-200 hover:border-slate-400 text-slate-400 transition-all">
                                            <RotateCcw size={20} />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400">Reset</span>
                                    </button>
                                </div>

                                {/* Nút Next (Chỉ hiện khi có điểm) */}
                                {score !== null && (
                                    <button onClick={nextChallenge} className="mt-8 w-full py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 flex items-center justify-center gap-2">
                                        {score >= 70 ? 'Bài tiếp theo' : 'Bỏ qua bài này'} <ArrowRight size={16} />
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }


    const filteredArticles = articles.filter(article => {
        const matchLevel = selectedLevel === 'all' || article.level === selectedLevel;
        const matchSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchLevel && matchSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <div className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-black text-slate-800 flex items-center gap-3">
                            <BookOpenText className="text-blue-600" size={40} /> Thư viện Luyện đọc
                        </h1>
                        <p className="text-slate-500 text-lg">Cải thiện phát âm và ngữ điệu qua các bài đọc.</p>
                    </div>
                    <div className="relative w-full md:w-96">
                        <input type="text" placeholder="Tìm kiếm..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    </div>
                </div>

                {/* FILTER TABS */}
                <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-slate-200">
                    {LEVELS.map((lvl) => (
                        <button key={lvl.id} onClick={() => setSelectedLevel(lvl.id)} className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${selectedLevel === lvl.id ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
                            {lvl.label}
                        </button>
                    ))}
                </div>

                {/* ARTICLES GRID */}
                {loading ? (
                    <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>
                ) : filteredArticles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredArticles.map((item) => (
                            <Link href={`/reading/${item.id}`} key={item.id} className="group">
                                <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-full flex flex-col">
                                    <div className="relative h-48 bg-slate-200 flex items-center justify-center overflow-hidden">
                                        {item.image ? <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> : <BookOpenText size={40} className="text-slate-400" />}
                                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold uppercase flex items-center gap-1">
                                            <Signal size={12} /> {item.level}
                                        </div>
                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"><Play className="text-blue-600 fill-blue-600 ml-1" size={24} /></div></div>
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <h3 className="font-bold text-xl text-slate-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                                        <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">{item.excerpt}</p>
                                        <div className="flex items-center justify-between text-xs text-slate-400 font-medium pt-4 border-t border-slate-100">
                                            <span className="flex items-center gap-1"><Clock size={14} /> {new Date(item.createdAt).toLocaleDateString('vi-VN')}</span>
                                            <span className="flex items-center gap-1 text-orange-400"><Star size={14} fill="currentColor" /> Mới</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                        <div className="inline-flex p-4 bg-slate-50 rounded-full mb-4 text-slate-300"><GraduationCap size={40} /></div>
                        <h3 className="text-lg font-bold text-slate-700">Chưa có bài đọc nào</h3>
                        <p className="text-slate-500">Hãy chờ Admin cập nhật thêm nhé!</p>
                    </div>
                )}
            </div>
        </div>
    );
}