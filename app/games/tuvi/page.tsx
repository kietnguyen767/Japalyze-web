'use client';

import React, { useState, useRef } from 'react';
import { Sparkles, RefreshCw, ChevronLeft, ChevronDown, BookOpen, Star, Calendar, Clock, MapPin, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

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

const ELEMENT_CONFIG = {
  Kim: { bar: 'from-zinc-300 to-slate-400', text: 'text-zinc-300', symbol: '⚙', hex1: '#a1a1aa', hex2: '#71717a' },
  Mộc: { bar: 'from-emerald-400 to-teal-500', text: 'text-emerald-400', symbol: '🌿', hex1: '#34d399', hex2: '#059669' },
  Thủy: { bar: 'from-sky-400 to-cyan-500', text: 'text-sky-400', symbol: '💧', hex1: '#38bdf8', hex2: '#0284c7' },
  Hỏa: { bar: 'from-rose-400 to-orange-500', text: 'text-rose-400', symbol: '🔥', hex1: '#fb7185', hex2: '#e11d48' },
  Thổ: { bar: 'from-amber-400 to-yellow-500', text: 'text-amber-400', symbol: '⛰', hex1: '#fbbf24', hex2: '#d97706' },
};

const OrnamentDivider = () => (
  <div className="flex items-center gap-3 w-full my-2">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-500/40" />
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber-400/60 shrink-0">
      <path d="M12 2L14 9H21L15.5 13.5L17.5 20.5L12 16L6.5 20.5L8.5 13.5L3 9H10L12 2Z" fill="currentColor" />
    </svg>
    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-500/40" />
  </div>
);

const BaguaCorner = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 60" className={`absolute opacity-20 ${className}`} width="60" height="60">
    <rect x="5" y="5" width="50" height="50" rx="4" fill="none" stroke="#f59e0b" strokeWidth="0.5" />
    <rect x="12" y="12" width="36" height="36" rx="2" fill="none" stroke="#f59e0b" strokeWidth="0.5" />
    <line x1="5" y1="30" x2="12" y2="30" stroke="#f59e0b" strokeWidth="0.5" />
    <line x1="48" y1="30" x2="55" y2="30" stroke="#f59e0b" strokeWidth="0.5" />
    <line x1="30" y1="5" x2="30" y2="12" stroke="#f59e0b" strokeWidth="0.5" />
    <line x1="30" y1="48" x2="30" y2="55" stroke="#f59e0b" strokeWidth="0.5" />
    <circle cx="30" cy="30" r="6" fill="none" stroke="#f59e0b" strokeWidth="0.5" />
    <circle cx="30" cy="30" r="2" fill="#f59e0b" />
  </svg>
);

