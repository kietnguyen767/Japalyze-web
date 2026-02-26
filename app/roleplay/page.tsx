// app/roleplay/page.tsx
'use client';

import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Check, Crown, Lock, Globe, MessageSquare, Zap, X, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
// Import TOPICS từ logic
import { CHARACTERS, Character, TOPICS, Topic } from './logic';
import ChatSession from '@/components/roleplay/ChatSession';

// Helper to get cookie
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};

export default function RoleplayPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  // State lưu 3 nhiệm vụ đã được hệ thống random
  const [systemMissions, setSystemMissions] = useState<string[]>([]);
  const [hoveredChar, setHoveredChar] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { refreshUser } = useAuth();

  // 1. Chọn Nhân vật
  const handleCharacterSelect = (char: Character) => {
    if (!user) { router.push('/login'); return; }
    setSelectedChar(char);
    setStep(2);
  };

  // 2. Chọn Chủ đề & Random Nhiệm vụ (CORE LOGIC)
  const handleTopicSelect = (topic: Topic) => {
    // Kiểm tra Premium
    if (user && !user.isPremium) {
      setShowUpgradeModal(true);
      return;
    }

    // Thuật toán: Trộn ngẫu nhiên mảng missionPool rồi lấy 3 cái đầu
    const shuffled = [...topic.missionPool].sort(() => 0.5 - Math.random());
    const random3Missions = shuffled.slice(0, 3);

    // Lưu vào State để truyền sang màn hình Chat
    setSelectedTopic(topic);
    setSystemMissions(random3Missions);
    setStep(3);
  };

  const handlePremiumAction = async (action: 'trial' | 'buy_1_month') => {
    if (!user) return router.push('/login');
    setProcessing(true);

    try {
      if (action === 'buy_1_month') {
        const token = getCookie('session_token');
        if (!token) return router.push('/login');

        const res = await fetch('/api/payment/create-link', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        const data = await res.json();
        if (data.checkoutUrl) window.location.href = data.checkoutUrl;
      } else {
        const res = await fetch('/api/user/premium', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email, action: 'trial' }),
        });
        if (res.ok) {
          alert("Kích hoạt dùng thử thành công!");
          await refreshUser();
          setShowUpgradeModal(false);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 pb-20">
      <div className="container mx-auto px-4 pt-6 md:pt-10 max-w-5xl relative z-0">

        {/* Progress Bar (Giữ nguyên UI cũ) */}
        <div className="flex items-center justify-center mb-6 md:mb-10 gap-2 md:gap-3">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-2 transition-all ${step >= s ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= s ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                  {step > s ? <Check size={16} /> : s}
                </div>
              </div>
              {s < 3 && <div className={`w-8 md:w-12 h-0.5 ${step > s ? 'bg-blue-600' : 'bg-slate-200'}`}></div>}
            </React.Fragment>
          ))}
        </div>

        {/* STEP 1: CHỌN NHÂN VẬT */}
        {step === 1 && (
          <div className="animate-fade-in pb-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Bước 1: Chọn bạn đồng hành</h2>
              <p className="text-slate-500 mt-2">Người sẽ luyện tập hội thoại cùng bạn</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {CHARACTERS.map(char => (
                <div
                  key={char.id}
                  onClick={() => handleCharacterSelect(char)}
                  onMouseEnter={() => setHoveredChar(char.id)}
                  onMouseLeave={() => setHoveredChar(null)}
                  className={`bg-white p-5 rounded-3xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden group ${hoveredChar === char.id ? 'border-blue-400 shadow-xl scale-[1.02]' : 'border-slate-100 shadow-sm'
                    }`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl ${char.color}`}>
                      {char.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-800">{char.name}</h3>
                      <p className="text-sm text-slate-500">{char.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: CHỌN CHỦ ĐỀ (GRID) */}
        {step === 2 && selectedChar && (
          <div className="animate-slide-up max-w-4xl mx-auto pb-10">
            <button
              onClick={() => setStep(1)}
              className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 bg-white/50 px-4 py-2 rounded-xl text-sm font-medium"
            >
              <ArrowLeft size={16} /> Chọn lại nhân vật
            </button>

            <div className="text-center mb-8">
              <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl mb-3 ${selectedChar.color} ring-4 ring-white shadow-lg`}>
                {selectedChar.avatar}
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                Trò chuyện cùng {selectedChar.name}
              </h2>
              <p className="text-slate-600">Chọn tình huống bạn muốn luyện tập hôm nay</p>
            </div>

            {/* DANH SÁCH CHỦ ĐỀ CÓ SẴN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TOPICS.map((topic) => {
                const isLocked = user && !user.isPremium;
                return (
                  <div
                    key={topic.id}
                    onClick={() => handleTopicSelect(topic)}
                    className={`bg-white p-6 rounded-2xl border-2 cursor-pointer transition-all group relative overflow-hidden ${isLocked
                      ? 'border-slate-100 opacity-80'
                      : 'border-slate-100 hover:border-blue-500 hover:shadow-xl'
                      }`}
                  >

                    <div className="flex items-start justify-between mb-3">
                      <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{topic.emoji}</span>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {isLocked ? <Lock size={14} className="text-slate-400" /> : <Sparkles size={14} />}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: CHAT SESSION */}
        {step === 3 && selectedChar && selectedTopic && (
          <div className="animate-scale-up h-[calc(100vh-160px)] md:h-auto">
            <ChatSession
              character={selectedChar}
              topic={selectedTopic.title}
              // Quan trọng: Truyền 3 nhiệm vụ đã random vào đây
              assignedMissions={systemMissions}
              onBack={() => { setStep(2); setSelectedTopic(null); setSystemMissions([]); }}
            />
          </div>
        )}
      </div>

      {/* --- PREMIUM UPGRADE MODAL (UNIFIED UI) --- */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowUpgradeModal(false)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in slide-in-from-bottom-8 duration-300">
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full z-20 text-white transition-colors"
            >
              <X size={20} />
            </button>

            {/* Left: Benefits */}
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

            {/* Right: Pricing */}
            <div className="md:w-7/12 p-8 md:p-10 bg-white flex flex-col justify-center">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Chọn gói của bạn</h3>
                <p className="text-slate-500 text-sm">Bắt đầu hành trình chinh phục tiếng Nhật ngay</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* TRIAL */}
                <div
                  onClick={() => handlePremiumAction('trial')}
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
                    <button disabled={processing} className="w-full py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all text-xs">
                      BẮT ĐẦU NGAY
                    </button>
                  </div>
                </div>

                {/* 1 MONTH */}
                <div
                  onClick={() => handlePremiumAction('buy_1_month')}
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
                    <button disabled={processing} className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-md shadow-orange-100 transition-all text-xs">
                      MUA NGAY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out; }
        .animate-slide-up { animation: slide-up 0.4s ease-out; }
      `}</style>
    </div>
  );
}