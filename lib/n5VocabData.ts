// lib/n5VocabData.ts

export type VocabItem = {
    word: string;
    reading: string;
    meaning: string;
};

export type VocabCategory = {
    id: string;
    title: string;
    items: VocabItem[];
};

export const WEEK3_VOCAB: VocabCategory[] = [
    {
        id: "w3_1_nums",
        title: "Số đếm & Lượng từ",
        items: [
            { word: "一つ", reading: "ひとつ", meaning: "1 cái / 1 chiếc" },
            { word: "二つ", reading: "ふたつ", meaning: "2 cái" },
            { word: "三つ", reading: "みっつ", meaning: "3 cái" },
            { word: "四つ", reading: "よっつ", meaning: "4 cái" },
            { word: "五つ", reading: "いつつ", meaning: "5 cái" },
            { word: "六つ", reading: "むっつ", meaning: "6 cái" },
            { word: "七つ", reading: "ななつ", meaning: "7 cái" },
            { word: "八つ", reading: "やっつ", meaning: "8 cái" },
            { word: "九つ", reading: "ここのつ", meaning: "9 cái" },
            { word: "十", reading: "とお", meaning: "10 cái" },
            { word: "いくつ", reading: "ikutsu", meaning: "Mấy cái, bao nhiêu cái?" },
            { word: "百", reading: "ひゃく", meaning: "100" },
            { word: "二百", reading: "にひゃく", meaning: "200" },
            { word: "三百", reading: "さんびゃく", meaning: "300" },
            { word: "六百", reading: "ろっぴゃく", meaning: "600" },
            { word: "八百", reading: "はっぴゃく", meaning: "800" },
            { word: "千", reading: "せん", meaning: "1000" },
            { word: "三千", reading: "さんぜん", meaning: "3000" },
            { word: "八千", reading: "はっせん", meaning: "8000" },
            { word: "万", reading: "まん", meaning: "1 vạn (10.000)" },
            { word: "千万", reading: "せんまん", meaning: "10 triệu" },
            { word: "~回", reading: "かい", meaning: "~ lần" },
            { word: "~台", reading: "だい", meaning: "~ chiếc / cỗ (đếm máy móc, xe cộ)" },
            { word: "~枚", reading: "まい", meaning: "~ tờ / tấm (đếm vật mỏng)" },
            { word: "~人", reading: "nin", meaning: "~ người (VD: 三人 - 3 người)" },
            { word: "半分", reading: "はんぶん", meaning: "Một nửa" },
            { word: "四分の一", reading: "よんぶんのいち", meaning: "1/4" }
        ]
    },
    {
        id: "w3_1_people",
        title: "Con người & Gia đình",
        items: [
            { word: "私", reading: "わたし", meaning: "Tôi" },
            { word: "私たち", reading: "わたしたち", meaning: "Chúng tôi" },
            { word: "あなた", reading: "anata", meaning: "Bạn, anh/chị" },
            { word: "彼 / 彼氏", reading: "かれ / かれし", meaning: "Anh ấy, bạn trai" },
            { word: "彼女", reading: "かのじょ", meaning: "Cô ấy, bạn gái" },
            { word: "誰 / どなた", reading: "だれ / どなた", meaning: "Ai / Vị nào (lịch sự)" },
            { word: "皆さん", reading: "みなさん", meaning: "Mọi người, các bạn" },
            { word: "あの人 / あの方", reading: "あのひと / あのかた", meaning: "Người kia / Vị kia" },
            { word: "父", reading: "ちち", meaning: "Bố (của mình)" },
            { word: "母", reading: "はは", meaning: "Mẹ (của mình)" },
            { word: "兄", reading: "あに", meaning: "Anh trai (của mình)" },
            { word: "姉", reading: "あね", meaning: "Chị gái (của mình)" },
            { word: "弟", reading: "おとうと", meaning: "Em trai (của mình)" },
            { word: "妹", reading: "いもうと", meaning: "Em gái (của mình)" },
            { word: "夫 / 主人", reading: "おっと / しゅじん", meaning: "Chồng (của mình)" },
            { word: "妻 / 家内", reading: "つま / かない", meaning: "Vợ (của mình)" },
            { word: "息子", reading: "むすこ", meaning: "Con trai (của mình)" },
            { word: "娘", reading: "むすめ", meaning: "Con gái (của mình)" },
            { word: "祖父", reading: "そふ", meaning: "Ông (của mình)" },
            { word: "祖母", reading: "そぼ", meaning: "Bà (của mình)" },
            { word: "両親", reading: "りょうしん", meaning: "Bố mẹ" },
            { word: "兄弟", reading: "きょうだい", meaning: "Anh chị em" }
        ]
    },
    {
        id: "w3_2_objects",
        title: "Đồ vật (Lesson 2)",
        items: [
            { word: "これ", reading: "kore", meaning: "Cái này" },
            { word: "それ", reading: "sore", meaning: "Cái đó" },
            { word: "あれ", reading: "are", meaning: "Cái kia" },
            { word: "本", reading: "ほん", meaning: "SÁch" },
            { word: "辞書", reading: "じしょ", meaning: "Từ điển" },
            { word: "雑誌", reading: "ざっし", meaning: "Tạp chí" },
            { word: "新聞", reading: "しんぶん", meaning: "Báo" },
            { word: "ノート", reading: "nooto", meaning: "Vở" },
            { word: "手帳", reading: "てちょう", meaning: "Sổ tay" },
            { word: "名刺", reading: "めいし", meaning: "Danh thiếp" },
            { word: "鉛筆", reading: "えんぴつ", meaning: "Bút chì" },
            { word: "時計", reading: "とけい", meaning: "Đồng hồ" },
            { word: "傘", reading: "かさ", meaning: "Ô, dù" },
            { word: "鞄", reading: "かばん", meaning: "Cặp sách, túi" },
            { word: "鍵", reading: "かぎ", meaning: "Chìa khóa" }
        ]
    },
    {
        id: "w3_3_positions",
        title: "Vị trí & Chỉ định (Lesson 3)",
        items: [
            { word: "ここ", reading: "koko", meaning: "Chỗ này" },
            { word: "そこ", reading: "soko", meaning: "Chỗ đó" },
            { word: "あそこ", reading: "asoko", meaning: "Chỗ kia" },
            { word: "こちら", reading: "kochira", meaning: "Phía này (lịch sự)" },
            { word: "そちら", reading: "sochira", meaning: "Phía đó (lịch sự)" },
            { word: "あちら", reading: "achira", meaning: "Phía kia (lịch sự)" },
            { word: "どこ / どちら", reading: "doko / dochira", meaning: "Ở đâu / Phía nào" }
        ]
    },
    {
        id: "w3_3_facilities",
        title: "Cơ sở vật chất (Lesson 3)",
        items: [
            { word: "教室", reading: "きょうしつ", meaning: "Lớp học" },
            { word: "食堂", reading: "しょくどう", meaning: "Nhà ăn" },
            { word: "事務所", reading: "じむしょ", meaning: "Văn phòng" },
            { word: "会議室", reading: "かいぎしつ", meaning: "Phòng họp" },
            { word: "受付", reading: "うけつけ", meaning: "Quầy lễ tân" },
            { word: "ロビー", reading: "robii", meaning: "Hành lang, đại sảnh" },
            { word: "部屋", reading: "へや", meaning: "Căn phòng" },
            { word: "トイレ", reading: "toire", meaning: "Nhà vệ sinh" },
            { word: "階段", reading: "かいだん", meaning: "Cầu thang" },
            { word: "エレベーター", reading: "erebeetaa", meaning: "Thang máy" }
        ]
    }
];

