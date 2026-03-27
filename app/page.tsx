//app/page.tsx
'use client';

import { useAuth, User } from '@/context/AuthContext';
import { apiFetch } from '@/lib/apiClient';
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    Play, Zap, Languages, BookOpen, BookOpenText, FileText,
    Gamepad2, Loader2, ArrowRight, Sparkles, Target, Trophy, Plus, Star, Search, Flame, HelpCircle, Lock, Construction, Flag, RefreshCcw
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
        phaseTitle?: string;
    };
}

function Dashboard({ user, onOpenSurvey }: { user: User | null, onOpenSurvey: () => void }) {
    const { data, isLoading: loadingData } = useQuery<DashboardData | null>({
        queryKey: ['dashboard-data', user?.id, user?.currentLevel],
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
        phaseTitle: '',
        phasePercentage: 0,
        streakDays: 0
    };
    const hasLevel = user?.currentLevel;
    const streakDays = progress.streakDays;
    const isLevelActive = !!hasLevel; // All levels N1-N5 are now active
    const currentWeek = progress.currentPhase;

    // 3. Xử lý kích hoạt N5 nhanh
    const [activating, setActivating] = useState(false);
    const handleActivateN5 = async () => {
        if (isLevelActive) return; // Nếu đã là N5 thì thôi
        setActivating(true);
        try {
            const res = await apiFetch('/api/user/update-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentLevel: 'N5' })
            });
            if (res.ok) {
                // Refresh data
                window.location.href = '/roadmap/n5';
            }
        } catch (err) {
            console.error(err);
        } finally {
            setActivating(false);
        }
    };

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
                                    ? (isLevelActive ? 'Hôm nay chúng ta sẽ chinh phục bài học nào?' : 'Bạn chưa thiết lập lộ trình học tập.')
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
                        <div className={`md:col-span-2 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300 flex flex-col justify-between
                ${isLevelActive
                                ? 'bg-gradient-to-br from-blue-600 to-blue-800 shadow-blue-200/50'
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
                                                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse shadow-[0_0_8px_#fbbf24]"></div>
                                                Sắp ra mắt
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
                                            ? (isLevelActive ? 'Hành trình vạn dặm bắt đầu từ bước chân đầu tiên.' : `Hệ thống đang hoàn thiện lộ trình ${user.currentLevel}.`)
                                            : 'Để JapaLyze xây dựng lộ trình học cá nhân hóa, hãy cho chúng tôi biết trình độ hiện tại của bạn.')
                                        : 'Trải nghiệm phương pháp học tập thông minh, lộ trình từ N5 đến N1.'
                                    }
                                </p>

                                {/* Progress Bar */}
                                {hasLevel ? (
                                    <div className="bg-black/20 rounded-xl p-4 backdrop-blur-sm border border-white/10 mb-6 max-w-lg">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-xs font-bold text-blue-100 uppercase flex items-center gap-2">
                                                <Flag size={14} /> Tiến độ toàn trình {user.currentLevel}
                                            </span>
                                            <span className="text-sm font-black text-white">{progress.totalN5Percentage}%</span>
                                        </div>
                                        <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.6)] relative transition-all duration-1000"
                                                style={{ width: `${Math.max(progress.totalN5Percentage, 5)}%` }}
                                            >
                                                {isLevelActive && <div className="absolute top-0 right-0 bottom-0 w-1 bg-white/50"></div>}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-4 mb-6"></div>
                                )}

                                {/* Button Action */}
                                {user ? (
                                    hasLevel ? (
                                        <div className="flex flex-col gap-4">
                                            {!isLevelActive && (
                                                <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider">
                                                    <Sparkles size={14} className="text-yellow-400" /> Gợi ý cho bạn:
                                                </div>
                                            )}
                                            <div className="flex flex-wrap gap-3">
                                                <Link href={`/roadmap/${user.currentLevel?.toLowerCase()}`} className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-fit">
                                                    <Play size={20} fill="currentColor" /> Vào bản đồ lộ trình {user.currentLevel}
                                                </Link>
                                                <button onClick={onOpenSurvey} className={`inline-flex items-center gap-2 px-4 py-3.5 font-bold rounded-xl transition-all border backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${isLevelActive ? 'bg-blue-700/50 text-white border-blue-400/30 hover:bg-blue-600' : 'bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-slate-600'}`}>
                                                    <RefreshCcw size={18} /> Đổi lộ trình
                                                </button>
                                            </div>
                                        </div>
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
                        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all group flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                                <Target size={120} />
                            </div>

                            <div className="flex-1">
                                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                    <Target size={28} fill="currentColor" className="opacity-80" />
                                </div>

                                <div className="mb-4">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trạng thái hiện tại</span>
                                    <h3 className="font-bold text-slate-800 text-xl mt-1">
                                        {isLevelActive ? `Tuần ${currentWeek}` : 'Chưa kích hoạt'}
                                    </h3>
                                    <p className="text-slate-500 text-sm mt-1 line-clamp-2">
                                        {isLevelActive
                                            ? (progress.phaseTitle || `Thông tin Tuần ${currentWeek}`)
                                            : 'Vui lòng chọn lộ trình để xem chi tiết.'}
                                    </p>
                                </div>

                                {isLevelActive && (
                                    <div className="mt-2">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-xs font-bold text-blue-600">Hoàn thành</span>
                                            <span className="text-xs font-bold text-slate-700">{progress.phasePercentage}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                                                style={{ width: `${progress.phasePercentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {isLevelActive ? (
                                <Link href={`/roadmap/${user.currentLevel?.toLowerCase()}`} className="mt-6 w-full py-3.5 bg-slate-50 text-slate-600 font-semibold text-sm rounded-xl text-center hover:bg-blue-600 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2">
                                    Tiếp tục nhiệm vụ <ArrowRight size={16} />
                                </Link>
                            ) : (
                                <button
                                    onClick={handleActivateN5}
                                    disabled={activating}
                                    className="mt-6 w-full py-3.5 bg-slate-50 text-slate-600 font-semibold text-sm rounded-xl text-center hover:bg-blue-600 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {activating ? <Loader2 size={16} className="animate-spin" /> : 'Kích hoạt ngay'} <ArrowRight size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT GRID - FIX 2: relative z-0 để không đè lên menu */}
            <div className="relative z-0 max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2 space-y-8">
                    <SectionBox title="Lịch sử Dịch thuật" icon={<Languages size={22} className="text-blue-600" />} link="/translate" linkText="Mở công cụ">
                        {loadingData ? <SkeletonList /> : (user && history.translation.length > 0) ? (
                            <div className="space-y-3">
                                {history.translation.map((item: { source: string; target: string; time: string }, idx: number) => (
                                    <Link
                                        key={idx}
                                        href="/translate"
                                        className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-xl hover:bg-white hover:border-blue-300 hover:shadow-md transition-all group"
                                    >
                                        <div className="flex-1 min-w-0 mr-4">
                                            <p className="font-bold text-slate-700 text-base truncate group-hover:text-blue-600 transition-colors tracking-tight">{item.source}</p>
                                            <p className="text-sm text-slate-500 truncate mt-0.5">{item.target}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded-lg border border-slate-100 shrink-0">{item.time}</span>
                                            <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : <EmptyState text={user ? "Chưa có lịch sử dịch gần đây" : "Đăng nhập để xem lịch sử"} />}
                    </SectionBox>

                    <div>
                        <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2 mb-5 px-1">
                            <BookOpenText size={22} className="text-blue-600" /> Chủ đề bài tập
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {[
                                { id: 'hiragana', name: 'Bảng Hiragana' },
                                { id: 'numbers', name: 'Số đếm' },
                                { id: 'food', name: 'Ẩm thực' },
                                { id: 'animals', name: 'Động vật' },
                                { id: 'weather', name: 'Thời tiết' },
                                { id: 'family', name: 'Gia đình' },
                            ].map((topic) => (
                                <Link key={topic.id} href={`/exercises/${topic.id}`} className="p-5 rounded-2xl bg-white border border-slate-100 text-slate-600 font-bold text-base text-center transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600 flex items-center justify-center min-h-[70px]">
                                    {topic.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm hover:shadow-lg transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6 relative z-10">
                            <FileText size={22} className="text-blue-600" /> Kết quả thi gần nhất
                        </h3>
                        <div className="text-center py-5 relative z-10">
                            {loadingData ? <div className="h-24 w-40 mx-auto bg-slate-100 rounded-xl animate-pulse"></div> :
                                (user && history.test) ? (
                                    <div className="animate-in zoom-in duration-300">
                                        <div className="text-6xl font-black text-slate-800 tracking-tighter">{history.test.lastScore}<span className="text-2xl text-slate-400 font-bold">/{history.test.total}</span></div>
                                        <p className="text-base font-bold text-slate-500 mt-2 line-clamp-1 px-4">{history.test.name}</p>
                                        <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">{history.test.date}</span>
                                    </div>
                                ) : <p className="text-slate-400 text-sm italic py-2">{user ? 'Chưa có dữ liệu thi thử.' : 'Đăng nhập để xem điểm thi.'}</p>}
                        </div>
                        <Link href="/tests" className="block w-full py-3.5 bg-slate-800 text-white text-center font-bold rounded-xl text-sm hover:bg-slate-700 hover:shadow-lg transition-all mt-6 relative z-10">
                            Làm đề thi thử
                        </Link>
                    </div>

                    <SectionBox title="Danh sách bộ thẻ mẫu" icon={<BookOpen size={22} className="text-blue-600" />} link="/flashcards" linkText="Xem tất cả">
                        {loadingData ? <SkeletonList /> : (user && history.decks.length > 0) ? (
                            <div className="space-y-3">
                                {history.decks.map((deck: { id: string; title: string; count: number }, idx: number) => (
                                    <Link
                                        key={idx}
                                        href={`/flashcards/${deck.id}`}
                                        className="flex items-center gap-4 p-4 bg-slate-50/50 border border-slate-100 rounded-2xl hover:bg-white hover:border-blue-400 hover:shadow-md transition-all group"
                                    >
                                        <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0 shadow-sm">
                                            <BookOpen size={22} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="font-black text-slate-800 text-sm truncate group-hover:text-blue-600 transition-colors uppercase tracking-tight">{deck.title}</span>
                                                <span className="text-[8px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-black uppercase tracking-widest shrink-0">Official</span>
                                            </div>
                                            <p className="text-xs text-slate-500 font-bold mt-1">{deck.count} thẻ ghi nhớ</p>
                                        </div>
                                        <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        ) : <EmptyState text={user ? "Chưa có bộ thẻ mẫu nào" : "Đăng nhập để xem bộ thẻ"} />}
                    </SectionBox>

                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/roleplay" className="p-5 bg-blue-600 text-white rounded-2xl text-center hover:bg-blue-700 hover:scale-[1.03] transition-all shadow-lg shadow-blue-200/50">
                            <Zap size={28} className="mx-auto mb-3 opacity-90" />
                            <span className="font-semibold text-sm block">Roleplay AI</span>
                        </Link>
                        <Link href="/games" className="p-5 bg-slate-700 text-white rounded-2xl text-center hover:bg-slate-800 hover:scale-[1.03] transition-all shadow-lg shadow-slate-200/50">
                            <Gamepad2 size={28} className="mx-auto mb-3 opacity-90" />
                            <span className="font-semibold text-sm block">Game Vui</span>
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
        <div className="bg-white rounded-[2rem] border border-slate-100 p-7 shadow-sm hover:border-blue-100 transition-colors">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-slate-800 text-xl flex items-center gap-3">{icon} {title}</h3>
                {link && <Link href={link} className="text-xs text-blue-600 font-black hover:bg-blue-50 px-4 py-2 rounded-xl transition-all border border-blue-50 hover:shadow-sm">{linkText}</Link>}
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
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-[420px] overflow-hidden relative border border-white/20">

                {/* Loading Overlay */}
                {loading && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
                        <Loader2 size={32} className="animate-spin text-blue-600" />
                    </div>
                )}

                {/* Header Section */}
                <div className="pt-8 pb-5 px-6 text-center">
                    <h2 className="text-xl font-bold text-slate-800">Mục tiêu của bạn là gì?</h2>
                </div>

                {/* Options Section */}
                <div className="px-6 pb-6 w-full">
                    <div className="space-y-2.5">
                        {levels.map((lvl) => (
                            <button
                                key={lvl.id}
                                onClick={() => handleSubmit(lvl.id)}
                                disabled={loading}
                                className="w-full relative group p-3 rounded-2xl border-2 border-slate-50 hover:border-blue-500 bg-white hover:bg-blue-50/50 transition-all text-left flex items-center gap-3"
                            >
                                {/* Level Badge */}
                                <div className="w-10 h-10 rounded-[10px] bg-slate-50 group-hover:bg-blue-100 flex items-center justify-center font-black text-[15px] transition-colors shrink-0 outline outline-1 outline-slate-100 group-hover:outline-blue-200">
                                    <span className="text-slate-600 group-hover:text-blue-700">{lvl.id}</span>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="font-bold text-slate-800 group-hover:text-blue-700 text-[14px] leading-snug">{lvl.t.replace(lvl.id, '').trim()}</div>
                                    <div className="text-[12px] text-slate-500 font-medium mt-0.5">{lvl.d}</div>
                                </div>

                                {/* Arrow */}
                                <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        ))}
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100/80 flex justify-center">
                        <button
                            onClick={handleSkipAction}
                            disabled={loading}
                            className="text-[13px] text-slate-400 font-bold hover:text-slate-600 transition-colors disabled:opacity-50"
                        >
                            Quyết định sau
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
