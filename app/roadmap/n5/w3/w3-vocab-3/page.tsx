//app/roadmap/n5/w3/w3-vocab-3/page.tsx
'use client';

import { MapPin, Navigation } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';
import { WEEK3_VOCAB } from '@/lib/n5VocabData';

const VOCAB_TOPICS: VocabTopic[] = [
    {
        subQuestId: 'w3_3_positions',
        categoryId: 'w3_3_positions',
        label: 'Vị trí',
        desc: 'Chỗ này, đó, kia, phía này...',
        icon: Navigation,
        color: 'emerald'
    },
    {
        subQuestId: 'w3_3_facilities',
        categoryId: 'w3_3_facilities',
        label: 'Cơ sở vật chất',
        desc: 'Lớp học, nhà ăn, văn phòng...',
        icon: MapPin,
        color: 'indigo'
    },
];

export default function Week3Vocab3Hub() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w3_5';

    return (
        <VocabHub
            weekTitle="Tuần 3 - Bài 3"
            lessonTitle="Từ vựng: Địa điểm"
            topics={VOCAB_TOPICS}
            vocabData={WEEK3_VOCAB}
            questId={questId}
        />
    );
}
