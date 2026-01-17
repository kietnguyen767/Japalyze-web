'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, FileText, Trash2, Shield, LayoutDashboard,
  GraduationCap, X, Check, MessageCircle, Crown, Loader2,
  BookOpenText, Plus, Image as ImageIcon, Map, UploadCloud, 
  Pencil, RotateCcw
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

const LEVELS = [
    { id: 'beginner', label: 'Mới bắt đầu' },
    { id: 'n5', label: 'N5' }, { id: 'n4', label: 'N4' },
    { id: 'n3', label: 'N3' }, { id: 'n2', label: 'N2' }, { id: 'n1', label: 'N1' },
];

// --- Types ---
type UserData = {
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
  isPremium?: boolean;
};

type PostData = {
  id: string;
  user: { 
      name: string | null; 
      email: string;
  }; 
  content: string;
  createdAt: string;
};

type ReadingArticle = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  contentRomaji?: string;  // Mới
  contentMeaning?: string; // Mới
  level: string;
  topic: string;
  image: string;
  createdAt: string;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'posts' | 'reading'>('overview');
  
  // Data State
  const [users, setUsers] = useState<UserData[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [articles, setArticles] = useState<ReadingArticle[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<string[]>([]);

  // Form State (Reading Article)
  const [newArticle, setNewArticle] = useState({
      title: '', 
      excerpt: '', 
      content: '', 
      contentRomaji: '', 
      contentMeaning: '', 
      level: 'beginner', 
      topic: '', 
      image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);

  // 1. LOAD DỮ LIỆU
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resUsers = await fetch('/api/admin/users');
        if (resUsers.ok) setUsers((await resUsers.json()).users || []);

        const resPosts = await fetch('/api/community/posts');
        if (resPosts.ok) {
            const data = await resPosts.json();
            setPosts(Array.isArray(data) ? data : []);
        }

        const resArticles = await fetch('/api/admin/reading');
        if (resArticles.ok) setArticles(await resArticles.json());

      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- USER ACTIONS ---
  const handleDeleteUser = async (email: string) => {
    if (!confirm(`Bạn chắc chắn muốn xóa tài khoản ${email}?`)) return;
    const previousUsers = [...users];
    setUsers(prev => prev.filter(u => u.email !== email));
    try {
      const res = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (!res.ok) throw new Error("Lỗi xóa");
    } catch (error) {
      alert("❌ Lỗi kết nối server.");
      setUsers(previousUsers);
    }
  };

  const handleToggleRole = async (user: UserData) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    if (!confirm(`Đổi quyền của ${user.name} thành ${newRole}?`)) return;
    const previousUsers = [...users];
    setUsers(prev => prev.map(u => u.email === user.email ? { ...u, role: newRole } : u));
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, role: newRole })
      });
      if (!res.ok) throw new Error("Lỗi update");
    } catch (error) {
      alert("❌ Lỗi kết nối server.");
      setUsers(previousUsers);
    }
  };

  const handleTogglePremium = async (user: UserData) => {
    const newStatus = !user.isPremium;
    if (!confirm(`${newStatus ? 'Kích hoạt' : 'Hủy'} Premium cho ${user.email}?`)) return;
    const previousUsers = [...users];
    setUsers(prev => prev.map(u => u.email === user.email ? { ...u, isPremium: newStatus } : u));
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, type: 'premium', value: newStatus })
      });
      if (!res.ok) throw new Error("Lỗi update");
    } catch (error) {
      alert("❌ Lỗi kết nối server.");
      setUsers(previousUsers);
    }
  };

  // --- POST ACTIONS ---
  const handleDeletePost = async (postId: string) => {
    if (!confirm('Xóa bài viết này vĩnh viễn?')) return;
    const previousPosts = [...posts];
    setPosts(prev => prev.filter(p => p.id !== postId));
    try {
        const res = await fetch('/api/admin/posts', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId })
        });
        if (!res.ok) throw new Error("Lỗi xóa post");
    } catch (error) {
        alert("❌ Lỗi kết nối server.");
        setPosts(previousPosts);
    }
  };

  // --- READING ACTIONS (Updated) ---
  
  // Code trong Admin Dashboard (Giữ nguyên)
