'use client';

import React, { useState, useRef } from 'react';
import { Sparkles, RefreshCw, ChevronLeft, ChevronDown, BookOpen, Star, Calendar, Clock, MapPin, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Định nghĩa kiểu dữ liệu cho Bazi
type BaziElement = {
  name: string;
  nameVi: string;
  element: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
  position: string;
};

type BaziMatrix = {
  heavenlyStems: BaziElement[];
  earthlyBranches: BaziElement[];
  fiveElementsBalance: {
    Kim: number;
    Mộc: number;
    Thủy: number;
    Hỏa: number;
    Thổ: number;
  };
  dayMaster: string;
};

type BirthData = {
  birthDate: string;
  birthTime: string;
  birthPlace: string;
};

export default function TuViGamePage() {
  const [birthData, setBirthData] = useState<BirthData>({
    birthDate: '',
    birthTime: '',
    birthPlace: ''
  });
  const [gameState, setGameState] = useState<'intro' | 'calculating' | 'result'>('intro');
  const [baziMatrix, setBaziMatrix] = useState<BaziMatrix | null>(null);
  const [viewingDetails, setViewingDetails] = useState<boolean[]>([false, false, false, false]);
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [hasAskedAi, setHasAskedAi] = useState(false);

  const aiSectionRef = useRef<HTMLDivElement>(null);

  // 1. Tính toán Bazi
  const calculateBazi = async () => {
    if (!birthData.birthDate || !birthData.birthTime || !birthData.birthPlace) return;
    setGameState('calculating');

    try {
      const res = await fetch('/api/tuvi/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(birthData)
      });
      const data = await res.json();

      if (!res.ok) throw new Error('Lỗi kết nối');

      // Delay giả lập tính toán
      setTimeout(() => {
        setBaziMatrix(data);
        setViewingDetails([false, false, false, false]);
        setGameState('result');
        setHasAskedAi(false);
        setAiResponse('');
      }, 2500);

    } catch (error) {
      alert('Không thể tính toán Bazi. Vui lòng thử lại!');
      setGameState('intro');
    }
  };

  // 2. Xử lý bật/tắt xem chi tiết
  const toggleDetail = (index: number) => {
    const newDetails = [...viewingDetails];
    newDetails[index] = !newDetails[index];
    setViewingDetails(newDetails);
  };

  // 3. Hỏi AI
  const askTheOracle = async () => {
    if (!baziMatrix) return;
    setHasAskedAi(true);
    setIsAiLoading(true);

    // Cuộn xuống
    setTimeout(() => {
      aiSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    try {
      const res = await fetch('/api/tuvi/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          birthData,
          baziMatrix
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAiResponse(data.interpretation);

    } catch (error) {
      setAiResponse("Vũ trụ đang im lặng (Lỗi kết nối AI). Hãy thử lại sau.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Màu sắc cho ngũ hành
  const elementColors = {
    Kim: 'from-gray-400 to-gray-600',
    Mộc: 'from-green-500 to-emerald-600',
    Thủy: 'from-blue-500 to-cyan-600',
    Hỏa: 'from-red-500 to-orange-600',
    Thổ: 'from-yellow-500 to-amber-600'
  };

  const elementTextColors = {
    Kim: 'text-gray-400',
    Mộc: 'text-green-400',
    Thủy: 'text-blue-400',
    Hỏa: 'text-red-400',
    Thổ: 'text-yellow-400'
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col selection:bg-purple-500 overflow-x-hidden">
      {/* Background Effect */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-900/20 via-slate-900/50 to-slate-900 pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 p-4 flex items-center justify-between border-b border-white/5 bg-slate-900/60 backdrop-blur-md">
        <Link href="/games" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ChevronLeft size={20} /> Thoát
        </Link>
        <h1 className="font-bold text-xl tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">Tử Vi Bát Tự</h1>
        <div className="w-16"></div>
      </div>

      <div className="flex-1 flex flex-col items-center p-4 relative z-10 w-full max-w-6xl mx-auto">

        {/* === PHASE 1: NHẬP THÔNG TIN SINH === */}
        {gameState === 'intro' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="my-auto max-w-lg w-full text-center space-y-8"
          >
            <div className="relative w-40 h-40 mx-auto">
              <div className="absolute inset-0 bg-amber-500/30 blur-[50px] rounded-full animate-pulse"></div>
              {/* Biểu tượng Yin Yang */}
              <div className="relative z-10 w-full h-full rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-amber-500/50 flex items-center justify-center shadow-2xl">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-white to-slate-900 relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 w-16 h-16 bg-white rounded-full transform -translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-1/2 w-16 h-16 bg-slate-900 rounded-full transform -translate-x-1/2"></div>
                  <div className="absolute top-4 left-1/2 w-4 h-4 bg-slate-900 rounded-full transform -translate-x-1/2"></div>
                  <div className="absolute bottom-4 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2"></div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-4xl font-black text-white">Bản Đồ Vận Mệnh</h2>
              <p className="text-amber-200 text-lg">Nhập thông tin sinh để khám phá Bát Tự của bạn.</p>
            </div>

            <div className="space-y-4">
              {/* Ngày sinh */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Calendar className="text-amber-400 group-focus-within:text-amber-300 transition-colors" size={20} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 group-focus-within:from-amber-500/10 group-focus-within:via-amber-500/5 group-focus-within:to-amber-500/10 rounded-2xl transition-all duration-300"></div>
                <input
                  type="date"
                  value={birthData.birthDate}
                  onChange={(e) => setBirthData({ ...birthData, birthDate: e.target.value })}
                  className="relative w-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-lg text-white focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 focus:bg-gradient-to-br focus:from-slate-800/90 focus:to-slate-900/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)] focus:shadow-[0_0_30px_rgba(245,158,11,0.2)] placeholder:text-slate-600"
                  style={{ colorScheme: 'dark' }}
                />
                <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Giờ sinh */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Clock className="text-amber-400 group-focus-within:text-amber-300 transition-colors" size={20} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 group-focus-within:from-amber-500/10 group-focus-within:via-amber-500/5 group-focus-within:to-amber-500/10 rounded-2xl transition-all duration-300"></div>
                <input
                  type="time"
                  value={birthData.birthTime}
                  onChange={(e) => setBirthData({ ...birthData, birthTime: e.target.value })}
                  className="relative w-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-lg text-white focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 focus:bg-gradient-to-br focus:from-slate-800/90 focus:to-slate-900/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)] focus:shadow-[0_0_30px_rgba(245,158,11,0.2)] placeholder:text-slate-600"
                  style={{ colorScheme: 'dark' }}
                />
                <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Nơi sinh */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <MapPin className="text-amber-400 group-focus-within:text-amber-300 transition-colors" size={20} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 group-focus-within:from-amber-500/10 group-focus-within:via-amber-500/5 group-focus-within:to-amber-500/10 rounded-2xl transition-all duration-300"></div>
                <input
                  type="text"
                  value={birthData.birthPlace}
                  onChange={(e) => setBirthData({ ...birthData, birthPlace: e.target.value })}
                  placeholder="Nơi sinh (VD: Hà Nội)"
                  className="relative w-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-lg text-white focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 focus:bg-gradient-to-br focus:from-slate-800/90 focus:to-slate-900/90 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)] focus:shadow-[0_0_30px_rgba(245,158,11,0.2)] placeholder:text-slate-600"
                />
                <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <button
              onClick={calculateBazi}
              disabled={!birthData.birthDate || !birthData.birthTime || !birthData.birthPlace}
              className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:brightness-110 shadow-lg shadow-amber-900/50 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <Sparkles size={20} /> Khám Phá Bát Tự
            </button>
          </motion.div>
        )}

        {/* === PHASE 2: ĐANG TÍNH TOÁN === */}
        {gameState === 'calculating' && (
          <div className="my-auto flex flex-col items-center justify-center gap-8">
            {/* Animation tính toán */}
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 bg-amber-500/30 blur-[50px] rounded-full animate-pulse"></div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="relative z-10 w-full h-full rounded-full border-4 border-amber-500/50 border-t-amber-400"
              >
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <Zap className="text-amber-400" size={40} />
                </div>
              </motion.div>
            </div>
            <p className="text-amber-300 font-medium tracking-[0.3em] animate-pulse">ĐANG TÍNH TOÁN BÁT TỰ...</p>
          </div>
        )}

        {/* === PHASE 3: KẾT QUẢ BÁT TỰ === */}
        {gameState === 'result' && baziMatrix && (
          <div className="w-full flex flex-col items-center py-6 gap-8">
            {/* Thông tin Day Master */}
            <motion.div
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-2"
            >
              <p className="text-slate-400 text-sm uppercase tracking-widest">Ngày Chủ (Day Master)</p>
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                {baziMatrix.dayMaster}
              </h2>
            </motion.div>

            {/* Bát Tự Grid */}
            <div className="grid grid-cols-4 gap-4 w-full max-w-4xl">
              {['Năm', 'Tháng', 'Ngày', 'Giờ'].map((position, index) => (
                <div key={position} className="flex flex-col items-center gap-3">
                  <h3 className="text-amber-300 font-bold uppercase tracking-widest text-xs">{position}</h3>

                  {/* Thiên Can */}
                  <div className="w-full aspect-square max-w-[100px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-white/10 p-3 flex flex-col items-center justify-center gap-2 shadow-lg">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${elementColors[baziMatrix.heavenlyStems[index].element]} flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-lg">{baziMatrix.heavenlyStems[index].name}</span>
                    </div>
                    <span className={`text-xs font-bold ${elementTextColors[baziMatrix.heavenlyStems[index].element]}`}>
                      {baziMatrix.heavenlyStems[index].element}
                    </span>
                  </div>

                  {/* Địa Chi */}
                  <div className="w-full aspect-square max-w-[100px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-white/10 p-3 flex flex-col items-center justify-center gap-2 shadow-lg">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${elementColors[baziMatrix.earthlyBranches[index].element]} flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-lg">{baziMatrix.earthlyBranches[index].name}</span>
                    </div>
                    <span className={`text-xs font-bold ${elementTextColors[baziMatrix.earthlyBranches[index].element]}`}>
                      {baziMatrix.earthlyBranches[index].element}
                    </span>
                  </div>

                  {/* Nút xem chi tiết */}
                  <button
                    onClick={() => toggleDetail(index)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all
                      ${viewingDetails[index] ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    {viewingDetails[index] ? 'Thu gọn' : 'Chi tiết'}
                    <ChevronDown size={12} className={`transition-transform ${viewingDetails[index] ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Chi tiết */}
                  <AnimatePresence>
                    {viewingDetails[index] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="w-full bg-slate-800/80 p-3 rounded-xl border border-white/10 text-xs text-slate-200 leading-relaxed text-center"
                      >
                        <p className="font-bold text-white mb-1">{baziMatrix.heavenlyStems[index].nameVi}</p>
                        <p className="text-slate-400">{baziMatrix.earthlyBranches[index].nameVi}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Ngũ Hành Balance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-3xl bg-slate-900/80 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl"
            >
              <h3 className="text-center font-bold text-xl text-white mb-6">Cân Bằng Ngũ Hành</h3>
              <div className="grid grid-cols-5 gap-4">
                {Object.entries(baziMatrix.fiveElementsBalance).map(([element, value]) => (
                  <div key={element} className="flex flex-col items-center gap-2">
                    <div className={`w-full h-32 bg-gradient-to-t ${elementColors[element as keyof typeof elementColors]} rounded-xl relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-slate-900/50"></div>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${value}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${elementColors[element as keyof typeof elementColors]}`}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-bold text-2xl drop-shadow-lg">{value}%</span>
                      </div>
                    </div>
                    <span className={`font-bold ${elementTextColors[element as keyof typeof elementTextColors]}`}>{element}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* === NÚT TỔNG KẾT AI === */}
            <div ref={aiSectionRef} className="w-full max-w-3xl flex flex-col items-center gap-6 mt-8 pb-20">
              {!hasAskedAi && (
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  onClick={askTheOracle}
                  className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full font-black text-lg text-white shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:shadow-[0_0_60px_rgba(245,158,11,0.6)] hover:scale-105 transition-all flex items-center gap-3"
                >
                  <BookOpen size={24} />
                  Giải Ý Bát Tự
                </motion.button>
              )}

              {/* === KẾT QUẢ AI === */}
              {hasAskedAi && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="w-full bg-slate-900/80 border border-amber-500/30 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <Star className="text-amber-400 fill-amber-400" size={24} />
                    </div>
                    <h3 className="font-bold text-2xl text-white">Lời Giải Ý</h3>
                  </div>

                  {isAiLoading ? (
                    <div className="space-y-4 animate-pulse">
                      <div className="h-4 bg-white/10 rounded w-full"></div>
                      <div className="h-4 bg-white/10 rounded w-5/6"></div>
                      <div className="h-4 bg-white/10 rounded w-4/6"></div>
                      <div className="flex justify-center py-4">
                        <span className="text-amber-300 text-sm">Đang phân tích Bát Tự...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="prose prose-invert max-w-none">
                      <div className="whitespace-pre-wrap text-slate-300 leading-loose text-lg font-light">
                        {aiResponse}
                      </div>
                    </div>
                  )}

                  {!isAiLoading && (
                    <div className="mt-8 flex justify-center border-t border-white/10 pt-6">
                      <button
                        onClick={() => { setGameState('intro'); setBirthData({ birthDate: '', birthTime: '', birthPlace: '' }); }}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors px-6 py-2 rounded-full hover:bg-white/5"
                      >
                        <RefreshCw size={18} /> Tính toán lại
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
