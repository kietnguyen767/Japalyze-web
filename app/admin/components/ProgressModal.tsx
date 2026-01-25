'use client';

import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, X, Check, Loader2, 
  Circle, CheckCircle2, RotateCcw, Search 
} from 'lucide-react';

// --- Constants ---
const ALL_LESSONS = [
  { id: 'hiragana', name: 'Bảng Hiragana' },
  { id: 'katakana', name: 'Bảng Katakana' },
  { id: 'numbers', name: 'Số đếm & Thời gian' },
  { id: 'food', name: 'Ẩm thực Nhật Bản' },
  { id: 'sports', name: 'Thể thao & Vận động' },
  { id: 'weather', name: 'Thời tiết & Mùa' },
  { id: 'school', name: 'Trường học & Giáo dục' },
  { id: 'jobs', name: 'Nghề nghiệp' },
  { id: 'animals', name: 'Thế giới Động vật' },
  { id: 'family', name: 'Gia đình & Người thân' },
  { id: 'fruits', name: 'Trái cây & Hoa quả' },
  { id: 'vegetables', name: 'Rau củ & Nông sản' },
  { id: 'music', name: 'Âm nhạc & Nhạc cụ' },
  { id: 'electronics', name: 'Điện tử & Linh kiện' },
  { id: 'household', name: 'Đồ gia dụng & Nội thất' },
  { id: 'media', name: 'Phim ảnh & Truyền thông' },
  { id: 'hobbies', name: 'Sở thích & Giải trí' },
  { id: 'countries', name: 'Tên các Quốc gia' },
  { id: 'emotions', name: 'Cảm xúc & Tâm trạng' },
  { id: 'travel', name: 'Du lịch & Tham quan' },
  { id: 'disasters', name: 'Thiên tai & Thảm họa' },
  { id: 'routine', name: 'Sinh hoạt cá nhân' },
  { id: 'housework', name: 'Việc nhà & Mua sắm' },
  { id: 'casual', name: 'Giao tiếp đời thường' },
  { id: 'love', name: 'Tình yêu & Hẹn hò' },
  { id: 'festivals', name: 'Lễ hội & Sự kiện' },
  { id: 'conv_1_intro', name: '1. Giới thiệu bản thân' },
  { id: 'conv_2_hometown', name: '2. Quê quán' },
  { id: 'conv_3_friends', name: '3. Bạn thân' },
  { id: 'conv_4_subject', name: '4. Môn học yêu thích' },
  { id: 'conv_5_job', name: '5. Công việc' },
  { id: 'conv_6_shopping', name: '6. Mua sắm' },
  { id: 'conv_7_interview', name: '7. Phỏng vấn' },
  { id: 'conv_8_environment', name: '8. Bảo vệ môi trường' },
  { id: 'conv_9_direction', name: '9. Hỏi đường' },
  { id: 'conv_10_family', name: '10. Gia đình' },
  { id: 'conv_11_travel', name: '11. Du lịch' },
  { id: 'conv_12_hobby', name: '12. Sở thích' },
  { id: 'conv_13_food', name: '13. Đồ ăn' },
  { id: 'conv_14_health', name: '14. Sức khỏe' },
  { id: 'conv_15_money', name: '15. Tiền bạc' },
];

interface ProgressModalProps {
  email: string;
  onClose: () => void;
}

export default function ProgressModal({ email, onClose }: ProgressModalProps) {
  const [userProgress, setUserProgress] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Tải dữ liệu tiến độ khi mở modal
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch(`/api/admin/users/progress?email=${email}`, { credentials: 'include' });
        const data = await res.json();
        setUserProgress(data.completed || []);
      } catch (error) {
        console.error("Lỗi tải tiến độ:", error);
      }
    };
    fetchProgress();
  }, [email]);

  const toggleStatus = async (lessonId: string, currentStatus: boolean) => {
    setIsUpdating(lessonId);
    const action = currentStatus ? 'remove' : 'add';
    try {
      const res = await fetch('/api/admin/users/progress', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ email, lessonId, action }), 
        credentials: 'include' 
      });
      if (res.ok) {
        setUserProgress(prev => 
          action === 'remove' 
            ? prev.filter(id => id !== lessonId) 
            : [...prev, lessonId]
        );
      }
    } catch {
      alert("Lỗi cập nhật tiến độ!");
    } finally {
      setIsUpdating(null);
    }
  };

  // Lọc bài học theo tìm kiếm
  const filteredLessons = ALL_LESSONS.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-slate-900/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        
        {/* Header Section */}
        <div className="bg-white px-6 pt-6 pb-4 border-b flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 rounded-2xl text-blue-600 shadow-inner">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-slate-800 tracking-tight">Tiến độ học tập</h3>
                <p className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                  {email}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Bar - Tiện ích thêm cho admin */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Tìm kiếm bài học..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>

        {/* List Body Section */}
        <div className="p-4 space-y-2 overflow-y-auto bg-slate-50/30 flex-1 scrollbar-thin scrollbar-thumb-slate-200">
          {filteredLessons.map((lesson) => {
            const isCompleted = userProgress.includes(lesson.id);
            const updating = isUpdating === lesson.id;

            return (
              <div 
                key={lesson.id} 
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-white border-green-100 shadow-sm' 
                    : 'bg-white border-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`transition-all duration-500 ${isCompleted ? 'scale-110 text-green-500' : 'text-slate-300'}`}>
                    {isCompleted ? (
                      <CheckCircle2 size={22} fill="currentColor" className="text-white fill-green-500" />
                    ) : (
                      <Circle size={22} strokeWidth={1.5} />
                    )}
                  </div>
                  <span className={`text-sm font-bold transition-colors ${isCompleted ? 'text-slate-800' : 'text-slate-500'}`}>
                    {lesson.name}
                  </span>
                </div>

                <button 
                  disabled={updating}
                  onClick={() => toggleStatus(lesson.id, isCompleted)} 
                  className={`relative min-w-[100px] flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all active:scale-95 overflow-hidden ${
                    isCompleted 
                      ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
                  } disabled:opacity-50`}
                >
                  {updating ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : isCompleted ? (
                    <>
                      <RotateCcw size={14} />
                      HOÀN TÁC
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      DUYỆT BÀI
                    </>
                  )}
                </button>
              </div>
            );
          })}
          
          {filteredLessons.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-sm italic">
              Không tìm thấy bài học nào phù hợp.
            </div>
          )}
        </div>

        {/* Footer Info Section */}
        <div className="px-6 py-4 bg-white border-t flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Trạng thái</span>
            <span className="text-sm font-black text-slate-700">
               {userProgress.length} / {ALL_LESSONS.length} Hoàn thành
            </span>
          </div>
          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-1000" 
              style={{ width: `${(userProgress.length / ALL_LESSONS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}