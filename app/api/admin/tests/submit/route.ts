import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserId } from '@/lib/get-user'; // Import hàm lấy ID từ file bạn cung cấp

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
    // answers structure: { "question_id_1": 2, "question_id_2": 0, ... }

    if (!testId || !answers) {
      return NextResponse.json({ error: 'Thiếu thông tin bài thi hoặc đáp án' }, { status: 400 });
    }

    // 3. Lấy đề thi gốc từ DB để chấm điểm
    const test = await prisma.mockTest.findUnique({
      where: { id: testId },
      include: { 
        questions: {
          select: {
            id: true,
            correctAnswer: true // Chỉ lấy đáp án đúng để so sánh
          }
        } 
      }
    });

    if (!test) {
      return NextResponse.json({ error: 'Không tìm thấy đề thi' }, { status: 404 });
    }

    // 4. Tính điểm (Server-side calculation)
    let score = 0;
    let totalQuestions = test.questions.length;

    test.questions.forEach((question) => {
      // So sánh đáp án người dùng chọn (answers[id]) với đáp án đúng (question.correctAnswer)
      // Lưu ý: Cần kiểm tra undefined phòng trường hợp user không chọn câu đó
      if (answers[question.id] !== undefined && answers[question.id] === question.correctAnswer) {
        score++;
      }
    });

    // 5. Lưu kết quả vào Database
    const result = await prisma.testResult.create({
      data: {
        userId: userId, // Sử dụng userId lấy từ getUserId()
        testId: testId,
        score: score,
        totalQuestions: totalQuestions,
        answers: answers, // Lưu lại bài làm chi tiết (JSON) để user xem lại sau này
      }
    });

    // 6. Trả về kết quả
    return NextResponse.json({ 
      success: true, 
      resultId: result.id,
      score: score,
      total: totalQuestions,
      message: 'Nộp bài thành công!'
    });

  } catch (error: any) {
    console.error("❌ [API Submit Test] Error:", error);
    return NextResponse.json(
      { error: 'Lỗi máy chủ nội bộ', details: error.message }, 
      { status: 500 }
    );
  }
}