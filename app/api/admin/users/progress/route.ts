import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserId } from '@/lib/get-user';

// GET: Lấy tiến trình của 1 user cụ thể
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) return NextResponse.json({ error: 'Thiếu email' }, { status: 400 });

  try {
      // 1. Tìm User ID từ Email
      const user = await prisma.user.findUnique({
          where: { email },
          select: { id: true }
      });
      
      if (!user) return NextResponse.json({ completed: [] });

      // 2. Lấy danh sách bài đã học từ bảng ExerciseProgress
      const progress = await prisma.exerciseProgress.findMany({
          where: { userId: user.id },
          select: { exerciseId: true }
      });

      // Map về mảng string đơn giản ['bai1', 'bai2'] cho khớp Frontend
      const completed = progress.map(p => p.exerciseId);

      return NextResponse.json({ completed });
  } catch (error) {
      return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}

// POST: Admin can thiệp -> Toggle trạng thái bài học (Thêm/Xóa)
export async function POST(request: Request) {
  // Check xem người gọi API có phải Admin không (dựa vào session)
  const adminId = await getUserId();
  if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { email, lessonId, action } = await request.json(); // action: 'add' | 'remove'

    if (!email || !lessonId) return NextResponse.json({ error: 'Thiếu thông tin' }, { status: 400 });

    // Tìm user mục tiêu
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    if (action === 'remove') {
      // Xóa bản ghi tiến độ
      await prisma.exerciseProgress.deleteMany({
          where: {
              userId: user.id,
              exerciseId: lessonId
          }
      });
    } else if (action === 'add') {
      // Thêm bản ghi tiến độ (nếu chưa có)
      const existing = await prisma.exerciseProgress.findFirst({
          where: { userId: user.id, exerciseId: lessonId }
      });

      if (!existing) {
          await prisma.exerciseProgress.create({
              data: {
                  userId: user.id,
                  exerciseId: lessonId,
                  score: 100 // Admin tick bằng tay thì cho 100 điểm luôn
              }
          });
      }
    }

    // Trả về danh sách mới nhất để FE cập nhật UI ngay lập tức
    const updatedProgress = await prisma.exerciseProgress.findMany({
        where: { userId: user.id },
        select: { exerciseId: true }
    });
    const completed = updatedProgress.map(p => p.exerciseId);

    return NextResponse.json({ success: true, completed });
  } catch (error) {
    console.error("Admin Toggle Progress Error:", error);
    return NextResponse.json({ error: 'Lỗi Server' }, { status: 500 });
  }
}