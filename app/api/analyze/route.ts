import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/get-user";
import { getCache, setCache } from "@/lib/redis";
import { createHash } from "node:crypto";
import { geminiModel } from "@/lib/gemini";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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
    // 1. Kiểm tra đăng nhập
    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json(
        { error: "Vui lòng đăng nhập để sử dụng tính năng này." },
        { status: 401 }
      );
    }

    const body = (await req.json()) as AnalyzeBody;
    const text = (body.text || "").trim();

    if (!text) return NextResponse.json({ error: "No text provided" }, { status: 400 });

    // 2. Kiểm tra QUOTA (Giới hạn 10 câu cho User thường)
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

    // 3. Kiểm tra Cache
    const cacheKey = `analyze:gemini:${sha1(text)}`;
    const cachedData = await getCache(cacheKey);

    if (cachedData) {
      return NextResponse.json({
        success: true,
        data: cachedData,
        cached: true,
        usageLeft: user.isPremium ? 'Unlimited' : 10 - user.analysisUsage
      });
    }

    const prompt = `
      Analyze the following Japanese sentence deeply for a Vietnamese learner.
      Original Text: "${text}"
      Context/Translation: "${body.translatedText}"

      Please return a STRICT JSON object with this exact structure:
      {
        "sentence_structure": [
          { 
            "text": "word (kanji)", 
            "romaji": "reading", 
            "role": "Part of Speech (Verb/Noun/Particle...)", 
            "meaning": "Meaning in Vietnamese", 
            "explanation": "Brief grammatical function" 
          }
        ],
        "grammar_points": [
          { 
            "point": "Grammar Formula (e.g. Danh từ + の + Danh từ)", 
            "explanation": "Short definition. Example: [Short Example]. (Keep it concise like: 'danh từ trước bổ nghĩa cho danh từ sau. Ví dụ: AのB = B của A')" 
          }
        ],
        "nuance": "Explain the tone (polite/casual/formal) and nuance in Vietnamese.",
        "corrections": "If the original sentence is unnatural or wrong, fix it. Else return null.",
        "alternatives": [
          { 
            "text": "Similar Japanese sentence", 
            "tone": "Formal/Casual", 
            "explanation": "Meaning in Vietnamese" 
          }
        ]
      }

      IMPORTANT REQUIREMENTS:
      1. All explanations must be in VIETNAMESE.
      2. **Grammar Points Style**: Must be concise. Format: Formula + Short Usage + Short Example.
         Example output: 
         - Point: "Danh từ + の + Danh từ"
         - Explanation: "Dùng để chỉ sự sở hữu hoặc bổ nghĩa. Ví dụ: 私の本 = Sách của tôi."
      3. Do NOT wrap the output in markdown blocks (like \`\`\`json). Just return the raw JSON string.
    `;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    let textResponse = response.text();

    // Làm sạch JSON
    textResponse = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();

    let analysisData;
    try {
      analysisData = JSON.parse(textResponse);
    } catch (e) {
      console.error("Gemini JSON Parse Error:", textResponse);
      throw new Error("AI trả về định dạng không hợp lệ.");
    }

    // 5. Lưu Cache (7 ngày)
    await setCache(cacheKey, analysisData, 86400 * 7);

    // 6. Tăng biến đếm Usage
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