'use client';
import React from 'react';
import { Trash2 } from 'lucide-react';
import { PostData } from '../page';

interface PostsTabProps {
  posts: PostData[];
  setPosts: React.Dispatch<React.SetStateAction<PostData[]>>;
}

export default function PostsTab({ posts, setPosts }: PostsTabProps) {
  const handleDeletePost = async (postId: string) => {
    if (!confirm('Xóa bài viết?')) return;
    setPosts(prev => prev.filter(p => p.id !== postId));
    try { 
      await fetch('/api/admin/posts', { 
        method: 'DELETE', 
        body: JSON.stringify({ postId }), 
        credentials: 'include' 
      }); 
    } catch { 
      alert("Lỗi xóa post"); 
    }
  };

  return (
    <div className="space-y-4 animate-fade-in-up">
      {posts.map(post => (
        <div key={post.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex justify-between gap-4 group hover:border-blue-300 transition-all">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-slate-800 text-sm">{post.user?.name || 'Ẩn danh'}</span>
              <span className="text-xs text-slate-400">• {new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{post.content}</p>
          </div>
          <button 
            onClick={() => handleDeletePost(post.id)} 
            className="text-slate-300 hover:text-red-500 transition-colors self-start p-2"
          >
            <Trash2 size={18}/>
          </button>
        </div>
      ))}
      {posts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 text-slate-400">
          Chưa có bài viết nào trong cộng đồng.
        </div>
      )}
    </div>
  );
}