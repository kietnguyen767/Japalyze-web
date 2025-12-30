// lib/lessonData.ts

// --- DỮ LIỆU ĐẦY ĐỦ 46 CHỮ CÁI HIRAGANA ---
export const HIRAGANA_QUIZ = [
  { romaji: 'a', kana: 'あ' }, { romaji: 'i', kana: 'い' }, { romaji: 'u', kana: 'う' }, { romaji: 'e', kana: 'え' }, { romaji: 'o', kana: 'お' },
  { romaji: 'ka', kana: 'か' }, { romaji: 'ki', kana: 'き' }, { romaji: 'ku', kana: 'く' }, { romaji: 'ke', kana: 'け' }, { romaji: 'ko', kana: 'こ' },
  { romaji: 'sa', kana: 'さ' }, { romaji: 'shi', kana: 'し' }, { romaji: 'su', kana: 'す' }, { romaji: 'se', kana: 'せ' }, { romaji: 'so', kana: 'そ' },
  { romaji: 'ta', kana: 'た' }, { romaji: 'chi', kana: 'ち' }, { romaji: 'tsu', kana: 'つ' }, { romaji: 'te', kana: 'て' }, { romaji: 'to', kana: 'と' },
  { romaji: 'na', kana: 'な' }, { romaji: 'ni', kana: 'に' }, { romaji: 'nu', kana: 'ぬ' }, { romaji: 'ne', kana: 'ね' }, { romaji: 'no', kana: 'の' },
  { romaji: 'ha', kana: 'は' }, { romaji: 'hi', kana: 'ひ' }, { romaji: 'fu', kana: 'ふ' }, { romaji: 'he', kana: 'へ' }, { romaji: 'ho', kana: 'ほ' },
  { romaji: 'ma', kana: 'ま' }, { romaji: 'mi', kana: 'み' }, { romaji: 'mu', kana: 'む' }, { romaji: 'me', kana: 'め' }, { romaji: 'mo', kana: 'も' },
  { romaji: 'ya', kana: 'や' }, { romaji: 'yu', kana: 'ゆ' }, { romaji: 'yo', kana: 'よ' },
  { romaji: 'ra', kana: 'ら' }, { romaji: 'ri', kana: 'り' }, { romaji: 'ru', kana: 'る' }, { romaji: 're', kana: 'れ' }, { romaji: 'ro', kana: 'ろ' },
  { romaji: 'wa', kana: 'わ' }, { romaji: 'wo', kana: 'を' }, { romaji: 'n', kana: 'ん' }
];

// --- DỮ LIỆU ĐẦY ĐỦ 46 CHỮ CÁI KATAKANA ---
export const KATAKANA_QUIZ = [
  { romaji: 'a', kana: 'ア' }, { romaji: 'i', kana: 'イ' }, { romaji: 'u', kana: 'ウ' }, { romaji: 'e', kana: 'エ' }, { romaji: 'o', kana: 'オ' },
  { romaji: 'ka', kana: 'カ' }, { romaji: 'ki', kana: 'キ' }, { romaji: 'ku', kana: 'ク' }, { romaji: 'ke', kana: 'ケ' }, { romaji: 'ko', kana: 'コ' },
  { romaji: 'sa', kana: 'サ' }, { romaji: 'shi', kana: 'シ' }, { romaji: 'su', kana: 'ス' }, { romaji: 'se', kana: 'セ' }, { romaji: 'so', kana: 'ソ' },
  { romaji: 'ta', kana: 'タ' }, { romaji: 'chi', kana: 'チ' }, { romaji: 'tsu', kana: 'ツ' }, { romaji: 'te', kana: 'テ' }, { romaji: 'to', kana: 'ト' },
  { romaji: 'na', kana: 'ナ' }, { romaji: 'ni', kana: 'ニ' }, { romaji: 'nu', kana: 'ヌ' }, { romaji: 'ne', kana: 'ネ' }, { romaji: 'no', kana: 'ノ' },
  { romaji: 'ha', kana: 'ハ' }, { romaji: 'hi', kana: 'ヒ' }, { romaji: 'fu', kana: 'フ' }, { romaji: 'he', kana: 'ヘ' }, { romaji: 'ho', kana: 'ホ' },
  { romaji: 'ma', kana: 'マ' }, { romaji: 'mi', kana: 'ミ' }, { romaji: 'mu', kana: 'ム' }, { romaji: 'me', kana: 'メ' }, { romaji: 'mo', kana: 'モ' },
  { romaji: 'ya', kana: 'ヤ' }, { romaji: 'yu', kana: 'ユ' }, { romaji: 'yo', kana: 'ヨ' },
  { romaji: 'ra', kana: 'ラ' }, { romaji: 'ri', kana: 'リ' }, { romaji: 'ru', kana: 'ル' }, { romaji: 're', kana: 'レ' }, { romaji: 'ro', kana: 'ロ' },
  { romaji: 'wa', kana: 'ワ' }, { romaji: 'wo', kana: 'ヲ' }, { romaji: 'n', kana: 'ン' }
];

// --- DỮ LIỆU SỐ ĐẾM (GIỮ NGUYÊN) ---
export type VocabItem = {
  kana: string;
  kanji?: string;
  romaji?: string;
  meaning: string;
  note?: string;
};

export const NUMBER_LESSON_DATA = [
  {
    title: "1. Số đếm cơ bản (0 - 100 Triệu)",
    items: [
      { kanji: '0', kana: 'ゼロ / まる', meaning: 'Số 0' },
      { kanji: '一', kana: 'いち', meaning: '1 (Một)' },
      { kanji: '二', kana: 'に', meaning: '2 (Hai)' },
      { kanji: '三', kana: 'さん', meaning: '3 (Ba)' },
      { kanji: '四', kana: 'し / よん', meaning: '4 (Bốn)' },
      { kanji: '五', kana: 'ご', meaning: '5 (Năm)' },
      { kanji: '六', kana: 'ろく', meaning: '6 (Sáu)' },
      { kanji: '七', kana: 'なな / しち', meaning: '7 (Bảy)' },
      { kanji: '八', kana: 'はち', meaning: '8 (Tám)' },
      { kanji: '九', kana: 'く / きゅう', meaning: '9 (Chín)' },
      { kanji: '十', kana: 'じゅう', meaning: '10 (Mười)' },
      { kanji: '十一', kana: 'じゅういち', meaning: '11' },
      { kanji: '十二', kana: 'じゅうに', meaning: '12' },
      { kanji: '十三', kana: 'じゅうさん', meaning: '13' },
      { kanji: '十四', kana: 'じゅうよん', meaning: '14' },
      { kanji: '十五', kana: 'じゅうご', meaning: '15' },
      { kanji: '十六', kana: 'じゅうろく', meaning: '16' },
      { kanji: '十七', kana: 'じゅうなな', meaning: '17' },
      { kanji: '十八', kana: 'じゅうはち', meaning: '18' },
      { kanji: '十九', kana: 'じゅうきゅう', meaning: '19' },
      { kanji: '二十', kana: 'にじゅう', meaning: '20' },
      { kanji: '百', kana: 'ひゃく', meaning: '100 (Trăm)' },
      { kanji: '千', kana: 'せん', meaning: '1.000 (Nghìn)' },
      { kanji: '一万', kana: 'いちまん', meaning: '10.000 (Vạn)' },
      { kanji: '百万', kana: 'ひゃくまん', meaning: '1.000.000 (Triệu)' },
      { kanji: '一億', kana: 'いちおく', meaning: '100.000.000 (100 Triệu)' },
    ]
  },
  {
    title: "2. Cách đếm 'Một nửa' (半 - Han)",
    items: [
      { kanji: '4年半', kana: 'よねんはん', meaning: '4 năm rưỡi' },
      { kanji: '3時半', kana: 'さんじはん', meaning: '3 giờ rưỡi' },
      { kanji: '半日', kana: 'はんにち', meaning: 'Nửa ngày' },
      { kanji: '半月', kana: 'はんつき', meaning: 'Nửa tháng' },
      { kanji: '半分', kana: 'はんぶん', meaning: 'Một nửa' },
      { kanji: '半年', kana: 'はんとし', meaning: 'Nửa năm' },
      { kanji: '半生', kana: 'はんせい', meaning: 'Nửa đời' },
    ]
  },
  {
    title: "3. Thời gian (Thứ, Ngày, Tháng)",
    items: [
      { kanji: '月曜日', kana: 'げつようび', meaning: 'Thứ Hai' },
      { kanji: '火曜日', kana: 'かようび', meaning: 'Thứ Ba' },
      { kanji: '水曜日', kana: 'すいようび', meaning: 'Thứ Tư' },
      { kanji: '木曜日', kana: 'もくようび', meaning: 'Thứ Năm' },
      { kanji: '金曜日', kana: 'きんようび', meaning: 'Thứ Sáu' },
      { kanji: '土曜日', kana: 'どようび', meaning: 'Thứ Bảy' },
      { kanji: '日曜日', kana: 'にちようび', meaning: 'Chủ Nhật' },
      { kanji: '一日', kana: 'ついたち', meaning: 'Ngày mùng 1' },
      { kanji: '二日', kana: 'ふつか', meaning: 'Ngày mùng 2' },
      { kanji: '三日', kana: 'みっか', meaning: 'Ngày mùng 3' },
      { kanji: '四日', kana: 'よっか', meaning: 'Ngày mùng 4' },
      { kanji: '五日', kana: 'いつか', meaning: 'Ngày mùng 5' },
      { kanji: '六日', kana: 'むいか', meaning: 'Ngày mùng 6' },
      { kanji: '七日', kana: 'なのか', meaning: 'Ngày mùng 7' },
      { kanji: '八日', kana: 'ようか', meaning: 'Ngày mùng 8' },
      { kanji: '九日', kana: 'ここのか', meaning: 'Ngày mùng 9' },
      { kanji: '十日', kana: 'とおか', meaning: 'Ngày mùng 10' },
      { kanji: '十四日', kana: 'じゅうよっか', meaning: 'Ngày 14' },
      { kanji: '二十日', kana: 'はつか', meaning: 'Ngày 20' },
      { kanji: '二十四日', kana: 'にじゅうよっか', meaning: 'Ngày 24' },
      { kanji: '一月', kana: 'いちがつ', meaning: 'Tháng 1' },
      { kanji: '四月', kana: 'しがつ', meaning: 'Tháng 4' },
      { kanji: '七月', kana: 'しちがつ', meaning: 'Tháng 7' },
      { kanji: '九月', kana: 'くがつ', meaning: 'Tháng 9' },
    ]
  },
  {
    title: "4. Đếm vật (Cái - tsu) & Tuổi",
    items: [
      { kanji: '一つ', kana: 'ひとつ', meaning: '1 cái' },
      { kanji: '二つ', kana: 'ふたつ', meaning: '2 cái' },
      { kanji: '三つ', kana: 'みっつ', meaning: '3 cái' },
      { kanji: '四つ', kana: 'よっつ', meaning: '4 cái' },
      { kanji: '五つ', kana: 'いつつ', meaning: '5 cái' },
      { kanji: '六つ', kana: 'むっつ', meaning: '6 cái' },
      { kanji: '七つ', kana: 'ななつ', meaning: '7 cái' },
      { kanji: '八つ', kana: 'やっつ', meaning: '8 cái' },
      { kanji: '九つ', kana: 'ここのつ', meaning: '9 cái' },
      { kanji: '十', kana: 'とお', meaning: '10 cái' },
      { kanji: '二十歳', kana: 'はたち', meaning: '20 tuổi (Đặc biệt)' },
      { kanji: '二十二歳', kana: 'にじゅうにさい', meaning: '22 tuổi' },
    ]
  },
  {
    title: "5. Số trang trọng (Văn tự, Khế ước)",
    items: [
      { kanji: '壱', kana: 'いち', meaning: 'Số 1 (Văn bản)' },
      { kanji: '弐', kana: 'に', meaning: 'Số 2 (Văn bản)' },
      { kanji: '参', kana: 'さん', meaning: 'Số 3 (Văn bản)' },
      { kanji: '拾', kana: 'じゅう', meaning: 'Số 10 (Văn bản)' },
    ]
  }
];

export const FOOD_LESSON_DATA = [
  {
    title: "1. Các món Cơm (Donburi & Gohan)",
    items: [
      { kanji: '鉄火丼', kana: 'てっかどん', romaji: 'Tekkadon', meaning: 'Cơm cá ngừ sốt mè' },
      { kanji: '親子丼', kana: 'おやこどん', romaji: 'Oyakodon', meaning: 'Cơm gà trứng (Bố mẹ & con)' },
      { kanji: 'カツ丼', kana: 'カツどん', romaji: 'Katsudon', meaning: 'Cơm thịt heo cốt lết chiên xù' },
      { kanji: '牛丼', kana: 'ぎゅうどん', romaji: 'Gyudon', meaning: 'Cơm thịt bò hầm' },
      { kanji: '豚丼', kana: 'ぶたどん', romaji: 'Butadon', meaning: 'Cơm thịt heo' },
      { kanji: '麦とろ丼', kana: 'むぎとろどん', romaji: 'Mugitorodon', meaning: 'Cơm lúa mạch sốt khoai mài' },
      { kanji: '海鮮丼', kana: 'かいせんどんぶり', romaji: 'Kaisendon', meaning: 'Cơm hải sản' },
      { kanji: 'お茶漬け', kana: 'おちゃづけ', romaji: 'Ochazuke', meaning: 'Cơm chan nước trà' },
      { kanji: '卵掛けご飯', kana: 'たまごかけごはん', romaji: 'Tamago kake gohan', meaning: 'Cơm trộn trứng sống' },
      { kanji: '鯛めし', kana: 'たいめし', romaji: 'Taimeshi', meaning: 'Cơm cá tráp' },
      { kanji: 'おにぎり', kana: 'おにぎり', romaji: 'Onigiri', meaning: 'Cơm nắm' },
      { kanji: 'カレーライス', kana: 'カレーライス', romaji: 'Kare-raisu', meaning: 'Cơm cà ri' },
      { kanji: 'ハヤシライス', kana: 'ハヤシライス', romaji: 'Hayashiraisu', meaning: 'Cơm bò sốt Hayashi' },
    ]
  },
  {
    title: "2. Các loại Mì (Men-rui)",
    items: [
      { kanji: 'うどん', kana: 'うどん', romaji: 'Udon', meaning: 'Mì Udon (Sợi to, bột mì)' },
      { kanji: 'そば', kana: 'そば', romaji: 'Soba', meaning: 'Mì Soba (Kiều mạch)' },
      { kanji: '焼きそば', kana: 'やきそば', romaji: 'Yakisoba', meaning: 'Mì xào Nhật Bản' },
      { kanji: 'ラーメン', kana: 'ラーメン', romaji: 'Ramen', meaning: 'Mì Ramen' },
      { kanji: 'インスタントラーメン', kana: 'インスタントラーメン', romaji: 'Instant Ramen', meaning: 'Mì ăn liền' },
      { kanji: '冷やし中華', kana: 'ひやしちゅうか', romaji: 'Hiyashi chuka', meaning: 'Mì lạnh Trung Hoa kiểu Nhật' },
      { kanji: '長崎ちゃんぽん', kana: 'ながさきちゃんぽん', romaji: 'Nagasaki Champon', meaning: 'Mì thập cẩm Nagasaki' },
      { kanji: '素麺', kana: 'そうめん', romaji: 'Somen', meaning: 'Mì ống trúc (Sợi rất nhỏ)' },
      { kanji: 'ひやむぎ', kana: 'ひやむぎ', romaji: 'Hiyamugi', meaning: 'Mì lạnh Hiyamugi' },
    ]
  },
  {
    title: "3. Món Nướng & Chiên (Yakimono & Agemono)",
    items: [
      { kanji: '焼肉', kana: 'やきにく', romaji: 'Yakiniku', meaning: 'Thịt nướng' },
      { kanji: '焼き鳥', kana: 'やきとり', romaji: 'Yakitori', meaning: 'Thịt gà xiên nướng' },
      { kanji: 'うなぎ', kana: 'うなぎ', romaji: 'Unagi', meaning: 'Lươn nướng' },
      { kanji: 'しょうが焼き', kana: 'しょうがやき', romaji: 'Shogayaki', meaning: 'Thịt heo nướng gừng' },
      { kanji: 'たこ焼き', kana: 'たこやき', romaji: 'Takoyaki', meaning: 'Bánh bạch tuộc nướng' },
      { kanji: '天ぷら', kana: 'てんぷら', romaji: 'Tempura', meaning: 'Món tẩm bột chiên (Hải sản/Rau)' },
      { kanji: '串揚げ', kana: 'くしあげ', romaji: 'Kushiage', meaning: 'Xiên que lăn bột chiên' },
      { kanji: 'お好み焼き', kana: 'おこのみやき', romaji: 'Okonomiyaki', meaning: 'Bánh xèo Nhật Bản' },
      { kanji: '鳥のから揚げ', kana: 'とりのからあげ', romaji: 'Karaage', meaning: 'Gà chiên giòn kiểu Nhật' },
      { kanji: 'えびフライ', kana: 'えびフライ', romaji: 'Ebi Furai', meaning: 'Tôm chiên xù' },
      { kanji: 'トンカツ', kana: 'トンカツ', romaji: 'Tonkatsu', meaning: 'Thịt heo cốt lết chiên xù' },
      { kanji: 'ビフカツ', kana: 'ビフカツ', romaji: 'Bifukatsu', meaning: 'Thịt bò cốt lết chiên xù' },
      { kanji: '焼き餃子', kana: 'やきぎょうざ', romaji: 'Yaki Gyoza', meaning: 'Sủi cảo áp chảo' },
    ]
  },
  {
    title: "4. Các món Lẩu (Nabemono)",
    items: [
      { kanji: 'おでん', kana: 'おでん', romaji: 'Oden', meaning: 'Lẩu Oden (Củ cải, trứng, chả cá...)' },
      { kanji: 'しゃぶ鍋', kana: 'しゃぶなべ', romaji: 'Shabu-shabu', meaning: 'Lẩu nhúng (Thịt bò mỏng)' },
      { kanji: 'ちゃんこ鍋', kana: 'ちゃんこなべ', romaji: 'Chanko nabe', meaning: 'Lẩu Sumo (Giàu đạm)' },
      { kanji: 'すき焼き', kana: 'すきやき', romaji: 'Sukiyaki', meaning: 'Lẩu bò nấu rượu ngọt & nước tương' },
      { kanji: 'キムチ鍋', kana: 'キムチなべ', romaji: 'Kimuchi nabe', meaning: 'Lẩu Kimchi' },
      { kanji: '石狩鍋', kana: 'いしかりなべ', romaji: 'Ishikari nabe', meaning: 'Lẩu cá hồi Miso' },
      { kanji: 'うどんすき', kana: 'うどんすき', romaji: 'Udon suki', meaning: 'Lẩu mì Udon' },
      { kanji: '豆乳鍋', kana: 'とうにゅうなべ', romaji: 'Tounyu nabe', meaning: 'Lẩu sữa đậu nành' },
      { kanji: 'ぼたん鍋', kana: 'ぼたんなべ', romaji: 'Botan nabe', meaning: 'Lẩu thịt heo rừng' },
      { kanji: 'かにすき', kana: 'かにすき', romaji: 'Kani suki', meaning: 'Lẩu cua' },
    ]
  },
  {
    title: "5. Các loại Bánh & Ngọt (Wagashi)",
    items: [
      { kanji: 'ようかん', kana: 'ようかん', romaji: 'Yokan', meaning: 'Bánh thạch nhân đậu (Dương can)' },
      { kanji: '餅', kana: 'もち', romaji: 'Mochi', meaning: 'Bánh dày (Bánh gạo)' },
      { kanji: 'さくら餅', kana: 'さくらもち', romaji: 'Sakura mochi', meaning: 'Bánh nếp lá anh đào' },
      { kanji: 'わらび餅', kana: 'わらびもち', romaji: 'Warabi mochi', meaning: 'Bánh bột dương xỉ' },
      { kanji: 'かしわ餅', kana: 'かしわもち', romaji: 'Kashiwa mochi', meaning: 'Bánh gói lá sồi (Tết thiếu nhi)' },
      { kanji: '煎餅', kana: 'せんべい', romaji: 'Senbei', meaning: 'Bánh gạo khô (Mặn/Ngọt)' },
      { kanji: 'おはぎ', kana: 'おはぎ', romaji: 'Ohagi', meaning: 'Cơm nếp bọc đậu đỏ' },
      { kanji: 'すあま', kana: 'すあま', romaji: 'Suama', meaning: 'Bánh nếp ngày lễ' },
      { kanji: 'かりんとう', kana: 'かりんとう', romaji: 'Karinto', meaning: 'Bánh quẩy đường đen' },
      { kanji: 'たい焼き', kana: 'たいやき', romaji: 'Taiyaki', meaning: 'Bánh cá nướng' },
      { kanji: 'あられ・おかき', kana: 'あられ・おかき', romaji: 'Arare/Okaki', meaning: 'Bánh quy gạo nhỏ' },
      { kanji: 'どら焼き', kana: 'どらやき', romaji: 'Dorayaki', meaning: 'Bánh rán Doraemon' },
      { kanji: 'いちご大福', kana: 'いちごだいふく', romaji: 'Ichigo Daifuku', meaning: 'Daifuku nhân dâu tây' },
      { kanji: '饅頭', kana: 'まんじゅう', romaji: 'Manju', meaning: 'Bánh màn thầu ngọt' },
    ]
  }
];

