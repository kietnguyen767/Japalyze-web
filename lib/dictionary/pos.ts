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
      // --- DANH TỪ ---
      case "n":
        return { jp: "名詞", vi: "Danh từ" };
      case "n-time":
        return { jp: "名詞（時間）", vi: "Danh từ chỉ thời gian" };
      case "vn": // ✨ Thêm: Verbal Noun (Danh động từ)
        return { jp: "サ変名詞", vi: "Danh động từ (Suru)" };
      case "pn":
        return { jp: "代名詞", vi: "Đại từ" };
      case "num":
        return { jp: "数詞", vi: "Số từ" };

      // --- ĐỘNG TỪ ---
      case "v1":
        return { jp: "動詞", vi: "Động từ", extra: { group: "Nhóm II (Ichidan)" } };
      case "v5":
        return { jp: "動詞", vi: "Động từ", extra: { group: "Nhóm I (Godan)" } };
      case "vs":
        return { jp: "動詞", vi: "Động từ", extra: { group: "Bất quy tắc (する)" } };
      case "vk":
        return { jp: "動詞", vi: "Động từ", extra: { group: "Bất quy tắc (くる)" } };
      
      // ✨ Thêm: Tự động từ / Tha động từ (Rất quan trọng ở N3/N2)
      case "vi": 
        return { jp: "自動詞", vi: "Tự động từ" };
      case "vt":
        return { jp: "他動詞", vi: "Tha động từ" };

      // --- TÍNH TỪ ---
      case "adj-i":
        return { jp: "形容詞", vi: "Tính từ đuôi い", extra: { type: "i-adjective" } };
      case "adj-na":
        return { jp: "形容詞", vi: "Tính từ đuôi な", extra: { type: "na-adjective" } };
      case "adj-no": // ✨ Thêm: Danh từ dùng với の (Ví dụ: 永遠の愛 - Tình yêu vĩnh cửu)
        return { jp: "の形容詞", vi: "Sở hữu cách (の)", extra: { type: "no-adjective" } };
      case "adj-pn": // ✨ Thêm: Tính từ đứng trước danh từ (Prenominal adjective - ví dụ: 連体詞)
         return { jp: "連体詞", vi: "Liên thể từ" };

      // --- TỪ LOẠI KHÁC ---
      case "prt":
        return { jp: "助詞", vi: "Trợ từ" };
      case "adv":
        return { jp: "副詞", vi: "Phó từ" };
      case "adv-time": // tag riêng cho "trạng từ chỉ thời gian"
        return { jp: "副詞（時間）", vi: "Phó từ chỉ thời gian" };
      case "conj":
        return { jp: "接続詞", vi: "Liên từ" };
      case "int":
        return { jp: "感動詞", vi: "Thán từ" };
      case "exp": // ✨ Thêm: Cụm từ cố định (Expression)
        return { jp: "表現", vi: "Cụm từ / Thành ngữ" };
      case "pref": // ✨ Thêm: Tiền tố (ví dụ: 不~)
        return { jp: "接頭辞", vi: "Tiền tố" };
      case "suf": // ✨ Thêm: Hậu tố (ví dụ: ~的)
        return { jp: "接尾辞", vi: "Hậu tố" };

      default:
        // Fallback cho các từ lạ
        return { jp: "品詞", vi: "Khác", extra: { raw: tag } };
    }
  };

  const mapped = uniq.map(mapOne);

  // Nếu chỉ 1 tag -> giữ extra để hiển thị nhóm động từ/tính từ
  if (mapped.length === 1) {
    return { jp: mapped[0].jp, vi: mapped[0].vi, extra: mapped[0].extra, tags: uniq };
  }

  // Nếu nhiều tag -> join label
  // Ví dụ: "n|vs" -> "Danh từ / Động từ" (Rất hay gặp ở N2: 緊張, 感情,...)
  return {
    jp: mapped.map((m) => m.jp).join("・"), // Dùng dấu ・ cho tiếng Nhật đẹp hơn
    vi: mapped.map((m) => m.vi).join(" / "),
    tags: uniq,
  };
}