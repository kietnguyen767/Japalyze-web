'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { useParams, useSearchParams } from 'next/navigation'; // 👈 THÊM useSearchParams
import Link from 'next/link';

// Import dữ liệu bài học
import { 
  HIRAGANA_QUIZ, KATAKANA_QUIZ, 
  NUMBER_LESSON_DATA, FOOD_LESSON_DATA, SPORT_LESSON_DATA, 
  WEATHER_LESSON_DATA, SCHOOL_LESSON_DATA, JOB_LESSON_DATA, 
  ANIMAL_LESSON_DATA, FAMILY_LESSON_DATA, FRUIT_LESSON_DATA, 
  VEGETABLE_LESSON_DATA, ELECTRONIC_LESSON_DATA, HOUSEHOLD_LESSON_DATA, 
  MEDIA_LESSON_DATA ,HOBBY_LESSON_DATA, COUNTRY_LESSON_DATA, EMOTION_LESSON_DATA, TRAVEL_LESSON_DATA,
  ROUTINE_LESSON_DATA, HOUSEWORK_LESSON_DATA, CASUAL_TALK_LESSON_DATA, LOVE_LESSON_DATA, FESTIVAL_LESSON_DATA
} from '@/lib/lessonData';

import { CONVERSATION_DATA } from '@/lib/conversationData';

// Import component con
import QuizClient from '@/components/exercises/QuizClient';
import VocabClient from '@/components/exercises/VocabClient';
import ConversationClient from '@/components/exercises/ConversationClient';

