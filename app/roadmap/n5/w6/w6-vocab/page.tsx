//app/roadmap/n5/w6/w6-vocab/page.tsx
'use client';

import { Suspense } from 'react';
import { Clock, CloudSun } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';
import { WEEK6_VOCAB } from '@/lib/n5VocabData';

const LESSON_TOPICS: Record<string, VocabTopic[]> = {
    'lesson8': [
        {
            subQuestId: 'lesson8',
            categoryId: 'lesson8',
            label: 'Bài 8: Tính từ',
            desc: 'Mới, cũ, to, nhỏ, nóng, lạnh...',
            icon: Clock,
            color: 'indigo'
        }
    ],
    'lesson9': [
        {
            subQuestId: 'lesson9',
            categoryId: 'lesson9',
            label: 'Bài 9: Sở thích',
            desc: 'Thích, ghét, giỏi, kém, thể thao...',
            icon: CloudSun,
            color: 'sky'
        }
    ]
};

function VocabContent() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w6_1';
    const lesson = searchParams?.get('lesson') || 'lesson8';

    const topics = LESSON_TOPICS[lesson] || LESSON_TOPICS['lesson8'];

    return (
        <VocabHub
            weekTitle={`Tuần 6 - ${lesson === 'lesson8' ? 'Bài 8' : 'Bài 9'}`}
            lessonTitle={lesson === 'lesson8' ? "Từ vựng: Tính từ miêu tả" : "Từ vựng: Sở thích & Năng lực"}
            topics={topics}
            vocabData={WEEK6_VOCAB}
            questId={questId}
        />
    );
}

export default function Week6VocabHub() {
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
