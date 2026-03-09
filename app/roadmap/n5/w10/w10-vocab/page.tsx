//app/roadmap/n5/w10/w10-vocab/page.tsx
'use client';

import { Suspense } from 'react';
import { Star } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';
import { WEEK10_VOCAB } from '@/lib/n5VocabData';

const LESSON_TOPICS: Record<string, VocabTopic[]> = {
    'lesson16': [
        {
            subQuestId: 'lesson16',
            categoryId: 'lesson16',
            label: 'Bài 16: Kết nối',
            desc: 'Tắm, cho vào, lấy ra, đi bộ...',
            icon: Star,
            color: 'yellow'
        }
    ],
    'lesson17': [
        {
            subQuestId: 'lesson17',
            categoryId: 'lesson17',
            label: 'Bài 17: Sức khỏe',
            desc: 'Cơ thể, bệnh tật, lo lắng...',
            icon: Star,
            color: 'yellow'
        }
    ]
};

function VocabContent() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w10_1';
    const lesson = searchParams?.get('lesson') || 'lesson16';

    const topics = LESSON_TOPICS[lesson] || LESSON_TOPICS['lesson16'];

    return (
        <VocabHub
            weekTitle={`Tuần 10 - ${lesson === 'lesson16' ? 'Bài 16' : 'Bài 17'}`}
            lessonTitle={lesson === 'lesson16' ? "Từ vựng: Hoạt động & Kết nối" : "Từ vựng: Cơ thể & Sức khỏe"}
            topics={topics}
            vocabData={WEEK10_VOCAB}
            questId={questId}
        />
    );
}

export default function Week10VocabHub() {
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
