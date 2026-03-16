import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCache, setCache } from "@/lib/redis";
import { createHash } from "node:crypto";
import { DictionaryEntry, ExampleSentence } from "@prisma/client";
// import { Prisma } from "@prisma/client"; // Temporary removal
import * as wanakana from "wanakana";
import { mapPosFromTags } from "@/lib/dictionary/pos";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type WordDetailRequest =
  | { entryId: string; text?: never; source?: "ja" | "vi" }
  | { text: string; entryId?: never; source?: "ja" | "vi" };

type RelatedWordItem = {
  id: string;
  lemma: string;
  reading: string;
  romaji: string;
  posTag: string;
  meaningVi: string;
  relationType?: string;
};

type EntryWithExamples = DictionaryEntry & {
  examples: ExampleSentence[];
};

function sha1(s: string) {
  return createHash("sha1").update(s).digest("hex");
}

function isRomajiLike(q: string) {
  return /^[a-zA-Z\s'-]+$/.test(q);
}


export async function POST(req: Request) {
  try {
    const body = (await req.json()) as WordDetailRequest;
    const source = body.source ?? "ja";

    const text =
      "text" in body && typeof body.text === "string"
        ? body.text.trim()
        : "entryId" in body
          ? String(body.entryId ?? "").trim()
          : "";

    if (!text) {
      return NextResponse.json({ success: false, error: "Missing text" }, { status: 400 });
    }

    if (text.length > 80) {
      return NextResponse.json({ success: false, error: "Text too long" }, { status: 400 });
    }

    const cacheKey = `dict:word-detail:${source}:${sha1(text.toLowerCase())}`;
    const cached = await getCache<any>(cacheKey);
    if (cached) return NextResponse.json({ ...cached, cached: true });

    let entry: EntryWithExamples | null = null;
    let spellcheck = { is_correct: true, did_you_mean: null as string | null };

    // ==========================================
    // 🔍 LOGIC TÌM KIẾM (Giữ nguyên logic cũ của bạn vì nó tốt)
    // ==========================================

    if ("entryId" in body) {
      entry = await prisma.dictionaryEntry.findUnique({
        where: { id: body.entryId },
        include: { examples: { take: 3, orderBy: { createdAt: "asc" } } },
      });
    } else if (source === 'vi') {
      entry = await prisma.dictionaryEntry.findFirst({
        where: {
          meaningVi: { contains: text, mode: 'insensitive' }
        },
        orderBy: { lemma: 'asc' },
        include: { examples: { take: 3, orderBy: { createdAt: "asc" } } },
      });
    } else {
      const romajiInput = isRomajiLike(text);
      const textLower = text.toLowerCase();

      const candidates = await prisma.dictionaryEntry.findMany({
        where: {
          lang: "ja",
          OR: [{ lemma: text }, { reading: text }, { romaji: textLower }],
        },
        take: 5,
        include: { examples: { take: 3, orderBy: { createdAt: "asc" } } },
      });

      if (candidates.length > 0) {
        candidates.sort((a: any, b: any) => {
          const exDiff = b.examples.length - a.examples.length;
          if (exDiff !== 0) return exDiff;
          const defA = a.meaningVi ? a.meaningVi.length : 0;
          const defB = b.meaningVi ? b.meaningVi.length : 0;
          return defB - defA;
        });
        entry = candidates[0];
      }

      if (!entry) {
        const rows = await prisma.$queryRaw<Array<{ id: string; lemma: string; score: number }>>((prisma as any).sql`
          SELECT id, lemma, GREATEST(similarity(lemma, ${text}), similarity(COALESCE(reading, ''), ${text})) AS score
          FROM "DictionaryEntry"
          WHERE lang='ja' AND (lemma % ${text} OR COALESCE(reading,'') % ${text})
          ORDER BY score DESC LIMIT 1;
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

    if (!entry) {
      return NextResponse.json({ success: false, error: "NOT_FOUND" }, { status: 404 });
    }

    // ==========================================
    // 🔗 LẤY TỪ LIÊN QUAN (ĐÃ TỐI ƯU SONG SONG)
    // ==========================================

    const [outgoing, incoming] = await Promise.all([
      // 1. Lấy quan hệ Xuôi (Từ này trỏ đến từ khác)
      prisma.dictionaryRelation.findMany({
        where: { fromId: entry.id },
        take: 10,
        include: { to: true },
      }),
      // 2. Lấy quan hệ Ngược (Từ khác trỏ đến từ này)
      prisma.dictionaryRelation.findMany({
        where: { toId: entry.id },
        take: 10,
        include: { from: true },
      })
    ]);

    // 3. Gộp và Map dữ liệu
    // Chúng ta cần lấy đối tượng "DictionaryEntry" từ cả 2 chiều
    const rawRelated = [
      ...outgoing.map((r: any) => ({ ...r.to, relationType: r.type })),   // Lấy 'to'
      ...incoming.map((r: any) => ({ ...r.from, relationType: r.type }))  // Lấy 'from'
    ];

    // 4. Lọc trùng lặp (Deduplicate) theo ID và lọc chính nó
    const uniqueRelated = rawRelated.filter((item: any, index: number, self: any[]) =>
      index === self.findIndex((t: any) => t.id === item.id) && item.id !== entry?.id
    );

    // 5. Format dữ liệu trả về chuẩn Frontend
    const relatedWords: RelatedWordItem[] = uniqueRelated.map((item: any) => ({
      id: item.id,
      lemma: item.lemma,
      reading: item.reading ?? "",
      romaji: (item.romaji ?? "").trim() || (item.reading ? wanakana.toRomaji(item.reading) : ""),
      posTag: item.posTag,
      meaningVi: item.meaningVi ?? "",
      relationType: item.relationType // Trả thêm cái này nếu muốn hiển thị (trái nghĩa/đồng nghĩa)
    }));

    // ==========================================
    // 🏁 TRẢ KẾT QUẢ
    // ==========================================

    const romaji = (entry.romaji ?? "").trim() || (entry.reading ? wanakana.toRomaji(entry.reading) : "");
    const pos = mapPosFromTags(entry.posTag);

    const examples = (entry.examples ?? []).slice(0, 3).map((ex: any) => ({
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
      relatedWords, // ✅ Đã có dữ liệu chuẩn
    };

    await setCache(cacheKey, result, 1800);
    return NextResponse.json({ ...result, cached: false });

  } catch (err) {
    console.error("word-detail error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}