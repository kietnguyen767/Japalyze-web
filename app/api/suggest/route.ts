// app/api/suggest/route.ts
import { NextResponse } from "next/server";
import prisma, { PrismaHelper } from "@/lib/prisma";
import { getCache, setCache } from "@/lib/redis";
import { createHash } from "node:crypto";
// import { Prisma } from "@prisma/client"; // Temporary removal to fix build

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type SuggestRequest = {
  query: string;
  source?: "ja" | "vi";
  limit?: number;
};

function sha1(s: string) {
  return createHash("sha1").update(s).digest("hex");
}

function isRomajiLike(q: string) {
  return /^[a-zA-Z\s'-]+$/.test(q);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SuggestRequest;
    const queryRaw = (body.query ?? "").trim();
    const source = body.source ?? "ja";
    const limit = Math.min(Math.max(body.limit ?? 8, 1), 12);

    // ✅ Logic gợi ý linh hoạt: Cho phép tìm theo cả Nhật và Việt
    // Bỏ check source !== "ja" để hỗ trợ tiếng Việt

    const q = queryRaw;
    const qLower = q.toLowerCase();

    // ✅ romaji vs JP min length (Tiếng Việt cần ít nhất 2 ký tự)
    const romajiInput = isRomajiLike(q);
    const minLen = 2; // Giảm xuống 2 cho cả Việt và Nhật

    if (q.length < minLen) {
      return NextResponse.json({ success: true, items: [], cached: false });
    }

    const cacheKey = `dict:suggest:${sha1(`${source}:${qLower}:${limit}`)}`;
    const cached = await getCache<any>(cacheKey);
    if (cached) return NextResponse.json({ ...cached, cached: true });

    const jpPrefix = `${q}%`;
    const viPrefix = `%${q}%`; // Tiếng Việt nên tìm chứa từ
    const romaPrefix = `${qLower}%`;

    const rows = await (prisma as any).$queryRaw(PrismaHelper.sql`
      SELECT
        id,
        lemma,
        reading,
        romaji,
        "posTag",
        "meaningVi",
        GREATEST(
          similarity(lemma, ${q}) * 1.2, -- Ưu tiên tiếng Nhật hơn một chút
          similarity(COALESCE(reading, ''), ${q}),
          similarity(COALESCE(romaji, ''), ${romajiInput ? qLower : q}),
          similarity(COALESCE("meaningVi", ''), ${q}) * 0.8 -- Điểm tiếng Việt thấp hơn để không lấn át kết quả Nhật
        ) AS score
      FROM "DictionaryEntry"
      WHERE lang = 'ja'
        AND (
          lemma ILIKE ${jpPrefix}
          OR COALESCE(reading, '') ILIKE ${jpPrefix}
          OR COALESCE(romaji, '') ILIKE ${romaPrefix}
          OR "meaningVi" ILIKE ${viPrefix} -- Thêm phần tìm theo nghĩa Việt
          OR lemma % ${q}
          OR COALESCE(reading, '') % ${q}
          OR "meaningVi" % ${q}
        )
      ORDER BY
        (lemma ILIKE ${jpPrefix}) DESC,
        (COALESCE(reading, '') ILIKE ${jpPrefix}) DESC,
        (COALESCE(romaji, '') ILIKE ${romaPrefix}) DESC,
        (COALESCE("meaningVi", '') ILIKE ${viPrefix}) DESC,
        score DESC
      LIMIT ${limit};
    `);

    const payload = {
      success: true,
      items: rows.map((r: any) => ({
        id: r.id,
        lemma: r.lemma,
        reading: r.reading ?? "",
        romaji: (r.romaji ?? "").toLowerCase(),
        posTag: r.posTag,
        meaningVi: r.meaningVi ?? "",
      })),
    };

    await setCache(cacheKey, payload, 600);
    return NextResponse.json({ ...payload, cached: false });
  } catch (err) {
    console.error("suggest error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
