//app/roadmap/n5/w3/w3-vocab/page.tsx
'use client';

import { Hash, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';
import { WEEK3_VOCAB } from '@/lib/n5VocabData';

const VOCAB_TOPICS: VocabTopic[] = [
    {
        subQuestId: 'w3_1_nums',
        categoryId: 'w3_1_nums',
        label: 'Số đếm & Lượng từ',
        desc: 'Một cái, hai cái, 100, 1000...',
        icon: Hash,
        color: 'blue'
    },
    {
        subQuestId: 'w3_1_people',
        categoryId: 'w3_1_people',
        label: 'Con người & Gia đình',
        desc: 'Tôi, bạn, bố, mẹ, anh chị em...',
        icon: Users,
        color: 'purple'
    },
];

export default function Week3Vocab1Hub() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w3_1';

    return (
        <VocabHub
            weekTitle="Tuần 3 - Bài 1"
            lessonTitle="Từ vựng: Số đếm & Gia đình"
            topics={VOCAB_TOPICS}
            vocabData={WEEK3_VOCAB}
            questId={questId}
        />
    );
}
