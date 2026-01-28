'use client';

import Navbar from '@/components/Navbar';
import { N5_PHASES } from '@/lib/data'; // Import data vừa tạo
import Link from 'next/link';
import { Lock, ArrowLeft, Star } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function N5RoadmapPage() {
  const { user } = useAuth();
  
  // MOCKUP: Giả sử người dùng đang ở Phase 2
  // Sau này bạn sẽ lấy currentPhase từ user.progress.currentPhase
  const currentPhase = 2; 

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700">
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        
        {/* Header */}
        <div className="mb-10">
            <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-blue-600 mb-4 transition-colors">
                <ArrowLeft size={16} className="mr-1"/> Quay lại Dashboard
            </Link>
            <h1 className="text-3xl font-black text-slate-800 mb-2">Đại Lộ Trình N5 🗻</h1>
            <p className="text-slate-500">Hành trình từ Zero đến Hero. Hoàn thành từng giai đoạn để mở khóa thử thách tiếp theo.</p>
        </div>

        {/* Timeline Phases */}
        <div className="space-y-8 relative">
            {/* Đường kẻ dọc nối các Phase */}
            <div className="absolute left-8 top-8 bottom-8 w-1 bg-slate-200 -z-10 hidden md:block"></div>

            {N5_PHASES.map((phase, index) => {
                // Logic Khóa: Nếu index + 1 > currentPhase thì khóa
                // Ví dụ: Đang ở Phase 2. 
                // Phase 1 (index 0) -> Mở. Phase 2 (index 1) -> Mở. Phase 3 (index 2) -> Khóa.
                const isLocked = (index + 1) > currentPhase;
                const isCompleted = (index + 1) < currentPhase;

                return (
                    <div key={phase.id} className={`relative transition-all duration-500 ${isLocked ? 'opacity-60 grayscale' : 'opacity-100'}`}>
                        
                        {/* Phase Header */}
                        <div className={`flex items-start gap-4 p-6 rounded-t-3xl border-b-0 border ${isLocked ? 'bg-slate-100 border-slate-200' : `${phase.color} bg-opacity-20`}`}>
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${isLocked ? 'bg-slate-300 text-white' : 'bg-white'}`}>
                                {isLocked ? <Lock size={20}/> : <span className="font-black text-lg">{phase.id}</span>}
                            </div>
                            <div>
                                <h2 className={`text-xl font-bold ${isLocked ? 'text-slate-500' : 'text-slate-800'}`}>{phase.title}</h2>
                                <p className="text-sm opacity-80 mt-1">{phase.description}</p>
                            </div>
                            {isCompleted && <div className="ml-auto bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1"><Star size={12} fill="currentColor"/> Hoàn thành</div>}
                        </div>

                        {/* Quests Grid */}
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-white rounded-b-3xl border border-t-0 border-slate-200 shadow-sm ${isLocked ? 'pointer-events-none' : ''}`}>
                            {phase.quests.map((quest) => {
                                const Icon = quest.icon;
                                return (
                                    <Link key={quest.id} href={quest.link} className="group flex items-start gap-4 p-4 rounded-2xl border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all hover:-translate-y-1 bg-slate-50/50 hover:bg-white">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${phase.color} bg-opacity-20 group-hover:scale-110 transition-transform`}>
                                            <Icon size={20} className={phase.iconColor} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-700 text-sm group-hover:text-blue-600 transition-colors">{quest.title}</h3>
                                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{quest.desc}</p>
                                            <div className="mt-2 text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded border border-slate-100 w-fit inline-block">
                                                +{quest.xp} XP
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
}