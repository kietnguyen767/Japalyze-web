// components/roadmap/RoadmapTest.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, Trophy, Clock, HelpCircle, BarChart3 } from 'lucide-react';

export type TestQuestion = {
    content: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
};

interface RoadmapTestProps {
    title: string;
    questions: TestQuestion[];
    questId: string;
}

export default function RoadmapTest({ title, questions, questId }: RoadmapTestProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
    const [isFinished, setIsFinished] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const currentQuestion = questions[currentIndex];
    const isAnswered = answers[currentIndex] !== -1;

    const handleAnswer = (idx: number) => {
        if (isFinished) return;
        const newAnswers = [...answers];
        newAnswers[currentIndex] = idx;
        setAnswers(newAnswers);
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setIsFinished(true);
        }
    };

    const prevQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const calculateScore = () => {
        let correct = 0;
        answers.forEach((ans, i) => {
            if (ans === questions[i].correctAnswer) correct++;
        });
        return {
            correct,
            total: questions.length,
            percent: Math.round((correct / questions.length) * 100)
        };
    };

    const handleComplete = async () => {
        setSubmitting(true);
        try {
            await fetch('/api/user/complete-quest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ questId }),
            });
            queryClient.invalidateQueries({ queryKey: ['roadmap-progress'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard-data'] });
            router.back();
        } catch (error) {
            console.error(error);
            setSubmitting(false);
        }
    };

    if (isFinished) {
        const score = calculateScore();
        const isPassed = score.percent >= 80;

        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="max-w-xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden text-center p-10 animate-in zoom-in-95 duration-500">
                    <div className="mb-6 inline-flex p-5 bg-blue-50 rounded-full text-blue-600 ring-8 ring-blue-50/50">
                        <Trophy size={48} />
                    </div>

                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Kết quả kiểm tra</h2>
                    <p className="text-slate-500 font-medium mb-8">{title}</p>

                    <div className="flex justify-center gap-10 mb-10">
                        <div className="text-center">
                            <div className="text-4xl font-black text-slate-800">{score.correct}/{score.total}</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Câu đúng</div>
                        </div>
                        <div className="text-center">
                            <div className={`text-4xl font-black ${isPassed ? 'text-green-500' : 'text-orange-500'}`}>{score.percent}%</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Điểm số</div>
                        </div>
                    </div>

                    <div className={`p-6 rounded-2xl mb-8 flex items-center gap-4 text-left ${isPassed ? 'bg-green-50 border border-green-100' : 'bg-orange-50 border border-orange-100'}`}>
                        {isPassed ? (
                            <>
                                <CheckCircle2 className="text-green-600 shrink-0" size={32} />
                                <div>
                                    <div className="font-bold text-green-900">Tuyệt vời! Bạn đã vượt qua bài thi.</div>
                                    <div className="text-sm text-green-700 font-medium">Bạn đã nắm chắc kiến thức tuần này.</div>
                                </div>
                            </>
                        ) : (
                            <>
                                <HelpCircle className="text-orange-600 shrink-0" size={32} />
                                <div>
                                    <div className="font-bold text-orange-900">Cố gắng thêm chút nữa!</div>
                                    <div className="text-sm text-orange-700 font-medium">Cần đạt 80% để hoàn thành. Bạn có thể làm lại bài bất cứ lúc nào.</div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex flex-col gap-3">
                        {isPassed ? (
                            <button
                                onClick={handleComplete}
                                disabled={submitting}
                                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200"
                            >
                                {submitting ? 'ĐANG LƯU...' : 'XÁC NHẬN HOÀN THÀNH'}
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setAnswers(new Array(questions.length).fill(-1));
                                    setCurrentIndex(0);
                                    setIsFinished(false);
                                }}
                                className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-900 active:scale-95 transition-all shadow-lg"
                            >
                                THI LẠI
                            </button>
                        )}
                        <button
                            onClick={() => router.back()}
                            className="w-full bg-white text-slate-500 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all"
                        >
                            Quay lại Lộ trình
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white md:bg-slate-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-slate-100 sticky top-0 z-10 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div className="text-center flex-1">
                        <h1 className="text-sm md:text-base font-bold text-slate-800">{title}</h1>
                        <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                            CÂU {currentIndex + 1} / {questions.length}
                        </div>
                    </div>
                    <div className="w-10" /> {/* Spacer */}
                </div>
                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-slate-100">
                    <div
                        className="h-full bg-blue-600 transition-all duration-300 ease-out"
                        style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 pt-10 md:pt-16">
                {/* Question Section */}
                <div className="mb-10">
                    <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-black mb-4 tracking-wider uppercase border border-blue-100">
                        TRẮC NGHIỆM
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug">
                        {currentQuestion.content}
                    </h2>
                </div>

                {/* Options Section */}
                <div className="grid grid-cols-1 gap-4 mb-10">
                    {currentQuestion.options.map((option, idx) => {
                        const isSelected = answers[currentIndex] === idx;
                        return (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                className={`
                                    flex items-center gap-4 p-5 rounded-3xl border-2 text-left transition-all relative overflow-hidden group
                                    ${isSelected
                                        ? 'border-blue-600 bg-blue-50/50 shadow-md transform scale-[1.01]'
                                        : 'border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50'}
                                `}
                            >
                                <div className={`
                                    w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 font-bold transition-all
                                    ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-400 group-hover:border-slate-400'}
                                `}>
                                    {String.fromCharCode(65 + idx)}
                                </div>
                                <span className={`text-base md:text-lg font-bold transition-all ${isSelected ? 'text-blue-900' : 'text-slate-600'}`}>
                                    {option}
                                </span>
                                {isSelected && (
                                    <div className="absolute right-6 text-blue-600 animate-in fade-in zoom-in duration-300">
                                        <CheckCircle2 size={24} fill="white" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Footer Navigation */}
                <div className="flex gap-4">
                    <button
                        onClick={prevQuestion}
                        disabled={currentIndex === 0}
                        className={`flex-1 py-4 px-6 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 border ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                        <ArrowLeft size={20} /> QUAY LẠI
                    </button>
                    <button
                        onClick={nextQuestion}
                        disabled={!isAnswered}
                        className={`flex-[2] py-4 px-6 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100
                            ${!isAnswered
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'}
                        `}
                    >
                        {currentIndex === questions.length - 1 ? 'KẾT THÚC' : 'TIẾP THEO'} <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
