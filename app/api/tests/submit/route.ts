// app/api/tests/submit/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserId } from '@/lib/get-user';

export async function POST(req: Request) {
  try {
    // 1. Xác thực người dùng
    const userId = await getUserId();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized: Bạn cần đăng nhập để nộp bài' }, 
        { status: 401 }
      );
    }

    // 2. Lấy dữ liệu gửi lên
    const body = await req.json();
    const { testId, answers } = body; 

    if (!testId) {
      return NextResponse.json({ error: 'Thiếu thông tin bài thi' }, { status: 400 });
    }

    // 3. Lấy đề thi gốc từ DB để chấm điểm
    const test = await prisma.mockTest.findUnique({
      where: { id: testId },
      include: { 
        questions: {
          select: {
            id: true,
            correctAnswer: true
          }
        } 
      }
    });

    if (!test) {
      return NextResponse.json({ error: 'Không tìm thấy đề thi' }, { status: 404 });
    }

    // 4. Tính điểm
    let score = 0;
    let totalQuestions = test.questions.length;

    test.questions.forEach((question) => {
      // So sánh đáp án (lưu ý answers gửi lên có thể thiếu câu trả lời nên cần check undefined)
      if (answers[question.id] !== undefined && Number(answers[question.id]) === question.correctAnswer) {
        score++;
      }
    });

    // 5. Lưu kết quả vào Database
    const result = await prisma.testResult.create({
      data: {
        userId: userId,
        testId: testId,
        score: score,
        totalQuestions: totalQuestions,
        answers: answers ?? {}, // Lưu JSON bài làm
      }
    });

    return NextResponse.json({ 
      success: true, 
      resultId: result.id,
      score: score,
      total: totalQuestions
    });

  } catch (error: any) {
    console.error("❌ [API Submit Test] Error:", error);
    return NextResponse.json(
      { error: 'Lỗi máy chủ nội bộ', details: error.message }, 
      { status: 500 }
    );
  }
}