export const WEEK4_VOCAB: VocabCategory[] = [
    {
        id: "lesson4",
        title: "Bài 4: Thời gian & Công việc",
        items: [
            { word: "今", reading: "いま", meaning: "Bây giờ" },
            { word: "～時", reading: "～じ", meaning: "～ giờ" },
            { word: "～分", reading: "～ふん", meaning: "～ phút" },
            { word: "半", reading: "はん", meaning: "Rưỡi, nửa" },
            { word: "何時", reading: "なんじ", meaning: "Mấy giờ" },
            { word: "何分", reading: "なんぷん", meaning: "Mấy phút" },
            { word: "午前", reading: "ごぜん", meaning: "Sáng (AM)" },
            { word: "午後", reading: "ごご", meaning: "Chiều (PM)" },
            { word: "起きる", reading: "おきる", meaning: "Thức dậy" },
            { word: "寝る", reading: "ねる", meaning: "Ngủ" },
            { word: "働く", reading: "はたらく", meaning: "Làm việc" },
            { word: "休む", reading: "やすむ", meaning: "Nghỉ ngơi" },
            { word: "勉強する", reading: "べんきょうする", meaning: "Học tập" },
            { word: "終わる", reading: "おわる", meaning: "Kết thúc" },
            { word: "から", reading: "kara", meaning: "Từ" },
            { word: "まで", reading: "made", meaning: "Đến" },
            { word: "大変ですね", reading: "taihen desu ne", meaning: "Vất vả nhỉ" }
        ]
    },
    {
        id: "lesson5",
        title: "Bài 5: Di chuyển & Phương tiện",
        items: [
            { word: "行く", reading: "いく", meaning: "Đi" },
            { word: "来る", reading: "くる", meaning: "Đến" },
            { word: "帰る", reading: "かえる", meaning: "Về" },
            { word: "学校", reading: "がっこう", meaning: "Trường học" },
            { word: "スーパー", reading: "suupaa", meaning: "Siêu thị" },
            { word: "駅", reading: "えき", meaning: "Ga" },
            { word: "飛行機", reading: "ひこうき", meaning: "Máy bay" },
            { word: "船", reading: "ふね", meaning: "Tàu thủy" },
            { word: "電車", reading: "でんしゃ", meaning: "Tàu điện" },
            { word: "地下鉄", reading: "ちかてつ", meaning: "Tàu điện ngầm" },
            { word: "新幹線", reading: "しんかんせん", meaning: "Tàu siêu tốc Shinkansen" },
            { word: "バス", reading: "basu", meaning: "Xe bus" },
            { word: "タクシー", reading: "takushii", meaning: "Taxi" },
            { word: "自転車", reading: "じてんしゃ", meaning: "Xe đạp" },
            { word: "歩いて", reading: "あるいて", meaning: "Đi bộ" },
            { word: "人", reading: "ひと", meaning: "Người" },
            { word: "友達", reading: "ともだち", meaning: "Bạn bè" },
            { word: "彼", reading: "かれ", meaning: "Anh ấy, bạn trai" },
            { word: "彼女", reading: "かのじょ", meaning: "Cô ấy, bạn gái" },
            { word: "家族", reading: "かぞく", meaning: "Gia đình" }
        ]
    }
];

