// components/roadmap/GrammarHub.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import {
    ArrowLeft,
    BookOpen,
    MessageSquare,
    CheckCircle,
    Sparkles,
    ArrowRight,
    X
} from 'lucide-react';
import Link from 'next/link';
import { GrammarPoint } from '@/lib/n5GrammarData';
import FormattedText from '@/components/FormattedText';
import GrammarView from './GrammarView';

interface GrammarHubProps {
    weekTitle: string;
    lessonTitle: string;
    grammarData: GrammarPoint[];
    quizData: any[];
    questId: string;
    conversationLink: string;
}

export default function GrammarHub({
    weekTitle,
    lessonTitle,
    grammarData,
    quizData,
    questId,
    conversationLink
}: GrammarHubProps) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [view, setView] = useState<'menu' | 'theory' | 'practice'>('menu');
    const [completedSteps, setCompletedSteps] = useState<{ grammar: boolean; conversation: boolean }>({
        grammar: false,
        conversation: false
    });
    const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleComplete = async () => {
        if (!questId) return;
        setIsSubmitting(true);
        try {
            await fetch('/api/user/complete-quest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ questId })
            });
            queryClient.invalidateQueries({ queryKey: ['roadmap-progress'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard-data'] });
            router.push('/roadmap/n5');
        } catch (error) {
            console.error("Lỗi khi lưu tiến độ:", error);
            setIsSubmitting(false);
        }
    };

    const handleQuizAnswer = (qIdx: number, oIdx: number) => {
        if (userAnswers[qIdx] !== undefined) return;
        const newAnswers = { ...userAnswers, [qIdx]: oIdx };
        setUserAnswers(newAnswers);

        const allAnswered = quizData.length === Object.keys(newAnswers).length;
        const allCorrect = quizData.every((q, i) => newAnswers[i] === q.correctIndex);

        if (allAnswered && allCorrect) {
            setCompletedSteps(prev => ({ ...prev, grammar: true }));
        }
    };

    const doneCount = (completedSteps.grammar ? 1 : 0) + (completedSteps.conversation ? 1 : 0);
    const totalCount = 2;

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">
            {/* Header / Breadcrumb */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => view === 'menu' ? router.back() : setView('menu')}
                        className="group flex items-center text-slate-500 hover:text-blue-600 font-bold transition-colors text-sm"
                    >
                        <div className="p-2 bg-white border border-slate-200 rounded-full mr-3 group-hover:border-blue-200 transition-colors">
                            <ArrowLeft size={16} />
                        </div>
                        {view === 'menu' ? 'Quay lại Lộ trình' : 'Quay lại Menu'}
                    </button>
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase">
                        <BookOpen size={14} /> {lessonTitle}
                    </div>
                </div>

                {view === 'menu' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-slate-800 mb-2">{weekTitle}: {lessonTitle}</h1>
                            <p className="text-slate-500 mb-4 font-medium">Hoàn thành cả {totalCount} bài tập để đánh dấu nhiệm vụ.</p>

                            {/* Progress bar */}
                            <div className="max-w-md mx-auto">
                                <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-semibold">
                                    <span>Tiến độ bài học</span>
                                    <span className={doneCount === totalCount ? 'text-green-600' : ''}>{doneCount}/{totalCount} phần</span>
                                </div>
                                <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-700 ease-out"
                                        style={{ width: `${(doneCount / totalCount) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2x1 Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {/* Grammar Card */}
                            <button
                                onClick={() => setView('theory')}
                                className={`group bg-white rounded-[2rem] p-10 border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-center relative overflow-hidden
                                    ${completedSteps.grammar ? 'border-green-300 bg-green-50/10' : 'border-slate-200 hover:border-blue-400'}`}
                            >
                                {completedSteps.grammar && (
                                    <div className="absolute top-6 right-6 flex items-center gap-1 text-green-600 text-[10px] font-bold bg-green-50 px-3 py-1 rounded-full border border-green-100 uppercase">
                                        <CheckCircle size={12} /> Xong
                                    </div>
                                )}
                                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-sm
                                    ${completedSteps.grammar ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                                    <BookOpen size={40} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 tracking-tight">Học Ngữ pháp</h2>
                                <p className="text-sm text-slate-400 leading-relaxed font-medium">Khám phá các mẫu câu mới qua lý thuyết & bài luyện tập.</p>
                                <div className={`mt-10 py-4 px-8 rounded-2xl font-bold text-xs transition-all uppercase tracking-widest
                                    ${completedSteps.grammar
                                        ? 'bg-green-50 text-green-700 border border-green-200'
                                        : 'bg-slate-50 text-blue-600 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-200'}`}>
                                    {completedSteps.grammar ? 'Xem lại' : 'Bắt đầu ngay'}
                                </div>
                            </button>

                            {/* Conversation Card */}
                            <Link
                                href={`${conversationLink}&context=roadmap&questId=${questId}`}
                                onClick={() => setCompletedSteps(prev => ({ ...prev, conversation: true }))}
                                className={`group bg-white rounded-[2rem] p-10 border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-center relative overflow-hidden
                                    ${completedSteps.conversation ? 'border-green-300 bg-green-50/10' : 'border-slate-200 hover:border-indigo-400'}`}
                            >
                                {completedSteps.conversation && (
                                    <div className="absolute top-6 right-6 flex items-center gap-1 text-green-600 text-[10px] font-bold bg-green-50 px-3 py-1 rounded-full border border-green-100 uppercase">
                                        <CheckCircle size={12} /> Xong
                                    </div>
                                )}
                                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-sm
                                    ${completedSteps.conversation ? 'bg-green-100 text-green-600' : 'bg-indigo-50 text-indigo-600'}`}>
                                    <MessageSquare size={40} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 tracking-tight">Hội thoại</h2>
                                <p className="text-sm text-slate-400 leading-relaxed font-medium">Thực hành phản xạ giao tiếp qua các tình huống thực tế.</p>
                                <div className={`mt-10 py-4 px-8 rounded-2xl font-bold text-xs transition-all uppercase tracking-widest
                                    ${completedSteps.conversation
                                        ? 'bg-green-50 text-green-700 border border-green-200'
                                        : 'bg-slate-50 text-indigo-600 border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-200'}`}>
                                    {completedSteps.conversation ? 'Luyện lại' : 'Bắt đầu ngay'}
                                </div>
                            </Link>
                        </div>

                        {/* Final Completion Card */}
                        {doneCount >= totalCount && (
                            <div className="mt-14 text-center p-10 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-[3rem] max-w-md mx-auto shadow-xl animate-in zoom-in-95 duration-700">
                                <div className="w-20 h-20 bg-white rounded-3xl shadow-blue-100 flex items-center justify-center mx-auto mb-6 shadow-md border border-green-50">
                                    <Sparkles className="text-green-500" size={40} fill="currentColor" />
                                </div>
                                <h3 className="text-2xl font-bold text-green-800 mb-2 tracking-tight">Tuyệt vời!</h3>
                                <p className="text-sm text-green-600 font-semibold mb-8">Bạn đã hoàn tất tất cả mục tiêu của bài học này.</p>
                                <button
                                    onClick={handleComplete}
                                    disabled={isSubmitting}
                                    className="w-full bg-green-600 text-white py-4.5 rounded-2xl font-bold text-sm shadow-lg shadow-green-100 hover:bg-green-700 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
                                >
                                    {isSubmitting ? "Đang lưu..." : "Xác nhận hoàn thành"} <CheckCircle size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="animate-in slide-in-from-right-4 duration-500">
                        {view === 'theory' ? (
                            <div className="max-w-6xl mx-auto space-y-6">
                                <div className="columns-1 md:columns-2 gap-6">
                                    {grammarData.map((point) => (
                                        <GrammarView key={point.id} point={point} />
                                    ))}
                                </div>
                                <div className="pt-6">
                                    <button
                                        onClick={() => {
                                            setView('practice');
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="w-full bg-slate-900 text-white py-4.5 rounded-2xl font-bold text-sm shadow-md hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
                                    >
                                        Luyện tập ngữ pháp <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-4xl mx-auto">
                                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-xl relative overflow-hidden">
                                    {/* Progress indicator */}
                                    <div className="flex justify-between items-center mb-10">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Đang luyện tập</p>
                                            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Câu hỏi {currentQuestionIndex + 1} / {quizData.length}</h2>
                                        </div>
                                        <div className="flex gap-1.5">
                                            {quizData.map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`h-1.5 rounded-full transition-all duration-500 ${i === currentQuestionIndex ? 'w-8 bg-blue-500' :
                                                        userAnswers[i] !== undefined ? 'w-4 bg-green-400' : 'w-4 bg-slate-100'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Question area */}
                                    <div className="space-y-10">
                                        {quizData.map((q, qIdx) => (
                                            qIdx === currentQuestionIndex && (
                                                <div key={qIdx} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                    <div className="mb-8">
                                                        <FormattedText text={q.question} className="font-bold text-slate-800 text-xl lg:text-2xl leading-snug block" />
                                                    </div>
                                                    <div className="grid gap-4">
                                                        {q.options.map((opt: string, oIdx: number) => {
                                                            const isSelected = userAnswers[qIdx] === oIdx;
                                                            const isCorrect = oIdx === q.correctIndex;
                                                            let style = "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/10";

                                                            if (userAnswers[qIdx] !== undefined) {
                                                                if (isCorrect) style = "bg-green-500 border-green-500 text-white shadow-lg scale-[1.02]";
                                                                else if (isSelected) style = "bg-red-500 border-red-500 text-white shadow-lg";
                                                                else style = "opacity-30 bg-slate-50 border-transparent grayscale select-none";
                                                            }

                                                            return (
                                                                <button
                                                                    key={oIdx}
                                                                    disabled={userAnswers[qIdx] !== undefined}
                                                                    onClick={() => handleQuizAnswer(qIdx, oIdx)}
                                                                    className={`p-6 rounded-2xl border-2 text-left font-bold text-base lg:text-xl transition-all active:scale-95 ${style}`}
                                                                >
                                                                    {opt}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* Explanation footer */}
                                                    {userAnswers[qIdx] !== undefined && (
                                                        <div className="mt-10 p-6 rounded-2xl bg-slate-50 border border-slate-100 animate-in zoom-in-95 duration-500">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                {userAnswers[qIdx] === q.correctIndex ? (
                                                                    <div className="flex items-center gap-2 text-green-600 font-black text-sm uppercase">
                                                                        <CheckCircle size={16} /> Chính xác!
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center gap-2 text-red-600 font-black text-sm uppercase">
                                                                        <X size={16} /> Chưa đúng
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <p className="text-slate-600 font-medium leading-relaxed">{q.explanation}</p>

                                                            <div className="mt-8 flex justify-end">
                                                                <button
                                                                    onClick={() => {
                                                                        if (currentQuestionIndex < quizData.length - 1) {
                                                                            setCurrentQuestionIndex(prev => prev + 1);
                                                                        } else if (completedSteps.grammar) {
                                                                            setView('menu');
                                                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                                                        } else {
                                                                            // Reset answers if failed
                                                                            setUserAnswers({});
                                                                            setCurrentQuestionIndex(0);
                                                                        }
                                                                    }}
                                                                    className="bg-slate-900 text-white py-3 px-8 rounded-xl font-bold text-sm shadow-md hover:bg-slate-800 transition-all flex items-center gap-2"
                                                                >
                                                                    {currentQuestionIndex < quizData.length - 1 ? "Tiếp tục" : (completedSteps.grammar ? "Hoàn thành" : "Thử lại")}
                                                                    <ArrowRight size={16} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
