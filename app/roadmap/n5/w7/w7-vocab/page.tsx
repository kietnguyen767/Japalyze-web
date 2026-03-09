//app/roadmap/n5/w7/w7-vocab/page.tsx
'use client';

import { Suspense } from 'react';
import { Play } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';
import { WEEK7_VOCAB } from '@/lib/n5VocabData';

const LESSON_TOPICS: Record<string, VocabTopic[]> = {
    'lesson10': [
        {
            subQuestId: 'lesson10',
            categoryId: 'lesson10',
            label: 'Bài 10: Tồn tại',
            desc: 'Đồ vật, con vật, vị trí...',
            icon: Play,
            color: 'rose'
        }
    ],
    'lesson11': [
        {
            subQuestId: 'lesson11',
            categoryId: 'lesson11',
            label: 'Bài 11: Lượng từ',
            desc: 'Cách đếm, số người, thời gian...',
            icon: Play,
            color: 'rose'
        }
    ]
};

function VocabContent() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w7_1';
    const lesson = searchParams?.get('lesson') || 'lesson10';

    const topics = LESSON_TOPICS[lesson] || LESSON_TOPICS['lesson10'];

    return (
        <VocabHub
            weekTitle={`Tuần 7 - ${lesson === 'lesson10' ? 'Bài 10' : 'Bài 11'}`}
            lessonTitle={lesson === 'lesson10' ? "Từ vựng: Tồn tại & Vị trí" : "Từ vựng: Lượng từ & Đếm"}
            topics={topics}
            vocabData={WEEK7_VOCAB}
            questId={questId}
        />
    );
}

export default function Week7VocabHub() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        }>
            <VocabContent />
        </Suspense>
    );
}
