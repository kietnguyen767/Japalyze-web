import { NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/redis";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/get-user";
import { createHash } from "node:crypto";
import { geminiModel } from "@/lib/gemini"; // Import model Gemini đã cấu hình

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type TranslateBody = {
  text: string;
  source?: string;
  target?: string;
};

// Hàm tạo hash để làm key cho Redis
function sha1(input: string) {
  return createHash("sha1").update(input).digest("hex");
}

// Chuẩn hóa mã ngôn ngữ
function normalizeLang(code: string) {
  const c = (code || "").trim().toLowerCase();
  return c || "ja";
}

// Prompt dành cho Gemini: Chỉ tập trung dịch chuẩn ngữ pháp
function buildGeminiPrompt(text: string, source: string, target: string) {
  return `
    Translate the following text from ${source} to ${target}.
    
    Requirements:
    - Focus strictly on grammatical correctness and accuracy.
    - Maintain a natural flow but keep an academic/formal tone suitable for learning.
    - Do NOT add explanations, notes, or extra text.
    - Keep formatting (bullets, lines, punctuation) intact.
    - Only return the translated text.

    Text to translate:
    "${text}"
  `;
}

// Hàm fallback: Dịch bằng MyMemory (Miễn phí)
async function translateWithMyMemory(text: string, source: string, target: string) {
  const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    text
  )}&langpair=${source}|${target}`;

  const res = await fetch(apiUrl, { method: "GET" });
  const data = await res.json();

  if (data?.responseStatus !== 200) {
    throw new Error(data?.responseDetails || "MyMemory error");
  }

  const translated = (data?.responseData?.translatedText || "").trim();
  if (!translated) {
    throw new Error("Empty translation from MyMemory");
  }

  return translated;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TranslateBody;
    const text = (body.text ?? "").trim();
    const source = normalizeLang(body.source ?? "ja");
    const target = normalizeLang(body.target ?? "vi");

    // Validate Input
    if (!text) {
      return NextResponse.json({ error: "Missing required field: text" }, { status: 400 });
    }

    if (text.length > 8000) {
      return NextResponse.json({ error: "Text too long (max 8000 characters)" }, { status: 400 });
    }

    // 1) Kiểm tra Redis Cache (Lưu trong 24h)
    const cacheKey = `translation:gemini:${sha1(text)}:${source}:${target}`;
    const cachedValue = await getCache<string>(cacheKey);

    if (cachedValue) {
      return NextResponse.json({
        success: true,
        translation: cachedValue,
        cached: true,
        provider: "Redis",
      });
    }

    let finalTranslation = "";
    let provider: "Gemini" | "MyMemory" = "Gemini";

    // 2) Thử dịch bằng Google Gemini trước
    try {
      const prompt = buildGeminiPrompt(text, source, target);

      // Gọi Gemini API
      const result = await geminiModel.generateContent(prompt);
      const response = await result.response;

      finalTranslation = response.text().trim();

      if (!finalTranslation) {
        throw new Error("Empty translation from Gemini");
      }

    } catch (err: any) {
      // 3) Fallback sang MyMemory nếu Gemini lỗi (hết quota, mạng lỗi...)
      console.error("Gemini translate failed -> fallback MyMemory", {
        message: err?.message,
      });

      provider = "MyMemory";
      try {
        finalTranslation = await translateWithMyMemory(text, source, target);
      } catch (fallbackErr) {
        console.error("MyMemory fallback also failed", fallbackErr);
        return NextResponse.json({ error: "Translation services unavailable" }, { status: 503 });
      }
    }

    // 4) Lưu vào Cache (24h)
    await setCache(cacheKey, finalTranslation, 86400);

    // 5) Lưu lịch sử vào Postgres
    const userId = await getUserId();
    console.log("📝 [Translate] userId detected:", userId);

    if (userId) {
      try {
        const historyRecord = await prisma.translationHistory.create({
          data: {
            sourceText: text,
            targetText: finalTranslation,
            userId,
          },
        });
        console.log("✅ [Translate] History saved successfully:", historyRecord.id);
      } catch (err: any) {
        console.error("❌ [Translate] Error saving history:", err.message);
      }
    } else {
      console.warn("⚠️ [Translate] No userId found, skipping history save.");
    }

    // 6) Trả về kết quả
    return NextResponse.json({
      success: true,
      translation: finalTranslation,
      cached: false,
      provider,
      degraded: provider === "MyMemory", // Báo cho UI biết nếu phải dùng fallback
    });

  } catch (error: any) {
    console.error("Translation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}