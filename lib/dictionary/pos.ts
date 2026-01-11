// lib/dictionary/pos.ts

export type PosMapped = {
  jp: string; // ví dụ: "名詞 / 副詞（時間）"
  vi: string; // ví dụ: "Danh từ / Phó từ chỉ thời gian"
  extra?: Record<string, any>;
  tags: string[]; // posTag đã normalize: ["n", "adv-time"]
};

/**
 * Normalize posTag string:
 * - chấp nhận: "n|adv-time", "n,adv-time", "n adv-time", "n/adv-time"
 * - chuẩn hoá v5u/v5k/... => "v5"
 */
export function mapPosFromTags(posTagRaw: string): PosMapped {
  const raw = (posTagRaw || "").trim();
  if (!raw) {
    return { jp: "品詞", vi: "Khác", tags: ["other"] };
  }

  // split by common separators
  const tokens = raw
    .split(/[|,/]+|\s+/g)
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean)
    .map((t) => (t.startsWith("v5") ? "v5" : t)); // v5u, v5k... => v5

  const uniq: string[] = [];
  for (const t of tokens) {
    if (!uniq.includes(t)) uniq.push(t);
  }

  const mapOne = (tag: string) => {
    switch (tag) {
      case "n":
        return { jp: "名詞", vi: "Danh từ" };
      case "n-time":
        return { jp: "名詞（時間）", vi: "Danh từ chỉ thời gian" };
      case "pn":
        return { jp: "代名詞", vi: "Đại từ" };
      case "num":
        return { jp: "数詞", vi: "Số từ" };

      case "v1":
        return { jp: "動詞", vi: "Động từ", extra: { group: "Nhóm II (Ichidan)" } };
      case "v5":
        return { jp: "動詞", vi: "Động từ", extra: { group: "Nhóm I (Godan)" } };
      case "vs":
        return { jp: "動詞", vi: "Động từ", extra: { group: "Bất quy tắc (する)" } };
      case "vk":
        return { jp: "動詞", vi: "Động từ", extra: { group: "Bất quy tắc (くる)" } };

      case "adj-i":
        return { jp: "形容詞", vi: "Tính từ đuôi い", extra: { type: "i-adjective" } };
      case "adj-na":
        return { jp: "形容詞", vi: "Tính từ đuôi な", extra: { type: "na-adjective" } };

      case "prt":
        return { jp: "助詞", vi: "Trợ từ" };

      case "adv":
        return { jp: "副詞", vi: "Phó từ" };

      // ✅ tag riêng cho "trạng từ chỉ thời gian"
      case "adv-time":
        return { jp: "副詞（時間）", vi: "Phó từ chỉ thời gian" };

      case "conj":
        return { jp: "接続詞", vi: "Liên từ" };
      case "int":
        return { jp: "感動詞", vi: "Thán từ" };

      default:
        return { jp: "品詞", vi: "Khác", extra: { raw: tag } };
    }
  };

  const mapped = uniq.map(mapOne);

  // Nếu chỉ 1 tag -> giữ extra để hiển thị nhóm động từ/tính từ
  if (mapped.length === 1) {
    return { jp: mapped[0].jp, vi: mapped[0].vi, extra: mapped[0].extra, tags: uniq };
  }

  // Nếu nhiều tag -> join label, bỏ extra (tránh mâu thuẫn)
  return {
    jp: mapped.map((m) => m.jp).join(" / "),
    vi: mapped.map((m) => m.vi).join(" / "),
    tags: uniq,
  };
}
