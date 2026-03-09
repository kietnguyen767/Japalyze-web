// components/roadmap/VocabHub.tsx
'use client';

import { ArrowLeft, BookOpen, CheckCircle2, LucideIcon, FileText, LayoutGrid } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import VocabView from './VocabView';
import { VocabCategory } from '@/lib/n5VocabData';

export type VocabTopic = {
    subQuestId: string;
    label: string;
    desc: string;
    icon: LucideIcon;
    color: string;
    categoryId: string; // References ID in n5VocabData
};

interface VocabHubProps {
    weekTitle: string;
    lessonTitle: string;
    topics: VocabTopic[];
    vocabData: VocabCategory[];
    questId: string;
}

type ViewMode = 'menu' | 'theory';

export default function VocabHub({ weekTitle, lessonTitle, topics, vocabData, questId }: VocabHubProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [viewMode, setViewMode] = useState<ViewMode>('menu');
    const [selectedTopic, setSelectedTopic] = useState<VocabTopic | null>(null);
    const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetch('/api/user/roadmap-progress')
            .then(r => r.json())
            .then(data => {
                setCompletedIds(new Set(data.completedQuestIds as string[]));
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const totalCount = topics.length;
    const doneCount = topics.filter(c => completedIds.has(c.subQuestId)).length;

    const handleTopicClick = (topic: VocabTopic) => {
        setSelectedTopic(topic);
        setViewMode('theory');
    };

    const markCurrentTopicDone = async () => {
        if (!selectedTopic || completedIds.has(selectedTopic.subQuestId)) return;

        try {
            await fetch('/api/user/complete-quest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ questId: selectedTopic.subQuestId }),
            });
            setCompletedIds(prev => new Set([...Array.from(prev), selectedTopic.subQuestId]));
            queryClient.invalidateQueries({ queryKey: ['roadmap-progress'] });
        } catch (err) {
            console.error(err);
        }
    };

    const selectedCategory = selectedTopic ? vocabData.find(c => c.id === selectedTopic.categoryId) : null;

    return (
        <div className="min-h-screen bg-slate-50/50 text-slate-700">
            <div className="max-w-6xl mx-auto px-4 py-8">

                {/* Top bar */}
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => {
                            if (viewMode === 'menu') router.back();
                            else setViewMode('menu');
                        }}
                        className="group flex items-center text-slate-500 hover:text-blue-600 font-bold transition-colors text-sm"
                    >
                        <div className="p-2 bg-white border border-slate-200 rounded-full mr-3 group-hover:border-blue-200 transition-colors">
                            <ArrowLeft size={16} />
                        </div>
                        {viewMode === 'menu' ? 'Quay lại Lộ trình' : 'Quay lại Menu'}
                    </button>
                    <div className="flex items-center gap-4">
                        {viewMode === 'theory' && (
                            <div className="flex bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
                                <button
                                    onClick={() => setViewMode('menu')}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-slate-500 hover:bg-slate-50"
                                >
                                    <LayoutGrid size={14} /> DANH MỤC
                                </button>
                                <button
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-blue-600 text-white"
                                >
                                    <FileText size={14} /> TỪ VỰNG
                                </button>
                            </div>
                        )}
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase border border-blue-100">
                            <BookOpen size={14} /> {lessonTitle}
                        </div>
                    </div>
                </div>

                {viewMode === 'menu' ? (
                    <>
                        {/* Header & Progress */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-slate-800 mb-2">{weekTitle}</h1>
                            <div className="max-w-md mx-auto">
                                <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-bold">
                                    <span>TIẾN ĐỘ TỪ VỰNG</span>
                                    <span className={doneCount === totalCount ? 'text-green-600' : ''}>{doneCount}/{totalCount} CHỦ ĐỀ</span>
                                </div>
                                <div className="h-3 bg-slate-200 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${(doneCount / totalCount) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Topics Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                            {topics.map((topic) => {
                                const isDone = completedIds.has(topic.subQuestId);
                                const Icon = topic.icon;

                                return (
                                    <button
                                        key={topic.subQuestId}
                                        onClick={() => handleTopicClick(topic)}
                                        className={`group relative flex items-center gap-4 p-5 bg-white rounded-2xl border transition-all text-left
                      ${isDone ? 'border-green-200 bg-green-50/30' : 'border-slate-200 hover:border-blue-400 hover:shadow-lg hover:-translate-y-1'}
                    `}
                                    >
                                        <div className={`p-3.5 rounded-2xl bg-${topic.color}-100 text-${topic.color}-600 group-hover:scale-110 transition-transform`}>
                                            <Icon size={24} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-slate-800 text-sm md:text-base truncate group-hover:text-blue-600 transition-colors">
                                                {topic.label}
                                            </h3>
                                            <p className="text-xs text-slate-400 font-semibold mt-0.5">
                                                {topic.desc}
                                            </p>
                                        </div>

                                        {isDone && (
                                            <div className="text-green-500 shrink-0">
                                                <CheckCircle2 size={20} fill="currentColor" className="text-white" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Quest Completion Action */}
                        {doneCount >= totalCount && !completedIds.has(questId) && (
                            <div className="mt-16 text-center p-10 bg-white border border-green-100 rounded-[3rem] max-w-lg mx-auto shadow-2xl shadow-green-100 transform transition-all animate-in zoom-in-95 duration-500 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <CheckCircle2 size={120} />
                                </div>
                                <div className="relative z-10">
                                    <CheckCircle2 className="text-green-500 mx-auto mb-4" size={56} />
                                    <h3 className="font-bold text-slate-800 text-2xl mb-2">Tuyệt vời!</h3>
                                    <p className="text-slate-500 font-medium mb-8">Bạn đã nắm vững toàn bộ từ vựng của {lessonTitle}.</p>
                                    <button
                                        onClick={async () => {
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
                                            } catch { setSubmitting(false); }
                                        }}
                                        disabled={submitting}
                                        className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 active:scale-95 transition-all shadow-lg shadow-green-200"
                                    >
                                        {submitting ? 'ĐANG LƯU...' : 'HOÀN THÀNH BÀI HỌC'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8 flex justify-between items-end">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-800 mb-2">{selectedTopic?.label}</h1>
                                <p className="text-slate-500 font-medium">{selectedTopic?.desc}</p>
                            </div>
                            <div className="flex gap-3">
                                {!completedIds.has(selectedTopic?.subQuestId || '') && (
                                    <button
                                        onClick={markCurrentTopicDone}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-md shadow-green-100"
                                    >
                                        <CheckCircle2 size={18} /> Đánh dấu hoàn thành
                                    </button>
                                )}
                            </div>
                        </div>

                        {selectedCategory && (
                            <VocabView items={selectedCategory.items} />
                        )}

                        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-center">
                            <button
                                onClick={() => setViewMode('menu')}
                                className="px-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
                            >
                                Quay lại danh sách chủ đề
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Tailwind color helper - hidden */}
            <div className="hidden bg-blue-100 text-blue-600 bg-purple-100 text-purple-600 bg-indigo-100 text-indigo-600 bg-emerald-100 text-emerald-600 bg-orange-100 text-orange-600 bg-sky-100 text-sky-600 bg-rose-100 text-rose-600 bg-pink-100 text-pink-600 bg-red-100 text-red-600 bg-amber-100 text-amber-600 bg-cyan-100 text-cyan-600 bg-slate-100 text-slate-700 bg-yellow-100 text-yellow-600 bg-teal-100 text-teal-600 bg-fuchsia-100 text-fuchsia-600" />
        </div>
    );
}
