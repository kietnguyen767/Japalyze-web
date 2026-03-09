//app/roadmap/n5/w5/w5-vocab/page.tsx
'use client';

import { Suspense } from 'react';
import { MapPin, Move, Plane } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';
import { WEEK5_VOCAB } from '@/lib/n5VocabData';

const LESSON_TOPICS: Record<string, VocabTopic[]> = {
    'lesson6': [
        {
            subQuestId: 'lesson6',
            categoryId: 'lesson6',
            label: 'Bài 6: Ăn uống',
            desc: 'Đồ ăn, đồ uống, hành động ăn uống...',
            icon: Move,
            color: 'emerald'
        }
    ],
    'lesson7': [
        {
            subQuestId: 'lesson7',
            categoryId: 'lesson7',
            label: 'Bài 7: Công cụ & Quà tặng',
            desc: 'Dao, kéo, máy tính, tặng, nhận...',
            icon: Plane,
            color: 'sky'
        }
    ]
};

function VocabContent() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w5_1';
    const lesson = searchParams?.get('lesson') || 'lesson6';

    const topics = LESSON_TOPICS[lesson] || LESSON_TOPICS['lesson6'];

    return (
        <VocabHub
            weekTitle={`Tuần 5 - ${lesson === 'lesson6' ? 'Bài 6' : 'Bài 7'}`}
            lessonTitle={lesson === 'lesson6' ? "Từ vựng: Ăn uống & Hành động" : "Từ vựng: Công cụ & Tặng nhận"}
            topics={topics}
            vocabData={WEEK5_VOCAB}
            questId={questId}
        />
    );
}

export default function Week5VocabHub() {
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
