//app/roadmap/n5/w8/w8-vocab/page.tsx
'use client';

import { Suspense } from 'react';
import { Sparkles } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';
import { WEEK8_VOCAB } from '@/lib/n5VocabData';

const LESSON_TOPICS: Record<string, VocabTopic[]> = {
    'lesson12': [
        {
            subQuestId: 'lesson12',
            categoryId: 'lesson12',
            label: 'Bài 12: So sánh',
            desc: 'Dễ hơn, nhanh hơn, nhất...',
            icon: Sparkles,
            color: 'amber'
        }
    ],
    'lesson13': [
        {
            subQuestId: 'lesson13',
            categoryId: 'lesson13',
            label: 'Bài 13: Mong muốn',
            desc: 'Muốn đồ vật, muốn làm gì...',
            icon: Sparkles,
            color: 'amber'
        }
    ]
};

function VocabContent() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w8_1';
    const lesson = searchParams?.get('lesson') || 'lesson12';

    const topics = LESSON_TOPICS[lesson] || LESSON_TOPICS['lesson12'];

    return (
        <VocabHub
            weekTitle={`Tuần 8 - ${lesson === 'lesson12' ? 'Bài 12' : 'Bài 13'}`}
            lessonTitle={lesson === 'lesson12' ? "Từ vựng: So sánh" : "Từ vựng: Mong muốn"}
            topics={topics}
            vocabData={WEEK8_VOCAB}
            questId={questId}
        />
    );
}

export default function Week8VocabHub() {
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
