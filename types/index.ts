// types/index.ts
export interface User {
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface AuthResponse {
  message: string;
  user?: User;
}