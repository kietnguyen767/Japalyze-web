'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { 
  BookA, Type, LayoutGrid, Hash, CalendarDays, CheckCircle, 
  UtensilsCrossed, Trophy, CloudSun, School, Briefcase, PawPrint, Users, 
  Apple, Carrot, Music, Cpu, Armchair, Clapperboard, Palette, Globe, Smile, 
  Plane, CloudLightning, AlarmClock, Shirt, Heart, PartyPopper, MessageCircle,
  Lock, Crown
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { CONVERSATION_DATA } from '@/lib/conversationData';

// --- DATA CỐ ĐỊNH ---
const CATEGORIES = [
  {
    title: "Nhập môn (Trắc nghiệm)",
    lessons: [
      { id: 'hiragana', title: 'Hiragana (Chữ mềm)', icon: Type, color: 'text-rose-600 bg-rose-50' },
      { id: 'katakana', title: 'Katakana (Chữ cứng)', icon: BookA, color: 'text-blue-600 bg-blue-50' },
    ]
  },
  {
    title: "Từ vựng theo chủ đề",
    lessons: [
      { id: 'numbers', title: 'Số đếm & Thời gian', icon: Hash, color: 'text-emerald-600 bg-emerald-50' },
      { id: 'food', title: 'Ẩm thực Nhật Bản', icon: UtensilsCrossed, color: 'text-orange-600 bg-orange-50' },
      { id: 'sports', title: 'Thể thao & Vận động', icon: Trophy, color: 'text-cyan-600 bg-cyan-50' },
      { id: 'weather', title: 'Thời tiết & Mùa', icon: CloudSun, color: 'text-sky-600 bg-sky-50' },
      { id: 'school', title: 'Trường học & Giáo dục', icon: School, color: 'text-indigo-600 bg-indigo-50' },
      { id: 'jobs', title: 'Nghề nghiệp', icon: Briefcase, color: 'text-slate-700 bg-slate-100' },
      { id: 'animals', title: 'Thế giới Động vật', icon: PawPrint, color: 'text-pink-600 bg-pink-50' },
      { id: 'family', title: 'Gia đình & Người thân', icon: Users, color: 'text-rose-600 bg-rose-50' },
      { id: 'fruits', title: 'Trái cây & Hoa quả', icon: Apple, color: 'text-red-500 bg-red-50' },
      { id: 'vegetables', title: 'Rau củ & Nông sản', icon: Carrot, color: 'text-green-600 bg-green-50' },
      { id: 'music', title: 'Âm nhạc & Nhạc cụ', icon: Music, color: 'text-fuchsia-600 bg-fuchsia-50' },
      { id: 'electronics', title: 'Điện tử & Linh kiện', icon: Cpu, color: 'text-blue-700 bg-blue-100' },
      { id: 'household', title: 'Đồ gia dụng & Nội thất', icon: Armchair, color: 'text-amber-700 bg-amber-100' },
      { id: 'media', title: 'Phim ảnh & Truyền thông', icon: Clapperboard, color: 'text-violet-600 bg-violet-50' },
      { id: 'hobbies', title: 'Sở thích & Giải trí', icon: Palette, color: 'text-pink-500 bg-pink-50' },
      { id: 'countries', title: 'Tên các Quốc gia', icon: Globe, color: 'text-blue-500 bg-blue-50' },
      { id: 'emotions', title: 'Cảm xúc & Tâm trạng', icon: Smile, color: 'text-yellow-500 bg-yellow-50' },
      { id: 'travel', title: 'Du lịch & Tham quan', icon: Plane, color: 'text-sky-500 bg-sky-50' },
      { id: 'routine', title: 'Sinh hoạt cá nhân', icon: AlarmClock, color: 'text-teal-600 bg-teal-50' },
      { id: 'housework', title: 'Việc nhà & Mua sắm', icon: Shirt, color: 'text-cyan-600 bg-cyan-50' },
      { id: 'casual', title: 'Giao tiếp đời thường', icon: MessageCircle, color: 'text-rose-500 bg-rose-50' },
      { id: 'love', title: 'Tình yêu & Hẹn hò', icon: Heart, color: 'text-pink-600 bg-pink-50' },
      { id: 'festivals', title: 'Lễ hội & Sự kiện', icon: PartyPopper, color: 'text-orange-500 bg-orange-50' },
    ]
  },
  {
    title: "Luyện giao tiếp (Nhập vai)",
    lessons: [
      { id: 'conv_1_intro', title: 'Bài 1: Làm quen & Hỏi tuổi', icon: MessageCircle, color: 'text-indigo-600 bg-indigo-50' },
      { id: 'conv_2_daigo', title: 'Bài 2: Bạn cùng khoa', icon: MessageCircle, color: 'text-pink-600 bg-pink-50' },
      { id: 'conv_3_casual', title: 'Bài 3: Bạn cùng tuổi', icon: MessageCircle, color: 'text-orange-600 bg-orange-50' },
      { id: 'conv_4_isora', title: 'Bài 4: Tiền bối & Hậu bối', icon: MessageCircle, color: 'text-purple-600 bg-purple-50' },
      { id: 'conv_5_photo', title: 'Bài 5: Rủ đi chụp ảnh', icon: MessageCircle, color: 'text-teal-600 bg-teal-50' },
    ]
  }
];

