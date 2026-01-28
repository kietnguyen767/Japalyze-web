import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/get-user";

export const dynamic = "force-dynamic";

// 1. LẤY DANH SÁCH (Giữ nguyên)
export async function GET() {
  try {
    const tests = await prisma.mockTest.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        questions: { orderBy: { id: 'asc' } } 
      }
    });
    return NextResponse.json(tests);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi tải danh sách" }, { status: 500 });
  }
}

// 2. TẠO ĐỀ THI MỚI (Cập nhật thêm Media)
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
            explanation: q.explanation || "",
            // --- CẬP NHẬT MỚI: Thêm 2 trường này ---
            imageUrl: q.imageUrl || null, // Nếu rỗng thì lưu là null
            audioUrl: q.audioUrl || null,
            // ---------------------------------------
          }))
        }
      }
    });
    return NextResponse.json(newTest);
  } catch (error) {
    console.error("Lỗi tạo đề:", error); // Log lỗi ra để dễ debug
    return NextResponse.json({ error: "Lỗi tạo đề" }, { status: 500 });
  }
}

// 3. CẬP NHẬT ĐỀ THI (Cập nhật thêm Media)
export async function PUT(req: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { id, title, level, duration, isPremium, questions } = body;

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
            explanation: q.explanation || "",
            // --- CẬP NHẬT MỚI: Thêm 2 trường này ---
            imageUrl: q.imageUrl || null,
            audioUrl: q.audioUrl || null,
            // ---------------------------------------
          }
        });
      }
      return test;
    });

    return NextResponse.json(updatedTest);
  } catch (error) {
    console.error("Lỗi cập nhật:", error);
    return NextResponse.json({ error: "Lỗi cập nhật" }, { status: 500 });
  }
}

// 4. XÓA ĐỀ THI (Giữ nguyên)
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.mockTest.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi xóa" }, { status: 500 });
  }
}