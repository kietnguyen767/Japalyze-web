//app/roadmap/n5/w4/w4-vocab-2/page.tsx
'use client';

import { Suspense } from 'react';
import { Utensils } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';
import { WEEK4_VOCAB } from '@/lib/n5VocabData';

const VOCAB_TOPICS: VocabTopic[] = [
    {
        subQuestId: 'lesson5',
        categoryId: 'lesson5',
        label: 'Bài 5: Di chuyển',
        desc: 'Đi, đến, về, phương tiện...',
        icon: Utensils,
        color: 'orange'
    },
];

function VocabContent() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w4_3';

    return (
        <VocabHub
            weekTitle="Tuần 4 - Bài 5"
            lessonTitle="Từ vựng: Di chuyển & Phương tiện"
            topics={VOCAB_TOPICS}
            vocabData={WEEK4_VOCAB}
            questId={questId}
        />
    );
}

export default function Week4Vocab2Hub() {
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
