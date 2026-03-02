//app/roadmap/n5/w9/w9-vocab/page.tsx
'use client';

import { Briefcase, UserCheck, AlarmClock, Home, ShieldCheck } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import VocabHub, { VocabTopic } from '@/components/roadmap/VocabHub';

const VOCAB_TOPICS: VocabTopic[] = [
    { subQuestId: 'w9_vocab_jobs', lessonId: 'jobs', label: 'Nghề nghiệp', desc: 'Các loại công việc', icon: Briefcase, color: 'slate' },
    { subQuestId: 'w9_vocab_status', lessonId: 'routine', label: 'Trạng thái', desc: 'Đang làm gì...', icon: UserCheck, color: 'indigo' },
    { subQuestId: 'w9_vocab_daily', lessonId: 'routine', label: 'Sinh hoạt', desc: 'Hoạt động hằng ngày', icon: AlarmClock, color: 'teal' },
    { subQuestId: 'w9_vocab_house', lessonId: 'housework', label: 'Việc nhà', desc: 'Dọn dẹp & Nấu nướng', icon: Home, color: 'cyan' },
    { subQuestId: 'w9_vocab_perm', lessonId: 'routine', label: 'Cho phép', desc: 'Quy định & Luật lệ', icon: ShieldCheck, color: 'blue' },
];

export default function Week9VocabHub() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w9_2';

    return (
        <VocabHub
            weekTitle="Tuần 9 - Bài 15"
            lessonTitle="Từ vựng & Chữ Hán"
            topics={VOCAB_TOPICS}
            questId={questId}
        />
    );
}
