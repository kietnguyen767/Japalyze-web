import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/get-user";

// Định nghĩa kiểu params có thể là Promise (cho Next.js 15)
type Props = {
  params: Promise<{ id: string }> | { id: string };
};

export async function GET(req: Request, props: Props) {
  try {
    // 1. Kiểm tra đăng nhập
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ⚠️ QUAN TRỌNG: Phải await params trước khi lấy id
    const params = await props.params;
    const resultId = params.id;

    if (!resultId) {
      return NextResponse.json({ error: "Thiếu ID bài thi" }, { status: 400 });
    }

    // 2. Tìm kết quả trong Database
    const result = await prisma.testResult.findUnique({
      where: { id: resultId }, // Lúc này resultId đã có giá trị string chuẩn
      include: {
        test: {
          select: {
            title: true,
            questions: {
              orderBy: { id: 'asc' },
              select: {
                id: true,
                content: true,
                options: true,
                correctAnswer: true,
                explanation: true,
                imageUrl: true,
                audioUrl: true,
              }
            }
          }
        }
      }
    });

    // 3. Kiểm tra tồn tại
    if (!result) {
      return NextResponse.json({ error: "Không tìm thấy kết quả bài thi" }, { status: 404 });
    }

    // 4. Bảo mật
    if (result.userId !== userId) {
      return NextResponse.json({ error: "Bạn không có quyền xem kết quả này" }, { status: 403 });
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error("GET Result API Error:", error);
    return NextResponse.json({ error: "Lỗi server nội bộ" }, { status: 500 });
  }
}