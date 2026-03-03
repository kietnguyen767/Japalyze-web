// app/admin/components/ReadingTab.tsx
'use client';
import React, { useState, useMemo } from 'react';
import { Plus, Image as ImageIcon, Pencil, Trash2, ArrowLeft, Save, Loader2, UploadCloud } from 'lucide-react';
import { ReadingArticle, LEVELS } from '../page';

interface ReadingTabProps {
  articles: ReadingArticle[];
  setArticles: React.Dispatch<React.SetStateAction<ReadingArticle[]>>;
}

export default function ReadingTab({ articles, setArticles }: ReadingTabProps) {
  const [isReadingFormOpen, setIsReadingFormOpen] = useState(false);
  const [readingFilter, setReadingFilter] = useState('ALL');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [newArticle, setNewArticle] = useState({ title: '', excerpt: '', content: '', contentRomaji: '', contentMeaning: '', level: 'beginner', topic: '', image: '' });

  // 1. Thống kê số lượng bài theo cấp độ (BỔ SUNG)
  const readingStats = useMemo(() => {
    const stats: { [key: string]: number } = {};
    LEVELS.forEach(l => stats[l.id] = 0);
    articles.forEach(a => {
      if (stats[a.level] !== undefined) stats[a.level]++;
    });
    return stats;
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (readingFilter === 'ALL') return articles;
    return articles.filter(a => a.level === readingFilter.toLowerCase());
  }, [articles, readingFilter]);

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault(); setIsSubmitting(true);
    try {
      const method = editingArticleId ? 'PUT' : 'POST';
      const body = editingArticleId ? { ...newArticle, id: editingArticleId } : newArticle;
      const res = await fetch('/api/admin/reading', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), credentials: 'include' });
      if (res.ok) {
        const saved = await res.json();
        setArticles(prev => editingArticleId ? prev.map(a => a.id === editingArticleId ? saved : a) : [saved, ...prev]);
        setIsReadingFormOpen(false);
        setEditingArticleId(null);
      }
    } catch { alert("Lỗi lưu"); } finally { setIsSubmitting(false); }
  };

  if (isReadingFormOpen) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-xl animate-fade-in-up">
        <div className="flex justify-between items-center mb-6 pb-6 border-b">
          <h3 className="font-bold text-2xl text-slate-800 flex items-center gap-3">
            <button type="button" onClick={() => setIsReadingFormOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><ArrowLeft size={24} /></button>
            {editingArticleId ? 'Chỉnh sửa bài viết' : 'Viết bài mới'}
          </h3>
        </div>

        <form onSubmit={handleSaveArticle} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Tiêu đề</label>
              <input type="text" value={newArticle.title} onChange={e => setNewArticle({ ...newArticle, title: e.target.value })} className="w-full p-3 border rounded-xl font-bold focus:border-blue-500 outline-none" required />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Cấp độ</label>
              <select value={newArticle.level} onChange={e => setNewArticle({ ...newArticle, level: e.target.value })} className="w-full p-3 border rounded-xl bg-white outline-none">
                {LEVELS.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Chủ đề</label>
              <input type="text" value={newArticle.topic} onChange={e => setNewArticle({ ...newArticle, topic: e.target.value })} placeholder="VD: Văn hóa..." className="p-3 border rounded-xl w-full outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Mô tả ngắn</label>
              <input type="text" value={newArticle.excerpt} onChange={e => setNewArticle({ ...newArticle, excerpt: e.target.value })} className="p-3 border rounded-xl w-full outline-none" required />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Ảnh bìa</label>
            {newArticle.image ? (
              <div className="relative group h-48 w-full border rounded-xl overflow-hidden bg-slate-50">
                <img src={newArticle.image} alt="Preview" className="w-full h-full object-contain" />
                <button type="button" onClick={() => setNewArticle({ ...newArticle, image: '' })} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-all"><Trash2 size={16} /></button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-blue-50 transition-all">
                {isUploading ? <Loader2 className="animate-spin text-blue-500" /> : <UploadCloud className="text-slate-400 mb-2" />}
                <span className="text-xs text-slate-500 font-medium">Tải ảnh lên</span>
                <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                  if (!e.target.files?.[0]) return;
                  setIsUploading(true);
                  try {
                    const formData = new FormData(); formData.append("file", e.target.files[0]);
                    const res = await fetch("/api/upload", { method: "POST", body: formData });
                    const data = await res.json();
                    setNewArticle({ ...newArticle, image: data.url });
                  } catch { alert("Lỗi tải ảnh"); } finally { setIsUploading(false); }
                }} />
              </label>
            )}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Nội dung (Kanji[furigana])</label>
            <textarea rows={10} value={newArticle.content} onChange={e => setNewArticle({ ...newArticle, content: e.target.value })} className="w-full p-4 border rounded-xl font-mono text-sm leading-relaxed outline-none focus:border-blue-500" required />
          </div>

          <details className="text-sm bg-slate-50 p-4 rounded-xl border border-slate-200">
            <summary className="cursor-pointer font-bold select-none hover:text-blue-600 transition-colors">Mở rộng: Romaji & Dịch nghĩa</summary>
            <div className="space-y-4 pt-4">
              <textarea placeholder="Romaji" rows={3} value={newArticle.contentRomaji} onChange={e => setNewArticle({ ...newArticle, contentRomaji: e.target.value })} className="w-full p-3 border rounded-lg outline-none" />
              <textarea placeholder="Dịch nghĩa" rows={3} value={newArticle.contentMeaning} onChange={e => setNewArticle({ ...newArticle, contentMeaning: e.target.value })} className="w-full p-3 border rounded-lg outline-none" />
            </div>
          </details>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setIsReadingFormOpen(false)} className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-all">Hủy bỏ</button>
            <button disabled={isSubmitting} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-md hover:bg-blue-700 transition-all">
              {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />} Lưu bài viết
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* 2. Header Stats & Add Button (BỔ SUNG THỐNG KÊ) */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Quản lý bài đọc</h2>
          <div className="flex gap-2">
            {LEVELS.map(l => (
              <div key={l.id} className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded text-xs font-medium text-slate-600">
                <span>{l.label}:</span>
                <span className="font-bold text-blue-600">{readingStats[l.id] || 0}</span>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => { setIsReadingFormOpen(true); setEditingArticleId(null); setNewArticle({ title: '', excerpt: '', content: '', contentRomaji: '', contentMeaning: '', level: 'beginner', topic: '', image: '' }) }} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold shadow-md hover:bg-blue-700 transition-all">
          <Plus size={20} /> Thêm bài mới
        </button>
      </div>

      {/* 3. Filters (BỔ SUNG BỘ LỌC) */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button onClick={() => setReadingFilter('ALL')} className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${readingFilter === 'ALL' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}>Tất cả</button>
        {LEVELS.map(l => (
          <button key={l.id} onClick={() => setReadingFilter(l.id.toUpperCase())} className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${readingFilter === l.id.toUpperCase() ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}>
            {l.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArticles.map(a => (
          <div key={a.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex gap-4 hover:shadow-md transition-all group">
            <div className="w-24 h-24 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-100">
              {a.image ? <img src={a.image} className="w-full h-full object-cover" alt={a.title} /> : <div className="w-full h-full flex items-center justify-center text-slate-300"><ImageIcon size={24} /></div>}
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded">{a.level}</span>
                  <span className="text-[10px] text-slate-400">{new Date(a.createdAt).toLocaleDateString('vi-VN')}</span>
                </div>
                <h4 className="font-bold text-slate-800 truncate text-sm">{a.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{a.excerpt}</p>
              </div>
              <div className="flex gap-2 mt-2 transition-opacity">
                <button onClick={() => { setEditingArticleId(a.id); setNewArticle({ ...a } as any); setIsReadingFormOpen(true); }} className="flex-1 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"><Pencil size={14} /> Sửa</button>
                <button onClick={async () => { if (confirm("Xóa bài đọc này?")) { await fetch('/api/admin/reading', { method: 'DELETE', body: JSON.stringify({ id: a.id }), credentials: 'include' }); setArticles(prev => prev.filter(item => item.id !== a.id)); } }} className="flex-1 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-1"><Trash2 size={14} /> Xóa</button>
              </div>
            </div>
          </div>
        ))}
        {filteredArticles.length === 0 && <div className="col-span-full text-center py-12 text-slate-400">Không tìm thấy bài đọc nào.</div>}
      </div>
    </div>
  );
}