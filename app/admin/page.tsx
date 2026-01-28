'use client';

import React, { useEffect, useState } from 'react';
import { Shield, Loader2 } from 'lucide-react';
import OverviewTab from './components/OverviewTab';
import UsersTab from './components/UsersTab';
import PostsTab from './components/PostsTab';
import ReadingTab from './components/ReadingTab';
import TestsTab from './components/TestsTab';
import ProgressModal from './components/ProgressModal';

// --- TYPES (Export để các components con có thể sử dụng) ---
export type UserData = { 
  email: string; name: string; role: 'admin' | 'user'; 
  createdAt: string; isPremium?: boolean; 
};

export type PostData = { 
  id: string; user: { name: string | null; email: string; }; 
  content: string; createdAt: string; 
};

export type ReadingArticle = { 
  id: string; title: string; excerpt: string; content: string; 
  contentRomaji?: string; contentMeaning?: string; 
  level: string; topic: string; image: string; createdAt: string; 
};

export type QuestionInput = {
  content: string;
  type: 'vocab' | 'grammar' | 'reading';
  options: [string, string, string, string];
  correctAnswer: number;
  explanation: string;
  imageUrl?: string; 
  audioUrl?: string;
};

export type MockTest = {
  id: string; title: string; level: string; duration: number; isPremium: boolean;
  questions?: QuestionInput[];
  _count?: { questions: number }; createdAt: string;
};

// --- CONSTANTS ---
export const LEVELS = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'n5', label: 'N5' }, { id: 'n4', label: 'N4' },
  { id: 'n3', label: 'N3' }, { id: 'n2', label: 'N2' }, { id: 'n1', label: 'N1' },
];

export const JLPT_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];

export const ALL_LESSONS = [
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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'posts' | 'reading' | 'tests'>('overview');
  const [loading, setLoading] = useState(true);

  // Data States
  const [users, setUsers] = useState<UserData[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [articles, setArticles] = useState<ReadingArticle[]>([]);
  const [mockTests, setMockTests] = useState<MockTest[]>([]);

  // Modal State
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(null);

  // --- Fetch Data ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [resUsers, resPosts, resArticles, resTests] = await Promise.all([
          fetch('/api/admin/users', { credentials: 'include' }),
          fetch('/api/community/posts', { credentials: 'include' }),
          fetch('/api/admin/reading', { credentials: 'include' }),
          fetch('/api/admin/tests', { credentials: 'include' })
        ]);

        if (resUsers.ok) setUsers((await resUsers.json()).users || []);
        if (resPosts.ok) setPosts(await resPosts.json());
        if (resArticles.ok) setArticles(await resArticles.json());
        if (resTests.ok) setMockTests(await resTests.json());

      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-500 font-medium gap-2">
        <Loader2 className="animate-spin" /> Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* HEADER NAVIGATION */}
      <div className="bg-white border-b px-6 py-4 flex flex-col md:flex-row justify-between items-center sticky top-0 z-50 shadow-sm gap-4">
        <h1 className="text-xl font-bold flex items-center gap-2 text-slate-800">
          <Shield className="text-blue-600 fill-blue-100" /> Admin Panel
        </h1>
        <div className="flex gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-hide bg-slate-100 p-1 rounded-xl">
          {['overview', 'users', 'posts', 'reading', 'tests'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap capitalize transition-all ${
                activeTab === tab 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              {tab === 'tests' ? 'Đề thi' : tab === 'reading' ? 'Luyện đọc' : tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
        {/* Từng tab nội dung đã được tách thành Component con */}
        {activeTab === 'overview' && (
          <OverviewTab 
            counts={{ 
              users: users.length, 
              posts: posts.length, 
              articles: articles.length, 
              tests: mockTests.length 
            }} 
          />
        )}

        {activeTab === 'users' && (
          <UsersTab 
            users={users} 
            setUsers={setUsers} 
            openProgressModal={setSelectedUserEmail} 
          />
        )}

        {activeTab === 'posts' && (
          <PostsTab 
            posts={posts} 
            setPosts={setPosts} 
          />
        )}

        {activeTab === 'reading' && (
          <ReadingTab 
            articles={articles} 
            setArticles={setArticles} 
          />
        )}

        {activeTab === 'tests' && (
          <TestsTab 
            mockTests={mockTests} 
            setMockTests={setMockTests} 
          />
        )}
      </div>

      {/* MODAL TIẾN ĐỘ (Dùng chung cho tab Users) */}
      {selectedUserEmail && (
        <ProgressModal 
          email={selectedUserEmail} 
          onClose={() => setSelectedUserEmail(null)} 
        />
      )}
    </div>
  );
}