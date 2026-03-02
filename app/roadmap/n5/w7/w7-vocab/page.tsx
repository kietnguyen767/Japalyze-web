//app/roadmap/n5/w7/w7-vocab/page.tsx
'use client';

import { Hash, AlarmClock, Home, Map } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';

const VOCAB_TOPICS: VocabTopic[] = [
    { subQuestId: 'w7_vocab_numbers', lessonId: 'numbers', label: 'Số lượng', desc: 'Đếm đồ vật & người', icon: Hash, color: 'emerald' },
    { subQuestId: 'w7_vocab_time', lessonId: 'routine', label: 'Thời gian', desc: 'Khoảng thời gian', icon: AlarmClock, color: 'teal' },
    { subQuestId: 'w7_vocab_pos', lessonId: 'household', label: 'Vị trí', desc: 'Trên, dưới, trái, phải', icon: Home, color: 'amber' },
    { subQuestId: 'w7_vocab_places', lessonId: 'travel', label: 'Địa điểm', desc: 'Sắp xếp đồ vật', icon: Map, color: 'sky' },
];

export default function Week7VocabHub() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w7_2';

    return (
        <VocabHub
            weekTitle="Tuần 7 - Bài 11"
            lessonTitle="Từ vựng & Chữ Hán"
            topics={VOCAB_TOPICS}
            questId={questId}
        />
    );
}