export const SPORT_LESSON_DATA = [
  {
    title: "1. Các môn Bóng & Đồng đội",
    items: [
      { kanji: '野球', kana: 'やきゅう', romaji: 'Yakyū', meaning: 'Bóng chày' },
      { kanji: 'サッカー', kana: 'サッカー', romaji: 'Sakkā', meaning: 'Bóng đá' },
      { kanji: 'フットボール', kana: 'フットボール', romaji: 'Futtobōru', meaning: 'Bóng đá kiểu Mỹ' },
      { kanji: 'バスケットボール', kana: 'バスケットボール', romaji: 'Basukettobōru', meaning: 'Bóng rổ' },
      { kanji: 'バレーボール', kana: 'バレーボール', romaji: 'Barēbōru', meaning: 'Bóng chuyền' },
      { kanji: 'テニス', kana: 'テニス', romaji: 'Tenisu', meaning: 'Quần vợt (Tennis)' },
      { kanji: '卓球', kana: 'たっきゅう', romaji: 'Takkyū', meaning: 'Bóng bàn' },
      { kanji: 'バドミントン', kana: 'バドミントン', romaji: 'Badominton', meaning: 'Cầu lông' },
      { kanji: 'ゴルフ', kana: 'ゴルフ', romaji: 'Gorufu', meaning: 'Golf' },
      { kanji: 'ラグビー', kana: 'ラグビー', romaji: 'Ragubī', meaning: 'Bóng bầu dục' },
      { kanji: 'クリケット', kana: 'クリケット', romaji: 'Kuriketto', meaning: 'Bóng gậy (Cricket)' },
      { kanji: 'ハンドボール', kana: 'ハンドボール', romaji: 'Handobōru', meaning: 'Bóng ném' },
      { kanji: 'ソフトボール', kana: 'ソフトボール', romaji: 'Sofutobōru', meaning: 'Bóng mềm' },
      { kanji: 'ネットボール', kana: 'ネットボール', romaji: 'Nettobōru', meaning: 'Bóng lưới' },
      { kanji: 'フィールドホッケー', kana: 'フィールドホッケー', romaji: 'Fīrudohokkē', meaning: 'Khúc côn cầu trên cỏ' },
    ]
  },
  {
    title: "2. Võ thuật & Đối kháng",
    items: [
      { kanji: '柔道', kana: 'じゅうどう', romaji: 'Jūdō', meaning: 'Võ Judo (Nhu đạo)' },
      { kanji: '空手', kana: 'からて', romaji: 'Karate', meaning: 'Võ Karate (Không thủ đạo)' },
      { kanji: '剣道', kana: 'けんどう', romaji: 'Kendō', meaning: 'Kiếm đạo' },
      { kanji: '相撲', kana: 'すもう', romaji: 'Sumō', meaning: 'Đấu vật Sumo' },
      { kanji: '合気道', kana: 'あいきどう', romaji: 'Aikidō', meaning: 'Võ Aikido (Hiệp khí đạo)' },
      { kanji: 'ボクシング', kana: 'ボクシング', romaji: 'Bokushingu', meaning: 'Quyền anh (Boxing)' },
      { kanji: 'レスリング', kana: 'レスリング', romaji: 'Resuringu', meaning: 'Đấu vật' },
      { kanji: '射撃', kana: 'しゃげき', romaji: 'Shageki', meaning: 'Bắn súng' },
      { kanji: 'アーチェリー', kana: 'アーチェリー', romaji: 'Ācherī', meaning: 'Bắn cung' },
    ]
  },
  {
    title: "3. Thể thao dưới nước & Mùa đông",
    items: [
      { kanji: '水泳', kana: 'すいえい', romaji: 'Suiei', meaning: 'Bơi lội' },
      { kanji: 'サーフィン', kana: 'サーフィン', romaji: 'Sāfin', meaning: 'Lướt sóng' },
      { kanji: 'ダイビング', kana: 'ダイビング', romaji: 'Daibingu', meaning: 'Lặn' },
      { kanji: 'ボート漕ぎ', kana: 'ボートこぎ', romaji: 'Bōtokogi', meaning: 'Chèo thuyền' },
      { kanji: 'スキー', kana: 'スキー', romaji: 'Sukī', meaning: 'Trượt tuyết' },
      { kanji: 'フィギュアスケート', kana: 'フィギュアスケート', romaji: 'Figyua sukēto', meaning: 'Trượt băng nghệ thuật' },
      { kanji: 'アイスホッケー', kana: 'アイスホッケー', romaji: 'Aisuhokkē', meaning: 'Khúc côn cầu trên băng' },
    ]
  },
  {
    title: "4. Điền kinh & Vận động",
    items: [
      { kanji: 'スポーツ', kana: 'スポーツ', romaji: 'Supōtsu', meaning: 'Thể thao (Nói chung)' },
      { kanji: '運動', kana: 'うんどう', romaji: 'Undō', meaning: 'Vận động / Thể dục' },
      { kanji: '体育', kana: 'たいいく', romaji: 'Taiiku', meaning: 'Giáo dục thể chất' },
      { kanji: '体操', kana: 'たいそう', romaji: 'Taisō', meaning: 'Thể dục dụng cụ' },
      { kanji: 'ジョギング', kana: 'ジョギング', romaji: 'Jogingu', meaning: 'Chạy bộ chậm' },
      { kanji: 'ランニング', kana: 'ランニング', romaji: 'Ranningu', meaning: 'Chạy bộ' },
      { kanji: 'マラソン', kana: 'マラソン', romaji: 'Marason', meaning: 'Chạy Marathon' },
      { kanji: 'サイクリング', kana: 'サイクリング', romaji: 'Saikuringu', meaning: 'Đạp xe' },
      { kanji: '登山', kana: 'とざん', romaji: 'Tozan', meaning: 'Leo núi' },
      { kanji: '乗馬', kana: 'じょうば', romaji: 'Jōba', meaning: 'Cưỡi ngựa' },
      { kanji: '釣り', kana: 'つり', romaji: 'Tsuri', meaning: 'Câu cá' },
      { kanji: 'エアロビクス', kana: 'エアロビクス', romaji: 'Earobikusu', meaning: 'Thể dục nhịp điệu' },
      { kanji: 'ダンシング', kana: 'ダンシング', romaji: 'Danshingu', meaning: 'Nhảy múa' },
    ]
  },
  {
    title: "5. Thuật ngữ thi đấu",
    items: [
      { kanji: '選手', kana: 'せんしゅ', romaji: 'Senshu', meaning: 'Tuyển thủ / Người chơi' },
      { kanji: 'チーム', kana: 'チーム', romaji: 'Chīmu', meaning: 'Đội (Team)' },
      { kanji: '試合', kana: 'しあい', romaji: 'Shiai', meaning: 'Trận đấu' },
      { kanji: '勝ち', kana: 'かち', romaji: 'Kachi', meaning: 'Thắng' },
      { kanji: '負け', kana: 'まけ', romaji: 'Make', meaning: 'Thua' },
      { kanji: '引き分け', kana: 'ひきわけ', romaji: 'Hikiwake', meaning: 'Hòa' },
      { kanji: 'トーナメント', kana: 'トーナメント', romaji: 'Tōnamento', meaning: 'Giải đấu' },
      { kanji: '決勝戦', kana: 'けっしょうせん', romaji: 'Kesshōsen', meaning: 'Trận chung kết' },
      { kanji: '準決勝', kana: 'じゅんけっしょう', romaji: 'Junkesshō', meaning: 'Bán kết' },
      { kanji: '準準決勝', kana: 'じゅんじゅんけっしょう', romaji: 'Junjunkesshō', meaning: 'Tứ kết' },
      { kanji: '将棋', kana: 'しょうぎ', romaji: 'Shōgi', meaning: 'Cờ tướng Nhật Bản' },
      { kanji: 'ゲーム', kana: 'ゲーム', romaji: 'Gēmu', meaning: 'Trò chơi' },
    ]
  }
];

export const WEATHER_LESSON_DATA = [
  {
    title: "1. Danh từ Thời tiết cơ bản",
    items: [
      { kanji: '天気', kana: 'てんき', romaji: 'Tenki', meaning: 'Thời tiết' },
      { kanji: '天気予報', kana: 'てんきよほう', romaji: 'Tenki yohou', meaning: 'Dự báo thời tiết' },
      { kanji: '太陽', kana: 'たいよう', romaji: 'Taiyou', meaning: 'Mặt trời' },
      { kanji: '雲', kana: 'くも', romaji: 'Kumo', meaning: 'Mây' },
      { kanji: '雨', kana: 'あめ', romaji: 'Ame', meaning: 'Mưa' },
      { kanji: '風', kana: 'かぜ', romaji: 'Kaze', meaning: 'Gió' },
      { kanji: '雪', kana: 'ゆき', romaji: 'Yuki', meaning: 'Tuyết' },
      { kanji: '雷', kana: 'かみなり', romaji: 'Kaminari', meaning: 'Sấm sét' },
      { kanji: '虹', kana: 'にじ', romaji: 'Niji', meaning: 'Cầu vồng' },
      { kanji: '霧', kana: 'きり', romaji: 'Kiri', meaning: 'Sương mù' },
      { kanji: '氷', kana: 'こおり', romaji: 'Koori', meaning: 'Băng' },
      { kanji: '湿度', kana: 'しつど', romaji: 'Shitsudo', meaning: 'Độ ẩm' },
      { kanji: '気温', kana: 'きおん', romaji: 'Kion', meaning: 'Nhiệt độ' },
    ]
  },
  {
    title: "2. Trạng thái & Dự báo",
    items: [
      { kanji: '晴れ', kana: 'はれ', romaji: 'Hare', meaning: 'Trời quang / Nắng' },
      { kanji: '曇り', kana: 'くもり', romaji: 'Kumori', meaning: 'Trời nhiều mây (Âm u)' },
      { kanji: '快晴', kana: 'かいせい', romaji: 'Kaisei', meaning: 'Trời quang đãng (Rất ít mây)' },
      { kanji: '蒸し暑い', kana: 'むしあつい', romaji: 'Mushiatsui', meaning: 'Oi bức / Nóng nực' },
      { kanji: '爽やか', kana: 'さわやか', romaji: 'Sawayaka', meaning: 'Thoáng đãng / Dễ chịu' },
      { kanji: '最高気温', kana: 'さいこうきおん', romaji: 'Saikou kion', meaning: 'Nhiệt độ cao nhất' },
      { kanji: '最低気温', kana: 'さいていきおん', romaji: 'Saitei kion', meaning: 'Nhiệt độ thấp nhất' },
      { kanji: '降水確率', kana: 'こうすいかくりつ', romaji: 'Kousui kakuritsu', meaning: 'Xác suất mưa' },
      { kanji: '晴れのち曇り', kana: 'はれのちくもり', romaji: 'Hare nochi kumori', meaning: 'Nắng sau đó chuyển mây' },
      { kanji: '曇り時々雨', kana: 'くもりときどきあめ', romaji: 'Kumori tokidoki ame', meaning: 'Có mây, thỉnh thoảng mưa' },
    ]
  },
  {
    title: "3. Các loại Mưa & Tuyết",
    items: [
      { kanji: '小雨', kana: 'こあめ', romaji: 'Koame', meaning: 'Mưa nhỏ / Mưa phùn' },
      { kanji: '大雨', kana: 'おおあめ', romaji: 'Ooame', meaning: 'Mưa to / Mưa rào' },
      { kanji: '豪雨', kana: 'ごうう', romaji: 'Gouu', meaning: 'Mưa rất to (Xối xả)' },
      { kanji: '暴風雨', kana: 'ぼうふうう', romaji: 'Boufuuu', meaning: 'Mưa bão' },
      { kanji: '局地的な雨', kana: 'きょくちてきなあめ', romaji: 'Kyokuchiteki na ame', meaning: 'Mưa cục bộ / Rải rác' },
      { kanji: '春雨', kana: 'はるさめ', romaji: 'Harusame', meaning: 'Mưa xuân' },
      { kanji: '大雪', kana: 'おおゆき', romaji: 'Ooyuki', meaning: 'Tuyết rơi dày' },
      { kanji: 'つらら', kana: 'つらら', romaji: 'Tsurara', meaning: 'Băng rủ (Cột băng)' },
      { kanji: '季節風', kana: 'きせつふう', romaji: 'Kisetsufuu', meaning: 'Gió mùa' },
    ]
  },
  {
    title: "4. Bốn mùa (Kisetsu)",
    items: [
      { kanji: '季節', kana: 'きせつ', romaji: 'Kisetsu', meaning: 'Mùa' },
      { kanji: '春', kana: 'はる', romaji: 'Haru', meaning: 'Mùa xuân' },
      { kanji: '夏', kana: 'なつ', romaji: 'Natsu', meaning: 'Mùa hè' },
      { kanji: '秋', kana: 'あき', romaji: 'Aki', meaning: 'Mùa thu' },
      { kanji: '冬', kana: 'ふゆ', romaji: 'Fuyu', meaning: 'Mùa đông' },
      { kanji: '梅雨', kana: 'つゆ', romaji: 'Tsuyu', meaning: 'Mùa mưa (Tháng 6)' },
      { kanji: '乾季', kana: 'かんき', romaji: 'Kanki', meaning: 'Mùa khô' },
    ]
  },
  {
    title: "5. Thiên tai (Tensai)",
    items: [
      { kanji: '天災', kana: 'てんさい', romaji: 'Tensai', meaning: 'Thiên tai' },
      { kanji: '台風', kana: 'たいふう', romaji: 'Taifuu', meaning: 'Bão (Typhoon)' },
      { kanji: '地震', kana: 'じしん', romaji: 'Jishin', meaning: 'Động đất' },
      { kanji: '津波', kana: 'つなみ', romaji: 'Tsunami', meaning: 'Sóng thần' },
      { kanji: '洪水', kana: 'こうずい', romaji: 'Kouzui', meaning: 'Lũ lụt' },
      { kanji: '竜巻', kana: 'たつまき', romaji: 'Tatsumaki', meaning: 'Lốc xoáy' },
      { kanji: '雪崩', kana: 'なだれ', romaji: 'Nadare', meaning: 'Tuyết lở' },
      { kanji: '火山', kana: 'かざん', romaji: 'Kazan', meaning: 'Núi lửa' },
    ]
  }
];

