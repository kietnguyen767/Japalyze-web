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
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200">
        <Navbar />
      </div>
      
      <div className="container mx-auto px-4 pt-9 max-w-5xl relative">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8 gap-3">
          <div className={`flex items-center gap-2 transition-all ${step >= 1 ? 'opacity-100' : 'opacity-30'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-200 text-slate-400'}`}>
              {step > 1 ? <Check size={16} /> : '1'}
            </div>
            <span className="text-sm font-medium text-slate-600 hidden sm:inline">Chọn nhân vật</span>
          </div>
          <div className={`w-12 h-0.5 transition-all ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
          <div className={`flex items-center gap-2 transition-all ${step >= 2 ? 'opacity-100' : 'opacity-30'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= 2 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-200 text-slate-400'}`}>
              {step > 2 ? <Check size={16} /> : '2'}
            </div>
            <span className="text-sm font-medium text-slate-600 hidden sm:inline">Chọn chủ đề</span>
          </div>
          <div className={`w-12 h-0.5 transition-all ${step >= 3 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
          <div className={`flex items-center gap-2 transition-all ${step >= 3 ? 'opacity-100' : 'opacity-30'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= 3 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-200 text-slate-400'}`}>
              3
            </div>
            <span className="text-sm font-medium text-slate-600 hidden sm:inline">Trò chuyện</span>
          </div>
        </div>

        {step === 1 && (
          <div className="animate-fade-in">
            <div className="text-center mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                <Sparkles size={16} />
                <span>Bước 1: Chọn người đồng hành</span>
              </div>
              
              <p className="text-slate-600 max-w-2xl mx-auto">
                Mỗi nhân vật có phong cách giao tiếp độc đáo giúp bạn trải nghiệm các ngữ cảnh khác nhau
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {CHARACTERS.map(char => (
                <div
                  key={char.id}
                  onClick={() => handleCharacterSelect(char)}
                  onMouseEnter={() => setHoveredChar(char.id)}
                  onMouseLeave={() => setHoveredChar(null)}
                  className={`bg-white p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 ${
                    hoveredChar === char.id 
                      ? 'border-blue-400 shadow-2xl scale-[1.02] -translate-y-1' 
                      : 'border-slate-200 shadow-md hover:shadow-xl'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl transition-all duration-300 ${char.color} ${
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
                      <p className="text-sm text-slate-500">{char.role}</p>
                    </div>
                  </div>
                  
                  <div className={`mt-4 pt-4 border-t ${hoveredChar === char.id ? 'border-slate-200' : 'border-slate-100'}`}>
                    <p className="text-xs text-slate-600 leading-relaxed">{char.personality}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && selectedChar && (
          <div className="animate-slide-up max-w-2xl mx-auto">
            <button 
              onClick={() => setStep(1)} 
              className="mb-3 flex items-center gap-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 px-4 py-2 rounded-xl transition-all text-sm font-medium group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
              Chọn lại nhân vật
            </button>
            
            <div className="bg-white px-8 py-3 rounded-3xl shadow-xl border border-slate-200">
              <div className="text-center mb-6">
                <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center text-5xl mb-4 ${selectedChar.color} shadow-lg`}>
                  {selectedChar.avatar}
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Trò chuyện cùng {selectedChar.name}
                </h2>
                <p className="text-sm text-slate-500">{selectedChar.role}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-2xl mb-6">
                <p className="text-xs text-slate-600 leading-relaxed text-center">
                  <span className="font-semibold">💡 Phong cách:</span> {selectedChar.personality}
                </p>
              </div>
              
              <div className="text-left mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  Chủ đề hôm nay là gì?
                </label>
                <input 
                  value={topic} 
                  onChange={(e) => setTopic(e.target.value)} 
                  placeholder="VD: Du lịch Nhật Bản..." 
                  className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                  autoFocus 
                />
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Du lịch Nhật Bản', 'Gọi món tại nhà hàng', 'Phỏng vấn xin việc', 'Tán gẫu sở thích'].map(goiy => (
                    <button 
                      key={goiy}
                      onClick={() => setTopic(goiy)} 
                      className="text-xs bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 px-4 py-2.5 rounded-xl transition-all border border-slate-200 hover:border-blue-300 hover:shadow-md font-medium"
                    >
                      {goiy}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={handleStartChat} 
                disabled={!topic.trim()} 
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all disabled:hover:shadow-lg group"
              >
                <MessageSquarePlus size={20} className="group-hover:scale-110 transition-transform" /> 
                Bắt đầu ngay
              </button>
            </div>
          </div>
        )}

        {step === 3 && selectedChar && (
          <div className="animate-scale-up">
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
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.4s ease-out; }
        .animate-slide-up { animation: slide-up 0.4s ease-out; }
        .animate-scale-up { animation: scale-up 0.4s ease-out; }
      `}</style>
    </div>
  );
}