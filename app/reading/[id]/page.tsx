//app/reading/[id]/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Mic, Square, RotateCcw, ChevronLeft,
    Volume2, CheckCircle2, AlertCircle, Award, Loader2,
    Eye, EyeOff, Languages, VolumeX, Gauge
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';


type ArticleDetail = {
    id: string;
    title: string;
    content: string;
    contentRomaji?: string;
    contentMeaning?: string;
    level: string;
};

// Hàm loại bỏ Furigana để lấy text thuần
const getRawText = (text: string) => {
    return text.replace(/\[.*?\]/g, '');
};

// --- COMPONENT FURIGANA ---
const FuriganaText = ({ text, showFurigana }: { text: string, showFurigana: boolean }) => {
    const parts = text.split(/([^\[\s\u3000-\u303f\uff00-\uffef]+\[[^\]]+\])/g);

    return (
        <div className="leading-[3.5rem] text-lg md:text-xl text-justify break-words whitespace-pre-wrap font-medium">
            {parts.map((part, index) => {
                const match = part.match(/^(.+?)\[(.+?)\]$/);
                if (match) {
                    return (
                        <ruby key={index} className="mx-[2px]">
                            {match[1]}
                            <rt className={`
                                text-[0.6em] text-blue-600 font-normal select-none text-center
                                transition-all duration-300
                                ${showFurigana ? 'opacity-100' : 'text-transparent select-none'} 
                            `}>
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

export default function ReadingPracticePage() {
    const { user, loading: authLoading } = useAuth();
    const params = useParams();
    const router = useRouter();

    const { data: article = null, isLoading: loading } = useQuery<ArticleDetail | null>({
        queryKey: ['reading-article', params?.id],
        queryFn: async () => {
            const res = await fetch(`/api/reading/${params?.id}`);
            if (!res.ok) throw new Error('ERR');
            return res.json();
        },
        enabled: !!params?.id && !!user,
        staleTime: 10 * 60 * 1000,
    });


    // States hiển thị
    const [showFurigana, setShowFurigana] = useState(true);
    const [showTranslation, setShowTranslation] = useState(false);

    // States chức năng - Mic & AI
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    // State: AI Result
    const [result, setResult] = useState<{ score: number; feedback: string; details?: string } | null>(null);
    const [isProcessing, setIsProcessing] = useState(false); // Loading khi AI chấm điểm

    // State: Real-time Transcription
    const [transcribedText, setTranscribedText] = useState("");
    const startTimeRef = useRef<number>(0);

    const [audioBars, setAudioBars] = useState<number[]>(new Array(20).fill(10));

    // State TỐC ĐỘ ĐỌC (Mặc định 0.8 cho dễ nghe)
    const [readingSpeed, setReadingSpeed] = useState(0.8);

    const recognitionRef = useRef<any>(null);

    // React Query handles article fetching


    // Handle Redirect if not logged in
    useEffect(() => {
        if (!authLoading && !user) {
            const currentPath = window.location.pathname;
            router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
        }
    }, [authLoading, user, router]);

    // 2. Setup Speech Recognition
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.lang = 'ja-JP';
                recognition.continuous = true;
                recognition.interimResults = true; // Cho phép nhận diện thời gian thực

                recognition.onresult = (event: any) => {
                    let interimTranscript = '';
                    let finalTranscript = '';

                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            finalTranscript += event.results[i][0].transcript;
                        } else {
                            interimTranscript += event.results[i][0].transcript;
                        }
                    }
                    // Cập nhật text hiển thị ngay lập tức
                    setTranscribedText(prev => {
                        // Nếu là bản final thì nối vào, ngược lại hiển thị interim
                        // Ở đây đơn giản hóa: Hiển thị full text tích lũy
                        // Tuy nhiên với continuous=true, ta cần cẩn thận để tránh lặp.
                        // Cách tốt nhất là render lại toàn bộ transcript từ đầu phiên record.
                        // SpeechRecognition API lưu trữ toàn bộ session trong event.results nếu continuous=true
                        let fullText = "";
                        for (let i = 0; i < event.results.length; i++) {
                            fullText += event.results[i][0].transcript;
                        }
                        return fullText;
                    });
                };

                recognition.onerror = (event: any) => {
                    console.error("Speech recognition error", event.error);
                    if (event.error === 'not-allowed') {
                        alert("Vui lòng cấp quyền Micro để sử dụng tính năng này.");
                    }
                    setIsRecording(false);
                    setIsProcessing(false);
                };

                recognitionRef.current = recognition;
            }
        }
    }, []);

    // 3. Animation Sóng âm
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRecording || isSpeaking) {
            interval = setInterval(() => {
                setAudioBars(prev => prev.map(() => Math.random() * 40 + 10));
            }, 100);
        } else {
            setAudioBars(new Array(20).fill(10));
        }
        return () => clearInterval(interval);
    }, [isRecording, isSpeaking]);

    // --- HÀM ĐỔI TỐC ĐỘ ---
    const cycleSpeed = () => {
        setReadingSpeed(prev => {
            if (prev === 1.0) return 0.75;
            if (prev === 0.75) return 0.5;
            return 1.0;
        });
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    // --- LOA (TTS) ---
    const handleSpeakToggle = () => {
        if (!article) return;

        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            window.speechSynthesis.cancel();
            const rawText = getRawText(article.content);
            const utterance = new SpeechSynthesisUtterance(rawText);
            utterance.lang = 'ja-JP';
            utterance.rate = readingSpeed;
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    };

    // --- MICRO (STT) & AI SCORING ---
    const handleRecordToggle = async () => {
        if (!recognitionRef.current) {
            alert("Trình duyệt không hỗ trợ thu âm.");
            return;
        }

        if (isRecording) {
            // --- DỪNG GHI ÂM & CHẤM ĐIỂM ---
            recognitionRef.current.stop();
            setIsRecording(false);
            setIsProcessing(true); // Bắt đầu loading chấm điểm

            const endTime = Date.now();
            const duration = endTime - startTimeRef.current;

            // Gọi API chấm điểm
            try {
                const rawOriginalText = getRawText(article?.content || "");

                // Đợi một chút để state transcribe được cập nhật final (do async của onresult)
                // Tuy nhiên transcribeText state đã đc cập nhật liên tục.
                // Gửi request ngay.

                const res = await fetch('/api/reading/evaluate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        transcribedText: transcribedText, // Text đã nhận diện
                        originalText: rawOriginalText,
                        durationMs: duration
                    })
                });

                if (!res.ok) throw new Error("Lỗi khi chấm điểm");

                const data = await res.json();
                setResult(data);

            } catch (error) {
                console.error(error);
                alert("Có lỗi xảy ra khi chấm điểm AI.");
            } finally {
                setIsProcessing(false);
            }

        } else {
            // --- BẮT ĐẦU GHI ÂM ---
            setResult(null);
            setTranscribedText(""); // Reset text cũ
            startTimeRef.current = Date.now(); // Ghi nhận thời gian bắt đầu

            if (isSpeaking) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
            }
            try {
                recognitionRef.current.start();
                setIsRecording(true);
            } catch (e) {
                console.error("Mic error:", e);
                setIsRecording(false);
            }
        }
    };

    if (authLoading || loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;
    if (!user) return null; // Wait for redirect

    if (!article) return <div className="h-screen flex items-center justify-center text-slate-500">Bài đọc không tồn tại.</div>;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">

            <div className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-8 flex flex-col">

                {/* Navigation Header */}
                <div className="flex items-center justify-between mb-6 sticky top-20 z-20 bg-slate-50/95 backdrop-blur-sm py-3 px-1 rounded-xl">
                    <Link href="/reading" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium">
                        <ChevronLeft size={20} /> Quay lại
                    </Link>

                    <button
                        onClick={() => setShowFurigana(!showFurigana)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-bold border transition-all shadow-sm active:scale-95 ${showFurigana ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-white text-slate-500 border-slate-200'}`}
                    >
                        {showFurigana ? <Eye size={16} /> : <EyeOff size={16} />}
                        {showFurigana ? 'Furigana: BẬT' : 'Furigana: TẮT'}
                    </button>
                </div>

                {/* MAIN CONTENT CARD */}
                <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex-1 flex flex-col relative">

                    {/* Header */}
                    <div className="bg-slate-900 text-white p-8 md:p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50"></div>
                        <div className="relative z-10">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold mb-4 border border-white/20 uppercase tracking-wider text-blue-200 shadow-lg">
                                Level {article.level}
                            </span>
                            <h1 className="text-2xl md:text-4xl font-black leading-tight drop-shadow-md">
                                {article.title}
                            </h1>
                        </div>
                    </div>

                    {/* Reading Area */}
                    <div className="p-6 md:p-12 flex-1 flex flex-col items-center">

                        {/* Text */}
                        <div className="w-full max-w-3xl font-serif text-slate-800">
                            <FuriganaText text={article.content} showFurigana={showFurigana} />
                        </div>

                        {/* Visualizer */}
                        <div className="h-12 flex items-center justify-center gap-1.5 mt-12 mb-6 w-full max-w-xs">
                            {audioBars.map((h, i) => (
                                <div
                                    key={i}
                                    className={`w-1.5 rounded-full transition-all duration-100 
                        ${isRecording ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
                                            isSpeaking ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-slate-200'}`}
                                    style={{ height: `${h}px` }}
                                ></div>
                            ))}
                        </div>

                        {/* LIVE TRANSCRIPT (New Feature) */}
                        {isRecording && (
                            <div className="w-full max-w-2xl mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl animate-in fade-in slide-in-from-bottom-2">
                                <p className="text-xs text-slate-400 font-bold uppercase mb-2">Đang nhận diện:</p>
                                <p className="text-lg text-slate-700 font-medium whitespace-pre-wrap min-h-[3rem]">
                                    {transcribedText || <span className="text-slate-300 italic">Hãy bắt đầu đọc...</span>}
                                </p>
                            </div>
                        )}

                        {/* Translation Toggle */}
                        <div className="w-full mt-8 border-t border-slate-100 pt-8">
                            <button
                                onClick={() => setShowTranslation(!showTranslation)}
                                className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all group border border-slate-100 hover:border-blue-200"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-white rounded-xl text-blue-600 shadow-sm group-hover:scale-110 transition-transform"><Languages size={22} /></div>
                                    <div className="text-left">
                                        <span className="block font-bold text-slate-700">Xem Romaji & Dịch nghĩa</span>
                                        <span className="text-xs text-slate-400 font-medium">Nhấn để mở rộng</span>
                                    </div>
                                </div>
                                <ChevronLeft size={20} className={`text-slate-400 transition-transform duration-300 ${showTranslation ? '-rotate-90 text-blue-500' : 'rotate-0'}`} />
                            </button>

                            {showTranslation && (
                                <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                                    {article.contentRomaji && (
                                        <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-100 relative group">
                                            <div className="absolute left-0 top-6 w-1 h-8 bg-orange-400 rounded-r-full"></div>
                                            <h4 className="text-xs font-black text-orange-600 uppercase mb-3 ml-2 tracking-widest">Romaji</h4>
                                            <p className="text-slate-700 leading-relaxed font-mono text-sm pl-2 whitespace-pre-wrap">{article.contentRomaji}</p>
                                        </div>
                                    )}
                                    {article.contentMeaning && (
                                        <div className="p-5 rounded-2xl bg-green-50/50 border border-green-100 relative group">
                                            <div className="absolute left-0 top-6 w-1 h-8 bg-green-500 rounded-r-full"></div>
                                            <h4 className="text-xs font-black text-green-600 uppercase mb-3 ml-2 tracking-widest">Dịch nghĩa</h4>
                                            <p className="text-slate-700 leading-relaxed pl-2 font-medium whitespace-pre-wrap">{article.contentMeaning}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                    </div>

                    {/* FOOTER CONTROLS */}
                    <div className="p-6 bg-slate-50/80 backdrop-blur-sm border-t border-slate-200 flex flex-col items-center gap-6 sticky bottom-0 z-30">

                        {/* Result Feedback */}
                        {result && !isRecording && !isProcessing && (
                            <div className="w-full max-w-lg bg-white p-6 rounded-2xl border border-blue-100 shadow-xl flex flex-col gap-4 animate-in slide-in-from-bottom-5">
                                <div className="flex items-center gap-4">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-md ${result.score >= 80 ? 'bg-green-500' : result.score >= 50 ? 'bg-orange-500' : 'bg-red-500'}`}>
                                        {result.score}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-1">
                                            {result.score >= 80 ? <CheckCircle2 size={20} className="text-green-500" /> : <AlertCircle size={20} className="text-orange-500" />}
                                            Đánh giá AI
                                        </h4>
                                        <p className="text-sm text-slate-600 font-medium leading-tight">{result.feedback}</p>
                                    </div>
                                </div>
                                {/* Transcription Review */}
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">Bạn đã đọc:</p>
                                    <p className="text-sm text-slate-700 italic">"{transcribedText}"</p>
                                </div>
                                {/* Details if any */}
                                {result.details && (
                                    <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
                                        <strong>Chi tiết lỗi:</strong> {result.details}
                                    </div>
                                )}
                            </div>
                        )}

                        {isProcessing && (
                            <div className="text-blue-600 font-bold animate-pulse flex items-center gap-3 bg-blue-50 px-6 py-3 rounded-full border border-blue-100 shadow-sm">
                                <Award size={24} className="animate-spin" /> AI đang chấm điểm...
                            </div>
                        )}

                        {/* MAIN BUTTONS */}
                        <div className="flex items-center gap-6 md:gap-8">

                            {/* 1. NÚT CHỈNH TỐC ĐỘ */}
                            <button
                                onClick={cycleSpeed}
                                className="flex flex-col items-center gap-1 group"
                                title="Chỉnh tốc độ đọc"
                            >
                                <div className="p-4 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-all active:scale-95 group-hover:shadow-md">
                                    <Gauge size={24} />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-600">{readingSpeed}x</span>
                            </button>

                            {/* 2. NÚT LOA (TTS) */}
                            <button
                                onClick={handleSpeakToggle}
                                className={`
                        w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-105 active:scale-95 border-4
                        ${isSpeaking
                                        ? 'bg-blue-100 border-blue-400 text-blue-600 animate-pulse'
                                        : 'bg-white border-slate-100 text-slate-400 hover:text-blue-500'
                                    }
                    `}
                                title={isSpeaking ? "Dừng đọc" : "Nghe mẫu"}
                            >
                                {isSpeaking ? <VolumeX size={32} /> : <Volume2 size={32} />}
                            </button>

                            {/* 3. NÚT MICRO (STT) */}
                            <button
                                onClick={handleRecordToggle}
                                className={`
                        w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-105 active:scale-95 border-4
                        ${isRecording
                                        ? 'bg-white border-red-500 text-red-500 animate-pulse'
                                        : 'bg-gradient-to-br from-blue-600 to-indigo-600 border-white ring-4 ring-blue-100 text-white'
                                    }
                    `}
                            >
                                {isRecording ? <Square size={40} fill="currentColor" /> : <Mic size={40} />}
                            </button>

                            {/* 4. NÚT RESET */}
                            <button
                                onClick={() => {
                                    setResult(null);
                                    setIsRecording(false);
                                    setIsSpeaking(false);
                                    setTranscribedText("");
                                    window.speechSynthesis.cancel();
                                }}
                                className="flex flex-col items-center gap-1 group"
                                title="Làm lại"
                            >
                                <div className="p-4 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 shadow-sm transition-all active:scale-95 group-hover:shadow-md">
                                    <RotateCcw size={24} />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600">Reset</span>
                            </button>
                        </div>

                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">
                            {isRecording ? 'Đang ghi âm...' : (isSpeaking ? `Đang đọc (${readingSpeed}x)...` : 'Nhấn Micro để luyện đọc')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
