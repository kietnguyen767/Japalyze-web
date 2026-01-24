// components/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { 
  // Icon cũ
  BookOpen, Zap, ClipboardList, Users, Search, LogOut, LogIn, UserPlus, Gift, X, Loader, Menu, CheckCircle, CreditCard,
  // Icon mới
  Languages,      // Cho Dịch thuật
  BookOpenText,   // Cho Luyện đọc
  FileText,       // Cho Thi thử
  Gamepad2, Map        // Cho Trò chơi
} from 'lucide-react';

import { useAuth } from '@/context/AuthContext';

// --- Types ---
type SuggestItem = {
  id: string;
  lemma: string;
  reading?: string | null;
  romaji?: string | null;
  posTag: string;
  meaningVi?: string | null;
};

// ✅ CẤU HÌNH MENU: Đã thêm lại "Bài tập"
const NAV_ITEMS = [
  { href: '/translate', label: 'Dịch thuật', icon: Languages },    // 1. Công cụ chính
  { href: '/flashcards', label: 'Flashcards', icon: BookOpen }, 
  { href: '/roadmap', label: 'Lộ trình JLPT', icon: Map },   
  { href: '/exercises', label: 'Bài tập', icon: ClipboardList },   // 3. ✅ Đã khôi phục       // 4. Giao lưu
  { href: '/reading', label: 'Luyện đọc', icon: BookOpenText },    // 5. Kỹ năng đọc
  { href: '/tests', label: 'Thi thử', icon: FileText },            // 6. Luyện đề JLPT
  { href: '/roleplay', label: 'Roleplay AI', icon: Zap },          // 7. Luyện nói
  { href: '/games', label: 'Trò chơi', icon: Gamepad2 },
  { href: '/community', label: 'Cộng đồng', icon: Users },             // 8. Giải trí
];

function getCookie(name: string) {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
}

