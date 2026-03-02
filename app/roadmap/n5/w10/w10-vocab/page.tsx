//app/roadmap/n5/w10/w10-vocab/page.tsx
'use client';

import { Carrot, Apple, AlarmClock, Heart, UserCheck } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';

const VOCAB_TOPICS: VocabTopic[] = [
    { subQuestId: 'w10_vocab_veggies', lessonId: 'vegetables', label: 'Rau củ', desc: 'Thực phẩm xanh', icon: Carrot, color: 'green' },
    { subQuestId: 'w10_vocab_fruits', lessonId: 'fruits', label: 'Trái cây', desc: 'Hoa quả tươi', icon: Apple, color: 'red' },
    { subQuestId: 'w10_vocab_body', lessonId: 'routine', label: 'Cơ thể', desc: 'Sức khỏe & Bộ phận', icon: UserCheck, color: 'pink' },
    { subQuestId: 'w10_vocab_must', lessonId: 'routine', label: 'Cần thiết', desc: 'Việc phải làm', icon: AlarmClock, color: 'teal' },
    { subQuestId: 'w10_vocab_order', lessonId: 'routine', label: 'Trình tự', desc: 'Thứ tự hành động', icon: Heart, color: 'rose' },
];

export default function Week10VocabHub() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w10_2';

    return (
        <VocabHub
            weekTitle="Tuần 10 - Bài 17"
            lessonTitle="Từ vựng & Chữ Hán"
            topics={VOCAB_TOPICS}
            questId={questId}
        />
    );
}
