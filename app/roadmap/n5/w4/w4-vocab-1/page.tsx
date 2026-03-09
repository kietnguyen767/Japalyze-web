//app/roadmap/n5/w4/w4-vocab-1/page.tsx
'use client';

import { Suspense } from 'react';
import { Package } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';
import { WEEK4_VOCAB } from '@/lib/n5VocabData';

const VOCAB_TOPICS: VocabTopic[] = [
    {
        subQuestId: 'lesson4',
        categoryId: 'lesson4',
        label: 'Bài 4: Thời gian',
        desc: 'Giờ giấc, phút, sáng/chiều...',
        icon: Package,
        color: 'indigo'
    },
];

function VocabContent() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w4_1';

    return (
        <VocabHub
            weekTitle="Tuần 4 - Bài 4"
            lessonTitle="Từ vựng: Thời gian & Công việc"
            topics={VOCAB_TOPICS}
            vocabData={WEEK4_VOCAB}
            questId={questId}
        />
    );
}

export default function Week4Vocab1Hub() {
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