export default function LessonPage() {
  const params = useParams();
  const searchParams = useSearchParams(); // 👈 Lấy params từ URL
  
  const lessonId = params?.lessonId as string;

  // 👇 LOGIC ROADMAP: Lấy thông tin từ URL
  const context = searchParams.get('context'); 
  const questId = searchParams.get('questId');
  
  // Tạo bộ props chung để truyền xuống component con
  const roadmapProps = {
    isRoadmapMode: context === 'roadmap',
    questId: questId || undefined
  };

  if (!lessonId) {
    return <div className="p-10 text-center">Đang tải...</div>;
  }

  // --- KHAI BÁO BIẾN CONTENT TRƯỚC ---
  let content: React.ReactNode = null;

  // --- PHÂN LUỒNG LOGIC ---

  // 1. Kiểm tra Hội thoại trước
  if (lessonId.startsWith('conv_')) {
    const lesson = CONVERSATION_DATA.find(c => c.id === lessonId);
    if (lesson) {
      content = <ConversationClient lesson={lesson} {...roadmapProps} />;
    } else {
      content = <div className="p-10 text-center">Không tìm thấy bài hội thoại này.</div>;
    }
  } 
  // 2. Kiểm tra Bảng chữ cái (QuizClient)
  else if (lessonId === 'hiragana') {
    // 👇 Truyền roadmapProps vào đây
    content = <QuizClient data={HIRAGANA_QUIZ} title="Bảng Hiragana" lessonId="hiragana" {...roadmapProps} />;
  } 
  else if (lessonId === 'katakana') {
    content = <QuizClient data={KATAKANA_QUIZ} title="Bảng Katakana" lessonId="katakana" {...roadmapProps} />;
  } 
  // 3. Kiểm tra Từ vựng theo chủ đề (VocabClient)
  else if (lessonId === 'numbers') {
    content = <VocabClient sections={NUMBER_LESSON_DATA} title="Số đếm & Thời gian" lessonId="numbers" {...roadmapProps} />;
  }
  else if (lessonId === 'food') {
    content = <VocabClient sections={FOOD_LESSON_DATA} title="Ẩm thực Nhật Bản" lessonId="food" {...roadmapProps} />;
  }
  else if (lessonId === 'sports') {
    content = <VocabClient sections={SPORT_LESSON_DATA} title="Thể thao & Vận động" lessonId="sports" {...roadmapProps} />;
  }
  else if (lessonId === 'weather') {
    content = <VocabClient sections={WEATHER_LESSON_DATA} title="Thời tiết & Mùa" lessonId="weather" {...roadmapProps} />;
  }
  else if (lessonId === 'school') {
    content = <VocabClient sections={SCHOOL_LESSON_DATA} title="Trường học & Giáo dục" lessonId="school" {...roadmapProps} />;
  }
  else if (lessonId === 'jobs') {
    content = <VocabClient sections={JOB_LESSON_DATA} title="Nghề nghiệp" lessonId="jobs" {...roadmapProps} />;
  }
  else if (lessonId === 'animals') {
    content = <VocabClient sections={ANIMAL_LESSON_DATA} title="Thế giới Động vật" lessonId="animals" {...roadmapProps} />;
  }
  else if (lessonId === 'family') {
    content = <VocabClient sections={FAMILY_LESSON_DATA} title="Gia đình & Người thân" lessonId="family" {...roadmapProps} />;
  }
  else if (lessonId === 'fruits') {
    content = <VocabClient sections={FRUIT_LESSON_DATA} title="Trái cây & Hoa quả" lessonId="fruits" {...roadmapProps} />;
  }
  else if (lessonId === 'vegetables') {
    content = <VocabClient sections={VEGETABLE_LESSON_DATA} title="Rau củ & Nông sản" lessonId="vegetables" {...roadmapProps} />;
  }
  else if (lessonId === 'electronics') {
    content = <VocabClient sections={ELECTRONIC_LESSON_DATA} title="Điện tử & Linh kiện" lessonId="electronics" {...roadmapProps} />;
  }
  else if (lessonId === 'household') {
    content = <VocabClient sections={HOUSEHOLD_LESSON_DATA} title="Đồ gia dụng & Nội thất" lessonId="household" {...roadmapProps} />;
  }
  else if (lessonId === 'media') {
    content = <VocabClient sections={MEDIA_LESSON_DATA} title="Phim ảnh & Truyền thông" lessonId="media" {...roadmapProps} />;
  }
  else if (lessonId === 'hobbies') {
    content = <VocabClient sections={HOBBY_LESSON_DATA} title="Sở thích & Giải trí" lessonId="hobbies" {...roadmapProps} />;
  }
  else if (lessonId === 'countries') {
    content = <VocabClient sections={COUNTRY_LESSON_DATA} title="Tên các Quốc gia" lessonId="countries" {...roadmapProps} />;
  }
  else if (lessonId === 'emotions') {
    content = <VocabClient sections={EMOTION_LESSON_DATA} title="Cảm xúc & Tâm trạng" lessonId="emotions" {...roadmapProps} />;
  }
  else if (lessonId === 'travel') {
    content = <VocabClient sections={TRAVEL_LESSON_DATA} title="Du lịch & Tham quan" lessonId="travel" {...roadmapProps} />;
  }
  else if (lessonId === 'routine') {
    content = <VocabClient sections={ROUTINE_LESSON_DATA} title="Sinh hoạt cá nhân" lessonId="routine" {...roadmapProps} />;
  }
  else if (lessonId === 'housework') {
    content = <VocabClient sections={HOUSEWORK_LESSON_DATA} title="Việc nhà & Mua sắm" lessonId="housework" {...roadmapProps} />;
  }
  else if (lessonId === 'casual') {
    content = <VocabClient sections={CASUAL_TALK_LESSON_DATA} title="Giao tiếp đời thường" lessonId="casual" {...roadmapProps} />;
  }
  else if (lessonId === 'love') {
    content = <VocabClient sections={LOVE_LESSON_DATA} title="Tình yêu & Hẹn hò" lessonId="love" {...roadmapProps} />;
  }
  else if (lessonId === 'festivals') {
    content = <VocabClient sections={FESTIVAL_LESSON_DATA} title="Lễ hội & Sự kiện" lessonId="festivals" {...roadmapProps} />;
  }
  // 4. Trường hợp không tìm thấy bài nào hợp lệ
  else {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="sticky top-0 z-50 bg-white shadow-sm">
          <Navbar />
        </div>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-slate-400">
            Bài học đang được biên soạn 🚧
          </h2>
          <Link
            href="/exercises"
            className="text-blue-600 underline mt-4 block"
          >
            Quay lại thư viện
          </Link>
        </div>
      </div>
    );
  }

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>
      <main className="container mx-auto px-4 py-8 relative z-10">
        {content}
      </main>
    </div>
  );
}