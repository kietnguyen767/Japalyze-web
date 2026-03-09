//app/roadmap/n5/w3/w3-vocab-2/page.tsx
'use client';

import { Laptop, PenTool, Book, Gift, Key } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';
import { WEEK3_VOCAB } from '@/lib/n5VocabData';

const VOCAB_TOPICS: VocabTopic[] = [
    { subQuestId: 'w3_2_objects', categoryId: 'w3_2_objects', label: 'Đồ vật (Lesson 2)', desc: 'Cái này, cái đó, cái kia, sách, vở...', icon: Laptop, color: 'blue' },
];

export default function Week3Vocab2Hub() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w3_3';

    return (
        <VocabHub
            weekTitle="Tuần 3 - Bài 2"
            lessonTitle="Từ vựng: Đồ vật"
            topics={VOCAB_TOPICS}
            vocabData={WEEK3_VOCAB}
            questId={questId}
        />
    );
}
