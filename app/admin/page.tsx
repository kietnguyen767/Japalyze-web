'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, FileText, Trash2, Shield, LayoutDashboard,
  GraduationCap, X, Check, MessageCircle, Crown, Loader2
} from 'lucide-react';

// --- Constants (Giữ nguyên) ---
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
  { id: 'conv_1_intro', name: 'Hội thoại 1: Gặp gỡ & Làm quen' },
  { id: 'conv_2_daigo', name: 'Hội thoại 2: Bạn cùng khoa' },
  { id: 'conv_3_casual', name: 'Hội thoại 3: Bạn cùng tuổi' },
  { id: 'conv_4_isora', name: 'Hội thoại 4: Tiền bối & Hậu bối' },
  { id: 'conv_5_photo', name: 'Hội thoại 5: Rủ đi chụp ảnh' },
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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'posts'>('overview');
  
  // Data State
  const [users, setUsers] = useState<UserData[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<string[]>([]);

  // 1. LOAD DỮ LIỆU
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resUsers = await fetch('/api/admin/users');
        if (resUsers.ok) {
          const dataUsers = await resUsers.json();
          setUsers(dataUsers.users || []);
        }

        const resPosts = await fetch('/api/community/posts');
        if (resPosts.ok) {
          const dataPosts = await resPosts.json();
          setPosts(Array.isArray(dataPosts) ? dataPosts : []);
        }
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- ACTIONS (OPTIMISTIC UI - CẬP NHẬT NGAY LẬP TỨC) ---

  const handleDeleteUser = async (email: string) => {
    if (!confirm(`Bạn chắc chắn muốn xóa tài khoản ${email}?`)) return;
    
    // 1. Cập nhật UI ngay lập tức
    const previousUsers = [...users];
    setUsers(prev => prev.filter(u => u.email !== email));

    try {
      // 2. Gọi API ngầm
      const res = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!res.ok) throw new Error("Lỗi xóa");
      
    } catch (error) {
      // 3. Nếu lỗi thì hoàn tác (Rollback)
      alert("❌ Lỗi kết nối server, hoàn tác xóa.");
      setUsers(previousUsers);
    }
  };

  const handleToggleRole = async (user: UserData) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    if (!confirm(`Đổi quyền của ${user.name} thành ${newRole}?`)) return;

    // Optimistic Update
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

    // Optimistic Update
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

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Xóa bài viết này vĩnh viễn?')) return;

    // Optimistic Update
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

  // --- PROGRESS ACTIONS (OPTIMISTIC UI CHUẨN) ---

  const openProgressModal = async (email: string) => {
    setSelectedUserEmail(email);
    setShowProgressModal(true);
    setUserProgress([]); // Reset tạm thời

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

    // 1. CẬP NHẬT GIAO DIỆN NGAY LẬP TỨC (Không cần chờ server)
    if (currentStatus) {
      // Đang có -> Xóa
      setUserProgress(prev => prev.filter(id => id !== lessonId));
    } else {
      // Chưa có -> Thêm
      setUserProgress(prev => [...prev, lessonId]);
    }

    try {
      // 2. Gửi request xuống server
      const res = await fetch('/api/admin/users/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: selectedUserEmail,
          lessonId,
          action: currentStatus ? 'remove' : 'add'
        })
      });

      if (!res.ok) {
        throw new Error("API Error");
      }
      
      // ✅ QUAN TRỌNG: Nếu thành công, KHÔNG cập nhật lại state từ server nữa
      // để tránh bị nháy (flicker) do độ trễ mạng. Giao diện đã đúng từ bước 1 rồi.

    } catch (error) {
      console.error("❌ Lỗi kết nối:", error);
      // 3. Chỉ khi lỗi mới quay lại trạng thái cũ
      setUserProgress(oldProgress);
      alert("⚠️ Lỗi kết nối server, không thể cập nhật.");
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center text-slate-500 font-medium gap-2"><Loader2 className="animate-spin"/> Đang tải dữ liệu...</div>;

  const totalAdmins = users.filter(u => u.role === 'admin').length;
  const totalUsers = users.length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Sidebar đơn giản */}
      <div className="bg-white border-b px-8 py-4 flex flex-col md:flex-row justify-between items-center sticky top-0 z-10 shadow-sm gap-4">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Shield className="text-blue-600" /> Admin Panel
        </h1>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'overview' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}>Tổng quan</button>
          <button onClick={() => setActiveTab('users')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'users' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}>Quản lý Users ({users.length})</button>
          <button onClick={() => setActiveTab('posts')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'posts' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}>Quản lý Bài viết ({posts.length})</button>
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
              <p className="text-4xl font-bold text-slate-800">{totalUsers}</p>
              <p className="text-xs text-slate-400 mt-2">Bao gồm {totalAdmins} Admin</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-slate-500 font-medium">Bài viết cộng đồng</h3>
                <FileText className="text-green-500" />
              </div>
              <p className="text-4xl font-bold text-slate-800">{posts.length}</p>
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