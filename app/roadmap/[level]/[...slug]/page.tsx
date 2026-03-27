'use client';

import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Loader2, Sparkles, BookOpen, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function LessonDemoPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = useParams();
    const queryClient = useQueryClient();

    const questId = searchParams?.get('questId');
    const originalLink = searchParams?.get('originalLink');
    const level = params?.level as string;
    const slug = params?.slug as string[];

    const [completed, setCompleted] = useState(false);

    const completeMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch('/api/user/roadmap-progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ questId: id }),
            });
            if (!res.ok) throw new Error('Failed to complete');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roadmap-progress'] });
            setCompleted(true);
            // Tự động quay về sau 2 giây
            setTimeout(() => {
                router.push(`/roadmap/${level}`);
            }, 2000);
        }
    });

    const handleComplete = () => {
        if (questId) {
            completeMutation.mutate(questId);
        } else {
            // Nếu không có questId (demo), chỉ giả lập
            setCompleted(true);
            setTimeout(() => {
                router.push(`/roadmap/${level}`);
            }, 1500);
        }
    };

    const title = slug?.[slug.length - 1]?.toUpperCase() || 'BÀI HỌC';

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="h-16 border-b border-slate-100 flex items-center justify-between px-4 md:px-8 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <button
                    onClick={() => router.push(`/roadmap/${level}`)}
                    className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-bold text-sm"
                >
                    <ArrowLeft size={18} /> Quay lại
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                        <BookOpen size={16} />
                    </div>
                    <span className="font-black text-slate-800 uppercase tracking-tighter text-sm">
                        {level.toUpperCase()} - {title}
                    </span>
                </div>
                <div className="w-20"></div> {/* Spacer */}
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full">
                {completed ? (
                    <div className="text-center animate-in zoom-in fade-in duration-500">
                        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200">
                            <CheckCircle2 size={48} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-2">Tuyệt vời!</h2>
                        <p className="text-slate-500 font-medium">Bạn đã hoàn thành bài học này. Đang quay lại lộ trình...</p>
                        <div className="mt-8 flex justify-center gap-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="w-full space-y-8 animate-in slide-in-from-bottom-5 duration-500">
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-black uppercase tracking-widest border border-yellow-200 shadow-sm">
                                <Sparkles size={14} fill="currentColor" /> Demo Lesson
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight capitalize">
                                Nội dung bài học {title}
                            </h1>
                            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                                Đây là trang demo nội dung bài học. Trong thực thực tế, đây sẽ là nơi chứa video, bài đọc, từ vựng hoặc ngữ pháp tương ứng.
                            </p>
                        </div>

                        {/* Placeholder Content Blocks */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="h-64 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-slate-400 font-bold p-8 text-center italic">
                                [ Khu vực chứa Video hoặc Audio bài học ]
                            </div>
                            <div className="h-64 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-slate-400 font-bold p-8 text-center italic">
                                [ Khu vực chứa Văn bản & Ghi chú ]
                            </div>
                        </div>

                        {/* Action Area */}
                        <div className="pt-10 border-t border-slate-100 flex flex-col items-center gap-6">
                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                                {originalLink && (
                                    <Link
                                        href={originalLink}
                                        className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all text-center flex items-center justify-center gap-2"
                                    >
                                        XEM NỘI DUNG GỐC
                                    </Link>
                                )}
                                <button
                                    onClick={handleComplete}
                                    disabled={completeMutation.isPending}
                                    className="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-xl rounded-2xl shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-3"
                                >
                                    {completeMutation.isPending ? <Loader2 size={24} className="animate-spin" /> : <Trophy size={24} />}
                                    HOÀN THÀNH BÀI HỌC
                                </button>
                            </div>
                            <p className="text-slate-400 text-sm italic">Sau khi học xong, hãy nhấn nút Hoàn thành để nhận XP</p>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer decoration */}
            <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        </div>
    );
}