export const WEEK5_VOCAB: VocabCategory[] = [
    {
        id: "lesson6",
        title: "Bài 6: Ăn uống & Hành động",
        items: [
            { word: "食べる", reading: "たべる", meaning: "Ăn" },
            { word: "飲む", reading: "のむ", meaning: "Uống" },
            { word: "吸う", reading: "すう", meaning: "Hút (thuốc)" },
            { word: "見る", reading: "みる", meaning: "Xem, nhìn" },
            { word: "聞く", reading: "きkく", meaning: "Nghe" },
            { word: "読む", reading: "よむ", meaning: "Đọc" },
            { word: "書く", reading: "かく", meaning: "Viết" },
            { word: "買う", reading: "かう", meaning: "Mua" },
            { word: "撮る", reading: "とる", meaning: "Chụp (ảnh)" },
            { word: "する", reading: "suru", meaning: "Làm, thực hiện" },
            { word: "会う", reading: "あう", meaning: "Gặp gỡ" },
            { word: "ご飯", reading: "ごはん", meaning: "Cơm, bữa ăn" },
            { word: "パン", reading: "pan", meaning: "Bánh mỳ" },
            { word: "卵", reading: "たまご", meaning: "Trứng" },
            { word: "肉", reading: "にく", meaning: "Thịt" },
            { word: "魚", reading: "さかな", meaning: "Cá" },
            { word: "野菜", reading: "やさい", meaning: "Rau" },
            { word: "果物", reading: "くだもの", meaning: "Hoa quả" },
            { word: "水", reading: "みず", meaning: "Nước" },
            { word: "お茶", reading: "おちゃ", meaning: "Trà" }
        ]
    },
    {
        id: "lesson7",
        title: "Bài 7: Công cụ & Tặng nhận",
        items: [
            { word: "切る", reading: "きる", meaning: "Cắt" },
            { word: "送る", reading: "おくる", meaning: "Gửi" },
            { word: "あげる", reading: "ageru", meaning: "Tặng, cho" },
            { word: "もらう", reading: "morau", meaning: "Nhận" },
            { word: "貸す", reading: "かす", meaning: "Cho mượn" },
            { word: "借りる", reading: "かりる", meaning: "Vay, mượn" },
            { word: "教える", reading: "おしえる", meaning: "Dạy" },
            { word: "習う", reading: "ならう", meaning: "Học, tập" },
            { word: "かける", reading: "kakeru", meaning: "Gọi (điện thoại)" },
            { word: "手", reading: "て", meaning: "Tay" },
            { word: "はし", reading: "hashi", meaning: "Đũa" },
            { word: "スプーン", reading: "supuun", meaning: "Thìa" },
            { word: "フォーク", reading: "fooku", meaning: "Dĩa" },
            { word: "ナイフ", reading: "naifu", meaning: "Dao" },
            { word: "パソコン", reading: "pasokon", meaning: "Máy tính cá nhân" },
            { word: "携帯", reading: "けいたい", meaning: "Điện thoại di động" },
            { word: "メール", reading: "meeru", meaning: "Email" },
            { word: "年賀状", reading: "ねんがじょう", meaning: "Thiệp chúc Tết" },
            { word: "荷物", reading: "にもつ", meaning: "Hành lý, đồ đạc" },
            { word: "お金", reading: "おかね", meaning: "Tiền" }
        ]
    }
];

