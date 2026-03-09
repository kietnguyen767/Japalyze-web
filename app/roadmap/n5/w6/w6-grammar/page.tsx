// app/roadmap/n5/w6/w6-grammar/page.tsx
'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { WEEK6_GRAMMAR_DATA, WEEK6_GRAMMAR_QUIZ } from '@/lib/n5GrammarData';
import GrammarHub from '@/components/roadmap/GrammarHub';

function GrammarContent() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w6_2';
    const lesson = searchParams?.get('lesson') || 'lesson8';

    const filteredData = WEEK6_GRAMMAR_DATA.filter(p => p.quiz.category === lesson);
    const filteredQuiz = WEEK6_GRAMMAR_QUIZ.filter(q => q.category === lesson);
    const lessonLabel = lesson === 'lesson8' ? "Bài 8" : "Bài 9";

    return (
        <GrammarHub
            weekTitle={`Tuần 6 - ${lessonLabel}`}
            lessonTitle="Ngữ pháp"
            grammarData={filteredData}
            quizData={filteredQuiz}
            questId={questId}
            conversationLink="/exercises/media?context=roadmap"
        />
    );
}

export default function W6GrammarPage() {
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
