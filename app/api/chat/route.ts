// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Tăng thời gian timeout (OpenAI đôi khi trả lời dài có thể mất thời gian)
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages, systemPrompt } = await req.json();

    // Kiểm tra API Key (AI SDK tự động tìm biến OPENAI_API_KEY, 
    // nhưng kiểm tra thủ công để báo lỗi rõ ràng hơn)
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error("Chưa cấu hình OPENAI_API_KEY trong file .env.local");
    }

    const result = streamText({
      // 👇 SỬ DỤNG OPENAI
      // 'gpt-4o-mini': Nhanh, rẻ, tuân thủ luật tốt (Khuyên dùng cho App Roleplay của bạn)
      // 'gpt-4o': Thông minh nhất, nhưng đắt hơn.
      model: openai('gpt-4o-mini'),
      
      // System prompt được OpenAI hỗ trợ rất tốt để định hình tính cách
      system: systemPrompt || 'Bạn là trợ lý AI hữu ích.',
      
      messages: messages,
      
      // (Tùy chọn) Giảm nhiệt độ để câu trả lời ổn định, ít "sáng tạo" lung tung
      temperature: 0.7, 
    });

    return result.toTextStreamResponse();
    
  } catch (error: any) {
    console.error("❌ Lỗi Server (OpenAI):", error.message);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' }
    });
  }
}