export const SCHOOL_LESSON_DATA = [
  {
    title: "1. Các cấp học & Loại trường",
    items: [
      { kanji: '学校', kana: 'がっこう', romaji: 'Gakkou', meaning: 'Trường học' },
      { kanji: '幼稚園', kana: 'ようちえん', romaji: 'Youchien', meaning: 'Trường Mẫu giáo' },
      { kanji: '小学校', kana: 'しょうがっこう', romaji: 'Shougakkou', meaning: 'Trường Tiểu học (Cấp 1)' },
      { kanji: '中学校', kana: 'ちゅうがっこう', romaji: 'Chuugakkou', meaning: 'Trường THCS (Cấp 2)' },
      { kanji: '高校', kana: 'こうこう', romaji: 'Koukou', meaning: 'Trường THPT (Cấp 3)' },
      { kanji: '短期大学', kana: 'たんきだいがく', romaji: 'Tanki daigaku', meaning: 'Trường Cao đẳng' },
      { kanji: '大学', kana: 'だいがく', romaji: 'Daigaku', meaning: 'Trường Đại học' },
      { kanji: '大学院', kana: 'だいがくいん', romaji: 'Daigakuin', meaning: 'Cao học' },
      { kanji: '専門学校', kana: 'せんもんがっこう', romaji: 'Senmon gakkou', meaning: 'Trường nghề (Senmon)' },
      { kanji: '公立学校', kana: 'こうりつがっこう', romaji: 'Kouritsu gakkou', meaning: 'Trường công lập' },
      { kanji: '私立学校', kana: 'しりつがっこう', romaji: 'Shiritsu gakkou', meaning: 'Trường tư thục' },
      { kanji: '夜学校', kana: 'やがっこう', romaji: 'Yagakkou', meaning: 'Trường học buổi tối' },
      { kanji: '塾', kana: 'じゅく', romaji: 'Juku', meaning: 'Lớp học thêm' },
    ]
  },
  {
    title: "2. Con người trong nhà trường",
    items: [
      { kanji: '校長', kana: 'こうちょう', romaji: 'Kouchou', meaning: 'Hiệu trưởng' },
      { kanji: '教頭', kana: 'きょうとう', romaji: 'Kyoutou', meaning: 'Hiệu phó' },
      { kanji: '先生', kana: 'せんせい', romaji: 'Sensei', meaning: 'Giáo viên / Thầy cô' },
      { kanji: '学生', kana: 'がくせい', romaji: 'Gakusei', meaning: 'Học sinh' },
      { kanji: '大学生', kana: 'だいがくせい', romaji: 'Daigakusei', meaning: 'Sinh viên' },
      { kanji: '留学生', kana: 'りゅうがくせい', romaji: 'Ryuugakusei', meaning: 'Du học sinh' },
      { kanji: '同級生', kana: 'どうきゅうせい', romaji: 'Doukyuusei', meaning: 'Bạn cùng khoá/lớp' },
      { kanji: 'クラスメート', kana: 'クラスメート', romaji: 'Kurasumeito', meaning: 'Bạn cùng lớp (Classmate)' },
    ]
  },
  {
    title: "3. Hoạt động học tập & Thi cử",
    items: [
      { kanji: '入学', kana: 'にゅうがく', romaji: 'Nyuugaku', meaning: 'Nhập học' },
      { kanji: '卒業', kana: 'そつぎょう', romaji: 'Sotsugyou', meaning: 'Tốt nghiệp' },
      { kanji: '授業', kana: 'じゅぎょう', romaji: 'Jugyou', meaning: 'Giờ học / Buổi học' },
      { kanji: '休憩', kana: 'きゅうけい', romaji: 'Kyuukei', meaning: 'Giờ giải lao' },
      { kanji: '試験', kana: 'しけん', romaji: 'Shiken', meaning: 'Kỳ thi' },
      { kanji: '受験', kana: 'じゅけん', romaji: 'Juken', meaning: 'Dự thi' },
      { kanji: '宿題', kana: 'しゅくだい', romaji: 'Shukudai', meaning: 'Bài tập về nhà' },
      { kanji: '質問', kana: 'しつもん', romaji: 'Shitsumon', meaning: 'Câu hỏi / Chất vấn' },
      { kanji: '練習問題', kana: 'れんしゅうもんだい', romaji: 'Renshuu mondai', meaning: 'Bài tập luyện tập' },
      { kanji: '復習', kana: 'ふくしゅう', romaji: 'Fukushuu', meaning: 'Ôn tập' },
      { kanji: '義務教育', kana: 'ぎむきょういく', romaji: 'Gimu kyouiku', meaning: 'Giáo dục phổ cập (bắt buộc)' },
      { kanji: '制服', kana: 'せいふく', romaji: 'Seifuku', meaning: 'Đồng phục' },
      { kanji: '講演', kana: 'こうえん', romaji: 'Kouen', meaning: 'Bài giảng' },
      { kanji: '文型', kana: 'ぶんけい', romaji: 'Bunkei', meaning: 'Mẫu câu' },
      { kanji: '例文', kana: 'れいぶん', romaji: 'Reibun', meaning: 'Câu ví dụ' },
      { kanji: '会話', kana: 'かいわ', romaji: 'Kaiwa', meaning: 'Hội thoại' },
    ]
  },
  {
    title: "4. Cơ sở vật chất & Phòng ốc",
    items: [
      { kanji: '教室', kana: 'きょうしつ', romaji: 'Kyoushitsu', meaning: 'Phòng học' },
      { kanji: '図書館', kana: 'としょかん', romaji: 'Toshokan', meaning: 'Thư viện' },
      { kanji: '体育館', kana: 'たいいくかん', romaji: 'Taiikukan', meaning: 'Nhà thi đấu / Phòng thể chất' },
      { kanji: '事務室', kana: 'じむしつ', romaji: 'Jimushitsu', meaning: 'Văn phòng hành chính' },
      { kanji: '職員室', kana: 'しょくいんしつ', romaji: 'Shokuinshitsu', meaning: 'Phòng giáo viên' },
      { kanji: '実験室', kana: 'じっけんしつ', romaji: 'Jikkenshitsu', meaning: 'Phòng thí nghiệm' },
      { kanji: '寮', kana: 'りょう', romaji: 'Ryou', meaning: 'Ký túc xá' },
      { kanji: '寄宿舎', kana: 'きしゅくしゃ', romaji: 'Kishukusha', meaning: 'Ký túc xá (Trang trọng)' },
    ]
  }
];

export const JOB_LESSON_DATA = [
  {
    title: "1. Y tế, Giáo dục & Khoa học",
    items: [
      { kanji: '医者', kana: 'いしゃ', romaji: 'Isha', meaning: 'Bác sĩ' },
      { kanji: '歯科医', kana: 'しかい', romaji: 'Shikai', meaning: 'Nha sĩ' },
      { kanji: '看護師', kana: 'かんごし', romaji: 'Kangoshi', meaning: 'Y tá (Nam/Nữ)' },
      { kanji: '看護婦', kana: 'かんごふ', romaji: 'Kangofu', meaning: 'Nữ y tá (Cách gọi cũ)' },
      { kanji: '薬剤師', kana: 'やくざいし', romaji: 'Yakuzaishi', meaning: 'Dược sĩ' },
      { kanji: '教師', kana: 'きょうし', romaji: 'Kyoushi', meaning: 'Giáo viên (Nghề nghiệp)' },
      { kanji: '先生', kana: 'せんせい', romaji: 'Sensei', meaning: 'Thầy/Cô (Xưng hô)' },
      { kanji: '講師', kana: 'こうし', romaji: 'Koushi', meaning: 'Giảng viên' },
      { kanji: '教授', kana: 'きょうじゅ', romaji: 'Kyouju', meaning: 'Giáo sư' },
      { kanji: '科学者', kana: 'かがくしゃ', romaji: 'Kagakusha', meaning: 'Nhà khoa học' },
      { kanji: '研究員', kana: 'けんきゅういん', romaji: 'Kenkyuuin', meaning: 'Nhà nghiên cứu' },
    ]
  },
  {
    title: "2. Văn phòng & Kỹ thuật",
    items: [
      { kanji: '会社員', kana: 'かいしゃいん', romaji: 'Kaishain', meaning: 'Nhân viên công ty' },
      { kanji: 'サラリーマン', kana: 'サラリーマン', romaji: 'Sararīman', meaning: 'Nam nhân viên văn phòng' },
      { kanji: 'OL', kana: 'オーエル', romaji: 'Ōeru', meaning: 'Nữ nhân viên văn phòng' },
      { kanji: '銀行員', kana: 'ぎんこういん', romaji: 'Ginkouin', meaning: 'Nhân viên ngân hàng' },
      { kanji: '秘書', kana: 'ひしょ', romaji: 'Hisho', meaning: 'Thư ký' },
      { kanji: '会計士', kana: 'かいけいし', romaji: 'Kaikeishi', meaning: 'Kế toán' },
      { kanji: '弁護士', kana: 'べんごし', romaji: 'Bengoshi', meaning: 'Luật sư' },
      { kanji: 'エンジニア', kana: 'エンジニア', romaji: 'Enjinia', meaning: 'Kỹ sư (IT/Cơ khí...)' },
      { kanji: '技師', kana: 'ぎし', romaji: 'Gishi', meaning: 'Kỹ sư (Kỹ thuật viên)' },
      { kanji: '建築家', kana: 'けんちくか', romaji: 'Kenchikuka', meaning: 'Kiến trúc sư' },
      { kanji: '公務員', kana: 'こうむいん', romaji: 'Koumuin', meaning: 'Công chức nhà nước' },
      { kanji: '派遣社員', kana: 'はけんしゃいん', romaji: 'Hakenshain', meaning: 'Nhân viên phái cử' },
    ]
  },
  {
    title: "3. Nghệ thuật & Giải trí",
    items: [
      { kanji: '歌手', kana: 'かしゅ', romaji: 'Kashu', meaning: 'Ca sĩ' },
      { kanji: '俳優', kana: 'はいゆう', romaji: 'Haiyuu', meaning: 'Nam diễn viên' },
      { kanji: '女優', kana: 'じょゆう', romaji: 'Joyuu', meaning: 'Nữ diễn viên' },
      { kanji: '役者', kana: 'やくしゃ', romaji: 'Yakusha', meaning: 'Diễn viên (nói chung)' },
      { kanji: '監督', kana: 'かんとく', romaji: 'Kantoku', meaning: 'Đạo diễn / Huấn luyện viên' },
      { kanji: '画家', kana: 'がか', romaji: 'Gaka', meaning: 'Họa sĩ' },
      { kanji: '作家', kana: 'さっか', romaji: 'Sakka', meaning: 'Nhà văn' },
      { kanji: '写真家', kana: 'しゃしんか', romaji: 'Shashinka', meaning: 'Nhiếp ảnh gia' },
      { kanji: '芸術家', kana: 'げいじゅつか', romaji: 'Geijutsuka', meaning: 'Nghệ sĩ' },
      { kanji: '演奏家', kana: 'えんそうか', romaji: 'Ensouka', meaning: 'Nhạc công / Nhạc sĩ biểu diễn' },
      { kanji: 'ジャーナリスト', kana: 'ジャーナリスト', romaji: 'Jānarisuto', meaning: 'Nhà báo' },
      { kanji: '記者', kana: 'きしゃ', romaji: 'Kisha', meaning: 'Phóng viên' },
      { kanji: 'サッカー選手', kana: 'サッカーせんしゅ', romaji: 'Sakkā senshu', meaning: 'Cầu thủ bóng đá' },
      { kanji: '野球選手', kana: 'やきゅうせんしゅ', romaji: 'Yakyū senshu', meaning: 'Cầu thủ bóng chày' },
    ]
  },
  {
    title: "4. Dịch vụ & Đời sống",
    items: [
      { kanji: 'コック', kana: 'コック', romaji: 'Kokku', meaning: 'Đầu bếp (Món Âu)' },
      { kanji: 'シェフ', kana: 'シェフ', romaji: 'Shefu', meaning: 'Bếp trưởng (Chef)' },
      { kanji: '料理人', kana: 'りょうりにん', romaji: 'Ryourinin', meaning: 'Đầu bếp (nói chung)' },
      { kanji: '店員', kana: 'てんいん', romaji: 'Tenin', meaning: 'Nhân viên cửa hàng' },
      { kanji: '駅員', kana: 'えきいん', romaji: 'Ekiin', meaning: 'Nhân viên nhà ga' },
      { kanji: '運転手', kana: 'うんてんしゅ', romaji: 'Untenshu', meaning: 'Tài xế' },
      { kanji: '美容師', kana: 'びようし', romaji: 'Biyoushi', meaning: 'Thợ làm tóc / thẩm mỹ' },
      { kanji: '理髪師', kana: 'りはつし', romaji: 'Rihatsushi', meaning: 'Thợ cắt tóc nam' },
      { kanji: '床屋', kana: 'とこや', romaji: 'Tokoya', meaning: 'Tiệm cắt tóc / Thợ cắt tóc' },
      { kanji: 'パイロット', kana: 'パイロット', romaji: 'Pairotto', meaning: 'Phi công' },
      { kanji: '機長', kana: 'きちょう', romaji: 'Kichou', meaning: 'Cơ trưởng' },
      { kanji: 'スチュワーデス', kana: 'スチュワーデス', romaji: 'Suchuwādesu', meaning: 'Tiếp viên hàng không (Nữ)' },
      { kanji: '不動産業者', kana: 'ふどうさんぎょうしゃ', romaji: 'Fudousan gyousha', meaning: 'Môi giới bất động sản' },
      { kanji: '占い師', kana: 'うらないし', romaji: 'Uranaishi', meaning: 'Thầy bói' },
      { kanji: '探偵', kana: 'たんてい', romaji: 'Tantei', meaning: 'Thám tử' },
      { kanji: '牧師', kana: 'ぼくし', romaji: 'Bokushi', meaning: 'Mục sư' },
    ]
  },
  {
    title: "5. An ninh, Kỹ năng & Khác",
    items: [
      { kanji: '警察官', kana: 'けいさつかん', romaji: 'Keisatsukan', meaning: 'Cảnh sát viên' },
      { kanji: 'お巡りさん', kana: 'おまわりさん', romaji: 'Omawarisan', meaning: 'Chú cảnh sát (thân mật)' },
      { kanji: '警官', kana: 'けいかん', romaji: 'Keikan', meaning: 'Sĩ quan cảnh sát' },
      { kanji: '警備員', kana: 'けいびいん', romaji: 'Keibiin', meaning: 'Bảo vệ' },
      { kanji: '消防士', kana: 'しょうぼうし', romaji: 'Shouboushi', meaning: 'Lính cứu hỏa' },
      { kanji: '兵士', kana: 'へいし', romaji: 'Heishi', meaning: 'Binh lính' },
      { kanji: '大工', kana: 'だいく', romaji: 'Daiku', meaning: 'Thợ mộc' },
      { kanji: '農民', kana: 'のうみん', romaji: 'Noumin', meaning: 'Nông dân' },
      { kanji: '漁師', kana: 'りょうし', romaji: 'Ryoushi', meaning: 'Ngư dân' },
      { kanji: '猟師', kana: 'りょうし', romaji: 'Ryoushi', meaning: 'Thợ săn' },
      { kanji: '政治家', kana: 'せいじか', romaji: 'Seijika', meaning: 'Chính trị gia' },
      { kanji: '裁判官', kana: 'さいばんかん', romaji: 'Saibankan', meaning: 'Thẩm phán' },
      { kanji: 'フリーター', kana: 'フリーター', romaji: 'Furītā', meaning: 'Người làm bán thời gian tự do' },
      { kanji: '無職者', kana: 'むしょくしゃ', romaji: 'Mushokusha', meaning: 'Người thất nghiệp' },
    ]
  }
];

