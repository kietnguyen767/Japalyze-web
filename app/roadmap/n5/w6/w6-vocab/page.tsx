//app/roadmap/n5/w6/w6-vocab/page.tsx
'use client';

import { Smile, Palette, Clapperboard, Heart, Music } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';

const VOCAB_TOPICS: VocabTopic[] = [
    { subQuestId: 'w6_vocab_emotions', lessonId: 'emotions', label: 'Tính chất', desc: 'Miêu tả sự vật', icon: Smile, color: 'yellow' },
    { subQuestId: 'w6_vocab_hobbies', lessonId: 'hobbies', label: 'Sở thích', desc: 'Năng lực cá nhân', icon: Palette, color: 'pink' },
    { subQuestId: 'w6_vocab_media', lessonId: 'media', label: 'Truyền thông', desc: 'Phim & Báo chí', icon: Clapperboard, color: 'violet' },
    { subQuestId: 'w6_vocab_interests', lessonId: 'love', label: 'Quan tâm', desc: 'Yêu thích & Đam mê', icon: Heart, color: 'rose' },
    { subQuestId: 'w6_vocab_arts', lessonId: 'music', label: 'Nghệ thuật', desc: 'Âm nhạc & Nhạc cụ', icon: Music, color: 'fuchsia' },
];

export default function Week6VocabHub() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w6_2';

    return (
        <VocabHub
            weekTitle="Tuần 6 - Bài 9"
            lessonTitle="Từ vựng & Chữ Hán"
            topics={VOCAB_TOPICS}
            questId={questId}
        />
    );
}
