'use client';

import { N4_WEEKS } from '@/lib/data';
import Link from 'next/link';
import {
    ArrowLeft, Star, CalendarDays,
    ChevronRight, CheckCircle2, Circle, Loader2, X
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// ─── Types ───────────────────────────────────────────────────────────────────
type Quest = (typeof N4_WEEKS)[0]['quests'][0];
type Week = (typeof N4_WEEKS)[0];

const LEVELS = [
    { id: 'N5', label: 'N5 – Sơ cấp', desc: 'Bắt đầu từ con số 0', available: true },
    { id: 'N4', label: 'N4 – Cơ bản', desc: 'Tiếp tục sau N5', available: true },
    { id: 'N3', label: 'N3 – Trung cấp', desc: 'Giao tiếp hàng ngày', available: true },
    { id: 'N2', label: 'N2 – Nâng cao', desc: 'Tiếng Nhật kinh doanh', available: true },
    { id: 'N1', label: 'N1 – Thành thạo', desc: 'Đỉnh cao ngôn ngữ', available: true },
];

// ─── Change Level Modal ──────────────────────────────────────────────────────
function ChangeLevelModal({ currentLevel, onClose, onChanged }: {
    currentLevel: string | null;
    onClose: () => void;
    onChanged: () => void;
}) {
    const [selected, setSelected] = useState(currentLevel || 'N4');
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch('/api/user/update-profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentLevel: selected }),
            });
            onChanged();
            onClose();
            router.push(`/roadmap/${selected.toLowerCase()}`);
        } catch (e) {
            console.error(e);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-black text-slate-800">Chọn lộ trình</h3>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X size={18} /></button>
                </div>

                <div className="space-y-2 mb-6">
                    {LEVELS.map(lv => (
                        <button
                            key={lv.id}
                            disabled={!lv.available}
                            onClick={() => lv.available && setSelected(lv.id)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all
                                ${!lv.available ? 'opacity-40 cursor-not-allowed bg-slate-50 border-slate-100' :
                                    selected === lv.id ? 'bg-blue-50 border-blue-400 text-blue-700' :
                                        'bg-white border-slate-100 hover:border-blue-200'}
                            `}
                        >
                            <div>
                                <div className="font-bold text-sm">{lv.label}</div>
                                <div className="text-xs text-slate-400">{lv.desc}</div>
                            </div>
                            {selected === lv.id && lv.available && (
                                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving || selected === currentLevel}
                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {saving ? <Loader2 size={16} className="animate-spin" /> : null}
                    {saving ? 'Đang lưu...' : 'Xác nhận'}
                </button>
            </div>
        </div>
    );
}

// ─── Palette ─────────────────────────────────────────────────────────────────
const WEEK_ACCENT: Record<number, string> = {
    1: 'bg-green-500', 2: 'bg-teal-500', 3: 'bg-blue-500',
    4: 'bg-indigo-500', 5: 'bg-orange-500', 6: 'bg-red-500',
    7: 'bg-purple-500', 8: 'bg-amber-500', 9: 'bg-emerald-500',
    10: 'bg-cyan-500', 11: 'bg-rose-500', 12: 'bg-zinc-800'
};

export default function N4RoadmapPage() {
    const { user, refreshUser } = useAuth();
    const [showChangeLevel, setShowChangeLevel] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const tabScrollRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();
    const [completingId, setCompletingId] = useState<string | null>(null);

    // ── Progress Fetching with React Query ──────────────────────────────────
    const { data: progressData, isLoading: loadingProgress } = useQuery({
        queryKey: ['roadmap-progress'],
        queryFn: async () => {
            const res = await fetch('/api/user/roadmap-progress');
            if (!res.ok) throw new Error('Failed to fetch');
            return res.json() as Promise<{ completedQuestIds: string[] }>;
        },
        staleTime: 0,
    });

    const completeMutation = useMutation({
        mutationFn: async (questId: string) => {
            const res = await fetch('/api/user/roadmap-progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ questId }),
            });
            if (!res.ok) throw new Error('Failed to complete');
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roadmap-progress'] });
            setCompletingId(null);
        },
        onError: () => {
            setCompletingId(null);
        }
    });

    const handleManualComplete = (e: React.MouseEvent, questId: string) => {
        e.preventDefault();
        e.stopPropagation();
        setCompletingId(questId);
        completeMutation.mutate(questId);
    };

    const completedIds = useMemo(() =>
        new Set(progressData?.completedQuestIds || []),
        [progressData]);

    const allOfficialQuestIds = useMemo(() =>
        new Set(N4_WEEKS.flatMap(w => w.quests.map(q => q.id))),
        []);

    const officialCompletedCount = useMemo(() => {
        let count = 0;
        completedIds.forEach(id => {
            if (allOfficialQuestIds.has(id)) count++;
        });
        return count;
    }, [completedIds, allOfficialQuestIds]);

    // ── Selected Week state driven by URL ──────────────────────────────────
    const weekParam = parseInt(searchParams?.get('week') || '1');
    const selectedWeek = N4_WEEKS.find(w => w.week === weekParam) || N4_WEEKS[0];

    const setSelectedWeek = (week: Week) => {
        router.push(`/roadmap/n4?week=${week.week}`, { scroll: false });
    };

    // Scroll mobile tab into view
    useEffect(() => {
        const el = document.getElementById(`tab-week-${selectedWeek.week}`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }, [selectedWeek.week]);

    // ── Helpers ───────────────────────────────────────────────────────────────
    const currentWeek = (() => {
        for (const w of N4_WEEKS) {
            if (!w.quests.every(q => completedIds.has(q.id))) return w.week;
        }
        return N4_WEEKS.length;
    })();

    const totalQuests = N4_WEEKS.flatMap(w => w.quests).length;
    const weekCompleted = selectedWeek.quests.filter(q => completedIds.has(q.id)).length;
    const weekTotal = selectedWeek.quests.length;
    const weekPct = weekTotal > 0 ? Math.round((weekCompleted / weekTotal) * 100) : 0;
    const overallPct = totalQuests > 0 ? Math.round((officialCompletedCount / totalQuests) * 100) : 0;

    const isCompleted = (w: Week) => w.quests.every(q => completedIds.has(q.id));
    const isCurrent = (w: Week) => w.week === currentWeek;

    // ── Shared quest panel content (Grid version as user manual edit back) ────
    const QuestPanel = () => (
        <div className="p-4 md:p-6 lg:p-8">
            {/* Week header card */}
            <div className={`rounded-2xl md:rounded-3xl p-4 md:p-6 mb-5 ${selectedWeek.color} border`}>
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md ${WEEK_ACCENT[selectedWeek.week] ?? 'bg-slate-400'}`}>
                            <CalendarDays size={22} />
                        </div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h2 className={`text-lg md:text-2xl font-black leading-tight ${selectedWeek.color.includes('bg-slate-800') ? 'text-white' : 'text-slate-800'}`}>
                                    {selectedWeek.title}
                                </h2>
                                {isCompleted(selectedWeek) && (
                                    <span className="text-[10px] md:text-xs font-bold bg-green-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                                        <Star size={10} fill="currentColor" /> Hoàn thành
                                    </span>
                                )}
                                {isCurrent(selectedWeek) && !isCompleted(selectedWeek) && (
                                    <span className="text-[10px] md:text-xs font-bold bg-blue-500 text-white px-2 py-0.5 rounded-full animate-pulse shrink-0">
                                        Đang học
                                    </span>
                                )}
                            </div>
                            <p className={`text-xs md:text-sm mt-0.5 line-clamp-2 ${selectedWeek.color.includes('bg-slate-800') ? 'text-slate-300' : 'text-slate-500'}`}>
                                {selectedWeek.description}
                            </p>
                        </div>
                    </div>

                    {/* Progress badge */}
                    <div className="shrink-0 text-center bg-white/70 rounded-xl px-3 py-2 min-w-[64px]">
                        <div className="text-xl md:text-3xl font-black text-slate-800">{weekPct}%</div>
                        <div className="text-[10px] text-slate-500">{weekCompleted}/{weekTotal}</div>
                        <div className="mt-1.5 h-1 w-14 bg-slate-200 rounded-full overflow-hidden mx-auto">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700"
                                style={{ width: `${weekPct}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quest grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
                {selectedWeek.quests.map((quest: Quest) => {
                    const Icon = quest.icon;
                    const isDone = completedIds.has(quest.id);
                    const isCompleting = completingId === quest.id;
                    const isExternal = !quest.link.startsWith('/roadmap');
                    const finalLink = isExternal
                        ? `/roadmap/n4/external/${quest.id}?questId=${quest.id}&originalLink=${encodeURIComponent(quest.link)}`
                        : `${quest.link}${quest.link.includes('?') ? '&' : '?'}questId=${quest.id}`;

                    return (
                        <div key={quest.id} className="relative group">
                            <Link
                                href={finalLink}
                                className={`flex flex-col gap-3 p-4 rounded-2xl border transition-all duration-200 h-full
                                    ${isDone
                                        ? 'bg-green-50/60 border-green-200 hover:shadow-md hover:border-green-300'
                                        : 'bg-white border-slate-100 hover:border-blue-300 hover:shadow-lg hover:-translate-y-0.5'
                                    }
                                `}
                            >
                                <div className="flex items-start justify-between">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${selectedWeek.color} group-hover:scale-105 transition-transform`}>
                                        <Icon size={19} className={selectedWeek.iconColor} />
                                    </div>
                                    {isDone
                                        ? <CheckCircle2 size={19} className="text-green-500 shrink-0" strokeWidth={2.5} />
                                        : <Circle size={19} className="text-slate-200 shrink-0" />
                                    }
                                </div>
                                <div>
                                    <h3 className={`font-bold text-sm leading-snug transition-colors
                                        ${isDone ? 'text-green-700' : 'text-slate-800 group-hover:text-blue-700'}
                                    `}>
                                        {quest.title}
                                    </h3>
                                    <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-3">
                                        {quest.desc}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
                                    <span className={`text-[11px] font-bold px-2 py-1 rounded-lg
                                        ${isDone ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}
                                    `}>
                                        {isDone ? '✓ Hoàn thành' : `+${quest.xp} XP`}
                                    </span>
                                    <span className={`text-[11px] font-semibold flex items-center gap-0.5 transition-colors
                                        ${isDone ? 'text-green-500' : 'text-slate-400 group-hover:text-blue-500'}
                                    `}>
                                        Vào học <ChevronRight size={12} />
                                    </span>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <>
            <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
                {/* Mobile View */}
                <div className="flex flex-col flex-1 min-h-0 md:hidden">
                    <div className="bg-white border-b border-slate-200 px-4 pt-4 pb-0 shrink-0">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <Link href="/" className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors mb-1">
                                    <ArrowLeft size={12} className="mr-1" /> Dashboard
                                </Link>
                                <h1 className="text-base font-black text-slate-800">Lộ Trình N4</h1>
                            </div>
                            <div className="text-right">
                                <div className="text-xl font-black text-slate-800">{overallPct}%</div>
                                <div className="text-[10px] text-slate-400">{officialCompletedCount}/{totalQuests} nhiệm vụ</div>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden mb-3">
                            <div
                                className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-700"
                                style={{ width: `${overallPct}%` }}
                            />
                        </div>

                        {/* Horizontal week tabs */}
                        <div
                            ref={tabScrollRef}
                            className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4"
                            style={{ scrollbarWidth: 'none' }}
                        >
                            {N4_WEEKS.map((week) => {
                                const completed = isCompleted(week);
                                const current = isCurrent(week);
                                const active = selectedWeek.week === week.week;
                                return (
                                    <button
                                        id={`tab-week-${week.week}`}
                                        key={week.week}
                                        onClick={() => setSelectedWeek(week)}
                                        className={`flex flex-col items-center shrink-0 rounded-xl px-3 py-2 transition-all border
                                        ${active
                                                ? `${WEEK_ACCENT[week.week] || 'bg-slate-800'} text-white border-transparent shadow-md scale-105`
                                                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                                            }
                                    `}
                                    >
                                        <span className="text-[10px] font-black leading-none">
                                            {completed ? '★' : current ? '●' : week.week}
                                        </span>
                                        <span className={`text-[10px] font-semibold mt-0.5 whitespace-nowrap ${active ? 'text-white/90' : 'text-slate-500'}`}>
                                            Tuần {week.week}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {loadingProgress ? (
                            <div className="flex items-center justify-center h-40 gap-2 text-slate-400">
                                <Loader2 size={24} className="animate-spin" />
                                <span className="text-sm">Đang tải...</span>
                            </div>
                        ) : <QuestPanel />}
                    </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:flex flex-1 min-h-0">
                    <aside className="w-72 shrink-0 flex flex-col border-r border-slate-200 bg-white overflow-hidden">
                        <div className="px-5 py-5 border-b border-slate-100">
                            <Link href="/" className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-blue-600 mb-3 transition-colors">
                                <ArrowLeft size={13} className="mr-1" /> Dashboard
                            </Link>
                            <h1 className="text-lg font-black text-slate-800 leading-tight">Lộ Trình N4</h1>
                            <p className="text-xs text-slate-400 mt-0.5">{N4_WEEKS.length} tuần · Chinh phục Nhật Ngữ</p>

                            <div className="mt-3">
                                <div className="flex justify-between text-[10px] font-semibold text-slate-400 mb-1">
                                    <span>Tiến độ tổng</span>
                                    <span>{officialCompletedCount}/{totalQuests} nhiệm vụ</span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-700"
                                        style={{ width: `${overallPct}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <nav className="flex-1 overflow-y-auto py-2">
                            {N4_WEEKS.map((week) => {
                                const completed = isCompleted(week);
                                const current = isCurrent(week);
                                const active = selectedWeek.week === week.week;
                                const done = week.quests.filter(q => completedIds.has(q.id)).length;
                                return (
                                    <button
                                        key={week.week}
                                        onClick={() => setSelectedWeek(week)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all group cursor-pointer
                                        ${active ? 'bg-blue-50 border-r-2 border-blue-500' : 'hover:bg-slate-50'}
                                    `}
                                    >
                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white text-xs font-black shadow-sm ${WEEK_ACCENT[week.week] || 'bg-slate-800'}`}>
                                            {completed ? <Star size={14} fill="currentColor" /> : week.week}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className={`text-sm font-semibold truncate leading-tight ${active ? 'text-blue-700' : 'text-slate-700'}`}>
                                                Tuần {week.week}
                                            </div>
                                            <div className="text-[10px] text-slate-400 truncate mt-0.5">
                                                {done}/{week.quests.length} nhiệm vụ
                                            </div>
                                        </div>
                                        {completed && <span className="shrink-0 text-[9px] font-bold bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full">✓</span>}
                                        {current && !completed && <span className="shrink-0 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
                                        <ChevronRight size={14} className={`shrink-0 text-slate-300 group-hover:text-slate-500 transition-colors ${active ? 'text-blue-400' : ''}`} />
                                    </button>
                                );
                            })}
                        </nav>
                    </aside>

                    <main className="flex-1 overflow-y-auto">
                        {loadingProgress ? (
                            <div className="flex items-center justify-center h-full gap-3 text-slate-400">
                                <Loader2 size={32} className="animate-spin" />
                                <p className="text-sm font-medium">Đang tải tiến độ...</p>
                            </div>
                        ) : (
                            <div className="max-w-4xl mx-auto">
                                <QuestPanel />
                            </div>
                        )}
                    </main>
                </div>
            </div>

            <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                <button
                    onClick={() => setShowChangeLevel(true)}
                    className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-slate-100 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-all flex items-center gap-2 group shadow-blue-500/10"
                >
                    Thay đổi trình độ
                </button>
            </div>
            {showChangeLevel && (
                <ChangeLevelModal
                    currentLevel={user?.currentLevel ?? null}
                    onClose={() => setShowChangeLevel(false)}
                    onChanged={refreshUser}
                />
            )}
        </>
    );
}