export const ANIMAL_LESSON_DATA = [
  {
    title: "1. Thú cưng & Gia súc",
    items: [
      { kanji: '犬', kana: 'いぬ', romaji: 'Inu', meaning: 'Con chó' },
      { kanji: '猫', kana: 'ねこ', romaji: 'Neko', meaning: 'Con mèo' },
      { kanji: '兎', kana: 'うさぎ', romaji: 'Usagi', meaning: 'Con thỏ' },
      { kanji: '鼠', kana: 'ねずみ', romaji: 'Nezumi', meaning: 'Con chuột' },
      { kanji: '牛', kana: 'うし', romaji: 'Ushi', meaning: 'Con bò' },
      { kanji: '水牛', kana: 'すいぎゅう', romaji: 'Suigyuu', meaning: 'Con trâu' },
      { kanji: '馬', kana: 'うま', romaji: 'Uma', meaning: 'Con ngựa' },
      { kanji: '豚', kana: 'ぶた', romaji: 'Buta', meaning: 'Con lợn (heo)' },
      { kanji: '羊', kana: 'ひつじ', romaji: 'Hitsuji', meaning: 'Con cừu' },
      { kanji: '鶏', kana: 'にわとり', romaji: 'Niwatori', meaning: 'Con gà' },
      { kanji: 'ひよこ', kana: 'ひよこ', romaji: 'Hiyoko', meaning: 'Gà con' },
    ]
  },
  {
    title: "2. Động vật hoang dã",
    items: [
      { kanji: 'ライオン', kana: 'ライオン', romaji: 'Raion', meaning: 'Sư tử' },
      { kanji: '虎', kana: 'とら', romaji: 'Tora', meaning: 'Con hổ' },
      { kanji: '狼', kana: 'おおかみ', romaji: 'Ookami', meaning: 'Chó sói' },
      { kanji: '熊', kana: 'くま', romaji: 'Kuma', meaning: 'Con gấu' },
      { kanji: 'パンダ', kana: 'パンダ', romaji: 'Panda', meaning: 'Gấu trúc' },
      { kanji: '象', kana: 'ぞう', romaji: 'Zou', meaning: 'Con voi' },
      { kanji: '猿', kana: 'さる', romaji: 'Saru', meaning: 'Con khỉ' },
      { kanji: '狐', kana: 'きつね', romaji: 'Kitsune', meaning: 'Con cáo (Hồ ly)' },
      { kanji: '栗鼠', kana: 'りす', romaji: 'Risu', meaning: 'Con sóc' },
      { kanji: 'キリン', kana: 'キリン', romaji: 'Kirin', meaning: 'Hươu cao cổ' },
      { kanji: 'アライグマ', kana: 'アライグマ', romaji: 'Araiguma', meaning: 'Gấu mèo' },
      { kanji: '蛇', kana: 'へび', romaji: 'Hebi', meaning: 'Con rắn' },
    ]
  },
  {
    title: "3. Dưới nước, Chim & Côn trùng",
    items: [
      { kanji: '魚', kana: 'さかな', romaji: 'Sakana', meaning: 'Con cá' },
      { kanji: '鯨', kana: 'くじら', romaji: 'Kujira', meaning: 'Cá voi' },
      { kanji: 'イルカ', kana: 'イルカ', romaji: 'Iruka', meaning: 'Cá heo' },
      { kanji: '蝦', kana: 'えび', romaji: 'Ebi', meaning: 'Con tôm' },
      { kanji: '亀', kana: 'かめ', romaji: 'Kame', meaning: 'Con rùa' },
      { kanji: 'ワニ', kana: 'ワニ', romaji: 'Wani', meaning: 'Cá sấu' },
      { kanji: '蛙', kana: 'かえる', romaji: 'Kaeru', meaning: 'Con ếch' },
      { kanji: 'ペンギン', kana: 'ペンギン', romaji: 'Pengin', meaning: 'Chim cánh cụt' },
      { kanji: '鳥', kana: 'とり', romaji: 'Tori', meaning: 'Con chim' },
      { kanji: '蝶々', kana: 'ちょうちょう', romaji: 'Chouchou', meaning: 'Con bướm' },
      { kanji: '蜂', kana: 'はち', romaji: 'Hachi', meaning: 'Con ong' },
      { kanji: '蜜蜂', kana: 'みつばち', romaji: 'Mitsubachi', meaning: 'Ong mật' },
    ]
  }
];
export const FAMILY_LESSON_DATA = [
  {
    title: "1. Gia đình mình (Cốt lõi)",
    items: [
      { kanji: '家族', kana: 'かぞく', romaji: 'Kazoku', meaning: 'Gia đình' },
      { kanji: '両親', kana: 'りょうしん', romaji: 'Ryoushin', meaning: 'Bố mẹ' },
      { kanji: '父', kana: 'ちち', romaji: 'Chichi', meaning: 'Bố (của tôi)' },
      { kanji: '母', kana: 'はは', romaji: 'Haha', meaning: 'Mẹ (của tôi)' },
      { kanji: '兄弟', kana: 'きょうだい', romaji: 'Kyoudai', meaning: 'Anh em' },
      { kanji: '兄', kana: 'あに', romaji: 'Ani', meaning: 'Anh trai (của tôi)' },
      { kanji: '姉', kana: 'あね', romaji: 'Ane', meaning: 'Chị gái (của tôi)' },
      { kanji: '弟', kana: 'おとうと', romaji: 'Otouto', meaning: 'Em trai (của tôi)' },
      { kanji: '妹', kana: 'いもうと', romaji: 'Imouto', meaning: 'Em gái (của tôi)' },
      { kanji: '姉妹', kana: 'しまい', romaji: 'Shimai', meaning: 'Chị em gái' },
      { kanji: '夫婦', kana: 'ふうふ', romaji: 'Fuufu', meaning: 'Vợ chồng' },
      { kanji: '夫', kana: 'おっと', romaji: 'Otto', meaning: 'Chồng (của tôi)' },
      { kanji: '主人', kana: 'しゅじん', romaji: 'Shujin', meaning: 'Chồng (của tôi - Trịnh trọng hơn)' },
      { kanji: '妻', kana: 'つま', romaji: 'Tsuma', meaning: 'Vợ (của tôi)' },
      { kanji: '家内', kana: 'かない', romaji: 'Kanai', meaning: 'Vợ (của tôi - Trịnh trọng hơn)' },
      { kanji: '子供', kana: 'こども', romaji: 'Kodomo', meaning: 'Con cái' },
      { kanji: '息子', kana: 'むすこ', romaji: 'Musuko', meaning: 'Con trai (của tôi)' },
      { kanji: '娘', kana: 'むすめ', romaji: 'Musume', meaning: 'Con gái (của tôi)' },
    ]
  },
  {
    title: "2. Gia đình mình (Họ hàng)",
    items: [
      { kanji: '祖父', kana: 'そふ', romaji: 'Sofu', meaning: 'Ông (của tôi)' },
      { kanji: '祖母', kana: 'そぼ', romaji: 'Sobo', meaning: 'Bà (của tôi)' },
      { kanji: '孫', kana: 'まご', romaji: 'Mago', meaning: 'Cháu (của ông bà)' },
      { kanji: '伯父', kana: 'おじ', romaji: 'Oji', meaning: 'Bác trai (Anh của bố/mẹ)' },
      { kanji: '叔父', kana: 'おじ', romaji: 'Oji', meaning: 'Chú/Cậu (Em của bố/mẹ)' },
      { kanji: '伯母', kana: 'おば', romaji: 'Oba', meaning: 'Bác gái (Chị của bố/mẹ)' },
      { kanji: '叔母', kana: 'おば', romaji: 'Oba', meaning: 'Cô/Dì (Em của bố/mẹ)' },
      { kanji: '従兄弟', kana: 'いとこ', romaji: 'Itoko', meaning: 'Anh em họ (Nam)' },
      { kanji: '従姉妹', kana: 'いとこ', romaji: 'Itoko', meaning: 'Anh em họ (Nữ)' },
      { kanji: '甥', kana: 'おい', romaji: 'Oi', meaning: 'Cháu trai (của cô/dì/chú/bác)' },
      { kanji: '姪', kana: 'めい', romaji: 'Mei', meaning: 'Cháu gái (của cô/dì/chú/bác)' },
      { kanji: '義理の兄', kana: 'ぎりのあに', romaji: 'Giri no ani', meaning: 'Anh rể' },
      { kanji: '義理の弟', kana: 'ぎりのおとうと', romaji: 'Giri no otouto', meaning: 'Em rể' },
      { kanji: '義理の息子', kana: 'ぎりのむすこ', romaji: 'Giri no musuko', meaning: 'Con rể' },
    ]
  },
  {
    title: "3. Gọi gia đình người khác (Kính ngữ)",
    items: [
      { kanji: 'ご家族', kana: 'ごかぞく', romaji: 'Gokazoku', meaning: 'Gia đình (bạn)' },
      { kanji: 'ご両親', kana: 'ごりょうしん', romaji: 'Goryoushin', meaning: 'Bố mẹ (bạn)' },
      { kanji: 'お父さん', kana: 'おとうさん', romaji: 'Otousan', meaning: 'Bố (bạn/người khác)' },
      { kanji: 'お母さん', kana: 'おかあさん', romaji: 'Okaasan', meaning: 'Mẹ (bạn/người khác)' },
      { kanji: 'お爺さん', kana: 'おじいさん', romaji: 'Ojiisan', meaning: 'Ông (bạn/người khác)' },
      { kanji: 'お婆さん', kana: 'おばあさん', romaji: 'Obaasan', meaning: 'Bà (bạn/người khác)' },
      { kanji: 'ご夫婦', kana: 'ごふうふ', romaji: 'Gofuufu', meaning: 'Vợ chồng (bạn)' },
      { kanji: 'ご主人', kana: 'ごしゅじん', romaji: 'Goshujin', meaning: 'Chồng (bạn/người khác)' },
      { kanji: '奥さん', kana: 'おくさん', romaji: 'Okusan', meaning: 'Vợ (bạn/người khác)' },
      { kanji: 'お子さん', kana: 'おこさん', romaji: 'Okosan', meaning: 'Con (bạn)' },
      { kanji: '息子さん', kana: 'むすこさん', romaji: 'Musukosan', meaning: 'Con trai (bạn)' },
      { kanji: 'お嬢さん', kana: 'おじょうさん', romaji: 'Ojousan', meaning: 'Con gái (bạn - tiểu thư)' },
      { kanji: 'お孫さん', kana: 'おまごさん', romaji: 'Omagosan', meaning: 'Cháu (bạn)' },
    ]
  },
  {
    title: "4. Gọi anh chị em người khác (Kính ngữ)",
    items: [
      { kanji: 'ご兄弟', kana: 'ごきょうだい', romaji: 'Gokyoudai', meaning: 'Anh em (bạn)' },
      { kanji: 'お兄さん', kana: 'おにいさん', romaji: 'Oniisan', meaning: 'Anh trai (bạn)' },
      { kanji: 'お姉さん', kana: 'おねえさん', romaji: 'Oneesan', meaning: 'Chị gái (bạn)' },
      { kanji: '弟さん', kana: 'おとうとさん', romaji: 'Otoutosan', meaning: 'Em trai (bạn)' },
      { kanji: '妹さん', kana: 'いもうとさん', romaji: 'Imoutosan', meaning: 'Em gái (bạn)' },
      { kanji: '伯父さん', kana: 'おじさん', romaji: 'Ojisan', meaning: 'Bác trai (bạn)' },
      { kanji: '叔父さん', kana: 'おじさん', romaji: 'Ojisan', meaning: 'Chú (bạn)' },
      { kanji: '伯母さん', kana: 'おばさん', romaji: 'Obasan', meaning: 'Bác gái (bạn)' },
      { kanji: '叔母さん', kana: 'おばさん', romaji: 'Obasan', meaning: 'Cô/Dì (bạn)' },
    ]
  }
];

export const FRUIT_LESSON_DATA = [
  {
    title: "1. Trái cây quen thuộc (Hàng ngày)",
    items: [
      { kanji: '果物', kana: 'くだもの', romaji: 'Kudamono', meaning: 'Trái cây (Hoa quả)' },
      { kanji: '林檎', kana: 'りんご', romaji: 'Ringo', meaning: 'Quả táo' },
      { kanji: 'バナナ', kana: 'バナナ', romaji: 'Banana', meaning: 'Quả chuối' },
      { kanji: '蜜柑', kana: 'みかん', romaji: 'Mikan', meaning: 'Quả quýt' },
      { kanji: '葡萄', kana: 'ぶどう', romaji: 'Budou', meaning: 'Quả nho' },
      { kanji: '梨', kana: 'なし', romaji: 'Nashi', meaning: 'Quả lê' },
      { kanji: '桃', kana: 'もも', romaji: 'Momo', meaning: 'Quả đào' },
      { kanji: '柿', kana: 'かき', romaji: 'Kaki', meaning: 'Quả hồng' },
      { kanji: '苺', kana: 'いちご', romaji: 'Ichigo', meaning: 'Dâu tây' },
      { kanji: 'さくらんぼ', kana: 'さくらんぼ', romaji: 'Sakuranbo', meaning: 'Quả Cherry (Anh đào)' },
    ]
  },
  {
    title: "2. Trái cây Nhiệt đới & Phương Tây",
    items: [
      { kanji: 'マンゴー', kana: 'マンゴー', romaji: 'Mangō', meaning: 'Quả xoài' },
      { kanji: 'パイナップル', kana: 'パイナップル', romaji: 'Painappuru', meaning: 'Quả dứa (Thơm)' },
      { kanji: 'ドリアン', kana: 'ドリアン', romaji: 'Dorian', meaning: 'Sầu riêng' },
      { kanji: 'パパイア', kana: 'パパイア', romaji: 'Papaia', meaning: 'Đu đủ' },
      { kanji: 'アボカド', kana: 'アボカド', romaji: 'Abokado', meaning: 'Quả bơ' },
      { kanji: 'ココナッツ', kana: 'ココナッツ', romaji: 'Kokonattsu', meaning: 'Quả dừa' },
      { kanji: 'ライチー', kana: 'ライチー', romaji: 'Raichī', meaning: 'Quả vải' },
      { kanji: 'ロンガン', kana: 'ロンガン', romaji: 'Rongan', meaning: 'Quả nhãn' },
      { kanji: 'マンゴスチン', kana: 'マンゴスチン', romaji: 'Mangosuchin', meaning: 'Quả măng cụt' },
      { kanji: 'ドラゴンフルーツ', kana: 'ドラゴンフルーツ', romaji: 'Doragonfurūtsu', meaning: 'Thanh long' },
      { kanji: 'ジャックフルーツ', kana: 'ジャックフルーツ', romaji: 'Jakkufurūtsu', meaning: 'Quả mít' },
      { kanji: 'スターフルーツ', kana: 'スターフルーツ', romaji: 'Sutāfurūtsu', meaning: 'Quả khế' },
      { kanji: 'タマリンド', kana: 'タマリンド', romaji: 'Tamarindo', meaning: 'Quả me' },
    ]
  },
  {
    title: "3. Các loại Dưa, Cam & Chanh",
    items: [
      { kanji: '西瓜', kana: 'スイカ', romaji: 'Suika', meaning: 'Dưa hấu' },
      { kanji: 'メロン', kana: 'メロン', romaji: 'Meron', meaning: 'Dưa lưới / Dưa gang' },
      { kanji: '胡瓜', kana: 'きゅうり', romaji: 'Kyuuri', meaning: 'Dưa chuột (Leo)' },
      { kanji: 'オレンジ', kana: 'オレンジ', romaji: 'Orenji', meaning: 'Quả cam' },
      { kanji: 'レモン', kana: 'レモン', romaji: 'Remon', meaning: 'Quả chanh tây (Vàng)' },
      { kanji: 'ライム', kana: 'ライム', romaji: 'Raimu', meaning: 'Quả chanh xanh' },
      { kanji: 'グレープフルーツ', kana: 'グレープフルーツ', romaji: 'Gurēpufurūtsu', meaning: 'Bưởi chùm' },
      { kanji: 'ザボン', kana: 'ザボン', romaji: 'Zabon', meaning: 'Quả bưởi (Vỏ dày)' },
      { kanji: 'シトロン', kana: 'シトロン', romaji: 'Shitoron', meaning: 'Quả thanh yên' },
    ]
  },
  {
    title: "4. Các loại quả khác",
    items: [
      { kanji: '梅', kana: 'うめ', romaji: 'Ume', meaning: 'Quả mơ (làm ô mai)' },
      { kanji: '杏子', kana: 'あんず', romaji: 'Anzu', meaning: 'Quả mơ tây (Apricot)' },
      { kanji: 'プラム', kana: 'プラム', romaji: 'Puramu', meaning: 'Quả mận (Plum)' },
      { kanji: '無花果', kana: 'いちじく', romaji: 'Ichijiku', meaning: 'Quả sung' },
      { kanji: 'ざくろ', kana: 'ざくろ', romaji: 'Zakuro', meaning: 'Quả lựu' },
      { kanji: 'オリーブ', kana: 'オリーブ', romaji: 'Orību', meaning: 'Quả Oliu' },
      { kanji: 'グアバ', kana: 'グアバ', romaji: 'Guaba', meaning: 'Quả ổi' },
      { kanji: 'キウイ', kana: 'キウイ', romaji: 'Kiui', meaning: 'Quả Kiwi' },
      { kanji: 'パッションフルーツ', kana: 'パッションフルーツ', romaji: 'Passhonfurūtsu', meaning: 'Chanh dây' },
      { kanji: 'ミルクフルーツ', kana: 'ミルクフルーツ', romaji: 'Mirukufurūtsu', meaning: 'Vú sữa' },
      { kanji: 'シュガーアップル', kana: 'シュガーアップル', romaji: 'Shugāappuru', meaning: 'Mãng cầu ta (Na)' },
      { kanji: 'カスタードアップル', kana: 'カスタードアップル', romaji: 'Kasutādoappuru', meaning: 'Mãng cầu xiêm' },
      { kanji: '干しぶどう', kana: 'ほしぶどう', romaji: 'Hoshibudou', meaning: 'Nho khô' },
      { kanji: '砂糖黍', kana: 'さとうきび', romaji: 'Satoukibi', meaning: 'Cây mía' },
    ]
  }
];

export const VEGETABLE_LESSON_DATA = [
  {
    title: "1. Các loại Củ (Root Vegetables)",
    items: [
      { kanji: '野菜', kana: 'やさい', romaji: 'Yasai', meaning: 'Rau củ (Nói chung)' },
      { kanji: '大根', kana: 'だいこん', romaji: 'Daikon', meaning: 'Củ cải trắng' },
      { kanji: '人参', kana: 'にんじん', romaji: 'Ninjin', meaning: 'Củ cà rốt' },
      { kanji: '玉ねぎ', kana: 'たまねぎ', romaji: 'Tamanegi', meaning: 'Hành tây' },
      { kanji: 'ジャガイモ', kana: 'ジャガイモ', romaji: 'Jagaimo', meaning: 'Khoai tây' },
      { kanji: 'サツマイモ', kana: 'サツマイモ', romaji: 'Satsumaimo', meaning: 'Khoai lang' },
      { kanji: '里芋', kana: 'さといも', romaji: 'Satoimo', meaning: 'Khoai sọ (Taro)' },
      { kanji: '蓮根', kana: 'れんこん', romaji: 'Renkon', meaning: 'Củ sen / Ngó sen' },
      { kanji: '大蒜', kana: 'にんにく', romaji: 'Ninniku', meaning: 'Tỏi' },
      { kanji: '生姜', kana: 'しょうが', romaji: 'Shouga', meaning: 'Gừng' },
      { kanji: '筍', kana: 'たけのこ', romaji: 'Takenoko', meaning: 'Măng (Tre/Trúc)' },
    ]
  },
  {
    title: "2. Rau ăn lá (Leafy Greens)",
    items: [
      { kanji: 'キャベツ', kana: 'キャベツ', romaji: 'Kyabetsu', meaning: 'Bắp cải' },
      { kanji: 'レタス', kana: 'レタス', romaji: 'Retasu', meaning: 'Xà lách (Rau diếp)' },
      { kanji: '白菜', kana: 'はくさい', romaji: 'Hakusai', meaning: 'Cải thảo' },
      { kanji: 'ほうれん草', kana: 'ほうれんそう', romaji: 'Hourensou', meaning: 'Rau chân vịt (Bina)' },
      { kanji: '空心菜', kana: 'くうしんさい', romaji: 'Kuushinsai', meaning: 'Rau muống' },
      { kanji: '長ネギ', kana: 'ながねぎ', romaji: 'Naganegi', meaning: 'Hành Baro (Tỏi tây)' },
      { kanji: '青梗菜', kana: 'ちんげんさい', romaji: 'Chingensai', meaning: 'Cải chíp' },
      { kanji: '水菜', kana: 'みずな', romaji: 'Mizuna', meaning: 'Rau cần Nhật' },
      { kanji: 'パクチー', kana: 'パクチー', romaji: 'Pakuchī', meaning: 'Rau mùi (Ngò)' },
      { kanji: 'つるむらさき', kana: 'つるむらさき', romaji: 'Tsurumurasaki', meaning: 'Rau mồng tơi' },
    ]
  },
  {
    title: "3. Rau ăn quả (Fruit Vegetables)",
    items: [
      { kanji: 'トマト', kana: 'トマト', romaji: 'Tomato', meaning: 'Cà chua' },
      { kanji: '茄子', kana: 'なす', romaji: 'Nasu', meaning: 'Cà tím' },
      { kanji: '胡瓜', kana: 'きゅうり', romaji: 'Kyuuri', meaning: 'Dưa chuột' },
      { kanji: 'ピーマン', kana: 'ピーマン', romaji: 'Pīman', meaning: 'Ớt chuông xanh' },
      { kanji: 'パプリカ', kana: 'パプリカ', romaji: 'Papurika', meaning: 'Ớt chuông đỏ/vàng' },
      { kanji: '南瓜', kana: 'かぼちゃ', romaji: 'Kabocha', meaning: 'Bí đỏ' },
      { kanji: '冬瓜', kana: 'とうがん', romaji: 'Tougan', meaning: 'Bí đao' },
      { kanji: 'トウモロコシ', kana: 'トウモロコシ', romaji: 'Toumorokoshi', meaning: 'Ngô (Bắp)' },
      { kanji: 'オクラ', kana: 'オクラ', romaji: 'Okura', meaning: 'Đậu bắp' },
      { kanji: 'ゴーヤ', kana: 'ゴーヤ', romaji: 'Gōya', meaning: 'Mướp đắng (Khổ qua)' },
      { kanji: 'へちま', kana: 'へちま', romaji: 'Hechima', meaning: 'Mướp hương' },
      { kanji: 'ブロッコリー', kana: 'ブロッコリー', romaji: 'Burokkorī', meaning: 'Súp lơ xanh' },
    ]
  },
  {
    title: "4. Nấm & Đậu (Mushrooms & Beans)",
    items: [
      { kanji: 'キノコ', kana: 'キノコ', romaji: 'Kinoko', meaning: 'Nấm (Nói chung)' },
      { kanji: '椎茸', kana: 'しいたけ', romaji: 'Shiitake', meaning: 'Nấm hương (Đông cô)' },
      { kanji: '榎茸', kana: 'えのき', romaji: 'Enoki', meaning: 'Nấm kim châm' },
      { kanji: 'エリンギ', kana: 'エリンギ', romaji: 'Eringi', meaning: 'Nấm đùi gà' },
      { kanji: '木耳', kana: 'きくらげ', romaji: 'Kikurage', meaning: 'Mộc nhĩ (Nấm mèo)' },
      { kanji: '松茸', kana: 'まつたけ', romaji: 'Matsutake', meaning: 'Nấm Tùng nhung' },
      { kanji: '豆', kana: 'まめ', romaji: 'Mame', meaning: 'Đậu (Hạt)' },
      { kanji: 'もやし', kana: 'もやし', romaji: 'Moyashi', meaning: 'Giá đỗ' },
      { kanji: 'インゲン', kana: 'インゲン', romaji: 'Ingen', meaning: 'Đậu cove (Đậu que)' },
      { kanji: 'グリーンピース', kana: 'グリーンピース', romaji: 'Gurīnpīsu', meaning: 'Đậu Hà Lan' },
      { kanji: 'ピーナッツ', kana: 'ピーナッツ', romaji: 'Pīnattsu', meaning: 'Đậu phộng (Lạc)' },
    ]
  }
];

