//app/roadmap/n5/w5/w5-vocab/page.tsx
'use client';

import { Utensils, ShoppingBag, Armchair, PartyPopper, Cpu } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';

const VOCAB_TOPICS: VocabTopic[] = [
    { subQuestId: 'w5_vocab_food', lessonId: 'food', label: 'Ăn uống', desc: 'Nhà hàng & Thực đơn', icon: Utensils, color: 'orange' },
    { subQuestId: 'w5_vocab_shop', lessonId: 'housework', label: 'Mua sắm', desc: 'Siêu thị & Chợ', icon: ShoppingBag, color: 'cyan' },
    { subQuestId: 'w5_vocab_tools', lessonId: 'household', label: 'Công cụ', desc: 'Dụng cụ gia đình', icon: Armchair, color: 'amber' },
    { subQuestId: 'w5_vocab_gifts', lessonId: 'festivals', label: 'Quà tặng', desc: 'Biếu tặng & Cảm ơn', icon: PartyPopper, color: 'rose' },
    { subQuestId: 'w5_vocab_electronics', lessonId: 'electronics', label: 'Điện tử', desc: 'Thiết bị gia dụng', icon: Cpu, color: 'blue' },
];

export default function Week5VocabHub() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w5_2';

    return (
        <VocabHub
            weekTitle="Tuần 5 - Bài 7"
            lessonTitle="Từ vựng & Chữ Hán"
            topics={VOCAB_TOPICS}
            questId={questId}
        />
    );
}
