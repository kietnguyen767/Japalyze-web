'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                // Giữ dữ liệu trong 5 phút trước khi coi là cũ
                staleTime: 5 * 60 * 1000,
                // Giữ dữ liệu trong cache 10 phút kể cả khi không dùng
                gcTime: 10 * 60 * 1000,
                // Tắt refetch khi focus cửa sổ để tránh load quá nhiều
                refetchOnWindowFocus: false,
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
