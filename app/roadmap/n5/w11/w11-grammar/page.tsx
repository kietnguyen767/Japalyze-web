// app/roadmap/n5/w11/w11-grammar/page.tsx
'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { WEEK11_GRAMMAR_DATA, WEEK11_GRAMMAR_QUIZ } from '@/lib/n5GrammarData';
import GrammarHub from '@/components/roadmap/GrammarHub';

function GrammarContent() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w11_2';
    const lesson = searchParams?.get('lesson') || 'lesson18';

    const filteredData = WEEK11_GRAMMAR_DATA.filter(p => p.quiz.category === lesson);
    const filteredQuiz = WEEK11_GRAMMAR_QUIZ.filter(q => q.category === lesson);
    const lessonLabel = lesson === 'lesson18' ? "Bài 18" : "Bài 19";

    return (
        <GrammarHub
            weekTitle={`Tuần 11 - ${lessonLabel}`}
            lessonTitle="Ngữ pháp"
            grammarData={filteredData}
            quizData={filteredQuiz}
            questId={questId}
            conversationLink="/exercises/casual?context=roadmap"
        />
    );
}

export default function W11GrammarPage() {
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
