// components/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import {
  // Icon cũ
  BookOpen, Zap, ClipboardList, Users, Search, LogOut, LogIn, UserPlus, Gift, X, Loader, Menu, CheckCircle, CreditCard,
  Crown, Sparkles, CheckCircle2, Lock, Loader2,
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
  const { user, logout, refreshUser } = useAuth();
  const router = useRouter();

  // --- STATES ---
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestItem[]>([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const searchRef = useRef<HTMLFormElement>(null);

  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  // Form Đổi mật khẩu
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  // 📱 Mobile States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    if (user) refreshUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggest(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
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
        // Kiểm tra xem có phải tiếng Việt không (có dấu hoặc ký tự đặc biệt VN)
        const isVietnamese = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(q);

        const res = await fetch('/api/suggest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: q,
            source: isVietnamese ? 'vi' : 'ja',
            limit: 5
          }),
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
    setIsMobileMenuOpen(false);
    router.push(href);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Mật khẩu mới nhập lại không khớp');
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPasswordSuccess('Đổi mật khẩu thành công!');
        setTimeout(() => {
          setShowChangePasswordModal(false);
          setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
          setPasswordSuccess('');
        }, 2000);
      } else {
        setPasswordError(data.message || 'Có lỗi xảy ra');
      }
    } catch (err) {
      setPasswordError('Lỗi kết nối server');
    } finally {
      setPasswordLoading(false);
    }
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

  // Logic Premium - Kết nối API thật
  const handleActivatePremium = async (action: 'trial' | 'buy_1_month') => {
    if (!user) return alert("Vui lòng đăng nhập trước!");
    setProcessing(true);

    try {
      if (action === 'buy_1_month') {
        // Lấy session token từ cookie để gửi lên create-link
        const token = getCookie('session_token');
        if (!token) {
          alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
          setProcessing(false);
          return;
        }

        const res = await fetch('/api/payment/create-link', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.error || "Không thể tạo link thanh toán. Vui lòng thử lại.");
          setProcessing(false);
          return;
        }

        // Redirect sang trang thanh toán PayOS
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
        }

      } else if (action === 'trial') {
        const res = await fetch('/api/user/premium', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email, action: 'trial' }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.error || "Không thể kích hoạt dùng thử.");
          setProcessing(false);
          return;
        }

        alert(data.message || "Kích hoạt 7 ngày dùng thử thành công!");
        await refreshUser();
        setShowPremiumModal(false);
      }
    } catch (err) {
      alert("Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setProcessing(false);
    }
  };

  const isPremiumUser = user?.isPremium === true;

  return (
    <>

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
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className={`flex items-center gap-3 px-3 py-1.5 rounded-md transition-all duration-500 ${isPremiumUser ? 'p-[2px] rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-pulse' : ''}`}
                >
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
                </button>

                {showDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                    <div className="p-4 border-b border-slate-100">
                      <p className="font-bold text-slate-800 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          setShowChangePasswordModal(true);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Lock size={16} className="text-slate-400" />
                        Đổi mật khẩu
                      </button>
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-slate-50"
                      >
                        <LogOut size={16} />
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
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
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white rounded-full shadow-sm text-slate-500"><X size={20} /></button>
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
                    <LogIn size={18} /> Đăng nhập
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">
                    <UserPlus size={18} /> Đăng ký
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
                {user && (
                  <button onClick={() => { setIsMobileMenuOpen(false); setShowChangePasswordModal(true); }} className="w-full py-3 border border-slate-100 text-slate-600 bg-slate-50 rounded-xl font-bold flex items-center justify-center gap-2 mb-3">
                    <Lock size={18} /> Đổi mật khẩu
                  </button>
                )}
                {!isPremiumUser && (
                  <button onClick={() => { setShowPremiumModal(true); setIsMobileMenuOpen(false) }} className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-bold shadow-md mb-3 flex items-center justify-center gap-2">
                    <Gift size={18} /> Nâng cấp Premium
                  </button>
                )}
                {user && (
                  <button onClick={handleLogout} className="w-full py-3 border border-red-100 text-red-600 bg-red-50 rounded-xl font-bold flex items-center justify-center gap-2">
                    <LogOut size={18} /> Đăng xuất
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Đổi mật khẩu */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800">Đổi mật khẩu</h3>
                <button
                  onClick={() => setShowChangePasswordModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {passwordSuccess ? (
                <div className="py-8 text-center">
                  <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <p className="text-green-600 font-medium">{passwordSuccess}</p>
                </div>
              ) : (
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Mật khẩu cũ</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="••••••••"
                      required
                      value={passwordForm.oldPassword}
                      onChange={e => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Mật khẩu mới</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Tối thiểu 8 ký tự"
                      required
                      value={passwordForm.newPassword}
                      onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Xác nhận mật khẩu mới</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Nhập lại mật khẩu mới"
                      required
                      value={passwordForm.confirmPassword}
                      onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    />
                  </div>

                  {passwordError && (
                    <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{passwordError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {passwordLoading ? <Loader2 className="animate-spin" /> : 'Cập nhật mật khẩu'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL PREMIUM NÂNG CẤP */}
      {showPremiumModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowPremiumModal(false)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in slide-in-from-bottom-8 duration-300">
            <button
              onClick={() => setShowPremiumModal(false)}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full z-20 text-white transition-colors"
            >
              <X size={20} />
            </button>

            {/* Cột trái: Brand & Benefits */}
            <div className="md:w-5/12 bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 p-8 md:p-10 flex flex-col justify-center text-white relative overflow-hidden">

              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight tracking-tight">
                  Nâng cấp <br /><span className="text-yellow-400/90">Premium</span>
                </h2>
                <ul className="space-y-4">
                  {[
                    { text: 'Mở khóa 100% nội dung học tập', icon: CheckCircle2 },
                    { text: 'Luyện nói không giới hạn với AI', icon: Zap },
                    { text: 'Huy hiệu VIP lấp lánh trên profile', icon: Sparkles },
                    { text: 'Ưu tiên hỗ trợ & tính năng mới nhất', icon: CheckCircle2 },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-center text-sm font-medium text-slate-300">
                      <item.icon size={18} className="text-yellow-400/60 shrink-0" />
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Cột phải: Pricing */}
            <div className="md:w-7/12 p-8 md:p-10 bg-white flex flex-col justify-center">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Chọn gói của bạn</h3>
                <p className="text-slate-500 text-sm">Bắt đầu hành trình chinh phục tiếng Nhật ngay hôm nay</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* GÓI DÙNG THỬ */}
                <div
                  onClick={() => handleActivatePremium('trial')}
                  className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all hover:shadow-md cursor-pointer group flex flex-col h-full"
                >
                  <div className="mb-4">
                    <h4 className="font-bold text-slate-400 text-[10px] uppercase tracking-widest mb-1">Cơ bản</h4>
                    <span className="text-lg font-bold text-slate-800">Dùng thử</span>
                  </div>
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-1 mb-5">
                      <span className="text-2xl font-bold text-slate-800">0đ</span>
                      <span className="text-slate-400 text-xs">/ 7 ngày</span>
                    </div>
                    <button className="w-full py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all text-xs">
                      BẮT ĐẦU NGAY
                    </button>
                  </div>
                </div>

                {/* GÓI 1 THÁNG */}
                <div
                  onClick={() => handleActivatePremium('buy_1_month')}
                  className="bg-white p-6 rounded-2xl border border-orange-100 ring-4 ring-orange-50/50 hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden flex flex-col h-full"
                >
                  <div className="absolute top-0 right-0 bg-orange-500 text-white text-[9px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    Phổ biến
                  </div>
                  <div className="mb-4">
                    <h4 className="font-bold text-orange-400 text-[10px] uppercase tracking-widest mb-1">Premium</h4>
                    <span className="text-lg font-bold text-slate-800">Gói 1 Tháng</span>
                  </div>
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-1 mb-5">
                      <span className="text-2xl font-bold text-orange-600">59k</span>
                      <span className="text-slate-400 text-xs">/ tháng</span>
                    </div>
                    <button className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-md shadow-orange-100 transition-all text-xs">
                      MUA NGAY
                    </button>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-center text-[9px] text-slate-400 font-medium uppercase tracking-widest leading-loose">
                Thanh toán an toàn qua cổng PayOS • Bảo mật 100%
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}