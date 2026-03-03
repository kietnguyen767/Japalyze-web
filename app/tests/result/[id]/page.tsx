//app/tests/result/[id]/page.tsx
'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2, XCircle, ArrowLeft, RotateCcw,
  Loader2, Trophy, Home, Sparkles, HelpCircle, AlertCircle, PlayCircle
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import FormattedText from '@/components/FormattedText';
// Assuming useAuth is a custom hook, add its import if necessary
// import { useAuth } from '@/hooks/useAuth'; // Uncomment if useAuth is used

// Define TestResult type based on your API response structure
// For example:
interface TestResult {
  score: number;
  totalQuestions: number;
  answers: Record<string, number | undefined>; // Map question ID to user's answer index
  test: {
    id: string;
    title: string;
    questions: Array<{
      id: string;
      content: string;
      options: string[];
      correctAnswer: number;
      explanation?: string;
      imageUrl?: string;
      audioUrl?: string;
    }>;
  };
}


export default function TestResultPage() { // Changed back to TestResultPage to match original file name
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter(); // Added useRouter
  // const { user } = useAuth(); // Uncomment if useAuth is used

  const { data, isLoading, isError, error } = useQuery<TestResult | null>({
    queryKey: ['test-result', id],
    queryFn: async () => {
      if (!id) return null; // Ensure id exists before fetching
      const res = await fetch(`/api/tests/result/${id}`);
      if (!res.ok) {
        // Attempt to parse error message from response body if available
        const errorData = await res.json().catch(() => ({ message: 'Không tìm thấy kết quả hoặc lỗi máy chủ.' }));
        throw new Error(errorData.message || 'Không tìm thấy kết quả hoặc lỗi máy chủ.');
      }
      return res.json();
    },
    enabled: !!id, // Only run query if id is available
    staleTime: Infinity, // Test results don't change, so cache forever
  });

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="animate-spin text-blue-600" size={32} />
        <p className="text-slate-500 text-sm font-medium">Đang tổng hợp kết quả...</p>
      </div>
    </div>
  );

  if (isError || !data) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-lg border border-slate-100">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={32} className="text-red-500" />
        </div>
        <h2 className="text-lg font-bold text-slate-800 mb-2">Đã xảy ra lỗi</h2>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">{(error as any)?.message || 'Lỗi không xác định'}</p>
        <Link href="/tests" className="block w-full px-5 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-all">
          Quay lại danh sách
        </Link>
      </div>
    </div>
  );

  const { score, totalQuestions, answers, test } = data;
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPass = percentage >= 50;

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 pb-20">

      <div className="max-w-4xl mx-auto px-4 py-8 animate-in slide-in-from-bottom-4 duration-500">

        {/* 1. Header Card - Tổng điểm (Redesigned) */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden mb-8 relative">
          {/* Decorative Background */}
          <div className={`absolute top-0 inset-x-0 h-2 ${isPass ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 'bg-gradient-to-r from-red-400 to-rose-500'}`} />

          <div className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">

            {/* Left: Info & Title */}
            <div className="text-center md:text-left flex-1">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${isPass ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {isPass ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                {isPass ? 'Đạt yêu cầu' : 'Chưa đạt'}
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 leading-tight">
                {isPass ? 'Chúc mừng! Bạn đã đậu' : 'Rất tiếc! Hãy cố gắng hơn'}
              </h1>
              <p className="text-slate-500 font-medium">{test.title}</p>

              <div className="flex gap-3 mt-6 justify-center md:justify-start">
                <Link href="/tests" className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all flex items-center gap-2">
                  <Home size={16} /> Trang chủ
                </Link>
                <Link href={`/tests/history`} className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center gap-2">
                  <ArrowLeft size={16} /> Lịch sử thi
                </Link>
              </div>
            </div>

            {/* Right: Stats Circle */}
            <div className="flex items-center gap-8 shrink-0">
              <div className="text-center">
                <div className="text-5xl font-black text-slate-900 mb-1">{score}<span className="text-2xl text-slate-300">/{totalQuestions}</span></div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Câu đúng</div>
              </div>

              <div className="w-px h-16 bg-slate-100 hidden sm:block"></div>

              <div className="text-center hidden sm:block">
                <div className={`text-5xl font-black mb-1 ${isPass ? 'text-emerald-500' : 'text-red-500'}`}>{percentage}%</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tỷ lệ</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Chi tiết câu hỏi */}
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Sparkles size={20} fill="currentColor" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Chi tiết bài làm</h3>
        </div>

        <div className="space-y-5">
          {test.questions.map((q: any, idx: number) => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;
            const isSkipped = userAnswer === undefined;

            return (
              <div key={q.id} className={`bg-white p-6 rounded-2xl border transition-all ${isCorrect ? 'border-slate-100 shadow-sm' : 'border-red-100 shadow-sm ring-1 ring-red-50'}`}>
                <div className="flex gap-5">
                  {/* Badge số thứ tự */}
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm shrink-0 mt-1 ${isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {idx + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Media (Image/Audio) */}
                    {(q.imageUrl || q.audioUrl) && (
                      <div className="mb-4 flex flex-col gap-3">
                        {q.imageUrl && (
                          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 w-fit max-w-full">
                            <img src={q.imageUrl} alt="Question Image" className="max-h-56 object-contain" />
                          </div>
                        )}
                        {q.audioUrl && (
                          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 w-fit">
                            <div className="p-2 bg-white rounded-full shadow-sm text-blue-500">
                              <PlayCircle size={20} fill="currentColor" />
                            </div>
                            <audio controls src={q.audioUrl} className="h-8 w-64" />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Question Content */}
                    <FormattedText text={q.content} className="font-bold text-slate-800 text-lg mb-5 leading-relaxed block" />

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      {q.options.map((opt: string, oIdx: number) => {
                        let style = "bg-white border-slate-200 text-slate-600 hover:bg-slate-50";
                        let icon = null;

                        if (oIdx === q.correctAnswer) {
                          // Đáp án ĐÚNG (Luôn hiện xanh)
                          style = "bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold ring-1 ring-emerald-500/20";
                          icon = <CheckCircle2 size={18} className="text-emerald-600" />;
                        } else if (oIdx === userAnswer && !isCorrect) {
                          // User chọn SAI (Hiện đỏ)
                          style = "bg-red-50 border-red-200 text-red-800 font-medium opacity-100";
                          icon = <XCircle size={18} className="text-red-600" />;
                        } else if (isSkipped && oIdx === q.correctAnswer) {
                          // Trường hợp bỏ qua câu hỏi -> Highlight đáp án đúng
                          style = "bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold";
                          icon = <CheckCircle2 size={18} className="text-emerald-600" />;
                        }

                        return (
                          <div key={oIdx} className={`px-4 py-3 rounded-xl border flex items-center justify-between text-sm transition-all ${style}`}>
                            <span className="flex items-center gap-3">
                              <span className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] border ${oIdx === q.correctAnswer ? 'border-emerald-500 text-emerald-700' : 'border-slate-300 text-slate-400'}`}>
                                {['A', 'B', 'C', 'D'][oIdx]}
                              </span>
                              {opt}
                            </span>
                            {icon}
                          </div>
                        )
                      })}
                    </div>

                    {/* Giải thích (Style mới: Clean & Professional) */}
                    {q.explanation && (
                      <div className="mt-4 pl-4 border-l-4 border-blue-500 bg-slate-50/50 p-4 rounded-r-xl">
                        <div className="flex items-center gap-2 mb-2 text-blue-700 font-bold text-xs uppercase tracking-wide">
                          <HelpCircle size={14} /> Giải thích chi tiết
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  );
}