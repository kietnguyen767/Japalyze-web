// app/api/analyze/route.ts
import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/get-user"; // Hàm lấy userId từ session của bạn
import { getCache, setCache } from "@/lib/redis";
import { createHash } from "node:crypto";

export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // Dùng nodejs runtime để chạy prisma/openai ổn định

type AnalyzeBody = {
  text: string;
  translatedText: string;
  source: string;
};

// Hàm tạo mã hash để cache
function sha1(input: string) {
  return createHash("sha1").update(input).digest("hex");
}

export async function POST(req: Request) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ error: "Vui lòng đăng nhập để sử dụng tính năng này." }, { status: 401 });
    }

    const body = (await req.json()) as AnalyzeBody;
    const text = (body.text || "").trim();
    
    if (!text) return NextResponse.json({ error: "No text provided" }, { status: 400 });

    // 1. Kiểm tra QUOTA (Giới hạn 10 câu)
    const user = await prisma.user.findUnique({ 
        where: { id: userId },
        select: { isPremium: true, analysisUsage: true } 
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Nếu không phải Premium và đã dùng quá 10 lần
    if (!user.isPremium && user.analysisUsage >= 10) {
      return NextResponse.json({ 
        error: "LIMIT_REACHED", 
        message: "Bạn đã hết 10 lượt phân tích miễn phí. Vui lòng nâng cấp Premium." 
      }, { status: 403 });
    }

    // 2. Kiểm tra Cache (Nếu đã phân tích câu này rồi thì trả về luôn, KHÔNG TÍNH vào usage)
    const cacheKey = `analyze:${sha1(text)}`;
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return NextResponse.json({ success: true, data: cachedData, cached: true, usageLeft: user.isPremium ? 'Unlimited' : 10 - user.analysisUsage });
    }

    // 3. Gọi OpenAI (Phần tốn tiền)
    const prompt = `
      Analyze the following Japanese sentence for a Vietnamese learner.
      Original: "${text}"
      Translation: "${body.translatedText}"

      Output ONLY valid JSON with this structure:
      {
        "sentence_structure": [
          { "text": "word/part", "romaji": "...", "role": "Subject/Verb/Particle...", "meaning": "...", "explanation": "Grammar explanation" }
        ],
        "grammar_points": [
          { "point": "Grammar Name", "explanation": "Detailed explanation why it is used here" }
        ],
        "nuance": "Explain the tone (polite/casual) and nuance.",
        "corrections": "If the original sentence is unnatural or wrong, fix it. Else null.",
        "alternatives": [
          { "text": "...", "tone": "Polite/Casual", "explanation": "..." }
        ]
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", // Hoặc gpt-3.5-turbo-0125 (rẻ hơn)
      messages: [{ role: "system", content: "You are a Japanese grammar expert." }, { role: "user", content: prompt }],
      response_format: { type: "json_object" }, // Bắt buộc trả về JSON
    });

    const resultRaw = response.choices[0].message.content;
    if (!resultRaw) throw new Error("No analysis returned");
    
    const analysisData = JSON.parse(resultRaw);

    // 4. Lưu Cache (để lần sau không tốn tiền)
    await setCache(cacheKey, analysisData, 86400 * 7); // Cache 7 ngày

    // 5. Tăng biến đếm Usage (Trừ lượt dùng)
    if (!user.isPremium) {
      await prisma.user.update({
        where: { id: userId },
        data: { analysisUsage: { increment: 1 } }
      });
    }

    return NextResponse.json({ 
      success: true, 
      data: analysisData, 
      usageLeft: user.isPremium ? 'Unlimited' : 9 - user.analysisUsage 
    });

  } catch (error: any) {
    console.error("Analyze error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}