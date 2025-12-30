// context/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// 🔥 1. ĐỊNH NGHĨA LẠI USER (Để TypeScript hiểu isPremium là gì)
export interface User {
  id?: string;
  name: string;
  email: string;
  role: string;
  isPremium?: boolean; 
  avatar?: string | null;// 👈 Quan trọng: Thêm dòng này (Dấu ? nghĩa là có thể null)
}

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  refreshProfile: () => Promise<void>; // 👈 Thêm hàm này để cập nhật thủ công nếu cần
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  refreshProfile: async () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // 🔥 2. HÀM CHECK PREMIUM TỪ SERVER (Chạy ngầm)
  const checkPremiumStatus = async (email: string) => {
    try {
      // Gọi API progress vì ta đã code nó trả về isPremium
      const res = await fetch(`/api/exercises/progress?email=${email}`);
      const data = await res.json();
      
      if (data && typeof data.isPremium === 'boolean') {
        setUser(prev => {
          if (!prev) return null;
          // Nếu trạng thái Premium thay đổi so với localStorage -> Cập nhật ngay
          if (prev.isPremium !== data.isPremium) {
            const newUser = { ...prev, isPremium: data.isPremium };
            // Lưu đè lại vào localStorage để lần sau vào nhanh hơn
            localStorage.setItem('user_session', JSON.stringify(newUser));
            return newUser;
          }
          return prev;
        });
      }
    } catch (error) {
      console.error("Lỗi kiểm tra Premium:", error);
    }
  };

  // 🔥 3. LOAD USER KHI F5 TRANG
  useEffect(() => {
    const storedUser = localStorage.getItem('user_session'); // Giữ nguyên key cũ của bạn
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        // Đảm bảo role tồn tại
        const userObj: User = { ...parsed, role: parsed.role ?? 'user' };
        
        setUser(userObj);
        
        // 👇 Check server ngay lập tức xem có lên đời Premium chưa
        checkPremiumStatus(userObj.email); 
        
      } catch (e) {
        console.error('Failed to parse stored user session', e);
        localStorage.removeItem('user_session'); // Xóa nếu lỗi
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user_session', JSON.stringify(userData));
    // Check lại server cho chắc ăn
    checkPremiumStatus(userData.email);
    router.push('/'); 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_session');
    // 🔥 XÓA TOKEN COOKIE
    document.cookie = 'session_token=; path=/; max-age=0';
    console.log("✅ Token cookie đã xóa");
    router.push('/login');
  };

  // Hàm refresh thủ công (dùng khi vừa mua gói xong hoặc Admin bảo reload)
  const refreshProfile = async () => {
    if (user?.email) {
      await checkPremiumStatus(user.email);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để dùng ở các trang khác
export const useAuth = () => useContext(AuthContext);