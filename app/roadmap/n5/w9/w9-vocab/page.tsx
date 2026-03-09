//app/roadmap/n5/w9/w9-vocab/page.tsx
'use client';

import { Suspense } from 'react';
import { Activity, MessageCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';
import { WEEK9_VOCAB } from '@/lib/n5VocabData';

const LESSON_TOPICS: Record<string, VocabTopic[]> = {
    'lesson14': [
        {
            subQuestId: 'lesson14',
            categoryId: 'lesson14',
            label: 'Bài 14: Thể Te',
            desc: 'Động từ, nhóm động từ, chia thể Te...',
            icon: Activity,
            color: 'indigo'
        }
    ],
    'lesson15': [
        {
            subQuestId: 'lesson15',
            categoryId: 'lesson15',
            label: 'Bài 15: Nghề nghiệp',
            desc: 'Nghề nghiệp, trạng thái đang diễn ra...',
            icon: Activity,
            color: 'indigo'
        }
    ]
};

function VocabContent() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w9_1';
    const lesson = searchParams?.get('lesson') || 'lesson14';

    const topics = LESSON_TOPICS[lesson] || LESSON_TOPICS['lesson14'];

    return (
        <VocabHub
            weekTitle={`Tuần 9 - ${lesson === 'lesson14' ? 'Bài 14' : 'Bài 15'}`}
            lessonTitle={lesson === 'lesson14' ? "Từ vựng: Động từ & Thể Te" : "Từ vựng: Nghề nghiệp & Trạng thái"}
            topics={topics}
            vocabData={WEEK9_VOCAB}
            questId={questId}
        />
    );
}

export default function Week9VocabHub() {
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
