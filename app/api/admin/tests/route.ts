import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/get-user";

export const dynamic = "force-dynamic";

// 1. LẤY DANH SÁCH (Kèm chi tiết câu hỏi để Admin edit)
export async function GET() {
  try {
    const tests = await prisma.mockTest.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        questions: { orderBy: { id: 'asc' } } // Lấy luôn câu hỏi để fill vào form sửa
      }
    });
    return NextResponse.json(tests);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi tải danh sách" }, { status: 500 });
  }
}

// 2. TẠO ĐỀ THI MỚI
export async function POST(req: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { title, level, duration, isPremium, questions } = body;

    const newTest = await prisma.mockTest.create({
      data: {
        title, level, duration: Number(duration), isPremium: Boolean(isPremium),
        questions: {
          create: questions.map((q: any) => ({
            content: q.content,
            type: q.type,
            options: q.options,
            correctAnswer: Number(q.correctAnswer),
            explanation: q.explanation || ""
          }))
        }
      }
    });
    return NextResponse.json(newTest);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi tạo đề" }, { status: 500 });
  }
}

// 3. CẬP NHẬT ĐỀ THI (PUT) - Logic: Xóa hết câu cũ, tạo lại câu mới (Cách đơn giản nhất)
export async function PUT(req: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { id, title, level, duration, isPremium, questions } = body;

    // Transaction: Update thông tin đề -> Xóa câu hỏi cũ -> Tạo câu hỏi mới
    const updatedTest = await prisma.$transaction(async (tx) => {
      // 1. Update MockTest info
      const test = await tx.mockTest.update({
        where: { id },
        data: { title, level, duration: Number(duration), isPremium: Boolean(isPremium) }
      });

      // 2. Delete old questions
      await tx.question.deleteMany({ where: { testId: id } });

      // 3. Create new questions
      for (const q of questions) {
        await tx.question.create({
          data: {
            testId: id,
            content: q.content,
            type: q.type,
            options: q.options,
            correctAnswer: Number(q.correctAnswer),
            explanation: q.explanation || ""
          }
        });
      }
      return test;
    });

    return NextResponse.json(updatedTest);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Lỗi cập nhật" }, { status: 500 });
  }
}

// 4. XÓA ĐỀ THI
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.mockTest.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi xóa" }, { status: 500 });
  }
}