// app/roleplay/page.tsx
'use client';

import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
// Import TOPICS từ logic
import { CHARACTERS, Character, TOPICS, Topic } from './logic';
import ChatSession from '@/components/roleplay/ChatSession';

export default function RoleplayPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  // State lưu 3 nhiệm vụ đã được hệ thống random
  const [systemMissions, setSystemMissions] = useState<string[]>([]);
  const [hoveredChar, setHoveredChar] = useState<string | null>(null);

  // 1. Chọn Nhân vật
  const handleCharacterSelect = (char: Character) => {
    if (!user) { router.push('/login'); return; }
    setSelectedChar(char);
    setStep(2);
  };

  // 2. Chọn Chủ đề & Random Nhiệm vụ (CORE LOGIC)
  const handleTopicSelect = (topic: Topic) => {
    // Thuật toán: Trộn ngẫu nhiên mảng missionPool rồi lấy 3 cái đầu
    const shuffled = [...topic.missionPool].sort(() => 0.5 - Math.random());
    const random3Missions = shuffled.slice(0, 3);

    // Lưu vào State để truyền sang màn hình Chat
    setSelectedTopic(topic);
    setSystemMissions(random3Missions);
    setStep(3);
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
              {TOPICS.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => handleTopicSelect(topic)}
                  className="bg-white p-6 rounded-2xl border-2 border-slate-100 hover:border-blue-500 hover:shadow-xl cursor-pointer transition-all group relative"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{topic.emoji}</span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Sparkles size={14} />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              ))}
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

      <style jsx>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out; }
        .animate-slide-up { animation: slide-up 0.4s ease-out; }
      `}</style>
    </div>
  );
}