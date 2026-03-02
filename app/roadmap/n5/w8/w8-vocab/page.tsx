//app/roadmap/n5/w8/w8-vocab/page.tsx
'use client';

import { Heart, Trophy, PartyPopper, Smile, Apple } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';

const VOCAB_TOPICS: VocabTopic[] = [
    { subQuestId: 'w8_vocab_desire', lessonId: 'love', label: 'Mong muốn', desc: 'Hy vọng & Nguyện vọng', icon: Heart, color: 'pink' },
    { subQuestId: 'w8_vocab_comp', lessonId: 'sports', label: 'So sánh', desc: 'Hơn kém & Nhất', icon: Trophy, color: 'cyan' },
    { subQuestId: 'w8_vocab_fest', lessonId: 'festivals', label: 'Sự kiện', desc: 'Lễ hội & Kỳ nghỉ', icon: PartyPopper, color: 'orange' },
    { subQuestId: 'w8_vocab_feel', lessonId: 'emotions', label: 'Cảm giác', desc: 'Thích & Ghét', icon: Smile, color: 'yellow' },
    { subQuestId: 'w8_vocab_items', lessonId: 'fruits', label: 'Đồ vật', desc: 'Lựa chọn đồ vật', icon: Apple, color: 'red' },
];

export default function Week8VocabHub() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w8_2';

    return (
        <VocabHub
            weekTitle="Tuần 8 - Bài 13"
            lessonTitle="Từ vựng & Chữ Hán"
            topics={VOCAB_TOPICS}
            questId={questId}
        />
    );
}
