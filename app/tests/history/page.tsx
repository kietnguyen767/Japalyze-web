'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  History, Calendar, ArrowRight, Loader2,
  CheckCircle2, XCircle, Clock, Trophy, Home
} from 'lucide-react';

type TestHistoryItem = {
  id: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  test: {
    title: string;
    level: string;
    duration: number;
  };
};

export default function HistoryPage() {
  const [history, setHistory] = useState<TestHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/tests/history');
        if (res.ok) {
          setHistory(await res.json());
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const getStatus = (score: number, total: number) => {
    const percent = Math.round((score / total) * 100);
    return {
      percent,
      isPassed: percent >= 50,
      label: percent >= 50 ? 'ĐẠT' : 'CHƯA ĐẠT'
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      <div className="max-w-3xl mx-auto p-4 md:p-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200">
              <History size={24} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900">Lịch sử thi</h1>
              <p className="text-sm text-slate-500 font-medium">Theo dõi quá trình luyện tập của bạn</p>
            </div>
          </div>

          <Link
            href="/tests"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm w-fit"
          >
            <Home size={16} /> Danh sách đề
          </Link>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="animate-spin text-blue-600" size={32} />
            <span className="text-sm text-slate-400 font-medium">Đang tải lịch sử...</span>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 shadow-sm">
            <div className="inline-flex p-4 bg-slate-50 rounded-full mb-4 text-slate-300">
              <Trophy size={32} />
            </div>
            <h3 className="text-slate-800 font-bold text-lg mb-1">Chưa có kết quả nào</h3>
            <p className="text-slate-500 font-medium mb-6 text-sm">Hãy thử làm bài kiểm tra đầu tiên nhé!</p>
            <Link href="/tests" className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-lg text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
              Làm bài ngay
            </Link>
          </div>
        ) : (
          <div className="grid gap-3 animate-in slide-in-from-bottom-4 duration-500">
            {history.map((item) => {
              const { percent, isPassed, label } = getStatus(item.score, item.totalQuestions);

              return (
                <div key={item.id} className="group relative bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 overflow-hidden">

                  {/* Status Indicator Strip */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${isPassed ? 'bg-emerald-500' : 'bg-red-500'}`}></div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pl-3">
                    {/* Left: Info */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${isPassed ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                          {item.test.level}
                        </span>
                        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wide flex items-center gap-1">
                          <Calendar size={12} /> {new Date(item.completedAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-slate-800 group-hover:text-blue-600 transition-colors truncate pr-4">
                        {item.test.title}
                      </h3>

                      <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                        <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                          <Clock size={12} /> {item.test.duration}p
                        </span>
                        <span className={`flex items-center gap-1 ${isPassed ? 'text-emerald-600' : 'text-red-600'}`}>
                          {isPassed ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                          {label}
                        </span>
                      </div>
                    </div>

                    {/* Right: Score & Action */}
                    <div className="flex items-center justify-between sm:justify-end gap-5 pt-3 sm:pt-0 border-t sm:border-none border-slate-50 mt-1 sm:mt-0">
                      <div className="text-right flex items-baseline gap-1.5 sm:block">
                        <div className={`text-2xl font-black leading-none ${isPassed ? 'text-emerald-600' : 'text-red-600'}`}>
                          {item.score}<span className="text-sm text-slate-300 font-medium">/{item.totalQuestions}</span>
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 sm:mt-1 uppercase tracking-wide">Điểm số ({percent}%)</div>
                      </div>

                      <Link
                        href={`/tests/result/${item.id}`}
                        className="p-2.5 bg-slate-50 text-slate-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600"
                        title="Xem chi tiết"
                      >
                        <ArrowRight size={18} strokeWidth={2.5} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}