export const WEEK6_VOCAB: VocabCategory[] = [
    {
        id: "lesson8",
        title: "Bài 8: Tính từ",
        items: [
            { word: "ハンサム [な]", reading: "hansamu", meaning: "Đẹp trai" },
            { word: "きれい [な]", reading: "kirei", meaning: "Đẹp, sạch sẽ" },
            { word: "静か [な]", reading: "しずか", meaning: "Yên tĩnh" },
            { word: "にぎやか [な]", reading: "nigiyaka", meaning: "Náo nhiệt, nhộn nhịp" },
            { word: "有名 [な]", reading: "ゆうめい", meaning: "Nổi tiếng" },
            { word: "親切 [な]", reading: "しんせつ", meaning: "Tốt bụng" },
            { word: "元気 [な]", reading: "げんき", meaning: "Khỏe mạnh" },
            { word: "暇 [な]", reading: "ひま", meaning: "Rảnh rỗi" },
            { word: "大きい", reading: "おおきい", meaning: "To, lớn" },
            { word: "小さい", reading: "ちいさい", meaning: "Nhỏ, bé" },
            { word: "新しい", reading: "あたらしい", meaning: "Mới" },
            { word: "古い", reading: "ふるい", meaning: "Cũ" },
            { word: "良い", reading: "よい / いい", meaning: "Tốt" },
            { word: "悪い", reading: "わるい", meaning: "Xấu, tồi" },
            { word: "暑い", reading: "あつい", meaning: "Nóng" },
            { word: "寒い", reading: "さむい", meaning: "Lạnh" },
            { word: "冷たい", reading: "つめたい", meaning: "Lạnh (cảm giác)" },
            { word: "難しい", reading: "むずかしい", meaning: "Khó" },
            { word: "易しい", reading: "やさしい", meaning: "Dễ" },
            { word: "高い", reading: "たかい", meaning: "Cao, đắt" },
            { word: "安い", reading: "やすい", meaning: "Rẻ" },
            { word: "低い", reading: "ひくい", meaning: "Thấp" },
            { word: "おもしろい", reading: "omoshiroi", meaning: "Thú vị" },
            { word: "食べ物", reading: "たべもの", meaning: "Đồ ăn" },
            { word: "生活", reading: "せいかつ", meaning: "Cuộc sống" }
        ]
    },
    {
        id: "lesson9",
        title: "Bài 9: Sở thích & Năng lực",
        items: [
            { word: "わかる", reading: "wakaru", meaning: "Hiểu, biết" },
            { word: "ある", reading: "aru", meaning: "Có (đồ vật)" },
            { word: "好き [な]", reading: "すき", meaning: "Thích" },
            { word: "嫌い [な]", reading: "きらい", meaning: "Ghét" },
            { word: "上手 [な]", reading: "じょうず", meaning: "Giỏi" },
            { word: "下手 [な]", reading: "へた", meaning: "Kém" },
            { word: "料理", reading: "りょうり", meaning: "Món ăn, nấu ăn" },
            { word: "飲み物", reading: "のみもの", meaning: "Đồ uống" },
            { word: "スポーツ", reading: "supootsu", meaning: "Thể thao" },
            { word: "野球", reading: "やきゅう", meaning: "Bóng chày" },
            { word: "ダンス", reading: "dansu", meaning: "Nhảy múa" },
            { word: "音楽", reading: "おんがく", meaning: "Âm nhạc" },
            { word: "歌", reading: "うた", meaning: "Bài hát" },
            { word: "映画", reading: "えいが", meaning: "Phim" },
            { word: "時間", reading: "じかん", meaning: "Thời gian" },
            { word: "用事", reading: "ようじ", meaning: "Việc bận" },
            { word: "約束", reading: "やくそく", meaning: "Cuộc hẹn, lời hứa" },
            { word: "少し", reading: "すこし", meaning: "Một chút" },
            { word: "たくさん", reading: "takusan", meaning: "Nhiều" },
            { word: "全然", reading: "ぜんぜん", meaning: "Hoàn toàn không" }
        ]
    }
];

