// components/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react'; // ✅ Thêm useRef
import { 
  BookOpen, Zap, MapPin, ClipboardList, Users, 
  Search, LogOut, LogIn, UserPlus, Gift, X, CheckCircle, CreditCard, Loader
} from 'lucide-react';

import { useAuth } from '@/context/AuthContext';

// ✅ Định nghĩa kiểu dữ liệu cho gợi ý (giống bên TranslationPanel)
type SuggestItem = {
  id: string;
  lemma: string;
  reading?: string | null;
  romaji?: string | null;
  posTag: string;
  meaningVi?: string | null;
};

const NAV_ITEMS = [
  { href: '/flashcards', label: 'Flashcards', icon: BookOpen },
  { href: '/roleplay', label: 'Roleplay AI', icon: Zap },
  { href: '/roadmap', label: 'Lộ trình JLPT', icon: MapPin },
  { href: '/exercises', label: 'Bài tập', icon: ClipboardList },
  { href: '/community', label: 'Cộng đồng', icon: Users },
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
  
  // ✅ States cho Search & Suggest
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestItem[]>([]); // Danh sách gợi ý
  const [showSuggest, setShowSuggest] = useState(false); // Ẩn/hiện dropdown
  const searchRef = useRef<HTMLFormElement>(null); // Để bắt sự kiện click ra ngoài

  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    if (user) {
       refreshProfile();
    }
  }, []);

  // ✅ Effect: Tự động tắt dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggest(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Effect: Gọi API Suggest khi user gõ (Debounce 300ms)
  useEffect(() => {
    const q = query.trim();
    // Điều kiện: phải gõ > 1 ký tự và không chứa khoảng trắng (từ đơn)
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
          body: JSON.stringify({ query: q, source: 'ja', limit: 5 }), // Lấy 5 kết quả thôi cho gọn
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
    }, 300); // Đợi 300ms sau khi ngừng gõ mới gọi API

    return () => clearTimeout(timer);
  }, [query]);

  const handleNavClick = (href: string) => {
    setIsNavigating(true);
    router.push(href);
    setTimeout(() => setIsNavigating(false), 1000);
  }; 

  const handleLogout = () => logout();

  // Submit bằng phím Enter hoặc nút Search
  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setShowSuggest(false); // Tắt gợi ý
    router.push(`/translate?text=${encodeURIComponent(query.trim())}`);
  };

  // ✅ Click vào một từ trong danh sách gợi ý
  const handleSelectSuggestion = (lemma: string) => {
    setQuery(lemma);
    setShowSuggest(false);
    router.push(`/translate?text=${encodeURIComponent(lemma)}`);
  };

  const handleActivatePremium = async (action: 'trial' | 'buy_1_month') => {
    if (!user) return alert("Vui lòng đăng nhập trước!");
    
    setProcessing(true);
    try {
        if (action === 'buy_1_month') {
            const token = getCookie('session_token');
            const res = await fetch('/api/payment/create-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify({})
            });
            const data = await res.json();
            
            if (data.success && data.checkoutUrl) {
                window.location.href = data.checkoutUrl;
            } else {
                alert("Lỗi tạo giao dịch: " + (data.error || "Không xác định"));
            }
            return; 
        }

        const res = await fetch('/api/user/premium', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email: user.email, action })
        });
        const data = await res.json();

        if (res.ok) {
            alert(data.message);
            await refreshProfile(); 
            setShowPremiumModal(false);
            window.location.reload(); 
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error(error);
        alert("Có lỗi xảy ra.");
    } finally {
        setProcessing(false);
    }
  };

  const isPremiumUser = user?.isPremium === true; 

  return (
    <>
    {isNavigating && (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 bg-white px-6 py-4 rounded-full shadow-lg border border-slate-100 z-[999]">
        <Loader size={20} className="animate-spin text-blue-600" />
        <span className="text-slate-700 font-medium">Đang tải...</span>
      </div>
    )}
    <header className="w-full bg-white shadow-sm border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 relative rounded-xl overflow-hidden bg-slate-50 shadow-sm group-hover:shadow-md transition-all">
              <Image src="/logo.png" alt="Logo" fill sizes="40px" style={{ objectFit: 'cover' }} />
            </div>
            <span className="text-2xl font-extrabold text-blue-600 select-none tracking-tight hidden sm:block">
              JapaLyze
            </span>
          </Link>
        </div>

        {/* NAV LINK & SEARCH */}
        <div className="flex-1 flex items-center justify-center gap-6 px-4">
          
          {/* ✅ SEARCH BAR CÓ DROPDOWN */}
          <form 
            ref={searchRef} 
            onSubmit={onSearchSubmit} 
            className="relative w-full max-w-md group hidden md:block z-50"
          >
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Tra từ nhanh (Nhật - Việt)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => { if(suggestions.length > 0) setShowSuggest(true); }} // Hiện lại khi focus
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-full py-2.5 pl-10 pr-12 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
            />
            {query && (
                <button 
                    type="button" 
                    onClick={() => { setQuery(''); setSuggestions([]); setShowSuggest(false); }}
                    className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
                >
                    <X size={14} />
                </button>
            )}
            <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-sm">
              <Search size={14} />
            </button>

            {/* ✅ DROPDOWN GỢI Ý */}
            {showSuggest && suggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <div className="max-h-80 overflow-y-auto">
                        {suggestions.map((s) => (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => handleSelectSuggestion(s.lemma)}
                                className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-slate-50 last:border-0 transition-colors flex items-center justify-between group"
                            >
                                <div>
                                    <div className="font-bold text-slate-800 group-hover:text-blue-700 text-sm">
                                        {s.lemma} {s.reading && <span className="font-normal text-slate-500 text-xs">({s.reading})</span>}
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

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button key={item.href} onClick={() => handleNavClick(item.href)} className="p-2.5 text-slate-500 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all group relative disabled:opacity-50" disabled={isNavigating}>
                <item.icon size={20} />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex-shrink-0 flex items-center gap-3">
          
          {!isPremiumUser && (
             <button 
                onClick={() => setShowPremiumModal(true)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-bold text-xs shadow-md hover:shadow-lg hover:scale-105 transition-all animate-pulse"
             >
                <Gift size={16} /> <span>Nâng cấp VIP</span>
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

              <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><LogOut size={20} /></button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden sm:flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-blue-600 font-medium transition-colors"><LogIn size={18} /><span>Đăng nhập</span></Link>
              <Link href="/register" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full font-medium shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"><UserPlus size={18} /><span>Đăng ký</span></Link>
            </div>
          )}
        </div>
      </div>
    </header>

    {/* MODAL - GIỮ NGUYÊN */}
    {showPremiumModal && (
        <div className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden relative flex flex-col md:flex-row">
                <button onClick={() => setShowPremiumModal(false)} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 z-10 text-slate-500"><X size={20}/></button>
                
                <div className="md:w-2/5 bg-gradient-to-br from-indigo-600 to-purple-700 p-8 flex flex-col justify-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
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
                    <p className="text-slate-500 text-center mb-8">Hủy bất kỳ lúc nào. Không ràng buộc.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-2 border-slate-200 hover:border-blue-400 bg-white p-6 rounded-2xl cursor-pointer transition-all hover:shadow-lg flex flex-col items-center text-center group">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"><Gift size={24} /></div>
                            <h4 className="font-bold text-lg text-slate-700">Dùng thử 7 ngày</h4>
                            <p className="text-blue-600 font-extrabold text-xl my-2">0đ</p>
                            <p className="text-xs text-slate-400 mb-4">Trải nghiệm full tính năng trong 1 tuần.</p>
                            <button onClick={() => handleActivatePremium('trial')} disabled={processing} className="w-full py-2 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50">
                                {processing ? 'Đang xử lý...' : 'Bắt đầu ngay'}
                            </button>
                        </div>
                        <div className="border-2 border-orange-200 hover:border-orange-400 bg-white p-6 rounded-2xl cursor-pointer transition-all hover:shadow-lg flex flex-col items-center text-center group relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"><CreditCard size={24} /></div>
                            <h4 className="font-bold text-lg text-slate-700">Gói 1 Tháng</h4>
                            <p className="text-orange-600 font-extrabold text-xl my-2">99.000đ</p>
                            <p className="text-xs text-slate-400 mb-4">Chỉ ~3k/ngày. Thanh toán 1 lần.</p>
                            <button onClick={() => handleActivatePremium('buy_1_month')} disabled={processing} className="w-full py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-orange-200 hover:shadow-lg transition-all disabled:opacity-50">
                                {processing ? 'Đang xử lý...' : 'Nạp ngay'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
    </>
  );
}