// ── Animated Bagua Ring Component ──────────────────────────────────────────
const BaguaRing = () => (
  <div className="relative w-48 h-48">
    {/* Ambient glow */}
    <div
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{
        background: 'radial-gradient(circle, rgba(245,158,11,0.22) 0%, transparent 70%)',
        animation: 'baguaPulse 4s ease-in-out infinite',
      }}
    />

    {/* Outer ring — clockwise 18s, trigrams + diamond markers */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-0"
    >
      <svg viewBox="0 0 192 192" width="192" height="192" className="w-full h-full">
        <circle cx="96" cy="96" r="91" fill="none" stroke="rgba(245,158,11,0.18)" strokeWidth="0.8" strokeDasharray="5 7" />
        {/* 8 diamond markers at cardinal + diagonal */}
        <g fill="rgba(245,158,11,0.55)">
          <polygon points="96,5 98.5,10 96,15 93.5,10" />
          <polygon points="96,177 98.5,182 96,187 93.5,182" />
          <polygon points="5,96 10,93.5 15,96 10,98.5" />
          <polygon points="177,96 182,93.5 187,96 182,98.5" />
          <polygon points="33,33 36.5,29 40,33 36.5,37" />
          <polygon points="152,152 155.5,148 159,152 155.5,156" />
          <polygon points="152,33 155.5,29 159,33 155.5,37" />
          <polygon points="33,152 36.5,148 40,152 36.5,156" />
        </g>
        {/* Trigram strokes — top (☰ Qian) */}
        <g fill="rgba(245,158,11,0.65)">
          <rect x="88" y="18" width="16" height="2.2" rx="1.1" />
          <rect x="88" y="22.5" width="16" height="2.2" rx="1.1" />
          <rect x="88" y="27" width="16" height="2.2" rx="1.1" />
        </g>
        {/* bottom (☷ Kun) */}
        <g fill="rgba(245,158,11,0.65)">
          <rect x="88" y="162.5" width="6.5" height="2.2" rx="1.1" /><rect x="97.5" y="162.5" width="6.5" height="2.2" rx="1.1" />
          <rect x="88" y="167" width="6.5" height="2.2" rx="1.1" /><rect x="97.5" y="167" width="6.5" height="2.2" rx="1.1" />
          <rect x="88" y="171.5" width="6.5" height="2.2" rx="1.1" /><rect x="97.5" y="171.5" width="6.5" height="2.2" rx="1.1" />
        </g>
        {/* right (☵ Kan) */}
        <g fill="rgba(245,158,11,0.65)">
          <rect x="163" y="88" width="2.2" height="6.5" rx="1.1" /><rect x="163" y="97.5" width="2.2" height="6.5" rx="1.1" />
          <rect x="167.5" y="88" width="2.2" height="16" rx="1.1" />
          <rect x="172" y="88" width="2.2" height="6.5" rx="1.1" /><rect x="172" y="97.5" width="2.2" height="6.5" rx="1.1" />
        </g>
        {/* left (☲ Li) */}
        <g fill="rgba(245,158,11,0.65)">
          <rect x="18" y="88" width="2.2" height="16" rx="1.1" />
          <rect x="22.5" y="88" width="2.2" height="6.5" rx="1.1" /><rect x="22.5" y="97.5" width="2.2" height="6.5" rx="1.1" />
          <rect x="27" y="88" width="2.2" height="16" rx="1.1" />
        </g>
      </svg>
    </motion.div>

    {/* Middle ring — counter-clockwise 12s */}
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      className="absolute"
      style={{ inset: 14 }}
    >
      <svg viewBox="0 0 164 164" className="w-full h-full">
        <circle cx="82" cy="82" r="78" fill="none" stroke="rgba(245,158,11,0.3)" strokeWidth="1" strokeDasharray="2 4" />
        {/* 8 nodes */}
        <g fill="rgba(245,158,11,0.6)">
          <circle cx="82" cy="4" r="2.5" />
          <circle cx="82" cy="160" r="2.5" />
          <circle cx="4" cy="82" r="2.5" />
          <circle cx="160" cy="82" r="2.5" />
          <circle cx="27" cy="27" r="2" />
          <circle cx="137" cy="27" r="2" />
          <circle cx="27" cy="137" r="2" />
          <circle cx="137" cy="137" r="2" />
        </g>
        {/* connecting tick marks */}
        <g stroke="rgba(245,158,11,0.35)" strokeWidth="0.8">
          <line x1="82" y1="4" x2="82" y2="10" />
          <line x1="82" y1="154" x2="82" y2="160" />
          <line x1="4" y1="82" x2="10" y2="82" />
          <line x1="154" y1="82" x2="160" y2="82" />
        </g>
      </svg>
    </motion.div>

    {/* Inner ring — clockwise 8s */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      className="absolute"
      style={{ inset: 28 }}
    >
      <svg viewBox="0 0 136 136" className="w-full h-full">
        <circle cx="68" cy="68" r="64" fill="none" stroke="rgba(245,158,11,0.42)" strokeWidth="1.2" strokeDasharray="1 3" />
        {/* 16 small tick marks */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180;
          const r = 64;
          const x1 = 68 + r * Math.cos(angle);
          const y1 = 68 + r * Math.sin(angle);
          const x2 = 68 + (r - 5) * Math.cos(angle);
          const y2 = 68 + (r - 5) * Math.sin(angle);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(245,158,11,0.45)" strokeWidth="1" />;
        })}
      </svg>
    </motion.div>

    {/* Yin-yang center — floats only, does NOT rotate */}
    <motion.div
      animate={{ y: [0, -6, -3, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute"
      style={{ inset: 52 }}
    >
      <div
        className="w-full h-full rounded-full overflow-hidden"
        style={{ boxShadow: '0 0 20px rgba(245,158,11,0.15), inset 0 0 14px rgba(0,0,0,0.5)' }}
      >
        <svg viewBox="0 0 88 88" width="88" height="88">
          {/* light half */}
          <path d="M44,0 A44,44 0 0,1 44,88 A22,22 0 0,1 44,44 A22,22 0 0,0 44,0Z" fill="#f8fafc" />
          {/* dark half */}
          <path d="M44,0 A44,44 0 0,0 44,88 A22,22 0 0,0 44,44 A22,22 0 0,1 44,0Z" fill="#0f172a" />
          {/* dots */}
          <circle cx="44" cy="22" r="7" fill="#0f172a" />
          <circle cx="44" cy="66" r="7" fill="#f8fafc" />
          <circle cx="44" cy="22" r="2.5" fill="#f8fafc" />
          <circle cx="44" cy="66" r="2.5" fill="#0f172a" />
          {/* outer ring */}
          <circle cx="44" cy="44" r="43" fill="none" stroke="rgba(245,158,11,0.3)" strokeWidth="0.8" />
        </svg>
      </div>
    </motion.div>
  </div>
);

export default function TuViGamePage() {
  const [birthData, setBirthData] = useState<BirthData>({ birthDate: '', birthTime: '', birthPlace: '' });
  const [gameState, setGameState] = useState<'intro' | 'calculating' | 'result'>('intro');
  const [baziMatrix, setBaziMatrix] = useState<BaziMatrix | null>(null);
  const [viewingDetails, setViewingDetails] = useState<boolean[]>([false, false, false, false]);
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [hasAskedAi, setHasAskedAi] = useState(false);
  const aiSectionRef = useRef<HTMLDivElement>(null);

  const calculateBazi = async () => {
    if (!birthData.birthDate || !birthData.birthTime || !birthData.birthPlace) return;
    setGameState('calculating');
    try {
      const res = await fetch('/api/tuvi/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(birthData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error('Lỗi kết nối');
      setTimeout(() => {
        setBaziMatrix(data);
        setViewingDetails([false, false, false, false]);
        setGameState('result');
        setHasAskedAi(false);
        setAiResponse('');
      }, 2500);
    } catch {
      alert('Không thể tính toán Bazi. Vui lòng thử lại!');
      setGameState('intro');
    }
  };

  const toggleDetail = (index: number) => {
    const newDetails = [...viewingDetails];
    newDetails[index] = !newDetails[index];
    setViewingDetails(newDetails);
  };

  const askTheOracle = async () => {
    if (!baziMatrix) return;
    setHasAskedAi(true);
    setIsAiLoading(true);
    setTimeout(() => aiSectionRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    try {
      const res = await fetch('/api/tuvi/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ birthData, baziMatrix }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAiResponse(data.interpretation);
    } catch {
      setAiResponse('Vũ trụ đang im lặng (Lỗi kết nối AI). Hãy thử lại sau.');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');

        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body    { font-family: 'Lora', serif; }

        .star-field {
          background-image:
            radial-gradient(1px 1px at 10% 15%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1px 1px at 25% 40%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 40% 70%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 20%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 70% 55%, rgba(255,255,255,0.6) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 85% 80%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 92% 35%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 15% 85%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 90%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 78% 10%, rgba(255,255,255,0.5) 0%, transparent 100%);
        }

        .glow-text {
          text-shadow: 0 0 30px rgba(245,158,11,0.4), 0 0 60px rgba(245,158,11,0.2);
        }

        .card-shine {
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.02) 100%);
        }

        @keyframes baguaPulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.1); }
        }

        @keyframes nebula {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50%       { opacity: 0.25; transform: scale(1.08); }
        }
        .nebula-anim { animation: nebula 12s ease-in-out infinite; }

        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator {
          filter: invert(0.7) sepia(1) hue-rotate(10deg) saturate(2);
          cursor: pointer;
        }

        .prose-oracle p      { margin-bottom: 1.4em; }
        .prose-oracle strong { color: #fcd34d; font-weight: 600; }
      `}</style>

      <div className="min-h-screen bg-[#080c14] text-white flex flex-col overflow-x-hidden relative font-body">

        <div className="fixed inset-0 star-field pointer-events-none" />
        <div
          className="fixed inset-0 pointer-events-none nebula-anim"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(67,56,202,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 30%, rgba(124,58,237,0.08) 0%, transparent 60%)' }}
        />
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 50%)' }}
        />

        <header className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-amber-500/10 bg-[#080c14]/70 backdrop-blur-xl">
          <Link href="/games" className="font-body text-sm tracking-wider text-amber-500/60 hover:text-amber-400 transition-colors flex items-center gap-2">
            <ChevronLeft size={16} />
            <span>Thoát</span>
          </Link>
          <div className="w-20" />
        </header>

        <main className="flex-1 flex flex-col items-center px-4 py-8 relative z-10 max-w-5xl mx-auto w-full">

          {/* ── INTRO ── */}
          {gameState === 'intro' && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="my-auto w-full max-w-md"
            >
              {/* Bagua ring replaces old static symbol */}
              <div className="flex justify-center mb-10">
                <BaguaRing />
              </div>

              <div className="text-center mb-10 space-y-3">
                <h2 className="font-display font-bold text-4xl tracking-wide text-white glow-text">Bản Đồ Vận Mệnh</h2>
                <OrnamentDivider />
              </div>

              {/* Input fields — unchanged from original */}
              <div className="space-y-4">
                {[
                  { icon: Calendar, label: 'Ngày sinh', type: 'date', key: 'birthDate' as keyof BirthData, placeholder: '' },
                  { icon: Clock, label: 'Giờ sinh', type: 'time', key: 'birthTime' as keyof BirthData, placeholder: '' },
                  { icon: MapPin, label: 'Nơi sinh', type: 'text', key: 'birthPlace' as keyof BirthData, placeholder: 'VD: Hà Nội, Việt Nam' },
                ].map(({ icon: Icon, label, type, key, placeholder }) => (
                  <div key={key} className="group relative">
                    <div className="absolute -inset-px rounded-[17px] bg-gradient-to-r from-amber-600/0 via-amber-400/0 to-amber-600/0 group-focus-within:from-amber-600/50 group-focus-within:via-amber-400/30 group-focus-within:to-amber-600/50 transition-all duration-500" />
                    <div
                      className="relative rounded-2xl overflow-hidden"
                      style={{ background: 'linear-gradient(135deg, rgba(30,27,75,0.6) 0%, rgba(15,23,42,0.8) 100%)' }}
                    >
                      <div className="flex items-center">
                        <div className="pl-4 pr-3 py-4">
                          <Icon size={18} className="text-amber-500/60 group-focus-within:text-amber-400 transition-colors" />
                        </div>
                        <div className="flex-1 flex flex-col py-2 pr-4">
                          <label className="font-body text-[10px] tracking-[0.35em] text-amber-500/50 uppercase mb-0.5">{label}</label>
                          <input
                            type={type}
                            value={birthData[key]}
                            onChange={(e) => setBirthData({ ...birthData, [key]: e.target.value })}
                            placeholder={placeholder}
                            className="bg-transparent font-body text-base text-white placeholder:text-slate-600 focus:outline-none w-full"
                            style={{ colorScheme: 'dark' }}
                          />
                        </div>
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
                    </div>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={calculateBazi}
                disabled={!birthData.birthDate || !birthData.birthTime || !birthData.birthPlace}
                className="mt-8 w-full relative group disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 opacity-60 group-hover:opacity-90 transition-opacity blur-sm" />
                <div className="relative rounded-2xl py-4 px-6 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 flex items-center justify-center gap-3">
                  <Sparkles size={18} className="text-amber-200" />
                  <span className="font-display font-semibold tracking-[0.25em] text-amber-100 uppercase text-base">Khám Phá Bát Tự</span>
                  <Sparkles size={18} className="text-amber-200" />
                </div>
              </motion.button>
            </motion.div>
          )}

          {/* ── CALCULATING ── */}
          {gameState === 'calculating' && (
            <div className="my-auto flex flex-col items-center gap-10">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 blur-[60px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)' }} />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0"
                >
                  <svg viewBox="0 0 160 160" className="w-full h-full">
                    <circle cx="80" cy="80" r="76" fill="none" stroke="rgba(245,158,11,0.15)" strokeWidth="1" strokeDasharray="6 10" />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                      <circle
                        key={deg}
                        cx={80 + 76 * Math.cos((deg * Math.PI) / 180)}
                        cy={80 + 76 * Math.sin((deg * Math.PI) / 180)}
                        r="2"
                        fill="rgba(245,158,11,0.5)"
                      />
                    ))}
                  </svg>
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-6"
                >
                  <svg viewBox="0 0 112 112" className="w-full h-full">
                    <circle cx="56" cy="56" r="52" fill="none" stroke="rgba(245,158,11,0.3)" strokeWidth="1.5" strokeDasharray="3 5" />
                  </svg>
                </motion.div>
                <div
                  className="absolute inset-12 rounded-full flex items-center justify-center"
                  style={{ background: 'radial-gradient(circle, #1e1b4b 0%, #0f172a 100%)', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 0 20px rgba(245,158,11,0.1)' }}
                >
                  <Zap size={28} className="text-amber-400" style={{ filter: 'drop-shadow(0 0 8px rgba(245,158,11,0.6))' }} />
                </div>
              </div>
              <div className="text-center space-y-3">
                <p className="font-body text-sm tracking-[0.4em] text-amber-400/80 uppercase">Thiên Cơ Đang Vận Hành</p>
                <div className="flex gap-1.5 justify-center">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1.5 h-1.5 rounded-full bg-amber-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── RESULT ── */}
          {gameState === 'result' && baziMatrix && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center gap-10"
            >
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <p className="font-body text-[10px] tracking-[0.5em] text-amber-500/50 uppercase mb-2">Ngày Chủ · Day Master</p>
                <h2
                  className="font-display font-bold text-6xl text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-yellow-300 to-amber-500"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(245,158,11,0.4))' }}
                >
                  {baziMatrix.dayMaster}
                </h2>
                <OrnamentDivider />
              </motion.div>

              <div className="grid grid-cols-4 gap-4 w-full max-w-3xl">
                {['Năm', 'Tháng', 'Ngày', 'Giờ'].map((position, index) => {
                  const stem = baziMatrix.heavenlyStems[index];
                  const branch = baziMatrix.earthlyBranches[index];
                  const stemCfg = ELEMENT_CONFIG[stem.element];
                  const branchCfg = ELEMENT_CONFIG[branch.element];

                  return (
                    <motion.div
                      key={position}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.1 }}
                      className="flex flex-col items-center gap-3"
                    >
                      <div className="relative">
                        <span className="font-body text-[10px] tracking-[0.4em] text-amber-400/70 uppercase">{position}</span>
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mt-0.5" />
                      </div>

                      <div
                        className="w-full relative rounded-2xl overflow-hidden"
                        style={{
                          background: 'linear-gradient(145deg, rgba(30,27,75,0.7) 0%, rgba(15,23,42,0.9) 100%)',
                          boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
                        }}
                      >
                        <div className="absolute inset-0 card-shine" />
                        <div className="p-4 flex flex-col items-center gap-3">
                          <div
                            className="w-14 h-14 rounded-full flex items-center justify-center text-white font-display font-bold text-2xl shadow-lg"
                            style={{ background: `linear-gradient(135deg, ${stemCfg.hex1}, ${stemCfg.hex2})` }}
                          >
                            {stem.name}
                          </div>
                          <div>
                            <p className={`font-body text-[10px] tracking-[0.3em] uppercase text-center ${stemCfg.text}`}>{stem.element}</p>
                            <p className="text-[9px] text-slate-500 text-center mt-0.5">Thiên Can</p>
                          </div>
                        </div>
                        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                      </div>

                      <div
                        className="w-full relative rounded-2xl overflow-hidden"
                        style={{
                          background: 'linear-gradient(145deg, rgba(30,27,75,0.5) 0%, rgba(15,23,42,0.8) 100%)',
                          boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
                        }}
                      >
                        <div className="absolute inset-0 card-shine" />
                        <div className="p-4 flex flex-col items-center gap-3">
                          <div
                            className="w-14 h-14 rounded-full flex items-center justify-center text-white font-display font-bold text-2xl shadow-lg"
                            style={{ background: `linear-gradient(135deg, ${branchCfg.hex1}, ${branchCfg.hex2})` }}
                          >
                            {branch.name}
                          </div>
                          <div>
                            <p className={`font-body text-[10px] tracking-[0.3em] uppercase text-center ${branchCfg.text}`}>{branch.element}</p>
                            <p className="text-[9px] text-slate-500 text-center mt-0.5">Địa Chi</p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleDetail(index)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-body tracking-wider transition-all border ${viewingDetails[index]
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          : 'bg-transparent text-slate-500 border-white/5 hover:border-amber-500/20 hover:text-amber-400/70'
                          }`}
                      >
                        {viewingDetails[index] ? 'Thu gọn' : 'Chi tiết'}
                        <ChevronDown size={10} className={`transition-transform ${viewingDetails[index] ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {viewingDetails[index] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full overflow-hidden"
                          >
                            <div
                              className="rounded-xl p-3 text-center space-y-2"
                              style={{ background: 'linear-gradient(135deg, rgba(30,27,75,0.6), rgba(15,23,42,0.8))' }}
                            >
                              <div className="border-b border-amber-500/10 pb-2">
                                <p className="font-body text-[9px] tracking-widest text-amber-500/40 uppercase mb-1">Thiên Can</p>
                                <p className="font-body text-white text-sm">{stem.nameVi}</p>
                              </div>
                              <div>
                                <p className="font-body text-[9px] tracking-widest text-amber-500/40 uppercase mb-1">Địa Chi</p>
                                <p className="font-body text-slate-300 text-sm">{branch.nameVi}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="w-full max-w-3xl relative"
              >
                <div
                  className="relative rounded-3xl overflow-hidden p-8"
                  style={{
                    background: 'linear-gradient(135deg, rgba(30,27,75,0.5) 0%, rgba(15,23,42,0.8) 100%)',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
                    border: '1px solid rgba(245,158,11,0.1)',
                  }}
                >
                  <BaguaCorner className="top-0 left-0" />
                  <BaguaCorner className="top-0 right-0 rotate-90" />
                  <BaguaCorner className="bottom-0 left-0 -rotate-90" />
                  <BaguaCorner className="bottom-0 right-0 rotate-180" />
                  <div className="relative">
                    <h3 className="font-display font-semibold text-center tracking-[0.25em] text-amber-300/80 uppercase text-lg mb-2">
                      Cân Bằng Ngũ Hành
                    </h3>
                    <OrnamentDivider />
                    <div className="grid grid-cols-5 gap-4 mt-6">
                      {Object.entries(baziMatrix.fiveElementsBalance).map(([element, value], i) => {
                        const cfg = ELEMENT_CONFIG[element as keyof typeof ELEMENT_CONFIG];
                        return (
                          <div key={element} className="flex flex-col items-center gap-3">
                            <div className="w-full h-32 relative rounded-xl overflow-hidden" style={{ background: 'rgba(0,0,0,0.3)' }}>
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${value}%` }}
                                transition={{ duration: 1.2, delay: 0.8 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${cfg.bar}`}
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-display font-bold text-white text-2xl drop-shadow-lg" style={{ textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>
                                  {value}<span className="text-sm">%</span>
                                </span>
                              </div>
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 + i * 0.1 }}
                                className={`absolute left-0 right-0 h-1 bg-gradient-to-r ${cfg.bar} blur-sm`}
                                style={{ bottom: `${value}%` }}
                              />
                            </div>
                            <span className={`font-body font-semibold text-xs tracking-widest uppercase ${cfg.text}`}>{element}</span>
                            <span className="text-lg">{cfg.symbol}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>

              <div ref={aiSectionRef} className="w-full max-w-3xl flex flex-col items-center gap-8 pb-20">
                {!hasAskedAi && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={askTheOracle}
                    className="relative group"
                  >
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-600/60 via-yellow-500/60 to-amber-600/60 blur-md group-hover:blur-lg transition-all" />
                    <div
                      className="relative flex items-center gap-4 px-10 py-5 rounded-2xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(120,53,15,0.8) 0%, rgba(92,40,6,0.9) 50%, rgba(120,53,15,0.8) 100%)',
                        border: '1px solid rgba(245,158,11,0.3)',
                      }}
                    >
                      <BookOpen size={20} className="text-amber-300" />
                      <div className="text-left">
                        <p className="font-display font-semibold tracking-[0.2em] text-amber-200 uppercase text-base">Giải Ý Bát Tự</p>
                        <p className="font-body text-amber-400/60 text-xs italic mt-0.5">Để thiên cơ tiết lộ vận mệnh</p>
                      </div>
                      <Star size={16} className="text-amber-400 fill-amber-400/50" />
                    </div>
                  </motion.button>
                )}

                {hasAskedAi && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full relative rounded-3xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(145deg, rgba(30,27,75,0.6) 0%, rgba(15,23,42,0.9) 100%)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
                      border: '1px solid rgba(245,158,11,0.15)',
                    }}
                  >
                    <div className="h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
                    <div className="h-px bg-gradient-to-r from-transparent via-amber-300/20 to-transparent mt-0.5" />
                    <div className="p-8 md:p-10">
                      <BaguaCorner className="top-3 left-3" />
                      <BaguaCorner className="top-3 right-3 rotate-90" />
                      <div className="text-center mb-8">
                        <div
                          className="inline-flex items-center gap-3 px-6 py-2 rounded-full mb-4"
                          style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)' }}
                        >
                          <Star size={14} className="text-amber-400 fill-amber-400/60" />
                          <span className="font-body text-[10px] tracking-[0.4em] text-amber-400/80 uppercase">Lời Giải Ý Của Thiên Cơ</span>
                          <Star size={14} className="text-amber-400 fill-amber-400/60" />
                        </div>
                        <OrnamentDivider />
                      </div>

                      {isAiLoading ? (
                        <div className="space-y-4">
                          {[1, 0.85, 0.7, 0.9, 0.6].map((w, i) => (
                            <motion.div
                              key={i}
                              animate={{ opacity: [0.3, 0.6, 0.3] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                              className="h-4 rounded-full bg-white/5"
                              style={{ width: `${w * 100}%` }}
                            />
                          ))}
                          <div className="flex items-center justify-center gap-3 pt-6">
                            <div className="w-1 h-1 rounded-full bg-amber-400 animate-ping" />
                            <span className="font-body text-[10px] tracking-[0.4em] text-amber-400/60 uppercase">Thiên Cơ Đang Vận Hành</span>
                            <div className="w-1 h-1 rounded-full bg-amber-400 animate-ping" style={{ animationDelay: '0.5s' }} />
                          </div>
                        </div>
                      ) : (
                        <div className="prose-oracle font-body text-lg text-slate-300/90" style={{ lineHeight: '1.9' }}>
                          {aiResponse.split('\n').map((line, i) => (
                            <p key={i} className={line.trim() === '' ? 'mb-2' : 'mb-4 text-slate-300'}>
                              {line}
                            </p>
                          ))}
                        </div>
                      )}

                      {!isAiLoading && (
                        <>
                          <OrnamentDivider />
                          <div className="flex justify-center mt-6">
                            <button
                              onClick={() => {
                                setGameState('intro');
                                setBirthData({ birthDate: '', birthTime: '', birthPlace: '' });
                              }}
                              className="flex items-center gap-2.5 font-body text-sm tracking-wider text-slate-500 hover:text-amber-400 transition-colors px-6 py-2.5 rounded-full border border-white/5 hover:border-amber-500/20"
                            >
                              <RefreshCw size={14} />
                              Tính toán lại
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </>
  );
}