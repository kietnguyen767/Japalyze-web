// app/api/chat/route.ts
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages, systemPrompt } = await req.json();

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        throw new Error("Chưa cấu hình GOOGLE_GENERATIVE_AI_API_KEY");
    }

    const result = streamText({
      model: google('gemini-2.5-flash-lite'),
      system: systemPrompt || 'Bạn là trợ lý AI hữu ích.',
      messages: messages,
      temperature: 0.7,
    });

    // 👇 SỬA LẠI DÒNG NÀY THEO GỢI Ý CỦA TYPESCRIPT
    return result.toTextStreamResponse();
    
  } catch (error: any) {
    console.error("❌ Lỗi Server (Gemini):", error.message);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' }
    });
  }
}