// app/roadmap/n5/w7/w7-grammar/page.tsx
'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { WEEK7_GRAMMAR_DATA, WEEK7_GRAMMAR_QUIZ } from '@/lib/n5GrammarData';
import GrammarHub from '@/components/roadmap/GrammarHub';

function GrammarContent() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w7_2';
    const lesson = searchParams?.get('lesson') || 'lesson10';

    const filteredData = WEEK7_GRAMMAR_DATA.filter(p => p.quiz.category === lesson);
    const filteredQuiz = WEEK7_GRAMMAR_QUIZ.filter(q => q.category === lesson);
    const lessonLabel = lesson === 'lesson10' ? "Bài 10" : "Bài 11";

    return (
        <GrammarHub
            weekTitle={`Tuần 7 - ${lessonLabel}`}
            lessonTitle="Ngữ pháp"
            grammarData={filteredData}
            quizData={filteredQuiz}
            questId={questId}
            conversationLink="/exercises/routine?context=roadmap"
        />
    );
}

export default function W7GrammarPage() {
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