export const WEEK7_VOCAB: VocabCategory[] = [
    {
        id: "lesson10",
        title: "Bài 10: Tồn tại & Vị trí",
        items: [
            { word: "ある", reading: "aru", meaning: "Có (vật không sống)" },
            { word: "いる", reading: "iru", meaning: "Có (vật sống)" },
            { word: "いろいろ [な]", reading: "iroiro", meaning: "Nhiều loại, phong phú" },
            { word: "男の人", reading: "おとこのひと", meaning: "Người đàn ông" },
            { word: "女の人", reading: "おんなのひと", meaning: "Người đàn bà" },
            { word: "男の子", reading: "おとこのこ", meaning: "Cậu bé" },
            { word: "女の子", reading: "おんなのこ", meaning: "Cô bé" },
            { word: "犬", reading: "いぬ", meaning: "Con chó" },
            { word: "猫", reading: "ねこ", meaning: "Con mèo" },
            { word: "木", reading: "き", meaning: "Cây" },
            { word: "物", reading: "もの", meaning: "Đồ vật" },
            { word: "電池", reading: "でんち", meaning: "Pin" },
            { word: "箱", reading: "はこ", meaning: "Hộp" },
            { word: "冷蔵庫", reading: "れいぞうこ", meaning: "Tủ lạnh" },
            { word: "テーブル", reading: "teeburu", meaning: "Bàn" },
            { word: "棚", reading: "たな", meaning: "Giá, kệ" },
            { word: "窓", reading: "まど", meaning: "Cửa sổ" },
            { word: "公園", reading: "こうえん", meaning: "Công viên" },
            { word: "喫茶店", reading: "きっさてん", meaning: "Quán cafe" },
            { word: "乗り場", reading: "のりば", meaning: "Bến xe, điểm dừng" },
            { word: "上", reading: "うえ", meaning: "Trên" },
            { word: "下", reading: "した", meaning: "Dưới" },
            { word: "前", reading: "まえ", meaning: "Trước" },
            { word: "後ろ", reading: "うしろ", meaning: "Sau" },
            { word: "右", reading: "みぎ", meaning: "Phải" },
            { word: "左", reading: "ひだり", meaning: "Trái" },
            { word: "中", reading: "なか", meaning: "Trong" },
            { word: "外", reading: "そと", meaning: "Ngoài" },
            { word: "隣", reading: "となり", meaning: "Bên cạnh" },
            { word: "近く", reading: "ちかく", meaning: "Gần" },
            { word: "間", reading: "あいだ", meaning: "Ở giữa" }
        ]
    },
    {
        id: "lesson11",
        title: "Bài 11: Lượng từ",
        items: [
            { word: "いくつ", reading: "ikutsu", meaning: "Bao nhiêu cái" },
            { word: "一人", reading: "ひとり", meaning: "1 người" },
            { word: "二人", reading: "ふたり", meaning: "2 người" },
            { word: "～人", reading: "～にん", meaning: "～ người" },
            { word: "～台", reading: "～だい", meaning: "～ chiếc (máy móc)" },
            { word: "～枚", reading: "～まい", meaning: "～ tờ, tấm" },
            { word: "～回", reading: "～かい", meaning: "～ lần" },
            { word: "りんご", reading: "ringo", meaning: "Táo" },
            { word: "みかん", reading: "mikan", meaning: "Quýt" },
            { word: "サンドイッチ", reading: "sandoitchi", meaning: "Sandwich" },
            { word: "カレーライス", reading: "kareeraisu", meaning: "Cơm cà phê" },
            { word: "切手", reading: "きって", meaning: "Tem" },
            { word: "はがき", reading: "hagaki", meaning: "Bưu thiếp" },
            { word: "封筒", reading: "ふうとう", meaning: "Phong bì" },
            { word: "両親", reading: "りょうしん", meaning: "Bố mẹ" },
            { word: "兄弟", reading: "きょうだい", meaning: "Anh chị em" },
            { word: "時間", reading: "じかん", meaning: "Tiếng đồng hồ" },
            { word: "週間", reading: "しゅうかん", meaning: "Tuần" },
            { word: "か月", reading: "かげつ", meaning: "Tháng" },
            { word: "年", reading: "ねん", meaning: "Năm" },
            { word: "だけ", reading: "dake", meaning: "Chỉ" }
        ]
    }
];

