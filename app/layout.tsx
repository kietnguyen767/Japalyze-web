import type { Metadata } from "next";
import "./globals.css";
import { Be_Vietnam_Pro } from "next/font/google";
import SnowEffect from "@/components/SnowEffect";
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: "JapaLyze - Học tiếng Nhật thông minh với AI",
  description: "Nền tảng học tiếng Nhật với AI, luyện thi JLPT N5-N1",
};

// Load font
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      
      <body className={`${beVietnamPro.className} antialiased`}>
        <SnowEffect />
        <AuthProvider>
          
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
