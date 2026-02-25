'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideNavbarPaths = ['/login', '/register'];
    const shouldHideNavbar = pathname ? hideNavbarPaths.includes(pathname) : false;

    return (
        <div className="flex flex-col min-h-screen">
            {!shouldHideNavbar && (
                <div className="sticky top-0 z-[999] bg-white border-b border-slate-200">
                    <Navbar />
                </div>
            )}
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
