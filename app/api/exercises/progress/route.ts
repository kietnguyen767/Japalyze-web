// app/api/exercises/progress/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserId } from '@/lib/get-user';

// GET: Lấy danh sách bài đã học VÀ trạng thái Premium
export async function GET(request: Request) {
  // 1. Lấy UserID từ Session (Bảo mật hơn lấy email từ URL)
  const userId = await getUserId();
  
  // Nếu chưa đăng nhập, trả về mặc định như cũ
  if (!userId) {
      return NextResponse.json({ completed: [], isPremium: false });
  }

  try {
      // 2. Lấy thông tin User để check Premium (Từ PostgreSQL)
      const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { isPremium: true }
      });

      // 3. Lấy danh sách các bài tập đã làm (Từ PostgreSQL)
      const progressRecords = await prisma.exerciseProgress.findMany({
          where: { userId },
          select: { exerciseId: true }
      });

      // Chuyển đổi định dạng để khớp với Frontend cũ
      // Từ dạng [{ exerciseId: 'bai-1' }, { exerciseId: 'bai-2' }] 
      // Sang dạng ['bai-1', 'bai-2']
      const completed = progressRecords.map(record => record.exerciseId);

      return NextResponse.json({ 
          completed, 
          isPremium: user?.isPremium || false 
      });

  } catch (error) {
      console.error("Lỗi lấy tiến độ:", error);
      return NextResponse.json({ completed: [], isPremium: false });
  }
}

// POST: Đánh dấu hoàn thành 1 bài
export async function POST(request: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    // Frontend cũ gửi: { email, lessonId }
    // Ta chỉ cần lấy lessonId, còn user thì lấy từ session cho chuẩn
    const { lessonId } = await request.json(); 

    if (!lessonId) return NextResponse.json({ error: 'Thiếu lessonId' }, { status: 400 });

    // 1. Kiểm tra xem đã lưu bài này chưa (Tránh lưu trùng lặp)
    const existing = await prisma.exerciseProgress.findFirst({
        where: {
            userId,
            exerciseId: lessonId
        }
    });

    // 2. Nếu chưa có thì tạo mới vào Database
    if (!existing) {
        await prisma.exerciseProgress.create({
            data: {
                userId,
                exerciseId: lessonId,
                score: 100 // Mặc định 100 điểm nếu chỉ đánh dấu hoàn thành
            }
        });
    }

    // 3. Trả về thành công
    // Lưu ý: Code cũ trả về mảng `completed` mới nhất. 
    // Tuy nhiên query lại toàn bộ DB ở đây hơi nặng. 
    // Tạm thời ta trả về success, Frontend nên tự update state hoặc refetch.
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Lỗi lưu tiến độ:", error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}