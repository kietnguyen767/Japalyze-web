'use client';
import React from 'react';
import { Crown, GraduationCap, Trash2 } from 'lucide-react';
import { UserData } from '../page';

interface UsersTabProps {
  users: UserData[];
  setUsers: React.Dispatch<React.SetStateAction<UserData[]>>;
  openProgressModal: (email: string) => void;
}

export default function UsersTab({ users, setUsers, openProgressModal }: UsersTabProps) {
  
  const handleDeleteUser = async (email: string) => {
    if (!confirm(`Xóa user ${email}?`)) return;
    setUsers(prev => prev.filter(u => u.email !== email));
    try { await fetch('/api/admin/users', { method: 'DELETE', body: JSON.stringify({ email }), credentials: 'include' }); } catch { alert("Lỗi xóa"); }
  };

  const handleToggleRole = async (user: UserData) => {
    const role = user.role === 'admin' ? 'user' : 'admin';
    if (!confirm(`Đổi quyền ${user.name}?`)) return;
    setUsers(prev => prev.map(u => u.email === user.email ? { ...u, role } : u));
    try { await fetch('/api/admin/users', { method: 'PATCH', body: JSON.stringify({ email: user.email, role }), credentials: 'include' }); } catch { alert("Lỗi update"); }
  };

  const handleTogglePremium = async (user: UserData) => {
    const isPremium = !user.isPremium;
    if (!confirm(`Đổi Premium cho ${user.email}?`)) return;
    setUsers(prev => prev.map(u => u.email === user.email ? { ...u, isPremium } : u));
    try { await fetch('/api/admin/users', { method: 'PATCH', body: JSON.stringify({ email: user.email, type: 'premium', value: isPremium }), credentials: 'include' }); } catch { alert("Lỗi update"); }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="p-4 text-xs font-bold text-slate-400 uppercase">User</th>
              <th className="p-4 text-xs font-bold text-slate-400 uppercase">Email</th>
              <th className="p-4 text-xs font-bold text-slate-400 uppercase">Role</th>
              <th className="p-4 text-xs font-bold text-slate-400 uppercase">Status</th>
              <th className="p-4 text-xs font-bold text-slate-400 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map(u => (
              <tr key={u.email} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-slate-700">{u.name}</td>
                <td className="p-4 text-slate-500 text-sm">{u.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-4">
                  {u.isPremium ? <span className="text-orange-500 font-bold flex items-center gap-1 text-xs"><Crown size={14}/> VIP</span> : <span className="text-slate-400 text-xs">Free</span>}
                </td>
                <td className="p-4 flex justify-end gap-2">
                  <button onClick={() => handleTogglePremium(u)} className={`p-2 rounded transition-all ${u.isPremium ? 'text-yellow-600 hover:bg-yellow-50' : 'text-slate-400 hover:text-yellow-600 hover:bg-slate-100'}`}>
                    <Crown size={18} />
                  </button>
                  <button onClick={() => openProgressModal(u.email)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-all">
                    <GraduationCap size={18} />
                  </button>
                  <button onClick={() => handleToggleRole(u)} className="px-3 py-1 text-xs border border-slate-300 rounded hover:border-blue-500 hover:text-blue-600 font-medium">
                    {u.role === 'admin' ? 'Hạ quyền' : 'Thăng quyền'}
                  </button>
                  <button onClick={() => handleDeleteUser(u.email)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-all">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}