import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function POST(req: Request) {
  try {
    const { question, cards } = await req.json();

    if (!question || !cards || cards.length !== 3) {
      return NextResponse.json({ error: "Thiếu dữ liệu" }, { status: 400 });
    }

    const prompt = `
    Bạn là một Nhà Tiên Tri Tarot lão luyện với giọng văn huyền bí, sâu sắc.
    Hãy xem bói cho câu hỏi: "${question}".
    
    Dựa trên 3 lá bài rút được (Quá khứ - Hiện tại - Tương lai):
    1. Quá khứ: ${cards[0].nameVi} (${cards[0].name}) - Ý nghĩa: ${cards[0].meaning_upright}
    2. Hiện tại: ${cards[1].nameVi} (${cards[1].name}) - Ý nghĩa: ${cards[1].meaning_upright}
    3. Tương lai: ${cards[2].nameVi} (${cards[2].name}) - Ý nghĩa: ${cards[2].meaning_upright}

    **Yêu cầu:**
    - Xâu chuỗi 3 lá bài thành một câu chuyện liền mạch liên quan đến câu hỏi.
    - Phân tích sự chuyển biến từ quá khứ đến tương lai.
    - Đưa ra một lời khuyên hành động cụ thể (Actionable Advice).
    - Định dạng Markdown. Dùng in đậm cho các từ khóa quan trọng.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return NextResponse.json({ interpretation: response.text() });

  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Vũ trụ đang nhiễu động." }, { status: 500 });
  }
}