import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCache, setCache } from "@/lib/redis";
import { createHash } from "node:crypto";
import { Prisma } from "@prisma/client";
import * as wanakana from "wanakana";
import { mapPosFromTags } from "@/lib/dictionary/pos";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type WordDetailRequest =
  | { entryId: string; text?: never; source?: "ja" | "vi" }
  | { text: string; entryId?: never; source?: "ja" | "vi" };

function sha1(s: string) {
  return createHash("sha1").update(s).digest("hex");
}

function isRomajiLike(q: string) {
  return /^[a-zA-Z\s'-]+$/.test(q);
}

type RelatedWordItem = {
  id: string;
  lemma: string;
  reading: string;
  romaji: string;
  posTag: string;
  meaningVi: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as WordDetailRequest;
    const source = (body as any).source ?? "ja";

    const text =
      "text" in body && typeof body.text === "string"
        ? body.text.trim()
        : "entryId" in body
        ? String(body.entryId ?? "").trim()
        : "";

    if (!text) {
      return NextResponse.json(
        { success: false, error: "Missing text" },
        { status: 400 }
      );
    }

    if (text.length > 80) {
      return NextResponse.json(
        { success: false, error: "Text too long" },
        { status: 400 }
      );
    }

    const cacheKey = `dict:word-detail:${source}:${sha1(text.toLowerCase())}`;
    //const cached = await getCache<any>(cacheKey);
    //if (cached) return NextResponse.json({ ...cached, cached: true });

    let entry = null;
    let spellcheck = { is_correct: true, did_you_mean: null as string | null };

    // ==========================================
    // 🔍 LOGIC TÌM KIẾM
    // ==========================================

    if ("entryId" in body) {
      // Tìm theo ID
      entry = await prisma.dictionaryEntry.findUnique({
        where: { id: body.entryId },
        include: { examples: { take: 3, orderBy: { createdAt: "asc" } } },
      });
    } else if (source === 'vi') {
      // 🇻🇳 TÌM VIỆT -> NHẬT
      entry = await prisma.dictionaryEntry.findFirst({
        where: {
          meaningVi: {
            contains: text,
            mode: 'insensitive'
          }
        },
        orderBy: { lemma: 'asc' },
        include: { examples: { take: 3, orderBy: { createdAt: "asc" } } },
      });

    } else {
      // 🇯🇵 TÌM NHẬT -> VIỆT (Đã nâng cấp logic)
      
      const romajiInput = isRomajiLike(text);
      const textLower = text.toLowerCase();

      // 1. Exact match (SỬA ĐỔI: Dùng findMany thay vì findFirst)
      // Lý do: Nếu có 2 từ giống nhau (duplicates), ta cần chọn từ nào CÓ VÍ DỤ.
      const candidates = await prisma.dictionaryEntry.findMany({
        where: {
          lang: "ja",
          OR: [{ lemma: text }, { reading: text }, { romaji: textLower }],
        },
        // Lấy tối đa 5 từ trùng lặp để so sánh
        take: 5, 
        include: { examples: { take: 3, orderBy: { createdAt: "asc" } } },
      });

      if (candidates.length > 0) {
        // ✨ LOGIC CHỌN LỌC:
        // Sắp xếp ưu tiên:
        // 1. Từ có nhiều ví dụ hơn (b.examples.length - a.examples.length)
        // 2. Nếu bằng nhau, ưu tiên từ có nghĩa tiếng Việt đầy đủ hơn
        candidates.sort((a, b) => {
             const exDiff = b.examples.length - a.examples.length;
             if (exDiff !== 0) return exDiff;
             
             const defA = a.meaningVi ? a.meaningVi.length : 0;
             const defB = b.meaningVi ? b.meaningVi.length : 0;
             return defB - defA;
        });

        // Chọn ứng viên tốt nhất (Candidate số 0)
        entry = candidates[0];
      }

      // 2. Fuzzy Search (Chỉ chạy nếu Exact match thất bại)
      if (!entry) {
        const rows = await prisma.$queryRaw<
          Array<{
            id: string;
            lemma: string;
            reading: string | null;
            romaji: string | null;
            posTag: string;
            meaningVi: string | null;
            score: number;
          }>
        >(Prisma.sql`
          SELECT
            id, lemma, reading, romaji, "posTag", "meaningVi",
            GREATEST(
              similarity(lemma, ${text}),
              similarity(COALESCE(reading, ''), ${text}),
              similarity(COALESCE(romaji, ''), ${romajiInput ? textLower : text})
            ) AS score
          FROM "DictionaryEntry"
          WHERE lang='ja'
            AND (
              lemma % ${text}
              OR COALESCE(reading,'') % ${text}
              OR COALESCE(romaji,'') % ${romajiInput ? textLower : text}
            )
          ORDER BY score DESC
          LIMIT 1;
        `);

        if (rows.length > 0 && rows[0].score >= 0.35) {
          const best = rows[0];
          entry = await prisma.dictionaryEntry.findUnique({
            where: { id: best.id },
            include: { examples: { take: 3, orderBy: { createdAt: "asc" } } },
          });
          spellcheck = { is_correct: false, did_you_mean: best.lemma };
        }
      }
    }

    // ==========================================
    // 🛑 KẾT QUẢ KHÔNG TÌM THẤY
    // ==========================================
    if (!entry) {
      const payload = { success: false, error: "NOT_FOUND" };
      await setCache(cacheKey, payload, 30);
      return NextResponse.json(payload, { status: 404 });
    }

    // ==========================================
    // 🔗 LẤY TỪ LIÊN QUAN
    // ==========================================
    const relatedRows = await prisma.dictionaryRelation.findMany({
      where: { fromId: entry.id, type: "related" },
      take: 8,
      orderBy: { createdAt: "desc" },
      include: {
        to: {
          select: {
            id: true,
            lemma: true,
            reading: true,
            romaji: true,
            posTag: true,
            meaningVi: true,
          },
        },
      },
    });

    const relatedWords: RelatedWordItem[] = relatedRows
      .map((r) => r.to)
      .filter(Boolean)
      .map((to) => ({
        id: to.id,
        lemma: to.lemma,
        reading: to.reading ?? "",
        romaji: (to.romaji ?? "").trim() || (to.reading ? wanakana.toRomaji(to.reading) : ""),
        posTag: to.posTag,
        meaningVi: to.meaningVi ?? "",
      }));

    // Chuẩn hóa dữ liệu trả về
    const romaji =
      (entry.romaji ?? "").trim() || (entry.reading ? wanakana.toRomaji(entry.reading) : "");

    const pos = mapPosFromTags(entry.posTag);

    const examples = (entry.examples ?? []).slice(0, 3).map((ex) => ({
      jp: ex.jp,
      romaji: ex.romaji ?? "",
      vi: ex.vi ?? "",
    }));

    const result = {
      success: true,
      entry: {
        id: entry.id,
        lang: entry.lang ?? "ja",
        lemma: entry.lemma,
        reading: entry.reading ?? "",
        romaji,
        posTag: entry.posTag,
        pos,
        meaningVi: entry.meaningVi ?? "",
      },
      examples,
      spellcheck,
      relatedWords,
    };

    await setCache(cacheKey, result, 1800);
    return NextResponse.json({ ...result, cached: false });

  } catch (err) {
    console.error("word-detail error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}