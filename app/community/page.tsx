'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { MessageSquare, Send, Heart, MessageCircle, User, Loader2, Star } from 'lucide-react'; // Bỏ Star, Filter
import { useRouter } from 'next/navigation';

// --- TYPE MỚI (Khớp với Prisma) ---
type APIUser = {
  name: string | null;
  avatar: string | null;
  email: string;
}

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  user: APIUser;
};

type Post = {
  id: string;
  content: string;
  rating: number;
  createdAt: string;
  user: APIUser;
  _count: { likes: number; comments: number };
  likes: any[]; // Mảng này dùng để check xem user đã like chưa
};

export default function CommunityPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form input
  const [newContent, setNewContent] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. LOAD DATA
  useEffect(() => {
    fetchPosts();
  }, [user]);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/community/posts'); // 👈 API MỚI
      
      if (!res.ok) {
        console.error("❌ Lỗi API community:", res.status, res.statusText);
        const errData = await res.json().catch(() => ({ error: 'Unknown error' }));
        alert(`⚠️ Lỗi tải bài viết: ${errData.error}`);
        setPosts([]);
        return;
      }

      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
      console.log("✅ Đã tải", data?.length || 0, "bài viết");
    } catch (error) {
      console.error('❌ Lỗi tải bài viết:', error);
      alert("⚠️ Lỗi kết nối server");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // 2. SUBMIT BÀI VIẾT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return router.push('/login');
    if (!newContent.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newContent, rating: newRating }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: 'Unknown error' }));
        alert(`⚠️ Lỗi đăng bài: ${errData.error}`);
        return;
      }

      const newPost = await res.json();
      // Format lại dữ liệu giả lập để hiện ngay lên UI mà ko cần reload
      const formattedPost: Post = {
          ...newPost,
          user: { name: user.name, avatar: user.avatar, email: user.email },
          _count: { likes: 0, comments: 0 },
          likes: []
      };
      setPosts([formattedPost, ...posts]);
      setNewContent('');
      setNewRating(5);
      console.log("✅ Posted new content");
    } catch (error) {
      console.error("❌ Error posting:", error);
      alert("⚠️ Lỗi kết nối server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-50 bg-white shadow-sm"><Navbar /></div>

      <main className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        
        {/* --- HEADER CŨ (GIỮ NGUYÊN CSS) --- */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Cộng Đồng JapaLyze 💬</h1>
            <p className="text-blue-100 opacity-90">Chia sẻ kinh nghiệm học tập và thảo luận.</p>
          </div>
          {/* Stats đơn giản hóa vì không còn Rating */}
          <div className="flex items-center gap-6 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
             <div className="text-center px-4">
               <div className="text-3xl font-extrabold">{posts.length}</div>
               <div className="text-sm text-blue-100">Bài viết</div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- CỘT TRÁI: FORM ĐĂNG BÀI (GIỮ NGUYÊN CSS) --- */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MessageSquare className="text-blue-600" size={20}/> Viết bài mới
              </h3>
              
              {!user ? (
                <div className="text-center py-6 bg-slate-50 rounded-xl">
                  <p className="text-slate-500 mb-3 text-sm">Đăng nhập để viết bài</p>
                  <button onClick={() => router.push('/login')} className="text-blue-600 font-bold hover:underline">Đăng nhập ngay</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Textarea */}
                  <div className="mb-4">
                    <textarea 
                      className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none"
                      placeholder="Bạn đang nghĩ gì về tiếng Nhật?..."
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                    />
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Đánh giá: {newRating} ⭐</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className={`transition-all ${star <= newRating ? 'text-yellow-400' : 'text-slate-300'} hover:scale-110`}
                        >
                          <Star size={24} fill={star <= newRating ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <button disabled={isSubmitting || !newContent.trim()} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50">
                    {isSubmitting ? <Loader2 className="animate-spin" size={18}/> : <><Send size={18}/> Đăng bài</>}
                  </button>
                </form>
              )}
            </div>

            {/* Note: Bỏ phần Filter Rating vì không còn sao */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-700 mb-2">Mẹo nhỏ</h3>
                <p className="text-sm text-slate-500">Hãy chia sẻ các câu hỏi về ngữ pháp hoặc từ vựng để mọi người cùng giải đáp nhé!</p>
            </div>
          </div>

          {/* --- CỘT PHẢI: LIST BÀI VIẾT (GIỮ NGUYÊN CSS) --- */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-bold text-xl text-slate-800">Bài viết mới nhất</h3>
            
            {loading ? <div className="text-center py-10 text-slate-400">Đang tải dữ liệu...</div> : 
             posts.length === 0 ? <div className="bg-white p-10 rounded-2xl border border-dashed text-center text-slate-500">Chưa có bài viết nào.</div> :
             posts.map((post) => (
                <PostCard key={post.id} post={post} user={user} />
             ))
            }
          </div>
        </div>
      </main>
    </div>
  );
}

// --- COMPONENT POST CARD (Logic mới + Giao diện cũ) ---
function PostCard({ post, user }: { post: Post; user: any }) {
  const router = useRouter();
  
  // State quản lý Like/Comment cục bộ
  const [isLiked, setIsLiked] = useState(Array.isArray(post.likes) && post.likes.length > 0);
  const [likesCount, setLikesCount] = useState(post._count.likes);
  const [commentsCount, setCommentsCount] = useState(post._count.comments);
  
  // Comment logic
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Xử lý Like
  const handleLike = async () => {
    if (!user) return router.push('/login');
    
    // Optimistic UI update (Cập nhật giao diện trước cho mượt)
    const prevLiked = isLiked;
    const newLikedState = !prevLiked;
    
    setIsLiked(newLikedState);
    setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);

    try {
        const res = await fetch(`/api/community/posts/${post.id}/like`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (!res.ok) {
            console.error("❌ Lỗi like:", res.status);
            const errData = await res.json().catch(() => ({ error: 'Unknown' }));
            alert(`⚠️ Lỗi like: ${errData.error}`);
            // Revert nếu lỗi
            setIsLiked(prevLiked);
            setLikesCount(prev => prevLiked ? prev + 1 : prev - 1);
            return;
        }

        const data = await res.json();
        console.log("✅ Like status:", data.status);
    } catch (e) {
        console.error("❌ Error liking post:", e);
        alert("⚠️ Lỗi kết nối server");
        // Revert nếu lỗi
        setIsLiked(prevLiked);
        setLikesCount(prev => prevLiked ? prev + 1 : prev - 1);
    }
  };

  // Xử lý Load Comment (Chỉ load khi bấm vào nút)
  const toggleComments = async () => {
      if (!showComments && comments.length === 0 && commentsCount > 0) {
          setIsLoadingComments(true);
          try {
              const res = await fetch(`/api/community/posts/${post.id}/comments`, {
                  headers: { 'Content-Type': 'application/json' }
              });
              
              if (!res.ok) {
                  console.error("❌ Lỗi tải comments:", res.status);
                  const errData = await res.json().catch(() => ({ error: 'Unknown' }));
                  alert(`⚠️ Lỗi tải comments: ${errData.error}`);
                  setComments([]);
                  return;
              }

              const data = await res.json();
              setComments(Array.isArray(data) ? data : []);
              console.log("✅ Loaded", data?.length || 0, "comments");
          } catch (e) {
              console.error("❌ Error loading comments:", e);
              alert("⚠️ Lỗi kết nối server");
              setComments([]);
          } finally {
              setIsLoadingComments(false);
          }
      }
      setShowComments(!showComments);
  };

  // Xử lý Gửi Comment
  const handleSendComment = async () => {
      if (!user) return router.push('/login');
      if (!commentText.trim()) return;

      setIsSending(true);
      try {
          const res = await fetch(`/api/community/posts/${post.id}/comments`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ content: commentText })
          });

          if (!res.ok) {
              const errData = await res.json().catch(() => ({ error: 'Unknown error' }));
              console.error("❌ Lỗi gửi comment:", errData.error);
              alert(`⚠️ Lỗi: ${errData.error}`);
              return;
          }

          const newCmt = await res.json();
          setComments([newCmt, ...comments]); // Thêm lên đầu
          setCommentsCount(prev => prev + 1);
          setCommentText('');
          console.log("✅ Comment sent");
      } catch (e) { 
          console.error("❌ Error sending comment:", e);
          alert("⚠️ Lỗi kết nối server");
      } 
      finally { setIsSending(false); }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      {/* Header Post */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-400 to-cyan-300 rounded-full flex items-center justify-center text-white font-bold shadow-md overflow-hidden">
             {post.user?.avatar ? <img src={post.user.avatar} className="w-full h-full object-cover"/> : (post.user?.name?.charAt(0).toUpperCase() || 'U')}
          </div>
          <div>
            <h4 className="font-bold text-slate-800">{post.user?.name || 'Người dùng'}</h4>
            <div className="text-xs text-slate-400">{new Date(post.createdAt).toLocaleDateString('vi-VN')}</div>
          </div>
        </div>
        {/* Rating Stars */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              size={16} 
              className={`${star <= post.rating ? 'text-yellow-400' : 'text-slate-300'}`}
              fill={star <= post.rating ? 'currentColor' : 'none'}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <p className="text-slate-700 leading-relaxed whitespace-pre-wrap mb-4 text-lg">
        {post.content}
      </p>

      {/* Actions Bar */}
      <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 text-sm font-medium transition-colors ${isLiked ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}
        >
          <Heart size={20} className={isLiked ? 'fill-red-500' : ''} />
          {likesCount} Yêu thích
        </button>

        <button 
          onClick={toggleComments}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
        >
          <MessageCircle size={20} />
          {commentsCount} Bình luận
        </button>
      </div>

      {/* Comment Section (Accordion) */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-slate-50 bg-slate-50/50 -mx-6 px-6 pb-2">
          {/* Input Comment */}
          <div className="flex gap-2 mb-4">
            <input 
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendComment()}
              placeholder="Viết bình luận..."
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            />
            <button 
              onClick={handleSendComment}
              disabled={isSending || !commentText.trim()}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>

          {/* List Comments */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
            {isLoadingComments && <p className="text-center text-xs text-slate-400">Đang tải bình luận...</p>}
            
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 bg-slate-200 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-slate-600 overflow-hidden">
                    {comment.user?.avatar ? <img src={comment.user.avatar} className="w-full h-full object-cover"/> : (comment.user?.name?.charAt(0) || 'U')}
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex-1">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-bold text-sm text-slate-800">{comment.user?.name}</span>
                      <span className="text-xs text-slate-400">{new Date(comment.createdAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <p className="text-sm text-slate-600">{comment.content}</p>
                  </div>
                </div>
              ))
            ) : (
              !isLoadingComments && <p className="text-center text-slate-400 text-sm py-2">Chưa có bình luận nào.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}