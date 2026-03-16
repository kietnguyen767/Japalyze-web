import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

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
      Bạn là một chuyên gia Tử Vi Bát Tử với kinh nghiệm nhiều năm. Hãy phân tích và giải ý Bát Tự sau đây:

      Thông tin sinh:
      - Ngày sinh: ${birthData.birthDate}
      - Giờ sinh: ${birthData.birthTime}
      - Nơi sinh: ${birthData.birthPlace}

      Bát Tự:
      ${baziText}

      Hãy cung cấp phân tích chi tiết bao gồm:
      1. Tổng quan về Day Master và tính cách cơ bản
      2. Phân tích cân bằng Ngũ Hành - điểm mạnh và điểm yếu
      3. Xu hướng sự nghiệp phù hợp
      4. Mối quan hệ và tình duyên
      5. Sức khỏe và các lưu ý
      6. Lời khuyên để phát triển bản thân

      Hãy viết bằng tiếng Việt, giọng văn chuyên nghiệp nhưng dễ hiểu, mang tính tích cực và mang lại cảm giác an ủi, hướng dẫn.
      Độ dài khoảng 500-700 từ.
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Bạn là một chuyên gia Tử Vi Bát Tử uy tín, có khả năng phân tích sâu sắc và đưa ra lời khuyên hữu ích dựa trên Bát Tự của người dùng.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    const interpretation = completion.choices[0]?.message?.content || 'Không thể tạo lời giải ý.';

    return NextResponse.json({ interpretation });
  } catch (error) {
    console.error('Lỗi khi giải ý Bát Tự:', error);
    return NextResponse.json(
      { error: 'Lỗi khi kết nối với AI' },
      { status: 500 }
    );
  }
}
