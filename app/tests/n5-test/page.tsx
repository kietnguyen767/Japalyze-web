// app/tests/n5-test/page.tsx
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import RoadmapTest from '@/components/roadmap/RoadmapTest';
import {
    WEEK3_TEST, WEEK4_TEST, WEEK5_TEST, WEEK6_TEST,
    WEEK7_TEST, WEEK8_TEST, WEEK9_TEST, WEEK10_TEST, WEEK11_TEST
} from '@/lib/n5TestData';

const TEST_DATA_MAP: Record<string, { title: string, questions: any[] }> = {
    'w3': { title: "Kiểm tra tổng hợp Tuần 3", questions: WEEK3_TEST },
    'w4': { title: "Kiểm tra tổng hợp Tuần 4", questions: WEEK4_TEST },
    'w5': { title: "Kiểm tra tổng hợp Tuần 5", questions: WEEK5_TEST },
    'w6': { title: "Kiểm tra tổng hợp Tuần 6", questions: WEEK6_TEST },
    'w7': { title: "Kiểm tra tổng hợp Tuần 7", questions: WEEK7_TEST },
    'w8': { title: "Kiểm tra tổng hợp Tuần 8", questions: WEEK8_TEST },
    'w9': { title: "Kiểm tra tổng hợp Tuần 9", questions: WEEK9_TEST },
    'w10': { title: "Kiểm tra tổng hợp Tuần 10", questions: WEEK10_TEST },
    'w11': { title: "Kiểm tra tổng hợp Tuần 11", questions: WEEK11_TEST },
};

function TestContent() {
    const searchParams = useSearchParams();
    const week = searchParams?.get('week') || 'w3';
    const questId = searchParams?.get('questId') || `${week}_test`;

    const testInfo = TEST_DATA_MAP[week];

    if (!testInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center p-10 bg-white rounded-3xl shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Không tìm thấy bài thi</h2>
                    <p className="text-slate-500">Tuần học {week} không tồn tại hoặc chưa có bài kiểm tra.</p>
                </div>
            </div>
        );
    }

    return (
        <RoadmapTest
            title={testInfo.title}
            questions={testInfo.questions}
            questId={questId}
        />
    );
}

export default function N5RoadmapTestPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        }>
            <TestContent />
        </Suspense>
    );
}
