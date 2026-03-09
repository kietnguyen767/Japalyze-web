//app/roadmap/n5/w11/w11-vocab/page.tsx
'use client';

import { Suspense } from 'react';
import { Smile } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';
import { WEEK11_VOCAB } from '@/lib/n5VocabData';

const LESSON_TOPICS: Record<string, VocabTopic[]> = {
    'lesson18': [
        {
            subQuestId: 'lesson18',
            categoryId: 'lesson18',
            label: 'Bài 18: Khả năng',
            desc: 'Có thể làm được, sở thích...',
            icon: Smile,
            color: 'yellow'
        }
    ],
    'lesson19': [
        {
            subQuestId: 'lesson19',
            categoryId: 'lesson19',
            label: 'Bài 19: Kinh nghiệm',
            desc: 'Đã từng làm, liệt kê hành động...',
            icon: Smile,
            color: 'yellow'
        }
    ]
};

function VocabContent() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w11_1';
    const lesson = searchParams?.get('lesson') || 'lesson18';

    const topics = LESSON_TOPICS[lesson] || LESSON_TOPICS['lesson18'];

    return (
        <VocabHub
            weekTitle={`Tuần 11 - ${lesson === 'lesson18' ? 'Bài 18' : 'Bài 19'}`}
            lessonTitle={lesson === 'lesson18' ? "Từ vựng: Khả năng & Sở thích" : "Từ vựng: Kinh nghiệm & Trạng thái"}
            topics={topics}
            vocabData={WEEK11_VOCAB}
            questId={questId}
        />
    );
}

export default function Week11VocabHub() {
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
