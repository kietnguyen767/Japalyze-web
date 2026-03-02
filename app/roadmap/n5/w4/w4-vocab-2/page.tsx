//app/roadmap/n5/w4/w4-vocab-2/page.tsx
'use client';

import { Globe, Plane, Clapperboard, Smile, PartyPopper } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';

const VOCAB_TOPICS: VocabTopic[] = [
    { subQuestId: 'w4_3_countries', lessonId: 'countries', label: 'Quốc gia', desc: 'Tên các nước', icon: Globe, color: 'blue' },
    { subQuestId: 'w4_3_travel', lessonId: 'travel', label: 'Du lịch', desc: 'Khám phá thế giới', icon: Plane, color: 'sky' },
    { subQuestId: 'w4_3_media', lessonId: 'media', label: 'Truyền thông', desc: 'Phim ảnh & Báo chí', icon: Clapperboard, color: 'violet' },
    { subQuestId: 'w4_3_emotions', lessonId: 'emotions', label: 'Cảm xúc', desc: 'Tâm trạng con người', icon: Smile, color: 'yellow' },
    { subQuestId: 'w4_3_festivals', lessonId: 'festivals', label: 'Lễ hội', desc: 'Sự kiện & Văn hóa', icon: PartyPopper, color: 'orange' },
];

export default function Week4Vocab2Hub() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w4_3';

    return (
        <VocabHub
            weekTitle="Tuần 4 - Bài 5"
            lessonTitle="Từ vựng & Chữ Hán"
            topics={VOCAB_TOPICS}
            questId={questId}
        />
    );
}
