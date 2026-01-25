import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/get-user"; // Giả sử bạn có helper này như ở file admin

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Thiếu ID đề thi" }, { status: 400 });
    }

    // 1. Lấy thông tin đề thi
    const test = await prisma.mockTest.findUnique({
      where: { id },
      include: {
        questions: {
          select: {
            id: true,
            content: true,
            type: true,
            options: true,
            correctAnswer: true,
            explanation: true
          }
        }
      }
    });

    if (!test) {
      return NextResponse.json({ error: "Không tìm thấy đề thi" }, { status: 404 });
    }

    // --- BẮT ĐẦU: LOGIC BẢO MẬT PREMIUM ---
    
    // Nếu đề là Premium, ta phải kiểm tra User
    if (test.isPremium) {
      const userId = await getUserId(); // Lấy ID user đang đăng nhập

      if (!userId) {
        return NextResponse.json({ error: "Vui lòng đăng nhập để làm bài này" }, { status: 401 });
      }

      // Lấy thông tin mới nhất của User từ DB để chắc chắn status là đúng
      const currentUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { isPremium: true }
      });

      // Nếu user không tồn tại hoặc chưa mua gói Premium
      if (!currentUser || !currentUser.isPremium) {
        return NextResponse.json(
          { error: "Bài thi này chỉ dành cho thành viên Premium. Vui lòng nâng cấp." }, 
          { status: 403 } // 403 Forbidden
        );
      }
    }
    // --- KẾT THÚC LOGIC BẢO MẬT ---

    return NextResponse.json(test);
  } catch (error) {
    console.error("Test Detail Error:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}