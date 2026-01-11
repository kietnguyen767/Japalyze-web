// app/api/translate/route.ts
import { NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/redis";
import prisma from "@/lib/prisma";
import { getUserId } from "@/lib/get-user";
import { openai } from "@/lib/openai";
import { createHash } from "node:crypto";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type TranslateBody = {
  text: string;
  source?: string; // 'ja'
  target?: string; // 'vi'
};

function sha1(input: string) {
  return createHash("sha1").update(input).digest("hex");
}

function normalizeLang(code: string) {
  const c = (code || "").trim().toLowerCase();
  return c || "ja";
}

function buildInstructions(source: string, target: string) {
  return [
    "Bạn là chuyên gia dịch thuật phong cách học thuật (academic).",
    `Dịch từ ${source} sang ${target}.`,
    "Yêu cầu:",
    "- Ưu tiên chính xác ngữ nghĩa, đúng ngữ pháp, câu văn tự nhiên.",
    "- Giữ nguyên tên riêng (nếu là tên người/địa danh/tổ chức).",
    "- Giữ nguyên ký hiệu, số liệu, dấu câu, xuống dòng, bullet, trích dẫn.",
    "- Nếu có thuật ngữ chuyên môn, chọn từ tương đương chuẩn; nếu cần, dùng cách diễn đạt rõ ràng.",
    "- Không thêm thông tin không có trong văn bản gốc.",
    "Chỉ trả về bản dịch, không giải thích.",
  ].join("\n");
}

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

    if (!text) {
      return NextResponse.json({ error: "Missing required field: text" }, { status: 400 });
    }

    if (text.length > 8000) {
      return NextResponse.json({ error: "Text too long (max 8000 characters)" }, { status: 400 });
    }

    // 1) Redis cache (24h)
    const cacheKey = `translation:${sha1(text)}:${source}:${target}`;
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
    let provider: "OpenAI" | "MyMemory" = "OpenAI";

    // 2) Try OpenAI first (academic)
    try {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error("Missing OPENAI_API_KEY");
      }

      const model = process.env.OPENAI_MODEL || "gpt-4.1";
      const instructions = buildInstructions(source, target);

      const response = await openai.responses.create({
        model,
        instructions,
        input: text,
        store: false,
      });

      finalTranslation = (response.output_text || "").trim();
      if (!finalTranslation) {
        throw new Error("Empty translation from OpenAI");
      }
    } catch (err: any) {
      // 3) Fallback MyMemory nếu OpenAI lỗi (quota/rate limit/network/...)
      const status = err?.status || err?.response?.status;

      console.error("OpenAI translate failed -> fallback MyMemory", {
        status,
        code: err?.code,
        message: err?.message,
      });

      provider = "MyMemory";
      finalTranslation = await translateWithMyMemory(text, source, target);
    }

    // 4) Cache 24h
    await setCache(cacheKey, finalTranslation, 86400);

    // 5) Save history into Postgres (async)
    const userId = await getUserId();
    if (userId) {
      prisma.translationHistory
        .create({
          data: {
            sourceText: text,
            targetText: finalTranslation,
            userId,
          },
        })
        .catch((err) => console.error("Lỗi lưu lịch sử:", err));
    }

    // 6) Return
    return NextResponse.json({
      success: true,
      translation: finalTranslation,
      cached: false,
      provider,
      // optional: báo cho UI biết đang fallback
      degraded: provider === "MyMemory",
    });
  } catch (error: any) {
    console.error("Translation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
