//app/roadmap/n5/w3/w3-vocab-2/page.tsx
'use client';

import { UtensilsCrossed, Apple, Carrot, Music, School } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';

const VOCAB_TOPICS: VocabTopic[] = [
    { subQuestId: 'w3_3_food', lessonId: 'food', label: 'Ẩm thực', desc: 'Món ăn & Đồ uống', icon: UtensilsCrossed, color: 'orange' },
    { subQuestId: 'w3_3_fruits', lessonId: 'fruits', label: 'Trái cây', desc: 'Các loại hoa quả', icon: Apple, color: 'red' },
    { subQuestId: 'w3_3_veggies', lessonId: 'vegetables', label: 'Rau củ', desc: 'Rau củ tươi sống', icon: Carrot, color: 'green' },
    { subQuestId: 'w3_3_music', lessonId: 'music', label: 'Âm nhạc', desc: 'Nhạc cụ & Thể loại', icon: Music, color: 'fuchsia' },
    { subQuestId: 'w3_3_school', lessonId: 'school', label: 'Trường học', desc: 'Dụng cụ & Môn học', icon: School, color: 'indigo' },
];

export default function Week3Vocab2Hub() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w3_3';

    return (
        <VocabHub
            weekTitle="Tuần 3 - Bài 2"
            lessonTitle="Từ vựng & Chữ Hán"
            topics={VOCAB_TOPICS}
            questId={questId}
        />
    );
}
