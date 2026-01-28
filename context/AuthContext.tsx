'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
  id?: string;
  name: string;
  email: string;
  role: string;
  isPremium?: boolean;
  avatar?: string | null;
  currentLevel?: string;        
  onboardingCompleted: boolean; 
}

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>; 
  loading: boolean;                 
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  refreshUser: async () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Hàm gọi API
  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem('user_session', JSON.stringify(data.user));
      } else {
        // Nếu lỗi 401 hoặc lỗi khác -> Xóa user
        setUser(null);
        localStorage.removeItem('user_session');
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
    }
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);

      // 1. Lấy LocalStorage để hiện nhanh
      const storedUser = localStorage.getItem('user_session');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem('user_session');
        }
      }

      // 2. Gọi Server Check
      // Chúng ta dùng Promise.race để đảm bảo không bao giờ bị treo
      // Nếu API chạy quá 2 giây, hoặc bị lỗi mạng, nó vẫn sẽ tắt loading
      const apiCheck = fetchUser();
      const timeout = new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5s timeout

      await Promise.race([apiCheck, timeout]);

      // 3. BẮT BUỘC TẮT LOADING
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user_session', JSON.stringify(userData));
    router.push('/'); 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_session');
    document.cookie = 'session_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);