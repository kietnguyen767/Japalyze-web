// app/api/word-detail/route.ts
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

    if (source !== "ja") {
      return NextResponse.json(
        { success: false, error: "ONLY_JA_SUPPORTED" },
        { status: 400 }
      );
    }

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

    const cacheKey = `dict:word-detail:${sha1(text.toLowerCase())}`;
    const cached = await getCache<any>(cacheKey);
    if (cached) return NextResponse.json({ ...cached, cached: true });

    const romajiInput = isRomajiLike(text);
    const textLower = text.toLowerCase();

    // 1) Exact match ưu tiên
    let entry =
      "entryId" in body
        ? await prisma.dictionaryEntry.findUnique({
            where: { id: body.entryId },
            include: { examples: { take: 3, orderBy: { createdAt: "asc" } } },
          })
        : await prisma.dictionaryEntry.findFirst({
            where: {
              lang: "ja",
              OR: [{ lemma: text }, { reading: text }, { romaji: textLower }],
            },
            include: { examples: { take: 3, orderBy: { createdAt: "asc" } } },
          });

    // 2) Nếu không có, dùng similarity để tìm gần đúng (spellcheck)
    let spellcheck = { is_correct: true, did_you_mean: null as string | null };

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

      if (rows.length === 0 || rows[0].score < 0.35) {
        const payload = { success: false, error: "NOT_FOUND" };
        await setCache(cacheKey, payload, 30);
        return NextResponse.json(payload, { status: 404 });
      }

      const best = rows[0];

      entry = await prisma.dictionaryEntry.findUnique({
        where: { id: best.id },
        include: { examples: { take: 3, orderBy: { createdAt: "asc" } } },
      });

      spellcheck = { is_correct: false, did_you_mean: best.lemma };
    }

    if (!entry) {
      const payload = { success: false, error: "NOT_FOUND" };
      await setCache(cacheKey, payload, 30);
      return NextResponse.json(payload, { status: 404 });
    }

    // ✅ 3) LẤY TỪ LIÊN QUAN (DictionaryRelation)
    // NOTE: Nếu model relation của bạn không tên "to", sửa include/to theo schema
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

    // Romaji: ưu tiên romaji trong DB; nếu không có thì dùng reading -> romaji
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
      relatedWords, // ✅ NEW
    };

    await setCache(cacheKey, result, 1800); // 30 phút
    return NextResponse.json({ ...result, cached: false });
  } catch (err) {
    console.error("word-detail error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
