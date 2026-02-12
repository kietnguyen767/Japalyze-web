import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/get-user";
import { geminiModel } from "@/lib/gemini"; // Import Gemini Model

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        // 1. Authentication
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json(
                { error: "Vui lòng đăng nhập để sử dụng tính năng này." },
                { status: 401 }
            );
        }

        const { transcribedText, originalText, durationMs } = await req.json();

        if (!transcribedText || !originalText) {
            return NextResponse.json(
                { error: "Thiếu dữ liệu văn bản." },
                { status: 400 }
            );
        }

        // 2. Kiểm tra User & Quota (Optional)
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { isPremium: true, analysisUsage: true },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // 3. Tính toán thời gian kỳ vọng
        const charCount = originalText.length;
        const expectedDurationMs = charCount * 300;

        // Prompt cho Gemini (Tương tự OpenAI nhưng tối ưu cho Gemini)
        const prompt = `
      Bạn là một giáo viên tiếng Nhật nghiêm khắc nhưng công bằng.
      Hãy chấm điểm bài đọc của học viên dựa trên văn bản gốc và văn bản nhận diện được từ giọng nói.

      Văn bản gốc: "${originalText}"
      Văn bản học viên đọc (nhận diện qua Mic): "${transcribedText}"
      
      Thời gian đọc thực tế: ${durationMs} ms.
      Thời gian kỳ vọng (ước tính): ${expectedDurationMs} ms.

      Yêu cầu chấm điểm:
      1. **Độ chính xác (Accuracy)**: So sánh sự khớp nhau giữa văn bản gốc và văn bản đọc. Chú ý các phát âm sai, bỏ từ, thêm từ.
      2. **Tốc độ (Speed)**: Nếu thời gian đọc thực tế > thời gian kỳ vọng * 1.5, hãy trừ điểm nhẹ (khoảng 5-10 điểm) vì đọc quá chậm/ngập ngừng. Nếu đọc quá nhanh mà sai nhiều thì trừ điểm nặng.
      
      Hãy trả về kết quả dưới dạng JSON (chỉ JSON, không có markdown) với cấu trúc sau:
      {
        "score": number (0-100),
        "feedback": "Nhận xét ngắn gọn bằng tiếng Việt (1-2 câu) về phát âm và tốc độ.",
        "details": "Chi tiết lỗi sai nếu có (ví dụ: phát âm sai từ nào, bỏ từ nào)."
      }
    `;

        // Gọi Gemini
        const result = await geminiModel.generateContent(prompt);
        const response = await result.response;
        let textResponse = response.text();

        // Clean JSON (Gemini hay bọc trong markdown code block)
        textResponse = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();

        let analysisData;
        try {
            analysisData = JSON.parse(textResponse);
        } catch (e) {
            console.error("Gemini JSON Parse Error:", textResponse);
            throw new Error("AI trả về định dạng không hợp lệ.");
        }

        // 4. Update usage count (Optional)
        if (!user.isPremium) {
            await prisma.user.update({
                where: { id: userId },
                data: { analysisUsage: { increment: 1 } }
            });
        }

        return NextResponse.json(analysisData);

    } catch (error: any) {
        console.error("Evaluation Error:", error);
        return NextResponse.json(
            { error: error?.message || "Lỗi server khi chấm điểm." },
            { status: 500 }
        );
    }
}
