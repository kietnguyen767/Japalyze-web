'use client';
import React from 'react';
import { Users, FileText, BookOpenText, FileQuestion } from 'lucide-react';

interface OverviewTabProps {
  counts: {
    users: number;
    posts: number;
    articles: number;
    tests: number;
  };
}

export default function OverviewTab({ counts }: OverviewTabProps) {
  const stats = [
    { label: 'Người dùng', count: counts.users, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Bài viết', count: counts.posts, icon: FileText, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Bài đọc', count: counts.articles, icon: BookOpenText, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Đề thi', count: counts.tests, icon: FileQuestion, color: 'text-purple-500', bg: 'bg-purple-50' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in-up">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">{stat.label}</h3>
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={stat.color} size={20}/>
            </div>
          </div>
          <p className="text-4xl font-black text-slate-800">{stat.count}</p>
        </div>
      ))}
    </div>
  );
}