// components/TranslationPanel.tsx
'use client';

export default function TranslationPanel() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ô nhập liệu */}
        <div className="flex flex-col">
           <label className="mb-2 font-semibold text-gray-600">Văn bản gốc</label>
           <textarea 
             className="border p-4 h-48 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" 
             placeholder="Nhập văn bản cần dịch..."
           ></textarea>
        </div>

        {/* Ô kết quả */}
        <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-600">Kết quả</label>
            <div className="border p-4 h-48 rounded-lg shadow-sm bg-gray-50 text-gray-500 overflow-auto">
               Bản dịch sẽ xuất hiện tại đây...
            </div>
        </div>
      </div>

      <button className="bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700 transition self-center w-full md:w-auto">
        Dịch Ngay
      </button>
    </div>
  );
}