'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, ShieldCheck } from 'lucide-react';

/**
 * RoadmapLayout: Lớp bảo vệ truy cập tập trung cho toàn bộ trang Lộ trình.
 * - Kiểm tra session của người dùng.
 * - Tự động chuyển hướng về /login nếu chưa đăng nhập.
 * - Hiển thị màn hình chờ (Loading) chuyên nghiệp trong quá trình kiểm tra.
 */
export default function RoadmapLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Chờ loading auth hoàn tất
        if (!loading) {
            // Nếu không có user -> Chuyển hướng về login kèm theo callback path nếu cần
            if (!user) {
                console.log('Roadmap protection: Unauthorized access to', pathname);
                router.push('/login');
            }
        }
    }, [user, loading, router, pathname]);

    // Màn hình chờ rỗng trong lúc kiểm tra hoặc chờ redirect
    if (loading || !user) {
        return null;
    }

    // Đã có user -> Cho phép hiển thị các trang roadmap
    return <>{children}</>;
}