export const MUSIC_LESSON_DATA = [
  {
    title: "1. Thuật ngữ Âm nhạc cơ bản",
    items: [
      { kanji: '音楽', kana: 'おんがく', romaji: 'Ongaku', meaning: 'Âm nhạc' },
      { kanji: '旋律', kana: 'せんりつ', romaji: 'Senritsu', meaning: 'Giai điệu' },
      { kanji: 'リズム', kana: 'リズム', romaji: 'Rizumu', meaning: 'Nhịp điệu' },
      { kanji: '歌詞', kana: 'かし', romaji: 'Kashi', meaning: 'Lời bài hát' },
      { kanji: '音符', kana: 'おんぷ', romaji: 'Onpu', meaning: 'Nốt nhạc' },
      { kanji: '音階', kana: 'おんかい', romaji: 'Onkai', meaning: 'Thang âm' },
      { kanji: 'ハーモニー', kana: 'ハーモニー', romaji: 'Hāmonī', meaning: 'Hòa âm' },
      { kanji: 'コンサート', kana: 'コンサート', romaji: 'Konsāto', meaning: 'Buổi hòa nhạc' },
      { kanji: 'ステージ', kana: 'ステージ', romaji: 'Sutēji', meaning: 'Sân khấu' },
      { kanji: 'ライブ', kana: 'ライブ', romaji: 'Raibu', meaning: 'Biểu diễn trực tiếp (Live)' },
      { kanji: 'ソロ', kana: 'ソロ', romaji: 'Soro', meaning: 'Đơn ca / Solo' },
      { kanji: 'デュエット', kana: 'デュエット', romaji: 'Dyuetto', meaning: 'Song ca' },
      { kanji: 'コーラス', kana: 'コーラス', romaji: 'Kōrasu', meaning: 'Điệp khúc / Hợp xướng' },
    ]
  },
  {
    title: "2. Nhạc cụ (Gakki)",
    items: [
      { kanji: '楽器', kana: 'がっき', romaji: 'Gakki', meaning: 'Nhạc cụ' },
      { kanji: 'ピアノ', kana: 'ピアノ', romaji: 'Piano', meaning: 'Đàn Piano' },
      { kanji: 'ギター', kana: 'ギター', romaji: 'Gitā', meaning: 'Đàn Guitar' },
      { kanji: 'バイオリン', kana: 'バイオリン', romaji: 'Baiorin', meaning: 'Đàn Violin (Vĩ cầm)' },
      { kanji: 'ドラム', kana: 'ドラム', romaji: 'Doramu', meaning: 'Trống' },
      { kanji: 'フルート', kana: 'フルート', romaji: 'Furūto', meaning: 'Sáo tây' },
      { kanji: 'サクソフォン', kana: 'サクソフォン', romaji: 'Sakusofon', meaning: 'Kèn Saxophone' },
      { kanji: 'トランペット', kana: 'トランペット', romaji: 'Toranpetto', meaning: 'Kèn Trumpet' },
      { kanji: 'ウクレレ', kana: 'ウクレレ', romaji: 'Ukurere', meaning: 'Đàn Ukulele' },
      { kanji: '三味線', kana: 'しゃみせん', romaji: 'Shamisen', meaning: 'Đàn Shamisen (3 dây Nhật)' },
      { kanji: '太鼓', kana: 'たいこ', romaji: 'Taiko', meaning: 'Trống Nhật' },
      { kanji: 'ハープ', kana: 'ハープ', romaji: 'Hāpu', meaning: 'Đàn hạc' },
      { kanji: 'アコーディオン', kana: 'アコーディオン', romaji: 'Akōdion', meaning: 'Đàn phong cầm (Xếp)' },
    ]
  },
  {
    title: "3. Thiết bị & Phòng thu",
    items: [
      { kanji: 'マイク', kana: 'マイク', romaji: 'Maiku', meaning: 'Micro' },
      { kanji: 'スピーカー', kana: 'スピーカー', romaji: 'Supīkā', meaning: 'Loa' },
      { kanji: 'ヘッドホン', kana: 'ヘッドホン', romaji: 'Heddohon', meaning: 'Tai nghe (Headphone)' },
      { kanji: '録音', kana: 'ろくおん', romaji: 'Rokuon', meaning: 'Thu âm' },
      { kanji: 'レコーディング', kana: 'レコーディング', romaji: 'Rekōdingu', meaning: 'Việc thu âm' },
      { kanji: 'スタジオ', kana: 'スタジオ', romaji: 'Sutajio', meaning: 'Phòng thu (Studio)' },
      { kanji: '譜面台', kana: 'ふめんだい', romaji: 'Fumendai', meaning: 'Giá để bản nhạc' },
      { kanji: 'アンプ', kana: 'アンプ', romaji: 'Anpu', meaning: 'Bộ khuếch đại (Amply)' },
    ]
  },
  {
    title: "4. Thể loại & Nghệ sĩ",
    items: [
      { kanji: '歌手', kana: 'かしゅ', romaji: 'Kashu', meaning: 'Ca sĩ' },
      { kanji: '作曲家', kana: 'さっきょくか', romaji: 'Sakkyokuka', meaning: 'Nhạc sĩ sáng tác' },
      { kanji: '指揮者', kana: 'しきしゃ', romaji: 'Shikisha', meaning: 'Nhạc trưởng' },
      { kanji: 'バンド', kana: 'バンド', romaji: 'Bando', meaning: 'Ban nhạc' },
      { kanji: 'オーケストラ', kana: 'オーケストラ', romaji: 'Ōkesutora', meaning: 'Dàn nhạc giao hưởng' },
      { kanji: 'ポップ', kana: 'ポップ', romaji: 'Poppu', meaning: 'Nhạc Pop' },
      { kanji: 'ロック', kana: 'ロック', romaji: 'Rokku', meaning: 'Nhạc Rock' },
      { kanji: 'ジャズ', kana: 'ジャズ', romaji: 'Jazu', meaning: 'Nhạc Jazz' },
      { kanji: 'クラシック', kana: 'クラシック', romaji: 'Kurashikku', meaning: 'Nhạc cổ điển' },
      { kanji: 'ヒップホップ', kana: 'ヒップホップ', romaji: 'Hippuhoppu', meaning: 'Nhạc Hip hop' },
      { kanji: '民族音楽', kana: 'みんぞくおんがく', romaji: 'Minzoku ongaku', meaning: 'Nhạc dân gian' },
    ]
  }
];

export const ELECTRONIC_LESSON_DATA = [
  {
    title: "1. Linh kiện điện tử (Components)",
    items: [
      { kanji: '抵抗', kana: 'ていこう', romaji: 'Teikou', meaning: 'Điện trở' },
      { kanji: 'コンデンサ', kana: 'コンデンサ', romaji: 'Kondensa', meaning: 'Tụ điện' },
      { kanji: 'カップリングコンデンサ', kana: 'カップリングコンデンサ', romaji: 'Kappuringu kondensa', meaning: 'Tụ ghép' },
      { kanji: 'コイル', kana: 'コイル', romaji: 'Koiru', meaning: 'Cuộn dây' },
      { kanji: 'インダクタンス', kana: 'インダクタンス', romaji: 'Indakutansu', meaning: 'Độ tự cảm' },
      { kanji: '半導体', kana: 'はんどうたい', romaji: 'Handōtai', meaning: 'Chất bán dẫn' },
      { kanji: 'ヒューズ', kana: 'ヒューズ', romaji: 'Hyūzu', meaning: 'Cầu chì' },
      { kanji: 'スイッチ', kana: 'スイッチ', romaji: 'Suicchi', meaning: 'Công tắc' },
      { kanji: '基板', kana: 'きばん', romaji: 'Kiban', meaning: 'Bo mạch (Circuit Board)' },
      { kanji: 'プリント配線板', kana: 'プリントはいせんばん', romaji: 'Purinto haisenban', meaning: 'Bảng mạch in (PCB)' },
      { kanji: '液晶', kana: 'えきしょう', romaji: 'Ekishō', meaning: 'Tinh thể lỏng (LCD)' },
      { kanji: 'ブラウン管', kana: 'ブラウンかん', romaji: 'Buraun kan', meaning: 'Ống tia âm cực (CRT)' },
      { kanji: 'システムオンチップ', kana: 'システムオンチップ', romaji: 'Shisutemu on chippu', meaning: 'Hệ thống trên chip (SoC)' },
      { kanji: 'USBメモリ', kana: 'ユーエスビーメモリ', romaji: 'Yūesubī memori', meaning: 'Bộ nhớ USB' },
    ]
  },
  {
    title: "2. Dụng cụ & Thiết bị đo (Tools)",
    items: [
      { kanji: '圧着工具', kana: 'あっちゃくこうぐ', romaji: 'Acchaku kōgu', meaning: 'Kìm bấm cốt' },
      { kanji: 'ニッパ', kana: 'ニッパ', romaji: 'Nippa', meaning: 'Kìm cắt' },
      { kanji: 'ラジオペンチ', kana: 'ラジオペンチ', romaji: 'Rajio penchi', meaning: 'Kìm mũi nhọn' },
      { kanji: 'モンキレンチ', kana: 'モンキレンチ', romaji: 'Monkī renchi', meaning: 'Mỏ lết' },
      { kanji: 'ドライバー', kana: 'ドライバー', romaji: 'Doraibā', meaning: 'Tua vít' },
      { kanji: 'ノギス', kana: 'ノギス', romaji: 'Nogisu', meaning: 'Thước cặp' },
      { kanji: 'マイクロメータ', kana: 'マイクロメータ', romaji: 'Maikuromētā', meaning: 'Thước Panme' },
      { kanji: 'テスター', kana: 'テスター', romaji: 'Tesutā', meaning: 'Đồng hồ đo điện' },
      { kanji: '回路計', kana: 'かいろけい', romaji: 'Kairokei', meaning: 'Đồng hồ vạn năng' },
      { kanji: 'ボール盤', kana: 'ボールばん', romaji: 'Bōru ban', meaning: 'Máy khoan bàn' },
      { kanji: '充電器', kana: 'じゅうでんき', romaji: 'Jūdenki', meaning: 'Bộ sạc' },
      { kanji: 'ACアダプター', kana: 'エーシーアダプター', romaji: 'Ēshī adabutā', meaning: 'Adapter AC' },
    ]
  },
  {
    title: "3. Khái niệm Điện học (Concepts)",
    items: [
      { kanji: '電圧', kana: 'でんあつ', romaji: 'Den’atsu', meaning: 'Điện áp' },
      { kanji: '電流', kana: 'でんりゅう', romaji: 'Denryū', meaning: 'Dòng điện' },
      { kanji: '電力', kana: 'でんりょく', romaji: 'Denryoku', meaning: 'Công suất điện' },
      { kanji: '直流', kana: 'ちょくりゅう', romaji: 'Chokuryū', meaning: 'Dòng điện một chiều (DC)' },
      { kanji: '交流', kana: 'こうりゅう', romaji: 'Kōryū', meaning: 'Dòng điện xoay chiều (AC)' },
      { kanji: 'オームの法則', kana: 'オームのほうそく', romaji: 'Ōmu no hōsoku', meaning: 'Định luật Ohm' },
      { kanji: '静電気', kana: 'せいでんき', romaji: 'Seidenki', meaning: 'Tĩnh điện' },
      { kanji: '感電', kana: 'かんでん', romaji: 'Kanden', meaning: 'Điện giật' },
      { kanji: '放電', kana: 'ほうでん', romaji: 'Hōden', meaning: 'Phóng điện' },
      { kanji: '充電', kana: 'じゅうでん', romaji: 'Jūden', meaning: 'Sạc điện' },
      { kanji: '信号', kana: 'しんごう', romaji: 'Shingō', meaning: 'Tín hiệu' },
      { kanji: '回路図', kana: 'かいろず', romaji: 'Kairozu', meaning: 'Sơ đồ mạch' },
      { kanji: 'アノード', kana: 'アノード', romaji: 'Anōdo', meaning: 'Cực dương (Anode)' },
      { kanji: 'アース', kana: 'アース', romaji: 'Āsu', meaning: 'Nối đất (Tiếp địa)' },
    ]
  },
  {
    title: "4. Vật liệu & Kết nối (Materials)",
    items: [
      { kanji: 'はんだ', kana: 'はんだ', romaji: 'Handa', meaning: 'Thiếc hàn' },
      { kanji: 'はんだ付け', kana: 'はんだづけ', romaji: 'Handa tsuke', meaning: 'Hàn thiếc' },
      { kanji: '圧着端子', kana: 'あっちゃくたんし', romaji: 'Acchaku tanshi', meaning: 'Đầu cốt (Cos)' },
      { kanji: '圧着スリーブ', kana: 'あっちゃくスリーブ', romaji: 'Acchaku surību', meaning: 'Ống bấm (Sleeve)' },
      { kanji: 'リード線', kana: 'リードせん', romaji: 'Rīdo sen', meaning: 'Dây dẫn' },
      { kanji: 'エナメル線', kana: 'エナメルせん', romaji: 'Enameru sen', meaning: 'Dây đồng tráng men' },
      { kanji: 'コンセント', kana: 'コンセント', romaji: 'Konsento', meaning: 'Ổ cắm điện' },
      { kanji: 'バッテリー', kana: 'バッテリー', romaji: 'Batterī', meaning: 'Pin / Ắc quy' },
      { kanji: '一次電池', kana: 'いちじでんち', romaji: 'Ichiji denchi', meaning: 'Pin sơ cấp (Dùng 1 lần)' },
      { kanji: '二次電池', kana: 'にじでんち', romaji: 'Niji denchi', meaning: 'Pin thứ cấp (Pin sạc)' },
      { kanji: 'ボルト', kana: 'ボルト', romaji: 'Boruto', meaning: 'Bu lông' },
      { kanji: 'ビス', kana: 'ビス', romaji: 'Bisu', meaning: 'Vít' },
      { kanji: 'ねじ呼び径', kana: 'ねじよびけい', romaji: 'Neji yobikei', meaning: 'Đường kính danh nghĩa của vít' },
    ]
  }
];

export const HOUSEHOLD_LESSON_DATA = [
  {
    title: "1. Phòng Khách (Living Room)",
    items: [
      { kanji: '椅子', kana: 'いす', romaji: 'Isu', meaning: 'Ghế' },
      { kanji: 'ソファー', kana: 'ソファー', romaji: 'Sofā', meaning: 'Ghế Sofa' },
      { kanji: '棚', kana: 'たな', romaji: 'Tana', meaning: 'Cái kệ / Giá' },
      { kanji: '本棚', kana: 'ほんだな', romaji: 'Hondana', meaning: 'Kệ sách' },
      { kanji: 'テーブル', kana: 'テーブル', romaji: 'Tēburu', meaning: 'Bàn (tròn/ăn)' },
      { kanji: '花瓶', kana: 'かびん', romaji: 'Kabin', meaning: 'Bình hoa' },
      { kanji: '灰皿', kana: 'はいざら', romaji: 'Haizara', meaning: 'Gạt tàn thuốc' },
      { kanji: 'クッション', kana: 'クッション', romaji: 'Kusshon', meaning: 'Gối tựa / Đệm ghế' },
      { kanji: 'カーペット', kana: 'カーペット', romaji: 'Kāpetto', meaning: 'Thảm trải sàn' },
      { kanji: '暖炉', kana: 'だんろ', romaji: 'Danro', meaning: 'Lò sưởi' },
      { kanji: '薪', kana: 'まき', romaji: 'Maki', meaning: 'Củi' },
      { kanji: 'エアコン', kana: 'エアコン', romaji: 'Eakon', meaning: 'Điều hòa' },
      { kanji: '扇風機', kana: 'せんぷうき', romaji: 'Senpuuki', meaning: 'Quạt máy' },
    ]
  },
  {
    title: "2. Nhà Bếp (Kitchen)",
    items: [
      { kanji: '冷蔵庫', kana: 'れいぞうこ', romaji: 'Reizouko', meaning: 'Tủ lạnh' },
      { kanji: '電子レンジ', kana: 'でんしレンジ', romaji: 'Denshi renji', meaning: 'Lò vi sóng' },
      { kanji: '炊飯器', kana: 'すいはんき', romaji: 'Suihanki', meaning: 'Nồi cơm điện' },
      { kanji: '鍋', kana: 'なべ', romaji: 'Nabe', meaning: 'Cái nồi' },
      { kanji: 'フライパン', kana: 'フライパン', romaji: 'Furaipan', meaning: 'Chảo rán' },
      { kanji: '包丁', kana: 'ほうちょう', romaji: 'Houchou', meaning: 'Dao bếp' },
      { kanji: 'まな板', kana: 'まないた', romaji: 'Manaita', meaning: 'Cái thớt' },
      { kanji: '茶碗', kana: 'ちゃわん', romaji: 'Chawan', meaning: 'Bát (chén)' },
      { kanji: '箸', kana: 'はし', romaji: 'Hashi', meaning: 'Đũa' },
      { kanji: 'スプーン', kana: 'スプーン', romaji: 'Supūn', meaning: 'Thìa (Muỗng)' },
      { kanji: 'フォーク', kana: 'フォーク', romaji: 'Fōku', meaning: 'Nĩa' },
      { kanji: 'お玉', kana: 'おたま', romaji: 'Otama', meaning: 'Muôi múc canh' },
      { kanji: '食器棚', kana: 'しょっきだな', romaji: 'Shokkidana', meaning: 'Tủ bát đĩa' },
      { kanji: '薬缶', kana: 'やかん', romaji: 'Yakan', meaning: 'Ấm đun nước' },
    ]
  },
  {
    title: "3. Phòng Ngủ (Bedroom)",
    items: [
      { kanji: '寝室', kana: 'しんしつ', romaji: 'Shinshitsu', meaning: 'Phòng ngủ' },
      { kanji: 'ベッド', kana: 'ベッド', romaji: 'Beddo', meaning: 'Giường' },
      { kanji: '枕', kana: 'まくら', romaji: 'Makura', meaning: 'Cái gối' },
      { kanji: '毛布', kana: 'もうふ', romaji: 'Moufu', meaning: 'Chăn (mền) dày' },
      { kanji: 'シーツ', kana: 'シーツ', romaji: 'Shītsu', meaning: 'Ga trải giường' },
      { kanji: 'マットレス', kana: 'マットレス', romaji: 'Mattoresu', meaning: 'Đệm (Nệm)' },
      { kanji: '箪笥', kana: 'たんす', romaji: 'Tansu', meaning: 'Tủ quần áo' },
      { kanji: '引き出し', kana: 'ひきだし', romaji: 'Hikidashi', meaning: 'Ngăn kéo' },
      { kanji: '目覚まし時計', kana: 'めざましどけい', romaji: 'Mezamashidokei', meaning: 'Đồng hồ báo thức' },
      { kanji: '電気スタンド', kana: 'でんきスタンド', romaji: 'Denki stando', meaning: 'Đèn bàn' },
      { kanji: '鏡台', kana: 'きょうだい', romaji: 'Kyoudai', meaning: 'Bàn trang điểm' },
      { kanji: 'スイッチ', kana: 'スイッチ', romaji: 'Suicchi', meaning: 'Công tắc điện' },
    ]
  },
  {
    title: "4. Phòng Tắm & Vệ Sinh",
    items: [
      { kanji: '鏡', kana: 'かがみ', romaji: 'Kagami', meaning: 'Cái gương' },
      { kanji: '歯ブラシ', kana: 'はブラシ', romaji: 'Haburashi', meaning: 'Bàn chải đánh răng' },
      { kanji: '歯磨き粉', kana: 'はみがきこ', romaji: 'Hamigakiko', meaning: 'Kem đánh răng' },
      { kanji: 'タオル', kana: 'タオル', romaji: 'Taoru', meaning: 'Khăn tắm' },
      { kanji: '石鹸', kana: 'せっけん', romaji: 'Sekken', meaning: 'Xà phòng' },
      { kanji: 'シャンプー', kana: 'シャンプー', romaji: 'Shanpū', meaning: 'Dầu gội' },
      { kanji: 'ドライヤー', kana: 'ドライヤー', romaji: 'Doraiyā', meaning: 'Máy sấy tóc' },
      { kanji: '剃刀', kana: 'かみそり', romaji: 'Kamisori', meaning: 'Dao cạo râu' },
      { kanji: '爪切り', kana: 'つめきり', romaji: 'Tsumekiri', meaning: 'Bấm móng tay' },
      { kanji: '浴槽', kana: 'よくそう', romaji: 'Yokusou', meaning: 'Bồn tắm' },
      { kanji: 'シャワー', kana: 'シャワー', romaji: 'Shawā', meaning: 'Vòi hoa sen' },
      { kanji: 'トイレ', kana: 'トイレ', romaji: 'Toire', meaning: 'Nhà vệ sinh / Bồn cầu' },
      { kanji: 'トイレットペーパー', kana: 'トイレットペーパー', romaji: 'Toirettopēpā', meaning: 'Giấy vệ sinh' },
      { kanji: '体重計', kana: 'たいじゅうけい', romaji: 'Taijuukei', meaning: 'Cân sức khỏe' },
    ]
  }
];

