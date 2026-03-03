// components/FormattedText.tsx
'use client';

import React from 'react';

interface FormattedTextProps {
    text: string;
    className?: string;
}

/**
 * Hiển thị nội dung có hỗ trợ thẻ <u> cho các đề thi.
 * Được thiết kế để gạch chân từ khóa hoặc phần cần điền trong JLPT.
 */
export default function FormattedText({ text, className = "" }: FormattedTextProps) {
    if (!text) return null;

    // Nếu không có thẻ <u>, trả về text bình thường để tối ưu
    if (!text.includes('<u>')) {
        return <span className={className}>{text}</span>;
    }

    // Sử dụng dangerouslySetInnerHTML để render thẻ <u>
    // Vì nội dung này do Admin quản lý nên mức độ an toàn cao.
    // Style <u> để có khoảng cách (offset) và màu sắc nhấn mạnh nếu cần.
    return (
        <span
            className={`formatted-text ${className}`}
            dangerouslySetInnerHTML={{
                __html: text.replace(/<u>/g, '<u class="decoration-indigo-500 decoration-2 underline-offset-4 font-bold text-indigo-700">')
            }}
        />
    );
}
