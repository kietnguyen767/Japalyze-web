'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    CheckCircle2, XCircle, Timer, AlertCircle,
    Keyboard, MousePointer2, Award, ArrowRight, ArrowLeft, Clock,
    Trophy, RefreshCw, Loader2
} from 'lucide-react';

// --- DỮ LIỆU TỪ VỰNG ---
const VOCAB_DATA = [
    { kana: 'わたし', romaji: 'watashi', meaning: 'Tôi' },
    { kana: 'せんせい', romaji: 'sensei', meaning: 'Giáo viên' },
    { kana: 'がくせい', romaji: 'gakusei', meaning: 'Học sinh' },
    { kana: 'おはよう', romaji: 'ohayou', meaning: 'Chào buổi sáng' },
    { kana: 'ありがとう', romaji: 'arigatou', meaning: 'Cảm ơn' },
    { kana: 'さようなら', romaji: 'sayounara', meaning: 'Tạm biệt' },
    { kana: 'すみません', romaji: 'sumimasen', meaning: 'Xin lỗi' },
    { kana: 'ねこ', romaji: 'neko', meaning: 'Con mèo' },
    { kana: 'いぬ', romaji: 'inu', meaning: 'Con chó' },
    { kana: 'さくら', romaji: 'sakura', meaning: 'Hoa anh đào' },
    { kana: 'やま', romaji: 'yama', meaning: 'Núi' },
    { kana: 'かわ', romaji: 'kawa', meaning: 'Sông' },
    { kana: 'カメラ', romaji: 'kamera', meaning: 'Máy ảnh' },
    { kana: 'テレビ', romaji: 'terebi', meaning: 'Tivi' },
    { kana: 'ホテル', romaji: 'hoteru', meaning: 'Khách sạn' },
    { kana: 'レストラン', romaji: 'resutoran', meaning: 'Nhà hàng' },
    { kana: 'バス', romaji: 'basu', meaning: 'Xe buýt' },
    { kana: 'トイレ', romaji: 'toire', meaning: 'Nhà vệ sinh' },
    { kana: 'コーヒー', romaji: 'koohii', meaning: 'Cà phê' },
    { kana: 'スーパー', romaji: 'suupaa', meaning: 'Siêu thị' }
];

type QuestionType = 'choice' | 'input';

interface Question {
    id: number;
    type: QuestionType;
    target: { kana: string; romaji: string; meaning: string };
    options?: string[];
}

