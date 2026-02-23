//app/components/roleplay/FeedbackModal.tsx
'use client';

import { Star, Sparkles, ArrowLeft } from 'lucide-react';
import { FeedbackData } from '@/app/roleplay/logic';

type Props = {
  data: FeedbackData;
  turnCount: number;
  maxTurns: number;
  onNext: () => void;
};

export default function FeedbackModal({ data, turnCount, maxTurns, onNext }: Props) {
  // ✅ Defensive: tránh crash nếu backend thiếu field
  const mistakes = data.mistakes ?? [];
  const score = Number.isFinite(Number(data.score)) ? Number(data.score) : 0;
  const goodPoints = typeof data.good_points === 'string' ? data.good_points : '';
  const comment = typeof data.comment === 'string' ? data.comment : '';

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[80vh]">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 text-yellow-500 rounded-full mb-3 shadow-sm">
            <Star size={32} fill="currentColor" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            {turnCount >= maxTurns ? 'Kết thúc bài tập!' : 'Hoàn thành nhiệm vụ!'}
          </h2>
          <p className="text-slate-500">Kết quả đánh giá năng lực.</p>
          <div className="text-4xl font-black text-blue-600 mt-2">{score}/100</div>
          {comment && (
            <div className="text-base text-slate-700 mt-2 font-medium">{comment}</div>
          )}
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-green-50 p-4 rounded-xl border border-green-100">
            <h4 className="font-bold text-green-700 text-sm mb-1 flex items-center gap-1">
              <Sparkles size={14} /> Điểm tốt
            </h4>
            <p className="text-sm text-green-800">{goodPoints}</p>
          </div>

          {mistakes.length > 0 && (
            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
              <h4 className="font-bold text-red-700 text-sm mb-2">Cần cải thiện</h4>
              {mistakes.map((err: any, idx: number) => (
                <div
                  key={idx}
                  className="mb-3 last:mb-0 border-b border-red-100 last:border-0 pb-2 last:pb-0"
                >
                  <div className="text-red-500 line-through text-xs">{err.original ?? ''}</div>
                  <div className="text-green-600 font-medium text-sm">→ {err.fixed ?? ''}</div>
                  <div className="text-slate-500 text-xs italic mt-0.5">{err.reason ?? ''}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onNext}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
        >
          Luyện tập tiếp <ArrowLeft className="rotate-180" size={18} />
        </button>
      </div>
    </div>
  );
}