export const MEDIA_LESSON_DATA = [
  {
    title: "1. Điện ảnh & Rạp chiếu (Cinema)",
    items: [
      { kanji: '映画', kana: 'えいが', romaji: 'Eiga', meaning: 'Phim điện ảnh' },
      { kanji: '映画館', kana: 'えいがかん', romaji: 'Eigakan', meaning: 'Rạp chiếu phim' },
      { kanji: 'チケット', kana: 'チケット', romaji: 'Chiketto', meaning: 'Vé xem phim' },
      { kanji: '字幕', kana: 'じまく', romaji: 'Jimaku', meaning: 'Phụ đề' },
      { kanji: 'ポップコーン', kana: 'ポップコーン', romaji: 'Poppukōn', meaning: 'Bắp rang bơ' },
      { kanji: '邦画', kana: 'ほうが', romaji: 'Hōga', meaning: 'Phim Nhật Bản' },
      { kanji: '予告編', kana: 'よこくへん', romaji: 'Yokokuhen', meaning: 'Trailer (Giới thiệu phim)' },
      { kanji: '映写機', kana: 'えいしゃき', romaji: 'Eishaki', meaning: 'Máy chiếu phim' },
      { kanji: '観客', kana: 'かんきゃく', romaji: 'Kankyaku', meaning: 'Khán giả' },
      { kanji: '映画祭', kana: 'えいがさい', romaji: 'Eigasai', meaning: 'Liên hoan phim' },
    ]
  },
  {
    title: "2. Diễn xuất & Người làm phim",
    items: [
      { kanji: '監督', kana: 'かんとく', romaji: 'Kantoku', meaning: 'Đạo diễn' },
      { kanji: '俳優', kana: 'はいゆう', romaji: 'Haiyū', meaning: 'Nam diễn viên' },
      { kanji: '女優', kana: 'じょゆう', romaji: 'Joyū', meaning: 'Nữ diễn viên' },
      { kanji: '声優', kana: 'せいゆう', romaji: 'Seiyū', meaning: 'Diễn viên lồng tiếng' },
      { kanji: '主演', kana: 'しゅえん', romaji: 'Shuen', meaning: 'Đóng vai chính' },
      { kanji: '脚本', kana: 'きゃくほん', romaji: 'Kyakuhon', meaning: 'Kịch bản' },
      { kanji: '演技', kana: 'えんぎ', romaji: 'Engi', meaning: 'Diễn xuất' },
      { kanji: '主人公', kana: 'しゅじんこう', romaji: 'Shujinkō', meaning: 'Nhân vật chính' },
      { kanji: '漫画家', kana: 'まんがか', romaji: 'Mangaka', meaning: 'Họa sĩ truyện tranh' },
      { kanji: '作家', kana: 'さっか', romaji: 'Sakka', meaning: 'Tác giả / Nhà văn' },
    ]
  },
  {
    title: "3. Thể loại & Nội dung",
    items: [
      { kanji: 'アニメ', kana: 'アニメ', romaji: 'Anime', meaning: 'Phim hoạt hình Nhật' },
      { kanji: '漫画', kana: 'まんが', romaji: 'Manga', meaning: 'Truyện tranh' },
      { kanji: 'ホラー', kana: 'ホラー', romaji: 'Horā', meaning: 'Phim kinh dị' },
      { kanji: 'アクション', kana: 'アクション', romaji: 'Akushon', meaning: 'Phim hành động' },
      { kanji: 'コメディ', kana: 'コメディ', romaji: 'Komedi', meaning: 'Phim hài' },
      { kanji: '恋愛', kana: 'れんあい', romaji: 'Ren’ai', meaning: 'Phim tình cảm' },
      { kanji: '時代劇', kana: 'じだいげき', romaji: 'Jidaigeki', meaning: 'Phim cổ trang / Lịch sử' },
      { kanji: '怪獣', kana: 'かいじゅう', romaji: 'Kaijū', meaning: 'Phim quái vật' },
      { kanji: '物語', kana: 'ものがたり', romaji: 'Monogatari', meaning: 'Câu chuyện / Truyện' },
      { kanji: 'あらすじ', kana: 'あらすじ', romaji: 'Arasuji', meaning: 'Tóm tắt nội dung' },
    ]
  },
  {
    title: "4. Truyền thông & Báo chí",
    items: [
      { kanji: 'テレビ', kana: 'テレビ', romaji: 'Terebi', meaning: 'Ti vi / Truyền hình' },
      { kanji: '番組', kana: 'ばんぐみ', romaji: 'Bangumi', meaning: 'Chương trình tivi' },
      { kanji: 'ニュース', kana: 'ニュース', romaji: 'Nyūsu', meaning: 'Tin tức' },
      { kanji: '放送', kana: 'ほうそう', romaji: 'Hōsō', meaning: 'Phát sóng' },
      { kanji: '新聞', kana: 'しんぶん', romaji: 'Shinbun', meaning: 'Báo giấy' },
      { kanji: '雑誌', kana: 'ざっし', romaji: 'Zasshi', meaning: 'Tạp chí' },
      { kanji: '記者', kana: 'きしゃ', romaji: 'Kisha', meaning: 'Phóng viên / Nhà báo' },
      { kanji: '広告', kana: 'こうこく', romaji: 'Kōkoku', meaning: 'Quảng cáo' },
      { kanji: '写真', kana: 'しゃしん', romaji: 'Shashin', meaning: 'Ảnh' },
      { kanji: '動画', kana: 'どうが', romaji: 'Dōga', meaning: 'Video' },
      { kanji: 'カメラ', kana: 'カメラ', romaji: 'Kamera', meaning: 'Máy ảnh / Máy quay' },
    ]
  }
];

export const HOBBY_LESSON_DATA = [
  {
    title: "1. Khái niệm & Hoạt động chung",
    items: [
      { kanji: '趣味', kana: 'しゅみ', romaji: 'Shumi', meaning: 'Sở thích' },
      { kanji: '娯楽', kana: 'ごらく', romaji: 'Goraku', meaning: 'Giải trí' },
      { kanji: '旅行', kana: 'りょこう', romaji: 'Ryokou', meaning: 'Du lịch' },
      { kanji: 'スポーツ', kana: 'スポーツ', romaji: 'Supōtsu', meaning: 'Thể thao' },
      { kanji: 'ショッピング', kana: 'ショッピング', romaji: 'Shoppingu', meaning: 'Mua sắm' },
      { kanji: 'ダンス', kana: 'ダンス', romaji: 'Dansu', meaning: 'Nhảy / Khiêu vũ' },
      { kanji: '海水浴', kana: 'かいすいよく', romaji: 'Kaisuiyoku', meaning: 'Tắm biển' },
      { kanji: '園芸', kana: 'えんげい', romaji: 'Engei', meaning: 'Nghệ thuật làm vườn' },
      { kanji: '栽培する', kana: 'さいばいする', romaji: 'Saibai suru', meaning: 'Trồng trọt (cây cảnh)' },
      { kanji: 'コレクション', kana: 'コレクション', romaji: 'Korekushon', meaning: 'Sưu tầm' },
    ]
  },
  {
    title: "2. Nghệ thuật & Truyền thống",
    items: [
      { kanji: '生け花', kana: 'いけばな', romaji: 'Ikebana', meaning: 'Nghệ thuật cắm hoa' },
      { kanji: '俳句', kana: 'はいく', romaji: 'Haiku', meaning: 'Thơ Haiku' },
      { kanji: '習字', kana: 'しゅうじ', romaji: 'Shuuji', meaning: 'Luyện chữ đẹp (Thư pháp)' },
      { kanji: '絵', kana: 'え', romaji: 'E', meaning: 'Tranh / Vẽ tranh' },
      { kanji: '絵の具', kana: 'えのぐ', romaji: 'Enogu', meaning: 'Dụng cụ vẽ (Màu vẽ)' },
      { kanji: '音楽', kana: 'おんがく', romaji: 'Ongaku', meaning: 'Âm nhạc' },
      { kanji: '歌', kana: 'うた', romaji: 'Uta', meaning: 'Bài hát' },
      { kanji: '鑑賞する', kana: 'かんしょうする', romaji: 'Kanshou suru', meaning: 'Thưởng thức (nghệ thuật/phim)' },
      { kanji: '上映する', kana: 'じょうえいする', romaji: 'Jouei suru', meaning: 'Trình chiếu phim' },
      { kanji: '稽古する', kana: 'けいこする', romaji: 'Keiko suru', meaning: 'Khổ luyện / Tập luyện (võ/nghệ thuật)' },
    ]
  },
  {
    title: "3. Trò chơi & Giải trí trong nhà",
    items: [
      { kanji: 'テレビゲーム', kana: 'テレビゲーム', romaji: 'Terebi gēmu', meaning: 'Trò chơi điện tử (Video game)' },
      { kanji: '将棋', kana: 'しょうぎ', romaji: 'Shougi', meaning: 'Cờ tướng Nhật Bản' },
      { kanji: '囲碁', kana: 'いご', romaji: 'Igo', meaning: 'Cờ vây' },
      { kanji: 'トランプ', kana: 'トランプ', romaji: 'Toranpu', meaning: 'Bài tây (Tú lơ khơ)' },
      { kanji: '星占い', kana: 'ほしうらない', romaji: 'Hoshi uranai', meaning: 'Bói sao (Tử vi phương Tây)' },
    ]
  }
];

export const COUNTRY_LESSON_DATA = [
  {
    title: "1. Châu Á (Asia)",
    items: [
      { kanji: 'ベトナム', kana: 'ベトナム', romaji: 'Betonamu', meaning: 'Việt Nam' },
      { kanji: '日本', kana: 'にほん', romaji: 'Nihon', meaning: 'Nhật Bản' },
      { kanji: '韓国', kana: 'かんこく', romaji: 'Kankoku', meaning: 'Hàn Quốc' },
      { kanji: '中国', kana: 'ちゅうごく', romaji: 'Chuugoku', meaning: 'Trung Quốc' },
      { kanji: 'タイ', kana: 'タイ', romaji: 'Tai', meaning: 'Thái Lan' },
      { kanji: 'ラオス', kana: 'ラオス', romaji: 'Raosu', meaning: 'Lào' },
      { kanji: 'カンボジア', kana: 'カンボジア', romaji: 'Kanbojia', meaning: 'Campuchia' },
      { kanji: 'インド', kana: 'インド', romaji: 'Indo', meaning: 'Ấn Độ' },
      { kanji: 'インドネシア', kana: 'インドネシア', romaji: 'Indoneshia', meaning: 'Indonesia' },
      { kanji: 'マレーシア', kana: 'マレーシア', romaji: 'Marēshia', meaning: 'Malaysia' },
      { kanji: 'フィリピン', kana: 'フィリピン', romaji: 'Firipin', meaning: 'Philippines' },
      { kanji: 'シンガポール', kana: 'シンガポール', romaji: 'Shingapōru', meaning: 'Singapore' },
      { kanji: 'モンゴル', kana: 'モンゴル', romaji: 'Mongoru', meaning: 'Mông Cổ' },
    ]
  },
  {
    title: "2. Châu Âu (Europe)",
    items: [
      { kanji: 'イギリス', kana: 'イギリス', romaji: 'Igirisu', meaning: 'Anh' },
      { kanji: 'フランス', kana: 'フランス', romaji: 'Furansu', meaning: 'Pháp' },
      { kanji: 'ドイツ', kana: 'ドイツ', romaji: 'Doitsu', meaning: 'Đức' },
      { kanji: 'イタリア', kana: 'イタリア', romaji: 'Itaria', meaning: 'Ý' },
      { kanji: 'スペイン', kana: 'スペイン', romaji: 'Supein', meaning: 'Tây Ban Nha' },
      { kanji: 'ポルトガル', kana: 'ポルトガル', romaji: 'Porutogaru', meaning: 'Bồ Đào Nha' },
      { kanji: 'ロシア', kana: 'ロシア', romaji: 'Roshia', meaning: 'Nga' },
      { kanji: 'ベルギー', kana: 'ベルギー', romaji: 'Berugī', meaning: 'Bỉ' },
      { kanji: 'オランダ', kana: 'オランダ', romaji: 'Oranda', meaning: 'Hà Lan' },
      { kanji: 'スイス', kana: 'スイス', romaji: 'Suisu', meaning: 'Thụy Sĩ' },
      { kanji: 'スウェーデン', kana: 'スウェーデン', romaji: 'Suwēden', meaning: 'Thụy Điển' },
      { kanji: 'デンマーク', kana: 'デンマーク', romaji: 'Denmāku', meaning: 'Đan Mạch' },
      { kanji: 'ポーランド', kana: 'ポーランド', romaji: 'Pōrando', meaning: 'Ba Lan' },
      { kanji: 'アイルランド', kana: 'アイルランド', romaji: 'Airurando', meaning: 'Ireland (Ai-len)' },
      { kanji: 'ギリシャ', kana: 'ギリシャ', romaji: 'Girisha', meaning: 'Hy Lạp' },
      { kanji: 'チェコ', kana: 'チェコ', romaji: 'Cheko', meaning: 'Cộng hòa Séc (Czech)' },
    ]
  },
  {
    title: "3. Châu Mỹ (Americas)",
    items: [
      { kanji: 'アメリカ', kana: 'アメリカ', romaji: 'Amerika', meaning: 'Mỹ' },
      { kanji: 'カナダ', kana: 'カナダ', romaji: 'Kanada', meaning: 'Canada' },
      { kanji: 'メキシコ', kana: 'メキシコ', romaji: 'Mekishiko', meaning: 'Mexico' },
      { kanji: 'ブラジル', kana: 'ブラジル', romaji: 'Burajiru', meaning: 'Brazil' },
      { kanji: 'アルゼンチン', kana: 'アルゼンチン', romaji: 'Aruzenchin', meaning: 'Argentina' },
      { kanji: 'コロンビア', kana: 'コロンビア', romaji: 'Koronbia', meaning: 'Colombia' },
      { kanji: 'ペルー', kana: 'ペルー', romaji: 'Perū', meaning: 'Peru' },
      { kanji: 'ベネズエラ', kana: 'ベネズエラ', romaji: 'Benezuera', meaning: 'Venezuela' },
      { kanji: 'チリ', kana: 'チリ', romaji: 'Chiri', meaning: 'Chile' },
      { kanji: 'ウルグアイ', kana: 'ウルグアイ', romaji: 'Uruguai', meaning: 'Uruguay' },
      { kanji: 'パラグアイ', kana: 'パラグアイ', romaji: 'Paraguai', meaning: 'Paraguay' },
      { kanji: 'ジャマイカ', kana: 'ジャマイカ', romaji: 'Jamaika', meaning: 'Jamaica' },
    ]
  },
  {
    title: "4. Châu Úc & Châu Phi & Khác",
    items: [
      { kanji: 'オーストラリア', kana: 'オーストラリア', romaji: 'Ōsutoraria', meaning: 'Úc' },
      { kanji: 'ニュージーランド', kana: 'ニュージーランド', romaji: 'Nyūjīrando', meaning: 'New Zealand' },
      { kanji: 'エジプト', kana: 'エジプト', romaji: 'Ejiputo', meaning: 'Ai Cập' },
      { kanji: 'ジンバブエ', kana: 'ジンバブエ', romaji: 'Jinbabue', meaning: 'Zimbabwe' },
      { kanji: 'トルコ', kana: 'トルコ', romaji: 'Toruko', meaning: 'Thổ Nhĩ Kỳ' },
    ]
  }
];

