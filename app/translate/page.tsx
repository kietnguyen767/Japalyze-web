// app/translate/page.tsx
import React, { Suspense } from "react";
import TranslationPanel from "@/components/TranslationPanel";

export default function TranslatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <p className="text-slate-600">Đang tải...</p>
        </div>
      }
    >
      <div className="min-h-screen pb-20 relative z-10">

        <div className="container mx-auto px-4 pt-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Dịch Thuật AI & Phân Tích</h1>
            <p className="text-slate-500">Tra cứu từ vựng, ngữ pháp và dịch câu chuẩn xác với JapaLyze AI</p>
          </div>

          <TranslationPanel />
        </div>
      </div>
    </Suspense>
  );
}
