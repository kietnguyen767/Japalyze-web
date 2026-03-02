//app/roadmap/n5/w11/w11-vocab/page.tsx
'use client';

import { Plane, Map, Palette, Gamepad2, Smile } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';

const VOCAB_TOPICS: VocabTopic[] = [
    { subQuestId: 'w11_vocab_travel', lessonId: 'travel', label: 'Du lịch', desc: 'Kế hoạch & Vé tàu', icon: Plane, color: 'sky' },
    { subQuestId: 'w11_vocab_exp', lessonId: 'travel', label: 'Kinh nghiệm', desc: 'Đã từng đi đâu...', icon: Map, color: 'emerald' },
    { subQuestId: 'w11_vocab_ability', lessonId: 'hobbies', label: 'Khả năng', desc: 'Có thể làm được...', icon: Smile, color: 'yellow' },
    { subQuestId: 'w11_vocab_rec', lessonId: 'hobbies', label: 'Giải trí', desc: 'Hoạt động vui chơi', icon: Gamepad2, color: 'rose' },
    { subQuestId: 'w11_vocab_hobby', lessonId: 'hobbies', label: 'Sở thích', desc: 'Đam mê cá nhân', icon: Palette, color: 'pink' },
];

export default function Week11VocabHub() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w11_2';

    return (
        <VocabHub
            weekTitle="Tuần 11 - Bài 19"
            lessonTitle="Từ vựng & Chữ Hán"
            topics={VOCAB_TOPICS}
            questId={questId}
        />
    );
}