export const EMOTION_LESSON_DATA = [
  {
    title: "1. Cảm xúc Tích cực (Positive)",
    items: [
      { kanji: '好き', kana: 'すき', romaji: 'Suki', meaning: 'Thích / Yêu' },
      { kanji: '嬉しい', kana: 'うれしい', romaji: 'Ureshii', meaning: 'Vui mừng (Hạnh phúc)' },
      { kanji: '楽しい', kana: 'たのしい', romaji: 'Tanoshii', meaning: 'Vui vẻ (Thú vị)' },
      { kanji: '面白い', kana: 'おもしろい', romaji: 'Omoshiroi', meaning: 'Thú vị / Hài hước' },
      { kanji: '気持ちいい', kana: 'きもちいい', romaji: 'Kimochii', meaning: 'Sảng khoái / Dễ chịu' },
      { kanji: '自信', kana: 'じしん', romaji: 'Jishin', meaning: 'Tự tin' },
      { kanji: '誇る', kana: 'ほこる', romaji: 'Hokoru', meaning: 'Tự hào' },
      { kanji: '懐かしい', kana: 'なつかしい', romaji: 'Natsukashii', meaning: 'Hoài niệm / Nhớ nhung' },
      { kanji: '興奮する', kana: 'こうふんする', romaji: 'Koufun suru', meaning: 'Hưng phấn / Phấn khích' },
    ]
  },
  {
    title: "2. Cảm xúc Tiêu cực (Negative)",
    items: [
      { kanji: '嫌い', kana: 'きらい', romaji: 'Kirai', meaning: 'Ghét' },
      { kanji: '怖い', kana: 'こわい', romaji: 'Kowai', meaning: 'Sợ hãi' },
      { kanji: '寂しい', kana: 'さびしい', romaji: 'Sabishii', meaning: 'Buồn / Cô đơn' },
      { kanji: '悲しい', kana: 'かなしい', romaji: 'Kanashii', meaning: 'Đau buồn / Bi thương' },
      { kanji: '心配', kana: 'しんぱい', romaji: 'Shinpai', meaning: 'Lo lắng' },
      { kanji: '不安', kana: 'ふあん', romaji: 'Fuan', meaning: 'Bất an' },
      { kanji: '怒る', kana: 'おこる', romaji: 'Okoru', meaning: 'Tức giận' },
      { kanji: '恥ずかしい', kana: 'はずかしい', romaji: 'Hazukashii', meaning: 'Xấu hổ / Ngại ngùng' },
      { kanji: '羨ましい', kana: 'うらやましい', romaji: 'Urayamashii', meaning: 'Ghen tỵ / Ngưỡng mộ' },
      { kanji: '気持ち悪い', kana: 'きもちわるい', romaji: 'Kimochiwarui', meaning: 'Khó chịu / Ghê tởm' },
      { kanji: '痛い', kana: 'いたい', romaji: 'Itai', meaning: 'Đau đớn' },
    ]
  },
  {
    title: "3. Trạng thái & Phản ứng",
    items: [
      { kanji: '緊張', kana: 'きんちょう', romaji: 'Kinchou', meaning: 'Căng thẳng / Hồi hộp' },
      { kanji: '驚く', kana: 'おどろく', romaji: 'Odoroku', meaning: 'Kinh ngạc' },
      { kanji: '飽きる', kana: 'あきる', romaji: 'Akiru', meaning: 'Chán ngấy' },
      { kanji: '混乱', kana: 'こんらん', romaji: 'Konran', meaning: 'Hỗn loạn / Bối rối' },
      { kanji: 'ショック', kana: 'ショック', romaji: 'Shokku', meaning: 'Sốc (Shock)' },
      { kanji: '危機感', kana: 'ききかん', romaji: 'Kikikan', meaning: 'Cảm giác khủng hoảng' },
      { kanji: 'がっかりする', kana: 'がっかりする', romaji: 'Gakkari suru', meaning: 'Thất vọng' },
      { kanji: 'ため息をつく', kana: 'ためいきをつく', romaji: 'Tameiki o tsuku', meaning: 'Thở dài' },
    ]
  },
  {
    title: "4. Từ tượng thanh (Cảm giác)",
    items: [
      { kanji: 'ドキドキ', kana: 'ドキドキ', romaji: 'Dokidoki', meaning: 'Hồi hộp (Tim đập thình thịch)' },
      { kanji: 'ワクワク', kana: 'ワクワク', romaji: 'Wakuwaku', meaning: 'Háo hức / Nóng lòng' },
      { kanji: 'イライラ', kana: 'イライラ', romaji: 'Iraira', meaning: 'Sốt ruột / Bực bội' },
      { kanji: 'ハラハラ', kana: 'ハラハラ', romaji: 'Harahara', meaning: 'Lo sợ / Thấp thỏm' },
      { kanji: 'ビックリ', kana: 'ビックリ', romaji: 'Bikkuri', meaning: 'Giật mình (Ngạc nhiên)' },
      { kanji: 'うっとり', kana: 'うっとり', romaji: 'Uttori', meaning: 'Say mê / Mải mê' },
    ]
  }
];

export const TRAVEL_LESSON_DATA = [
  {
    title: "1. Địa điểm & Tham quan",
    items: [
      { kanji: 'ガイド', kana: 'ガイド', romaji: 'Gaido', meaning: 'Hướng dẫn viên' },
      { kanji: '名所', kana: 'めいしょ', romaji: 'Meisho', meaning: 'Danh lam thắng cảnh' },
      { kanji: '博物館', kana: 'はくぶつかん', romaji: 'Hakubutsukan', meaning: 'Viện bảo tàng' },
      { kanji: '動物園', kana: 'どうぶつえん', romaji: 'Doubutsuen', meaning: 'Sở thú' },
      { kanji: '遊園地', kana: 'ゆうえんち', romaji: 'Yuuenchi', meaning: 'Khu vui chơi giải trí' },
      { kanji: '教会', kana: 'きょうかい', romaji: 'Kyoukai', meaning: 'Nhà thờ' },
      { kanji: '世界各国', kana: 'せかいかっこく', romaji: 'Sekai kakkoku', meaning: 'Các nước trên thế giới' },
      { kanji: '日帰り旅行', kana: 'ひがえりりょこう', romaji: 'Higaeri ryokou', meaning: 'Du lịch trong ngày' },
      { kanji: '団体旅行', kana: 'だんたいりょこう', romaji: 'Dantai ryokou', meaning: 'Du lịch theo đoàn' },
      { kanji: '景色', kana: 'けしき', romaji: 'Keshiki', meaning: 'Phong cảnh' },
      { kanji: '撮影', kana: 'さつえい', romaji: 'Satsuei', meaning: 'Chụp ảnh / Quay phim' },
    ]
  },
  {
    title: "2. Di chuyển & Vé (Transport)",
    items: [
      { kanji: '空港', kana: 'くうこう', romaji: 'Kuukou', meaning: 'Sân bay' },
      { kanji: '飛行機', kana: 'ひこうき', romaji: 'Hikouki', meaning: 'Máy bay' },
      { kanji: '航空券', kana: 'こうくうけん', romaji: 'Koukuuken', meaning: 'Vé máy bay' },
      { kanji: 'パスポート', kana: 'パスポート', romaji: 'Pasupōto', meaning: 'Hộ chiếu' },
      { kanji: '改札口', kana: 'かいさつぐち', romaji: 'Kaisatsuguchi', meaning: 'Cửa soát vé' },
      { kanji: '切符', kana: 'きっぷ', romaji: 'Kippu', meaning: 'Vé (tàu/xe)' },
      { kanji: '指定券', kana: 'していけん', romaji: 'Shiteiken', meaning: 'Vé có đặt chỗ ngồi' },
      { kanji: '満席', kana: 'まんせき', romaji: 'Manseki', meaning: 'Hết chỗ (Kín ghế)' },
      { kanji: '貸し切りバス', kana: 'かしきりバス', romaji: 'Kashikiri basu', meaning: 'Xe buýt thuê riêng (Charter)' },
      { kanji: 'ケーブルカー', kana: 'ケーブルカー', romaji: 'Kēburukā', meaning: 'Cáp treo' },
      { kanji: '出発', kana: 'しゅっぱつ', romaji: 'Shuppatsu', meaning: 'Xuất phát / Khởi hành' },
    ]
  },
  {
    title: "3. Khách sạn & Hành lý",
    items: [
      { kanji: 'ホテル', kana: 'ホテル', romaji: 'Hoteru', meaning: 'Khách sạn' },
      { kanji: 'チェックイン', kana: 'チェックイン', romaji: 'Chekkuin', meaning: 'Làm thủ tục nhận phòng' },
      { kanji: 'チェックアウト', kana: 'チェックアウト', romaji: 'Chekkuauto', meaning: 'Làm thủ tục trả phòng' },
      { kanji: '荷物', kana: 'にもつ', romaji: 'Nimotsu', meaning: 'Hành lý' },
      { kanji: 'スーツケース', kana: 'スーツケース', romaji: 'Sūtsukēsu', meaning: 'Vali' },
      { kanji: '手荷物', kana: 'てにもつ', romaji: 'Tenimotsu', meaning: 'Hành lý xách tay' },
      { kanji: '貴重品', kana: 'きちょうひん', romaji: 'Kichouhin', meaning: 'Đồ quý giá' },
      { kanji: '部屋割り', kana: 'へやわり', romaji: 'Heyawari', meaning: 'Việc chia phòng' },
      { kanji: '自動ロック', kana: 'じどうロック', romaji: 'Jidou rokku', meaning: 'Khóa cửa tự động' },
      { kanji: '日程', kana: 'にってい', romaji: 'Nittei', meaning: 'Lịch trình' },
      { kanji: 'キャンセル', kana: 'キャンセル', romaji: 'Kyanseru', meaning: 'Hủy bỏ (Cancel)' },
    ]
  },
  {
    title: "4. Thiên nhiên & Nghỉ dưỡng",
    items: [
      { kanji: '海', kana: 'うみ', romaji: 'Umi', meaning: 'Biển' },
      { kanji: '砂浜', kana: 'すなはま', romaji: 'Sunahama', meaning: 'Bãi cát' },
      { kanji: '水泳', kana: 'すいえい', romaji: 'Suiei', meaning: 'Bơi lội' },
      { kanji: '休暇', kana: 'きゅうか', romaji: 'Kyuuka', meaning: 'Kỳ nghỉ (Phép)' },
      { kanji: '頂上', kana: 'ちょうじょう', romaji: 'Choujou', meaning: 'Đỉnh núi' },
      { kanji: 'ふもと', kana: 'ふもと', romaji: 'Fumoto', meaning: 'Chân núi' },
      { kanji: 'ハイキング', kana: 'ハイキング', romaji: 'Haikingu', meaning: 'Leo núi / Đi bộ đường dài' },
      { kanji: '休憩所', kana: 'きゅうけいじょ', romaji: 'Kyuukeijo', meaning: 'Chỗ nghỉ chân' },
      { kanji: '暑い', kana: 'あつい', romaji: 'Atsui', meaning: 'Nóng' },
      { kanji: '晴れ', kana: 'はれ', romaji: 'Hare', meaning: 'Trời nắng' },
    ]
  }
];

export const DISASTER_LESSON_DATA = [
  {
    title: "1. Động đất & Địa chất",
    items: [
      { kanji: '災害', kana: 'さいがい', romaji: 'Saigai', meaning: 'Thảm họa / Thiên tai' },
      { kanji: '地震', kana: 'じしん', romaji: 'Jishin', meaning: 'Động đất' },
      { kanji: '震度', kana: 'しんど', romaji: 'Shindo', meaning: 'Độ chấn động (Thang đo Nhật)' },
      { kanji: 'マグニチュード', kana: 'マグニチュード', romaji: 'Magunichūdo', meaning: 'Độ lớn (Magnitude)' },
      { kanji: '震源', kana: 'しんげん', romaji: 'Shingen', meaning: 'Tâm chấn' },
      { kanji: '余震', kana: 'よしん', romaji: 'Yoshin', meaning: 'Dư chấn' },
      { kanji: '噴火', kana: 'ふんか', romaji: 'Funka', meaning: 'Sự phun trào (Núi lửa)' },
      { kanji: '土砂崩れ', kana: 'どしゃくずれ', romaji: 'Doshakuzure', meaning: 'Sạt lở đất' },
      { kanji: '山崩れ', kana: 'やまくずれ', romaji: 'Yamakuzure', meaning: 'Lở núi' },
      { kanji: '地割れ', kana: 'じわれ', romaji: 'Jiware', meaning: 'Nứt đất' },
    ]
  },
  {
    title: "2. Bão, Lũ lụt & Nước",
    items: [
      { kanji: '津波', kana: 'つなみ', romaji: 'Tsunami', meaning: 'Sóng thần' },
      { kanji: '台風', kana: 'たいふう', romaji: 'Taifū', meaning: 'Bão (Typhoon)' },
      { kanji: '洪水', kana: 'こうずい', romaji: 'Kōzui', meaning: 'Lũ lụt' },
      { kanji: '大雨', kana: 'おおあめ', romaji: 'Ooame', meaning: 'Mưa to' },
      { kanji: '集中豪雨', kana: 'しゅうちゅうごうう', romaji: 'Shūchū gōu', meaning: 'Mưa lớn cục bộ' },
      { kanji: '浸水', kana: 'しんすい', romaji: 'Shinsui', meaning: 'Ngập nước' },
      { kanji: '氾濫', kana: 'はんらん', romaji: 'Hanran', meaning: 'Tràn bờ (Sông/Hồ)' },
      { kanji: '堤防決壊', kana: 'ていぼうけっかい', romaji: 'Teibō kekkai', meaning: 'Vỡ đê' },
      { kanji: '高波', kana: 'たかなみ', romaji: 'Takanami', meaning: 'Sóng lớn / Triều cường' },
      { kanji: '水没', kana: 'すいぼつ', romaji: 'Suibotsu', meaning: 'Chìm trong nước / Ngập lụt' },
    ]
  },
  {
    title: "3. Thời tiết khắc nghiệt & Hỏa hoạn",
    items: [
      { kanji: '山火事', kana: 'やまかじ', romaji: 'Yamakaji', meaning: 'Cháy rừng' },
      { kanji: '竜巻', kana: 'たつまき', romaji: 'Tatsumaki', meaning: 'Lốc xoáy / Vòi rồng' },
      { kanji: '吹雪', kana: 'ふぶき', romaji: 'Fubuki', meaning: 'Bão tuyết' },
      { kanji: '雪崩', kana: 'なだれ', romaji: 'Nadare', meaning: 'Tuyết lở' },
      { kanji: '落雷', kana: 'らくらい', romaji: 'Rakurai', meaning: 'Sét đánh' },
      { kanji: '干ばつ', kana: 'かんばつ', romaji: 'Kanbatsu', meaning: 'Hạn hán' },
      { kanji: '日照り', kana: 'ひでり', romaji: 'Hideri', meaning: 'Nắng hạn' },
      { kanji: '砂漠化', kana: 'さばくか', romaji: 'Sabakuka', meaning: 'Sa mạc hóa' },
      { kanji: '氷雨', kana: 'ひさめ', romaji: 'Hisame', meaning: 'Mưa đá / Mưa lạnh' },
      { kanji: '冷害', kana: 'れいがい', romaji: 'Reigai', meaning: 'Thiệt hại do rét đậm' },
    ]
  },
  {
    title: "4. Hậu quả & Ứng phó",
    items: [
      { kanji: '被害', kana: 'ひがい', romaji: 'Higai', meaning: 'Thiệt hại' },
      { kanji: '被災地', kana: 'ひさいち', romaji: 'Hisaichi', meaning: 'Vùng bị thiệt hại' },
      { kanji: '避難', kana: 'ひなん', romaji: 'Hinan', meaning: 'Tị nạn / Sơ tán' },
      { kanji: '避難所', kana: 'ひなんじょ', romaji: 'Hinanjo', meaning: 'Nơi sơ tán' },
      { kanji: '救助', kana: 'きゅうじょ', romaji: 'Kyuujo', meaning: 'Cứu trợ' },
      { kanji: '警報', kana: 'けいほう', romaji: 'Keihō', meaning: 'Cảnh báo' },
      { kanji: '注意報', kana: 'ちゅういほう', romaji: 'Chūihō', meaning: 'Thông tin lưu ý (mức nhẹ hơn cảnh báo)' },
    ]
  }
];

export const ROUTINE_LESSON_DATA = [
  {
    title: "1. Buổi sáng thức dậy",
    items: [
      { kanji: '目が覚める', kana: 'めがさめる', romaji: 'Me ga sameru', meaning: 'Tỉnh giấc (Tự dậy)' },
      { kanji: '目を覚ます', kana: 'めをさます', romaji: 'Me o samasu', meaning: 'Đánh thức / Bừng tỉnh' },
      { kanji: '寝坊をする', kana: 'ねぼうをする', romaji: 'Nebou o suru', meaning: 'Ngủ nướng / Dậy muộn' },
      { kanji: '目覚まし時計', kana: 'めざましどけい', romaji: 'Mezamashi dokei', meaning: 'Đồng hồ báo thức' },
      { kanji: '布団を畳む', kana: 'ふとんをたたむ', romaji: 'Futon o tatamu', meaning: 'Gấp chăn đệm' },
      { kanji: '顔を洗う', kana: 'かおをあらう', romaji: 'Kao o arau', meaning: 'Rửa mặt' },
      { kanji: '歯を磨く', kana: 'はをみがく', romaji: 'Ha o migaku', meaning: 'Đánh răng' },
      { kanji: '髭を剃る', kana: 'ひげをそる', romaji: 'Hige o soru', meaning: 'Cạo râu' },
    ]
  },
  {
    title: "2. Chăm sóc bản thân",
    items: [
      { kanji: 'シャワーを浴びる', kana: 'シャワーをあびる', romaji: 'Shawā o abiru', meaning: 'Tắm vòi hoa sen' },
      { kanji: 'シャンプーする', kana: 'シャンプーする', romaji: 'Shanpū suru', meaning: 'Gội đầu' },
      { kanji: '髪を乾かす', kana: 'かみをかわかす', romaji: 'Kami o kawakasu', meaning: 'Làm khô tóc' },
      { kanji: 'ドライヤーをかける', kana: 'ドライヤーをかける', romaji: 'Doraiyā o kakeru', meaning: 'Sấy tóc' },
      { kanji: '髪をとかす', kana: 'かみをとかす', romaji: 'Kami o tokasu', meaning: 'Chải tóc' },
      { kanji: '化粧する', kana: 'けしょうする', romaji: 'Keshou suru', meaning: 'Trang điểm' },
      { kanji: '口紅をつける', kana: 'くちべにをつける', romaji: 'Kuchibeni o tsukeru', meaning: 'Tô son' },
      { kanji: '鏡を見る', kana: 'かがみをみる', romaji: 'Kagami o miru', meaning: 'Soi gương' },
    ]
  },
  {
    title: "3. Thay quần áo & Phụ kiện",
    items: [
      { kanji: '着替える', kana: 'きがえる', romaji: 'Kigaeru', meaning: 'Thay quần áo' },
      { kanji: 'シャツを着る', kana: 'シャツをきる', romaji: 'Shatsu o kiru', meaning: 'Mặc áo sơ mi' },
      { kanji: '脱ぐ', kana: 'ぬぐ', romaji: 'Nugu', meaning: 'Cởi ra' },
      { kanji: '眼鏡をかける', kana: 'めがねをかける', romaji: 'Megane o kakeru', meaning: 'Đeo kính' },
      { kanji: '帽子をかぶる', kana: 'ぼうしをかぶる', romaji: 'Boushi o kaburu', meaning: 'Đội mũ' },
      { kanji: 'ネクタイをする', kana: 'ネクタイをする', romaji: 'Nekutai o suru', meaning: 'Thắt cà vạt' },
      { kanji: '時計をはめる', kana: 'とけいをはめる', romaji: 'Tokei o hameru', meaning: 'Đeo đồng hồ' },
      { kanji: '靴を履く', kana: 'くつをはく', romaji: 'Kutsu o haku', meaning: 'Đi giày' },
      { kanji: '似合う', kana: 'にあう', romaji: 'Niau', meaning: 'Hợp / Vừa vặn' },
    ]
  },
  {
    title: "4. Ra ngoài & Về nhà",
    items: [
      { kanji: '家を出る', kana: 'いえをでる', romaji: 'Ie o deru', meaning: 'Ra khỏi nhà' },
      { kanji: '鍵をかける', kana: 'かぎをかける', romaji: 'Kagi o kakeru', meaning: 'Khóa cửa' },
      { kanji: '戸締りをする', kana: 'とじまりをする', romaji: 'Tojimari o suru', meaning: 'Khóa cửa nẻo cẩn thận' },
      { kanji: '新聞を取りに行く', kana: 'しんぶんをとりにいく', romaji: 'Shinbun o torini iku', meaning: 'Đi lấy báo' },
      { kanji: 'ゴミを捨てる', kana: 'ゴミをすてる', romaji: 'Gomi o suteru', meaning: 'Đổ rác' },
      { kanji: 'お風呂に入る', kana: 'おふろにはいる', romaji: 'Ofuro ni hairu', meaning: 'Tắm bồn' },
      { kanji: '寝る', kana: 'ねる', romaji: 'Neru', meaning: 'Ngủ' },
    ]
  }
];

