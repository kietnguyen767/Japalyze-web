// app/admin/components/TestsTab.tsx
'use client';
import React, { useState, useMemo } from 'react';
import {
  Plus, Pencil, Trash2, Crown, Clock, FileQuestion, X, Save,
  Loader2, Lock, Unlock, MessageCircle, Image as ImageIcon, Mic, UploadCloud
} from 'lucide-react';
import { MockTest, QuestionInput, JLPT_LEVELS } from '../page';
import FormattedText from '@/components/FormattedText';

interface TestsTabProps {
  mockTests: MockTest[];
  setMockTests: React.Dispatch<React.SetStateAction<MockTest[]>>;
}

export default function TestsTab({ mockTests, setMockTests }: TestsTabProps) {
  const [isTestFormOpen, setIsTestFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterLevel, setFilterLevel] = useState('ALL');

  // --- THỐNG KÊ & BỘ LỌC ---
  const testStats = useMemo(() => {
    const stats: Record<string, number> = {};
    JLPT_LEVELS.forEach(l => stats[l] = 0);
    mockTests.forEach(t => {
      if (stats[t.level] !== undefined) stats[t.level]++;
    });
    return stats;
  }, [mockTests]);

  const filteredMockTests = useMemo(() => {
    if (filterLevel === 'ALL') return mockTests;
    return mockTests.filter(t => t.level === filterLevel);
  }, [mockTests, filterLevel]);
  // -------------------------

  // Trạng thái upload riêng cho từng loại file để hiển thị loading
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);

  const [editingTestId, setEditingTestId] = useState<string | null>(null);
  const [testTitle, setTestTitle] = useState('');
  const [testLevel, setTestLevel] = useState('N5');
  const [testDuration, setTestDuration] = useState(30);
  const [isPremiumTest, setIsPremiumTest] = useState(false);

  const [questions, setQuestions] = useState<QuestionInput[]>([
    { content: '', type: 'vocab', options: ['', '', '', ''], correctAnswer: 0, explanation: '', imageUrl: '', audioUrl: '' }
  ]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // --- HÀM UPLOAD FILE (QUAN TRỌNG) ---
  const handleFileUpload = async (file: File, type: 'image' | 'audio') => {
    if (!file) return;

    // Set loading state
    if (type === 'image') setIsUploadingImage(true);
    else setIsUploadingAudio(true);

    try {
      const formData = new FormData();
      formData.append("file", file); // Gửi file lên API upload

      // Gọi API Upload (Dùng chung API với phần Reading)
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();

      // Cập nhật URL vào câu hỏi hiện tại
      const field = type === 'image' ? 'imageUrl' : 'audioUrl';
      updateQuestion(activeQuestionIndex, field as any, data.url);

    } catch (error) {
      alert(`Lỗi upload ${type}: Có thể file quá lớn hoặc lỗi server.`);
      console.error(error);
    } finally {
      // Tắt loading
      if (type === 'image') setIsUploadingImage(false);
      else setIsUploadingAudio(false);
    }
  };
  // ------------------------------------

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { content: '', type: 'vocab', options: ['', '', '', ''], correctAnswer: 0, explanation: '', imageUrl: '', audioUrl: '' }
    ]);
    setActiveQuestionIndex(questions.length);
  };

  const handleRemoveQuestion = (index: number) => {
    if (questions.length <= 1) return alert("Cần ít nhất 1 câu hỏi!");
    const newQs = questions.filter((_, i) => i !== index);
    setQuestions(newQs);
    if (activeQuestionIndex >= newQs.length) {
      setActiveQuestionIndex(Math.max(0, newQs.length - 1));
    }
  };

  const updateQuestion = (index: number, field: keyof QuestionInput, value: any) => {
    const newQs = [...questions];
    (newQs[index] as any)[field] = value;
    setQuestions(newQs);
  };

  const handleSaveTest = async () => {
    if (!testTitle.trim()) return alert("Thiếu tên đề");
    if (isUploadingImage || isUploadingAudio) return alert("Đang tải file, vui lòng đợi...");

    setIsSubmitting(true);
    try {
      const payload = { id: editingTestId, title: testTitle, level: testLevel, duration: testDuration, isPremium: isPremiumTest, questions };
      const method = editingTestId ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/tests', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      });
      if (res.ok) {
        const resList = await fetch('/api/admin/tests', { credentials: 'include' });
        setMockTests(await resList.json());
        setIsTestFormOpen(false);
        alert("Lưu đề thi thành công!");
      }
    } catch { alert("Lỗi kết nối"); } finally { setIsSubmitting(false); }
  };

  if (isTestFormOpen) {
    return (
      <div className="fixed inset-0 z-100 bg-slate-100 flex flex-col">
        {/* Editor Header */}
        <div className="bg-white px-6 py-4 border-b flex justify-between items-center shadow-sm shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsTestFormOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>
            <div>
              <h3 className="font-bold text-lg text-slate-800">{editingTestId ? 'Chỉnh sửa đề thi' : 'Tạo đề thi mới'}</h3>
              <p className="text-xs text-slate-500 font-medium">{questions.length} câu hỏi</p>
            </div>
          </div>
          <button onClick={handleSaveTest} disabled={isSubmitting || isUploadingImage || isUploadingAudio} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50">
            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />} Lưu lại
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* LEFT: Config List */}
          <div className="w-80 bg-white border-r flex flex-col shrink-0">
            <div className="p-5 border-b space-y-4 bg-slate-50/50">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Tên đề</label>
                <input value={testTitle} onChange={e => setTestTitle(e.target.value)} placeholder="Nhập tên đề..." className="w-full mt-1 p-2 border rounded font-bold text-sm outline-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Cấp độ</label>
                  <select value={testLevel} onChange={e => setTestLevel(e.target.value)} className="w-full mt-1 p-2 border rounded text-sm bg-white outline-none">
                    {JLPT_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Phút</label>
                  <input type="number" value={testDuration} onChange={e => setTestDuration(Number(e.target.value))} className="w-full mt-1 p-2 border rounded text-sm outline-none" />
                </div>
              </div>
              <div onClick={() => setIsPremiumTest(!isPremiumTest)} className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${isPremiumTest ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-white text-slate-500 hover:bg-slate-100'}`}>
                {isPremiumTest ? <Lock size={16} /> : <Unlock size={16} />} <span className="text-sm font-bold">{isPremiumTest ? 'VIP' : 'Miễn phí'}</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1 bg-white">
              {questions.map((q, idx) => (
                <div key={idx} onClick={() => setActiveQuestionIndex(idx)} className={`p-3 rounded-lg cursor-pointer flex justify-between items-center group transition-all ${activeQuestionIndex === idx ? 'bg-blue-50 text-blue-700 font-bold border-blue-100 border shadow-sm' : 'hover:bg-slate-50 text-slate-600'}`}>
                  <span className="text-sm truncate flex items-center gap-2">
                    <span className="w-5 h-5 shrink-0 bg-white border rounded text-[10px] flex items-center justify-center">{idx + 1}</span>
                    <FormattedText text={q.content || 'Câu hỏi trống...'} className="truncate" />
                  </span>
                  <button onClick={(e) => { e.stopPropagation(); handleRemoveQuestion(idx); }} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
                </div>
              ))}
              <button onClick={handleAddQuestion} className="w-full py-3 border-dashed border-2 rounded-xl text-slate-400 mt-2 hover:bg-slate-50 hover:text-slate-600 transition-all font-bold text-xs">+ THÊM CÂU HỎI</button>
            </div>
          </div>

          {/* RIGHT: Detailed Editor */}
          <div className="flex-1 p-8 overflow-y-auto bg-slate-50">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Biên tập câu {activeQuestionIndex + 1}</span>
              </div>

              <div className="space-y-6">

                {/* --- KHU VỰC UPLOAD MEDIA (ĐÃ SỬA) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">

                  {/* Upload Ảnh */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1">
                      <ImageIcon size={14} /> Ảnh minh họa
                    </label>
                    <div className="flex gap-2">
                      {(questions[activeQuestionIndex] as any).imageUrl ? (
                        <div className="relative w-full h-32 border rounded-lg overflow-hidden bg-white group">
                          <img src={(questions[activeQuestionIndex] as any).imageUrl} className="w-full h-full object-contain" alt="Question" />
                          <button
                            onClick={() => updateQuestion(activeQuestionIndex, 'imageUrl' as any, '')}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : (
                        <label className="flex-1 h-32 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all text-slate-400">
                          {isUploadingImage ? <Loader2 className="animate-spin text-blue-500" /> : <UploadCloud size={24} />}
                          <span className="text-xs mt-2 font-medium">{isUploadingImage ? 'Đang tải...' : 'Tải ảnh lên'}</span>
                          <input type="file" className="hidden" accept="image/*" disabled={isUploadingImage} onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'image')} />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Upload Audio */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1">
                      <Mic size={14} /> Âm thanh
                    </label>
                    <div className="flex gap-2 items-center h-32 border rounded-lg p-4 bg-white">
                      {(questions[activeQuestionIndex] as any).audioUrl ? (
                        <div className="w-full flex flex-col gap-2">
                          <audio controls className="w-full h-8" src={(questions[activeQuestionIndex] as any).audioUrl} />
                          <button
                            onClick={() => updateQuestion(activeQuestionIndex, 'audioUrl' as any, '')}
                            className="text-xs text-red-500 font-bold hover:underline self-end"
                          >
                            Xóa file audio
                          </button>
                        </div>
                      ) : (
                        <label className="w-full h-full border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all text-slate-400">
                          {isUploadingAudio ? <Loader2 className="animate-spin text-blue-500" /> : <UploadCloud size={24} />}
                          <span className="text-xs mt-2 font-medium">{isUploadingAudio ? 'Đang tải...' : 'Tải MP3 lên'}</span>
                          <input type="file" className="hidden" accept="audio/*" disabled={isUploadingAudio} onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'audio')} />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
                {/* ------------------------------------- */}

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nội dung câu hỏi</label>
                  <textarea rows={4} value={questions[activeQuestionIndex]?.content} onChange={(e) => updateQuestion(activeQuestionIndex, 'content', e.target.value)} className="w-full p-4 text-lg border rounded-xl outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all" placeholder="Nhập nội dung câu hỏi..." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questions[activeQuestionIndex]?.options.map((opt, oIdx) => (
                    <div key={oIdx} className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${questions[activeQuestionIndex].correctAnswer === oIdx ? 'border-green-500 bg-green-50' : 'border-slate-100 hover:border-slate-200'}`}>
                      <input type="radio" name="correct-ans" checked={questions[activeQuestionIndex].correctAnswer === oIdx} onChange={() => updateQuestion(activeQuestionIndex, 'correctAnswer', oIdx)} className="w-5 h-5 accent-green-600 cursor-pointer" />
                      <input type="text" value={opt} onChange={(e) => {
                        const newOpts = [...questions[activeQuestionIndex].options];
                        newOpts[oIdx] = e.target.value;
                        updateQuestion(activeQuestionIndex, 'options', newOpts);
                      }} className="flex-1 bg-transparent outline-none font-medium" placeholder={`Đáp án ${oIdx + 1}`} />
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                  <label className="text-xs font-bold text-blue-600 flex items-center gap-1 mb-2"><MessageCircle size={14} /> GIẢI THÍCH ĐÁP ÁN</label>
                  <textarea rows={2} value={questions[activeQuestionIndex]?.explanation} onChange={(e) => updateQuestion(activeQuestionIndex, 'explanation', e.target.value)} className="w-full p-3 border rounded-lg text-sm bg-white outline-none focus:border-blue-400" placeholder="Giải thích tại sao đáp án này đúng..." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 bg-slate-900 text-white p-6 rounded-2xl shadow-lg border-b-4 border-blue-600">
        <div>
          <h2 className="text-2xl font-bold">Kho đề thi JLPT</h2>
          <div className="flex gap-2 mt-2">
            {JLPT_LEVELS.map(l => (
              <div key={l} className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded text-[10px] font-medium text-slate-400">
                <span>{l}:</span>
                <span className="font-bold text-blue-400">{testStats[l] || 0}</span>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => {
          setEditingTestId(null);
          setTestTitle('');
          setQuestions([{ content: '', type: 'vocab', options: ['', '', '', ''], correctAnswer: 0, explanation: '', imageUrl: '', audioUrl: '' }]);
          setIsTestFormOpen(true);
          setActiveQuestionIndex(0);
        }} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-500 transition-all hover:scale-105 shadow-lg flex items-center gap-2">
          <Plus size={20} /> Tạo đề mới
        </button>
      </div>

      {/* Bộ lọc trình độ */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button onClick={() => setFilterLevel('ALL')} className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${filterLevel === 'ALL' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}>Tất cả</button>
        {JLPT_LEVELS.map(l => (
          <button key={l} onClick={() => setFilterLevel(l)} className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${filterLevel === l ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMockTests.map(test => (
          <div key={test.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group relative hover:shadow-xl transition-all">
            {test.isPremium && (
              <div className="absolute top-0 right-0 bg-amber-400 text-white text-[10px] px-3 py-1 rounded-bl-xl font-black flex items-center gap-1 shadow-sm">
                <Crown size={12} /> VIP
              </div>
            )}
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${test.level === 'N5' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                {test.level}
              </span>
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-2 h-14 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
              {test.title}
            </h3>
            <div className="flex items-center gap-4 text-slate-500 text-xs font-medium bg-slate-50 p-2 rounded-lg">
              <span className="flex items-center gap-1"><Clock size={14} className="text-blue-500" /> {test.duration}p</span>
              <span className="flex items-center gap-1"><FileQuestion size={14} className="text-purple-500" /> {test.questions?.length || test._count?.questions || 0} câu</span>
            </div>
            <div className="flex gap-2 mt-5 transition-all">
              <button onClick={() => {
                setEditingTestId(test.id); setTestTitle(test.title); setTestLevel(test.level);
                setTestDuration(test.duration); setIsPremiumTest(test.isPremium);
                // Load dữ liệu câu hỏi có sẵn (bao gồm cả image/audio)
                setQuestions(test.questions && test.questions.length > 0 ? test.questions : [{ content: '', type: 'vocab', options: ['', '', '', ''], correctAnswer: 0, explanation: '', imageUrl: '', audioUrl: '' }]);
                setIsTestFormOpen(true);
                setActiveQuestionIndex(0);
              }} className="flex-1 bg-blue-50 text-blue-600 py-2.5 rounded-xl font-bold text-xs hover:bg-blue-100 transition-colors flex items-center justify-center gap-1">
                <Pencil size={14} /> Sửa đề
              </button>
              <button onClick={async () => {
                if (confirm("Xác nhận xóa đề thi này vĩnh viễn?")) {
                  await fetch('/api/admin/tests', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: test.id }),
                    credentials: 'include'
                  });
                  setMockTests(prev => prev.filter(t => t.id !== test.id));
                }
              }} className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
