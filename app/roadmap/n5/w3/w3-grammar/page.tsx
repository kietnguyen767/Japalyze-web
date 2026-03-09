// app/roadmap/n5/w3/w3-grammar/page.tsx
'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { WEEK3_GRAMMAR_DATA, WEEK3_GRAMMAR_QUIZ } from '@/lib/n5GrammarData';
import GrammarHub from '@/components/roadmap/GrammarHub';

export default function W3GrammarPage() {
    const searchParams = useSearchParams();
    const questId = searchParams?.get('questId') || 'w3_2';

    // Filter data based on questId/Lesson
    // w3_2 -> Lesson 1 (g3_1_x)
    // w3_4 -> Lesson 2 (g3_2_x)
    // w3_x -> Lesson 3 (g3_3_x) - will add as a quest if needed

    let filteredGrammar = WEEK3_GRAMMAR_DATA;
    let filteredQuiz = WEEK3_GRAMMAR_QUIZ;

    if (questId === 'w3_2') {
        filteredGrammar = WEEK3_GRAMMAR_DATA.filter(p => p.id.startsWith('g3_1'));
        filteredQuiz = WEEK3_GRAMMAR_QUIZ.filter(q => (q as any).category === 'lesson1');
    } else if (questId === 'w3_4') {
        filteredGrammar = WEEK3_GRAMMAR_DATA.filter(p => p.id.startsWith('g3_2'));
        filteredQuiz = WEEK3_GRAMMAR_QUIZ.filter(q => (q as any).category === 'lesson2');
    } else if (questId === 'w3_6') {
        filteredGrammar = WEEK3_GRAMMAR_DATA.filter(p => p.id.startsWith('g3_3'));
        filteredQuiz = WEEK3_GRAMMAR_QUIZ.filter(q => (q as any).category === 'lesson3');
    }

    const lessonTitle =
        questId === 'w3_2' ? "Bài 1: Ngữ pháp & Giao tiếp" :
            questId === 'w3_4' ? "Bài 2: Ngữ pháp" :
                "Bài 3: Ngữ pháp";

    return (
        <GrammarHub
            weekTitle="Tuần 3"
            lessonTitle={lessonTitle}
            grammarData={filteredGrammar}
            quizData={filteredQuiz}
            questId={questId}
            conversationLink="/exercises/conv_1_intro?context=roadmap"
        />
    );
}
