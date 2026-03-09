// app/roadmap/n5/w10/w10-grammar/page.tsx
'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { WEEK10_GRAMMAR_DATA, WEEK10_GRAMMAR_QUIZ } from '@/lib/n5GrammarData';
import GrammarHub from '@/components/roadmap/GrammarHub';

function GrammarContent() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w10_2';
    const lesson = searchParams?.get('lesson') || 'lesson16';

    const filteredData = WEEK10_GRAMMAR_DATA.filter(p => p.quiz.category === lesson);
    const filteredQuiz = WEEK10_GRAMMAR_QUIZ.filter(q => q.category === lesson);
    const lessonLabel = lesson === 'lesson16' ? "Bài 16" : "Bài 17";

    return (
        <GrammarHub
            weekTitle={`Tuần 10 - ${lessonLabel}`}
            lessonTitle="Ngữ pháp"
            grammarData={filteredData}
            quizData={filteredQuiz}
            questId={questId}
            conversationLink="/exercises/routine?context=roadmap"
        />
    );
}

export default function W10GrammarPage() {
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