export const WEEK8_VOCAB: VocabCategory[] = [
    {
        id: "lesson12",
        title: "Bài 12: So sánh & Thời tiết",
        items: [
            { word: "簡単 [な]", reading: "かんたん", meaning: "Đơn giản" },
            { word: "近い", reading: "ちかい", meaning: "Gần" },
            { word: "遠い", reading: "とおい", meaning: "Xa" },
            { word: "早い / 速い", reading: "はやい", meaning: "Sớm / Nhanh" },
            { word: "遅い", reading: "おそい", meaning: "Chậm, muộn" },
            { word: "多い", reading: "おおい", meaning: "Nhiều (người)" },
            { word: "少ない", reading: "すくない", meaning: "Ít (người)" },
            { word: "温かい / 暖かい", reading: "あたたかい", meaning: "Ấm áp" },
            { word: "涼しい", reading: "すずしい", meaning: "Mát mẻ" },
            { word: "甘い", reading: "あまい", meaning: "Ngọt" },
            { word: "辛い", reading: "からい", meaning: "Cay" },
            { word: "重い", reading: "おもい", meaning: "Nặng" },
            { word: "軽い", reading: "かるい", meaning: "Nhẹ" },
            { word: "天気", reading: "てんき", meaning: "Thời tiết" },
            { word: "雨", reading: "あめ", meaning: "Mưa" },
            { word: "雪", reading: "ゆき", meaning: "Tuyết" },
            { word: "曇り", reading: "くもり", meaning: "Mây, u ám" },
            { word: "空港", reading: "くうこう", meaning: "Sân bay" },
            { word: "海", reading: "うみ", meaning: "Biển" },
            { word: "世界", reading: "せかい", meaning: "Thế giới" },
            { word: "祭り", reading: "まつり", meaning: "Lễ hội" },
            { word: "四季", reading: "しき", meaning: "Bốn mùa" },
            { word: "春", reading: "はる", meaning: "Mùa xuân" },
            { word: "夏", reading: "なつ", meaning: "Mùa hè" },
            { word: "秋", reading: "あき", meaning: "Mùa thu" },
            { word: "冬", reading: "ふゆ", meaning: "Mùa đông" }
        ]
    },
    {
        id: "lesson13",
        title: "Bài 13: Mong muốn & Mục đích",
        items: [
            { word: "遊びます", reading: "あそびます", meaning: "Chơi" },
            { word: "泳ぎます", reading: "およぎます", meaning: "Bơi" },
            { word: "迎えます", reading: "むかえます", meaning: "Đón" },
            { word: "疲れます", reading: "つかれます", meaning: "Mệt mỏi" },
            { word: "出します", reading: "だします", meaning: "Gửi (thư), nộp" },
            { word: "入ります", reading: "はいります", meaning: "Vào (phòng)" },
            { word: "出ます", reading: "でます", meaning: "Ra (phòng)" },
            { word: "結婚します", reading: "けっこんします", meaning: "Kết hôn" },
            { word: "買い物します", reading: "かいものします", meaning: "Mua sắm" },
            { word: "食事します", reading: "しょくじします", meaning: "Ăn cơm" },
            { word: "散歩します", reading: "さんぽします", meaning: "Đi dạo" },
            { word: "欲しい", reading: "ほしい", meaning: "Muốn có (vật)" },
            { word: "喉が渇く", reading: "のどがかわく", meaning: "Khát nước" },
            { word: "お腹が空く", reading: "おなかがすく", meaning: "Đói bụng" },
            { word: "注文", reading: "ちゅうもん", meaning: "Đặt món, gọi món" }
        ]
    }
];

