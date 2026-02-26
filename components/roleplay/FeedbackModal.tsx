//app/components/roleplay/FeedbackModal.tsx
'use client';

import { Star, Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { FeedbackData } from '@/app/roleplay/logic';

type Props = {
  data: FeedbackData;
  turnCount: number;
  maxTurns: number;
  onRestart: () => void;
  onContinue: () => void;
};

const GRADES = [
  { min: 90, label: 'S', desc: 'Xuất sắc', bg: 'bg-yellow-400', text: 'text-yellow-900', bar: 'bg-yellow-400' },
  { min: 75, label: 'A', desc: 'Tốt', bg: 'bg-green-500', text: 'text-white', bar: 'bg-green-500' },
  { min: 55, label: 'B', desc: 'Khá', bg: 'bg-blue-500', text: 'text-white', bar: 'bg-blue-500' },
  { min: 35, label: 'C', desc: 'Trung bình', bg: 'bg-orange-500', text: 'text-white', bar: 'bg-orange-500' },
  { min: 0, label: 'D', desc: 'Cần cố gắng', bg: 'bg-red-500', text: 'text-white', bar: 'bg-red-500' },
];

export default function FeedbackModal({ data, turnCount, maxTurns, onRestart, onContinue }: Props) {
  const mistakes = data.mistakes ?? [];
  const score = Math.max(0, Math.min(100, Number.isFinite(Number(data.score)) ? Number(data.score) : 0));
  const goodPoints = typeof data.good_points === 'string' ? data.good_points : '';
  const comment = typeof data.comment === 'string' ? data.comment : '';
  const grade = GRADES.find(g => score >= g.min) ?? GRADES[GRADES.length - 1];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Wide modal — landscape layout */}
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

        {/* ── Top bar ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center">
              <Star size={20} fill="currentColor" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-base leading-tight">
                {turnCount >= maxTurns ? 'Kết thúc bài tập!' : 'Hoàn thành nhiệm vụ!'}
              </h2>
              <p className="text-xs text-slate-400">Kết quả đánh giá năng lực</p>
            </div>
          </div>

          {/* Grade badge + score in topbar */}
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-black shadow ${grade.bg} ${grade.text}`}>
              {grade.label}
            </div>
            <div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-3xl font-black text-slate-800 leading-none">{score}</span>
                <span className="text-slate-400 text-sm">/100</span>
              </div>
              <div className="text-xs font-semibold text-slate-500">{grade.desc}</div>
            </div>
          </div>
        </div>

        {/* Score bar */}
        <div className="h-1.5 bg-slate-100">
          <div className={`h-full ${grade.bar} transition-all duration-700`} style={{ width: `${score}%` }} />
        </div>

        {/* ── Main body — 2 columns ── */}
        <div className="flex flex-1 overflow-hidden divide-x divide-slate-100">

          {/* Left: comment + good points */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {comment && (
              <div className="text-sm text-slate-700 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 leading-relaxed">
                {comment}
              </div>
            )}

            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <h4 className="font-bold text-green-700 text-xs mb-2 flex items-center gap-1 uppercase tracking-wide">
                <Sparkles size={12} /> Điểm tốt
              </h4>
              <p className="text-sm text-green-800 leading-relaxed">{goodPoints || '—'}</p>
            </div>

          </div>

          {/* Right: mistakes */}
          <div className="flex-1 overflow-y-auto p-5">
            <h4 className="font-bold text-red-600 text-xs mb-3 uppercase tracking-wide">
              Cần cải thiện {mistakes.length === 0 && <span className="text-slate-400 normal-case font-normal">— không có lỗi 🎉</span>}
            </h4>
            {mistakes.length === 0 ? (
              <p className="text-sm text-slate-400 italic">Tuyệt vời! Không phát hiện lỗi nào.</p>
            ) : (
              <div className="space-y-3">
                {mistakes.map((err: any, idx: number) => (
                  <div key={idx} className="bg-red-50 border border-red-100 rounded-xl p-3">
                    {err.original && (
                      <div className="text-red-500 line-through text-xs mb-0.5">{err.original}</div>
                    )}
                    {err.fixed && (
                      <div className="text-green-600 font-semibold text-sm mb-1">→ {err.fixed}</div>
                    )}
                    {err.reason && (
                      <div className="text-slate-500 text-xs italic leading-relaxed">{err.reason}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
          <button
            onClick={onRestart}
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-all"
          >
            Bắt đầu lại
          </button>
          <button
            onClick={onContinue}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all"
          >
            Tiếp tục hội thoại <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
