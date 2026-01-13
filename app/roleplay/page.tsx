// app/roleplay/page.tsx
'use client';

import React, { useState } from 'react';
import { ArrowLeft, MessageSquarePlus, Sparkles, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { CHARACTERS } from './constants';
import { Character } from './types';
import ChatSession from '@/components/roleplay/ChatSession';

export default function RoleplayPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [topic, setTopic] = useState('');
  const [hoveredChar, setHoveredChar] = useState<string | null>(null);

  const handleCharacterSelect = (char: Character) => {
    if (!user) {
      router.push('/login');
      return;
    }
    setSelectedChar(char);
    setStep(2);
  };

  const handleStartChat = () => { if (topic.trim()) setStep(3); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 pb-20">
      
      {/* ✅ FIX 1: Chỉ gọi Navbar, KHÔNG bọc trong div sticky nào nữa */}
      {/* Navbar bên trong đã có z-50, nó sẽ tự nổi lên trên */}
      <Navbar />
      
      {/* ✅ FIX 2: Thêm 'relative z-0' để đảm bảo nội dung luôn nằm DƯỚI Navbar */}
      <div className="container mx-auto px-4 pt-6 md:pt-10 max-w-5xl relative z-0">
        
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-6 md:mb-10 gap-2 md:gap-3">
          {/* Step 1 */}
          <div className={`flex items-center gap-2 transition-all ${step >= 1 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-200 text-slate-400'}`}>
              {step > 1 ? <Check size={16} /> : '1'}
            </div>
            <span className="text-sm font-medium text-slate-600 hidden min-[400px]:inline">Nhân vật</span>
          </div>
          
          <div className={`w-8 md:w-12 h-0.5 transition-all ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
          
          {/* Step 2 */}
          <div className={`flex items-center gap-2 transition-all ${step >= 2 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= 2 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-200 text-slate-400'}`}>
              {step > 2 ? <Check size={16} /> : '2'}
            </div>
            <span className="text-sm font-medium text-slate-600 hidden min-[400px]:inline">Chủ đề</span>
          </div>
          
          <div className={`w-8 md:w-12 h-0.5 transition-all ${step >= 3 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
          
          {/* Step 3 */}
          <div className={`flex items-center gap-2 transition-all ${step >= 3 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= 3 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-200 text-slate-400'}`}>
              3
            </div>
            <span className="text-sm font-medium text-slate-600 hidden min-[400px]:inline">Chat</span>
          </div>
        </div>

        {/* --- STEP 1: CHỌN NHÂN VẬT --- */}
        {step === 1 && (
          <div className="animate-fade-in pb-10">
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm font-medium mb-4">
                <Sparkles size={16} />
                <span>Bước 1: Chọn người đồng hành</span>
              </div>
              
              <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base px-2">
                Mỗi nhân vật có phong cách giao tiếp độc đáo giúp bạn trải nghiệm các ngữ cảnh khác nhau
              </p>
            </div>
            
            {/* Grid responsive: 1 cột trên mobile, 2 cột trên tablet/desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto">
              {CHARACTERS.map(char => (
                <div
                  key={char.id}
                  onClick={() => handleCharacterSelect(char)}
                  onMouseEnter={() => setHoveredChar(char.id)}
                  onMouseLeave={() => setHoveredChar(null)}
                  className={`bg-white p-5 md:p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                    hoveredChar === char.id 
                      ? 'border-blue-400 shadow-xl scale-[1.02] -translate-y-1' 
                      : 'border-slate-100 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4 relative z-10">
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl md:text-4xl transition-all duration-300 ${char.color} ${
                      hoveredChar === char.id ? 'scale-110 rotate-6' : ''
                    }`}>
                      {char.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg transition-colors mb-1 ${
                        hoveredChar === char.id ? 'text-blue-600' : 'text-slate-800'
                      }`}>
                        {char.name}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-500 font-medium">{char.role}</p>
                    </div>
                  </div>
                  
                  <div className={`mt-4 pt-3 border-t relative z-10 ${hoveredChar === char.id ? 'border-blue-100' : 'border-slate-50'}`}>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{char.personality}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- STEP 2: CHỌN CHỦ ĐỀ --- */}
        {step === 2 && selectedChar && (
          <div className="animate-slide-up max-w-2xl mx-auto pb-10">
            <button 
              onClick={() => setStep(1)} 
              className="mb-4 flex items-center gap-2 text-slate-500 hover:text-slate-800 hover:bg-white px-3 py-2 rounded-xl transition-all text-sm font-medium"
            >
              <ArrowLeft size={16} /> 
              Chọn lại nhân vật
            </button>
            
            <div className="bg-white px-5 py-6 md:p-8 rounded-3xl shadow-xl border border-slate-200">
              <div className="text-center mb-6 md:mb-8">
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto flex items-center justify-center text-4xl md:text-5xl mb-4 ${selectedChar.color} shadow-lg ring-4 ring-white`}>
                  {selectedChar.avatar}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-1">
                  Trò chuyện cùng {selectedChar.name}
                </h2>
                <div className="inline-block bg-slate-100 px-3 py-1 rounded-lg text-xs font-medium text-slate-500 mt-2">
                   {selectedChar.role}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl mb-6 border border-blue-100/50">
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed text-center italic">
                  "<span className="font-semibold not-italic">Phong cách:</span> {selectedChar.personality}"
                </p>
              </div>
              
              <div className="text-left mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">
                  Chủ đề hôm nay là gì?
                </label>
                <input 
                  value={topic} 
                  onChange={(e) => setTopic(e.target.value)} 
                  placeholder="VD: Du lịch, Ăn uống, Công việc..." 
                  className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-base"
                  autoFocus 
                />
                
                <div className="mt-4">
                  <p className="text-xs text-slate-400 font-bold uppercase mb-2 ml-1">Gợi ý nhanh:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Du lịch Nhật Bản', 'Gọi món tại nhà hàng', 'Phỏng vấn xin việc', 'Tán gẫu sở thích', 'Hỏi đường'].map(goiy => (
                      <button 
                        key={goiy}
                        onClick={() => setTopic(goiy)} 
                        className="text-xs md:text-sm bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-700 px-3 py-2 md:px-4 md:py-2.5 rounded-xl transition-all border border-slate-200 hover:border-blue-300 hover:shadow-sm active:scale-95"
                      >
                        {goiy}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleStartChat} 
                disabled={!topic.trim()} 
                className="w-full py-3.5 md:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-base md:text-lg"
              >
                <MessageSquarePlus size={20} /> 
                Bắt đầu trò chuyện
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 3: MÀN HÌNH CHAT --- */}
        {step === 3 && selectedChar && (
          <div className="animate-scale-up h-[calc(100vh-160px)] md:h-auto">
            <ChatSession 
              character={selectedChar} 
              topic={topic} 
              onBack={() => { setStep(2); setTopic(''); }} 
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.4s ease-out; }
        .animate-slide-up { animation: slide-up 0.4s ease-out; }
        .animate-scale-up { animation: scale-up 0.3s ease-out; }
      `}</style>
    </div>
  );
}