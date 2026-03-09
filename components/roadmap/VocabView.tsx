// components/roadmap/VocabView.tsx
'use client';

import { Volume2, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { VocabItem } from '@/lib/n5VocabData';

interface VocabViewProps {
    items: VocabItem[];
}

export default function VocabView({ items }: VocabViewProps) {
    const [showMeanings, setShowMeanings] = useState(true);

    const playAudio = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowMeanings(!showMeanings)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
                >
                    {showMeanings ? (
                        <>
                            <EyeOff size={16} /> Ẩn nghĩa
                        </>
                    ) : (
                        <>
                            <Eye size={16} /> Hiện nghĩa
                        </>
                    )}
                </button>
            </div>

            {/* Vocab List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all"
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-0.5">
                                <span className="text-xl font-bold text-slate-800">{item.word}</span>
                                <button
                                    onClick={() => playAudio(item.reading || item.word)}
                                    className="p-1.5 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                                    title="Nghe audio"
                                >
                                    <Volume2 size={16} />
                                </button>
                            </div>
                            <div className="text-sm font-medium text-slate-500 mb-1">
                                {item.reading}
                            </div>
                            <div className={`text-sm font-semibold text-blue-600 transition-opacity duration-300 ${showMeanings ? 'opacity-100' : 'opacity-0'}`}>
                                {item.meaning}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {items.length === 0 && (
                <div className="text-center py-10 text-slate-400 font-medium bg-white rounded-3xl border border-dashed border-slate-200">
                    Chưa có từ vựng cho phần này.
                </div>
            )}
        </div>
    );
}
