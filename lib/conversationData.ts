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
  quizQuestion?: Segment[]; // Câu hỏi dạng Segment để có thể bôi đậm hoặc hiện Furigana
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
  // --- HỘI THOẠI 1: AKI x CHIKI (MỚI) ---
  {
    id: 'conv_1_intro',
    title: 'Hội thoại 1: Gặp gỡ & Làm quen',
    description: 'Aki và Chiki chào hỏi, nói về ngày tháng, tuổi tác và sở thích.',
    characters: ['Aki', 'Chiki'],
    prerequisites: ['casual', 'numbers', 'hobbies'], // Yêu cầu kiến thức cũ
    lines: [
      // 1. Aki chào
      {
        id: 1, speaker: 'Aki',
        segments: [{ text: "おはようございます。" }, { text: "初", furigana: "はじ" }, { text: "めまして。よろしくね。" }],
        kana: 'おはようございます。はじめまして。よろしくね。',
        romaji: 'Ohayou gozaimasu. Hajimemashite. Yoroshiku ne.',
        meaning: 'Chào buổi sáng. Rất vui được làm quen với bạn.'
      },
      // 2. Chiki chào lại
      {
        id: 2, speaker: 'Chiki',
        segments: [{ text: "こんにちは。こちらこそ、お" }, { text: "会", furigana: "あ" }, { text: "いできて" }, { text: "嬉", furigana: "うれ" }, { text: "しいです。" }],
        kana: 'こんにちは。こちらこそ、おあいできてうれしいです。',
        romaji: 'Konnichiwa. Kochirakoso, oai dekite ureshii desu.',
        meaning: 'Xin chào. Hân hạnh được gặp bạn.'
      },

      // --- CÂU HỎI 1: KÍNH NGỮ (DESU/MASU) ---
      {
        id: 3, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "お" }, { text: "元気", furigana: "げんき" }, { text: " ______ か。(Điền từ)" }
        ],
        quizOptions: ['です (desu)', 'ます (masu)', 'だ (da)', 'ある (aru)'],
        correctOptionIndex: 0,
        segments: [{ text: "お" }, { text: "元気", furigana: "げんき" }, { text: "ですか。" }],
        kana: 'おげんきですか。',
        romaji: 'Ogenki desu ka?',
        meaning: 'Bạn có khỏe không? (Giải thích: "Desu" là dạng lịch sự dùng với tính từ/danh từ).'
      },
      // 4. Chiki trả lời
      {
        id: 4, speaker: 'Chiki',
        segments: [{ text: "元気", furigana: "げんき" }, { text: "です。ありがとうございます。" }, { text: "最近", furigana: "さいきん" }, { text: "どうですか。" }],
        kana: 'げんきです。ありがとうございます。さいきんどうですか。',
        romaji: 'Genki desu. Arigatou gozaimasu. Saikin dou desu ka?',
        meaning: 'Mình khỏe. Cảm ơn bạn. Dạo này bạn thế nào?'
      },

      // --- CÂU HỎI 2: TRỢ TỪ (WA) ---
      {
        id: 5, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "今日", furigana: "きょう" }, { text: " ______ " }, { text: "何日", furigana: "なんにち" }, { text: "ですか。(Điền trợ từ)" }
        ],
        quizOptions: ['は (wa)', 'が (ga)', 'を (o)', 'に (ni)'],
        correctOptionIndex: 0,
        segments: [{ text: "僕", furigana: "ぼく" }, { text: "も" }, { text: "元気", furigana: "げんき" }, { text: "です。ところで、" }, { text: "今日", furigana: "きょう" }, { text: "は" }, { text: "何日", furigana: "なんにち" }, { text: "ですか。" }],
        kana: 'ぼくもげんきです。ところで、きょうはなんにちですか。',
        romaji: 'Boku mo genki desu. Tokoro de, kyou wa nannichi desu ka?',
        meaning: 'Mình cũng khỏe. À, hôm nay là ngày bao nhiêu? (Giải thích: "Wa" đánh dấu chủ ngữ).'
      },
      // 6. Chiki trả lời ngày 24
      {
        id: 6, speaker: 'Chiki',
        segments: [{ text: "今日", furigana: "きょう" }, { text: "は" }, { text: "二十四日", furigana: "にじゅうよっか" }, { text: "です。" }],
        kana: 'きょうはにじゅうよっかです。',
        romaji: 'Kyou wa nijyuu yokka desu.',
        meaning: 'Hôm nay là ngày 24.'
      },

      // --- CÂU HỎI 3: TỪ VỰNG NGÀY THÁNG ---
      {
        id: 7, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "明日", furigana: "あした" }, { text: "は ______ ですね。(Điền ngày)" }
        ],
        quizOptions: ['二十五日 (Nijuu-go nichi)', '二十日 (Hatsuka)', '五日 (Itsuka)', '十五日 (Juugo-nichi)'],
        correctOptionIndex: 0,
        segments: [{ text: "じゃあ、" }, { text: "明日", furigana: "あした" }, { text: "は" }, { text: "二十五日", furigana: "にじゅうごにち" }, { text: "ですね。" }],
        kana: 'じゃあ、あしたはにじゅうごにちですね。',
        romaji: 'Jaa, ashita wa nijyuu go nichi desu ne.',
        meaning: 'Vậy ngày mai là ngày 25 nhỉ. (Giải thích: Hôm nay 24 thì mai là 25).'
      },

      // --- CÂU HỎI 4: TỪ VỰNG (TUỔI TÁC) ---
      {
        id: 8, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "あなたの ______ は" }, { text: "何歳", furigana: "なんさい" }, { text: "ですか。(Điền từ: Tuổi tác)" }
        ],
        quizOptions: ['年齢 (Nenrei)', '名前 (Namae)', '趣味 (Shumi)', '仕事 (Shigoto)'],
        correctOptionIndex: 0,
        segments: [{ text: "はい。ところで、あなたの" }, { text: "年齢", furigana: "ねんれい" }, { text: "は" }, { text: "何歳", furigana: "なんさい" }, { text: "ですか。" }],
        kana: 'はい。ところで、あなたのねんれいはなんさいですか。',
        romaji: 'Hai. Tokoro de, anata no nenrei wa nansai desu ka?',
        meaning: 'Vâng. À, bạn bao nhiêu tuổi rồi? (Giải thích: Nenrei = Tuổi tác).'
      },
      // 9. Aki trả lời 22 tuổi
      {
        id: 9, speaker: 'Aki',
        segments: [{ text: "二十二歳", furigana: "にじゅうにさい" }, { text: "です。2003" }, { text: "年", furigana: "ねん" }, { text: "生", furigana: "う" }, { text: "まれです。" }],
        kana: 'にじゅうにさいです。2003ねんうまれです。',
        romaji: 'Nijyuu ni sai desu. 2003 nen umare desu.',
        meaning: 'Mình 22 tuổi, sinh năm 2003.'
      },
      // 10. Chiki trả lời 20 tuổi
      {
        id: 10, speaker: 'Chiki',
        segments: [{ text: "私", furigana: "わたし" }, { text: "は" }, { text: "二十歳", furigana: "はたち" }, { text: "です。2005" }, { text: "年", furigana: "ねん" }, { text: "生", furigana: "う" }, { text: "まれです。" }],
        kana: 'わたしははたちです。2005ねんうまれです。',
        romaji: 'Watashi wa hatachi desu. 2005 nen umare desu.',
        meaning: 'Mình 20 tuổi, sinh năm 2005.'
      },
      // 11. Aki nhận xét
      {
        id: 11, speaker: 'Aki',
        segments: [{ text: "そうですか。やっぱり" }, { text: "年上", furigana: "としうえ" }, { text: "ですね。" }],
        kana: 'そうですか。やっぱりとしうえですね。',
        romaji: 'Sou desu ka. Yappari toshiue desu ne.',
        meaning: 'Thế à. Quả nhiên là lớn tuổi hơn nhỉ.'
      },

      // --- CÂU HỎI 5: TỪ LÓNG (MAJI) ---
      {
        id: 12, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "本当", furigana: "ほんとう" }, { text: "？ ______ で？(Điền từ lóng)" }
        ],
        quizOptions: ['マジ (Maji)', 'ウソ (Uso)', 'ガチ (Gachi)', 'ヤバ (Yaba)'],
        correctOptionIndex: 0,
        segments: [{ text: "本当", furigana: "ほんとう" }, { text: "？マジで？" }],
        kana: 'ほんとう？マジで？',
        romaji: 'Hontou? Maji de?',
        meaning: 'Thật á? Thật không đấy? (Giải thích: "Maji" là từ lóng phổ biến nghĩa là "Thật hả/Nghiêm túc chứ").'
      },
      // 13. Aki xác nhận
      {
        id: 13, speaker: 'Aki',
        segments: [{ text: "はい、" }, { text: "二十歳", furigana: "はたち" }, { text: "と" }, { text: "二十二歳", furigana: "にじゅうにさい" }, { text: "です。" }],
        kana: 'はい、はたちとにじゅうにさいです。',
        romaji: 'Hai, hatachi to nijyuu ni sai desu.',
        meaning: 'Đúng rồi, 20 và 22 tuổi.'
      },
      // 14. Chiki hỏi hoạt động
      {
        id: 14, speaker: 'Chiki',
        segments: [{ text: "なるほど。ところで、" }, { text: "今日", furigana: "きょう" }, { text: "は" }, { text: "何", furigana: "なに" }, { text: "をしますか。" }],
        kana: 'なるほど。ところで、きょうはなにをしますか。',
        romaji: 'Naruhodo. Tokoro de, kyou wa nani o shimasu ka?',
        meaning: 'À ra vậy. Hôm nay bạn định làm gì?'
      },

      // --- CÂU HỎI 6: TRỢ TỪ (O) ---
      {
        id: 15, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "写真", furigana: "しゃしん" }, { text: " ______ " }, { text: "撮", furigana: "と" }, { text: "ったりします。(Điền trợ từ)" }
        ],
        quizOptions: ['を (o)', 'は (wa)', 'も (mo)', 'で (de)'],
        correctOptionIndex: 0,
        segments: [{ text: "午前", furigana: "ごぜん" }, { text: "は" }, { text: "勉強", furigana: "べんきょう" }, { text: "して、" }, { text: "午後", furigana: "ごご" }, { text: "は" }, { text: "散歩", furigana: "さんぽ" }, { text: "したり" }, { text: "写真", furigana: "しゃしん" }, { text: "を" }, { text: "撮", furigana: "と" }, { text: "ったりします。" }],
        kana: 'ごぜんはべんきょうして、ごごはさんぽしたりしゃしんをとったりします。',
        romaji: 'Gozen wa benkyou shite, gogo wa sanpo shitari shashin o tottari shimasu.',
        meaning: 'Sáng học, chiều đi dạo và chụp ảnh. (Giải thích: "o" chỉ đối tượng của hành động chụp ảnh).'
      },
      // 16. Chiki rủ đi chơi
      {
        id: 16, speaker: 'Chiki',
        segments: [{ text: "いいですね。もしよかったら、" }, { text: "今度一緒", furigana: "こんどいっしょ" }, { text: "に" }, { text: "行", furigana: "い" }, { text: "きましょう。" }],
        kana: 'いいですね。もしよかったら、こんどいっしょにいきましょう。',
        romaji: 'Ii desu ne. Moshi yokattara, kondo issho ni ikimashou.',
        meaning: 'Hay quá. Nếu được, lần tới đi cùng nhau nhé.'
      },
      // 17. Aki đồng ý
      {
        id: 17, speaker: 'Aki',
        segments: [{ text: "もちろんです。" }, { text: "気", furigana: "き" }, { text: "をつけてくださいね。" }],
        kana: 'もちろんです。きをつけてくださいね。',
        romaji: 'Mochiron desu. Ki o tsukete kudasai ne.',
        meaning: 'Tất nhiên. Bảo trọng nhé.'
      },
      // 18. Chiki chào tạm biệt
      {
        id: 18, speaker: 'Chiki',
        segments: [{ text: "ありがとうございます。また" }, { text: "後", furigana: "あと" }, { text: "で。" }],
        kana: 'ありがとうございます。またあとで。',
        romaji: 'Arigatou gozaimasu. Mata ato de.',
        meaning: 'Cảm ơn. Hẹn gặp lại sau.'
      },

      // --- PHẦN 2: CÂU HỎI HIỂU NỘI DUNG (Sau khi hội thoại kết thúc) ---
      
      // --- CÂU 7 ---
      {
        id: 19, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": Akiさんは" }, { text: "何歳", furigana: "なんさい" }, { text: "ですか。(Aki bao nhiêu tuổi?)" }
        ],
        quizOptions: ['22歳 (22 tuổi)', '20歳 (20 tuổi)', '18歳 (18 tuổi)', '24歳 (24 tuổi)'],
        correctOptionIndex: 0,
        segments: [{ text: "クイズタイム！" }], // Quiz Time
        kana: 'クイズタイム！',
        romaji: 'Kuizu taimu!',
        meaning: 'Đáp án: 22 tuổi. Aki sinh năm 2003.'
      },
      
      // --- CÂU 8 ---
      {
        id: 20, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": " }, { text: "今日", furigana: "きょう" }, { text: "は" }, { text: "何日", furigana: "なんにち" }, { text: "ですか。(Hôm nay là ngày mấy?)" }
        ],
        quizOptions: ['24日 (Ngày 24)', '25日 (Ngày 25)', '4日 (Ngày 4)', '14日 (Ngày 14)'],
        correctOptionIndex: 0,
        segments: [{ text: "覚", furigana: "おぼ" }, { text: "えていますか。" }], // Bạn có nhớ không?
        kana: 'おぼえていますか。',
        romaji: 'Oboete imasu ka?',
        meaning: 'Đáp án: Ngày 24. (Vì Aki nói ngày mai là 25).'
      },

      // --- CÂU 9 ---
      {
        id: 21, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": " }, { text: "午後", furigana: "ごご" }, { text: "は" }, { text: "何", furigana: "なに" }, { text: "をしますか。(Buổi chiều làm gì?)" }
        ],
        quizOptions: ['散歩と写真 (Đi dạo & Chụp ảnh)', '勉強 (Học)', '寝る (Ngủ)', '買い物 (Mua sắm)'],
        correctOptionIndex: 0,
        segments: [{ text: "次", furigana: "つぎ" }, { text: "の" }, { text: "質問", furigana: "しつもん" }, { text: "です。" }], 
        kana: 'つぎのしつもんです。',
        romaji: 'Tsugi no shitsumon desu.',
        meaning: 'Đáp án: Đi dạo và chụp ảnh. (Buổi sáng mới là học).'
      },

      // --- CÂU 10 ---
      {
        id: 22, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": ChikiさんはAkiさんより..." }
        ],
        quizOptions: ['年下です (Nhỏ tuổi hơn)', '年上です (Lớn tuổi hơn)', '同い年です (Bằng tuổi)', '背が高いです (Cao hơn)'],
        correctOptionIndex: 0,
        segments: [{ text: "最後", furigana: "さいご" }, { text: "の" }, { text: "質問", furigana: "しつもん" }, { text: "です！" }],
        kana: 'さいごのしつもんです！',
        romaji: 'Saigo no shitsumon desu!',
        meaning: 'Đáp án: Nhỏ tuổi hơn (Toshishita). Chiki 20 tuổi (2005), Aki 22 tuổi (2003).'
      }
    ]
  },

  // --- HỘI THOẠI 2: AKI x DAIGO (Giữ nguyên hoặc cập nhật sau nếu bạn muốn) ---
  {
    id: 'conv_2_daigo',
    title: 'Hội thoại 2: Bạn cùng khoa',
    description: 'Aki và Daigo nhận ra nhau là bạn cùng khoa và nói về sở thích.',
    characters: ['Aki', 'Daigo'],
    prerequisites: ['hobbies', 'school'],
    lines: [
      { id: 1, speaker: 'Aki', segments: [{ text: "こんにちは。アキです。" }], kana: 'こんにちは。アキです。', romaji: 'Konnichiwa. Aki desu.', meaning: 'Chào bạn, mình là Aki.' },
      { id: 2, speaker: 'Daigo', segments: [{ text: "はじめまして。ダイゴです。" }], kana: 'はじめまして。ダイゴです。', romaji: 'Hajimemashite. Daigo desu.', meaning: 'Chào Aki, mình là Daigo.' }
      // ... (Các dòng còn lại giữ nguyên)
    ]
  },
  // ... (Các bài 3, 4, 5 giữ nguyên)
];