export default function Navbar() {
  const { user, logout, refreshProfile } = useAuth(); 
  const router = useRouter();
  
  // --- STATES ---
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestItem[]>([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const searchRef = useRef<HTMLFormElement>(null);

  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // 📱 Mobile States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false); 

  useEffect(() => {
    if (user) refreshProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggest(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // API Suggest Logic
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setSuggestions([]);
      setShowSuggest(false);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch('/api/suggest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: q, source: 'ja', limit: 5 }),
        });
        const data = await res.json();
        if (data.success && data.items?.length > 0) {
            setSuggestions(data.items);
            setShowSuggest(true);
        } else {
            setSuggestions([]);
            setShowSuggest(false);
        }
      } catch (error) {
        console.error("Suggest error", error);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleNavClick = (href: string) => {
    setIsNavigating(true);
    setIsMobileMenuOpen(false); 
    router.push(href);
    setTimeout(() => setIsNavigating(false), 1000);
  }; 

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setShowSuggest(false);
    setIsMobileSearchOpen(false);
    router.push(`/translate?text=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectSuggestion = (lemma: string) => {
    setQuery(lemma);
    setShowSuggest(false);
    setIsMobileSearchOpen(false);
    router.push(`/translate?text=${encodeURIComponent(lemma)}`);
  };

  // Logic Premium Demo
  const handleActivatePremium = async (action: 'trial' | 'buy_1_month') => {
    if (!user) return alert("Vui lòng đăng nhập trước!");
    setProcessing(true);
    setTimeout(() => {
        setProcessing(false);
        alert("Demo click: " + action);
    }, 1000);
  };

  const isPremiumUser = user?.isPremium === true; 

  return (
    <>
    {isNavigating && (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 bg-white px-6 py-4 rounded-full shadow-lg border border-slate-100 z-[1000]">
        <Loader size={20} className="animate-spin text-blue-600" />
        <span className="text-slate-700 font-medium">Đang chuyển trang...</span>
      </div>
    )}

    <header className="w-full bg-white shadow-sm border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-2 md:gap-4 relative">
        
        {/* 1. LOGO */}
        <div className={`flex-shrink-0 transition-opacity duration-200 ${isMobileSearchOpen ? 'opacity-0 w-0 pointer-events-none' : 'opacity-100'}`}>
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 md:w-10 md:h-10 relative rounded-xl overflow-hidden bg-slate-50 shadow-sm">
              <Image src="/logo(4).png" alt="Logo" fill sizes="40px" style={{ objectFit: 'cover' }} />
            </div>
            <span className="text-xl md:text-2xl font-extrabold text-blue-600 tracking-tight hidden sm:block">
              JapaLyze
            </span>
          </Link>
        </div>

        {/* 2. SEARCH BAR */}
        <div className={`flex-1 flex justify-center md:justify-start md:px-4 transition-all duration-300 ${isMobileSearchOpen ? 'absolute left-0 w-full px-2 z-50' : ''}`}>
             
             {isMobileSearchOpen && (
                 <button onClick={() => setIsMobileSearchOpen(false)} className="mr-2 md:hidden text-slate-500">
                     <X size={24} />
                 </button>
             )}

             <form 
               ref={searchRef} 
               onSubmit={onSearchSubmit} 
               className={`relative w-full max-w-md group ${!isMobileSearchOpen ? 'hidden md:block' : 'block'}`}
             >
               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                 <Search size={18} />
               </div>
               <input
                 type="text"
                 placeholder="Tra từ, ví dụ, ngữ pháp..."
                 value={query}
                 onChange={(e) => setQuery(e.target.value)}
                 autoFocus={isMobileSearchOpen}
                 className="w-full bg-slate-100 border-transparent focus:bg-white border focus:border-blue-400 text-slate-700 text-sm rounded-full py-2.5 pl-10 pr-10 outline-none transition-all shadow-inner focus:shadow-md"
               />
                {query && (
                    <button type="button" onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <X size={14} />
                    </button>
                )}

               {/* Dropdown Gợi ý */}
               {showSuggest && suggestions.length > 0 && (
                 <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-[60]">
                   <div className="max-h-[60vh] overflow-y-auto">
                     {suggestions.map((s) => (
                       <button
                         key={s.id}
                         type="button"
                         onClick={() => handleSelectSuggestion(s.lemma)}
                         className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-slate-50 flex items-center justify-between"
                       >
                         <div>
                           <div className="font-bold text-slate-800 text-sm">
                             {s.lemma} <span className="font-normal text-slate-500 text-xs">({s.reading})</span>
                           </div>
                           {s.meaningVi && <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{s.meaningVi}</div>}
                         </div>
                         <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase">{s.posTag}</span>
                       </button>
                     ))}
                   </div>
                 </div>
               )}
             </form>
        </div>

        {/* 3. MENU DESKTOP */}
        <nav className="hidden lg:flex items-center gap-1">
           {NAV_ITEMS.map((item) => (
             <button 
                key={item.href} 
                onClick={() => handleNavClick(item.href)} 
                className="p-2.5 text-slate-500 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all group relative"
             >
               <item.icon size={20} />
               <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg font-medium">
                 {item.label}
               </span>
             </button>
           ))}
        </nav>

        {/* 4. RIGHT ACTIONS */}
        <div className={`flex items-center gap-2 md:gap-3 ${isMobileSearchOpen ? 'hidden' : 'flex'}`}>
            
            <button 
                onClick={() => setIsMobileSearchOpen(true)} 
                className="md:hidden p-2 text-slate-600 bg-slate-50 rounded-full hover:bg-blue-50 hover:text-blue-600"
            >
                <Search size={20} />
            </button>

            {!isPremiumUser && (
                <button 
                onClick={() => setShowPremiumModal(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-bold text-xs shadow-md animate-pulse"
                >
                <Gift size={16} /> <span className="hidden lg:inline">Nâng cấp VIP</span>
                </button>
            )}

            {user ? (
                 <div className="flex items-center gap-4">
                  <div className={`relative group transition-all duration-500 ${isPremiumUser ? 'p-[2px] rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-pulse' : ''}`}>
                    <div className={`flex items-center gap-3 px-3 py-1.5 rounded-md ${isPremiumUser ? 'bg-white' : ''}`}>
                        <div className="hidden md:block text-right">
                            <p className="text-xs text-slate-500">Xin chào,</p>
                            <p className={`text-sm font-bold max-w-[100px] truncate ${isPremiumUser ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600' : 'text-slate-700'}`}>
                                {user.name}
                            </p>
                        </div>
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold shadow-sm text-sm leading-none ${isPremiumUser ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-blue-600'}`}>
                            {user.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                    </div>
                  </div>

                  <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Đăng xuất">
                    <LogOut size={20} />
                  </button>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login" className="hidden sm:flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-blue-600 font-medium transition-colors">
                    <LogIn size={18} /><span>Đăng nhập</span>
                  </Link>
                  <Link href="/register" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full font-medium shadow-md hover:bg-blue-700 hover:shadow-lg transition-all">
                    <UserPlus size={18} /><span>Đăng ký</span>
                  </Link>
                </div>
            )}

            <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
                <Menu size={24} />
            </button>
        </div>
      </div>
    </header>

    {/* ✨ MOBILE MENU DRAWER */}
    {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[1001] lg:hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
            
            <div className="absolute top-0 right-0 w-3/4 max-w-sm h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <span className="font-bold text-lg text-slate-800">Menu</span>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white rounded-full shadow-sm text-slate-500"><X size={20}/></button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {/* User Info Mobile */}
                    {user ? (
                        <div className="bg-blue-50 p-4 rounded-2xl mb-4 flex items-center gap-3">
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${isPremiumUser ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-blue-600'}`}>
                                {user.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="overflow-hidden">
                                <p className="font-bold text-slate-800 truncate">{user.name}</p>
                                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                            </div>
                        </div>
                    ) : (
                         <div className="grid grid-cols-2 gap-3 mb-6">
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50">
                                <LogIn size={18}/> Đăng nhập
                            </Link>
                            <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">
                                <UserPlus size={18}/> Đăng ký
                            </Link>
                        </div>
                    )}

                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2">Tính năng</p>
                    {NAV_ITEMS.map((item) => (
                        <button 
                            key={item.href} 
                            onClick={() => handleNavClick(item.href)} 
                            className="w-full flex items-center gap-4 p-3 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium"
                        >
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:text-blue-600 group-hover:bg-white">
                                <item.icon size={18} />
                            </div>
                            {item.label}
                        </button>
                    ))}

                    <div className="border-t border-slate-100 my-4 pt-4">
                        {!isPremiumUser && (
                             <button onClick={() => {setShowPremiumModal(true); setIsMobileMenuOpen(false)}} className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-bold shadow-md mb-3 flex items-center justify-center gap-2">
                                <Gift size={18}/> Nâng cấp Premium
                             </button>
                        )}
                        {user && (
                            <button onClick={handleLogout} className="w-full py-3 border border-red-100 text-red-600 bg-red-50 rounded-xl font-bold flex items-center justify-center gap-2">
                                <LogOut size={18}/> Đăng xuất
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )}

    {/* MODAL PREMIUM */}
    {showPremiumModal && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
             <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden relative flex flex-col md:flex-row">
                <button onClick={() => setShowPremiumModal(false)} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 z-10 text-slate-500"><X size={20}/></button>
                <div className="md:w-2/5 bg-gradient-to-br from-indigo-600 to-purple-700 p-8 flex flex-col justify-center text-white relative overflow-hidden">
                    <h2 className="text-3xl font-extrabold mb-4 relative z-10">Mở khóa toàn bộ tiềm năng Nhật ngữ!</h2>
                    <ul className="space-y-4 relative z-10 text-indigo-100">
                        <li className="flex gap-2 items-center"><CheckCircle size={20}/> Truy cập 100% Hội thoại</li>
                        <li className="flex gap-2 items-center"><CheckCircle size={20}/> Không giới hạn bài tập</li>
                        <li className="flex gap-2 items-center"><CheckCircle size={20}/> Huy hiệu VIP lấp lánh</li>
                        <li className="flex gap-2 items-center"><CheckCircle size={20}/> Hỗ trợ 24/7</li>
                    </ul>
                </div>
                <div className="md:w-3/5 p-8 md:p-12 bg-slate-50">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2 text-center">Chọn gói của bạn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="border-2 border-slate-200 hover:border-blue-400 bg-white p-6 rounded-2xl cursor-pointer transition-all hover:shadow-lg flex flex-col items-center text-center group">
                            <h4 className="font-bold text-lg text-slate-700">Dùng thử 7 ngày</h4>
                            <p className="text-blue-600 font-extrabold text-xl my-2">0đ</p>
                            <button onClick={() => handleActivatePremium('trial')} disabled={processing} className="w-full py-2 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all">Bắt đầu ngay</button>
                        </div>
                        <div className="border-2 border-orange-200 hover:border-orange-400 bg-white p-6 rounded-2xl cursor-pointer transition-all hover:shadow-lg flex flex-col items-center text-center group relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
                            <h4 className="font-bold text-lg text-slate-700">Gói 1 Tháng</h4>
                            <p className="text-orange-600 font-extrabold text-xl my-2">99.000đ</p>
                            <button onClick={() => handleActivatePremium('buy_1_month')} disabled={processing} className="w-full py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-orange-200 hover:shadow-lg transition-all">Nạp ngay</button>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    )}
    </>
  );
}