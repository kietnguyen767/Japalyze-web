//app/page.tsx
'use client';

import { useAuth, User } from '@/context/AuthContext';
import { apiFetch } from '@/lib/apiClient';
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    Play, Zap, Languages, BookOpen, BookOpenText, FileText,
    Gamepad2, Loader2, ArrowRight, Sparkles, Target, Trophy, Plus, Star, Search, Flame, HelpCircle, Lock, Construction, Flag
} from 'lucide-react';


// ==================================================================================
// 1. MAIN COMPONENT (ENTRY POINT)
// ==================================================================================

export default function Home() {
    const { user, loading: authLoading, refreshUser } = useAuth();
    const [showSurvey, setShowSurvey] = useState(false);

    useEffect(() => {
        // Chỉ hiện khảo sát khi: Đã đăng nhập + Đã load xong + Chưa làm khảo sát
        if (!authLoading && user && user.onboardingCompleted === false) {
            setTimeout(() => setShowSurvey(true), 0);
        }
    }, [authLoading, user]);

    const isRecorded = useRef(false);
    useEffect(() => {
        // --- ANALYTICS TRACKING (Chỉ chạy 1 lần khi mount trang chủ) ---
        if (isRecorded.current) return;
        isRecorded.current = true;

        const recordVisit = async () => {
            try {
                // Ta bỏ sessionStorage để mỗi lần bạn vào/ra hoặc F5 đều được tính +1
                await fetch('/api/analytics/collect', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ path: '/' })
                });
            } catch (e) {
                console.error('Analytics error:', e);
            }
        };
        recordVisit();
    }, []);

    const handleSkipSurvey = () => setShowSurvey(false);
    const handleOpenSurvey = () => setShowSurvey(true);


    return (
        <>
            <Dashboard user={user} onOpenSurvey={handleOpenSurvey} />

            {showSurvey && <OnboardingModal onFinish={refreshUser} onSkip={handleSkipSurvey} />}
        </>
    );
}

// ==================================================================================
// 2. DASHBOARD COMPONENT 
// ==================================================================================

interface DashboardData {
    history: {
        translation: Array<{ source: string; target: string; time: string }>;
        decks: Array<{ id: string; title: string; count: number }>;
        test: { lastScore: number; total: number; name: string; date: string } | null;
    };
    progress: {
        currentLevel: string | null;
        totalN5Percentage: number;
        currentPhase: number;
        phasePercentage: number;
        streakDays: number;
    };
}

