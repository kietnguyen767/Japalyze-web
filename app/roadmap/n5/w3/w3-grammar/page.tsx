// app/roadmap/n5/w3/w3-grammar/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import {
    ArrowLeft,
    BookOpen,
    MessageSquare,
    CheckCircle,
    Sparkles,
    Play,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { WEEK3_GRAMMAR_DATA, WEEK3_GRAMMAR_QUIZ } from '@/lib/n5GrammarData';
import FormattedText from '@/components/FormattedText';

export default function W3GrammarPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId');
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
            router.back();
        } catch (error) {
            console.error("Lỗi khi lưu tiến độ:", error);
            setIsSubmitting(false);
        }
    };

    const handleQuizAnswer = (qIdx: number, oIdx: number) => {
        if (userAnswers[qIdx] !== undefined) return;
        const newAnswers = { ...userAnswers, [qIdx]: oIdx };
        setUserAnswers(newAnswers);

        const allAnswered = WEEK3_GRAMMAR_QUIZ.length === Object.keys(newAnswers).length;
        const allCorrect = WEEK3_GRAMMAR_QUIZ.every((q, i) => newAnswers[i] === q.correctIndex);

        if (allAnswered && allCorrect) {
            setCompletedSteps(prev => ({ ...prev, grammar: true }));
        }
    };

    const doneCount = (completedSteps.grammar ? 1 : 0) + (completedSteps.conversation ? 1 : 0);
    const totalCount = 2;

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">
            {/* Header / Breadcrumb */}
            <div className="max-w-4xl mx-auto px-4 py-8">
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
                        <BookOpen size={14} /> Ngữ pháp & Giao tiếp
                    </div>
                </div>

                {view === 'menu' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-black text-slate-800 mb-2">Bài 1: Chào hỏi</h1>
                            <p className="text-slate-500 mb-4 font-medium">Hoàn thành cả {totalCount} bài tập để đánh dấu nhiệm vụ.</p>

                            {/* Progress bar */}
                            <div className="max-w-xs mx-auto">
                                <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-bold">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-xl mx-auto">
                            {/* Grammar Card */}
                            <button
                                onClick={() => setView('theory')}
                                className={`group bg-white rounded-[1.5rem] p-6 border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-center relative overflow-hidden
                                    ${completedSteps.grammar ? 'border-green-300 bg-green-50/10' : 'border-slate-200 hover:border-blue-400'}`}
                            >
                                {completedSteps.grammar && (
                                    <div className="absolute top-4 right-4 flex items-center gap-1 text-green-600 text-[9px] font-black bg-green-50 px-2 py-0.5 rounded-full border border-green-100 uppercase">
                                        <CheckCircle size={10} /> Xong
                                    </div>
                                )}
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform shadow-sm
                                    ${completedSteps.grammar ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                                    <BookOpen size={28} />
                                </div>
                                <h2 className="text-lg font-bold text-slate-800 mb-1.5 group-hover:text-blue-600">Học Ngữ pháp</h2>
                                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Lý thuyết & Bố trí 20 câu hỏi luyện tập.</p>
                                <div className={`mt-6 py-2.5 px-4 rounded-lg font-black text-[10px] transition-all uppercase tracking-wide
                                    ${completedSteps.grammar
                                        ? 'bg-green-50 text-green-700 border border-green-200'
                                        : 'bg-slate-50 text-blue-600 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white'}`}>
                                    {completedSteps.grammar ? 'Xem lại' : 'Bắt đầu ngay'}
                                </div>
                            </button>

                            {/* Conversation Card */}
                            <Link
                                href={`/exercises/conv_1_intro?context=roadmap&questId=${questId}`}
                                onClick={() => setCompletedSteps(prev => ({ ...prev, conversation: true }))}
                                className={`group bg-white rounded-[1.5rem] p-6 border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-center relative overflow-hidden
                                    ${completedSteps.conversation ? 'border-green-300 bg-green-50/10' : 'border-slate-200 hover:border-indigo-400'}`}
                            >
                                {completedSteps.conversation && (
                                    <div className="absolute top-4 right-4 flex items-center gap-1 text-green-600 text-[9px] font-black bg-green-50 px-2 py-0.5 rounded-full border border-green-100 uppercase">
                                        <CheckCircle size={10} /> Xong
                                    </div>
                                )}
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform shadow-sm
                                    ${completedSteps.conversation ? 'bg-green-100 text-green-600' : 'bg-indigo-50 text-indigo-600'}`}>
                                    <MessageSquare size={28} />
                                </div>
                                <h2 className="text-lg font-bold text-slate-800 mb-1.5 group-hover:text-indigo-600">Hội thoại</h2>
                                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Thực hành bài tập hội thoại.</p>
                                <div className={`mt-6 py-2.5 px-4 rounded-lg font-black text-[10px] transition-all uppercase tracking-wide
                                    ${completedSteps.conversation
                                        ? 'bg-green-50 text-green-700 border border-green-200'
                                        : 'bg-slate-50 text-indigo-600 border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white'}`}>
                                    {completedSteps.conversation ? 'Luyện lại' : 'Bắt đầu ngay'}
                                </div>
                            </Link>
                        </div>

                        {/* Final Completion Card */}
                        {doneCount >= totalCount && (
                            <div className="mt-10 text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-[2rem] max-w-sm mx-auto shadow-lg animate-in zoom-in-95 duration-700">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
                                    <Sparkles className="text-green-500" size={32} fill="currentColor" />
                                </div>
                                <h3 className="text-xl font-black text-green-800 mb-1.5">Tuyệt vời!</h3>
                                <p className="text-xs text-green-600 font-bold mb-6">Bạn đã hoàn tất Bài 1 xuất sắc.</p>
                                <button
                                    onClick={handleComplete}
                                    disabled={isSubmitting}
                                    className="w-full bg-green-600 text-white py-3.5 rounded-xl font-black text-sm shadow-md hover:bg-green-700 active:scale-95 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
                                >
                                    {isSubmitting ? "Đang lưu..." : "Xác nhận hoàn thành"} <CheckCircle size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="animate-in slide-in-from-right-4 duration-500">
                        {view === 'theory' ? (
                            <div className="max-w-xl mx-auto space-y-6">

                                <div className="space-y-4">
                                    {WEEK3_GRAMMAR_DATA.map((point) => (
                                        <div key={point.id} className="bg-white rounded-[1.2rem] p-6 border border-slate-200 shadow-sm">
                                            <h3 className="text-base font-black text-blue-600 mb-3">{point.title}</h3>
                                            <div className="bg-slate-50/50 rounded-xl p-4 mb-4 border border-slate-100">
                                                <p className="text-[9px] font-black uppercase text-slate-400 mb-1.5 tracking-widest">Cấu trúc</p>
                                                <p className="text-sm font-bold text-slate-700 mb-1.5">{point.structure}</p>
                                                <p className="text-[11px] text-slate-500 leading-relaxed italic">{point.explanation}</p>
                                            </div>
                                            <div className="space-y-2.5">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ví dụ</p>
                                                {point.examples.slice(0, 1).map((ex, i) => (
                                                    <div key={i} className="bg-white border-l-3 border-blue-500 pl-3.5 py-1">
                                                        <p className="text-sm font-bold text-slate-800">{ex.jp}</p>
                                                        <p className="text-[11px] font-medium text-slate-400 italic">{ex.vn}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-4">
                                    <button
                                        onClick={() => {
                                            setView('practice');
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-black text-sm shadow-md hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
                                    >
                                        Luyện tập ngữ pháp <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-4xl mx-auto space-y-6 pb-20">
                                <div className="flex flex-col lg:flex-row gap-8 items-start">
                                    {/* Sidebar - Navigation */}
                                    <div className="lg:sticky lg:top-24 w-full lg:w-64 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm shrink-0">
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Danh sách câu hỏi</h3>
                                        <div className="grid grid-cols-5 gap-2">
                                            {WEEK3_GRAMMAR_QUIZ.map((q, idx) => {
                                                const isCurrent = currentQuestionIndex === idx;
                                                const isAnswered = userAnswers[idx] !== undefined;
                                                const isCorrect = isAnswered && userAnswers[idx] === q.correctIndex;

                                                let statusStyle = "bg-slate-50 text-slate-400 border-slate-100 hover:border-blue-300 hover:text-blue-500";
                                                if (isCurrent) statusStyle = "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100 scale-110 z-10";
                                                else if (isAnswered) {
                                                    statusStyle = isCorrect
                                                        ? "bg-green-100 text-green-600 border-green-200"
                                                        : "bg-red-100 text-red-600 border-red-200";
                                                }

                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setCurrentQuestionIndex(idx)}
                                                        className={`w-full aspect-square flex items-center justify-center rounded-lg text-xs font-black border-2 transition-all ${statusStyle}`}
                                                    >
                                                        {idx + 1}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {completedSteps.grammar && (
                                            <button
                                                onClick={() => setView('menu')}
                                                className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl font-black text-xs shadow-md hover:bg-green-700 transition-all uppercase tracking-wide"
                                            >
                                                Quay lại Menu
                                            </button>
                                        )}
                                    </div>

                                    {/* Main Content - Active Question */}
                                    <div className="flex-1 w-full">
                                        {WEEK3_GRAMMAR_QUIZ.map((q, qIdx) => qIdx === currentQuestionIndex && (
                                            <div key={qIdx} className="bg-white rounded-[1.5rem] p-8 lg:p-10 border border-slate-200 shadow-sm relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
                                                <div className="flex items-center gap-4 mb-8">
                                                    <span className="shrink-0 w-10 h-10 bg-blue-50 text-blue-600 rounded-xl font-black flex items-center justify-center text-sm shadow-sm">Q{qIdx + 1}</span>
                                                    <FormattedText text={q.question} className="font-bold text-slate-800 text-lg lg:text-xl leading-snug block" />
                                                </div>
                                                <div className="grid gap-3">
                                                    {q.options.map((opt, oIdx) => {
                                                        const isSelected = userAnswers[qIdx] === oIdx;
                                                        const isCorrect = oIdx === q.correctIndex;
                                                        let style = "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/10";

                                                        if (userAnswers[qIdx] !== undefined) {
                                                            if (isCorrect) style = "bg-green-500 border-green-500 text-white shadow-md scale-[1.01]";
                                                            else if (isSelected) style = "bg-red-500 border-red-500 text-white shadow-md";
                                                            else style = "opacity-30 bg-slate-50 border-transparent grayscale select-none";
                                                        }

                                                        return (
                                                            <button
                                                                key={oIdx}
                                                                disabled={userAnswers[qIdx] !== undefined}
                                                                onClick={() => handleQuizAnswer(qIdx, oIdx)}
                                                                className={`p-5 rounded-xl border-2 text-left font-bold text-base lg:text-lg transition-all active:scale-95 ${style}`}
                                                            >
                                                                {opt}
                                                            </button>
                                                        );
                                                    })}
                                                </div>

                                                {/* Navigation controls */}
                                                <div className="flex justify-between mt-10 pt-8 border-t border-slate-50">
                                                    <button
                                                        disabled={currentQuestionIndex === 0}
                                                        onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                                                        className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase hover:text-blue-500 disabled:opacity-0 transition-all"
                                                    >
                                                        <ArrowLeft size={16} /> Câu trước
                                                    </button>
                                                    <button
                                                        disabled={currentQuestionIndex === WEEK3_GRAMMAR_QUIZ.length - 1}
                                                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                                        className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase hover:text-blue-500 disabled:opacity-0 transition-all"
                                                    >
                                                        Câu sau <ArrowRight size={16} />
                                                    </button>
                                                </div>
                                            </div>
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
