//app/roadmap/n5/w3/w3-vocab/page.tsx
'use client';

import { Users, UserPlus, Briefcase, MapPin, Hash, MessageCircle, Binary, BookText } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';

const VOCAB_TOPICS: VocabTopic[] = [
    { subQuestId: 'w3_1_pronouns', lessonId: 'w3-1-pronouns', label: 'Xưng hô', desc: 'Đại từ nhân xưng', icon: Users, color: 'blue' },
    { subQuestId: 'w3_1_suffixes', lessonId: 'w3-1-suffixes', label: 'Hậu tố tên', desc: 'さん, ちゃん, 君...', icon: UserPlus, color: 'purple' },
    { subQuestId: 'w3_1_jobs', lessonId: 'w3-1-jobs', label: 'Nghề nghiệp', desc: 'Công việc & Chức danh', icon: Briefcase, color: 'indigo' },
    { subQuestId: 'w3_1_places', lessonId: 'w3-1-places', label: 'Địa điểm & Từ hỏi', desc: 'Trường học, Bệnh viện...', icon: MapPin, color: 'emerald' },
    { subQuestId: 'w3_1_age', lessonId: 'w3-1-age', label: 'Tuổi tác', desc: 'Cách đếm tuổi', icon: Hash, color: 'orange' },
    { subQuestId: 'w3_1_phrases', lessonId: 'w3-1-phrases', label: 'Giao tiếp', desc: 'Chào hỏi & Giới thiệu', icon: MessageCircle, color: 'sky' },
    { subQuestId: 'w3_1_kanji_nums', lessonId: 'w3-1-kanji-num', label: 'Hán tự Số', desc: '一 đến 十, 百, 千, 万', icon: Binary, color: 'rose' },
    { subQuestId: 'w3_1_kanji_basic', lessonId: 'w3-1-kanji-basic', label: 'Hán tự cơ bản', desc: '人, 日, 月', icon: BookText, color: 'slate' },
];

export default function Week3Vocab1Hub() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w3_1';

    return (
        <VocabHub
            weekTitle="Tuần 3 - Bài 1"
            lessonTitle="Từ vựng & Chữ Hán"
            topics={VOCAB_TOPICS}
            questId={questId}
        />
    );
}
