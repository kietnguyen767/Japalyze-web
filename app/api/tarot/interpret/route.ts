import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY_TAROT || '');
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

export async function POST(req: Request) {
  try {
    const { question, cards } = await req.json();

    if (!question || !cards || cards.length !== 3) {
      return NextResponse.json({ error: "Thiếu dữ liệu" }, { status: 400 });
    }

    const prompt = `
    You are an expert Tarot Oracle with a mystical, deep, and insightful personality.
    Provide a reading for the question: "${question}".
    
    Based on the 3 drawn cards (Past - Present - Future):
    1. Past: ${cards[0].nameVi} (${cards[0].name}) - Meaning: ${cards[0].meaning_upright}
    2. Present: ${cards[1].nameVi} (${cards[1].name}) - Meaning: ${cards[1].meaning_upright}
    3. Future: ${cards[2].nameVi} (${cards[2].name}) - Meaning: ${cards[2].meaning_upright}

    Requirements:
    - Respond strictly in VIETNAMESE.
    - Do not repeat the names of the 3 cards.
    - Focus on linking the meanings of the cards to the user's question and provide a very concise summary.
    - Provide deep, clear advice quickly.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return NextResponse.json({ interpretation: response.text() });

  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Vũ trụ đang nhiễu động." }, { status: 500 });
  }
}