export const WEEK9_VOCAB: VocabCategory[] = [
    {
        id: "lesson14",
        title: "Bài 14: Thể Te & Yêu cầu",
        items: [
            { word: "つけます", reading: "tsukemasu", meaning: "Bật (điện)" },
            { word: "消します", reading: "けします", meaning: "Tắt (điện)" },
            { word: "開けます", reading: "あけます", meaning: "Mở (cửa)" },
            { word: "閉めます", reading: "しめます", meaning: "Đóng (cửa)" },
            { word: "急ぎます", reading: "いそぎます", meaning: "Vội vàng, gấp" },
            { word: "待ちます", reading: "まちます", meaning: "Đợi" },
            { word: "持ちます", reading: "もちます", meaning: "Cầm, mang" },
            { word: "取ります", reading: "とります", meaning: "Lấy" },
            { word: "手伝います", reading: "てつだいます", meaning: "Giúp đỡ" },
            { word: "呼びます", reading: "よびます", meaning: "Gọi" },
            { word: "話します", reading: "はなします", meaning: "Nói chuyện" },
            { word: "使いまず", reading: "つかいます", meaning: "Sử dụng" },
            { word: "止めます", reading: "とめます", meaning: "Dừng, đỗ" },
            { word: "見せます", reading: "みせます", meaning: "Cho xem" },
            { word: "教えます", reading: "おしえます", meaning: "Chỉ bảo, cho biết" },
            { word: "座ります", reading: "すわります", meaning: "Ngồi" },
            { word: "立ちます", reading: "たちます", meaning: "Đứng" },
            { word: "入りまず", reading: "はいります", meaning: "Vào" },
            { word: "出ます", reading: "でます", meaning: "Ra" },
            { word: "雨が降ります", reading: "あめがふります", meaning: "Mưa rơi" }
        ]
    },
    {
        id: "lesson15",
        title: "Bài 15: Phép tắc & Trạng thái",
        items: [
            { word: "置きます", reading: "おきます", meaning: "Đặt, để" },
            { word: "作ります", reading: "つくります", meaning: "Làm, tạo ra" },
            { word: "売ります", reading: "うります", meaning: "Bán" },
            { word: "知ります", reading: "しります", meaning: "Biết" },
            { word: "住みます", reading: "すみまます", meaning: "Sống, ở" },
            { word: "研究します", reading: "けんきゅうします", meaning: "Nghiên cứu" },
            { word: "資料", reading: "しりょう", meaning: "Tài liệu" },
            { word: "カタログ", reading: "katarogu", meaning: "Catalog" },
            { word: "時刻表", reading: "じこくひょう", meaning: "Bảng giờ tàu" },
            { word: "服", reading: "ふく", meaning: "Quần áo" },
            { word: "製品", reading: "せいひん", meaning: "Sản phẩm" },
            { word: "ソフト", reading: "sofuto", meaning: "Phần mềm" },
            { word: "専門", reading: "せんもん", meaning: "Chuyên môn" },
            { word: "歯医者", reading: "はいしゃ", meaning: "Nha sĩ" },
            { word: "床屋", reading: "とこや", meaning: "Tiệm cắt tóc" },
            { word: "独身", reading: "どくしん", meaning: "Độc thân" }
        ]
    }
];

export const WEEK10_VOCAB: VocabCategory[] = [
    {
        id: "lesson16",
        title: "Bài 16: Trình tự & Cách thức",
        items: [
            { word: "乗ります", reading: "のります", meaning: "Lên (tàu)" },
            { word: "降ります", reading: "おります", meaning: "Xuống (tàu)" },
            { word: "乗り換えます", reading: "のりかえます", meaning: "Chuyển (tàu)" },
            { word: "浴びます", reading: "あびます", meaning: "Tắm (vòi sen)" },
            { word: "入れます", reading: "いれます", meaning: "Cho vào" },
            { word: "出します", reading: "だします", meaning: "Lấy ra, nộp" },
            { word: "下ろします", reading: "おろします", meaning: "Rút (tiền)" },
            { word: "入ります", reading: "はいります", meaning: "Vào (đại học)" },
            { word: "出ます", reading: "でます", meaning: "Ra, tốt nghiệp" },
            { word: "押します", reading: "おします", meaning: "Bấm, ấn" },
            { word: "若い", reading: "わかい", meaning: "Trẻ" },
            { word: "長い", reading: "ながい", meaning: "Dài" },
            { word: "短い", reading: "みじかい", meaning: "Ngắn" },
            { word: "明るい", reading: "あかるい", meaning: "Sáng" },
            { word: "暗い", reading: "くらい", meaning: "Tối" },
            { word: "体", reading: "からだ", meaning: "Cơ thể" },
            { word: "頭", reading: "あたま", meaning: "Đầu" },
            { word: "髪", reading: "かみ", meaning: "Tóc" },
            { word: "顔", reading: "かお", meaning: "Mặt" },
            { word: "目", reading: "め", meaning: "Mắt" }
        ]
    },
    {
        id: "lesson17",
        title: "Bài 17: Thể Nai",
        items: [
            { word: "覚えます", reading: "おぼえます", meaning: "Nhớ" },
            { word: "忘れます", reading: "わすれます", meaning: "Quên" },
            { word: "なくします", reading: "nakushimasu", meaning: "Làm mất" },
            { word: "払います", reading: "はらいます", meaning: "Trả tiền" },
            { word: "返します", reading: "かえします", meaning: "Trả lại" },
            { word: "出かけます", reading: "でかけます", meaning: "Đi ra ngoài" },
            { word: "脱ぎます", reading: "ぬぎます", meaning: "Cởi (quần áo, giày)" },
            { word: "持っていきます", reading: "もっていきます", meaning: "Mang đi" },
            { word: "持ってきます", reading: "もってきます", meaning: "Mang đến" },
            { word: "心配します", reading: "しんぱいします", meaning: "Lo lắng" },
            { word: "残業します", reading: "ざんぎょうします", meaning: "Làm thêm giờ" },
            { word: "出張します", reading: "しゅっちょうします", meaning: "Đi công tác" },
            { word: "薬を読みます", reading: "くすりをのみます", meaning: "Uống thuốc" },
            { word: "お風呂に入ります", reading: "おふろにはいります", meaning: "Tắm bồn" },
            { word: "大切 [な]", reading: "たいせつ", meaning: "Quan trọng" },
            { word: "大丈夫 [な]", reading: "だいじょうぶ", meaning: "Không sao, ổn" },
            { word: "危ない", reading: "あぶない", meaning: "Nguy hiểm" },
            { word: "禁煙", reading: "きんえん", meaning: "Cấm hút thuốc" },
            { word: "熱", reading: "ねつ", meaning: "Sốt" },
            { word: "病気", reading: "びょうき", meaning: "Bệnh tật" }
        ]
    }
];

