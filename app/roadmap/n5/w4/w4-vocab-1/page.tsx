//app/roadmap/n5/w4/w4-vocab-1/page.tsx
'use client';

import { Trophy, CloudSun, Cpu, Armchair, Shirt } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';

const VOCAB_TOPICS: VocabTopic[] = [
    { subQuestId: 'w4_1_sports', lessonId: 'sports', label: 'Thể thao', desc: 'Vận động & Thi đấu', icon: Trophy, color: 'cyan' },
    { subQuestId: 'w4_1_weather', lessonId: 'weather', label: 'Thời tiết', desc: 'Sự kiện thiên nhiên', icon: CloudSun, color: 'sky' },
    { subQuestId: 'w4_1_electro', lessonId: 'electronics', label: 'Điện tử', desc: 'Linh kiện & Thiết bị', icon: Cpu, color: 'blue' },
    { subQuestId: 'w4_1_house', lessonId: 'household', label: 'Đồ gia dụng', desc: 'Nội thất & Trang trí', icon: Armchair, color: 'amber' },
    { subQuestId: 'w4_1_work', lessonId: 'housework', label: 'Việc nhà', desc: 'Sinh hoạt gia đình', icon: Shirt, color: 'teal' },
];

export default function Week4Vocab1Hub() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w4_1';

    return (
        <VocabHub
            weekTitle="Tuần 4 - Bài 4"
            lessonTitle="Từ vựng & Chữ Hán"
            topics={VOCAB_TOPICS}
            questId={questId}
        />
    );
}
