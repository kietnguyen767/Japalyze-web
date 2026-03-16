import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1. Chỉ chấp nhận phương thức GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 2. Lấy token từ Header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1]; // Lấy phần token sau chữ "Bearer"

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT_SECRET not set' });
    }

    // 3. Giải mã Token
    // Lưu ý: Key phải trùng với key lúc sign bên login.ts
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    // 4. Tìm User trong Database dựa vào userId từ token
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      // Chỉ lấy các trường cần thiết, TUYỆT ĐỐI KHÔNG lấy password
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        isPremium: true,
        analysisUsage: true,
        createdAt: true,
        // Thêm các trường khác nếu model User của bạn có
        // currentLevel: true, 
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 5. Trả về thông tin User
    return res.status(200).json(user);

  } catch (error) {
    console.error('MOBILE ME ERROR:', error);
    return res.status(401).json({ message: 'Unauthorized / Token expired' });
  }
}