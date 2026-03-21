import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY_TUVI || '');
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { birthData, baziMatrix } = body;

    if (!birthData || !baziMatrix) {
      return NextResponse.json(
        { error: 'Thiếu thông tin Bát Tự' },
        { status: 400 }
      );
    }

    // Format Bát Tự cho prompt
    const baziText = `
      Năm: ${baziMatrix.heavenlyStems[0].name} ${baziMatrix.earthlyBranches[0].name}
      Tháng: ${baziMatrix.heavenlyStems[1].name} ${baziMatrix.earthlyBranches[1].name}
      Ngày: ${baziMatrix.heavenlyStems[2].name} ${baziMatrix.earthlyBranches[2].name}
      Giờ: ${baziMatrix.heavenlyStems[3].name} ${baziMatrix.earthlyBranches[3].name}
      
      Ngày Chủ (Day Master): ${baziMatrix.dayMaster}
      
      Cân bằng Ngũ Hành:
      - Kim: ${baziMatrix.fiveElementsBalance.Kim}%
      - Mộc: ${baziMatrix.fiveElementsBalance.Mộc}%
      - Thủy: ${baziMatrix.fiveElementsBalance.Thủy}%
      - Hỏa: ${baziMatrix.fiveElementsBalance.Hỏa}%
      - Thổ: ${baziMatrix.fiveElementsBalance.Thổ}%
    `;

    const prompt = `
      You are a renowned Bazi (Four Pillars of Destiny) expert. Analyze the following Bazi profile:

      Birth Information:
      - Date: ${birthData.birthDate}
      - Time: ${birthData.birthTime}
      - Location: ${birthData.birthPlace}

      Bazi Data:
      ${baziText}

      Instructions:
      - Respond strictly in VIETNAMESE.
      - Keep the analysis concise and focus ONLY on these core aspects:
        1. Essential personality based on Day Master.
        2. Five elements balance and career direction.
        3. Key advice for self-improvement.
      - Use a professional yet encouraging and supportive tone.
      - The total length should be approximately 200-300 words for a quick read.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const interpretation = response.text() || 'Không thể tạo lời giải ý.';

    return NextResponse.json({ interpretation });
  } catch (error) {
    console.error('Lỗi khi giải ý Bát Tự:', error);
    return NextResponse.json(
      { error: 'Lỗi khi kết nối với AI' },
      { status: 500 }
    );
  }
}
