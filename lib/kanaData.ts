// lib/kanaData.ts

export type KanaChar = {
  romaji: string;
  kana: string;
};

// ── Gojuon (清音) ─────────────────────────────────────────────────────────────

export const HIRAGANA_DATA: KanaChar[] = [
  { romaji: 'a', kana: 'あ' }, { romaji: 'i', kana: 'い' }, { romaji: 'u', kana: 'う' }, { romaji: 'e', kana: 'え' }, { romaji: 'o', kana: 'お' },
  { romaji: 'ka', kana: 'か' }, { romaji: 'ki', kana: 'き' }, { romaji: 'ku', kana: 'く' }, { romaji: 'ke', kana: 'け' }, { romaji: 'ko', kana: 'こ' },
  { romaji: 'sa', kana: 'さ' }, { romaji: 'shi', kana: 'し' }, { romaji: 'su', kana: 'す' }, { romaji: 'se', kana: 'せ' }, { romaji: 'so', kana: 'そ' },
  { romaji: 'ta', kana: 'た' }, { romaji: 'chi', kana: 'ち' }, { romaji: 'tsu', kana: 'つ' }, { romaji: 'te', kana: 'て' }, { romaji: 'to', kana: 'と' },
  { romaji: 'na', kana: 'な' }, { romaji: 'ni', kana: 'に' }, { romaji: 'nu', kana: 'ぬ' }, { romaji: 'ne', kana: 'ね' }, { romaji: 'no', kana: 'の' },
  { romaji: 'ha', kana: 'は' }, { romaji: 'hi', kana: 'ひ' }, { romaji: 'fu', kana: 'ふ' }, { romaji: 'he', kana: 'へ' }, { romaji: 'ho', kana: 'ほ' },
  { romaji: 'ma', kana: 'ま' }, { romaji: 'mi', kana: 'み' }, { romaji: 'mu', kana: 'む' }, { romaji: 'me', kana: 'め' }, { romaji: 'mo', kana: 'も' },
  { romaji: 'ya', kana: 'や' }, { romaji: 'yu', kana: 'ゆ' }, { romaji: 'yo', kana: 'よ' },
  { romaji: 'ra', kana: 'ら' }, { romaji: 'ri', kana: 'り' }, { romaji: 'ru', kana: 'る' }, { romaji: 're', kana: 'れ' }, { romaji: 'ro', kana: 'ろ' },
  { romaji: 'wa', kana: 'わ' }, { romaji: 'wo', kana: 'を' }, { romaji: 'n', kana: 'ん' },
];

export const KATAKANA_DATA: KanaChar[] = [
  { romaji: 'a', kana: 'ア' }, { romaji: 'i', kana: 'イ' }, { romaji: 'u', kana: 'ウ' }, { romaji: 'e', kana: 'エ' }, { romaji: 'o', kana: 'オ' },
  { romaji: 'ka', kana: 'カ' }, { romaji: 'ki', kana: 'キ' }, { romaji: 'ku', kana: 'ク' }, { romaji: 'ke', kana: 'ケ' }, { romaji: 'ko', kana: 'コ' },
  { romaji: 'sa', kana: 'サ' }, { romaji: 'shi', kana: 'シ' }, { romaji: 'su', kana: 'ス' }, { romaji: 'se', kana: 'セ' }, { romaji: 'so', kana: 'ソ' },
  { romaji: 'ta', kana: 'タ' }, { romaji: 'chi', kana: 'チ' }, { romaji: 'tsu', kana: 'ツ' }, { romaji: 'te', kana: 'テ' }, { romaji: 'to', kana: 'ト' },
  { romaji: 'na', kana: 'ナ' }, { romaji: 'ni', kana: 'ニ' }, { romaji: 'nu', kana: 'ヌ' }, { romaji: 'ne', kana: 'ネ' }, { romaji: 'no', kana: 'ノ' },
  { romaji: 'ha', kana: 'ハ' }, { romaji: 'hi', kana: 'ヒ' }, { romaji: 'fu', kana: 'フ' }, { romaji: 'he', kana: 'ヘ' }, { romaji: 'ho', kana: 'ホ' },
  { romaji: 'ma', kana: 'マ' }, { romaji: 'mi', kana: 'ミ' }, { romaji: 'mu', kana: 'ム' }, { romaji: 'me', kana: 'メ' }, { romaji: 'mo', kana: 'モ' },
  { romaji: 'ya', kana: 'ヤ' }, { romaji: 'yu', kana: 'ユ' }, { romaji: 'yo', kana: 'ヨ' },
  { romaji: 'ra', kana: 'ラ' }, { romaji: 'ri', kana: 'リ' }, { romaji: 'ru', kana: 'ル' }, { romaji: 're', kana: 'レ' }, { romaji: 'ro', kana: 'ロ' },
  { romaji: 'wa', kana: 'ワ' }, { romaji: 'wo', kana: 'ヲ' }, { romaji: 'n', kana: 'ン' },
];

