'use client';
import React, { useEffect, useState } from 'react';
import { Users, FileText, BookOpenText, FileQuestion, TrendingUp, Loader2 } from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

interface OverviewTabProps {
  counts: {
    users: number;
    posts: number;
    articles: number;
    tests: number;
  };
}

export default function OverviewTab({ counts }: OverviewTabProps) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [totalVisits, setTotalVisits] = useState<number>(0);
  const [weekRange, setWeekRange] = useState({ start: '', end: '' });
  const [weekOffset, setWeekOffset] = useState(0); // 0: Tuần này, -1: Tuần trước...
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`/api/admin/analytics/stats?offset=${weekOffset}`);
        if (res.ok) {
          const { summary, chartData } = await res.json();
          setChartData(chartData);
          setTotalVisits(summary.totalVisits);
          if (summary.range) {
            setWeekRange({
              start: new Date(summary.range.start).toLocaleDateString('vi-VN'),
              end: new Date(summary.range.end).toLocaleDateString('vi-VN')
            });
          }
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    // Chỉ polling nếu đang ở tuần hiện tại (offset === 0)
    let interval: any;
    if (weekOffset === 0) {
      interval = setInterval(fetchStats, 30000);
    }
    return () => clearInterval(interval);
  }, [weekOffset]);

  const stats = [
    { label: 'Người dùng', count: counts.users, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Bài viết', count: counts.posts, icon: FileText, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Luyện đọc', count: counts.articles, icon: BookOpenText, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Đề thi', count: counts.tests, icon: FileQuestion, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Tổng truy cập', count: totalVisits, icon: TrendingUp, color: 'text-indigo-500', bg: 'bg-indigo-50' }
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* STATUS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-slate-400 font-bold text-[10px] md:text-sm uppercase tracking-wider">{stat.label}</h3>
              <div className={`p-1.5 md:p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={stat.color} size={18} />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-black text-slate-800">{stat.count.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* CHART SECTION */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <TrendingUp className="text-blue-600" /> Biểu đồ truy cập
            </h3>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Tuần: <span className="text-blue-600 font-bold">{weekRange.start} - {weekRange.end}</span>
              {weekOffset === 0 && <span className="ml-2 text-[10px] bg-blue-50 px-2 py-0.5 rounded text-blue-600">Tuần hiện tại</span>}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setWeekOffset(prev => prev - 1)}
                className="px-3 py-1.5 hover:bg-white hover:shadow-sm rounded-lg text-xs font-bold text-slate-600 transition-all font-sans"
              >
                Trước
              </button>
              <button
                onClick={() => setWeekOffset(0)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${weekOffset === 0 ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Hiện tại
              </button>
              <button
                onClick={() => setWeekOffset(prev => prev + 1)}
                className="px-3 py-1.5 hover:bg-white hover:shadow-sm rounded-lg text-xs font-bold text-slate-600 transition-all disabled:opacity-30"
                disabled={weekOffset >= 0}
              >
                Tiếp
              </button>
            </div>

            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div> Homepage
            </div>
          </div>
        </div>

        <div className="h-[350px] w-full">
          {loading ? (
            <div className="h-full w-full flex items-center justify-center text-slate-400">
              <Loader2 className="animate-spin mr-2" /> Đang tải biểu đồ...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
                />
                <Tooltip
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                  contentStyle={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    padding: '12px'
                  }}
                  itemStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                  labelStyle={{ color: '#64748b', fontWeight: 'bold' }}
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      const dayName = payload[0].payload.name;
                      const isToday = label === `${new Date().getDate().toString().padStart(2, '0')}/${(new Date().getMonth() + 1).toString().padStart(2, '0')}` && weekOffset === 0;
                      return `${dayName} (${label})${isToday ? ' - Hôm nay' : ''}`;
                    }
                    return label;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="visits"
                  name="Lượt truy cập"
                  stroke="#2563eb"
                  strokeWidth={4}
                  dot={{ fill: '#2563eb', strokeWidth: 2, r: 4, fillOpacity: 1 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  fillOpacity={1}
                  fill="url(#colorVisits)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
