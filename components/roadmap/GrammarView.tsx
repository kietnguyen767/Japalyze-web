// components/roadmap/GrammarView.tsx
'use client';

import React, { useState } from 'react';
import { GrammarPoint } from '@/lib/n5GrammarData';
import {
    BookOpen,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    Volume2,
    Lightbulb,
    Check,
    X
} from 'lucide-react';

interface GrammarViewProps {
    point: GrammarPoint;
}

export default function GrammarView({ point }: GrammarViewProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const playAudio = (text: string) => {
        if (typeof window === 'undefined') return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'ja-JP';
        u.rate = 0.9;
        window.speechSynthesis.speak(u);
    };

    const handleSelectOption = (index: number) => {
        if (selectedOption !== null) return;
        setSelectedOption(index);
        setShowExplanation(true);
    };

    const isCorrect = selectedOption === point.quiz.correctIndex;

    return (
        <div className={`bg-white rounded-2xl border-2 transition-all overflow-hidden mb-4 shadow-sm
      ${isOpen ? 'border-blue-400 ring-2 ring-blue-50' : 'border-slate-100 hover:border-blue-200'}
    `}>
            {/* Header */}
            <div
                className="p-5 cursor-pointer flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${isOpen ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                        <BookOpen size={20} />
                    </div>
                    <div>
                        <h3 className="font-black text-slate-800 text-lg md:text-xl tracking-tight">{point.title}</h3>
                        <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">{point.meaning}</p>
                    </div>
                </div>
                <div className="text-slate-400 bg-slate-50 p-2 rounded-full">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </div>

            {/* Content */}
            {isOpen && (
                <div className="border-t border-slate-100 animate-in slide-in-from-top-4 duration-300">
                    <div className="p-6 space-y-8">

                        {/* Structure */}
                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                            <div className="flex items-center gap-2 mb-3 text-blue-700">
                                <Lightbulb size={18} fill="currentColor" className="opacity-20" />
                                <span className="font-black text-xs uppercase tracking-widest">Cấu trúc</span>
                            </div>
                            <div className="text-xl font-bold text-slate-800 font-mono">
                                {point.structure}
                            </div>
                            <p className="mt-3 text-slate-600 text-sm leading-relaxed font-medium">
                                {point.explanation}
                            </p>
                        </div>

                        {/* Examples */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-px flex-1 bg-slate-100" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Ví dụ · 例文</span>
                                <div className="h-px flex-1 bg-slate-100" />
                            </div>
                            <div className="space-y-4">
                                {point.examples.map((ex, idx) => (
                                    <div key={idx} className="flex gap-4 group">
                                        <button
                                            onClick={() => playAudio(ex.kana)}
                                            className="shrink-0 w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                        >
                                            <Volume2 size={18} />
                                        </button>
                                        <div className="flex-1">
                                            <div className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                                {ex.jp}
                                            </div>
                                            <div className="text-xs text-slate-400 font-medium mb-1">{ex.kana}</div>
                                            <div className="text-sm text-slate-500 font-bold italic">{ex.vn}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mini Quiz */}
                        <div className="bg-indigo-50/50 rounded-[2rem] p-6 border-2 border-dashed border-indigo-100">
                            <div className="flex items-center gap-2 mb-4 text-indigo-700">
                                <CheckCircle2 size={18} />
                                <span className="font-black text-xs uppercase tracking-widest">Luyện tập nhanh</span>
                            </div>
                            <p className="text-slate-800 font-bold mb-5 text-lg leading-snug">
                                {point.quiz.question}
                            </p>

                            <div className="space-y-2">
                                {point.quiz.options.map((opt, idx) => {
                                    const isSelected = selectedOption === idx;
                                    const isCorrectAnswer = idx === point.quiz.correctIndex;

                                    let btnStyle = "bg-white border-slate-200 text-slate-600 hover:border-indigo-300";
                                    if (selectedOption !== null) {
                                        if (isCorrectAnswer) btnStyle = "bg-green-500 border-green-500 text-white shadow-lg shadow-green-200";
                                        else if (isSelected) btnStyle = "bg-red-500 border-red-500 text-white shadow-lg shadow-red-200";
                                        else btnStyle = "opacity-40 bg-slate-50 border-transparent grayscale";
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            disabled={selectedOption !== null}
                                            onClick={() => handleSelectOption(idx)}
                                            className={`w-full p-4 rounded-xl border-2 text-left font-black text-sm transition-all flex items-center justify-between ${btnStyle}`}
                                        >
                                            <span>{opt}</span>
                                            {selectedOption !== null && isCorrectAnswer && <Check size={18} />}
                                            {selectedOption !== null && isSelected && !isCorrectAnswer && <X size={18} />}
                                        </button>
                                    );
                                })}
                            </div>

                            {showExplanation && (
                                <div className={`mt-5 p-4 rounded-xl text-sm font-bold border animate-in slide-in-from-bottom-2 duration-300
                  ${isCorrect ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}
                `}>
                                    {isCorrect ? 'Chính xác! ' : 'Sai rồi! '}
                                    <span className="opacity-80 leading-relaxed font-medium">{point.quiz.explanation}</span>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
