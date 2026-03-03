//app/roadmap/n5/week1_2/practice/page.tsx
'use client';

import { ArrowLeft, Sword, CheckCircle2 } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// Sub-quest IDs nội bộ cho từng bài tập (không hiện trên roadmap)
// Khi đủ cả nhóm → API tự mark quest cha (w1_2 / w2_2)
const PRACTICE_CARDS = [
  {
    subQuestId: 'prac_hira',
    href: '/exercises/hiragana',
    label: 'Luyện Hiragana',
    desc: 'Ôn tập bảng chữ mềm qua bài tập trắc nghiệm.',
    kana: 'あ',
    hoverBorder: 'hover:border-blue-400',
    hoverBg: 'group-hover:bg-blue-600',
    hoverText: 'group-hover:text-blue-600',
    iconBg: 'bg-blue-50',
    iconText: 'text-blue-600',
    btnText: 'text-blue-600',
  },
  {
    subQuestId: 'prac_hira_daku',
    href: '/exercises/hiragana-dakuten',
    label: 'Hiragana Âm đục',
    desc: 'Luyện が・ざ・だ・ば・ぱ và các biến âm.',
    kana: 'が',
    hoverBorder: 'hover:border-purple-400',
    hoverBg: 'group-hover:bg-purple-600',
    hoverText: 'group-hover:text-purple-600',
    iconBg: 'bg-purple-50',
    iconText: 'text-purple-600',
    btnText: 'text-purple-600',
  },
  {
    subQuestId: 'prac_kata',
    href: '/exercises/katakana',
    label: 'Luyện Katakana',
    desc: 'Ôn tập bảng chữ cứng qua bài tập trắc nghiệm.',
    kana: 'ア',
    hoverBorder: 'hover:border-orange-400',
    hoverBg: 'group-hover:bg-orange-600',
    hoverText: 'group-hover:text-orange-600',
    iconBg: 'bg-orange-50',
    iconText: 'text-orange-600',
    btnText: 'text-orange-600',
  },
  {
    subQuestId: 'prac_kata_daku',
    href: '/exercises/katakana-dakuten',
    label: 'Katakana Âm đục',
    desc: 'Luyện ガ・ザ・ダ・バ・パ và các biến âm.',
    kana: 'ガ',
    hoverBorder: 'hover:border-fuchsia-400',
    hoverBg: 'group-hover:bg-fuchsia-600',
    hoverText: 'group-hover:text-fuchsia-600',
    iconBg: 'bg-fuchsia-50',
    iconText: 'text-fuchsia-600',
    btnText: 'text-fuchsia-600',
  },
];

export default function Phase1PracticeMenu() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const tab = searchParams?.get('tab'); // 'hira' or 'kata'
  const questId = searchParams?.get('questId');

  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/user/roadmap-progress')
      .then(r => r.json())
      .then(data => {
        setCompletedIds(new Set(data.completedQuestIds as string[]));
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const filteredCards = PRACTICE_CARDS.filter(c => !tab || c.subQuestId.includes(tab));
  const totalCount = filteredCards.length;
  const doneCount = filteredCards.filter(c => completedIds.has(c.subQuestId)).length;

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-700">

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => router.back()}
            className="group flex items-center text-slate-500 hover:text-blue-600 font-bold transition-colors text-sm"
          >
            <div className="p-2 bg-white border border-slate-200 rounded-full mr-3 group-hover:border-blue-200 transition-colors">
              <ArrowLeft size={16} />
            </div>
            Quay lại Lộ trình
          </button>
          <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-bold uppercase">
            <Sword size={14} /> Thực chiến
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-800 mb-2">Ghi Nhớ Mặt Chữ</h1>
          <p className="text-slate-500 mb-3">Hoàn thành cả {totalCount} bài tập để đánh dấu nhiệm vụ.</p>
          {/* Progress bar */}
          <div className="max-w-xs mx-auto">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Tiến độ</span>
              <span className={doneCount === totalCount ? 'text-green-600 font-bold' : ''}>{doneCount}/{totalCount} bài</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500"
                style={{ width: `${(doneCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {filteredCards.map(card => {
            const isDone = completedIds.has(card.subQuestId);
            return (
              <Link
                key={card.subQuestId}
                href={`${card.href}?context=roadmap&questId=${card.subQuestId}`}
                className={`group bg-white rounded-[2rem] p-8 border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-center relative overflow-hidden
                  ${isDone ? 'border-green-300 bg-green-50/30' : `border-slate-200 ${card.hoverBorder}`}`}
              >
                {/* Done badge */}
                {isDone && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 text-green-600 text-xs font-bold">
                    <CheckCircle2 size={16} /> Xong
                  </div>
                )}

                <div className={`w-20 h-20 ${card.iconBg} ${card.iconText} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <span className="text-4xl font-black">{card.kana}</span>
                </div>
                <h2 className={`text-xl font-bold text-slate-800 mb-2 ${card.hoverText}`}>{card.label}</h2>
                <p className="text-sm text-slate-500">{card.desc}</p>
                <div className={`mt-6 py-3 px-6 bg-slate-50 rounded-xl ${card.btnText} font-bold text-sm ${card.hoverBg} group-hover:text-white transition-colors`}>
                  {isDone ? 'Làm lại' : 'Bắt đầu ngay'}
                </div>
              </Link>
            );
          })}
        </div>

        {doneCount >= totalCount && questId && !completedIds.has(questId) && (
          <div className="mt-8 text-center p-6 bg-green-50 border-2 border-green-200 rounded-3xl max-w-md mx-auto shadow-sm">
            <CheckCircle2 className="text-green-600 mx-auto mb-3" size={32} />
            <p className="font-bold text-green-800 text-lg mb-1">Tuyệt vời!</p>
            <p className="text-green-600 text-sm mb-4">Bạn đã hoàn thành các bài tập mục tiêu.</p>
            <button
              onClick={async () => {
                setSubmitting(true);
                try {
                  await fetch('/api/user/complete-quest', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ questId }),
                  });
                  queryClient.invalidateQueries({ queryKey: ['roadmap-progress'] });
                  queryClient.invalidateQueries({ queryKey: ['dashboard-data'] });
                  router.back();
                } catch { setSubmitting(false); }
              }}
              disabled={submitting}
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200"
            >
              {submitting ? 'Đang lưu...' : 'Xác nhận hoàn thành'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}