// --- DỮ LIỆU TỪ VỰNG: VIỆC NHÀ (HOUSEWORK) ---
export const HOUSEWORK_LESSON_DATA = [
  {
    title: "1. Giặt giũ (Laundry)",
    items: [
      { kanji: '洗濯物', kana: 'せんたくもの', romaji: 'Sentakumono', meaning: 'Đồ cần giặt' },
      { kanji: '洗濯機', kana: 'せんたくき', romaji: 'Sentakuki', meaning: 'Máy giặt' },
      { kanji: '干す', kana: 'ほす', romaji: 'Hosu', meaning: 'Phơi (đồ/chăn)' },
      { kanji: '乾く', kana: 'かわく', romaji: 'Kawaku', meaning: 'Khô' },
      { kanji: '畳む', kana: 'たたむ', romaji: 'Tatamu', meaning: 'Gấp (quần áo)' },
      { kanji: 'アイロンをかける', kana: 'アイロンをかける', romaji: 'Airon o kakeru', meaning: 'Là quần áo' },
      { kanji: 'しまう', kana: 'しまう', romaji: 'Shimau', meaning: 'Cất đi / Dọn đi' },
      { kanji: 'クリーニングに出す', kana: 'クリーニングにだす', romaji: 'Kurīningu ni dasu', meaning: 'Mang đi giặt tiệm' },
    ]
  },
  {
    title: "2. Dọn dẹp & Vệ sinh",
    items: [
      { kanji: '掃除をする', kana: 'そうじをする', romaji: 'Souji o suru', meaning: 'Dọn dẹp' },
      { kanji: '片付ける', kana: 'かたづける', romaji: 'Katazukeru', meaning: 'Sắp xếp / Dọn dẹp' },
      { kanji: '掃除機をかける', kana: 'そうじきをかける', romaji: 'Soujiki o kakeru', meaning: 'Hút bụi' },
      { kanji: '雑巾を絞る', kana: 'ぞうきんをしぼる', romaji: 'Zoukin o shiboru', meaning: 'Vắt giẻ lau' },
      { kanji: '拭く', kana: 'ふく', romaji: 'Fuku', meaning: 'Lau chùi' },
      { kanji: '食器を洗う', kana: 'しょっきをあらう', romaji: 'Shokki o arau', meaning: 'Rửa bát đĩa' },
      { kanji: '水をやる', kana: 'みずをやる', romaji: 'Mizu o yaru', meaning: 'Tưới nước (cho cây/hoa)' },
    ]
  },
  {
    title: "3. Mua sắm & Thiết bị",
    items: [
      { kanji: '買い物に行く', kana: 'かいものにいく', romaji: 'Kaimono ni iku', meaning: 'Đi mua sắm' },
      { kanji: '店が開く', kana: 'みせがあく', romaji: 'Mise ga aku', meaning: 'Cửa hàng mở' },
      { kanji: '店が閉まる', kana: 'みせがしまる', romaji: 'Mise ga shimaru', meaning: 'Cửa hàng đóng' },
      { kanji: '電気をつける', kana: 'でんきをつける', romaji: 'Denki o tsukeru', meaning: 'Bật điện' },
      { kanji: '電気を消す', kana: 'でんきをけす', romaji: 'Denki o kesu', meaning: 'Tắt điện' },
      { kanji: 'テレビを見る', kana: 'テレビをみる', romaji: 'Terebi o miru', meaning: 'Xem TV' },
      { kanji: 'クーラー', kana: 'クーラー', romaji: 'Kūrā', meaning: 'Máy lạnh' },
    ]
  }
];

export const CASUAL_TALK_LESSON_DATA = [
  {
    title: "1. Chào hỏi cơ bản (Greetings)",
    items: [
      { kanji: 'おはようございます', kana: 'おはようございます', romaji: 'Ohayou gozaimasu', meaning: 'Chào buổi sáng (Lịch sự)' },
      { kanji: 'こんにちは', kana: 'こんにちは', romaji: 'Konnichiwa', meaning: 'Xin chào (Ban ngày)' },
      { kanji: 'こんばんは', kana: 'こんばんは', romaji: 'Konbanwa', meaning: 'Chào buổi tối' },
      { kanji: 'おやすみなさい', kana: 'おやすみなさい', romaji: 'Oyasumi nasai', meaning: 'Chúc ngủ ngon' },
      { kanji: 'さようなら', kana: 'さようなら', romaji: 'Sayōnara', meaning: 'Tạm biệt' },
      { kanji: 'また後で', kana: 'またあとで', romaji: 'Mata ato de', meaning: 'Hẹn gặp lại sau' },
      { kanji: '気をつけて', kana: 'きをつけて', romaji: 'Ki o tsukete', meaning: 'Bảo trọng nhé / Đi cẩn thận' },
      { kanji: 'もしもし', kana: 'もしもし', romaji: 'Moshimoshi', meaning: 'A lô (Nghe điện thoại)' },
    ]
  },
  {
    title: "2. Gặp gỡ & Làm quen (Polite)",
    items: [
      { kanji: '初めまして', kana: 'はじめまして', romaji: 'Hajimemashite', meaning: 'Rất vui được gặp bạn (Lần đầu)' },
      { kanji: 'お会いできて嬉しいです', kana: 'おあいできてうれしいです', romaji: 'Oai dekite ureshii desu', meaning: 'Hân hạnh được gặp bạn' },
      { kanji: 'お久しぶりです', kana: 'おひさしぶりです', romaji: 'Ohisashiburi desu', meaning: 'Lâu rồi không gặp (Lịch sự)' },
      { kanji: 'お元気ですか', kana: 'おげんきですか', romaji: 'Ogenki desu ka', meaning: 'Bạn có khỏe không?' },
      { kanji: '最近どうですか', kana: 'さいきんどうですか', romaji: 'Saikin dō desu ka', meaning: 'Dạo này bạn thế nào?' },
      { kanji: 'どうぞ座ってください', kana: 'どうぞすわってください', romaji: 'Dōzo suwatte kudasai', meaning: 'Xin mời ngồi' },
      { kanji: '名刺', kana: 'めいし', romaji: 'Meishi', meaning: 'Danh thiếp' },
    ]
  },
  {
    title: "3. Hỏi thăm thân mật (Casual)",
    items: [
      { kanji: '元気？', kana: 'げんき？', romaji: 'Genki?', meaning: 'Khỏe không? (Bạn bè)' },
      { kanji: '久しぶり', kana: 'ひさしぶり', romaji: 'Hisashiburi', meaning: 'Lâu không gặp nhỉ' },
      { kanji: 'どうしてた？', kana: 'どうしてた？', romaji: 'Dōshiteta?', meaning: 'Dạo này sao rồi?' },
      { kanji: '何やってたの？', kana: 'なにやってたの？', romaji: 'Nani yatteta no?', meaning: 'Đang làm cái gì đấy?' },
      { kanji: '別に', kana: 'べつに', romaji: 'Betsu ni', meaning: 'Không có gì đặc biệt' },
      { kanji: '相変わらず', kana: 'あいかわらず', romaji: 'Aikawarazu', meaning: 'Vẫn như mọi khi thôi' },
    ]
  },
  {
    title: "4. Cảm thán & Từ lóng (Slang)",
    items: [
      { kanji: '本当？', kana: 'ほんとう？', romaji: 'Hontō?', meaning: 'Thật á?' },
      { kanji: 'マジで？', kana: 'マジで？', romaji: 'Maji de?', meaning: 'Thật không đấy? (Lóng)' },
      { kanji: '嘘？', kana: 'うそ？', romaji: 'Uso?', meaning: 'Điêu! / Đùa à?' },
      { kanji: 'なんで？', kana: 'なんで？', romaji: 'Nande?', meaning: 'Tại sao?' },
      { kanji: 'やっぱり', kana: 'やっぱり', romaji: 'Yappari', meaning: 'Biết ngay mà / Quả nhiên' },
      { kanji: '放っておいて', kana: 'ほっておいて', romaji: 'Hottoite', meaning: 'Để tôi yên! (Kệ tôi)' },
    ]
  }
];
export const LOVE_LESSON_DATA = [
  {
    title: "1. Danh xưng & Khái niệm",
    items: [
      { kanji: '彼氏', kana: 'かれし', romaji: 'Kareshi', meaning: 'Bạn trai' },
      { kanji: '彼女', kana: 'かのじょ', romaji: 'Kanojo', meaning: 'Bạn gái' },
      { kanji: '恋人', kana: 'こいびと', romaji: 'Koibito', meaning: 'Người yêu' },
      { kanji: 'カップル', kana: 'カップル', romaji: 'Kappuru', meaning: 'Cặp đôi (Couple)' },
      { kanji: '恋愛', kana: 'れんあい', romaji: 'Ren’ai', meaning: 'Tình yêu nam nữ' },
      { kanji: '愛情', kana: 'あいじょう', romaji: 'Aijou', meaning: 'Tình thương / Tình cảm' },
      { kanji: '初恋', kana: 'はつこい', romaji: 'Hatsukoi', meaning: 'Mối tình đầu' },
      { kanji: '運命の人', kana: 'うんめいのひと', romaji: 'Unmei no hito', meaning: 'Người định mệnh' },
      { kanji: '永遠の愛', kana: 'えいえんのあい', romaji: 'Eien no ai', meaning: 'Tình yêu vĩnh cửu' },
    ]
  },
  {
    title: "2. Hẹn hò & Hành động",
    items: [
      { kanji: '告白する', kana: 'こくはくする', romaji: 'Kokuhaku suru', meaning: 'Tỏ tình' },
      { kanji: '付き合う', kana: 'つきあう', romaji: 'Tsukiau', meaning: 'Hẹn hò / Kết giao' },
      { kanji: 'デート', kana: 'デート', romaji: 'Dēto', meaning: 'Buổi hẹn hò' },
      { kanji: '手をつなぐ', kana: 'てをつなぐ', romaji: 'Te o tsunagu', meaning: 'Nắm tay' },
      { kanji: '抱きしめる', kana: 'だきしめる', romaji: 'Dakishimeru', meaning: 'Ôm chặt' },
      { kanji: 'キスする', kana: 'キスする', romaji: 'Kisu suru', meaning: 'Hôn' },
      { kanji: 'いちゃつく', kana: 'いちゃつく', romaji: 'Ichatsuku', meaning: 'Tán tỉnh / Ve vãn' },
      { kanji: '約束する', kana: 'やくそくする', romaji: 'Yakusoku suru', meaning: 'Hứa hẹn' },
      { kanji: '誓う', kana: 'ちかう', romaji: 'Chikau', meaning: 'Thề nguyện' },
    ]
  },
  {
    title: "3. Cảm xúc trong tình yêu",
    items: [
      { kanji: '一目惚れ', kana: 'ひとめぼれ', romaji: 'Hitomebore', meaning: 'Tình yêu sét đánh' },
      { kanji: '片思い', kana: 'かたおもい', romaji: 'Kataomoi', meaning: 'Yêu đơn phương' },
      { kanji: '両想い', kana: 'りょうおもい', romaji: 'Ryouomoi', meaning: 'Tình yêu từ hai phía' },
      { kanji: '恋に落ちる', kana: 'こいにおちる', romaji: 'Koi ni ochiru', meaning: 'Phải lòng / Rơi vào lưới tình' },
      { kanji: 'ドキドキする', kana: 'ドキドキする', romaji: 'Dokidoki suru', meaning: 'Hồi hộp (Tim đập thình thịch)' },
      { kanji: 'キュンキュンする', kana: 'キュンキュンする', romaji: 'Kyunkyun suru', meaning: 'Xao xuyến / Rung động' },
      { kanji: '切なくなる', kana: 'せつなくなる', romaji: 'Setsunaku naru', meaning: 'Cảm thấy luyến tiếc / Nhói lòng' },
      { kanji: 'そわそわする', kana: 'そわそわする', romaji: 'Sowasowa suru', meaning: 'Bồn chồn / Đứng ngồi không yên' },
    ]
  },
  {
    title: "4. Mâu thuẫn & Chia tay",
    items: [
      { kanji: '喧嘩する', kana: 'けんかする', romaji: 'Kenka suru', meaning: 'Cãi nhau' },
      { kanji: '仲直りする', kana: 'なかなおりする', romaji: 'Nakanaori suru', meaning: 'Làm lành' },
      { kanji: '浮気', kana: 'うわき', romaji: 'Uwaki', meaning: 'Ngoại tình / Lăng nhăng' },
      { kanji: '失恋', kana: 'しつれん', romaji: 'Shitsuren', meaning: 'Thất tình' },
      { kanji: '振られる', kana: 'ふられる', romaji: 'Furareru', meaning: 'Bị đá / Bị từ chối' },
      { kanji: '恋敵', kana: 'こいがたき', romaji: 'Koigataki', meaning: 'Tình địch' },
      { kanji: '約束を破る', kana: 'やくそくをやぶる', romaji: 'Yakusoku o yaburu', meaning: 'Thất hứa' },
      { kanji: '悲恋', kana: 'ひれん', romaji: 'Hiren', meaning: 'Tình yêu bi thảm / Buồn' },
    ]
  }
];

export const FESTIVAL_LESSON_DATA = [
  {
    title: "1. Lễ hội Truyền thống & Các mùa",
    items: [
      { kanji: '祭り', kana: 'まつり', romaji: 'Matsuri', meaning: 'Lễ hội' },
      { kanji: '正月', kana: 'しょうがつ', romaji: 'Shougatsu', meaning: 'Tết (Năm mới)' },
      { kanji: '大晦日', kana: 'おおみそか', romaji: 'Oomisoka', meaning: 'Đêm giao thừa' },
      { kanji: '花見', kana: 'はなみ', romaji: 'Hanami', meaning: 'Lễ hội ngắm hoa anh đào' },
      { kanji: '花火', kana: 'はなび', romaji: 'Hanabi', meaning: 'Pháo hoa (Lễ hội pháo hoa)' },
      { kanji: 'お盆', kana: 'おぼん', romaji: 'Obon', meaning: 'Lễ Obon (Lễ Vu Lan)' },
      { kanji: '灯籠流し', kana: 'とうろうながし', romaji: 'Tourou nagashi', meaning: 'Lễ thả đèn lồng' },
      { kanji: '七夕', kana: 'たなばた', romaji: 'Tanabata', meaning: 'Lễ Thất Tịch (Ngưu Lang Chức Nữ)' },
      { kanji: '雛祭り', kana: 'ひなまつり', romaji: 'Hinamatsuri', meaning: 'Lễ hội búp bê (Bé gái)' },
      { kanji: '七五三', kana: 'しちごさん', romaji: 'Shichigosan', meaning: 'Lễ 7-5-3 (Cầu an cho trẻ em)' },
      { kanji: '雪祭り', kana: 'ゆきまつり', romaji: 'Yukimatsuri', meaning: 'Lễ hội tuyết' },
    ]
  },
  {
    title: "2. Ngày lễ Quốc gia & Phương Tây",
    items: [
      { kanji: 'ゴールデンウィーク', kana: 'ゴールデンウィーク', romaji: 'Gōruden Wīku', meaning: 'Tuần lễ vàng (Golden Week)' },
      { kanji: '子供の日', kana: 'こどものひ', romaji: 'Kodomo no hi', meaning: 'Ngày Quốc tế thiếu nhi (5/5)' },
      { kanji: '母の日', kana: 'ははのひ', romaji: 'Haha no hi', meaning: 'Ngày của Mẹ' },
      { kanji: '父の日', kana: 'ちちのひ', romaji: 'Chichi no hi', meaning: 'Ngày của Cha' },
      { kanji: '文化の日', kana: 'ぶんかのひ', romaji: 'Bunka no hi', meaning: 'Ngày Văn hóa' },
      { kanji: '緑の日', kana: 'みどりのひ', romaji: 'Midori no hi', meaning: 'Ngày Cây xanh (Môi trường)' },
      { kanji: 'クリスマス', kana: 'クリスマス', romaji: 'Kurisumasu', meaning: 'Giáng sinh (Noel)' },
      { kanji: 'ハロウィーン', kana: 'ハロウィーン', romaji: 'Harowīn', meaning: 'Lễ Halloween' },
      { kanji: 'バレンタインデー', kana: 'バレンタインデー', romaji: 'Barentaindē', meaning: 'Lễ tình nhân (Valentine)' },
    ]
  },
  {
    title: "3. Sự kiện Đời người (Life Events)",
    items: [
      { kanji: '行事', kana: 'ぎょうじ', romaji: 'Gyouji', meaning: 'Sự kiện / Nghi thức' },
      { kanji: '誕生日', kana: 'たんじょうび', romaji: 'Tanjoubi', meaning: 'Sinh nhật' },
      { kanji: '結婚式', kana: 'けっこんしき', romaji: 'Kekkonshiki', meaning: 'Lễ cưới' },
      { kanji: '葬式', kana: 'そうしき', romaji: 'Soushiki', meaning: 'Tang lễ' },
      { kanji: '成人式', kana: 'せいじんしき', romaji: 'Seijinshiki', meaning: 'Lễ thành nhân (Trưởng thành)' },
      { kanji: '入学式', kana: 'にゅうがくしき', romaji: 'Nyuugakushiki', meaning: 'Lễ nhập học' },
      { kanji: '卒業式', kana: 'そつぎょうしき', romaji: 'Sotsugyoushiki', meaning: 'Lễ tốt nghiệp' },
      { kanji: '選挙', kana: 'せんきょ', romaji: 'Senkyo', meaning: 'Bầu cử' },
    ]
  },
  {
    title: "4. Kỳ nghỉ & Thời gian",
    items: [
      { kanji: '夏休み', kana: 'なつやすみ', romaji: 'Natsuyasumi', meaning: 'Nghỉ hè' },
      { kanji: '冬休み', kana: 'ふゆやすみ', romaji: 'Fuyuyasumi', meaning: 'Nghỉ đông' },
      { kanji: '春祭り', kana: 'はるまつり', romaji: 'Harumatsuri', meaning: 'Lễ hội mùa xuân' },
      { kanji: '夏祭り', kana: 'なつまつり', romaji: 'Natsumatsuri', meaning: 'Lễ hội mùa hè' },
      { kanji: '秋祭り', kana: 'あきまつり', romaji: 'Akimatsuri', meaning: 'Lễ hội mùa thu' },
      { kanji: '文化祭', kana: 'ぶんかさい', romaji: 'Bunkasai', meaning: 'Lễ hội văn hóa (trường học)' },
    ]
  }
];