'use client';

import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import { Sparkles, RefreshCw, ChevronLeft, ChevronDown, BookOpen, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Định nghĩa kiểu dữ liệu
type TarotCard = {
  id: string;
  name: string;
  nameVi: string;
  image: string; // Đường dẫn local: /images/tarot/...
  meaning_upright: string;
};

export default function TarotGamePage() {
  const [question, setQuestion] = useState('');
  const [gameState, setGameState] = useState<'intro' | 'shuffling' | 'spread'>('intro');
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  
  // Trạng thái lật mặt bài (Hình ảnh)
  const [flippedIndices, setFlippedIndices] = useState<boolean[]>([false, false, false]);
  
  // 👇 SỬA Ở ĐÂY: Trạng thái xem ý nghĩa (Text) - Độc lập cho từng lá
  const [viewingMeanings, setViewingMeanings] = useState<boolean[]>([false, false, false]);
  
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [hasAskedAi, setHasAskedAi] = useState(false);

  const aiSectionRef = useRef<HTMLDivElement>(null);

  // 1. Rút bài từ DB
  const drawCards = async () => {
    if (!question.trim()) return;
    setGameState('shuffling');

    try {
        const res = await fetch('/api/tarot/draw', { cache: 'no-store' });
        const data = await res.json();
        
        if (!res.ok) throw new Error('Lỗi kết nối');

        // Map dữ liệu
        const fetchedCards = data.map((c: any) => ({
            id: c.id,
            name: c.name,
            nameVi: c.nameVi,
            image: c.image, 
            meaning_upright: c.meaningUpright
        }));

        // Delay giả lập xào bài
        setTimeout(() => {
            setSelectedCards(fetchedCards);
            setFlippedIndices([false, false, false]);
            // 👇 Reset trạng thái xem ý nghĩa về false hết
            setViewingMeanings([false, false, false]); 
            setGameState('spread');
            setHasAskedAi(false);
            setAiResponse('');
        }, 2500);

    } catch (error) {
        alert('Không thể kết nối với vũ trụ. Vui lòng thử lại!');
        setGameState('intro');
    }
  };

  // 2. Xử lý lật bài (Hình ảnh)
  const handleCardClick = (index: number) => {
    if (flippedIndices[index]) return; 
    const newFlipped = [...flippedIndices];
    newFlipped[index] = true;
    setFlippedIndices(newFlipped);
  };

  // 👇 THÊM MỚI: Xử lý bật/tắt xem ý nghĩa (Text)
  const toggleMeaning = (index: number) => {
      const newMeanings = [...viewingMeanings];
      newMeanings[index] = !newMeanings[index]; // Chỉ đảo ngược lá bài được nhấn
      setViewingMeanings(newMeanings);
  };

  // 3. Hỏi AI
  const askTheOracle = async () => {
    if (selectedCards.length !== 3) return;
    setHasAskedAi(true);
    setIsAiLoading(true);
    
    // Cuộn xuống
    setTimeout(() => {
        aiSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    try {
        const res = await fetch('/api/tarot/interpret', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                question: question,
                cards: selectedCards
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

  const allCardsFlipped = flippedIndices.every(Boolean);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col font-sans selection:bg-purple-500 overflow-x-hidden">
      {/* Background Effect */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-900/20 via-slate-900/50 to-slate-900 pointer-events-none"></div>

      {/* Navbar */}
      <div className="relative z-10 p-4 flex items-center justify-between border-b border-white/5 bg-slate-900/60 backdrop-blur-md">
         <Link href="/games" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ChevronLeft size={20}/> Thoát
         </Link>
         <h1 className="font-bold text-xl tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">Ukiyo Tarot</h1>
         <div className="w-16"></div> 
      </div>

      <div className="flex-1 flex flex-col items-center p-4 relative z-10 w-full max-w-6xl mx-auto">
        
        {/* === PHASE 1: NHẬP CÂU HỎI === */}
        {gameState === 'intro' && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="my-auto max-w-lg w-full text-center space-y-8"
            >
                <div className="relative w-40 h-40 mx-auto">
                     <div className="absolute inset-0 bg-purple-500/30 blur-[50px] rounded-full animate-pulse"></div>
                     {/* Ảnh quả cầu pha lê */}
                     <img src="/images/tarot/lasau.jpg" alt="Crystal Ball" className="relative z-10 w-full h-full rounded-full object-cover drop-shadow-2xl opacity-90" />
                </div>
                
                <div className="space-y-3">
                    <h2 className="text-4xl font-black text-white">Vận Mệnh Tiên Tri</h2>
                    <p className="text-indigo-200 text-lg">Tĩnh tâm và gửi câu hỏi đến vũ trụ.</p>
                </div>

                <div className="relative group">
                    <input 
                        type="text" 
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="VD: Công việc sắp tới thế nào?" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-xl text-center focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all placeholder:text-slate-600 shadow-inner"
                    />
                </div>

                <button 
                    onClick={drawCards}
                    disabled={!question.trim()}
                    className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 shadow-lg shadow-purple-900/50 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                    <Sparkles size={20} /> Khởi Đầu Hành Trình
                </button>
            </motion.div>
        )}

        {/* === PHASE 2: XÀO BÀI === */}
        {gameState === 'shuffling' && (
            <div className="my-auto flex flex-col items-center justify-center gap-8">
                {/* Animation xào bài đơn giản */}
                <div className="relative w-40 h-64">
                    {[1,2,3].map((i) => (
                        <motion.div
                            key={i}
                            // Sử dụng ảnh mặt lưng bài từ thư mục public
                            className="absolute inset-0 bg-[url('/images/tarot/lasau.jpg')] bg-cover border border-white/20 rounded-xl shadow-2xl"
                            animate={{ 
                                x: [0, Math.random() * 60 - 30, 0], 
                                y: [0, Math.random() * 60 - 30, 0],
                                rotate: [0, Math.random() * 20 - 10, 0],
                            }}
                            transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
                        />
                    ))}
                </div>
                <p className="text-purple-300 font-medium tracking-[0.3em] animate-pulse">ĐANG KẾT NỐI VŨ TRỤ...</p>
            </div>
        )}

        {/* === PHASE 3: TRẢI BÀI & KẾT QUẢ === */}
        {gameState === 'spread' && (
            <div className="w-full flex flex-col items-center py-6 gap-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 w-full max-w-5xl">
                    {selectedCards.map((card, index) => {
                        const isFlipped = flippedIndices[index];
                        const positionName = ["Quá Khứ", "Hiện Tại", "Tương Lai"][index];
                        
                        // 👇 Kiểm tra xem lá này có đang mở nghĩa không
                        const isViewingMeaning = viewingMeanings[index];

                        return (
                            <div key={card.id} className="flex flex-col items-center gap-4 relative z-10">
                                <h3 className="text-indigo-300 font-bold uppercase tracking-widest text-sm">{positionName}</h3>

                                {/* THẺ BÀI */}
                                <div 
                                    className="relative w-full aspect-[2/3] max-w-[240px] perspective-1000 cursor-pointer group"
                                    onClick={() => handleCardClick(index)}
                                >
                                    <motion.div
                                        initial={{ rotateY: 0 }}
                                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                                        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                                        className="w-full h-full relative preserve-3d shadow-2xl"
                                        style={{ transformStyle: 'preserve-3d' }}
                                    >
                                        {/* MẶT ÚP (Back) - Dùng ảnh local */}
                                        <div className="absolute inset-0 backface-hidden rounded-xl bg-slate-800 border-2 border-slate-600 overflow-hidden flex items-center justify-center group-hover:border-purple-400 transition-colors">
                                            <div className="absolute inset-0 bg-[url('/images/tarot/card-back.jpg')] bg-cover"></div>
                                            {!isFlipped && <span className="relative z-10 text-xs font-bold bg-black/60 text-white px-3 py-1 rounded-full backdrop-blur-sm">Chạm để lật</span>}
                                        </div>

                                        {/* MẶT NGỬA (Front) - Dùng ảnh local từ DB */}
                                        <div 
                                            className="absolute inset-0 backface-hidden rounded-xl bg-slate-900 border border-slate-700 overflow-hidden"
                                            style={{ transform: 'rotateY(180deg)' }}
                                        >
                                            <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 pt-10 text-center">
                                                <p className="text-white font-bold text-lg">{card.nameVi}</p>
                                                <p className="text-slate-400 text-xs">{card.name}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* NÚT XEM CHI TIẾT */}
                                <AnimatePresence>
                                    {isFlipped && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                            className="w-full flex flex-col items-center"
                                        >
                                            <button 
                                                // 👇 Sửa sự kiện onClick để dùng hàm toggle mới
                                                onClick={() => toggleMeaning(index)}
                                                className={`
                                                    flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all
                                                    ${isViewingMeaning ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'}
                                                `}
                                            >
                                                {isViewingMeaning ? 'Thu gọn' : 'Xem ý nghĩa'} 
                                                <ChevronDown size={16} className={`transition-transform ${isViewingMeaning ? 'rotate-180' : ''}`}/>
                                            </button>

                                            {isViewingMeaning && (
                                                <motion.div 
                                                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                                    className="mt-3 bg-slate-800/80 p-4 rounded-xl border border-white/10 text-sm text-slate-200 leading-relaxed text-justify w-full max-w-[240px]"
                                                >
                                                    {card.meaning_upright}
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* === NÚT TỔNG KẾT AI === */}
                <div ref={aiSectionRef} className="w-full max-w-3xl flex flex-col items-center gap-6 mt-8 pb-20">
                    {allCardsFlipped && !hasAskedAi && (
                        <motion.button
                            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            onClick={askTheOracle}
                            className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full font-black text-lg text-white shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:shadow-[0_0_60px_rgba(245,158,11,0.6)] hover:scale-105 transition-all flex items-center gap-3"
                        >
                            <BookOpen size={24} /> 
                            Tổng Hợp & Suy Luận (AI)
                        </motion.button>
                    )}

                    {/* === KẾT QUẢ AI === */}
                    {hasAskedAi && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="w-full bg-slate-900/80 border border-purple-500/30 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                            
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <Star className="text-purple-400 fill-purple-400" size={24} />
                                </div>
                                <h3 className="font-bold text-2xl text-white">Lời Sấm Truyền</h3>
                            </div>

                            {isAiLoading ? (
                                <div className="space-y-4 animate-pulse">
                                    <div className="h-4 bg-white/10 rounded w-full"></div>
                                    <div className="h-4 bg-white/10 rounded w-5/6"></div>
                                    <div className="h-4 bg-white/10 rounded w-4/6"></div>
                                    <div className="flex justify-center py-4">
                                        <span className="text-purple-300 text-sm">Đang kết nối với linh hồn các lá bài...</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="prose prose-invert max-w-none">
                                    <div className="whitespace-pre-wrap text-slate-300 leading-loose text-lg font-light">
                                        {/* React Markdown có thể được dùng ở đây, nhưng text thuần cũng ổn */}
                                        {aiResponse}
                                    </div>
                                </div>
                            )}

                            {!isAiLoading && (
                                <div className="mt-8 flex justify-center border-t border-white/10 pt-6">
                                    <button 
                                        onClick={() => { setGameState('intro'); setQuestion(''); }}
                                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors px-6 py-2 rounded-full hover:bg-white/5"
                                    >
                                        <RefreshCw size={18} /> Đặt câu hỏi mới
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