// ── Dakuten 濁音 (Voiced) ─────────────────────────────────────────────────────

export const HIRAGANA_DAKUTEN: KanaChar[] = [
  // が行 (GA)
  { romaji: 'ga', kana: 'が' }, { romaji: 'gi', kana: 'ぎ' }, { romaji: 'gu', kana: 'ぐ' }, { romaji: 'ge', kana: 'げ' }, { romaji: 'go', kana: 'ご' },
  // ざ行 (ZA)
  { romaji: 'za', kana: 'ざ' }, { romaji: 'ji', kana: 'じ' }, { romaji: 'zu', kana: 'ず' }, { romaji: 'ze', kana: 'ぜ' }, { romaji: 'zo', kana: 'ぞ' },
  // だ行 (DA)
  { romaji: 'da', kana: 'だ' }, { romaji: 'di', kana: 'ぢ' }, { romaji: 'du', kana: 'づ' }, { romaji: 'de', kana: 'で' }, { romaji: 'do', kana: 'ど' },
  // ば行 (BA)
  { romaji: 'ba', kana: 'ば' }, { romaji: 'bi', kana: 'び' }, { romaji: 'bu', kana: 'ぶ' }, { romaji: 'be', kana: 'べ' }, { romaji: 'bo', kana: 'ぼ' },
  // ぱ行 (PA – handakuten 半濁音)
  { romaji: 'pa', kana: 'ぱ' }, { romaji: 'pi', kana: 'ぴ' }, { romaji: 'pu', kana: 'ぷ' }, { romaji: 'pe', kana: 'ぺ' }, { romaji: 'po', kana: 'ぽ' },
];

export const KATAKANA_DAKUTEN: KanaChar[] = [
  // ガ行 (GA)
  { romaji: 'ga', kana: 'ガ' }, { romaji: 'gi', kana: 'ギ' }, { romaji: 'gu', kana: 'グ' }, { romaji: 'ge', kana: 'ゲ' }, { romaji: 'go', kana: 'ゴ' },
  // ザ行 (ZA)
  { romaji: 'za', kana: 'ザ' }, { romaji: 'ji', kana: 'ジ' }, { romaji: 'zu', kana: 'ズ' }, { romaji: 'ze', kana: 'ゼ' }, { romaji: 'zo', kana: 'ゾ' },
  // ダ行 (DA)
  { romaji: 'da', kana: 'ダ' }, { romaji: 'di', kana: 'ヂ' }, { romaji: 'du', kana: 'ヅ' }, { romaji: 'de', kana: 'デ' }, { romaji: 'do', kana: 'ド' },
  // バ行 (BA)
  { romaji: 'ba', kana: 'バ' }, { romaji: 'bi', kana: 'ビ' }, { romaji: 'bu', kana: 'ブ' }, { romaji: 'be', kana: 'ベ' }, { romaji: 'bo', kana: 'ボ' },
  // パ行 (PA – handakuten 半濁音)
  { romaji: 'pa', kana: 'パ' }, { romaji: 'pi', kana: 'ピ' }, { romaji: 'pu', kana: 'プ' }, { romaji: 'pe', kana: 'ペ' }, { romaji: 'po', kana: 'ポ' },
];