// app/roadmap/n5/w4/w4-grammar/page.tsx
'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { WEEK4_GRAMMAR_DATA, WEEK4_GRAMMAR_QUIZ } from '@/lib/n5GrammarData';
import GrammarHub from '@/components/roadmap/GrammarHub';

function GrammarContent() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w4_2';
    const lesson = searchParams?.get('lesson') || 'lesson4';

    const filteredData = WEEK4_GRAMMAR_DATA.filter(p => p.quiz.category === lesson);
    const filteredQuiz = WEEK4_GRAMMAR_QUIZ.filter(q => q.category === lesson);
    const lessonTitle = lesson === 'lesson4' ? "Bài 4: Thời gian" : "Bài 5: Di chuyển";

    return (
        <GrammarHub
            weekTitle={`Tuần 4 - ${lessonTitle}`}
            lessonTitle="Ngữ pháp"
            grammarData={filteredData}
            quizData={filteredQuiz}
            questId={questId}
            conversationLink="/exercises/routine?context=roadmap"
        />
    );
}

export default function W4GrammarPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        }>
            <GrammarContent />
        </Suspense>
    );
}
