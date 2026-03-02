'use client';

import React, { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';


// Import dữ liệu bài học
import {
  HIRAGANA_QUIZ, KATAKANA_QUIZ,
  HIRAGANA_DAKUTEN_QUIZ, KATAKANA_DAKUTEN_QUIZ,
  NUMBER_LESSON_DATA, FOOD_LESSON_DATA, SPORT_LESSON_DATA,
  WEATHER_LESSON_DATA, SCHOOL_LESSON_DATA, JOB_LESSON_DATA,
  ANIMAL_LESSON_DATA, FAMILY_LESSON_DATA, FRUIT_LESSON_DATA,
  VEGETABLE_LESSON_DATA, ELECTRONIC_LESSON_DATA, HOUSEHOLD_LESSON_DATA,
  MEDIA_LESSON_DATA, HOBBY_LESSON_DATA, COUNTRY_LESSON_DATA, EMOTION_LESSON_DATA, TRAVEL_LESSON_DATA,
  ROUTINE_LESSON_DATA, HOUSEWORK_LESSON_DATA, CASUAL_TALK_LESSON_DATA, LOVE_LESSON_DATA, FESTIVAL_LESSON_DATA,
  WEEK3_LESSON1_DATA,
  W3_1_PRONOUNS, W3_1_SUFFIXES, W3_1_JOBS_NEW, W3_1_PLACES_QUES, W3_1_AGE, W3_1_PHRASES, W3_1_KANJI_NUMBERS, W3_1_KANJI_BASIC
} from '@/lib/lessonData';

import { CONVERSATION_DATA } from '@/lib/conversationData';

// Import component con
import QuizClient from '@/components/exercises/QuizClient';
import VocabClient from '@/components/exercises/VocabClient';
import ConversationClient from '@/components/exercises/ConversationClient';

export default function LessonPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const lessonId = params?.lessonId as string;

  // Đọc trực tiếp từ URL (searchParams đã được khởi tạo ở trên)
  const context = searchParams?.get('context');
  const questId = searchParams?.get('questId');

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
    content = <QuizClient data={HIRAGANA_QUIZ} title="Bảng Hiragana" lessonId="hiragana" {...roadmapProps} />;
  }
  else if (lessonId === 'katakana') {
    content = <QuizClient data={KATAKANA_QUIZ} title="Bảng Katakana" lessonId="katakana" {...roadmapProps} />;
  }
  else if (lessonId === 'hiragana-dakuten') {
    content = <QuizClient data={HIRAGANA_DAKUTEN_QUIZ} title="Hiragana – Âm đục (濁音・半濁音)" lessonId="hiragana-dakuten" {...roadmapProps} />;
  }
  else if (lessonId === 'katakana-dakuten') {
    content = <QuizClient data={KATAKANA_DAKUTEN_QUIZ} title="Katakana – Âm đục (濁音・半濁音)" lessonId="katakana-dakuten" {...roadmapProps} />;
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
  else if (lessonId === 'w3-lesson1') {
    content = <VocabClient sections={WEEK3_LESSON1_DATA} title="Tuần 3 - Bài 1: Từ vựng & Chữ Hán" lessonId="w3-lesson1" {...roadmapProps} />;
  }
  else if (lessonId === 'w3-1-pronouns') {
    content = <VocabClient sections={[{ title: "Đại từ nhân xưng", items: W3_1_PRONOUNS }]} title="Đại từ nhân xưng" lessonId="w3-1-pronouns" {...roadmapProps} />;
  }
  else if (lessonId === 'w3-1-suffixes') {
    content = <VocabClient sections={[{ title: "Hậu tố tên", items: W3_1_SUFFIXES }]} title="Hậu tố tên" lessonId="w3-1-suffixes" {...roadmapProps} />;
  }
  else if (lessonId === 'w3-1-jobs') {
    content = <VocabClient sections={[{ title: "Nghề nghiệp", items: W3_1_JOBS_NEW }]} title="Nghề nghiệp" lessonId="w3-1-jobs" {...roadmapProps} />;
  }
  else if (lessonId === 'w3-1-places') {
    content = <VocabClient sections={[{ title: "Địa điểm & Từ hỏi", items: W3_1_PLACES_QUES }]} title="Địa điểm & Từ hỏi" lessonId="w3-1-places" {...roadmapProps} />;
  }
  else if (lessonId === 'w3-1-age') {
    content = <VocabClient sections={[{ title: "Tuổi tác", items: W3_1_AGE }]} title="Tuổi tác" lessonId="w3-1-age" {...roadmapProps} />;
  }
  else if (lessonId === 'w3-1-phrases') {
    content = <VocabClient sections={[{ title: "Giao tiếp cơ bản", items: W3_1_PHRASES }]} title="Giao tiếp cơ bản" lessonId="w3-1-phrases" {...roadmapProps} />;
  }
  else if (lessonId === 'w3-1-kanji-num') {
    content = <VocabClient sections={[{ title: "Chữ Hán số đếm", items: W3_1_KANJI_NUMBERS }]} title="Chữ Hán số đếm" lessonId="w3-1-kanji-num" {...roadmapProps} />;
  }
  else if (lessonId === 'w3-1-kanji-basic') {
    content = <VocabClient sections={[{ title: "Chữ Hán cơ bản", items: W3_1_KANJI_BASIC }]} title="Chữ Hán cơ bản" lessonId="w3-1-kanji-basic" {...roadmapProps} />;
  }
  // 4. Trường hợp không tìm thấy bài nào hợp lệ
  else {
    return (
      <div className="min-h-screen bg-slate-50">
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
      <main className="container mx-auto px-4 py-8 relative z-10">
        {content}
      </main>
    </div>
  );
}