export default function FinalTestPhase1() {
    const router = useRouter();

    // States Logic
    const [status, setStatus] = useState<'intro' | 'playing' | 'finished'>('intro');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [submitting, setSubmitting] = useState(false);

    // States Timer
    const TEST_DURATION = 600; // 10 phút
    const [timeLeft, setTimeLeft] = useState(TEST_DURATION);

    const inputRef = useRef<HTMLInputElement>(null);

    const TOTAL_QUESTIONS = 20;
    const PASS_SCORE = 16;

    // --- TIMER LOGIC ---
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (status === 'playing' && timeLeft > 0 && !feedback) { // Dừng time khi đang hiện feedback
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && status === 'playing') {
            finishTest(score);
        }
        return () => clearInterval(timer);
    }, [status, timeLeft, score, feedback]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // --- GAME LOGIC ---
    const startTest = () => {
        const shuffledVocab = [...VOCAB_DATA].sort(() => 0.5 - Math.random());
        const selectedVocab = shuffledVocab.slice(0, TOTAL_QUESTIONS);

        const newQuestions: Question[] = selectedVocab.map((item, index) => {
            const type: QuestionType = Math.random() > 0.5 ? 'choice' : 'input';
            let options: string[] = [];
            if (type === 'choice') {
                const wrongs = VOCAB_DATA
                    .filter(v => v.romaji !== item.romaji)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3)
                    .map(v => v.romaji);
                options = [...wrongs, item.romaji].sort(() => 0.5 - Math.random());
            }
            return { id: index, type, target: item, options };
        });

        setQuestions(newQuestions);
        setStatus('playing');
        setScore(0);
        setCurrentQIndex(0);
        setFeedback(null);
        setInputValue('');
        setTimeLeft(TEST_DURATION);
    };

    const handleAnswer = (answer: string) => {
        if (feedback !== null) return;

        const currentQ = questions[currentQIndex];
        const isCorrect = answer.toLowerCase().trim() === currentQ.target.romaji.toLowerCase();

        if (isCorrect) {
            setScore(s => s + 1);
            setFeedback('correct');
        } else {
            setFeedback('wrong');
        }

        // Delay chuyển câu để user xem kết quả
        setTimeout(() => {
            if (currentQIndex < TOTAL_QUESTIONS - 1) {
                setCurrentQIndex(prev => prev + 1);
                setInputValue('');
                setFeedback(null);
                setTimeout(() => inputRef.current?.focus(), 100);
            } else {
                finishTest(score + (isCorrect ? 1 : 0));
            }
        }, 1200);
    };

    const finishTest = async (finalScore: number) => {
        setStatus('finished');
        if (finalScore >= PASS_SCORE) {
            setSubmitting(true);
            try {
                await fetch('/api/user/complete-quest', {
                    method: 'POST',
                    body: JSON.stringify({ questId: 'q1_4' })
                });
            } catch (e) { console.error(e); }
            setSubmitting(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && inputValue.length > 0) {
            handleAnswer(inputValue);
        }
    };

    // --- RENDER ---
    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-500 ${feedback === 'correct' ? 'bg-green-50' : feedback === 'wrong' ? 'bg-red-50' : 'bg-slate-50'
            }`}>

            <div className="flex-1 flex flex-col p-4 md:p-8 max-w-3xl mx-auto w-full">

                {/* HEADER: Back Button & Timer */}
                <div className="flex justify-between items-center mb-8">
                    <Link href="/roadmap/n5" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors group">
                        <div className="p-2 bg-white border border-slate-200 rounded-full group-hover:border-blue-300 transition-all">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="hidden sm:inline">{status === 'playing' ? 'Thoát bài thi' : 'Quay lại Lộ trình'}</span>
                    </Link>

                    {status === 'playing' && (
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono font-bold border shadow-sm transition-all ${timeLeft < 60 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-white text-slate-700 border-slate-200'}`}>
                            <Clock size={18} className={timeLeft < 60 ? 'text-red-500' : 'text-blue-500'} />
                            <span>{formatTime(timeLeft)}</span>
                        </div>
                    )}
                </div>

                <div className="flex-1 flex items-center justify-center">

                    {/* VIEW: INTRO */}
                    {status === 'intro' && (
                        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 max-w-md w-full text-center border border-slate-100 animate-in zoom-in duration-300">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-200 rotate-3 hover:rotate-6 transition-transform">
                                <Trophy size={48} className="text-white drop-shadow-md" />
                            </div>
                            <h1 className="text-3xl font-black text-slate-800 mb-3">Kiểm Tra Giai Đoạn 1</h1>
                            <p className="text-slate-500 mb-8 font-medium leading-relaxed">
                                Thử thách tổng hợp kiến thức Hiragana, Katakana và Từ vựng cơ bản.
                            </p>

                            <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left space-y-4 border border-slate-100">
                                <div className="flex items-center gap-4 text-slate-700 font-bold text-sm">
                                    <div className="p-2 bg-white rounded-xl shadow-sm text-blue-600"><Clock size={18} /></div>
                                    <span>Thời gian: 10 Phút</span>
                                </div>
                                <div className="flex items-center gap-4 text-slate-700 font-bold text-sm">
                                    <div className="p-2 bg-white rounded-xl shadow-sm text-purple-600"><CheckCircle2 size={18} /></div>
                                    <span>20 Câu hỏi liên tục</span>
                                </div>
                                <div className="flex items-center gap-4 text-slate-700 font-bold text-sm">
                                    <div className="p-2 bg-white rounded-xl shadow-sm text-orange-600"><AlertCircle size={18} /></div>
                                    <span>Cần đúng {PASS_SCORE}/20 câu</span>
                                </div>
                            </div>

                            <button onClick={startTest} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-200 hover:-translate-y-1 transition-all text-lg flex items-center justify-center gap-2">
                                Bắt đầu ngay <ArrowRight size={20} />
                            </button>
                        </div>
                    )}

                    {/* VIEW: FINISHED */}
                    {status === 'finished' && (
                        <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl max-w-md w-full text-center border border-slate-100 animate-in zoom-in duration-300">
                            {score >= PASS_SCORE ? (
                                <>
                                    <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-green-50">
                                        <Award size={64} className="text-green-600" />
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-800 mb-2">XUẤT SẮC!</h2>
                                    <p className="text-slate-500 font-medium mb-8">Bạn đã chinh phục hoàn toàn Giai đoạn 1.</p>

                                    <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Điểm số</span>
                                        <div className="text-6xl font-black text-slate-800 mt-2 tracking-tighter">
                                            {score}<span className="text-2xl text-slate-400 font-bold">/20</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => router.push('/roadmap/n5')}
                                        className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2"
                                    >
                                        {submitting ? <Loader2 className="animate-spin" /> : 'Tiếp tục hành trình'}
                                        {!submitting && <ArrowRight size={20} />}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="w-28 h-28 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-red-50">
                                        <XCircle size={64} className="text-red-500" />
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-800 mb-2">CHƯA ĐẠT...</h2>
                                    <p className="text-slate-500 font-medium mb-8">Cần đúng ít nhất {PASS_SCORE} câu để qua màn.</p>

                                    <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Kết quả</span>
                                        <div className="text-6xl font-black text-slate-800 mt-2 tracking-tighter">
                                            {score}<span className="text-2xl text-slate-400 font-bold">/20</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={startTest}
                                        className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 shadow-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        <RefreshCw size={20} /> Thử lại ngay
                                    </button>
                                </>
                            )}
                        </div>
                    )}

                    {/* VIEW: PLAYING */}
                    {status === 'playing' && questions.length > 0 && (
                        <div className="w-full max-w-xl">

                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex justify-between mb-2 font-bold text-slate-400 text-xs uppercase tracking-wider">
                                    <span>Câu hỏi {currentQIndex + 1}/{TOTAL_QUESTIONS}</span>
                                    <span>{Math.round(((currentQIndex) / TOTAL_QUESTIONS) * 100)}%</span>
                                </div>
                                <div className="h-3 bg-white rounded-full w-full overflow-hidden shadow-sm border border-slate-200">
                                    <div className="h-full bg-blue-500 transition-all duration-500 ease-out rounded-full" style={{ width: `${((currentQIndex) / TOTAL_QUESTIONS) * 100}%` }}></div>
                                </div>
                            </div>

                            {/* Card Câu hỏi */}
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 text-center relative overflow-hidden">

                                {/* Question Type Badge */}
                                <div className="absolute top-6 right-6">
                                    {questions[currentQIndex].type === 'choice' ? (
                                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border border-blue-100"><MousePointer2 size={14} /> Trắc nghiệm</span>
                                    ) : (
                                        <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border border-purple-100"><Keyboard size={14} /> Gõ phím</span>
                                    )}
                                </div>

                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-10 text-left">
                                    {questions[currentQIndex].type === 'choice' ? 'Chọn Romaji đúng' : 'Nhập Romaji tương ứng'}
                                </p>

                                {/* Nội dung câu hỏi (Kana) */}
                                <div className="mb-2 h-32 flex items-center justify-center">
                                    <span className="text-5xl md:text-6xl font-black text-slate-800 leading-tight drop-shadow-sm">
                                        {questions[currentQIndex].target.kana}
                                    </span>
                                </div>

                                {/* Nghĩa tiếng Việt */}
                                <div className="mb-10">
                                    <span className="text-sm font-bold text-slate-500 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
                                        Nghĩa: {questions[currentQIndex].target.meaning}
                                    </span>
                                </div>

                                {/* --- VÙNG TRẢ LỜI --- */}
                                {feedback ? (
                                    // HIỂN THỊ KẾT QUẢ NGAY LẬP TỨC
                                    <div className={`py-4 rounded-2xl font-bold text-lg animate-in zoom-in flex items-center justify-center gap-2 ${feedback === 'correct' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                                        {feedback === 'correct' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                                        {feedback === 'correct' ? 'CHÍNH XÁC!' : `SAI RỒI! Đáp án: ${questions[currentQIndex].target.romaji}`}
                                    </div>
                                ) : (
                                    // FORM TRẢ LỜI
                                    questions[currentQIndex].type === 'choice' ? (
                                        <div className="grid grid-cols-2 gap-4">
                                            {questions[currentQIndex].options?.map((opt, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleAnswer(opt)}
                                                    className="py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-lg font-bold text-slate-600 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95 shadow-sm"
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="relative group">
                                            <input
                                                ref={inputRef}
                                                type="text"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                placeholder="Nhập câu trả lời..."
                                                className="w-full py-4 px-6 bg-slate-50 border-2 border-slate-200 rounded-2xl text-center text-xl font-bold text-slate-800 focus:outline-none focus:border-purple-500 focus:bg-white transition-all shadow-inner"
                                                autoFocus
                                            />
                                            <button
                                                onClick={() => handleAnswer(inputValue)}
                                                disabled={inputValue.length === 0}
                                                className="mt-4 w-full py-3.5 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-200 hover:-translate-y-0.5"
                                            >
                                                Kiểm tra
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}