const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setIsUploading(true);

    try {
        const formData = new FormData();
        formData.append("file", file);

        // Gọi API vừa sửa ở trên
        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (!res.ok) throw new Error("Upload thất bại");

        const data = await res.json();
        
        // data.url bây giờ là link Cloudinary (https://res.cloudinary.com/...)
        // Chứ không phải link localhost nữa
        setNewArticle({ ...newArticle, image: data.url });
        
    } catch (error) {
        alert("Lỗi upload ảnh!");
        console.error(error);
    } finally {
        setIsUploading(false);
    }
};

  const handleSaveArticle = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      try {
          const method = editingId ? 'PUT' : 'POST';
          const body = editingId ? { ...newArticle, id: editingId } : newArticle;

          const res = await fetch('/api/admin/reading', {
              method: method,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body)
          });
          
          if (res.ok) {
              const savedArticle = await res.json();
              
              if (editingId) {
                  setArticles(prev => prev.map(a => a.id === editingId ? savedArticle : a));
                  alert("Đã cập nhật bài viết!");
              } else {
                  setArticles([savedArticle, ...articles]);
                  alert("Đăng bài thành công!");
              }
              
              setNewArticle({ 
                  title: '', excerpt: '', content: '', contentRomaji: '', contentMeaning: '', 
                  level: 'beginner', topic: '', image: '' 
              });
              setEditingId(null);
          } else {
              alert("Lỗi khi lưu bài viết");
          }
      } catch (error) {
          console.error(error);
          alert("Lỗi kết nối");
      } finally {
          setIsSubmitting(false);
      }
  };

  const handleEditClick = (article: ReadingArticle) => {
      setEditingId(article.id);
      setNewArticle({
          title: article.title,
          excerpt: article.excerpt || '',
          content: article.content,
          contentRomaji: article.contentRomaji || '',
          contentMeaning: article.contentMeaning || '',
          level: article.level,
          topic: article.topic || '',
          image: article.image || ''
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
      setEditingId(null);
      setNewArticle({ 
          title: '', excerpt: '', content: '', contentRomaji: '', contentMeaning: '', 
          level: 'beginner', topic: '', image: '' 
      });
  };

  const handleDeleteArticle = async (id: string) => {
      if (!confirm("Xóa bài đọc này?")) return;
      const prev = [...articles];
      setArticles(prev.filter(a => a.id !== id));
      try {
          await fetch('/api/admin/reading', {
              method: 'DELETE',
              body: JSON.stringify({ id })
          });
      } catch (error) {
          setArticles(prev);
          alert("Lỗi xóa bài");
      }
  };

  // --- PROGRESS MODAL ACTIONS ---
  const openProgressModal = async (email: string) => {
    setSelectedUserEmail(email);
    setShowProgressModal(true);
    setUserProgress([]);
    try {
      const res = await fetch(`/api/admin/users/progress?email=${email}`);
      const data = await res.json();
      setUserProgress(data.completed || []);
    } catch (error) {
      console.error("Lỗi tải tiến độ", error);
    }
  };

  const toggleLessonStatus = async (lessonId: string, currentStatus: boolean) => {
    if (!selectedUserEmail) return;
    const oldProgress = [...userProgress];
    if (currentStatus) {
      setUserProgress(prev => prev.filter(id => id !== lessonId));
    } else {
      setUserProgress(prev => [...prev, lessonId]);
    }
    try {
      const res = await fetch('/api/admin/users/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: selectedUserEmail,
          lessonId,
          action: currentStatus ? 'remove' : 'add'
        })
      });
      if (!res.ok) throw new Error("API Error");
    } catch (error) {
      console.error("❌ Lỗi kết nối:", error);
      setUserProgress(oldProgress);
      alert("⚠️ Lỗi kết nối server.");
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center text-slate-500 font-medium gap-2"><Loader2 className="animate-spin"/> Đang tải dữ liệu...</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Sidebar / Header */}
      <div className="bg-white border-b px-8 py-4 flex flex-col md:flex-row justify-between items-center sticky top-0 z-10 shadow-sm gap-4">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Shield className="text-blue-600" /> Admin Panel
        </h1>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeTab === 'overview' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}>Tổng quan</button>
          <button onClick={() => setActiveTab('users')} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeTab === 'users' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}>Users ({users.length})</button>
          <button onClick={() => setActiveTab('posts')} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeTab === 'posts' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}>Posts ({posts.length})</button>
          <button onClick={() => setActiveTab('reading')} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeTab === 'reading' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}>Luyện đọc ({articles.length})</button>
        </div>
      </div>

      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        
        {/* === TAB 1: OVERVIEW === */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-slate-500 font-medium">Tổng người dùng</h3>
                <Users className="text-blue-500" />
              </div>
              <p className="text-4xl font-bold text-slate-800">{users.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-slate-500 font-medium">Bài viết cộng đồng</h3>
                <FileText className="text-green-500" />
              </div>
              <p className="text-4xl font-bold text-slate-800">{posts.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-slate-500 font-medium">Bài luyện đọc</h3>
                <BookOpenText className="text-orange-500" />
              </div>
              <p className="text-4xl font-bold text-slate-800">{articles.length}</p>
            </div>
          </div>
        )}

        {/* === TAB 2: USER MANAGEMENT === */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in-up overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 text-sm font-bold text-slate-600">User</th>
                  <th className="p-4 text-sm font-bold text-slate-600">Email</th>
                  <th className="p-4 text-sm font-bold text-slate-600">Vai trò</th>
                  <th className="p-4 text-sm font-bold text-slate-600">Gói cước</th> 
                  <th className="p-4 text-sm font-bold text-slate-600">Ngày tham gia</th>
                  <th className="p-4 text-sm font-bold text-slate-600 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map(u => (
                  <tr key={u.email} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-800">{u.name || 'Chưa đặt tên'}</td>
                    <td className="p-4 text-slate-600">{u.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${(u.role || 'user') === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                        {(u.role || 'user').toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold border ${u.isPremium ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                        {u.isPremium ? '👑 PREMIUM' : 'Mặc định'}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-500">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
                    </td>
                    <td className="p-4 flex justify-end gap-2">
                      <button onClick={() => handleTogglePremium(u)} className={`p-2 rounded transition-all ${u.isPremium ? 'text-yellow-600 hover:bg-yellow-50' : 'text-slate-400 hover:text-yellow-600 hover:bg-slate-100'}`} title={u.isPremium ? "Hủy Premium" : "Kích hoạt Premium"}>
                          <Crown size={18} />
                      </button>
                      <button onClick={() => openProgressModal(u.email)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-all" title="Quản lý tiến độ">
                          <GraduationCap size={18} />
                      </button>
                      <button onClick={() => handleToggleRole(u)} className="px-3 py-1 text-xs border border-slate-300 rounded hover:bg-white hover:border-blue-500 hover:text-blue-600 transition-all">
                        {u.role === 'admin' ? 'Hạ quyền' : 'Thăng quyền'}
                      </button>
                      <button onClick={() => handleDeleteUser(u.email)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-all" title="Xóa tài khoản">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* === TAB 3: POST MANAGEMENT === */}
        {activeTab === 'posts' && (
          <div className="space-y-4 animate-fade-in-up">
            {posts.map(post => (
              <div key={post.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-800">{post.user?.name || 'Ẩn danh'}</span>
                    <span className="text-xs text-slate-400">• {new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <p className="text-slate-600 text-sm line-clamp-2">{post.content}</p>
                </div>
                <button onClick={() => handleDeletePost(post.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all flex items-center gap-1 text-xs font-bold whitespace-nowrap">
                  <Trash2 size={16} /> Xóa bài
                </button>
              </div>
            ))}
            {posts.length === 0 && <div className="text-center p-10 bg-white rounded-xl text-slate-500">Chưa có bài viết nào.</div>}
          </div>
        )}

        {/* === TAB 4: READING MANAGEMENT === */}
        {activeTab === 'reading' && (
            <div className="space-y-8 animate-fade-in-up">
                
                {/* 1. FORM (CREATE & EDIT) */}
                <div className={`bg-white p-6 rounded-xl shadow-sm border transition-all ${editingId ? 'border-orange-300 ring-4 ring-orange-50' : 'border-slate-200'}`}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                            {editingId ? <Pencil size={20} className="text-orange-500"/> : <Plus size={20} className="text-blue-600"/>} 
                            {editingId ? 'Chỉnh sửa bài đọc' : 'Đăng bài đọc mới'}
                        </h3>
                        {editingId && (
                            <button onClick={handleCancelEdit} className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                                <RotateCcw size={14}/> Hủy sửa
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSaveArticle} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Tiêu đề bài đọc</label>
                            <input 
                                type="text" required 
                                value={newArticle.title}
                                onChange={e => setNewArticle({...newArticle, title: e.target.value})}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Ví dụ: Văn hóa trà đạo Nhật Bản"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Cấp độ</label>
                            <select 
                                value={newArticle.level}
                                onChange={e => setNewArticle({...newArticle, level: e.target.value})}
                                className="w-full p-2 border rounded-lg outline-none bg-white"
                            >
                                {LEVELS.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Chủ đề</label>
                            <input 
                                type="text"
                                value={newArticle.topic}
                                onChange={e => setNewArticle({...newArticle, topic: e.target.value})}
                                className="w-full p-2 border rounded-lg outline-none"
                                placeholder="VD: Văn hóa, Đời sống..."
                            />
                        </div>

                        {/* UPLOAD ẢNH */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Ảnh minh họa</label>
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            {isUploading ? (
                                                <Loader2 className="animate-spin text-blue-500 mb-2" size={24} />
                                            ) : (
                                                <UploadCloud className="text-slate-400 mb-2" size={24} />
                                            )}
                                            <p className="mb-2 text-sm text-slate-500">
                                                {isUploading ? "Đang tải lên..." : <span className="font-semibold">Nhấn để chọn ảnh mới</span>}
                                            </p>
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading}/>
                                    </label>
                                </div>
                                {newArticle.image && (
                                    <div className="w-32 h-32 bg-slate-100 rounded-lg border border-slate-200 overflow-hidden relative group">
                                        <img src={newArticle.image} alt="Preview" className="w-full h-full object-cover" />
                                        <button type="button" onClick={() => setNewArticle({ ...newArticle, image: '' })} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                            <X size={12} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả ngắn (Excerpt)</label>
                            <input 
                                type="text" required
                                value={newArticle.excerpt}
                                onChange={e => setNewArticle({...newArticle, excerpt: e.target.value})}
                                className="w-full p-2 border rounded-lg outline-none"
                            />
                        </div>

                        {/* TEXT JAP */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Nội dung tiếng Nhật <span className="text-xs text-slate-400 font-normal">(Dùng cú pháp Kanji[furigana] để tạo furigana)</span>
                            </label>
                            <textarea 
                                required rows={6}
                                value={newArticle.content}
                                onChange={e => setNewArticle({...newArticle, content: e.target.value})}
                                className="w-full p-2 border rounded-lg outline-none font-mono text-sm"
                                placeholder="VD: 私[わたし]は..."
                            ></textarea>
                        </div>

                        {/* TEXT ROMAJI */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Romaji</label>
                            <textarea 
                                rows={3}
                                value={newArticle.contentRomaji}
                                onChange={e => setNewArticle({...newArticle, contentRomaji: e.target.value})}
                                className="w-full p-2 border rounded-lg outline-none font-mono text-sm"
                                placeholder="Watashi wa..."
                            ></textarea>
                        </div>

                        {/* TEXT MEANING */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Dịch nghĩa Tiếng Việt</label>
                            <textarea 
                                rows={3}
                                value={newArticle.contentMeaning}
                                onChange={e => setNewArticle({...newArticle, contentMeaning: e.target.value})}
                                className="w-full p-2 border rounded-lg outline-none text-sm"
                                placeholder="Tôi là..."
                            ></textarea>
                        </div>

                        <div className="md:col-span-2">
                            <button 
                                type="submit" disabled={isSubmitting || isUploading}
                                className={`w-full py-3 text-white rounded-lg font-bold transition-all disabled:opacity-50 ${editingId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                                {isSubmitting ? 'Đang xử lý...' : (editingId ? 'Lưu Thay Đổi' : 'Đăng Bài Ngay')}
                            </button>
                        </div>
                    </form>
                </div>

                {/* 2. DANH SÁCH BÀI ĐÃ ĐĂNG */}
                <div className="space-y-4">
                    <h3 className="font-bold text-lg text-slate-700">Danh sách bài đọc ({articles.length})</h3>
                    {articles.map(article => (
                        <div key={article.id} className={`bg-white p-4 rounded-xl border shadow-sm flex flex-col md:flex-row gap-4 items-start transition-all ${editingId === article.id ? 'border-orange-400 bg-orange-50' : 'border-slate-200'}`}>
                            <div className="w-full md:w-32 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                                {article.image ? (
                                    <img src={article.image} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400"><ImageIcon/></div>
                                )}
                            </div>
                            
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded font-bold uppercase">{article.level}</span>
                                    <span className="text-slate-400 text-xs">{new Date(article.createdAt).toLocaleDateString('vi-VN')}</span>
                                </div>
                                <h4 className="font-bold text-slate-800">{article.title}</h4>
                                <p className="text-sm text-slate-500 line-clamp-1">{article.excerpt}</p>
                            </div>

                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleEditClick(article)}
                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded transition-all"
                                    title="Chỉnh sửa"
                                >
                                    <Pencil size={20} />
                                </button>
                                <button 
                                    onClick={() => handleDeleteArticle(article.id)}
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                                    title="Xóa bài"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {articles.length === 0 && <div className="text-center text-slate-500 py-8">Chưa có bài đọc nào. Hãy đăng bài đầu tiên!</div>}
                </div>
            </div>
        )}

      </div>

      {/* === MODAL QUẢN LÝ TIẾN ĐỘ === */}
      {showProgressModal && selectedUserEmail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                           <GraduationCap className="text-blue-600" size={20} /> Tiến độ học tập
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">{selectedUserEmail}</p>
                    </div>
                    <button onClick={() => setShowProgressModal(false)} className="text-slate-400 hover:text-slate-600">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
                    {ALL_LESSONS.map((lesson) => {
                        const isCompleted = userProgress.includes(lesson.id);
                        const isConversation = lesson.id.startsWith('conv_');
                        
                        return (
                            <div key={lesson.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors bg-white shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                                        {isCompleted ? <Check size={18} /> : (isConversation ? <MessageCircle size={18} /> : <GraduationCap size={18} />)}
                                    </div>
                                    <span className={`font-medium text-sm ${isCompleted ? 'text-slate-800' : 'text-slate-500'}`}>
                                        {lesson.name}
                                    </span>
                                </div>
                                <button 
                                    onClick={() => toggleLessonStatus(lesson.id, isCompleted)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${isCompleted ? 'bg-green-50 text-green-700 border-green-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'}`}
                                >
                                    {isCompleted ? 'Hủy' : 'Duyệt'}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
      )}
    </div>
  );
}