export default function ExercisesPage() {
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  // --- LOGIC TỰ ĐỘNG CẬP NHẬT (POLLING) ---
  useEffect(() => {
    // 1. Hàm lấy dữ liệu
    const fetchProgress = async () => {
      if (!user) return;
      try {
        const res = await fetch('/api/exercises/progress');
        if (res.ok) {
           const data = await res.json();
           // Cập nhật State: Nếu có thay đổi so với cũ thì React sẽ tự render lại tích xanh
           setCompletedLessons(data.completed || []);
           setIsPremiumUser(data.isPremium || false);
        }
      } catch (error) {
        console.error("Lỗi tải tiến trình", error);
      }
    };

    // 2. Gọi ngay khi vừa vào trang
    fetchProgress();

    // 3. Cài đặt gọi lại sau mỗi 5 giây (5000ms)
    const intervalId = setInterval(() => {
        fetchProgress();
    }, 5000);

    // 4. Dọn dẹp bộ nhớ khi user thoát trang
    return () => clearInterval(intervalId);

  }, [user]);

  // --- LOGIC HIỂN THỊ TÊN BÀI HỌC ---
  const getLessonTitle = (id: string) => {
    for (const cat of CATEGORIES) {
      const found = cat.lessons.find(l => l.id === id);
      if (found) return found.title;
    }
    return id;
  };

  // --- LOGIC KIỂM TRA KHÓA BÀI ---
  const checkLockStatus = (lessonId: string) => {
    const convData = CONVERSATION_DATA.find(c => c.id === lessonId);

    // Nếu là VIP thì mở hết
    if (isPremiumUser && convData) {
      return { isLocked: false, missingTitles: [] };
    }

    if (!convData || !convData.prerequisites || convData.prerequisites.length === 0) {
      return { isLocked: false, missingTitles: [] };
    }

    const missingIds = convData.prerequisites.filter(id => !completedLessons.includes(id));
    if (missingIds.length > 0) {
      return {
        isLocked: true,
        missingTitles: missingIds.map(id => getLessonTitle(id))
      };
    }

    return { isLocked: false, missingTitles: [] };
  };

  const handleLockedClick = (e: React.MouseEvent, missingTitles: string[]) => {
    e.preventDefault();
    alert(`🔒 BÀI HỌC BỊ KHÓA!\n\nBạn cần hoàn thành:\n- ${missingTitles.join('\n- ')}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-50 bg-white shadow-sm"><Navbar /></div>

      <main className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <div className="mb-8 border-b border-slate-200 pb-4 flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <LayoutGrid className="text-blue-600" /> Thư viện bài tập
          </h1>

          {isPremiumUser && (
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
              <Crown size={12} fill="currentColor" /> PREMIUM
            </span>
          )}
        </div>

        <p className="text-slate-500 text-sm mb-6">
          Bạn đã hoàn thành <span className="font-bold text-blue-600">{completedLessons.length}</span> bài học.
        </p>

        <div className="space-y-10">
          {CATEGORIES.map((cat, idx) => (
            <div key={idx}>
              <h2 className="text-lg font-bold text-slate-700 mb-4 border-l-4 border-blue-500 pl-3">
                {cat.title}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cat.lessons.map((lesson) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const { isLocked, missingTitles } = checkLockStatus(lesson.id);

                  return (
                    <Link
                      key={lesson.id}
                      href={`/exercises/${lesson.id}`}
                      onClick={(e) => isLocked ? handleLockedClick(e, missingTitles) : null}
                      className={`relative flex items-center gap-3 p-4 bg-white rounded-xl border shadow-sm transition
                        ${isCompleted ? 'border-green-200 bg-green-50/30' : 'border-slate-200'}
                        ${isLocked ? 'opacity-60 cursor-not-allowed grayscale' : 'hover:border-blue-400 hover:shadow-md'}
                      `}
                    >
                      <div className={`p-3 rounded-lg ${lesson.color}`}>
                        <lesson.icon size={20} />
                        
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm">{lesson.title}</h3>
                        <p className="text-xs text-slate-400">
                          {isCompleted ? 'Đã hoàn thành' : isLocked ? 'Đang khóa' : 'Sẵn sàng'}
                        </p>
                      </div>

                      {isCompleted && (
                         <div className="absolute top-2 right-2 text-green-500">
                            <CheckCircle size={14} />
                         </div>
                      )}

                      {isLocked && (
                        <div className="absolute top-2 right-2 text-slate-400">
                          <Lock size={14} />
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}