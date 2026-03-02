// components/roadmap/VocabHub.tsx
'use client';

import { ArrowLeft, BookOpen, CheckCircle2, LucideIcon } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export type VocabTopic = {
    subQuestId: string;
    lessonId: string;
    label: string;
    desc: string;
    icon: LucideIcon;
    color: string;
};

interface VocabHubProps {
    weekTitle: string;
    lessonTitle: string;
    topics: VocabTopic[];
    questId: string;
}

export default function VocabHub({ weekTitle, lessonTitle, topics, questId }: VocabHubProps) {
    const router = useRouter();
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

    return (
        <div className="min-h-screen bg-slate-50/50 text-slate-700">
            <div className="max-w-5xl mx-auto px-4 py-8">

                {/* Top bar */}
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center text-slate-500 hover:text-blue-600 font-bold transition-colors text-sm"
                    >
                        <div className="p-2 bg-white border border-slate-200 rounded-full mr-3 group-hover:border-blue-200 transition-colors">
                            <ArrowLeft size={16} />
                        </div>
                        Quay lại Lộ trình
                    </button>
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase">
                        <BookOpen size={14} /> {lessonTitle}
                    </div>
                </div>

                {/* Header & Progress */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-slate-800 mb-2">{weekTitle}</h1>
                    <div className="max-w-md mx-auto">
                        <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-bold">
                            <span>TIẾN ĐỘ BÀI HỌC</span>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {topics.map((topic) => {
                        const isDone = completedIds.has(topic.subQuestId);
                        const Icon = topic.icon;

                        return (
                            <Link
                                key={topic.subQuestId}
                                href={`/exercises/${topic.lessonId}?context=roadmap&questId=${topic.subQuestId}`}
                                className={`group relative flex items-center gap-4 p-4 bg-white rounded-2xl border transition-all
                  ${isDone ? 'border-green-200 bg-green-50/30' : 'border-slate-200 hover:border-blue-400 hover:shadow-md'}
                `}
                            >
                                <div className={`p-3 rounded-xl bg-${topic.color}-100 text-${topic.color}-600 group-hover:scale-110 transition-transform`}>
                                    <Icon size={22} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-800 text-sm md:text-base truncate group-hover:text-blue-600 transition-colors">
                                        {topic.label}
                                    </h3>
                                    <p className="text-xs text-slate-400 font-medium">
                                        {isDone ? 'Đã hoàn thành' : 'Sẵn sàng học'}
                                    </p>
                                </div>

                                {isDone && (
                                    <div className="text-green-500 shrink-0">
                                        <CheckCircle2 size={18} fill="currentColor" className="text-white" />
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Quest Completion Action */}
                {doneCount >= totalCount && !completedIds.has(questId) && (
                    <div className="mt-12 text-center p-8 bg-green-50/50 border-2 border-dashed border-green-300 rounded-[2.5rem] max-w-lg mx-auto transform transition-all animate-in zoom-in-95 duration-500">
                        <CheckCircle2 className="text-green-600 mx-auto mb-4" size={48} />
                        <h3 className="font-black text-green-900 text-2xl mb-2">Chúc mừng!</h3>
                        <p className="text-green-700 font-medium mb-6">Bạn đã hoàn thành toàn bộ chủ đề của {lessonTitle}.</p>
                        <button
                            onClick={async () => {
                                setSubmitting(true);
                                try {
                                    await fetch('/api/user/complete-quest', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ questId }),
                                    });
                                    router.back();
                                } catch { setSubmitting(false); }
                            }}
                            disabled={submitting}
                            className="bg-green-600 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-green-700 active:scale-95 transition-all shadow-xl shadow-green-200"
                        >
                            {submitting ? 'ĐANG LƯU...' : 'XÁC NHẬN HOÀN THÀNH'}
                        </button>
                    </div>
                )}
            </div>

            {/* Tailwind color helper - hidden */}
            <div className="hidden bg-blue-100 text-blue-600 bg-purple-100 text-purple-600 bg-indigo-100 text-indigo-600 bg-emerald-100 text-emerald-600 bg-orange-100 text-orange-600 bg-sky-100 text-sky-600 bg-rose-100 text-rose-600 bg-pink-100 text-pink-600 bg-red-100 text-red-600 bg-amber-100 text-amber-600 bg-emerald-100 text-emerald-600 bg-cyan-100 text-cyan-600 bg-slate-100 text-slate-700 bg-yellow-100 text-yellow-600 bg-teal-100 text-teal-600 bg-fuchsia-100 text-fuchsia-600" />
        </div>
    );
}