function Dashboard({ user, onOpenSurvey }: { user: User | null, onOpenSurvey: () => void }) {
    const { data, isLoading: loadingData } = useQuery<DashboardData | null>({
        queryKey: ['dashboard-data', user?.id],
        queryFn: async () => {
            const res = await apiFetch('/api/user/dashboard');
            if (!res.ok) throw new Error('API Error');
            return res.json();
        },
        enabled: !!user,
        staleTime: 0,
    });


    const history = data?.history || { translation: [], decks: [], test: null };
    const progress = data?.progress || {
        currentLevel: null,
        totalN5Percentage: 0,
        currentPhase: 1,
        phasePercentage: 0,
        streakDays: 0
    };
    const hasLevel = user?.currentLevel;
    const streakDays = progress.streakDays;
    const isN5 = hasLevel === 'N5';
    const isLevelActive = hasLevel && isN5;
    const currentWeek = progress.currentPhase; // API now returns week number

    return (
        <div className="min-h-screen bg-slate-50/50 text-slate-700 selection:bg-indigo-100 selection:text-indigo-700 flex flex-col">



            <div className="relative z-0 pt-10 pb-16 px-4 bg-white border-b border-slate-100">
                <div className="max-w-6xl mx-auto">

                    {/* HEADER INFO */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                        <div>
                            {user?.isPremium && (
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                                        <Star size={12} fill="currentColor" /> Premium Member
                                    </span>
                                </div>
                            )}
                            <h1 className="text-4xl font-black text-slate-800 tracking-tight">
                                {user ? `Chào buổi sáng, ${user.name}` : 'Chào bạn mới!'}
                            </h1>
                            <p className="text-slate-500 mt-2 text-lg">
                                {user
                                    ? (isLevelActive ? 'Hôm nay chúng ta sẽ chinh phục bài học nào?' : (hasLevel ? `Lộ trình ${hasLevel} đang được xây dựng.` : 'Bạn chưa thiết lập lộ trình học tập.'))
                                    : 'Đăng nhập để bắt đầu hành trình chinh phục tiếng Nhật.'}
                            </p>
                        </div>

                        {/* STREAK WIDGET */}
                        <div className="flex items-center gap-4 bg-orange-50/80 p-4 rounded-2xl border border-orange-100 hover:shadow-md transition-all cursor-pointer group">
                            <div className={`w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform ${!user ? 'grayscale opacity-70' : ''}`}>
                                <Flame size={32} fill="currentColor" className="animate-pulse" />
                            </div>
                            <div className="pr-2">
                                {/* TODO: Implement actual streak tracking logic in the backend */}
                                <div className="text-3xl font-black text-slate-800 leading-none">{streakDays}</div>
                                <div className="text-xs font-bold text-orange-600 uppercase tracking-wider mt-1">Ngày Streak</div>
                            </div>
                        </div>
                    </div>

                    {/* MAIN CARD GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* --- CARD 1: LỘ TRÌNH TỔNG --- */}
                        <div className={`md:col-span-2 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300 flex flex-col justify-between
                ${isLevelActive
                                ? 'bg-gradient-to-br from-blue-600 to-indigo-700 shadow-blue-200/50'
                                : 'bg-slate-800 shadow-slate-200/50'
                            }`}>

                            <div className="relative z-10">
                                {/* Badge */}
                                <div className={`inline-flex items-center gap-2 px-3 py-1 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-4 border
                        ${isLevelActive ? 'bg-white/10 text-blue-100 border-white/20' : 'bg-slate-700 text-slate-300 border-slate-600'}`}>
                                    {hasLevel ? (
                                        isLevelActive ? (
                                            <>
                                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]"></div>
                                                Lộ trình chính
                                            </>
                                        ) : (
                                            <>
                                                <Construction size={12} className="text-yellow-400" />
                                                Đang xây dựng
                                            </>
                                        )
                                    ) : (
                                        <>
                                            <HelpCircle size={12} className="text-yellow-300" />
                                            {user ? 'Chưa thiết lập' : 'Khám phá ngay'}
                                        </>
                                    )}
                                </div>

                                {/* Title */}
                                <h2 className="text-3xl font-bold mb-2 leading-tight">
                                    {user
                                        ? (hasLevel ? (isLevelActive ? `Chinh phục ${user.currentLevel}` : `Lộ trình ${user.currentLevel}`) : 'Bạn chưa chọn mục tiêu!')
                                        : 'Học tiếng Nhật cùng AI'
                                    }
                                </h2>

                                {/* Description */}
                                <p className={`mb-6 max-w-md leading-relaxed text-base ${isLevelActive ? 'text-blue-100/90' : 'text-slate-400'}`}>
                                    {user
                                        ? (hasLevel
                                            ? (isLevelActive ? 'Hành trình vạn dặm bắt đầu từ bước chân đầu tiên. Tiếp tục cố gắng nhé!' : 'Hiện tại hệ thống chỉ mới hỗ trợ lộ trình N5.')
                                            : 'Để JapaLyze xây dựng lộ trình học cá nhân hóa, hãy cho chúng tôi biết trình độ hiện tại của bạn.')
                                        : 'Trải nghiệm phương pháp học tập thông minh, lộ trình từ N5 đến N1.'
                                    }
                                </p>

                                {/* Progress Bar */}
                                {isLevelActive ? (
                                    <div className="bg-black/20 rounded-xl p-4 backdrop-blur-sm border border-white/10 mb-6 max-w-lg">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-xs font-bold text-blue-100 uppercase flex items-center gap-2">
                                                <Flag size={14} /> Tiến độ toàn trình N5
                                            </span>
                                            <span className="text-sm font-black text-white">{progress.totalN5Percentage}%</span>
                                        </div>
                                        <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.6)] relative transition-all duration-1000"
                                                style={{ width: `${Math.max(progress.totalN5Percentage, 5)}%` }}
                                            >
                                                <div className="absolute top-0 right-0 bottom-0 w-1 bg-white/50"></div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-4 mb-6"></div>
                                )}

                                {/* Button Action */}
                                {user ? (
                                    hasLevel ? (
                                        isLevelActive ? (
                                            <Link href="/roadmap/n5" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-fit">
                                                <Play size={20} fill="currentColor" /> Vào bản đồ lộ trình
                                            </Link>
                                        ) : (
                                            <div className="flex gap-3">
                                                <button disabled className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-700 text-slate-400 font-bold rounded-xl cursor-not-allowed w-fit">
                                                    <Lock size={20} /> Chưa mở khóa
                                                </button>
                                                <button onClick={onOpenSurvey} className="inline-flex items-center gap-2 px-4 py-3.5 bg-slate-700/50 text-white font-bold rounded-xl hover:bg-slate-600 transition-all border border-slate-600">
                                                    Đổi sang N5
                                                </button>
                                            </div>
                                        )
                                    ) : (
                                        <button onClick={onOpenSurvey} className="inline-flex items-center gap-2 px-8 py-3.5 bg-yellow-400 text-yellow-900 font-bold rounded-xl hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-fit">
                                            <Target size={20} /> 🎯 Thiết lập mục tiêu ngay
                                        </button>
                                    )
                                ) : (
                                    <Link href="/login" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-fit">
                                        <Play size={20} fill="currentColor" /> Đăng nhập / Đăng ký
                                    </Link>
                                )}
                            </div>

                            <div className="absolute right-[-20px] bottom-[-40px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 rotate-12">
                                {isLevelActive ? <Trophy size={240} /> : <Construction size={240} />}
                            </div>
                        </div>

                        {/* --- CARD 2: CHI TIẾT GIAI ĐOẠN HIỆN TẠI --- */}
                        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:border-green-100 transition-all group flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                                <Target size={120} />
                            </div>

                            <div className="flex-1">
                                <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                    <Target size={28} fill="currentColor" className="opacity-80" />
                                </div>

                                <div className="mb-4">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trạng thái hiện tại</span>
                                    <h3 className="font-bold text-slate-800 text-xl mt-1">
                                        {isLevelActive ? `Tuần ${currentWeek}/8` : 'Chưa kích hoạt'}
                                    </h3>
                                    <p className="text-slate-500 text-sm mt-1 line-clamp-2">
                                        {isLevelActive
                                            ? (currentWeek <= 2 ? 'Bảng chữ cái & Phát âm' : currentWeek <= 5 ? 'Từ vựng & Ngữ pháp' : 'Ôn tập & Kiểm tra')
                                            : 'Vui lòng chọn lộ trình để xem chi tiết.'}
                                    </p>
                                </div>

                                {isLevelActive && (
                                    <div className="mt-2">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-xs font-bold text-green-600">Hoàn thành</span>
                                            <span className="text-xs font-bold text-slate-700">{progress.phasePercentage}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-green-500 rounded-full transition-all duration-1000"
                                                style={{ width: `${progress.phasePercentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link href="/roadmap/n5" className="mt-6 w-full py-3.5 bg-slate-50 text-slate-700 font-bold text-sm rounded-xl text-center hover:bg-green-500 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2">
                                {isLevelActive ? 'Tiếp tục nhiệm vụ' : 'Kích hoạt ngay'} <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT GRID - FIX 2: relative z-0 để không đè lên menu */}
            <div className="relative z-0 max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2 space-y-8">
                    <SectionBox title="Lịch sử Dịch thuật" icon={<Languages className="text-blue-500" />} link="/translate" linkText="Mở công cụ">
                        {loadingData ? <SkeletonList /> : (user && history.translation.length > 0) ? (
                            <div className="space-y-3">
                                {history.translation.map((item: { source: string; target: string; time: string }, idx: number) => (
                                    <div key={idx} className="flex justify-between items-center p-4 bg-slate-50/50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-md transition-all cursor-default group">
                                        <div className="flex-1 min-w-0 mr-4">
                                            <p className="font-bold text-slate-700 truncate group-hover:text-blue-600 transition-colors">{item.source}</p>
                                            <p className="text-sm text-slate-500 truncate mt-0.5">{item.target}</p>
                                        </div>
                                        <span className="text-xs text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-100">{item.time}</span>
                                    </div>
                                ))}
                            </div>
                        ) : <EmptyState text={user ? "Chưa có lịch sử dịch gần đây" : "Đăng nhập để xem lịch sử"} />}
                    </SectionBox>

                    <div>
                        <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2 mb-5 px-1">
                            <BookOpenText size={22} className="text-green-500" /> Chủ đề bài tập
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {[
                                { id: 'hiragana', name: 'Bảng Hiragana', color: 'from-pink-50 to-rose-50 text-rose-600 border-rose-100 hover:border-rose-300' },
                                { id: 'numbers', name: 'Số đếm', color: 'from-blue-50 to-sky-50 text-blue-600 border-blue-100 hover:border-blue-300' },
                                { id: 'food', name: 'Ẩm thực', color: 'from-orange-50 to-amber-50 text-orange-600 border-orange-100 hover:border-orange-300' },
                                { id: 'animals', name: 'Động vật', color: 'from-purple-50 to-violet-50 text-purple-600 border-purple-100 hover:border-purple-300' },
                                { id: 'weather', name: 'Thời tiết', color: 'from-cyan-50 to-teal-50 text-teal-600 border-teal-100 hover:border-teal-300' },
                                { id: 'family', name: 'Gia đình', color: 'from-emerald-50 to-green-50 text-emerald-600 border-emerald-100 hover:border-emerald-300' },
                            ].map((topic) => (
                                <Link key={topic.id} href={`/exercises/${topic.id}`} className={`p-4 rounded-2xl bg-gradient-to-br ${topic.color} border font-bold text-center transition-all shadow-sm hover:shadow-md hover:-translate-y-1 relative group`}>
                                    <span className="relative z-10">{topic.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm hover:shadow-lg transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-6 relative z-10">
                            <FileText size={20} className="text-red-500" /> Kết quả thi gần nhất
                        </h3>
                        <div className="text-center py-4 relative z-10">
                            {loadingData ? <div className="h-20 w-32 mx-auto bg-slate-100 rounded-xl animate-pulse"></div> :
                                (user && history.test) ? (
                                    <div className="animate-in zoom-in duration-300">
                                        <div className="text-6xl font-black text-slate-800 tracking-tighter">{history.test.lastScore}<span className="text-2xl text-slate-400 font-bold">/{history.test.total}</span></div>
                                        <p className="text-sm font-bold text-slate-500 mt-2 line-clamp-1 px-4">{history.test.name}</p>
                                        <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">{history.test.date}</span>
                                    </div>
                                ) : <p className="text-slate-400 text-sm italic">{user ? 'Chưa có dữ liệu thi thử.' : 'Đăng nhập để xem điểm thi.'}</p>}
                        </div>
                        <Link href="/tests" className="block w-full py-3 bg-slate-800 text-white text-center font-bold rounded-xl text-sm hover:bg-slate-700 hover:shadow-lg transition-all mt-6 relative z-10">
                            Làm đề thi thử
                        </Link>
                    </div>

                    <SectionBox title="Bộ Deck của tôi" icon={<BookOpen size={20} className="text-indigo-500" />} link="/flashcards" linkText="Xem tất cả">
                        {loadingData ? <SkeletonList /> : (user && history.decks.length > 0) ? (
                            <div className="space-y-3">
                                {history.decks.map((deck: { id: string; title: string; count: number }, idx: number) => (
                                    <div key={idx} className="flex justify-between items-center p-3.5 bg-white border border-slate-100 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all group">
                                        <span className="font-medium text-slate-700 truncate flex-1 group-hover:text-indigo-700 transition-colors">{deck.title}</span>
                                        <span className="text-[11px] font-bold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg ml-2">{deck.count} thẻ</span>
                                    </div>
                                ))}
                            </div>
                        ) : <EmptyState text={user ? "Chưa tạo bộ thẻ nào" : "Đăng nhập để quản lý thẻ"} />}

                        <Link href="/flashcards" className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 border border-dashed border-indigo-200 text-indigo-600 font-bold text-sm rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition-all">
                            <Plus size={16} /> Tạo bộ mới
                        </Link>
                    </SectionBox>

                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/roleplay" className="p-5 bg-purple-600 text-white rounded-[1.5rem] text-center hover:bg-purple-700 hover:scale-[1.03] transition-all shadow-lg shadow-purple-200/50">
                            <Zap size={28} className="mx-auto mb-3 opacity-90" />
                            <span className="font-bold text-sm block">Roleplay AI</span>
                        </Link>
                        <Link href="/games" className="p-5 bg-teal-500 text-white rounded-[1.5rem] text-center hover:bg-teal-600 hover:scale-[1.03] transition-all shadow-lg shadow-teal-200/50">
                            <Gamepad2 size={28} className="mx-auto mb-3 opacity-90" />
                            <span className="font-bold text-sm block">Game Vui</span>
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

// ==================================================================================
// 3. HELPER COMPONENTS
// ==================================================================================

interface SectionBoxProps {
    title: string;
    icon: React.ReactNode;
    link?: string;
    linkText?: string;
    children: React.ReactNode;
}

function SectionBox({ title, icon, link, linkText, children }: SectionBoxProps) {
    return (
        <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:border-blue-200 transition-colors">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-3">{icon} {title}</h3>
                {link && <Link href={link} className="text-sm text-blue-600 font-bold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">{linkText}</Link>}
            </div>
            {children}
        </div>
    )
}

function EmptyState({ text }: { text: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-slate-400 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-300">
                <Search size={20} />
            </div>
            <p className="text-sm font-medium">{text}</p>
        </div>
    )
}

function SkeletonList() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-100 rounded-2xl animate-pulse"></div>)}
        </div>
    )
}

// ==================================================================================
// 4. ONBOARDING MODAL
// ==================================================================================

function OnboardingModal({ onFinish, onSkip }: { onFinish: () => void, onSkip: () => void }) {
    const [loading, setLoading] = useState(false);

    // 1. Xử lý khi chọn Level (Lưu Level + Đánh dấu đã xong)
    const handleSubmit = async (level: string) => {
        setLoading(true);
        try {
            const res = await apiFetch('/api/user/update-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentLevel: level,
                    onboardingCompleted: true
                })
            });

            if (!res.ok) throw new Error("Lỗi cập nhật");

            onSkip(); // Đóng modal ngay
            onFinish(); // Refresh data ngầm
        } catch {
            setLoading(false);
        }
    };

    // 2. Xử lý khi bấm Bỏ qua (Lưu Level là NULL + Đánh dấu đã xong)
    const handleSkipAction = async () => {
        setLoading(true);
        try {
            const res = await apiFetch('/api/user/update-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentLevel: null,
                    onboardingCompleted: true
                })
            });

            if (!res.ok) throw new Error("Lỗi cập nhật");

            onSkip(); // Đóng modal ngay
            onFinish(); // Refresh data ngầm
        } catch {
            setLoading(false);
        }
    };

    const levels = [
        { id: 'N5', t: 'Sơ cấp N5', d: 'Chào hỏi, Hiragana/Katakana' },
        { id: 'N4', t: 'Sơ cấp N4', d: 'Hội thoại đời sống' },
        { id: 'N3', t: 'Trung cấp N3', d: 'Giao tiếp công việc' },
        { id: 'N2', t: 'Trung cấp N2', d: 'Tiếng Nhật thương mại' },
        { id: 'N1', t: 'Thượng cấp N1', d: 'Đỉnh cao ngôn ngữ' },
    ];

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 relative">

                {/* Loading Overlay */}
                {loading && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
                        <Loader2 size={32} className="animate-spin text-blue-600" />
                    </div>
                )}

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <Sparkles className="absolute top-4 right-4 opacity-50 text-yellow-300" />
                    <h2 className="text-3xl font-black mb-2 relative z-10">Chào mừng bạn! 🎉</h2>
                    <p className="text-blue-100 text-sm font-medium relative z-10">Chọn mục tiêu để JapaLyze thiết kế lộ trình riêng.</p>
                </div>
                <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    <div className="space-y-3">
                        {levels.map((lvl) => (
                            <button key={lvl.id} onClick={() => handleSubmit(lvl.id)} disabled={loading} className="w-full p-4 rounded-2xl border-2 border-slate-50 hover:border-blue-500 hover:bg-blue-50 transition-all text-left flex justify-between items-center group">
                                <div>
                                    <div className="font-bold text-slate-800 group-hover:text-blue-700 text-lg">{lvl.t}</div>
                                    <div className="text-xs text-slate-500 font-medium">{lvl.d}</div>
                                </div>
                                <ArrowRight size={20} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                            </button>
                        ))}
                    </div>
                    <div className="mt-8 pt-5 border-t border-slate-100 flex justify-center">
                        <button
                            onClick={handleSkipAction}
                            disabled={loading}
                            className="text-sm text-slate-400 font-bold hover:text-slate-600 hover:underline transition-colors disabled:opacity-50"
                        >
                            Bỏ qua (Tôi sẽ chọn sau)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ==================================================================================
// 5. FOOTER
// ==================================================================================
function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 text-center md:text-left">

                    <div className="flex flex-col md:pl-16">
                        <h2 className="text-3xl font-bold text-white mb-4">JapaLyze</h2>
                        <p className="text-slate-400 leading-relaxed mb-8 pr-0 md:pr-12">
                            Nền tảng học tiếng Nhật thông minh với AI, giúp bạn chinh phục JLPT và giao tiếp tự tin trong mọi tình huống.
                        </p>

                        <div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Kết nối với chúng tôi</h3>
                            <div className="flex items-center justify-center md:justify-start space-x-4">
                                <a href="#" className="p-3 bg-slate-800 text-slate-400 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                                </a>
                                <a href="#" className="p-3 bg-slate-800 text-slate-400 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v8.88c-.08 3.01-2.61 5.43-5.63 5.43-3.21 0-5.81-2.6-5.81-5.81 0-3.21 2.6-5.81 5.81-5.81.7.01 1.4.14 2.05.4v4.13c-.34-.16-.71-.23-1.09-.23-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5c1.38 0 2.5-1.12 2.5-2.5v-16.55z" /></svg>
                                </a>
                                <a href="#" className="p-3 bg-slate-800 text-slate-400 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="md:pl-16">
                        <h3 className="text-lg font-bold text-white mb-6">Liên kết nhanh</h3>
                        <div className="flex flex-col space-y-4 text-base">
                            {['Về chúng tôi', 'Khóa học AI', 'Blog chia sẻ', 'Chính sách & Điều khoản', 'Trung tâm trợ giúp'].map((link) => (
                                <a key={link} href="#" className="hover:text-blue-400 transition-colors w-fit mx-auto md:mx-0">
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
                    © {new Date().getFullYear()} JapaLyze. Nền tảng học tiếng Nhật thông minh Việt Nam.
                </div>
            </div>
        </footer>
    );
}
