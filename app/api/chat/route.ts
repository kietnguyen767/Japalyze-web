// app/api/chat/route.ts
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 60;

const getAI = (type: string) => {
  let key = process.env.GOOGLE_AI_API_KEY; // Default fallback

  if (type === 'chat') key = process.env.GOOGLE_AI_API_KEY_CHAT || key;
  if (type === 'logic') key = process.env.GOOGLE_AI_API_KEY_LOGIC || key;
  if (type === 'grading') key = process.env.GOOGLE_AI_API_KEY_GRADING || key;

  if (!key) throw new Error("Missing API Key for type: " + type);

  return createGoogleGenerativeAI({
    apiKey: key,
  });
};

export async function POST(req: Request) {
  try {
    const { messages, systemPrompt, agentType = 'chat' } = await req.json();

    // Chọn Key phù hợp với Agent
    const google = getAI(agentType);

    // Convert 'system' messages in history to 'user' to avoid SDK errors
    // (AI SDK / Gemini usually requires system messages only at the start)
    const cleanMessages = (messages || []).map((m: any) => {
      if (m.role === 'system') {
        return { ...m, role: 'user', content: `[SYSTEM EVENT]: ${m.content}` };
      }
      return m;
    });

    const result = streamText({
      model: google('gemini-2.5-flash-lite'),
      system: systemPrompt, // Native system support
      messages: cleanMessages,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();

  } catch (error: any) {
    console.error("❌ Lỗi Server:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}