export const WEEK11_VOCAB: VocabCategory[] = [
    {
        id: "lesson18",
        title: "Bài 18: Khả năng & Sở thích",
        items: [
            { word: "できます", reading: "dekimasu", meaning: "Có thể" },
            { word: "洗います", reading: "araimasu", meaning: "Rửa" },
            { word: "弾きます", reading: "hikimasu", meaning: "Chơi (đàn)" },
            { word: "歌います", reading: "utaimasu", meaning: "Hát" },
            { word: "集めます", reading: "atsumemasu", meaning: "Thu thập" },
            { word: "捨てます", reading: "sutemasu", meaning: "Vứt" },
            { word: "換えます", reading: "kaemasu", meaning: "Đổi" },
            { word: "運転します", reading: "untenshimasu", meaning: "Lái xe" },
            { word: "予約します", reading: "yoyakushimasu", meaning: "Đặt trước" },
            { word: "ピアノ", reading: "piano", meaning: "Đàn Piano" },
            { word: "スキー", reading: "sukii", meaning: "Trượt tuyết" },
            { word: "国際", reading: "kokusai", meaning: "Quốc tế" },
            { word: "現金", reading: "genkin", meaning: "Tiền mặt" },
            { word: "趣味", reading: "shumi", meaning: "Sở thích" },
            { word: "日記", reading: "nikki", meaning: "Nhật ký" },
            { word: "祈り", reading: "inori", meaning: "Cầu nguyện" },
            { word: "課長", reading: "kachou", meaning: "Trưởng phòng" },
            { word: "部長", reading: "buchou", meaning: "Trưởng bộ phận" },
            { word: "社長", reading: "shachou", meaning: "Giám đốc" }
        ]
    },
    {
        id: "lesson19",
        title: "Bài 19: Kinh nghiệm & Trạng thái",
        items: [
            { word: "登ります", reading: "noborimasu", meaning: "Leo (núi)" },
            { word: "泊まります", reading: "tomarimasu", meaning: "Trọ (khách sạn)" },
            { word: "掃除します", reading: "soujishimasu", meaning: "Dọn dẹp" },
            { word: "洗濯します", reading: "sentakushimasu", meaning: "Giặt giũ" },
            { word: "練習します", reading: "renshuushimasu", meaning: "Luyện tập" },
            { word: "なります", reading: "narimasu", meaning: "Trở thành" },
            { word: "眠い", reading: "nemui", meaning: "Buồn ngủ" },
            { word: "強い", reading: "tsuyoi", meaning: "Mạnh" },
            { word: "弱い", reading: "yowai", meaning: "Yếu" },
            { word: "調子がいい", reading: "choushi ga ii", meaning: "Tình trạng tốt" },
            { word: "調子が悪い", reading: "choushi ga warui", meaning: "Tình trạng xấu" },
            { word: "一度", reading: "ichido", meaning: "Một lần" },
            { word: "一度も", reading: "ichido mo", meaning: "Chưa lần nào" },
            { word: "だんだn", reading: "dandan", meaning: "Dần dần" },
            { word: "もうすぐ", reading: "mousugu", meaning: "Sắp sửa" },
            { word: "おかげさまで", reading: "okagesama de", meaning: "Nhờ trời (cảm ơn)" },
            { word: "お茶", reading: "ocha", meaning: "Trà" },
            { word: "相撲", reading: "sumou", meaning: "Vật Sumou" }
        ]
    }
];
