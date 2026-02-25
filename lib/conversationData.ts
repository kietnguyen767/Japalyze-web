// lib/conversationData.ts

export type CharacterName = 'Aki' | 'Daigo' | 'Chiki' | 'Isora';

export type Segment = {
  text: string;
  furigana?: string; // Có furigana thì sẽ hiện tooltip
};

export type DialogueLine = {
  id: number;
  speaker: CharacterName;
  segments: Segment[];
  kana: string;
  romaji: string;
  meaning: string;
  isQuiz?: boolean;
  quizQuestion?: Segment[];
  quizOptions?: string[];
  correctOptionIndex?: number;
};

export type ConversationLesson = {
  id: string;
  title: string;
  description: string;
  characters: CharacterName[];
  prerequisites: string[];
  lines: DialogueLine[];
};

export const CONVERSATION_DATA: ConversationLesson[] = [
  // --- HỘI THOẠI 1: GIỚI THIỆU BẢN THÂN (MIN & NAM) ---
  {
    id: 'conv_1_intro',
    title: '1. Giới thiệu bản thân (自己紹介)',
    description: 'Hội thoại làm quen giữa Min (Aki đóng vai) và Nam (Daigo đóng vai).',
    characters: ['Aki', 'Daigo'], // Aki = Min, Daigo = Nam
    prerequisites: ['numbers', 'countries'],
    lines: [
      // 1. A: Hajimemashite
      {
        id: 1, speaker: 'Aki',
        segments: [{ text: "はじめまして。" }],
        kana: 'はじめまして。',
        romaji: 'Hajimemashite.',
        meaning: 'Rất vui được gặp bạn.'
      },

      // --- QUIZ 1: CÂU CHÀO (Câu 6 trong đề bài) ---
      {
        id: 2, speaker: 'Daigo', // Người hỏi
        isQuiz: true,
        quizQuestion: [
          { text: "クイズ: 初対面", furigana: "しょたいめん" }, { text: "のあいさつは？(Câu nào dùng khi lần đầu gặp mặt?)" }
        ],
        quizOptions: ['ありがとう (Cảm ơn)', 'はじめまして (Hajimemashite)', 'さようなら (Tạm biệt)'],
        correctOptionIndex: 1, // B. Hajimemashite
        segments: [{ text: "はじめまして。" }],
        kana: 'はじめまして。',
        romaji: 'Hajimemashite.',
        meaning: '💡 Giải thích: "Hajimemashite" là câu chào tiêu chuẩn khi gặp ai đó lần đầu tiên. "Arigatou" là cảm ơn, "Sayounara" là tạm biệt.'
      },

      // 3. A: Watashi wa Min desu
      {
        id: 3, speaker: 'Aki',
        segments: [{ text: "わたしはミンです。" }],
        kana: 'わたしはミンです。',
        romaji: 'Watashi wa Min desu.',
        meaning: 'Tôi là Min.'
      },

      // --- QUIZ 2: TRỢ TỪ WA (Câu 5 trong đề bài) ---
      {
        id: 4, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「わたしは...」の「は」は？(Trợ từ Ha dùng để làm gì?)" }
        ],
        quizOptions: ['Chỉ nơi chốn', 'Chỉ chủ đề câu', 'Chỉ thời gian'],
        correctOptionIndex: 1, // B. Chủ đề
        segments: [{ text: "わたしはナムです。" }],
        kana: 'わたしはナムです。',
        romaji: 'Watashi wa Namu desu.',
        meaning: '💡 Giải thích: Trợ từ "Wa" (viết là Ha) dùng để đánh dấu chủ đề của câu (ở đây chủ đề là "Tôi").'
      },

      // 5. A: Vietnam kara kimashita
      {
        id: 5, speaker: 'Aki',
        segments: [{ text: "ベトナムから" }, { text: "来", furigana: "き" }, { text: "ました。" }],
        kana: 'ベトナムからきました。',
        romaji: 'Betonamu kara kimashita.',
        meaning: 'Tôi đến từ Việt Nam.'
      },

      // --- QUIZ 3: ĐỘNG TỪ KIMASHITA (Câu 1 trong đề bài) ---
      {
        id: 6, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "来", furigana: "き" }, { text: "ました」の" }, { text: "辞書形", furigana: "じしょけい" }, { text: "は？(Dạng từ điển của Kimashita)" }
        ],
        quizOptions: ['来る (Kuru)', '行く (Iku)', '見る (Miru)'],
        correctOptionIndex: 0, // A. Kuru
        segments: [{ text: "「" }, { text: "来", furigana: "き" }, { text: "ました」は..." }],
        kana: 'きましたは...',
        romaji: 'Kimashita wa...',
        meaning: '💡 Giải thích: "Kimashita" là quá khứ lịch sự của "Kuru" (Đến). "Iku" là Đi, "Miru" là Nhìn.'
      },

      // --- QUIZ 4: TRỢ TỪ KARA (Câu 2 & 7 trong đề bài) ---
      {
        id: 7, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": ベトナム ____ " }, { text: "来", furigana: "き" }, { text: "ました。(Điền trợ từ)" }
        ],
        quizOptions: ['に (ni)', 'から (kara)', 'へ (he)'],
        correctOptionIndex: 1, // B. Kara
        segments: [{ text: "「から」は..." }],
        kana: 'からは...',
        romaji: 'Kara wa...',
        meaning: '💡 Giải thích: "Kara" nghĩa là "Từ", chỉ điểm xuất phát (Đến từ Việt Nam). Dùng để chỉ nơi chốn xuất phát.'
      },

      // 6. B: 16 sai desu
      {
        id: 8, speaker: 'Daigo',
        segments: [{ text: "16" }, { text: "歳", furigana: "さい" }, { text: "です。" }],
        kana: 'じゅうろくさいです。',
        romaji: 'Juu-roku sai desu.',
        meaning: 'Tôi 16 tuổi.'
      },

      // 7. A: Gakusei desu
      {
        id: 9, speaker: 'Aki',
        segments: [{ text: "学生", furigana: "がくせい" }, { text: "です。" }],
        kana: 'がくせいです。',
        romaji: 'Gakusei desu.',
        meaning: 'Tôi là học sinh.'
      },

      // --- QUIZ 5: TỪ VỰNG GAKUSEI (Câu 3 & 10 trong đề bài) ---
      {
        id: 10, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "学生", furigana: "がくせい" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？(Gakusei nghĩa là gì?)" }
        ],
        quizOptions: ['Giáo viên', 'Học sinh / Sinh viên', 'Nhân viên'],
        correctOptionIndex: 1, // B. Học sinh
        segments: [{ text: "「" }, { text: "学生", furigana: "がくせい" }, { text: "」ですね。" }],
        kana: 'がくせいですね。',
        romaji: 'Gakusei desu ne.',
        meaning: '💡 Giải thích: "Gakusei" là Học sinh/Sinh viên. Giáo viên là "Sensei", Nhân viên công ty là "Kaishain".'
      },

      // 8. B: Nihongo o benkyou shiteimasu
      {
        id: 11, speaker: 'Daigo',
        segments: [{ text: "日本語", furigana: "にほんご" }, { text: "を" }, { text: "勉強", furigana: "べんきょう" }, { text: "しています。" }],
        kana: 'にほんごをべんきょうしています。',
        romaji: 'Nihongo o benkyou shiteimasu.',
        meaning: 'Tôi đang học tiếng Nhật.'
      },

      // --- QUIZ 6: THÌ TIẾP DIỄN (Câu 4 & 8 trong đề bài) ---
      {
        id: 12, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "勉強", furigana: "べんきょう" }, { text: "しています」はどんな" }, { text: "時", furigana: "とき" }, { text: "？(Thì gì?)" }
        ],
        quizOptions: ['Quá khứ', 'Hiện tại tiếp diễn', 'Tương lai'],
        correctOptionIndex: 1, // B. Tiếp diễn
        segments: [{ text: "〜ています。" }],
        kana: 'て います。',
        romaji: '~Te imasu.',
        meaning: '💡 Giải thích: Mẫu câu "V-te imasu" diễn tả hành động đang diễn ra (đang học) hoặc một trạng thái kéo dài.'
      },

      // 9. A: Yoroshiku
      {
        id: 13, speaker: 'Aki',
        segments: [{ text: "よろしくお" }, { text: "願", furigana: "ねが" }, { text: "いします。" }],
        kana: 'よろしくおねがいします。',
        romaji: 'Yoroshiku onegaishimasu.',
        meaning: 'Rất mong được giúp đỡ.'
      },

      // 10. B: Yoroshiku
      {
        id: 14, speaker: 'Daigo',
        segments: [{ text: "よろしくお" }, { text: "願", furigana: "ねが" }, { text: "いします。" }],
        kana: 'よろしくおねがいします。',
        romaji: 'Yoroshiku onegaishimasu.',
        meaning: 'Tôi cũng vậy, rất mong được giúp đỡ.'
      },

      // --- PHẦN TRẮC NGHIỆM CUỐI BÀI (C/D - Comprehension) ---

      // Câu 11: Min đến từ đâu?
      {
        id: 15, speaker: 'Aki', // Min hỏi
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": ミンはどこの" }, { text: "国", furigana: "くに" }, { text: "から" }, { text: "来", furigana: "き" }, { text: "ましたか。(Min đến từ đâu?)" }
        ],
        quizOptions: ['日本 (Nhật)', 'ベトナム (Việt Nam)', '中国 (Trung Quốc)'],
        correctOptionIndex: 1, // B. Vietnam
        segments: [{ text: "正解", furigana: "せいかい" }, { text: "は..." }],
        kana: 'せいかいは...',
        romaji: 'Seikai wa...',
        meaning: '💡 Giải thích: Ở đầu bài, Min đã nói "Betonamu kara kimashita" (Tôi đến từ Việt Nam).'
      },

      // Câu 12: Nam bao nhiêu tuổi?
      {
        id: 16, speaker: 'Daigo', // Nam hỏi
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": ナムは" }, { text: "何歳", furigana: "なんさい" }, { text: "ですか。(Nam bao nhiêu tuổi?)" }
        ],
        quizOptions: ['15歳', '16歳', '17歳'],
        correctOptionIndex: 1, // B. 16
        segments: [{ text: "正解", furigana: "せいかい" }, { text: "は..." }],
        kana: 'せいかいは...',
        romaji: 'Seikai wa...',
        meaning: '💡 Giải thích: Nam đã giới thiệu "16-sai desu" (Tôi 16 tuổi).'
      },

      // Câu 13: Ý nghĩa Yoroshiku
      {
        id: 17, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "意味", furigana: "いみ" }, { text: ": 「よろしくお" }, { text: "願", furigana: "ねが" }, { text: "いします」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Xin lỗi', 'Rất vui được gặp bạn/Mong giúp đỡ', 'Tạm biệt'],
        correctOptionIndex: 1, // B
        segments: [{ text: "大切", furigana: "たいせつ" }, { text: "なあいさつです。" }],
        kana: 'たいせつなあいさつです。',
        romaji: 'Taisetsu na aisatsu desu.',
        meaning: '💡 Giải thích: Đây là câu chào quan trọng để kết thúc màn giới thiệu, thể hiện sự khiêm tốn và mong muốn xây dựng quan hệ tốt.'
      },

      // Câu 14: Ai học tiếng Nhật?
      {
        id: 18, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": " }, { text: "誰", furigana: "だれ" }, { text: "が" }, { text: "日本語", furigana: "にほんご" }, { text: "を" }, { text: "勉強", furigana: "べんきょう" }, { text: "していますか。(Ai đang học tiếng Nhật?)" }
        ],
        quizOptions: ['ミン (Min)', 'ナム (Nam)', '両方 (Cả hai)'], // Trong bài chỉ có Nam nói câu này
        correctOptionIndex: 1, // B. Nam
        segments: [{ text: "正解", furigana: "せいかい" }, { text: "は..." }],
        kana: 'せいかいは...',
        romaji: 'Seikai wa...',
        meaning: '💡 Giải thích: Trong đoạn hội thoại, chính Nam (nhân vật B) đã nói câu "Nihongo o benkyou shiteimasu".'
      }
    ]
  },

  // --- CÁC BÀI KHÁC (GIỮ NGUYÊN KHUNG ĐỂ TRÁNH LỖI) ---
  {
    id: 'conv_2_hometown',
    title: '2. Quê quán (出身)',
    description: 'Hội thoại giữa Isora và Aki về quê quán, nơi sinh sống hiện tại và gia đình.',
    characters: ['Isora', 'Aki'], // Isora = A, Aki = B
    prerequisites: ['family', 'countries'],
    lines: [
      // 1. A: Hỏi quê
      {
        id: 1, speaker: 'Isora',
        segments: [{ text: "あなたの" }, { text: "出身", furigana: "しゅっしん" }, { text: "はどこですか。" }],
        kana: 'あなたのしゅっしんはどこですか。',
        romaji: 'Anata no shusshin wa doko desu ka?',
        meaning: 'Quê quán của bạn ở đâu?'
      },

      // --- QUIZ 1: TỪ VỰNG SHUSSHIN (Câu 1) ---
      {
        id: 2, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "出身", furigana: "しゅっしん" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Nơi đang sống', 'Quê quán / Nơi sinh', 'Quốc tịch'],
        correctOptionIndex: 1, // B
        segments: [{ text: "「" }, { text: "出身", furigana: "しゅっしん" }, { text: "」は..." }],
        kana: 'しゅっしんは...',
        romaji: 'Shusshin wa...',
        meaning: '💡 Giải thích: "Shusshin" nghĩa là xuất thân, quê quán. Nơi đang sống là "Juusho", Quốc tịch là "Kokuseki".'
      },

      // --- QUIZ 2: MẪU CÂU HỎI NƠI Ở (Câu 6) ---
      {
        id: 3, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": " }, { text: "今", furigana: "いま" }, { text: "住", furigana: "す" }, { text: "んでいる" }, { text: "所", furigana: "ところ" }, { text: "を" }, { text: "聞", furigana: "き" }, { text: "く" }, { text: "質問", furigana: "しつもん" }, { text: "は？(Câu nào hỏi nơi đang sống?)" }
        ],
        quizOptions: ['出身はどこですか。', '今どこに住んでいますか。', '何さいですか。'],
        correctOptionIndex: 1, // B
        segments: [{ text: "質問", furigana: "しつもん" }, { text: "を選んでください。" }],
        kana: 'しつもんをえらんでください。',
        romaji: 'Shitsumon o erande kudasai.',
        meaning: '💡 Giải thích: Để hỏi nơi đang sống, dùng "Ima doko ni sundeimasu ka?". Câu A hỏi quê quán, câu C hỏi tuổi.'
      },

      // 2. B: Trả lời Hà Nội
      {
        id: 4, speaker: 'Aki',
        segments: [{ text: "わたしの" }, { text: "出身", furigana: "しゅっしん" }, { text: "はハノイです。" }],
        kana: 'わたしのしゅっしんはハノイです。',
        romaji: 'Watashi no shusshin wa Hanoi desu.',
        meaning: 'Quê tôi ở Hà Nội.'
      },

      // --- QUIZ 3: ĐIỀN TỪ (Câu 7) ---
      {
        id: 5, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "練習", furigana: "れんしゅう" }, { text: ": わたしの" }, { text: "出身", furigana: "しゅっしん" }, { text: "は ______ です。" }
        ],
        quizOptions: ['ハノイ', 'ホーチミン', 'ダナン'],
        correctOptionIndex: 0, // A. Hanoi
        segments: [{ text: "ハノイですね。" }],
        kana: 'ハノイですね。',
        romaji: 'Hanoi desu ne.',
        meaning: '💡 Giải thích: Aki vừa nói "Watashi no shusshin wa Hanoi desu".'
      },

      // 3. A: Hỏi nơi sống hiện tại
      {
        id: 6, speaker: 'Isora',
        segments: [{ text: "今", furigana: "いま" }, { text: "もハノイに" }, { text: "住", furigana: "す" }, { text: "んでいますか。" }],
        kana: 'いまもハノイにすんでいますか。',
        romaji: 'Ima mo Hanoi ni sundeimasu ka?',
        meaning: 'Bây giờ bạn vẫn sống ở Hà Nội à?'
      },

      // 4. B: Trả lời HCM
      {
        id: 7, speaker: 'Aki',
        segments: [{ text: "いいえ、" }, { text: "今", furigana: "いま" }, { text: "はホーチミンに" }, { text: "住", furigana: "す" }, { text: "んでいます。" }],
        kana: 'いいえ、いまはホーチミンにすんでいます。',
        romaji: 'Iie, ima wa Hochimin ni sundeimasu.',
        meaning: 'Không, bây giờ tôi sống ở Hồ Chí Minh.'
      },

      // --- QUIZ 4: TRỢ TỪ NI (Câu 2 & 8) ---
      {
        id: 8, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": ホーチミン ______ " }, { text: "住", furigana: "す" }, { text: "んでいます。(Điền trợ từ)" }
        ],
        quizOptions: ['に (ni) - Chỉ nơi chốn tồn tại', 'を (o) - Chỉ đối tượng', 'で (de) - Chỉ hành động tại đâu'],
        correctOptionIndex: 0, // A. Ni
        segments: [{ text: "「に」" }, { text: "住", furigana: "す" }, { text: "んでいます。" }],
        kana: 'に すんでいます。',
        romaji: 'Ni sundeimasu.',
        meaning: '💡 Giải thích: Với động từ "Sumimasu" (Sống), ta dùng trợ từ "Ni" để chỉ địa điểm cư trú.'
      },

      // --- QUIZ 5: THỂ TIẾP DIỄN (Câu 3) ---
      {
        id: 9, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "住", furigana: "す" }, { text: "んでいます」はどの" }, { text: "形", furigana: "かたち" }, { text: "？(Dạng gì?)" }
        ],
        quizOptions: ['Quá khứ', 'Hiện tại tiếp diễn', 'Mệnh lệnh'],
        correctOptionIndex: 1, // B
        segments: [{ text: "〜ています。" }],
        kana: 'て います。',
        romaji: '~Te imasu.',
        meaning: '💡 Giải thích: "Sundeimasu" (V-te imasu) là thì hiện tại tiếp diễn, chỉ trạng thái đang sinh sống kéo dài.'
      },

      // 5. A: Hỏi gia đình
      {
        id: 10, speaker: 'Isora',
        segments: [{ text: "家族", furigana: "かぞく" }, { text: "もハノイにいますか。" }],
        kana: 'かぞくもハノイにいますか。',
        romaji: 'Kazoku mo Hanoi ni imasu ka?',
        meaning: 'Gia đình bạn cũng ở Hà Nội à?'
      },

      // --- QUIZ 6: TRỢ TỪ MO (Câu 5) ---
      {
        id: 11, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "家族", furigana: "かぞく" }, { text: "も...」の「も」は？(Trợ từ Mo)" }
        ],
        quizOptions: ['Sự lựa chọn', 'Cũng / Nữa', 'Sở hữu'],
        correctOptionIndex: 1, // B
        segments: [{ text: "「も」は..." }],
        kana: 'もは...',
        romaji: 'Mo wa...',
        meaning: '💡 Giải thích: Trợ từ "Mo" nghĩa là "Cũng". (Tôi ở HN, gia đình CŨNG ở HN?).'
      },

      // 6. B: Trả lời gia đình
      {
        id: 12, speaker: 'Aki',
        segments: [{ text: "はい、" }, { text: "家族", furigana: "かぞく" }, { text: "はハノイにいます。" }],
        kana: 'はい、かぞくはハノイにいます。',
        romaji: 'Hai, kazoku wa Hanoi ni imasu.',
        meaning: 'Vâng, gia đình tôi ở Hà Nội.'
      },

      // --- QUIZ 7: GIA ĐÌNH Ở ĐÂU (Câu 10) ---
      {
        id: 13, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "確認", furigana: "かくにん" }, { text: ": " }, { text: "家族", furigana: "かぞく" }, { text: "はハノイにいますか。" }
        ],
        quizOptions: ['はい (Có)', 'いいえ (Không)'],
        correctOptionIndex: 0, // A. Hai
        segments: [{ text: "はい、います。" }],
        kana: 'はい、います。',
        romaji: 'Hai, imasu.',
        meaning: '💡 Giải thích: Aki đã xác nhận "Hai, kazoku wa Hanoi ni imasu".'
      },

      // 7. A: Hỏi nhộn nhịp
      {
        id: 14, speaker: 'Isora',
        segments: [{ text: "ハノイはにぎやかですか。" }],
        kana: 'ハノイはにぎやかですか。',
        romaji: 'Hanoi wa nigiyaka desu ka?',
        meaning: 'Hà Nội có nhộn nhịp không?'
      },

      // --- QUIZ 8: TÍNH TỪ NIGIYAKA (Câu 4) ---
      {
        id: 15, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「にぎやか」はどんな" }, { text: "種類", furigana: "しゅるい" }, { text: "？(Loại từ?)" }
        ],
        quizOptions: ['Danh từ', 'Tính từ đuôi I', 'Tính từ đuôi Na'],
        correctOptionIndex: 2, // C
        segments: [{ text: "な" }, { text: "形容詞", furigana: "けいようし" }, { text: "です。" }],
        kana: 'なけいようしです。',
        romaji: 'Na-keiyoushi desu.',
        meaning: '💡 Giải thích: "Nigiyaka" là tính từ đuôi Na. (Ví dụ: Nigiyaka na machi - Thành phố nhộn nhịp).'
      },

      // 8. B: Trả lời nhộn nhịp
      {
        id: 16, speaker: 'Aki',
        segments: [{ text: "はい、とてもにぎやかです。" }],
        kana: 'はい、とてもにぎやかです。',
        romaji: 'Hai, totemo nigiyaka desu.',
        meaning: 'Vâng, rất nhộn nhịp.'
      },

      // 9. A: Hỏi thích
      {
        id: 17, speaker: 'Isora',
        segments: [{ text: "ハノイが" }, { text: "好", furigana: "す" }, { text: "きですか。" }],
        kana: 'ハノイがすきですか。',
        romaji: 'Hanoi ga suki desu ka?',
        meaning: 'Bạn có thích Hà Nội không?'
      },

      // 10. B: Trả lời thích
      {
        id: 18, speaker: 'Aki',
        segments: [{ text: "はい、" }, { text: "好", furigana: "す" }, { text: "きです。" }],
        kana: 'はい、すきです。',
        romaji: 'Hai, suki desu.',
        meaning: 'Vâng, tôi thích.'
      },

      // --- PHẦN TRẮC NGHIỆM CUỐI BÀI (C/D - Comprehension) ---

      // Câu 11: Quê Aki ở đâu?
      {
        id: 19, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": B(Aki)の" }, { text: "出身", furigana: "しゅっしん" }, { text: "はどこですか。" }
        ],
        quizOptions: ['ハノイ', 'ホーチミン', 'ダナン'],
        correctOptionIndex: 0, // A. Hanoi
        segments: [{ text: "正解", furigana: "せいかい" }, { text: "は..." }],
        kana: 'せいかいは...',
        romaji: 'Seikai wa...',
        meaning: '💡 Giải thích: Aki nói "Watashi no shusshin wa Hanoi desu" (Quê tôi ở Hà Nội).'
      },

      // Câu 12: Bây giờ Aki sống ở đâu?
      {
        id: 20, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": " }, { text: "今", furigana: "いま" }, { text: "、B(Aki)はどこに" }, { text: "住", furigana: "す" }, { text: "んでいますか。" }
        ],
        quizOptions: ['ハノイ', 'ホーチミン', 'フエ'],
        correctOptionIndex: 1, // B. HCM
        segments: [{ text: "今", furigana: "いま" }, { text: "は..." }],
        kana: 'いまは...',
        romaji: 'Ima wa...',
        meaning: '💡 Giải thích: Aki nói "Ima wa Ho Chi Min ni sundeimasu" (Bây giờ sống ở HCM).'
      },

      // Câu 13: Nghĩa của Nigiyaka
      {
        id: 21, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「にぎやか」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Yên tĩnh (Shizuka)', 'Đông đúc, nhộn nhịp', 'Rộng rãi (Hiroi)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "意味", furigana: "いみ" }, { text: "ですね。" }],
        kana: 'いみですね。',
        romaji: 'Imi desu ne.',
        meaning: '💡 Giải thích: "Nigiyaka" nghĩa là náo nhiệt, đông đúc. Trái nghĩa với "Shizuka" (Yên tĩnh).'
      },

      // Câu 14: Aki có thích HN không?
      {
        id: 22, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": B(Aki)はハノイが" }, { text: "好", furigana: "す" }, { text: "きですか。" }
        ],
        quizOptions: ['はい、好きです', 'いいえ、好きではありません', 'わかりません'],
        correctOptionIndex: 0, // A
        segments: [{ text: "答", furigana: "こた" }, { text: "えは..." }],
        kana: 'こたえは...',
        romaji: 'Kotae wa...',
        meaning: '💡 Giải thích: Ở câu cuối, Aki đã trả lời dứt khoát "Hai, suki desu" (Vâng, tôi thích).'
      }
    ]
  },
  {
    id: 'conv_3_friends',
    title: '3. Bạn thân (親友)',
    description: 'Chiki kể cho Isora nghe về người bạn thân tên Lin.',
    characters: ['Isora', 'Chiki'], // Isora = A, Chiki = B
    prerequisites: ['school', 'casual'],
    lines: [
      // 1. A: Hỏi có bạn thân không
      {
        id: 1, speaker: 'Isora',
        segments: [{ text: "あなたには" }, { text: "親友", furigana: "しんゆう" }, { text: "がいますか。" }],
        kana: 'あなたにはしんゆうがいますか。',
        romaji: 'Anata niwa shinyuu ga imasu ka?',
        meaning: 'Bạn có bạn thân không?'
      },

      // --- QUIZ 1: TỪ VỰNG SHINYUU (Câu 1) ---
      {
        id: 2, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "親友", furigana: "しんゆう" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Bạn học (Doukyuusei)', 'Bạn thân', 'Hàng xóm (Tonari no hito)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "意味", furigana: "いみ" }, { text: "は..." }],
        kana: 'いみは...',
        romaji: 'Imi wa...',
        meaning: '💡 Giải thích: "Shinyuu" (Thân hữu) nghĩa là bạn thân. Bạn bè bình thường là "Tomodachi".'
      },

      // 2. B: Trả lời có
      {
        id: 3, speaker: 'Chiki',
        segments: [{ text: "はい、います。" }],
        kana: 'はい、います。',
        romaji: 'Hai, imasu.',
        meaning: 'Vâng, có ạ.'
      },

      // --- QUIZ 2: TRỢ TỪ GA (Câu 2 & 7) ---
      {
        id: 4, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": " }, { text: "親友", furigana: "しんゆう" }, { text: " ______ います。(Điền trợ từ)" }
        ],
        quizOptions: ['は (wa) - Chủ đề', 'が (ga) - Sự tồn tại', 'に (ni) - Nơi chốn'],
        correctOptionIndex: 1, // B
        segments: [{ text: "「が」ですね。" }],
        kana: 'がですね。',
        romaji: 'Ga desu ne.',
        meaning: '💡 Giải thích: Với động từ "Imasu/Arimasu" (Có/Tồn tại), ta dùng trợ từ "Ga" để chỉ đối tượng tồn tại.'
      },

      // 3. A: Hỏi tên
      {
        id: 5, speaker: 'Isora',
        segments: [{ text: "親友", furigana: "しんゆう" }, { text: "の" }, { text: "名前", furigana: "なまえ" }, { text: "は" }, { text: "何", furigana: "なん" }, { text: "ですか。" }],
        kana: 'しんゆうのなまえはなんですか。',
        romaji: 'Shinyuu no namae wa nan desu ka?',
        meaning: 'Tên bạn thân là gì?'
      },

      // 4. B: Trả lời Lin
      {
        id: 6, speaker: 'Chiki',
        segments: [{ text: "リンです。" }],
        kana: 'リンです。',
        romaji: 'Rin desu.',
        meaning: 'Là Lin.'
      },

      // 5. A: Hỏi tuổi
      {
        id: 7, speaker: 'Isora',
        segments: [{ text: "リンさんは" }, { text: "何歳", furigana: "なんさい" }, { text: "ですか。" }],
        kana: 'リンさんはなんさいですか。',
        romaji: 'Rin-san wa nansai desu ka?',
        meaning: 'Lin bao nhiêu tuổi?'
      },

      // 6. B: Trả lời 17
      {
        id: 8, speaker: 'Chiki',
        segments: [{ text: "17" }, { text: "歳", furigana: "さい" }, { text: "です。" }],
        kana: 'じゅうななさいです。',
        romaji: 'Juu-nana sai desu.',
        meaning: 'Bạn ấy 17 tuổi.'
      },

      // 7. A: Hỏi tính cách
      {
        id: 9, speaker: 'Isora',
        segments: [{ text: "リンさんはどんな" }, { text: "人", furigana: "ひと" }, { text: "ですか。" }],
        kana: 'リンさんはどんなひとですか。',
        romaji: 'Rin-san wa donna hito desu ka?',
        meaning: 'Lin là người thế nào?'
      },

      // --- QUIZ 3: DONNA HITO (Câu 3) ---
      {
        id: 10, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「どんな" }, { text: "人", furigana: "ひと" }, { text: "」は" }, { text: "何", furigana: "なに" }, { text: "を" }, { text: "聞", furigana: "き" }, { text: "きますか？" }
        ],
        quizOptions: ['Tuổi tác', 'Nghề nghiệp', 'Tính cách / Đặc điểm'],
        correctOptionIndex: 2, // C
        segments: [{ text: "性格", furigana: "せいかく" }, { text: "について..." }],
        kana: 'せいかくについて...',
        romaji: 'Seikaku ni tsuite...',
        meaning: '💡 Giải thích: "Donna hito" dùng để hỏi về tính cách, đặc điểm của một người.'
      },

      // 8. B: Trả lời hiền và chăm chỉ
      {
        id: 11, speaker: 'Chiki',
        segments: [{ text: "やさしくて、まじめな" }, { text: "人", furigana: "ひと" }, { text: "です。" }],
        kana: 'やさしくて、まじめなひとです。',
        romaji: 'Yasashikute, majime na hito desu.',
        meaning: 'Là người hiền lành và chăm chỉ.'
      },

      // --- QUIZ 4: NỐI TÍNH TỪ (Câu 4) ---
      {
        id: 12, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「やさしくて、まじめな...」の" }, { text: "形", furigana: "かたち" }, { text: "は？" }
        ],
        quizOptions: ['Danh từ + desu', 'Tính từ + desu', 'Nối nhiều tính từ (Thể Te)'],
        correctOptionIndex: 2, // C
        segments: [{ text: "形容詞", furigana: "けいようし" }, { text: "をつなぐ" }, { text: "形", furigana: "かたち" }, { text: "。" }],
        kana: 'けいようしをつなぐかたち。',
        romaji: 'Keiyoushi o tsunagu katachi.',
        meaning: '💡 Giải thích: "Yasashii" (đuôi i) đổi thành "Yasashikute" để nối với tính từ tiếp theo.'
      },

      // --- QUIZ 5: ĐIỀN TỪ MAJIME (Câu 8) ---
      {
        id: 13, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "練習", furigana: "れんしゅう" }, { text: ": やさしくて、 ______ な" }, { text: "人", furigana: "ひと" }, { text: "です。" }
        ],
        quizOptions: ['まじめ (Majime)', 'げんき (Genki)', 'ゆうめい (Yuumei)'],
        correctOptionIndex: 0, // A
        segments: [{ text: "まじめな" }, { text: "人", furigana: "ひと" }, { text: "ですね。" }],
        kana: 'まじめなひとですね。',
        romaji: 'Majime na hito desu ne.',
        meaning: '💡 Giải thích: Chiki vừa mô tả Lin là người chăm chỉ/nghiêm túc (Majime).'
      },

      // 9. A: Hỏi học cùng nhau
      {
        id: 14, speaker: 'Isora',
        segments: [{ text: "いつも" }, { text: "一緒", furigana: "いっしょ" }, { text: "に" }, { text: "勉強", furigana: "べんきょう" }, { text: "しますか。" }],
        kana: 'いつもいっしょにべんきょうしますか。',
        romaji: 'Itsumo issho ni benkyou shimasu ka?',
        meaning: 'Các bạn có luôn học cùng nhau không?'
      },

      // --- QUIZ 6: ISSHO NI (Câu 5) ---
      {
        id: 15, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "一緒", furigana: "いっしょ" }, { text: "に」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Một mình (Hitori de)', 'Cùng nhau', 'Nhanh chóng (Hayaku)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "意味", furigana: "いみ" }, { text: "は..." }],
        kana: 'いみは...',
        romaji: 'Imi wa...',
        meaning: '💡 Giải thích: "Issho ni" nghĩa là làm gì đó cùng nhau.'
      },

      // 10. B: Trả lời thường xuyên
      {
        id: 16, speaker: 'Chiki',
        segments: [{ text: "はい、よく" }, { text: "一緒", furigana: "いっしょ" }, { text: "に" }, { text: "勉強", furigana: "べんきょう" }, { text: "します。" }],
        kana: 'はい、よくいっしょにべんきょうします。',
        romaji: 'Hai, yoku issho ni benkyou shimasu.',
        meaning: 'Vâng, chúng tôi thường xuyên học cùng nhau.'
      },

      // --- QUIZ 7: YOKU (Câu 6) ---
      {
        id: 17, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「よく」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Hiếm khi (Amari)', 'Thường xuyên/Hay', 'Không bao giờ (Zenzen)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "頻度", furigana: "ひんど" }, { text: "を" }, { text: "表", furigana: "あらわ" }, { text: "します。" }],
        kana: 'ひんどをあらわします。',
        romaji: 'Hindo o arawashimasu.',
        meaning: '💡 Giải thích: "Yoku" là phó từ chỉ tần suất cao (Thường xuyên, hay).'
      },

      // --- PHẦN TRẮC NGHIỆM CUỐI BÀI (C/D) ---

      // Câu 11: Tên
      {
        id: 18, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": " }, { text: "親友", furigana: "しんゆう" }, { text: "の" }, { text: "名前", furigana: "なまえ" }, { text: "は？" }
        ],
        quizOptions: ['リン (Lin)', 'ミン (Min)', 'ナム (Nam)'],
        correctOptionIndex: 0, // A
        segments: [{ text: "正解", furigana: "せいかい" }, { text: "は..." }],
        kana: 'せいかいは...',
        romaji: 'Seikai wa...',
        meaning: '💡 Giải thích: Tên bạn thân là Lin.'
      },

      // Câu 12: Tuổi
      {
        id: 19, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": リンさんは" }, { text: "何歳", furigana: "なんさい" }, { text: "ですか。" }
        ],
        quizOptions: ['16歳', '17歳', '18歳'],
        correctOptionIndex: 1, // B
        segments: [{ text: "答", furigana: "こた" }, { text: "えは..." }],
        kana: 'こたえは...',
        romaji: 'Kotae wa...',
        meaning: '💡 Giải thích: Lin 17 tuổi.'
      },

      // Câu 13: Nghĩa Majime
      {
        id: 20, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「まじめ」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Vui vẻ', 'Chăm chỉ / Nghiêm túc', 'Lười biếng'],
        correctOptionIndex: 1, // B
        segments: [{ text: "性格", furigana: "せいかく" }, { text: "ですね。" }],
        kana: 'せいかくですね。',
        romaji: 'Seikaku desu ne.',
        meaning: '💡 Giải thích: "Majime" là tính từ đuôi Na, chỉ người nghiêm túc, chăm chỉ.'
      },

      // Câu 14: Tính cách Lin
      {
        id: 21, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": リンさんについて" }, { text: "正", furigana: "ただ" }, { text: "しいのは？(Điều nào đúng?)" }
        ],
        quizOptions: ['Hiền và Chăm chỉ', 'Ồn ào và Khỏe mạnh', 'Yên lặng và Đáng sợ'],
        correctOptionIndex: 0, // A
        segments: [{ text: "最後", furigana: "さいご" }, { text: "の" }, { text: "問題", furigana: "もんだい" }, { text: "です。" }],
        kana: 'さいごのもんだいです。',
        romaji: 'Saigo no mondai desu.',
        meaning: '💡 Giải thích: Chiki đã mô tả: "Yasashikute, majime na hito" (Hiền và chăm chỉ).'
      }
    ]
  },
  // --- HỘI THOẠI 4: MÔN HỌC YÊU THÍCH (AKI & ISORA) ---
  {
    id: 'conv_4_subject',
    title: '4. Môn học yêu thích (好きな科目)',
    description: 'Hội thoại về môn học yêu thích, lý do thích và việc học tập hàng ngày.',
    characters: ['Aki', 'Isora'], // Aki = A, Isora = B
    prerequisites: ['school', 'routine'],
    lines: [
      // 1. A: Hỏi môn học
      {
        id: 1, speaker: 'Aki',
        segments: [{ text: "あなたはどんな" }, { text: "科目", furigana: "かもく" }, { text: "が" }, { text: "好", furigana: "す" }, { text: "きですか。" }],
        kana: 'あなたはどんなかもくがすきですか。',
        romaji: 'Anata wa donna kamoku ga suki desu ka?',
        meaning: 'Bạn thích môn học nào?'
      },

      // --- QUIZ 1: TỪ VỰNG KAMOKU (Câu 1) ---
      {
        id: 2, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "科目", furigana: "かもく" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Lớp học (Kurasu)', 'Môn học', 'Bài kiểm tra (Tesuto)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "意味", furigana: "いみ" }, { text: "は..." }],
        kana: 'いみは...',
        romaji: 'Imi wa...',
        meaning: '💡 Giải thích: "Kamoku" nghĩa là Môn học (Toán, Lý, Tiếng Nhật...). Lớp học là "Kyoushitsu/Kurasu".'
      },

      // 2. B: Trả lời Tiếng Nhật
      {
        id: 3, speaker: 'Isora',
        segments: [{ text: "日本語", furigana: "にほんご" }, { text: "が" }, { text: "好", furigana: "す" }, { text: "きです。" }],
        kana: 'にほんごがすきです。',
        romaji: 'Nihongo ga suki desu.',
        meaning: 'Tôi thích tiếng Nhật.'
      },

      // --- QUIZ 2: TRỢ TỪ GA (Câu 2 & 7) ---
      {
        id: 4, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 日本語" }, { text: " ______ " }, { text: "好", furigana: "す" }, { text: "きです。(Điền trợ từ)" }
        ],
        quizOptions: ['は (wa) - Chủ đề chung', 'が (ga) - Đối tượng được thích', 'に (ni) - Nơi chốn'],
        correctOptionIndex: 1, // B
        segments: [{ text: "「が」ですね。" }],
        kana: 'がですね。',
        romaji: 'Ga desu ne.',
        meaning: '💡 Giải thích: Với tính từ chỉ sở thích/năng lực (Suki, Kirai, Jouzu...), ta dùng trợ từ "Ga" để chỉ đối tượng.'
      },

      // 3. A: Hỏi tại sao
      {
        id: 5, speaker: 'Aki',
        segments: [{ text: "どうして" }, { text: "日本語", furigana: "にほんご" }, { text: "が" }, { text: "好", furigana: "す" }, { text: "きですか。" }],
        kana: 'どうしてにほんごがすきですか。',
        romaji: 'Doushite Nihongo ga suki desu ka?',
        meaning: 'Tại sao bạn thích tiếng Nhật?'
      },

      // --- QUIZ 3: DOUSHITE (Câu 3 & 13) ---
      {
        id: 6, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「どうして」は" }, { text: "何", furigana: "なに" }, { text: "を" }, { text: "聞", furigana: "き" }, { text: "きますか？" }
        ],
        quizOptions: ['Khi nào (Itsu)', 'Ở đâu (Doko)', 'Tại sao'],
        correctOptionIndex: 2, // C
        segments: [{ text: "理由", furigana: "りゆう" }, { text: "を..." }],
        kana: 'りゆうを...',
        romaji: 'Riyuu o...',
        meaning: '💡 Giải thích: "Doushite" dùng để hỏi lý do/nguyên nhân (Tại sao?).'
      },

      // 4. B: Trả lời vì giáo viên hiền
      {
        id: 7, speaker: 'Isora',
        segments: [{ text: "先生", furigana: "せんせい" }, { text: "がやさしいからです。" }],
        kana: 'せんせいがやさしいからです。',
        romaji: 'Sensei ga yasashii kara desu.',
        meaning: 'Vì giáo viên hiền ạ.'
      },

      // --- QUIZ 4: KARA DESU (Câu 4 & 8) ---
      {
        id: 8, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「～からです」は" }, { text: "何", furigana: "なに" }, { text: "を" }, { text: "表", furigana: "あらわ" }, { text: "しますか？" }
        ],
        quizOptions: ['Kết quả', 'Nguyên nhân / Lý do', 'Thứ tự'],
        correctOptionIndex: 1, // B
        segments: [{ text: "理由", furigana: "りゆう" }, { text: "です。" }],
        kana: 'りゆうです。',
        romaji: 'Riyuu desu.',
        meaning: '💡 Giải thích: Cấu trúc "...kara desu" đứng cuối câu để giải thích nguyên nhân (Vì là...).'
      },

      // 5. A: Hỏi thú vị không
      {
        id: 9, speaker: 'Aki',
        segments: [{ text: "日本語", furigana: "にほんご" }, { text: "の" }, { text: "授業", furigana: "じゅぎょう" }, { text: "はおもしろいですか。" }],
        kana: 'にほんごのじゅぎょうはおもしろいですか。',
        romaji: 'Nihongo no jugyou wa omoshiroi desu ka?',
        meaning: 'Giờ học tiếng Nhật có thú vị không?'
      },

      // --- QUIZ 5: OMOSHIROI (Câu 5) ---
      {
        id: 10, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「おもしろい」はどの" }, { text: "種類", furigana: "しゅるい" }, { text: "？(Loại từ?)" }
        ],
        quizOptions: ['Danh từ', 'Tính từ đuôi I', 'Tính từ đuôi Na'],
        correctOptionIndex: 1, // B
        segments: [{ text: "い" }, { text: "形容詞", furigana: "けいようし" }, { text: "です。" }],
        kana: 'いけいようしです。',
        romaji: 'I-keiyoushi desu.',
        meaning: '💡 Giải thích: "Omoshiroi" kết thúc bằng "i", là tính từ đuôi I (Thú vị).'
      },

      // 6. B: Trả lời rất thú vị
      {
        id: 11, speaker: 'Isora',
        segments: [{ text: "はい、とてもおもしろいです。" }],
        kana: 'はい、とてもおもしろいです。',
        romaji: 'Hai, totemo omoshiroi desu.',
        meaning: 'Vâng, rất thú vị.'
      },

      // 7. A: Hỏi học mỗi ngày không
      {
        id: 12, speaker: 'Aki',
        segments: [{ text: "毎日", furigana: "まいにち" }, { text: "、" }, { text: "日本語", furigana: "にほんご" }, { text: "を" }, { text: "勉強", furigana: "べんきょう" }, { text: "しますか。" }],
        kana: 'まいにち、にほんごをべんきょうしますか。',
        romaji: 'Mainichi, nihongo o benkyou shimasu ka?',
        meaning: 'Bạn có học tiếng Nhật mỗi ngày không?'
      },

      // 8. B: Trả lời có
      {
        id: 13, speaker: 'Isora',
        segments: [{ text: "はい、" }, { text: "毎日", furigana: "まいにち" }, { text: "勉強", furigana: "べんきょう" }, { text: "します。" }],
        kana: 'はい、まいにちべんきょうします。',
        romaji: 'Hai, mainichi benkyou shimasu.',
        meaning: 'Vâng, tôi học mỗi ngày.'
      },

      // 9. A: Hỏi bài kiểm tra
      {
        id: 14, speaker: 'Aki',
        segments: [{ text: "テストはむずかしいですか。" }],
        kana: 'テストはむずかしいですか。',
        romaji: 'Tesuto wa muzukashii desu ka?',
        meaning: 'Bài kiểm tra có khó không?'
      },

      // 10. B: Trả lời không khó lắm
      {
        id: 15, speaker: 'Isora',
        segments: [{ text: "いいえ、あまりむずかしくないです。" }],
        kana: 'いいえ、あまりむずかしくないです。',
        romaji: 'Iie, amari muzukashikunai desu.',
        meaning: 'Không, không khó lắm đâu.'
      },

      // --- QUIZ 6: PHỦ ĐỊNH TÍNH TỪ I (Câu 6 & 14) ---
      {
        id: 16, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「むずかしくない」はどの" }, { text: "形", furigana: "かたち" }, { text: "？(Dạng gì?)" }
        ],
        quizOptions: ['Khẳng định', 'Phủ định của tính từ I', 'Quá khứ'],
        correctOptionIndex: 1, // B
        segments: [{ text: "否定形", furigana: "ひていけい" }, { text: "です。" }],
        kana: 'ひていけいです。',
        romaji: 'Hiteikei desu.',
        meaning: '💡 Giải thích: "Muzukashii" (Khó) -> Phủ định là "Muzukashikunai" (Không khó). Bỏ "i" thêm "kunai".'
      },

      // --- PHẦN TRẮC NGHIỆM CUỐI BÀI (C/D) ---

      // Câu 11: B thích môn gì
      {
        id: 17, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": B(Isora)はどんな" }, { text: "科目", furigana: "かもく" }, { text: "が" }, { text: "好", furigana: "す" }, { text: "きですか。" }
        ],
        quizOptions: ['数学 (Toán)', '日本語 (Tiếng Nhật)', '英語 (Tiếng Anh)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "正解", furigana: "せいかい" }, { text: "は..." }],
        kana: 'せいかいは...',
        romaji: 'Seikai wa...',
        meaning: '💡 Giải thích: Isora đã nói "Nihongo ga suki desu".'
      },

      // Câu 12: Lớp học thế nào
      {
        id: 18, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": 日本語" }, { text: "の" }, { text: "授業", furigana: "じゅぎょう" }, { text: "はどうですか。" }
        ],
        quizOptions: ['Chán (Tsumaranai)', 'Thú vị (Omoshiroi)', 'Khó (Muzukashii)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "感想", furigana: "かんそう" }, { text: "は..." }],
        kana: 'かんそうは...',
        romaji: 'Kansou wa...',
        meaning: '💡 Giải thích: Isora nhận xét "Totemo omoshiroi desu" (Rất thú vị).'
      },

      // Câu 9 (Bài tập): Tại sao thích?
      {
        id: 19, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": どうして" }, { text: "好", furigana: "す" }, { text: "きですか。(Tại sao thích?)" }
        ],
        quizOptions: ['Vì giáo viên hiền', 'Vì bài kiểm tra dễ', 'Vì lớp học vui'],
        correctOptionIndex: 0, // A
        segments: [{ text: "理由", furigana: "りゆう" }, { text: "は..." }],
        kana: 'りゆうは...',
        romaji: 'Riyuu wa...',
        meaning: '💡 Giải thích: Isora nói "Sensei ga yasashii kara desu" (Vì giáo viên hiền).'
      },

      // Câu 10 (Bài tập): Học mỗi ngày?
      {
        id: 20, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": " }, { text: "毎日勉強", furigana: "まいにちべんきょう" }, { text: "しますか。(Có học mỗi ngày không?)" }
        ],
        quizOptions: ['Có, mỗi ngày', 'Không, hiếm khi', 'Chỉ cuối tuần'],
        correctOptionIndex: 0, // A
        segments: [{ text: "最後", furigana: "さいご" }, { text: "の" }, { text: "質問", furigana: "しつもん" }, { text: "です。" }],
        kana: 'さいごのしつもんです。',
        romaji: 'Saigo no shitsumon desu.',
        meaning: '💡 Giải thích: Isora xác nhận "Hai, mainichi benkyou shimasu".'
      }
    ]
  },
  // --- HỘI THOẠI 5: CÔNG VIỆC (DAIGO & ISORA) ---
  {
    id: 'conv_5_job',
    title: '5. Công việc (仕事)',
    description: 'Hội thoại hỏi thăm về công việc, nơi làm việc và mức độ bận rộn.',
    characters: ['Daigo', 'Isora'], // Daigo = A, Isora = B
    prerequisites: ['jobs'],
    lines: [
      // 1. A: Hỏi đang làm việc không
      {
        id: 1, speaker: 'Daigo',
        segments: [{ text: "今", furigana: "いま" }, { text: "、" }, { text: "仕事", furigana: "しごと" }, { text: "をしていますか。" }],
        kana: 'いま、しごとをしていますか。',
        romaji: 'Ima, shigoto o shiteimasu ka?',
        meaning: 'Bây giờ bạn có đang đi làm không?'
      },

      // 2. B: Trả lời có
      {
        id: 2, speaker: 'Isora',
        segments: [{ text: "はい、しています。" }],
        kana: 'はい、しています。',
        romaji: 'Hai, shiteimasu.',
        meaning: 'Vâng, tôi có.'
      },

      // --- QUIZ 1: TỪ VỰNG SHIGOTO (Câu 1) ---
      {
        id: 3, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "仕事", furigana: "しごと" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Học tập (Benkyou)', 'Công việc', 'Nghỉ ngơi (Yasumi)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "意味", furigana: "いみ" }, { text: "は..." }],
        kana: 'いみは...',
        romaji: 'Imi wa...',
        meaning: '💡 Giải thích: "Shigoto" nghĩa là Công việc. Học tập là "Benkyou", Nghỉ ngơi là "Yasumi".'
      },

      // 3. A: Hỏi làm việc gì
      {
        id: 4, speaker: 'Daigo',
        segments: [{ text: "どんな" }, { text: "仕事", furigana: "しごと" }, { text: "をしていますか。" }],
        kana: 'どんなしごとをしていますか。',
        romaji: 'Donna shigoto o shiteimasu ka?',
        meaning: 'Bạn đang làm công việc gì?'
      },

      // --- QUIZ 2: TRỢ TỪ O (Câu 2) ---
      {
        id: 5, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "仕事", furigana: "しごと" }, { text: "をしています」の「を」は？" }
        ],
        quizOptions: ['Chỉ nơi chốn', 'Chỉ đối tượng hành động', 'Chỉ thời gian'],
        correctOptionIndex: 1, // B
        segments: [{ text: "「を」の" }, { text: "働", furigana: "はたら" }, { text: "き..." }],
        kana: 'をのはたらき...',
        romaji: 'O no hataraki...',
        meaning: '💡 Giải thích: Trợ từ "O" (Wo) dùng để chỉ đối tượng chịu tác động của hành động (Làm cái gì? -> Làm công việc).'
      },

      // 4. B: Trả lời nhân viên cty
      {
        id: 6, speaker: 'Isora',
        segments: [{ text: "会社員", furigana: "かいしゃいん" }, { text: "です。" }],
        kana: 'かいしゃいんです。',
        romaji: 'Kaishain desu.',
        meaning: 'Tôi là nhân viên công ty.'
      },

      // --- QUIZ 3: TỪ VỰNG KAISHAIN (Câu 4) ---
      {
        id: 7, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "会社員", furigana: "かいしゃいん" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Học sinh (Gakusei)', 'Nhân viên công ty', 'Giáo viên (Kyoushi)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "職業", furigana: "しょくぎょう" }, { text: "です。" }],
        kana: 'しょくぎょうです。',
        romaji: 'Shokugyou desu.',
        meaning: '💡 Giải thích: "Kaisha" (Công ty) + "In" (Thành viên) -> "Kaishain" là nhân viên công ty.'
      },

      // 5. A: Hỏi làm ở đâu
      {
        id: 8, speaker: 'Daigo',
        segments: [{ text: "どこで" }, { text: "働", furigana: "はたら" }, { text: "いていますか。" }],
        kana: 'どこではたらいていますか。',
        romaji: 'Doko de hataraite imasu ka?',
        meaning: 'Bạn làm việc ở đâu?'
      },

      // --- QUIZ 4: THỂ TIẾP DIỄN (Câu 3) ---
      {
        id: 9, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "働", furigana: "はたら" }, { text: "いています」はどの" }, { text: "形", furigana: "かたち" }, { text: "？" }
        ],
        quizOptions: ['Quá khứ', 'Hiện tại tiếp diễn', 'Mệnh lệnh'],
        correctOptionIndex: 1, // B
        segments: [{ text: "〜ています。" }],
        kana: 'て います。',
        romaji: '~Te imasu.',
        meaning: '💡 Giải thích: "Hataraite imasu" (V-te imasu) diễn tả trạng thái công việc đang diễn ra hiện tại.'
      },

      // 6. B: Trả lời Cty Hà Nội
      {
        id: 10, speaker: 'Isora',
        segments: [{ text: "ハノイの" }, { text: "会社", furigana: "かいしゃ" }, { text: "で" }, { text: "働", furigana: "はたら" }, { text: "いています。" }],
        kana: 'ハノイのかいしゃではたらいています。',
        romaji: 'Hanoi no kaisha de hataraite imasu.',
        meaning: 'Tôi làm việc tại một công ty ở Hà Nội.'
      },

      // 7. A: Hỏi bận không
      {
        id: 11, speaker: 'Daigo',
        segments: [{ text: "仕事", furigana: "しごと" }, { text: "は" }, { text: "忙", furigana: "いそが" }, { text: "しいですか。" }],
        kana: 'しごとはいそがしいですか。',
        romaji: 'Shigoto wa isogashii desu ka?',
        meaning: 'Công việc có bận không?'
      },

      // --- QUIZ 5: TÍNH TỪ ISOGASHII (Câu 5) ---
      {
        id: 12, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "忙", furigana: "いそが" }, { text: "しい」はどの" }, { text: "種類", furigana: "しゅるい" }, { text: "？" }
        ],
        quizOptions: ['Tính từ đuôi Na', 'Tính từ đuôi I', 'Danh từ'],
        correctOptionIndex: 1, // B
        segments: [{ text: "「い」で" }, { text: "終", furigana: "お" }, { text: "わる..." }],
        kana: 'いでおわる...',
        romaji: 'I de owaru...',
        meaning: '💡 Giải thích: "Isogashii" kết thúc bằng "i", là tính từ đuôi I (Bận rộn).'
      },

      // 8. B: Trả lời hơi bận
      {
        id: 13, speaker: 'Isora',
        segments: [{ text: "はい、" }, { text: "少", furigana: "すこ" }, { text: "し" }, { text: "忙", furigana: "いそが" }, { text: "しいです。" }],
        kana: 'はい、すこしいそがしいです。',
        romaji: 'Hai, sukoshi isogashii desu.',
        meaning: 'Vâng, hơi bận một chút.'
      },

      // --- QUIZ 6: SUKOSHI (Câu 6) ---
      {
        id: 14, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "少", furigana: "すこ" }, { text: "し」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Rất (Totemo)', 'Ít / Một chút', 'Luôn luôn (Itsumo)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "程度", furigana: "ていど" }, { text: "は..." }],
        kana: 'ていどは...',
        romaji: 'Teido wa...',
        meaning: '💡 Giải thích: "Sukoshi" nghĩa là một chút, một ít. Trái nghĩa với "Takusan" (Nhiều).'
      },

      // 9. A: Hỏi thích không
      {
        id: 15, speaker: 'Daigo',
        segments: [{ text: "仕事", furigana: "しごと" }, { text: "は" }, { text: "好", furigana: "す" }, { text: "きですか。" }],
        kana: 'しごとはすきですか。',
        romaji: 'Shigoto wa suki desu ka?',
        meaning: 'Bạn có thích công việc không?'
      },

      // 10. B: Trả lời thích
      {
        id: 16, speaker: 'Isora',
        segments: [{ text: "はい、" }, { text: "好", furigana: "す" }, { text: "きです。" }],
        kana: 'はい、すきです。',
        romaji: 'Hai, suki desu.',
        meaning: 'Vâng, tôi thích.'
      },

      // --- PHẦN TRẮC NGHIỆM CUỐI BÀI (D) ---

      // Câu 11: Làm nghề gì
      {
        id: 17, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": B(Isora)の" }, { text: "仕事", furigana: "しごと" }, { text: "は" }, { text: "何", furigana: "なに" }, { text: "ですか。" }
        ],
        quizOptions: ['学生 (Gakusei)', '会社員 (Kaishain)', '教師 (Kyoushi)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "正解", furigana: "せいかい" }, { text: "は..." }],
        kana: 'せいかいは...',
        romaji: 'Seikai wa...',
        meaning: '💡 Giải thích: Isora đã nói "Kaishain desu" (Tôi là nhân viên công ty).'
      },

      // Câu 12: Làm ở đâu
      {
        id: 18, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": どこで" }, { text: "働", furigana: "はたら" }, { text: "いていますか。" }
        ],
        quizOptions: ['日本', 'ハノイの会社', '学校'],
        correctOptionIndex: 1, // B
        segments: [{ text: "場所", furigana: "ばしょ" }, { text: "は..." }],
        kana: 'ばしょは...',
        romaji: 'Basho wa...',
        meaning: '💡 Giải thích: Isora nói "Hanoi no kaisha de..." (Tại công ty ở Hà Nội).'
      },

      // Câu 13: Nghĩa Isogashii
      {
        id: 19, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "忙", furigana: "いそが" }, { text: "しい」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Rảnh rỗi (Hima)', 'Bận rộn', 'Vui vẻ (Tanoshii)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "意味", furigana: "いみ" }, { text: "は..." }],
        kana: 'いみは...',
        romaji: 'Imi wa...',
        meaning: '💡 Giải thích: "Isogashii" là bận rộn. Trái nghĩa là "Hima" (Rảnh).'
      },

      // Câu 14: Thích không
      {
        id: 20, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": 仕事", furigana: "しごと" }, { text: "が" }, { text: "好", furigana: "す" }, { text: "きですか。" }
        ],
        quizOptions: ['はい、好きです', 'いいえ、好きではありません', 'わかりません'],
        correctOptionIndex: 0, // A
        segments: [{ text: "最後", furigana: "さいご" }, { text: "の" }, { text: "答", furigana: "こた" }, { text: "え..." }],
        kana: 'さいごのこたえ...',
        romaji: 'Saigo no kotae...',
        meaning: '💡 Giải thích: Isora trả lời "Hai, suki desu" (Vâng, tôi thích).'
      }
    ]
  },
  // --- HỘI THOẠI 6: MUA SẮM (CHIKI & AKI) ---
  {
    id: 'conv_6_shopping',
    title: '6. Mua sắm (買い物)',
    description: 'Hội thoại về việc đi siêu thị, mua đồ ăn và hỏi giá tiền.',
    characters: ['Chiki', 'Aki'], // Chiki = A, Aki = B
    prerequisites: ['food', 'numbers'],
    lines: [
      // 1. A: Hôm nay đi mua sắm không?
      {
        id: 1, speaker: 'Chiki',
        segments: [{ text: "今日", furigana: "きょう" }, { text: "は" }, { text: "買い物", furigana: "かいもの" }, { text: "に" }, { text: "行", furigana: "い" }, { text: "きますか。" }],
        kana: 'きょうはかいものにいきますか。',
        romaji: 'Kyou wa kaimono ni ikimasu ka?',
        meaning: 'Hôm nay bạn có đi mua sắm không?'
      },

      // --- QUIZ 1: TỪ VỰNG KAIMONO (Câu 1) ---
      {
        id: 2, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "買い物", furigana: "かいもの" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Bán hàng', 'Mua sắm', 'Nấu ăn'],
        correctOptionIndex: 1, // B
        segments: [{ text: "意味", furigana: "いみ" }, { text: "は..." }],
        kana: 'いみは...',
        romaji: 'Imi wa...',
        meaning: '💡 Giải thích: "Kaimono" (Cai vật) nghĩa là Mua sắm/Đi chợ.'
      },

      // 2. B: Có đi
      {
        id: 3, speaker: 'Aki',
        segments: [{ text: "はい、" }, { text: "行", furigana: "い" }, { text: "きます。" }],
        kana: 'はい、いきます。',
        romaji: 'Hai, ikimasu.',
        meaning: 'Vâng, có đi.'
      },

      // --- QUIZ 2: ĐỘNG TỪ IKIMASU (Câu 3) ---
      {
        id: 4, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "行", furigana: "い" }, { text: "きます」はどの" }, { text: "形", furigana: "かたち" }, { text: "？" }
        ],
        quizOptions: ['Quá khứ', 'Hiện tại / Tương lai', 'Mệnh lệnh'],
        correctOptionIndex: 1, // B
        segments: [{ text: "時制", furigana: "じせい" }, { text: "は..." }],
        kana: 'じせいは...',
        romaji: 'Jisei wa...',
        meaning: '💡 Giải thích: "Ikimasu" (Thể Masu) dùng cho thì hiện tại hoặc tương lai (Sẽ đi/Đi).'
      },

      // 3. A: Mua ở đâu
      {
        id: 5, speaker: 'Chiki',
        segments: [{ text: "どこで" }, { text: "買い物", furigana: "かいもの" }, { text: "をしますか。" }],
        kana: 'どこでかいものをしますか。',
        romaji: 'Doko de kaimono o shimasu ka?',
        meaning: 'Bạn mua sắm ở đâu?'
      },

      // --- QUIZ 3: TRỢ TỪ O (Câu 2) ---
      {
        id: 6, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "買い物", furigana: "かいもの" }, { text: "をします」の「を」は？" }
        ],
        quizOptions: ['Chỉ nơi chốn', 'Chỉ hành động tác động (Tân ngữ)', 'Chỉ thời gian'],
        correctOptionIndex: 1, // B
        segments: [{ text: "目的語", furigana: "もくてきご" }, { text: "を..." }],
        kana: 'もくてきごを...',
        romaji: 'Mokutekigo o...',
        meaning: '💡 Giải thích: Trợ từ "O" (Wo) chỉ đối tượng của hành động (Làm cái gì? -> Mua sắm).'
      },

      // 4. B: Ở siêu thị
      {
        id: 7, speaker: 'Aki',
        segments: [{ text: "スーパーで" }, { text: "買い物", furigana: "かいもの" }, { text: "をします。" }],
        kana: 'スーパーでかいものをします。',
        romaji: 'Suupaa de kaimono o shimasu.',
        meaning: 'Tôi mua sắm ở siêu thị.'
      },

      // --- QUIZ 4: TRỢ TỪ DE (Câu 7 - Bài tập) ---
      {
        id: 8, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "練習", furigana: "れんしゅう" }, { text: ": スーパー ______ " }, { text: "買い物", furigana: "かいもの" }, { text: "をします。(Điền trợ từ)" }
        ],
        quizOptions: ['で (de)', 'に (ni)', 'へ (he)'],
        correctOptionIndex: 0, // A
        segments: [{ text: "場所", furigana: "ばしょ" }, { text: "で..." }],
        kana: 'ばしょで...',
        romaji: 'Basho de...',
        meaning: '💡 Giải thích: Trợ từ "De" dùng để chỉ địa điểm diễn ra hành động (Mua sắm TẠI siêu thị).'
      },

      // --- QUIZ 5: TỪ VỰNG SUUPAA (Câu 4) ---
      {
        id: 9, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「スーパー」は" }, { text: "何", furigana: "なん" }, { text: "ですか。" }
        ],
        quizOptions: ['Siêu thị', 'Cửa hàng tiện lợi (Konbini)', 'Chợ (Ichiba)'],
        correctOptionIndex: 0, // A
        segments: [{ text: "カタカナ語", furigana: "ご" }, { text: "です。" }],
        kana: 'カタカナごです。',
        romaji: 'Katakanago desu.',
        meaning: '💡 Giải thích: "Suupaa" là từ vay mượn của "Supermarket" (Siêu thị).'
      },

      // 5. A: Mua cái gì
      {
        id: 10, speaker: 'Chiki',
        segments: [{ text: "何", furigana: "なに" }, { text: "を" }, { text: "買", furigana: "か" }, { text: "いますか。" }],
        kana: 'なにをかいますか。',
        romaji: 'Nani o kaimasu ka?',
        meaning: 'Bạn mua cái gì?'
      },

      // 6. B: Táo và bánh mì
      {
        id: 11, speaker: 'Aki',
        segments: [{ text: "りんごとパンを" }, { text: "買", furigana: "か" }, { text: "います。" }],
        kana: 'りんごとパンをかいます。',
        romaji: 'Ringo to pan o kaimasu.',
        meaning: 'Tôi mua táo và bánh mì.'
      },

      // --- QUIZ 6: ĐỘNG TỪ KAIMASU (Câu 8 - Bài tập) ---
      {
        id: 12, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "練習", furigana: "れんしゅう" }, { text: ": りんごとパンを ______ ます。(Động từ Mua)" }
        ],
        quizOptions: ['買い (Kaimasu)', '行き (Ikimasu)', '食べ (Tabemasu)'],
        correctOptionIndex: 0, // A
        segments: [{ text: "「" }, { text: "買", furigana: "か" }, { text: "う」の..." }],
        kana: 'かうの...',
        romaji: 'Kau no...',
        meaning: '💡 Giải thích: Động từ "Mua" là "Kau", chuyển sang thể Masu là "Kaimasu".'
      },

      // 7. A: Bao nhiêu tiền
      {
        id: 13, speaker: 'Chiki',
        segments: [{ text: "それはいくらですか。" }],
        kana: 'それはいくらですか。',
        romaji: 'Sore wa ikura desu ka?',
        meaning: 'Cái đó bao nhiêu tiền?'
      },

      // --- QUIZ 7: IKURA (Câu 5) ---
      {
        id: 14, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「いくら」は" }, { text: "何", furigana: "なに" }, { text: "を" }, { text: "聞", furigana: "き" }, { text: "きますか？" }
        ],
        quizOptions: ['Số lượng (Ikutsu)', 'Giá tiền', 'Thời gian (Itsu)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "値段", furigana: "ねだん" }, { text: "を..." }],
        kana: 'ねだんを...',
        romaji: 'Nedan o...',
        meaning: '💡 Giải thích: "Ikura" dùng để hỏi giá tiền (Bao nhiêu?).'
      },

      // 8. B: 500 yên
      {
        id: 15, speaker: 'Aki',
        segments: [{ text: "500" }, { text: "円", furigana: "えん" }, { text: "です。" }],
        kana: 'ごひゃくえんです。',
        romaji: 'Gohyaku-en desu.',
        meaning: 'Là 500 yên.'
      },

      // 9. A: Rẻ không
      {
        id: 16, speaker: 'Chiki',
        segments: [{ text: "安", furigana: "やす" }, { text: "いですか。" }],
        kana: 'やすいですか。',
        romaji: 'Yasui desu ka?',
        meaning: 'Có rẻ không?'
      },

      // --- QUIZ 8: TÍNH TỪ YASUI (Câu 6) ---
      {
        id: 17, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "安", furigana: "やす" }, { text: "い」はどの" }, { text: "種類", furigana: "しゅるい" }, { text: "？" }
        ],
        quizOptions: ['Tính từ đuôi I', 'Tính từ đuôi Na', 'Danh từ'],
        correctOptionIndex: 0, // A
        segments: [{ text: "「い」で" }, { text: "終", furigana: "お" }, { text: "わる..." }],
        kana: 'いでおわる...',
        romaji: 'I de owaru...',
        meaning: '💡 Giải thích: "Yasui" kết thúc bằng "i", là tính từ đuôi I (Rẻ).'
      },

      // 10. B: Rẻ
      {
        id: 18, speaker: 'Aki',
        segments: [{ text: "はい、" }, { text: "安", furigana: "やす" }, { text: "いです。" }],
        kana: 'はい、やすいです。',
        romaji: 'Hai, yasui desu.',
        meaning: 'Vâng, rẻ.'
      },

      // --- PHẦN TRẮC NGHIỆM CUỐI BÀI (D) ---

      // Câu 11: Mua ở đâu
      {
        id: 19, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": どこで" }, { text: "買い物", furigana: "かいもの" }, { text: "をしますか。" }
        ],
        quizOptions: ['Trung tâm thương mại (Depaato)', 'Siêu thị (Suupaa)', 'Cửa hàng tiện lợi (Konbini)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "場所", furigana: "ばしょ" }, { text: "は..." }],
        kana: 'ばしょは...',
        romaji: 'Basho wa...',
        meaning: '💡 Giải thích: Aki nói "Suupaa de kaimono o shimasu".'
      },

      // Câu 12: Mua gì
      {
        id: 20, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": " }, { text: "何", furigana: "なに" }, { text: "を" }, { text: "買", furigana: "か" }, { text: "いますか。" }
        ],
        quizOptions: ['Chỉ bánh mì', 'Táo và Bánh mì', 'Quýt (Mikan)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "買", furigana: "か" }, { text: "い" }, { text: "物", furigana: "もの" }, { text: "は..." }],
        kana: 'かいものは...',
        romaji: 'Kaimono wa...',
        meaning: '💡 Giải thích: Aki nói "Ringo to Pan o kaimasu".'
      },

      // Câu 13: 500 yên thế nào
      {
        id: 21, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": 500" }, { text: "円", furigana: "えん" }, { text: "はどうですか。" }
        ],
        quizOptions: ['Đắt (Takai)', 'Rẻ (Yasui)', 'Khó (Muzukashii)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "値段", furigana: "ねだん" }, { text: "の" }, { text: "感想", furigana: "かんそう" }, { text: "。" }],
        kana: 'ねだんのかんそう。',
        romaji: 'Nedan no kansou.',
        meaning: '💡 Giải thích: Aki xác nhận "Hai, yasui desu" (Vâng, rẻ).'
      },

      // Câu 14: Câu hỏi giá
      {
        id: 22, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": " }, { text: "値段", furigana: "ねだん" }, { text: "を" }, { text: "聞", furigana: "き" }, { text: "く" }, { text: "文", furigana: "ぶん" }, { text: "は？(Câu hỏi giá?)" }
        ],
        quizOptions: ['Mua gì? (Nani o kaimasu ka)', 'Bao nhiêu tiền? (Ikura desu ka)', 'Ở đâu? (Doko desu ka)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "いくら..." }],
        kana: 'いくら...',
        romaji: 'Ikura...',
        meaning: '💡 Giải thích: Để hỏi giá, ta dùng câu "Ikura desu ka".'
      }
    ]
  },
  // --- HỘI THOẠI 7: PHỎNG VẤN (ISORA & DAIGO) ---
  {
    id: 'conv_7_interview',
    title: '7. Phỏng vấn (インタビュー)',
    description: 'Cuộc phỏng vấn giữa Isora và Nam (Daigo đóng vai) về thông tin cá nhân và ước mơ tương lai.',
    characters: ['Isora', 'Daigo'], // Isora = A, Daigo = B (Nam)
    prerequisites: ['jobs', 'school'],
    lines: [
      // 1. A: Bắt đầu phỏng vấn
      {
        id: 1, speaker: 'Isora',
        segments: [{ text: "今日", furigana: "きょう" }, { text: "はインタビューを" }, { text: "始", furigana: "はじ" }, { text: "めます。" }],
        kana: 'きょうはインタビューをはじめます。',
        romaji: 'Kyou wa intabyuu ohajimemasu.',
        meaning: 'Hôm nay chúng ta sẽ bắt đầu buổi phỏng vấn.'
      },

      // --- QUIZ 1: TỪ VỰNG INTERVIEW (Câu 1) ---
      {
        id: 2, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「インタビュー」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Cuộc họp (Kaigi)', 'Phỏng vấn', 'Thuyết trình (Purezen)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "意味", furigana: "いみ" }, { text: "は..." }],
        kana: 'いみは...',
        romaji: 'Imi wa...',
        meaning: '💡 Giải thích: "Intabyuu" là từ vay mượn của "Interview" (Phỏng vấn).'
      },

      // 2. B: Vâng
      {
        id: 3, speaker: 'Daigo',
        segments: [{ text: "はい、お" }, { text: "願", furigana: "ねが" }, { text: "いします。" }],
        kana: 'はい、おねがいします。',
        romaji: 'Hai, onegaishimasu.',
        meaning: 'Vâng, xin nhờ anh ạ.'
      },

      // 3. A: Hỏi tên
      {
        id: 4, speaker: 'Isora',
        segments: [{ text: "お" }, { text: "名前", furigana: "なまえ" }, { text: "を" }, { text: "教", furigana: "おし" }, { text: "えてください。" }],
        kana: 'おなまえをおしえてください。',
        romaji: 'Onamae o oshiete kudasai.',
        meaning: 'Hãy cho tôi biết tên của bạn.'
      },

      // --- QUIZ 2: TRỢ TỪ O (Câu 2) ---
      {
        id: 5, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "名前", furigana: "なまえ" }, { text: "を" }, { text: "教", furigana: "おし" }, { text: "えて」の「を」は？" }
        ],
        quizOptions: ['Chỉ nơi chốn', 'Chỉ đối tượng của hành động', 'Chỉ thời gian'],
        correctOptionIndex: 1, // B
        segments: [{ text: "目的語", furigana: "もくてきご" }, { text: "を..." }],
        kana: 'もくてきごを...',
        romaji: 'Mokutekigo o...',
        meaning: '💡 Giải thích: Trợ từ "O" chỉ đối tượng chịu tác động (Cho biết cái gì? -> Cho biết Tên).'
      },

      // 4. B: Tên Nam
      {
        id: 6, speaker: 'Daigo',
        segments: [{ text: "ナムです。" }],
        kana: 'ナムです。',
        romaji: 'Namu desu.',
        meaning: 'Tôi là Nam.'
      },

      // 5. A: Hỏi đang làm gì
      {
        id: 7, speaker: 'Isora',
        segments: [{ text: "今", furigana: "いま" }, { text: "、" }, { text: "何", furigana: "なに" }, { text: "をしていますか。" }],
        kana: 'いま、なにをしていますか。',
        romaji: 'Ima, nani o shiteimasu ka?',
        meaning: 'Bây giờ bạn đang làm gì?'
      },

      // --- QUIZ 3: NANI O SHITEIMASU KA (Câu 3) ---
      {
        id: 8, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "何", furigana: "なに" }, { text: "をしていますか」は" }, { text: "何", furigana: "なに" }, { text: "を" }, { text: "聞", furigana: "き" }, { text: "く？" }
        ],
        quizOptions: ['Tuổi tác', 'Nghề nghiệp / Tình trạng hiện tại', 'Quốc tịch'],
        correctOptionIndex: 1, // B
        segments: [{ text: "職業", furigana: "しょくぎょう" }, { text: "などを..." }],
        kana: 'しょくぎょうなどを...',
        romaji: 'Shokugyou nado o...',
        meaning: '💡 Giải thích: Câu hỏi này dùng để hỏi về nghề nghiệp hoặc việc đang làm trong giai đoạn hiện tại.'
      },

      // 6. B: Học sinh
      {
        id: 9, speaker: 'Daigo',
        segments: [{ text: "学生", furigana: "がくせい" }, { text: "です。" }],
        kana: 'がくせいです。',
        romaji: 'Gakusei desu.',
        meaning: 'Tôi là học sinh.'
      },

      // 7. A: Hỏi đang học tiếng Nhật không
      {
        id: 10, speaker: 'Isora',
        segments: [{ text: "日本語", furigana: "にほんご" }, { text: "を" }, { text: "勉強", furigana: "べんきょう" }, { text: "していますか。" }],
        kana: 'にほんごをべんきょうしていますか。',
        romaji: 'Nihongo o benkyou shiteimasu ka?',
        meaning: 'Bạn đang học tiếng Nhật phải không?'
      },

      // --- QUIZ 4: THỂ TIẾP DIỄN (Câu 4) ---
      {
        id: 11, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "勉強", furigana: "べんきょう" }, { text: "しています」はどの" }, { text: "形", furigana: "かたち" }, { text: "？" }
        ],
        quizOptions: ['Quá khứ', 'Hiện tại tiếp diễn', 'Phủ định'],
        correctOptionIndex: 1, // B
        segments: [{ text: "〜ています。" }],
        kana: 'て います。',
        romaji: '~Te imasu.',
        meaning: '💡 Giải thích: "Benkyou shiteimasu" là thì hiện tại tiếp diễn (Đang học).'
      },

      // 8. B: Có
      {
        id: 12, speaker: 'Daigo',
        segments: [{ text: "はい、" }, { text: "勉強", furigana: "べんきょう" }, { text: "しています。" }],
        kana: 'はい、べんきょうしています。',
        romaji: 'Hai, benkyou shiteimasu.',
        meaning: 'Vâng, tôi đang học.'
      },

      // 9. A: Hỏi tương lai
      {
        id: 13, speaker: 'Isora',
        segments: [{ text: "将来", furigana: "しょうらい" }, { text: "、" }, { text: "何", furigana: "なに" }, { text: "になりたいですか。" }],
        kana: 'しょうらい、なにになりたいですか。',
        romaji: 'Shourai, nani ni naritai desu ka?',
        meaning: 'Trong tương lai, bạn muốn trở thành gì?'
      },

      // --- QUIZ 5: TỪ VỰNG SHOURAI (Câu 5) ---
      {
        id: 14, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "将来", furigana: "しょうらい" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Hiện tại', 'Quá khứ', 'Tương lai'],
        correctOptionIndex: 2, // C
        segments: [{ text: "意味", furigana: "いみ" }, { text: "は..." }],
        kana: 'いみは...',
        romaji: 'Imi wa...',
        meaning: '💡 Giải thích: "Shourai" nghĩa là Tương lai (gần với cá nhân).'
      },

      // --- QUIZ 6: TAI DESU (Câu 6) ---
      {
        id: 15, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「～になりたいです」は" }, { text: "何", furigana: "なに" }, { text: "を" }, { text: "表", furigana: "あらわ" }, { text: "す？" }
        ],
        quizOptions: ['Kế hoạch đã xong', 'Mong muốn (Want)', 'Mệnh lệnh'],
        correctOptionIndex: 1, // B
        segments: [{ text: "希望", furigana: "きぼう" }, { text: "です。" }],
        kana: 'きぼうです。',
        romaji: 'Kibou desu.',
        meaning: '💡 Giải thích: Mẫu câu "V-tai desu" diễn tả mong muốn của bản thân (Muốn trở thành...).'
      },

      // 10. B: Kỹ sư
      {
        id: 16, speaker: 'Daigo',
        segments: [{ text: "エンジニアになりたいです。" }],
        kana: 'エンジニアになりたいです。',
        romaji: 'Enjinia ni naritai desu.',
        meaning: 'Tôi muốn trở thành kỹ sư.'
      },

      // --- PHẦN TRẮC NGHIỆM CUỐI BÀI (D) ---

      // Câu 11: Tên
      {
        id: 17, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": Bの" }, { text: "名前", furigana: "なまえ" }, { text: "は？" }
        ],
        quizOptions: ['ミン (Min)', 'ナム (Nam)', 'リン (Lin)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "正解", furigana: "せいかい" }, { text: "は..." }],
        kana: 'せいかいは...',
        romaji: 'Seikai wa...',
        meaning: '💡 Giải thích: Nhân vật B đã giới thiệu "Namu desu".'
      },

      // Câu 12: Hiện tại làm gì
      {
        id: 18, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": " }, { text: "今", furigana: "いま" }, { text: "、Bは" }, { text: "何", furigana: "なに" }, { text: "ですか。" }
        ],
        quizOptions: ['Nhân viên công ty', 'Học sinh', 'Giáo viên'],
        correctOptionIndex: 1, // B
        segments: [{ text: "職業", furigana: "しょくぎょう" }, { text: "は..." }],
        kana: 'しょくぎょうは...',
        romaji: 'Shokugyou wa...',
        meaning: '💡 Giải thích: Nam nói "Gakusei desu" (Tôi là học sinh).'
      },

      // Câu 13: Câu hỏi tương lai
      {
        id: 19, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "意味", furigana: "いみ" }, { text: ": 「" }, { text: "将来", furigana: "しょうらい" }, { text: "、" }, { text: "何", furigana: "なに" }, { text: "になりたいですか」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Bây giờ làm gì?', 'Sau này muốn trở thành gì?', 'Đang học gì?'],
        correctOptionIndex: 1, // B
        segments: [{ text: "質問", furigana: "しつもん" }, { text: "の" }, { text: "意味", furigana: "いみ" }, { text: "。" }],
        kana: 'しつもんのいみ。',
        romaji: 'Shitsumon no imi.',
        meaning: '💡 Giải thích: Câu này hỏi về ước mơ/nghề nghiệp mong muốn trong tương lai.'
      },

      // Câu 14: Muốn làm gì
      {
        id: 20, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": Bは" }, { text: "将来", furigana: "しょうらい" }, { text: "、" }, { text: "何", furigana: "なに" }, { text: "になりたいですか。" }
        ],
        quizOptions: ['Bác sĩ (Isha)', 'Giáo viên (Kyoushi)', 'Kỹ sư (Enjinia)'],
        correctOptionIndex: 2, // C
        segments: [{ text: "夢", furigana: "ゆめ" }, { text: "は..." }],
        kana: 'ゆめは...',
        romaji: 'Yume wa...',
        meaning: '💡 Giải thích: Nam trả lời "Enjinia ni naritai desu" (Muốn làm kỹ sư).'
      }
    ]
  },
  // --- HỘI THOẠI 8: BẢO VỆ MÔI TRƯỜNG (AKI & CHIKI) ---
  {
    id: 'conv_8_environment',
    title: '8. Bảo vệ môi trường (環境保護)',
    description: 'Hội thoại về tầm quan trọng của việc bảo vệ môi trường và các hành động thiết thực hàng ngày.',
    characters: ['Aki', 'Chiki'], // Aki = A, Chiki = B
    prerequisites: ['housework', 'weather'], // Đã cập nhật theo yêu cầu
    lines: [
      // 1. A: Hỏi quan trọng không
      {
        id: 1, speaker: 'Aki',
        segments: [{ text: "環境", furigana: "かんきょう" }, { text: "を" }, { text: "守", furigana: "まも" }, { text: "ることは" }, { text: "大切", furigana: "たいせつ" }, { text: "ですか。" }],
        kana: 'かんきょうをまもることはたいせつですか。',
        romaji: 'Kankyou o mamoru koto wa taisetsu desu ka?',
        meaning: 'Việc bảo vệ môi trường có quan trọng không?'
      },

      // --- QUIZ 1: TỪ VỰNG KANKYOU (Câu 1) ---
      {
        id: 2, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "環境", furigana: "かんきょう" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Kinh tế (Keizai)', 'Môi trường', 'Xã hội (Shakai)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "意味", furigana: "いみ" }, { text: "は..." }],
        kana: 'いみは...',
        romaji: 'Imi wa...',
        meaning: '💡 Giải thích: "Kankyou" nghĩa là Môi trường. Kinh tế là "Keizai", Xã hội là "Shakai".'
      },

      // --- QUIZ 2: TRỢ TỪ O (Câu 2) ---
      {
        id: 3, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "環境", furigana: "かんきょう" }, { text: "を" }, { text: "守", furigana: "まも" }, { text: "る」の「を」は？" }
        ],
        quizOptions: ['Chỉ chủ đề', 'Chỉ đối tượng của hành động', 'Chỉ nơi chốn'],
        correctOptionIndex: 1, // B
        segments: [{ text: "目的語", furigana: "もくてきご" }, { text: "を..." }],
        kana: 'もくてきごを...',
        romaji: 'Mokutekigo o...',
        meaning: '💡 Giải thích: Trợ từ "O" (Wo) chỉ đối tượng chịu tác động (Bảo vệ cái gì? -> Bảo vệ Môi trường).'
      },

      // 2. B: Quan trọng
      {
        id: 4, speaker: 'Chiki',
        segments: [{ text: "はい、とても" }, { text: "大切", furigana: "たいせつ" }, { text: "です。" }],
        kana: 'はい、とてもたいせつです。',
        romaji: 'Hai, totemo taisetsu desu.',
        meaning: 'Vâng, rất quan trọng.'
      },

      // 3. A: Hỏi làm gì mỗi ngày
      {
        id: 5, speaker: 'Aki',
        segments: [{ text: "毎日", furigana: "まいにち" }, { text: "、" }, { text: "何", furigana: "なに" }, { text: "かしていますか。" }],
        kana: 'まいにち、なにかしていますか。',
        romaji: 'Mainichi, nanika shiteimasu ka?',
        meaning: 'Hàng ngày bạn có làm gì không?'
      },

      // 4. B: Phân loại rác
      {
        id: 6, speaker: 'Chiki',
        segments: [{ text: "はい、ゴミを" }, { text: "分別", furigana: "ぶんべつ" }, { text: "しています。" }],
        kana: 'はい、ゴミをぶんべつしています。',
        romaji: 'Hai, gomi o bunbetsu shiteimasu.',
        meaning: 'Vâng, tôi đang phân loại rác.'
      },

      // --- QUIZ 3: THỂ TIẾP DIỄN (Câu 3) ---
      {
        id: 7, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "分別", furigana: "ぶんべつ" }, { text: "しています」はどの" }, { text: "形", furigana: "かたち" }, { text: "？" }
        ],
        quizOptions: ['Quá khứ', 'Hiện tại tiếp diễn / Thói quen', 'Mệnh lệnh'],
        correctOptionIndex: 1, // B
        segments: [{ text: "〜ています。" }],
        kana: 'て います。',
        romaji: '~Te imasu.',
        meaning: '💡 Giải thích: "Shiteimasu" diễn tả hành động thói quen lặp lại hàng ngày (Tôi vẫn thường xuyên phân loại rác).'
      },

      // 5. A: Hỏi dùng nhựa
      {
        id: 8, speaker: 'Aki',
        segments: [{ text: "プラスチックを" }, { text: "使", furigana: "つか" }, { text: "いますか。" }],
        kana: 'プラスチックをつかいますか。',
        romaji: 'Purasuchikku o tsukaimasu ka?',
        meaning: 'Bạn có dùng đồ nhựa không?'
      },

      // --- QUIZ 4: TỪ VỰNG PLASTIC (Câu 4) ---
      {
        id: 9, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「プラスチック」は" }, { text: "何", furigana: "なん" }, { text: "ですか。" }
        ],
        quizOptions: ['Giấy (Kami)', 'Nhựa (Plastic)', 'Kim loại (Kinzoku)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "素材", furigana: "そざい" }, { text: "は..." }],
        kana: 'そざいは...',
        romaji: 'Sozai wa...',
        meaning: '💡 Giải thích: "Purasuchikku" là từ vay mượn của "Plastic" (Nhựa).'
      },

      // 6. B: Không dùng lắm
      {
        id: 10, speaker: 'Chiki',
        segments: [{ text: "いいえ、あまり" }, { text: "使", furigana: "つか" }, { text: "いません。" }],
        kana: 'いいえ、あまりつかいません。',
        romaji: 'Iie, amari tsukaimasen.',
        meaning: 'Không, tôi không dùng nhiều lắm.'
      },

      // 7. A: Hỏi lãng phí điện
      {
        id: 11, speaker: 'Aki',
        segments: [{ text: "電気", furigana: "でんき" }, { text: "を" }, { text: "無駄", furigana: "むだ" }, { text: "にしませんか。" }],
        kana: 'でんきをむだにしませんか。',
        romaji: 'Denki o muda ni shimasen ka?',
        meaning: 'Bạn có lãng phí điện không?'
      },

      // 8. B: Không lãng phí
      {
        id: 12, speaker: 'Chiki',
        segments: [{ text: "はい、" }, { text: "無駄", furigana: "むだ" }, { text: "にしません。" }],
        kana: 'はい、むだにしません。',
        romaji: 'Hai, muda ni shimasen.',
        meaning: 'Vâng, tôi không lãng phí.'
      },

      // --- QUIZ 5: PHỦ ĐỊNH (Câu 5) ---
      {
        id: 13, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "無駄", furigana: "むだ" }, { text: "にしません」はどの" }, { text: "形", furigana: "かたち" }, { text: "？" }
        ],
        quizOptions: ['Khẳng định', 'Phủ định', 'Quá khứ'],
        correctOptionIndex: 1, // B
        segments: [{ text: "否定形", furigana: "ひていけい" }, { text: "です。" }],
        kana: 'ひていけいです。',
        romaji: 'Hiteikei desu.',
        meaning: '💡 Giải thích: Đuôi "Masen" biểu thị thể phủ định (Không làm...).'
      },

      // 9. A: Hỏi tiếp tục không
      {
        id: 14, speaker: 'Aki',
        segments: [{ text: "これからも" }, { text: "続", furigana: "つづ" }, { text: "けますか。" }],
        kana: 'これからもつづけますか。',
        romaji: 'Korekara mo tsuzukemasu ka?',
        meaning: 'Từ nay về sau bạn vẫn sẽ tiếp tục chứ?'
      },

      // 10. B: Tiếp tục
      {
        id: 15, speaker: 'Chiki',
        segments: [{ text: "はい、" }, { text: "続", furigana: "つづ" }, { text: "けます。" }],
        kana: 'はい、つづけます。',
        romaji: 'Hai, tsuzukemasu.',
        meaning: 'Vâng, tôi sẽ tiếp tục.'
      },

      // --- QUIZ 6: TỪ VỰNG TSUZUKEMASU (Câu 6) ---
      {
        id: 16, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "続", furigana: "つづ" }, { text: "けます」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Dừng lại (Yameru)', 'Bắt đầu (Hajimeru)', 'Tiếp tục'],
        correctOptionIndex: 2, // C
        segments: [{ text: "意味", furigana: "いみ" }, { text: "は..." }],
        kana: 'いみは...',
        romaji: 'Imi wa...',
        meaning: '💡 Giải thích: "Tsuzukemasu" nghĩa là Tiếp tục / Duy trì.'
      },

      // --- PHẦN TRẮC NGHIỆM CUỐI BÀI (D) ---

      // Câu 11: Làm gì bảo vệ môi trường
      {
        id: 17, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": Bは" }, { text: "環境", furigana: "かんきょう" }, { text: "のために" }, { text: "何", furigana: "なに" }, { text: "をしていますか。" }
        ],
        quizOptions: ['Vứt rác lung tung (Gomi o sutemasu)', 'Phân loại rác (Gomi o bunbetsu shimasu)', 'Dùng nhiều điện (Denki o tsukaimasu)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "正解", furigana: "せいかい" }, { text: "は..." }],
        kana: 'せいかいは...',
        romaji: 'Seikai wa...',
        meaning: '💡 Giải thích: Chiki nói "Gomi o bunbetsu shiteimasu" (Phân loại rác).'
      },

      // Câu 12: Dùng nhựa không
      {
        id: 18, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": プラスチックをどうしますか。" }
        ],
        quizOptions: ['Thường dùng', 'Không dùng nhiều lắm', 'Dùng mỗi ngày'],
        correctOptionIndex: 1, // B
        segments: [{ text: "答", furigana: "こた" }, { text: "えは..." }],
        kana: 'こたえは...',
        romaji: 'Kotae wa...',
        meaning: '💡 Giải thích: Chiki nói "Amari tsukaimasen" (Không dùng nhiều lắm).'
      },

      // Câu 13: Nghĩa Muda ni shimasen
      {
        id: 19, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "意味", furigana: "いみ" }, { text: ": 「" }, { text: "無駄", furigana: "むだ" }, { text: "にしません」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Lãng phí', 'Không lãng phí', 'Dùng nhiều'],
        correctOptionIndex: 1, // B
        segments: [{ text: "意味", furigana: "いみ" }, { text: "は..." }],
        kana: 'いみは...',
        romaji: 'Imi wa...',
        meaning: '💡 Giải thích: "Muda" (Lãng phí) + "Shimasen" (Phủ định) -> Không lãng phí.'
      },

      // Câu 14: Tương lai làm gì
      {
        id: 20, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": Bは" }, { text: "将来", furigana: "しょうらい" }, { text: "どうしますか。" }
        ],
        quizOptions: ['Bỏ cuộc (Yamemasu)', 'Tiếp tục (Tsuzukemasu)', 'Thay đổi (Kaemasu)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "最後", furigana: "さいご" }, { text: "の" }, { text: "答", furigana: "こた" }, { text: "え..." }],
        kana: 'さいごのこたえ...',
        romaji: 'Saigo no kotae...',
        meaning: '💡 Giải thích: Chiki xác nhận "Hai, tsuzukemasu" (Vâng, tôi sẽ tiếp tục).'
      }
    ]
  },
  // --- HỘI THOẠI 9: HỎI ĐƯỜNG (ISORA & DAIGO) ---
  {
    id: 'conv_9_direction',
    title: '9. Hỏi đường (道を聞く)',
    description: 'Hội thoại hỏi đường đến nhà ga, thời gian đi bộ và các chỉ dẫn rẽ trái/phải.',
    characters: ['Isora', 'Daigo'], // Isora = A, Daigo = B
    prerequisites: ['travel', 'numbers'],
    lines: [
      // 1. A: Xin lỗi, ga ở đâu
      {
        id: 1, speaker: 'Isora',
        segments: [{ text: "すみません、" }, { text: "駅", furigana: "えき" }, { text: "はどこですか。" }],
        kana: 'すみません、えきはどこですか。',
        romaji: 'Sumimasen, eki wa doko desu ka?',
        meaning: 'Xin lỗi, nhà ga ở đâu vậy ạ?'
      },

      // --- QUIZ 1: TỪ VỰNG EKI (Câu 1) ---
      {
        id: 2, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "駅", furigana: "えき" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Bến xe', 'Nhà ga', 'Sân bay'],
        correctOptionIndex: 1, // B
        segments: [{ text: "場所", furigana: "ばしょ" }, { text: "の" }, { text: "名前", furigana: "なまえ" }, { text: "。" }],
        kana: 'ばしょのなまえ。',
        romaji: 'Basho no namae.',
        meaning: '💡 Giải thích: "Eki" nghĩa là Nhà ga (tàu điện). Sân bay là "Kuukou".'
      },

      // 2. B: Đi thẳng
      {
        id: 3, speaker: 'Daigo',
        segments: [{ text: "この" }, { text: "道", furigana: "みち" }, { text: "をまっすぐ" }, { text: "行", furigana: "い" }, { text: "ってください。" }],
        kana: 'このみちをまっすぐいってください。',
        romaji: 'Kono michi o massugu itte kudasai.',
        meaning: 'Hãy đi thẳng con đường này.'
      },

      // --- QUIZ 2: TRỢ TỪ O (Câu 2) ---
      {
        id: 4, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「この" }, { text: "道", furigana: "みち" }, { text: "を...」の「を」は？" }
        ],
        quizOptions: ['Chỉ nơi chốn đi qua', 'Chỉ chủ đề', 'Chỉ thời gian'],
        correctOptionIndex: 0, // A
        segments: [{ text: "移動", furigana: "いどう" }, { text: "の" }, { text: "場所", furigana: "ばしょ" }, { text: "..." }],
        kana: 'いどうのばしょ...',
        romaji: 'Idou no basho...',
        meaning: '💡 Giải thích: Với các động từ di chuyển (đi, chạy, bay), trợ từ "O" chỉ địa điểm mà hành động đi xuyên qua.'
      },

      // --- QUIZ 3: TỪ VỰNG MASSUGU (Câu 3) ---
      {
        id: 5, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「まっすぐ」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Rẽ phải', 'Rẽ trái', 'Đi thẳng'],
        correctOptionIndex: 2, // C
        segments: [{ text: "方向", furigana: "ほうこう" }, { text: "です。" }],
        kana: 'ほうこうです。',
        romaji: 'Houkou desu.',
        meaning: '💡 Giải thích: "Massugu" nghĩa là đi thẳng. Rẽ phải là "Migi ni magaru".'
      },

      // 3. A: Mất bao lâu
      {
        id: 6, speaker: 'Isora',
        segments: [{ text: "どのくらいかかりますか。" }],
        kana: 'どのくらいかかりますか。',
        romaji: 'Dono kurai kakarimasu ka?',
        meaning: 'Mất khoảng bao lâu?'
      },

      // --- QUIZ 4: DONO KURAI (Câu 4) ---
      {
        id: 7, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「どのくらい」は" }, { text: "何", furigana: "なに" }, { text: "を" }, { text: "聞", furigana: "き" }, { text: "く？" }
        ],
        quizOptions: ['Khoảng bao xa / bao lâu', 'Ở đâu (Doko)', 'Bao nhiêu tuổi (Ikutsu)'],
        correctOptionIndex: 0, // A
        segments: [{ text: "時間", furigana: "じかん" }, { text: "や" }, { text: "距離", furigana: "きょり" }, { text: "..." }],
        kana: 'じかんやきょり...',
        romaji: 'Jikan ya kyori...',
        meaning: '💡 Giải thích: "Dono kurai" dùng để hỏi về khoảng lượng (thời gian, độ dài, chi phí...).'
      },

      // 4. B: Khoảng 5 phút
      {
        id: 8, speaker: 'Daigo',
        segments: [{ text: "5" }, { text: "分", furigana: "ふん" }, { text: "ぐらいです。" }],
        kana: 'ごふんぐらいです。',
        romaji: 'Go-fun gurai desu.',
        meaning: 'Khoảng 5 phút ạ.'
      },

      // 5. A: Rẽ phải à
      {
        id: 9, speaker: 'Isora',
        segments: [{ text: "右", furigana: "みぎ" }, { text: "に" }, { text: "曲", furigana: "ま" }, { text: "がりますか。" }],
        kana: 'みぎにまがりますか。',
        romaji: 'Migi ni magarimasu ka?',
        meaning: 'Có rẽ phải không?'
      },

      // 6. B: Vâng, hãy rẽ phải
      {
        id: 10, speaker: 'Daigo',
        segments: [{ text: "はい、" }, { text: "右", furigana: "みぎ" }, { text: "に" }, { text: "曲", furigana: "ま" }, { text: "がってください。" }],
        kana: 'はい、みぎにまがってください。',
        romaji: 'Hai, migi ni magatte kudasai.',
        meaning: 'Vâng, hãy rẽ phải.'
      },

      // --- QUIZ 5: CÂU MỆNH LỆNH (Câu 5) ---
      {
        id: 11, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "曲", furigana: "ま" }, { text: "がってください」はどの" }, { text: "形", furigana: "かたち" }, { text: "？" }
        ],
        quizOptions: ['Câu mệnh lệnh lịch sự', 'Câu phủ định', 'Câu quá khứ'],
        correctOptionIndex: 0, // A
        segments: [{ text: "指示", furigana: "しじ" }, { text: "です。" }],
        kana: 'しじです。',
        romaji: 'Shiji desu.',
        meaning: '💡 Giải thích: Mẫu câu "~Te kudasai" dùng để yêu cầu hoặc hướng dẫn ai đó làm gì một cách lịch sự.'
      },

      // 7. A: Có ngã tư không
      {
        id: 12, speaker: 'Isora',
        segments: [{ text: "交差点", furigana: "こうさてん" }, { text: "がありますか。" }],
        kana: 'こうさてんがありますか。',
        romaji: 'Kousaten ga arimasu ka?',
        meaning: 'Có ngã tư không?'
      },

      // --- QUIZ 6: TỪ VỰNG KOUSATEN (Câu 6) ---
      {
        id: 13, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "交差点", furigana: "こうさてん" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Cầu (Hashi)', 'Ngã tư / Giao lộ', 'Công viên (Kouen)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "道", furigana: "みち" }, { text: "が" }, { text: "交", furigana: "まじ" }, { text: "わる..." }],
        kana: 'みちがまじわる...',
        romaji: 'Michi ga majiwaru...',
        meaning: '💡 Giải thích: "Kousaten" là giao lộ, ngã tư.'
      },

      // 8. B: Có ngã tư lớn
      {
        id: 14, speaker: 'Daigo',
        segments: [{ text: "はい、" }, { text: "大", furigana: "おお" }, { text: "きい" }, { text: "交差点", furigana: "こうさてん" }, { text: "があります。" }],
        kana: 'はい、おおきいこうさてんがあります。',
        romaji: 'Hai, ookii kousaten ga arimasu.',
        meaning: 'Vâng, có một ngã tư lớn.'
      },

      // 9. A: Cảm ơn
      {
        id: 15, speaker: 'Isora',
        segments: [{ text: "わかりました。ありがとうございます。" }],
        kana: 'わかりました。ありがとうございます。',
        romaji: 'Wakarimashita. Arigatou gozaimasu.',
        meaning: 'Tôi hiểu rồi. Cảm ơn anh.'
      },

      // 10. B: Không có chi
      {
        id: 16, speaker: 'Daigo',
        segments: [{ text: "どういたしまして。" }],
        kana: 'どういたしまして。',
        romaji: 'Dou itashimashite.',
        meaning: 'Không có chi.'
      },

      // --- PHẦN TRẮC NGHIỆM CUỐI BÀI (D) ---

      // Câu 11: Nhà ga ở đâu
      {
        id: 17, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": " }, { text: "駅", furigana: "えき" }, { text: "はどこですか。" }
        ],
        quizOptions: ['Bên trái', 'Đi thẳng rồi rẽ phải', 'Không biết'],
        correctOptionIndex: 1, // B
        segments: [{ text: "行", furigana: "い" }, { text: "き" }, { text: "方", furigana: "かた" }, { text: "は..." }],
        kana: 'いきかたは...',
        romaji: 'Ikikata wa...',
        meaning: '💡 Giải thích: Daigo chỉ dẫn: Đi thẳng (Massugu) sau đó rẽ phải (Migi ni magaru).'
      },

      // Câu 12: Mất bao lâu
      {
        id: 18, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": どのくらいかかりますか。" }
        ],
        quizOptions: ['Khoảng 5 phút', 'Khoảng 10 phút', 'Khoảng 20 phút'],
        correctOptionIndex: 0, // A
        segments: [{ text: "時間", furigana: "じかん" }, { text: "は..." }],
        kana: 'じかんは...',
        romaji: 'Jikan wa...',
        meaning: '💡 Giải thích: Daigo nói "Go-fun gurai desu" (Khoảng 5 phút).'
      },

      // Câu 13: Sumimasen dùng làm gì
      {
        id: 19, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「すみません」はいつ" }, { text: "使", furigana: "つか" }, { text: "いますか。" }
        ],
        quizOptions: ['Chào buổi sáng', 'Gọi người khác / Xin lỗi làm phiền', 'Tạm biệt'],
        correctOptionIndex: 1, // B
        segments: [{ text: "呼", furigana: "よ" }, { text: "びかける" }, { text: "時", furigana: "とき" }, { text: "..." }],
        kana: 'よびかけるとき...',
        romaji: 'Yobikakeru toki...',
        meaning: '💡 Giải thích: Trong ngữ cảnh này, "Sumimasen" dùng để gọi người lạ một cách lịch sự trước khi hỏi đường.'
      },

      // Câu 14: Đi thẳng xong làm gì
      {
        id: 20, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": まっすぐ" }, { text: "行", furigana: "い" }, { text: "ってから、どうしますか。" }
        ],
        quizOptions: ['Rẽ trái (Hidari ni magaru)', 'Rẽ phải (Migi ni magaru)', 'Dừng lại (Tomaru)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "次", furigana: "つぎ" }, { text: "の" }, { text: "動作", furigana: "どうさ" }, { text: "..." }],
        kana: 'つぎのどうさ...',
        romaji: 'Tsugi no dousa...',
        meaning: '💡 Giải thích: Daigo hướng dẫn "Migi ni magatte kudasai" (Hãy rẽ phải).'
      }
    ]
  },
  // --- HỘI THOẠI 10: GIA ĐÌNH (CHIKI & AKI) ---
  {
    id: 'conv_10_family',
    title: '10. Gia đình (家族)',
    description: 'Hội thoại về thành viên gia đình, nghề nghiệp và anh chị em.',
    characters: ['Chiki', 'Aki'], // Chiki = A, Aki = B
    prerequisites: ['family', 'jobs'],
    lines: [
      // 1. A: Nhà có mấy người?
      {
        id: 1, speaker: 'Chiki',
        segments: [{ text: "家族", furigana: "かぞく" }, { text: "は" }, { text: "何人", furigana: "なんにん" }, { text: "いますか。" }],
        kana: 'かぞくはなんにんいますか。',
        romaji: 'Kazoku wa nannin imasu ka?',
        meaning: 'Gia đình bạn có bao nhiêu người?'
      },

      // --- QUIZ 1: TỪ VỰNG KAZOKU (Câu 1) ---
      {
        id: 2, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "家族", furigana: "かぞく" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Bạn bè (Tomodachi)', 'Gia đình', 'Họ hàng (Shinseki)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "意味", furigana: "いみ" }, { text: "は..." }],
        kana: 'いみは...',
        romaji: 'Imi wa...',
        meaning: '💡 Giải thích: "Kazoku" nghĩa là Gia đình.'
      },

      // --- QUIZ 2: TỪ ĐỂ HỎI NANNIN (Câu 3) ---
      {
        id: 3, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "何人", furigana: "なんにん" }, { text: "いますか」は" }, { text: "何", furigana: "なに" }, { text: "を" }, { text: "聞", furigana: "き" }, { text: "く？" }
        ],
        quizOptions: ['Tuổi tác', 'Số lượng người', 'Nghề nghiệp'],
        correctOptionIndex: 1, // B
        segments: [{ text: "人数", furigana: "にんずう" }, { text: "を..." }],
        kana: 'にんずうを...',
        romaji: 'Ninzuu o...',
        meaning: '💡 Giải thích: "Nan-nin" dùng để hỏi về số lượng người (Mấy người?).'
      },

      // 2. B: Có 4 người
      {
        id: 4, speaker: 'Aki',
        segments: [{ text: "4" }, { text: "人", furigana: "にん" }, { text: "います。" }],
        kana: 'よにんいます。',
        romaji: 'Yonin imasu.',
        meaning: 'Có 4 người.'
      },

      // --- QUIZ 3: TRỢ SỐ TỪ NIN (Câu 2) ---
      {
        id: 5, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「4" }, { text: "人", furigana: "にん" }, { text: "」の「" }, { text: "人", furigana: "にん" }, { text: "」は" }, { text: "何", furigana: "なに" }, { text: "？" }
        ],
        quizOptions: ['Động từ', 'Trợ từ', 'Trợ số đếm người'],
        correctOptionIndex: 2, // C
        segments: [{ text: "助数詞", furigana: "じょすうし" }, { text: "です。" }],
        kana: 'じょすうしです。',
        romaji: 'Josuushi desu.',
        meaning: '💡 Giải thích: "Nin" là trợ số từ dùng để đếm người (Hitori, Futari, Sannin, Yonin...).'
      },

      // 3. A: Bố làm gì?
      {
        id: 6, speaker: 'Chiki',
        segments: [{ text: "お" }, { text: "父", furigana: "とう" }, { text: "さんは" }, { text: "何", furigana: "なに" }, { text: "をしていますか。" }],
        kana: 'おとうさんはなにをしていますか。',
        romaji: 'Otousan wa nani o shiteimasu ka?',
        meaning: 'Bố bạn đang làm nghề gì?'
      },

      // 4. B: Nhân viên công ty
      {
        id: 7, speaker: 'Aki',
        segments: [{ text: "会社員", furigana: "かいしゃいん" }, { text: "です。" }],
        kana: 'かいしゃいんです。',
        romaji: 'Kaishain desu.',
        meaning: 'Bố là nhân viên công ty.'
      },

      // 5. A: Mẹ có làm việc không?
      {
        id: 8, speaker: 'Chiki',
        segments: [{ text: "お" }, { text: "母", furigana: "かあ" }, { text: "さんは" }, { text: "仕事", furigana: "しごと" }, { text: "をしていますか。" }],
        kana: 'おかあさんはしごとをしていますか。',
        romaji: 'Okaasan wa shigoto o shiteimasu ka?',
        meaning: 'Mẹ bạn có đi làm không?'
      },

      // 6. B: Có
      {
        id: 9, speaker: 'Aki',
        segments: [{ text: "はい、しています。" }],
        kana: 'はい、しています。',
        romaji: 'Hai, shiteimasu.',
        meaning: 'Vâng, có ạ.'
      },

      // 7. A: Có anh em không?
      {
        id: 10, speaker: 'Chiki',
        segments: [{ text: "兄弟", furigana: "きょうだい" }, { text: "がいますか。" }],
        kana: 'きょうだいがいますか。',
        romaji: 'Kyoudai ga imasu ka?',
        meaning: 'Bạn có anh chị em không?'
      },

      // 8. B: Có 1 em trai
      {
        id: 11, speaker: 'Aki',
        segments: [{ text: "はい、" }, { text: "弟", furigana: "おとうと" }, { text: "が" }, { text: "一人", furigana: "ひとり" }, { text: "います。" }],
        kana: 'はい、おとうとがひとりいます。',
        romaji: 'Hai, otouto ga hitori imasu.',
        meaning: 'Vâng, tôi có một em trai.'
      },

      // --- QUIZ 4: TỪ VỰNG OTOUTO (Câu 4) ---
      {
        id: 12, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "弟", furigana: "おとうと" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Anh trai (Ani)', 'Em trai', 'Chị gái (Ane)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "意味", furigana: "いみ" }, { text: "は..." }],
        kana: 'いみは...',
        romaji: 'Imi wa...',
        meaning: '💡 Giải thích: "Otouto" là em trai.'
      },

      // --- QUIZ 5: TRỢ TỪ GA (Câu 5) ---
      {
        id: 13, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "弟", furigana: "おとうと" }, { text: "がいます」の「が」は？" }
        ],
        quizOptions: ['Chỉ chủ đề', 'Chỉ sự tồn tại', 'Chỉ nơi chốn'],
        correctOptionIndex: 1, // B
        segments: [{ text: "存在", furigana: "そんざい" }, { text: "を..." }],
        kana: 'そんざいを...',
        romaji: 'Sonzai o...',
        meaning: '💡 Giải thích: Với động từ "Imasu" (Có người/động vật), trợ từ "Ga" chỉ đối tượng tồn tại (Có ai? -> Có em trai).'
      },

      // 9. A: Có hòa thuận không?
      {
        id: 14, speaker: 'Chiki',
        segments: [{ text: "家族", furigana: "かぞく" }, { text: "は" }, { text: "仲", furigana: "なか" }, { text: "がいいですか。" }],
        kana: 'かぞくはなかがいいですか。',
        romaji: 'Kazoku wa naka ga ii desu ka?',
        meaning: 'Gia đình bạn có hòa thuận không?'
      },

      // 10. B: Rất hòa thuận
      {
        id: 15, speaker: 'Aki',
        segments: [{ text: "はい、とても" }, { text: "仲", furigana: "なか" }, { text: "がいいです。" }],
        kana: 'はい、とてもなかがいいです。',
        romaji: 'Hai, totemo naka ga ii desu.',
        meaning: 'Vâng, rất hòa thuận.'
      },

      // --- QUIZ 6: TỪ VỰNG NAKA GA II (Câu 6) ---
      {
        id: 16, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "仲", furigana: "なか" }, { text: "がいい」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Hay cãi nhau (Kenka suru)', 'Hòa thuận / Thân thiết', 'Ít nói (Mukuchi)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "関係", furigana: "かんけい" }, { text: "が..." }],
        kana: 'かんけいが...',
        romaji: 'Kankei ga...',
        meaning: '💡 Giải thích: "Naka ga ii" nghĩa là quan hệ tốt, thân thiết, hòa thuận.'
      },

      // --- PHẦN TRẮC NGHIỆM CUỐI BÀI (D) ---

      // Câu 11: Mấy người
      {
        id: 17, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": Bの" }, { text: "家族", furigana: "かぞく" }, { text: "は" }, { text: "何人", furigana: "なんにん" }, { text: "ですか。" }
        ],
        quizOptions: ['3人', '4人', '5人'],
        correctOptionIndex: 1, // B
        segments: [{ text: "正解", furigana: "せいかい" }, { text: "は..." }],
        kana: 'せいかいは...',
        romaji: 'Seikai wa...',
        meaning: '💡 Giải thích: Aki nói "Yonin imasu" (Có 4 người).'
      },

      // Câu 12: Anh chị em
      {
        id: 18, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": Bに" }, { text: "兄弟", furigana: "きょうだい" }, { text: "がいますか。" }
        ],
        quizOptions: ['Không, không có', 'Có, một em trai', 'Có, anh trai'],
        correctOptionIndex: 1, // B
        segments: [{ text: "答", furigana: "こた" }, { text: "えは..." }],
        kana: 'こたえは...',
        romaji: 'Kotae wa...',
        meaning: '💡 Giải thích: Aki nói "Otouto ga hitori imasu" (Có 1 em trai).'
      },

      // Câu 13: Nghĩa Naka ga ii (Lặp lại để ôn tập)
      {
        id: 19, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "意味", furigana: "いみ" }, { text: ": 「" }, { text: "仲", furigana: "なか" }, { text: "がいい」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Không thân', 'Thân thiết', 'Xa cách'],
        correctOptionIndex: 1, // B
        segments: [{ text: "良", furigana: "よ" }, { text: "い" }, { text: "関係", furigana: "かんけい" }, { text: "。" }],
        kana: 'よいかんけい。',
        romaji: 'Yoi kankei.',
        meaning: '💡 Giải thích: "Naka ga ii" là tình cảm tốt đẹp, thân thiết.'
      },

      // Câu 14: Mẹ có làm việc không
      {
        id: 20, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": お" }, { text: "母", furigana: "かあ" }, { text: "さんは" }, { text: "仕事", furigana: "しごと" }, { text: "をしていますか。" }
        ],
        quizOptions: ['Có, đang làm', 'Không, không làm', 'Không biết'],
        correctOptionIndex: 0, // A
        segments: [{ text: "母", furigana: "はは" }, { text: "の" }, { text: "こと..." }],
        kana: 'ははのこと...',
        romaji: 'Haha no koto...',
        meaning: '💡 Giải thích: Aki trả lời "Hai, shiteimasu" (Vâng, có làm).'
      }
    ]
  },
  // --- HỘI THOẠI 11: DU LỊCH (DAIGO & CHIKI) ---
  {
    id: 'conv_11_travel',
    title: '11. Du lịch (旅行)',
    description: 'Hội thoại về kế hoạch đi du lịch Nhật Bản, thời gian và người đồng hành.',
    characters: ['Daigo', 'Chiki'], // Daigo = A, Chiki = B
    prerequisites: ['travel', 'numbers'],
    lines: [
      // 1. A: Thích du lịch không?
      {
        id: 1, speaker: 'Daigo',
        segments: [{ text: "旅行", furigana: "りょこう" }, { text: "が" }, { text: "好", furigana: "す" }, { text: "きですか。" }],
        kana: 'りょこうがすきですか。',
        romaji: 'Ryokou ga suki desu ka?',
        meaning: 'Bạn có thích du lịch không?'
      },

      // --- QUIZ 1: TỪ VỰNG RYOKOU (Câu 1) ---
      {
        id: 2, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "旅行", furigana: "りょこう" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Công việc (Shigoto)', 'Du lịch', 'Học tập (Benkyou)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "意味", furigana: "いみ" }, { text: "は..." }],
        kana: 'いみは...',
        romaji: 'Imi wa...',
        meaning: '💡 Giải thích: "Ryokou" nghĩa là Du lịch.'
      },

      // 2. B: Có thích
      {
        id: 3, speaker: 'Chiki',
        segments: [{ text: "はい、" }, { text: "好", furigana: "す" }, { text: "きです。" }],
        kana: 'はい、すきです。',
        romaji: 'Hai, suki desu.',
        meaning: 'Vâng, tôi thích.'
      },

      // 3. A: Muốn đi đâu?
      {
        id: 4, speaker: 'Daigo',
        segments: [{ text: "どこへ" }, { text: "行", furigana: "い" }, { text: "きたいですか。" }],
        kana: 'どこへいきたいですか。',
        romaji: 'Doko e ikitai desu ka?',
        meaning: 'Bạn muốn đi đâu?'
      },

      // 4. B: Muốn đi Nhật
      {
        id: 5, speaker: 'Chiki',
        segments: [{ text: "日本", furigana: "にほん" }, { text: "へ" }, { text: "行", furigana: "い" }, { text: "きたいです。" }],
        kana: 'にほんへいきたいです。',
        romaji: 'Nihon e ikitai desu.',
        meaning: 'Tôi muốn đi Nhật Bản.'
      },

      // --- QUIZ 2: TRỢ TỪ HE (Câu 2 & 7) ---
      {
        id: 6, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "日本", furigana: "にほん" }, { text: "へ...」の「へ」は？" }
        ],
        quizOptions: ['Nơi xuất phát', 'Hướng / Điểm đến', 'Thời gian'],
        correctOptionIndex: 1, // B
        segments: [{ text: "方向", furigana: "ほうこう" }, { text: "です。" }],
        kana: 'ほうこうです。',
        romaji: 'Houkou desu.',
        meaning: '💡 Giải thích: Trợ từ "He" (đọc là E) chỉ phương hướng hoặc điểm đến của hành động di chuyển.'
      },

      // --- QUIZ 3: TAI DESU (Câu 3 & 9) ---
      {
        id: 7, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "行", furigana: "い" }, { text: "きたいです」は" }, { text: "何", furigana: "なに" }, { text: "を表す？" }
        ],
        quizOptions: ['Hành động đã xong', 'Mong muốn (Want)', 'Mệnh lệnh'],
        correctOptionIndex: 1, // B
        segments: [{ text: "希望", furigana: "きぼう" }, { text: "です。" }],
        kana: 'きぼうです。',
        romaji: 'Kibou desu.',
        meaning: '💡 Giải thích: Mẫu câu "V-tai desu" diễn tả mong muốn làm gì đó (Muốn đi).'
      },

      // 5. A: Khi nào đi?
      {
        id: 8, speaker: 'Daigo',
        segments: [{ text: "いつ" }, { text: "行", furigana: "い" }, { text: "きますか。" }],
        kana: 'いついきますか。',
        romaji: 'Itsu ikimasu ka?',
        meaning: 'Khi nào bạn đi?'
      },

      // 6. B: Năm sau
      {
        id: 9, speaker: 'Chiki',
        segments: [{ text: "来年", furigana: "らいねん" }, { text: "行", furigana: "い" }, { text: "きます。" }],
        kana: 'らいねんいきます。',
        romaji: 'Rainen ikimasu.',
        meaning: 'Năm sau tôi sẽ đi.'
      },

      // --- QUIZ 4: TỪ VỰNG RAINEN (Câu 4) ---
      {
        id: 10, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "来年", furigana: "らいねん" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Năm ngoái (Kyonen)', 'Năm nay (Kotoshi)', 'Năm sau'],
        correctOptionIndex: 2, // C
        segments: [{ text: "次", furigana: "つぎ" }, { text: "の" }, { text: "年", furigana: "とし" }, { text: "..." }],
        kana: 'つぎのとし...',
        romaji: 'Tsugi no toshi...',
        meaning: '💡 Giải thích: "Rainen" là năm sau (Lai niên).'
      },

      // 7. A: Đi bao lâu?
      {
        id: 11, speaker: 'Daigo',
        segments: [{ text: "何日", furigana: "なんにち" }, { text: "ぐらい" }, { text: "行", furigana: "い" }, { text: "きますか。" }],
        kana: 'なんにちぐらいいきますか。',
        romaji: 'Nannichi gurai ikimasu ka?',
        meaning: 'Bạn đi khoảng bao nhiêu ngày?'
      },

      // 8. B: Khoảng 5 ngày
      {
        id: 12, speaker: 'Chiki',
        segments: [{ text: "5" }, { text: "日", furigana: "にち" }, { text: "ぐらい" }, { text: "行", furigana: "い" }, { text: "きます。" }],
        kana: 'ごにちぐらいいきます。',
        romaji: 'Gonichi gurai ikimasu.',
        meaning: 'Tôi đi khoảng 5 ngày.'
      },

      // --- QUIZ 5: GURAI (Câu 5 & 8) ---
      {
        id: 13, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「ぐらい」は" }, { text: "何", furigana: "なに" }, { text: "を表す？" }
        ],
        quizOptions: ['Số lượng chính xác', 'Khoảng chừng (Ước lượng)', 'So sánh'],
        correctOptionIndex: 1, // B
        segments: [{ text: "およそ..." }],
        kana: 'およそ...',
        romaji: 'Oyoso...',
        meaning: '💡 Giải thích: "Gurai" (hoặc Kurai) đứng sau số lượng từ để chỉ sự ước lượng (Khoảng chừng).'
      },

      // 9. A: Đi một mình à?
      {
        id: 14, speaker: 'Daigo',
        segments: [{ text: "一人", furigana: "ひとり" }, { text: "で" }, { text: "行", furigana: "い" }, { text: "きますか。" }],
        kana: 'ひとりでいきますか。',
        romaji: 'Hitori de ikimasu ka?',
        meaning: 'Bạn đi một mình à?'
      },

      // --- QUIZ 6: HITORI DE (Câu 6) ---
      {
        id: 15, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "一人", furigana: "ひとり" }, { text: "で」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Một mình', 'Cùng nhau (Issho ni)', 'Nhanh chóng'],
        correctOptionIndex: 0, // A
        segments: [{ text: "他", furigana: "ほか" }, { text: "の" }, { text: "人", furigana: "ひと" }, { text: "なしで..." }],
        kana: 'ほかのひとなしで...',
        romaji: 'Hoka no hito nashi de...',
        meaning: '💡 Giải thích: "Hitori" (1 người) + "De" -> Một mình (trạng thái làm việc gì đó một mình).'
      },

      // 10. B: Đi với bạn
      {
        id: 16, speaker: 'Chiki',
        segments: [{ text: "いいえ、" }, { text: "友", furigana: "とも" }, { text: "だちと" }, { text: "行", furigana: "い" }, { text: "きます。" }],
        kana: 'いいえ、ともだちといきます。',
        romaji: 'Iie, tomodachi to ikimasu.',
        meaning: 'Không, tôi đi cùng bạn.'
      },

      // --- PHẦN TRẮC NGHIỆM CUỐI BÀI (D) ---

      // Câu 11: Thích du lịch không
      {
        id: 17, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": Bは" }, { text: "旅行", furigana: "りょこう" }, { text: "が" }, { text: "好", furigana: "す" }, { text: "きですか。" }
        ],
        quizOptions: ['はい、好きです', 'いいえ、好きではありません', 'わかりません'],
        correctOptionIndex: 0, // A
        segments: [{ text: "正解", furigana: "せいかい" }, { text: "は..." }],
        kana: 'せいかいは...',
        romaji: 'Seikai wa...',
        meaning: '💡 Giải thích: Chiki đã trả lời "Hai, suki desu" ở đầu bài.'
      },

      // Câu 12: Khi nào đi
      {
        id: 18, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": Bはいつ" }, { text: "行", furigana: "い" }, { text: "きますか。" }
        ],
        quizOptions: ['Tháng này (Kongetsu)', 'Năm sau (Rainen)', 'Tuần sau (Raishuu)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "時期", furigana: "じき" }, { text: "は..." }],
        kana: 'じきは...',
        romaji: 'Jiki wa...',
        meaning: '💡 Giải thích: Chiki nói "Rainen ikimasu" (Năm sau).'
      },

      // Câu 13: Đi bao lâu
      {
        id: 19, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": どのくらい" }, { text: "行", furigana: "い" }, { text: "きますか。" }
        ],
        quizOptions: ['Khoảng 3 ngày', 'Khoảng 5 ngày', 'Khoảng 7 ngày'],
        correctOptionIndex: 1, // B
        segments: [{ text: "期間", furigana: "きかん" }, { text: "は..." }],
        kana: 'きかんは...',
        romaji: 'Kikan wa...',
        meaning: '💡 Giải thích: Chiki nói "5-nichi gurai" (Khoảng 5 ngày).'
      },

      // Câu 14: Đi với ai
      {
        id: 20, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": " }, { text: "誰", furigana: "だれ" }, { text: "と" }, { text: "行", furigana: "い" }, { text: "きますか。" }
        ],
        quizOptions: ['Một mình (Hitori)', 'Gia đình (Kazoku)', 'Bạn bè (Tomodachi)'],
        correctOptionIndex: 2, // C
        segments: [{ text: "同行者", furigana: "どうこうしゃ" }, { text: "は..." }],
        kana: 'どうこうしゃは...',
        romaji: 'Doukousha wa...',
        meaning: '💡 Giải thích: Chiki nói "Tomodachi to ikimasu" (Đi cùng bạn).'
      }
    ]
  },
  // --- HỘI THOẠI 12: SỞ THÍCH (ISORA & AKI) ---
  {
    id: 'conv_12_hobby',
    title: '12. Sở thích (趣味)',
    description: 'Hội thoại hỏi về sở thích, thể loại nhạc yêu thích và thói quen nghe nhạc.',
    characters: ['Isora', 'Aki'], // Isora = A, Aki = B
    prerequisites: ['hobbies', 'music'],
    lines: [
      // 1. A: Sở thích là gì?
      {
        id: 1, speaker: 'Isora',
        segments: [{ text: "趣味", furigana: "しゅみ" }, { text: "は" }, { text: "何", furigana: "なん" }, { text: "ですか。" }],
        kana: 'しゅみはなんですか。',
        romaji: 'Shumi wa nan desu ka?',
        meaning: 'Sở thích của bạn là gì?'
      },

      // --- QUIZ 1: TỪ VỰNG SHUMI (Câu 1) ---
      {
        id: 2, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "趣味", furigana: "しゅみ" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Công việc (Shigoto)', 'Sở thích', 'Thói quen (Shuukan)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "意味", furigana: "いみ" }, { text: "は..." }],
        kana: 'いみは...',
        romaji: 'Imi wa...',
        meaning: '💡 Giải thích: "Shumi" nghĩa là Sở thích.'
      },

      // 2. B: Nghe nhạc
      {
        id: 3, speaker: 'Aki',
        segments: [{ text: "音楽", furigana: "おんがく" }, { text: "を" }, { text: "聞", furigana: "き" }, { text: "くことです。" }],
        kana: 'おんがくをきくことです。',
        romaji: 'Ongaku o kiku koto desu.',
        meaning: 'Là việc nghe nhạc.'
      },

      // --- QUIZ 2: TRỢ TỪ O (Câu 2 & 7) ---
      {
        id: 4, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "音楽", furigana: "おんがく" }, { text: "を" }, { text: "聞", furigana: "き" }, { text: "く」の「を」は？" }
        ],
        quizOptions: ['Chỉ nơi chốn', 'Chỉ đối tượng (Tân ngữ)', 'Chỉ thời gian'],
        correctOptionIndex: 1, // B
        segments: [{ text: "目的語", furigana: "もくてきご" }, { text: "を..." }],
        kana: 'もくてきごを...',
        romaji: 'Mokutekigo o...',
        meaning: '💡 Giải thích: Trợ từ "O" chỉ đối tượng của hành động (Nghe cái gì? -> Nghe Nhạc).'
      },

      // 3. A: Thích nhạc gì?
      {
        id: 5, speaker: 'Isora',
        segments: [{ text: "どんな" }, { text: "音楽", furigana: "おんがく" }, { text: "が" }, { text: "好", furigana: "す" }, { text: "きですか。" }],
        kana: 'どんなおんがくがすきですか。',
        romaji: 'Donna ongaku ga suki desu ka?',
        meaning: 'Bạn thích loại nhạc nào?'
      },

      // --- QUIZ 3: DONNA (Câu 3) ---
      {
        id: 6, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「どんな」は" }, { text: "何", furigana: "なに" }, { text: "を" }, { text: "聞", furigana: "き" }, { text: "く？" }
        ],
        quizOptions: ['Số lượng', 'Loại / Tính chất', 'Thời gian'],
        correctOptionIndex: 1, // B
        segments: [{ text: "種類", furigana: "しゅるい" }, { text: "や" }, { text: "特徴", furigana: "とくちょう" }, { text: "..." }],
        kana: 'しゅるいやとくちょう...',
        romaji: 'Shurui ya tokuchou...',
        meaning: '💡 Giải thích: "Donna" dùng để hỏi về chủng loại hoặc tính chất của sự vật/sự việc.'
      },

      // 4. B: Nhạc Pop
      {
        id: 7, speaker: 'Aki',
        segments: [{ text: "ポップスが" }, { text: "好", furigana: "す" }, { text: "きです。" }],
        kana: 'ポップスがすきです。',
        romaji: 'Poppusu ga suki desu.',
        meaning: 'Tôi thích nhạc Pop.'
      },

      // 5. A: Nghe khi nào?
      {
        id: 8, speaker: 'Isora',
        segments: [{ text: "いつ" }, { text: "音楽", furigana: "おんがく" }, { text: "を" }, { text: "聞", furigana: "き" }, { text: "きますか。" }],
        kana: 'いつおんがくをききますか。',
        romaji: 'Itsu ongaku o kikimasu ka?',
        meaning: 'Bạn nghe nhạc khi nào?'
      },

      // 6. B: Khi rảnh
      {
        id: 9, speaker: 'Aki',
        segments: [{ text: "ひまなときに" }, { text: "聞", furigana: "き" }, { text: "きます。" }],
        kana: 'ひまなときにききます。',
        romaji: 'Hima na toki ni kikimasu.',
        meaning: 'Tôi nghe khi rảnh rỗi.'
      },

      // --- QUIZ 4: HIMA NA TOKI (Câu 4 & 8) ---
      {
        id: 10, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「ひまなとき」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Khi bận (Isogashii)', 'Khi rảnh rỗi', 'Khi buồn (Kanashii)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "時間", furigana: "じかん" }, { text: "がある" }, { text: "時", furigana: "とき" }, { text: "..." }],
        kana: 'じかんがあるとき...',
        romaji: 'Jikan ga aru toki...',
        meaning: '💡 Giải thích: "Hima" (Rảnh) + "Toki" (Khi/Lúc) -> Khi rảnh rỗi.'
      },

      // 7. A: Nghe bao lâu 1 ngày?
      {
        id: 11, speaker: 'Isora',
        segments: [{ text: "一日", furigana: "いちにち" }, { text: "にどのくらい" }, { text: "聞", furigana: "き" }, { text: "きますか。" }],
        kana: 'いちにちにどのくらいききますか。',
        romaji: 'Ichinichi ni dono kurai kikimasu ka?',
        meaning: 'Một ngày bạn nghe khoảng bao lâu?'
      },

      // 8. B: Khoảng 1 tiếng
      {
        id: 12, speaker: 'Aki',
        segments: [{ text: "1" }, { text: "時間", furigana: "じかん" }, { text: "ぐらい" }, { text: "聞", furigana: "き" }, { text: "きます。" }],
        kana: 'いちじかんぐらいききます。',
        romaji: 'Ichi-jikan gurai kikimasu.',
        meaning: 'Tôi nghe khoảng 1 tiếng.'
      },

      // --- QUIZ 5: GURAI (Câu 5) ---
      {
        id: 13, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「1" }, { text: "時間", furigana: "じかん" }, { text: "ぐらい」の「ぐらい」は？" }
        ],
        quizOptions: ['Chính xác', 'Khoảng chừng', 'So sánh'],
        correctOptionIndex: 1, // B
        segments: [{ text: "およそ..." }],
        kana: 'およそ...',
        romaji: 'Oyoso...',
        meaning: '💡 Giải thích: "Gurai" dùng để chỉ lượng ước chừng (Khoảng 1 tiếng).'
      },

      // 9. A: Nghe mỗi ngày không?
      {
        id: 14, speaker: 'Isora',
        segments: [{ text: "毎日", furigana: "まいにち" }, { text: "聞", furigana: "き" }, { text: "きますか。" }],
        kana: 'まいにちききますか。',
        romaji: 'Mainichi kikimasu ka?',
        meaning: 'Bạn có nghe mỗi ngày không?'
      },

      // 10. B: Có
      {
        id: 15, speaker: 'Aki',
        segments: [{ text: "はい、" }, { text: "毎日", furigana: "まいにち" }, { text: "聞", furigana: "き" }, { text: "きます。" }],
        kana: 'はい、まいにちききます。',
        romaji: 'Hai, mainichi kikimasu.',
        meaning: 'Vâng, tôi nghe mỗi ngày.'
      },

      // --- QUIZ 6: MAINICHI (Câu 6) ---
      {
        id: 16, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "毎日", furigana: "まいにち" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Thỉnh thoảng (Tokidoki)', 'Mỗi ngày', 'Cuối tuần (Shuumatsu)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "頻度", furigana: "ひんど" }, { text: "は..." }],
        kana: 'ひんどは...',
        romaji: 'Hindo wa...',
        meaning: '💡 Giải thích: "Mainichi" nghĩa là mỗi ngày (Hàng ngày).'
      },

      // --- PHẦN TRẮC NGHIỆM CUỐI BÀI (D) ---

      // Câu 11: Sở thích là gì
      {
        id: 17, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": Bの" }, { text: "趣味", furigana: "しゅみ" }, { text: "は" }, { text: "何", furigana: "なん" }, { text: "ですか。" }
        ],
        quizOptions: ['Nghe nhạc', 'Học tập', 'Làm việc'],
        correctOptionIndex: 0, // A
        segments: [{ text: "正解", furigana: "せいかい" }, { text: "は..." }],
        kana: 'せいかいは...',
        romaji: 'Seikai wa...',
        meaning: '💡 Giải thích: Aki nói "Ongaku o kiku koto desu" (Việc nghe nhạc).'
      },

      // Câu 12: Thích nhạc gì
      {
        id: 18, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": どんな" }, { text: "音楽", furigana: "おんがく" }, { text: "が" }, { text: "好", furigana: "す" }, { text: "きですか。" }
        ],
        quizOptions: ['Rock (Rokku)', 'Pops (Poppusu)', 'Cổ điển (Kurashikku)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "ジャンルは..." }],
        kana: 'ジャンルは...',
        romaji: 'Janru wa...',
        meaning: '💡 Giải thích: Aki nói "Poppusu ga suki desu".'
      },

      // Câu 13: Nghĩa Hima na toki
      {
        id: 19, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "意味", furigana: "いみ" }, { text: ": 「ひまなとき」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Khi bận', 'Khi rảnh', 'Khi ngủ'],
        correctOptionIndex: 1, // B
        segments: [{ text: "時間", furigana: "じかん" }, { text: "がある" }, { text: "時", furigana: "とき" }, { text: "..." }],
        kana: 'じかんがあるとき...',
        romaji: 'Jikan ga aru toki...',
        meaning: '💡 Giải thích: "Hima na toki" nghĩa là lúc rảnh rỗi.'
      },

      // Câu 14: Nghe mỗi ngày không
      {
        id: 20, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": " }, { text: "毎日", furigana: "まいにち" }, { text: "聞", furigana: "き" }, { text: "きますか。" }
        ],
        quizOptions: ['Có, nghe mỗi ngày', 'Không, không nghe', 'Thỉnh thoảng mới nghe'],
        correctOptionIndex: 0, // A
        segments: [{ text: "頻度", furigana: "ひんど" }, { text: "は..." }],
        kana: 'ひんどは...',
        romaji: 'Hindo wa...',
        meaning: '💡 Giải thích: Aki xác nhận "Hai, mainichi kikimasu".'
      }
    ]
  },
  // --- HỘI THOẠI 13: ĐỒ ĂN (CHIKI & DAIGO) ---
  {
    id: 'conv_13_food',
    title: '13. Đồ ăn (食べ物)',
    description: 'Hội thoại về món ăn yêu thích, nơi ăn uống và khẩu vị cay/ngọt.',
    characters: ['Chiki', 'Daigo'], // Chiki = A, Daigo = B
    prerequisites: ['food', 'routine'],
    lines: [
      // 1. A: Thích món gì?
      {
        id: 1, speaker: 'Chiki',
        segments: [{ text: "好", furigana: "す" }, { text: "きな" }, { text: "食", furigana: "た" }, { text: "べ" }, { text: "物", furigana: "もの" }, { text: "は" }, { text: "何", furigana: "なん" }, { text: "ですか。" }],
        kana: 'すきなたべものはなんですか。',
        romaji: 'Suki na tabemono wa nan desu ka?',
        meaning: 'Món ăn yêu thích của bạn là gì?'
      },

      // --- QUIZ 1: TỪ VỰNG TABEMONO (Câu 1) ---
      {
        id: 2, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "食", furigana: "た" }, { text: "べ" }, { text: "物", furigana: "もの" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Đồ uống (Nomimono)', 'Đồ ăn', 'Nhà hàng (Resutoran)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "意味", furigana: "いみ" }, { text: "は..." }],
        kana: 'いみは...',
        romaji: 'Imi wa...',
        meaning: '💡 Giải thích: "Tabemono" là Đồ ăn. Đồ uống là "Nomimono".'
      },

      // 2. B: Thích Phở
      {
        id: 3, speaker: 'Daigo',
        segments: [{ text: "フォーが" }, { text: "好", furigana: "す" }, { text: "きです。" }],
        kana: 'フォーがすきです。',
        romaji: 'Foo ga suki desu.',
        meaning: 'Tôi thích Phở.'
      },

      // --- QUIZ 2: TRỢ TỪ GA (Câu 2) ---
      {
        id: 4, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「フォーが" }, { text: "好", furigana: "す" }, { text: "き」の「が」は？" }
        ],
        quizOptions: ['Chỉ chủ đề', 'Chỉ đối tượng được thích', 'Chỉ nơi chốn'],
        correctOptionIndex: 1, // B
        segments: [{ text: "対象", furigana: "たいしょう" }, { text: "を..." }],
        kana: 'たいしょうを...',
        romaji: 'Taishou o...',
        meaning: '💡 Giải thích: Với tính từ "Suki" (Thích), trợ từ "Ga" dùng để chỉ đối tượng mà mình thích.'
      },

      // 3. A: Ăn thường xuyên không?
      {
        id: 5, speaker: 'Chiki',
        segments: [{ text: "よく" }, { text: "食", furigana: "た" }, { text: "べますか。" }],
        kana: 'よくたべますか。',
        romaji: 'Yoku tabemasu ka?',
        meaning: 'Bạn có hay ăn không?'
      },

      // --- QUIZ 3: PHÓ TỪ YOKU (Câu 3) ---
      {
        id: 6, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「よく」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Hiếm khi (Amari)', 'Thường xuyên / Hay', 'Không bao giờ (Zenzen)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "頻度", furigana: "ひんど" }, { text: "は..." }],
        kana: 'ひんどは...',
        romaji: 'Hindo wa...',
        meaning: '💡 Giải thích: "Yoku" là phó từ chỉ tần suất cao (Thường xuyên, hay).'
      },

      // 4. B: Hay ăn
      {
        id: 7, speaker: 'Daigo',
        segments: [{ text: "はい、よく" }, { text: "食", furigana: "た" }, { text: "べます。" }],
        kana: 'はい、よくたべます。',
        romaji: 'Hai, yoku tabemasu.',
        meaning: 'Vâng, tôi hay ăn lắm.'
      },

      // 5. A: Ăn ở đâu?
      {
        id: 8, speaker: 'Chiki',
        segments: [{ text: "どこで" }, { text: "食", furigana: "た" }, { text: "べますか。" }],
        kana: 'どこでたべますか。',
        romaji: 'Doko de tabemasu ka?',
        meaning: 'Bạn ăn ở đâu?'
      },

      // 6. B: Ăn ở nhà
      {
        id: 9, speaker: 'Daigo',
        segments: [{ text: "家", furigana: "いえ" }, { text: "で" }, { text: "食", furigana: "た" }, { text: "べます。" }],
        kana: 'いえでたべます。',
        romaji: 'Ie de tabemasu.',
        meaning: 'Tôi ăn ở nhà.'
      },

      // --- QUIZ 4: TRỢ TỪ DE (Câu 6) ---
      {
        id: 10, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "家", furigana: "いえ" }, { text: "で" }, { text: "食", furigana: "た" }, { text: "べます」の「で」は？" }
        ],
        quizOptions: ['Nơi diễn ra hành động', 'Hướng đi (He)', 'Thời gian (Ni)'],
        correctOptionIndex: 0, // A
        segments: [{ text: "場所", furigana: "ばしょ" }, { text: "を..." }],
        kana: 'ばしょを...',
        romaji: 'Basho o...',
        meaning: '💡 Giải thích: Trợ từ "De" chỉ địa điểm nơi hành động (ăn) diễn ra.'
      },

      // 7. A: Ăn sáng à?
      {
        id: 11, speaker: 'Chiki',
        segments: [{ text: "朝", furigana: "あさ" }, { text: "ごはんに" }, { text: "食", furigana: "た" }, { text: "べますか。" }],
        kana: 'あさごはんにたべますか。',
        romaji: 'Asagohan ni tabemasu ka?',
        meaning: 'Bạn ăn vào bữa sáng à?'
      },

      // 8. B: Ăn trưa
      {
        id: 12, speaker: 'Daigo',
        segments: [{ text: "いいえ、" }, { text: "昼", furigana: "ひる" }, { text: "ごはんに" }, { text: "食", furigana: "た" }, { text: "べます。" }],
        kana: 'いいえ、ひるごはんにたべます。',
        romaji: 'Iie, hirugohan ni tabemasu.',
        meaning: 'Không, tôi ăn vào bữa trưa.'
      },

      // --- QUIZ 5: TỪ VỰNG HIRUGOHAN (Câu 4) ---
      {
        id: 13, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "昼", furigana: "ひる" }, { text: "ごはん」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Bữa sáng (Asagohan)', 'Bữa trưa', 'Bữa tối (Bangohan)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "食事", furigana: "しょくじ" }, { text: "の" }, { text: "時間", furigana: "じかん" }, { text: "..." }],
        kana: 'しょくじのじかん...',
        romaji: 'Shokuji no jikan...',
        meaning: '💡 Giải thích: "Hirugohan" là bữa trưa. "Asagohan" là bữa sáng, "Bangohan" là bữa tối.'
      },

      // 9. A: Thích cay không?
      {
        id: 14, speaker: 'Chiki',
        segments: [{ text: "辛", furigana: "から" }, { text: "い" }, { text: "食", furigana: "た" }, { text: "べ" }, { text: "物", furigana: "もの" }, { text: "が" }, { text: "好", furigana: "す" }, { text: "きですか。" }],
        kana: 'からいたべものがすきですか。',
        romaji: 'Karai tabemono ga suki desu ka?',
        meaning: 'Bạn có thích đồ ăn cay không?'
      },

      // --- QUIZ 6: TÍNH TỪ KARAI (Câu 5) ---
      {
        id: 15, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "辛", furigana: "から" }, { text: "い」はどの" }, { text: "種類", furigana: "しゅるい" }, { text: "？" }
        ],
        quizOptions: ['Tính từ đuôi Na', 'Tính từ đuôi I', 'Danh từ'],
        correctOptionIndex: 1, // B
        segments: [{ text: "形容詞", furigana: "けいようし" }, { text: "の" }, { text: "種類", furigana: "しゅるい" }, { text: "..." }],
        kana: 'けいようしのしゅるい...',
        romaji: 'Keiyoushi no shurui...',
        meaning: '💡 Giải thích: "Karai" kết thúc bằng "i", là tính từ đuôi I (Cay).'
      },

      // 10. B: Có thích
      {
        id: 16, speaker: 'Daigo',
        segments: [{ text: "はい、" }, { text: "好", furigana: "す" }, { text: "きです。" }],
        kana: 'はい、すきです。',
        romaji: 'Hai, suki desu.',
        meaning: 'Vâng, tôi thích.'
      },

      // --- PHẦN TRẮC NGHIỆM CUỐI BÀI (D) ---

      // Câu 11: Thích món gì
      {
        id: 17, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": Bはどの" }, { text: "食", furigana: "た" }, { text: "べ" }, { text: "物", furigana: "もの" }, { text: "が" }, { text: "好", furigana: "す" }, { text: "きですか。" }
        ],
        quizOptions: ['Mì Ramen', 'Phở (Foo)', 'Sushi'],
        correctOptionIndex: 1, // B
        segments: [{ text: "正解", furigana: "せいかい" }, { text: "は..." }],
        kana: 'せいかいは...',
        romaji: 'Seikai wa...',
        meaning: '💡 Giải thích: Daigo nói "Foo ga suki desu".'
      },

      // Câu 12: Ăn ở đâu
      {
        id: 18, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": Bはどこで" }, { text: "食", furigana: "た" }, { text: "べますか。" }
        ],
        quizOptions: ['Nhà hàng', 'Nhà (Ie)', 'Trường học'],
        correctOptionIndex: 1, // B
        segments: [{ text: "場所", furigana: "ばしょ" }, { text: "は..." }],
        kana: 'ばしょは...',
        romaji: 'Basho wa...',
        meaning: '💡 Giải thích: Daigo trả lời "Ie de tabemasu" (Ăn ở nhà).'
      },

      // Câu 13: Karai tabemono nghĩa là gì
      {
        id: 19, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "意味", furigana: "いみ" }, { text: ": 「" }, { text: "辛", furigana: "から" }, { text: "い" }, { text: "食", furigana: "た" }, { text: "べ" }, { text: "物", furigana: "もの" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Đồ ăn ngọt (Amai)', 'Đồ ăn cay', 'Đồ ăn mặn (Shiokarai)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "味", furigana: "あじ" }, { text: "は..." }],
        kana: 'あじは...',
        romaji: 'Aji wa...',
        meaning: '💡 Giải thích: "Karai" là cay.'
      },

      // Câu 14: Thích cay không
      {
        id: 20, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": Bは" }, { text: "辛", furigana: "から" }, { text: "いものが" }, { text: "好", furigana: "す" }, { text: "きですか。" }
        ],
        quizOptions: ['Có, thích', 'Không, không thích', 'Không biết'],
        correctOptionIndex: 0, // A
        segments: [{ text: "好", furigana: "この" }, { text: "みは..." }],
        kana: 'このみは...',
        romaji: 'Konomi wa...',
        meaning: '💡 Giải thích: Daigo xác nhận "Hai, suki desu".'
      }
    ]
  },
  // --- HỘI THOẠI 14: SỨC KHỎE (ISORA & DAIGO) ---
  {
    id: 'conv_14_health',
    title: '14. Sức khỏe (健康)',
    description: 'Hội thoại về tình trạng sức khỏe, thói quen ngủ nghỉ, tập thể dục và ăn uống.',
    characters: ['Isora', 'Daigo'], // Isora = A, Daigo = B
    prerequisites: ['routine', 'sports'],
    lines: [
      // 1. A: Hỏi tình trạng cơ thể
      {
        id: 1, speaker: 'Isora',
        segments: [{ text: "最近", furigana: "さいきん" }, { text: "、" }, { text: "体", furigana: "からだ" }, { text: "の" }, { text: "調子", furigana: "ちょうし" }, { text: "はどうですか。" }],
        kana: 'さいきん、からだのちょうしはどうですか。',
        romaji: 'Saikin, karada no choushi wa dou desu ka?',
        meaning: 'Dạo này tình trạng cơ thể của bạn thế nào?'
      },

      // 2. B: Khỏe
      {
        id: 2, speaker: 'Daigo',
        segments: [{ text: "元気", furigana: "げんき" }, { text: "です。" }],
        kana: 'げんきです。',
        romaji: 'Genki desu.',
        meaning: 'Tôi khỏe.'
      },

      // 3. A: Ngủ đủ không?
      {
        id: 3, speaker: 'Isora',
        segments: [{ text: "ちゃんと" }, { text: "寝", furigana: "ね" }, { text: "ていますか。" }],
        kana: 'ちゃんとねていますか。',
        romaji: 'Chanto nete imasu ka?',
        meaning: 'Bạn có ngủ nghỉ đầy đủ (đúng cách) không?'
      },

      // --- QUIZ 1: TỪ VỰNG CHANTO (Câu 6) ---
      {
        id: 4, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「ちゃんと」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Không hề (Zenzen)', 'Đúng cách / Đầy đủ', 'Nhanh chóng (Hayaku)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "しっかり..." }],
        kana: 'しっかり...',
        romaji: 'Shikkari...',
        meaning: '💡 Giải thích: "Chanto" diễn tả việc làm gì đó một cách cẩn thận, đúng đắn, đầy đủ.'
      },

      // --- QUIZ 2: ĐỘNG TỪ GỐC (Câu 2) ---
      {
        id: 5, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "寝", furigana: "ね" }, { text: "ています」の" }, { text: "辞書形", furigana: "じしょけい" }, { text: "は？" }
        ],
        quizOptions: ['寝る (Neru)', '食べる (Taberu)', '走る (Hashiru)'],
        correctOptionIndex: 0, // A
        segments: [{ text: "動詞", furigana: "どうし" }, { text: "の" }, { text: "原形", furigana: "げんけい" }, { text: "..." }],
        kana: 'どうしのげんけい...',
        romaji: 'Doushi no genkei...',
        meaning: '💡 Giải thích: "Nete imasu" bắt nguồn từ động từ nhóm 2 "Neru" (Ngủ).'
      },

      // 4. B: 7 tiếng
      {
        id: 6, speaker: 'Daigo',
        segments: [{ text: "はい、" }, { text: "毎日", furigana: "まいにち" }, { text: "7" }, { text: "時間", furigana: "じかん" }, { text: "寝", furigana: "ね" }, { text: "ています。" }],
        kana: 'はい、まいにちななじかんねています。',
        romaji: 'Hai, mainichi nana-jikan nete imasu.',
        meaning: 'Vâng, mỗi ngày tôi ngủ 7 tiếng.'
      },

      // 5. A: Tập thể dục không?
      {
        id: 7, speaker: 'Isora',
        segments: [{ text: "運動", furigana: "うんどう" }, { text: "をしていますか。" }],
        kana: 'うんどうをしていますか。',
        romaji: 'Undou o shiteimasu ka?',
        meaning: 'Bạn có tập thể dục không?'
      },

      // --- QUIZ 3: TỪ VỰNG UNDOU (Câu 4) ---
      {
        id: 8, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "運動", furigana: "うんどう" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Học tập', 'Nghỉ ngơi', 'Tập thể dục / Vận động'],
        correctOptionIndex: 2, // C
        segments: [{ text: "体", furigana: "からだ" }, { text: "を" }, { text: "動", furigana: "うご" }, { text: "かす..." }],
        kana: 'からだをうごかす...',
        romaji: 'Karada o ugokasu...',
        meaning: '💡 Giải thích: "Undou" nghĩa là vận động, tập thể dục thể thao.'
      },

      // 6. B: 3 lần 1 tuần
      {
        id: 9, speaker: 'Daigo',
        segments: [{ text: "はい、" }, { text: "週", furigana: "しゅう" }, { text: "に" }, { text: "3" }, { text: "回", furigana: "かい" }, { text: "運動", furigana: "うんどう" }, { text: "しています。" }],
        kana: 'はい、しゅうにさんかいうんどうしています。',
        romaji: 'Hai, shuu ni sankai undou shiteimasu.',
        meaning: 'Vâng, tôi tập 3 lần một tuần.'
      },

      // --- QUIZ 4: TẦN SUẤT (Câu 3) ---
      {
        id: 10, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "週", furigana: "しゅう" }, { text: "に3" }, { text: "回", furigana: "かい" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['3 ngày', '3 lần mỗi tuần', '3 giờ mỗi ngày'],
        correctOptionIndex: 1, // B
        segments: [{ text: "頻度", furigana: "ひんど" }, { text: "..." }],
        kana: 'ひんど...',
        romaji: 'Hindo...',
        meaning: '💡 Giải thích: "Shuu" (Tuần) + "Ni" (Trong) + "3-kai" (3 lần) -> 3 lần trong một tuần.'
      },

      // 7. A: Ăn rau không?
      {
        id: 11, speaker: 'Isora',
        segments: [{ text: "野菜", furigana: "やさい" }, { text: "をよく" }, { text: "食", furigana: "た" }, { text: "べますか。" }],
        kana: 'やさいをよくたべますか。',
        romaji: 'Yasai o yoku tabemasu ka?',
        meaning: 'Bạn có hay ăn rau không?'
      },

      // 8. B: Ăn mỗi ngày
      {
        id: 12, speaker: 'Daigo',
        segments: [{ text: "はい、" }, { text: "毎日", furigana: "まいにち" }, { text: "食", furigana: "た" }, { text: "べます。" }],
        kana: 'はい、まいにちたべます。',
        romaji: 'Hai, mainichi tabemasu.',
        meaning: 'Vâng, tôi ăn mỗi ngày.'
      },

      // 9. A: Chú ý sức khỏe
      {
        id: 13, speaker: 'Isora',
        segments: [{ text: "これからも" }, { text: "健康", furigana: "けんこう" }, { text: "に" }, { text: "気", furigana: "き" }, { text: "をつけますか。" }],
        kana: 'これからもけんこうにきをつけますか。',
        romaji: 'Korekara mo kenkou ni ki o tsukemasu ka?',
        meaning: 'Sau này bạn cũng sẽ chú ý đến sức khỏe chứ?'
      },

      // --- QUIZ 5: TỪ VỰNG KENKOU (Câu 1) ---
      {
        id: 14, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "健康", furigana: "けんこう" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Bệnh tật (Byouki)', 'Sức khỏe', 'Thể thao (Supootsu)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "意味", furigana: "いみ" }, { text: "は..." }],
        kana: 'いみは...',
        romaji: 'Imi wa...',
        meaning: '💡 Giải thích: "Kenkou" nghĩa là Sức khỏe.'
      },

      // --- QUIZ 6: TRỢ TỪ NI (Câu 5) ---
      {
        id: 15, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "健康", furigana: "けんこう" }, { text: "に" }, { text: "気", furigana: "き" }, { text: "をつける」の「に」は？" }
        ],
        quizOptions: ['Chỉ mục tiêu / đối tượng', 'Chỉ nơi chốn', 'Chỉ thời gian'],
        correctOptionIndex: 0, // A
        segments: [{ text: "注意", furigana: "ちゅうい" }, { text: "の" }, { text: "対象", furigana: "たいしょう" }, { text: "..." }],
        kana: 'ちゅういのたいしょう...',
        romaji: 'Chuui no taishou...',
        meaning: '💡 Giải thích: Trợ từ "Ni" ở đây chỉ đối tượng mà sự chú ý hướng tới (Chú ý ĐẾN cái gì? -> Đến sức khỏe).'
      },

      // 10. B: Sẽ chú ý
      {
        id: 16, speaker: 'Daigo',
        segments: [{ text: "はい、" }, { text: "気", furigana: "き" }, { text: "をつけます。" }],
        kana: 'はい、きをつけます。',
        romaji: 'Hai, ki o tsukemasu.',
        meaning: 'Vâng, tôi sẽ chú ý.'
      },

      // --- PHẦN TRẮC NGHIỆM CUỐI BÀI (D) ---

      // Câu 11: Ngủ bao lâu
      {
        id: 17, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": Bは" }, { text: "毎日", furigana: "まいにち" }, { text: "どのくらい" }, { text: "寝", furigana: "ね" }, { text: "ますか。" }
        ],
        quizOptions: ['5 tiếng', '6 tiếng', '7 tiếng'],
        correctOptionIndex: 2, // C
        segments: [{ text: "正解", furigana: "せいかい" }, { text: "は..." }],
        kana: 'せいかいは...',
        romaji: 'Seikai wa...',
        meaning: '💡 Giải thích: Daigo nói "Mainichi 7-jikan nete imasu" (7 tiếng).'
      },

      // Câu 12: Tập mấy lần
      {
        id: 18, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": " }, { text: "週", furigana: "しゅう" }, { text: "に" }, { text: "何回運動", furigana: "なんかいうんどう" }, { text: "しますか。" }
        ],
        quizOptions: ['1 lần', '2 lần', '3 lần'],
        correctOptionIndex: 2, // C
        segments: [{ text: "回数", furigana: "かいすう" }, { text: "は..." }],
        kana: 'かいすうは...',
        romaji: 'Kaisuu wa...',
        meaning: '💡 Giải thích: Daigo nói "Shuu ni 3-kai" (3 lần).'
      },

      // Câu 13: Nghĩa Ki o tsukemasu
      {
        id: 19, speaker: 'Isora',
        isQuiz: true,
        quizQuestion: [
          { text: "意味", furigana: "いみ" }, { text: ": 「" }, { text: "気", furigana: "き" }, { text: "をつけます」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Bỏ qua', 'Chú ý / Cẩn thận', 'Quên đi'],
        correctOptionIndex: 1, // B
        segments: [{ text: "意味", furigana: "いみ" }, { text: "は..." }],
        kana: 'いみは...',
        romaji: 'Imi wa...',
        meaning: '💡 Giải thích: "Ki o tsukemasu" nghĩa là cẩn thận, chú ý, giữ gìn.'
      },

      // Câu 14: Ăn rau không
      {
        id: 20, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": Bは" }, { text: "野菜", furigana: "やさい" }, { text: "を" }, { text: "毎日食", furigana: "まいにちた" }, { text: "べますか。" }
        ],
        quizOptions: ['Có, ăn mỗi ngày', 'Không, không ăn', 'Thỉnh thoảng ăn'],
        correctOptionIndex: 0, // A
        segments: [{ text: "食習慣", furigana: "しょくしゅうかん" }, { text: "..." }],
        kana: 'しょくしゅうかん...',
        romaji: 'Shokushuukan...',
        meaning: '💡 Giải thích: Daigo xác nhận "Hai, mainichi tabemasu" (Vâng, ăn mỗi ngày).'
      }
    ]
  },
  // --- HỘI THOẠI 15: TIỀN BẠC (DAIGO & CHIKI) ---
  {
    id: 'conv_15_money',
    title: '15. Tiền bạc (お金)',
    description: 'Hội thoại về thói quen chi tiêu, tiết kiệm và quản lý tài chính cá nhân.',
    characters: ['Daigo', 'Chiki'], // Daigo = A, Chiki = B
    prerequisites: ['housework', 'numbers'],
    lines: [
      // 1. A: Mỗi tháng có tiêu tiền không?
      {
        id: 1, speaker: 'Daigo',
        segments: [{ text: "毎月", furigana: "まいつき" }, { text: "、" }, { text: "お金", furigana: "おかね" }, { text: "を" }, { text: "使", furigana: "つか" }, { text: "いますか。" }],
        kana: 'まいつき、おかねをつかいますか。',
        romaji: 'Maitsuki, okane o tsukaimasu ka?',
        meaning: 'Hàng tháng bạn có tiêu tiền không?'
      },

      // --- QUIZ 1: TỪ VỰNG OKANE (Câu 1) ---
      {
        id: 2, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "お金", furigana: "おかね" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Công việc', 'Tiền bạc', 'Mua sắm'],
        correctOptionIndex: 1, // B
        segments: [{ text: "意味", furigana: "いみ" }, { text: "は..." }],
        kana: 'いみは...',
        romaji: 'Imi wa...',
        meaning: '💡 Giải thích: "Okane" (hoặc Kane) nghĩa là Tiền bạc.'
      },

      // 2. B: Có tiêu
      {
        id: 3, speaker: 'Chiki',
        segments: [{ text: "はい、" }, { text: "使", furigana: "つか" }, { text: "います。" }],
        kana: 'はい、つかいます。',
        romaji: 'Hai, tsukaimasu.',
        meaning: 'Vâng, có tiêu.'
      },

      // 3. A: Tiêu vào cái gì nhất?
      {
        id: 4, speaker: 'Daigo',
        segments: [{ text: "何", furigana: "なに" }, { text: "に" }, { text: "一番", furigana: "いちばん" }, { text: "お金", furigana: "おかね" }, { text: "を" }, { text: "使", furigana: "つか" }, { text: "いますか。" }],
        kana: 'なににいちばんおかねをつかいますか。',
        romaji: 'Nani ni ichiban okane o tsukaimasu ka?',
        meaning: 'Bạn tiêu tiền vào việc gì nhiều nhất?'
      },

      // --- QUIZ 2: TRỢ TỪ O (Câu 2) ---
      {
        id: 5, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "お金", furigana: "おかね" }, { text: "を" }, { text: "使", furigana: "つか" }, { text: "う」の「を」は？" }
        ],
        quizOptions: ['Chỉ nơi chốn', 'Chỉ đối tượng của hành động', 'Chỉ thời gian'],
        correctOptionIndex: 1, // B
        segments: [{ text: "目的語", furigana: "もくてきご" }, { text: "を..." }],
        kana: 'もくてきごを...',
        romaji: 'Mokutekigo o...',
        meaning: '💡 Giải thích: Trợ từ "O" chỉ đối tượng chịu tác động (Tiêu cái gì? -> Tiêu tiền).'
      },

      // --- QUIZ 3: ICHIBAN (Câu 4) ---
      {
        id: 6, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "一番", furigana: "いちばん" }, { text: "」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Ít nhất', 'Đầu tiên', 'Nhiều nhất / Nhất'],
        correctOptionIndex: 2, // C
        segments: [{ text: "最上級", furigana: "さいじょうきゅう" }, { text: "..." }],
        kana: 'さいじょうきゅう...',
        romaji: 'Saijoukyuu...',
        meaning: '💡 Giải thích: "Ichiban" dùng để so sánh nhất (Số 1, nhất).'
      },

      // 4. B: Tiêu vào đồ ăn
      {
        id: 7, speaker: 'Chiki',
        segments: [{ text: "食", furigana: "た" }, { text: "べ" }, { text: "物", furigana: "もの" }, { text: "に" }, { text: "一番", furigana: "いちばん" }, { text: "使", furigana: "つか" }, { text: "います。" }],
        kana: 'たべものにいちばんつかいます。',
        romaji: 'Tabemono ni ichiban tsukaimasu.',
        meaning: 'Tôi tiêu nhiều nhất vào đồ ăn.'
      },

      // 5. A: Có tiết kiệm không?
      {
        id: 8, speaker: 'Daigo',
        segments: [{ text: "お金", furigana: "おかね" }, { text: "を" }, { text: "貯", furigana: "た" }, { text: "めていますか。" }],
        kana: 'おかねをためていますか。',
        romaji: 'Okane o tamete imasu ka?',
        meaning: 'Bạn có đang tiết kiệm tiền không?'
      },

      // 6. B: Tiết kiệm một chút
      {
        id: 9, speaker: 'Chiki',
        segments: [{ text: "はい、" }, { text: "少", furigana: "すこ" }, { text: "し" }, { text: "貯", furigana: "た" }, { text: "めています。" }],
        kana: 'はい、すこしためています。',
        romaji: 'Hai, sukoshi tamete imasu.',
        meaning: 'Có, tôi đang tiết kiệm một chút.'
      },

      // --- QUIZ 4: THỂ TIẾP DIỄN (Câu 3) ---
      {
        id: 10, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「" }, { text: "貯", furigana: "た" }, { text: "めています」はどの" }, { text: "形", furigana: "かたち" }, { text: "？" }
        ],
        quizOptions: ['Quá khứ', 'Hiện tại tiếp diễn', 'Mệnh lệnh'],
        correctOptionIndex: 1, // B
        segments: [{ text: "〜ています。" }],
        kana: 'て います。',
        romaji: '~Te imasu.',
        meaning: '💡 Giải thích: "Tamete imasu" diễn tả trạng thái hoặc hành động đang diễn ra (Đang tiết kiệm).'
      },

      // 7. A: Tiết kiệm bao nhiêu?
      {
        id: 11, speaker: 'Daigo',
        segments: [{ text: "毎月", furigana: "まいつき" }, { text: "、いくら" }, { text: "貯", furigana: "た" }, { text: "めますか。" }],
        kana: 'まいつき、いくらためますか。',
        romaji: 'Maitsuki, ikura tamemasu ka?',
        meaning: 'Hàng tháng bạn tiết kiệm bao nhiêu?'
      },

      // 8. B: Khoảng 500k
      {
        id: 12, speaker: 'Chiki',
        segments: [{ text: "50" }, { text: "万", furigana: "まん" }, { text: "ドンぐらいです。" }],
        kana: 'ごじゅうまんドンぐらいです。',
        romaji: 'Gojyuu-man don gurai desu.',
        meaning: 'Khoảng 500.000 VNĐ.'
      },

      // --- QUIZ 5: GURAI (Câu 5) ---
      {
        id: 13, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "文法", furigana: "ぶんぽう" }, { text: ": 「50" }, { text: "万", furigana: "まん" }, { text: "ドンぐらい」の「ぐらい」は？" }
        ],
        quizOptions: ['Chính xác', 'Khoảng chừng', 'So sánh'],
        correctOptionIndex: 1, // B
        segments: [{ text: "概算", furigana: "がいさん" }, { text: "..." }],
        kana: 'がいさん...',
        romaji: 'Gaisan...',
        meaning: '💡 Giải thích: "Gurai" dùng để chỉ số lượng ước chừng (Khoảng...).'
      },

      // 9. A: Có lãng phí không?
      {
        id: 14, speaker: 'Daigo',
        segments: [{ text: "無駄遣", furigana: "むだづか" }, { text: "いをしませんか。" }],
        kana: 'むだづかいをしませんか。',
        romaji: 'Mudazukai o shimasen ka?',
        meaning: 'Bạn có tiêu xài lãng phí không?'
      },

      // --- QUIZ 6: TỪ VỰNG MUDAZUKAI (Câu 6) ---
      {
        id: 15, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "単語", furigana: "たんご" }, { text: ": 「" }, { text: "無駄遣", furigana: "むだづか" }, { text: "い」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Tiêu tiền hợp lý', 'Tiết kiệm (Chokin)', 'Tiêu xài lãng phí'],
        correctOptionIndex: 2, // C
        segments: [{ text: "浪費", furigana: "ろうひ" }, { text: "..." }],
        kana: 'ろうひ...',
        romaji: 'Rouhi...',
        meaning: '💡 Giải thích: "Mudazukai" nghĩa là sự lãng phí tiền bạc, tiêu xài hoang phí.'
      },

      // 10. B: Không
      {
        id: 16, speaker: 'Chiki',
        segments: [{ text: "いいえ、あまりしません。" }],
        kana: 'いいえ、あまりしません。',
        romaji: 'Iie, amari shimasen.',
        meaning: 'Không, tôi không hay làm thế.'
      },

      // --- PHẦN TRẮC NGHIỆM CUỐI BÀI (D) ---

      // Câu 11: Tiêu vào đâu nhất
      {
        id: 17, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": Bは" }, { text: "何", furigana: "なに" }, { text: "に" }, { text: "一番お金", furigana: "いちばんおかね" }, { text: "を" }, { text: "使", furigana: "つか" }, { text: "いますか。" }
        ],
        quizOptions: ['Quần áo (Fuku)', 'Đồ ăn (Tabemono)', 'Du lịch (Ryokou)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "正解", furigana: "せいかい" }, { text: "は..." }],
        kana: 'せいかいは...',
        romaji: 'Seikai wa...',
        meaning: '💡 Giải thích: Chiki nói "Tabemono ni ichiban tsukaimasu".'
      },

      // Câu 12: Có tiết kiệm không
      {
        id: 18, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": Bは" }, { text: "お金", furigana: "おかね" }, { text: "を" }, { text: "貯", furigana: "た" }, { text: "めていますか。" }
        ],
        quizOptions: ['Có, đang tiết kiệm', 'Không, không tiết kiệm', 'Không biết'],
        correctOptionIndex: 0, // A
        segments: [{ text: "貯金", furigana: "ちょきん" }, { text: "..." }],
        kana: 'ちょきん...',
        romaji: 'Chokin...',
        meaning: '💡 Giải thích: Chiki xác nhận "Hai, sukoshi tamete imasu".'
      },

      // Câu 13: Nghĩa Mudazukai
      {
        id: 19, speaker: 'Daigo',
        isQuiz: true,
        quizQuestion: [
          { text: "意味", furigana: "いみ" }, { text: ": 「" }, { text: "無駄遣", furigana: "むだづか" }, { text: "い」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Tiết kiệm', 'Tiêu xài lãng phí', 'Kiếm tiền'],
        correctOptionIndex: 1, // B
        segments: [{ text: "意味", furigana: "いみ" }, { text: "は..." }],
        kana: 'いみは...',
        romaji: 'Imi wa...',
        meaning: '💡 Giải thích: "Mudazukai" là tiêu xài lãng phí.'
      },

      // Câu 14: Tiết kiệm bao nhiêu
      {
        id: 20, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": Bは" }, { text: "毎月", furigana: "まいつき" }, { text: "いくら" }, { text: "貯", furigana: "た" }, { text: "めますか。" }
        ],
        quizOptions: ['20 vạn (200k)', '50 vạn (500k)', '100 vạn (1tr)'],
        correctOptionIndex: 1, // B
        segments: [{ text: "金額", furigana: "きんがく" }, { text: "は..." }],
        kana: 'きんがくは...',
        romaji: 'Kingaku wa...',
        meaning: '💡 Giải thích: Chiki nói "50-man don gurai desu".'
      }
    ]
  },
];