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
  // --- HỘI THOẠI 1: GIỚI THIỆU BẢN THÂN ---
  {
    id: 'conv_1_intro',
    title: '1. Giới thiệu bản thân (自己紹介)',
    description: 'Hội thoại làm quen giữa A và Min (Chiki đóng vai). Min giới thiệu tên, tuổi, quê quán và nghề nghiệp.',
    characters: ['Aki', 'Chiki'],
    prerequisites: ['countries', 'numbers', 'school'], // Khóa nếu chưa học các bài này
    lines: [
      // 1. A chào (Câu thường)
      {
        id: 1, speaker: 'Aki',
        segments: [{ text: "はじめまして。" }],
        kana: 'はじめまして。',
        romaji: 'Hajimemashite.',
        meaning: 'Rất vui được gặp bạn (lần đầu).'
      },
      // 2. B chào (Câu thường)
      {
        id: 2, speaker: 'Chiki',
        segments: [{ text: "はじめまして。" }],
        kana: 'はじめまして。',
        romaji: 'Hajimemashite.',
        meaning: 'Rất vui được gặp bạn.'
      },
      
      // --- INLINE QUIZ 1: HỎI TÊN ---
      {
        id: 3, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "あなたの" }, { text: "名前", furigana: "なまえ" }, { text: "は ______ ですか。" }
        ],
        quizOptions: ['何 (Nan - Cái gì)', 'だれ (Dare - Ai)', 'どこ (Doko - Ở đâu)', 'いつ (Itsu - Khi nào)'],
        correctOptionIndex: 0,
        segments: [{ text: "あなたの" }, { text: "名前", furigana: "なまえ" }, { text: "は" }, { text: "何", furigana: "なん" }, { text: "ですか。" }],
        kana: 'あなたのなまえはなんですか。',
        romaji: 'Anata no namae wa nan desu ka?',
        meaning: 'Tên của bạn là gì?'
      },

      // 4. B trả lời (Câu thường)
      {
        id: 4, speaker: 'Chiki',
        segments: [{ text: "わたしの" }, { text: "名前", furigana: "なまえ" }, { text: "はミンです。" }],
        kana: 'わたしのなまえはミンです。',
        romaji: 'Watashi no namae wa Min desu.',
        meaning: 'Tên tôi là Min.'
      },

      // --- INLINE QUIZ 2: HỎI QUÊ QUÁN ---
      {
        id: 5, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: " ______ から" }, { text: "来", furigana: "き" }, { text: "ましたか。" }
        ],
        quizOptions: ['どこ (Doko - Ở đâu)', 'だれ (Dare - Ai)', 'なに (Nani - Cái gì)', 'どう (Dou - Thế nào)'],
        correctOptionIndex: 0,
        segments: [{ text: "どこから" }, { text: "来", furigana: "き" }, { text: "ましたか。" }],
        kana: 'どこからきましたか。',
        romaji: 'Doko kara kimashita ka?',
        meaning: 'Bạn đến từ đâu?'
      },

      // 6. B trả lời (Câu thường)
      {
        id: 6, speaker: 'Chiki',
        segments: [{ text: "ベトナムから" }, { text: "来", furigana: "き" }, { text: "ました。" }],
        kana: 'ベトナムからきました。',
        romaji: 'Betonamu kara kimashita.',
        meaning: 'Tôi đến từ Việt Nam.'
      },

      // --- INLINE QUIZ 3: HỎI TUỔI ---
      {
        id: 7, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: " ______ ですか。(Hỏi tuổi lịch sự)" }
        ],
        quizOptions: ['おいくつ (Oikutsu)', 'なんさい (Nansai)', 'だれ (Dare)', 'どこ (Doko)'],
        correctOptionIndex: 0,
        segments: [{ text: "おいくつですか。" }],
        kana: 'おいくつですか。',
        romaji: 'Oikutsu desu ka?',
        meaning: 'Bạn bao nhiêu tuổi?'
      },

      // 8. B trả lời (Câu thường)
      {
        id: 8, speaker: 'Chiki',
        segments: [{ text: "16" }, { text: "歳", furigana: "さい" }, { text: "です。" }],
        kana: 'じゅうろくさいです。',
        romaji: 'Juu-roku sai desu.',
        meaning: 'Tôi 16 tuổi.'
      },

      // --- INLINE QUIZ 4: HỎI NGHỀ NGHIỆP ---
      {
        id: 9, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: " ______ ですか。(Học sinh)" }
        ],
        quizOptions: ['学生 (Gakusei)', '先生 (Sensei)', '医者 (Isha)', '会社員 (Kaishain)'],
        correctOptionIndex: 0,
        segments: [{ text: "学生", furigana: "がくせい" }, { text: "ですか。" }],
        kana: 'がくせいですか。',
        romaji: 'Gakusei desu ka?',
        meaning: 'Bạn có phải là học sinh không?'
      },

      // 10. B trả lời (Câu thường)
      {
        id: 10, speaker: 'Chiki',
        segments: [{ text: "はい、" }, { text: "学生", furigana: "がくせい" }, { text: "です。よろしくお" }, { text: "願", furigana: "ねが" }, { text: "いします。" }],
        kana: 'はい、がくせいです。よろしくおねがいします。',
        romaji: 'Hai, gakusei desu. Yoroshiku onegaishimasu.',
        meaning: 'Vâng, tôi là học sinh. Rất mong được giúp đỡ.'
      },

      // --- INLINE QUIZ 5: HỎI HỌC TIẾNG NHẬT (Mở rộng) ---
      {
        id: 11, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "日本語", furigana: "にほんご" }, { text: "を ______ いますか。" }
        ],
        quizOptions: ['勉強して (Benkyou shite)', '食べて (Tabete)', '寝て (Nete)', '見て (Mite)'],
        correctOptionIndex: 0,
        segments: [{ text: "日本語", furigana: "にほんご" }, { text: "を" }, { text: "勉強", furigana: "べんきょう" }, { text: "していますか。" }],
        kana: 'にほんごをべんきょうしていますか。',
        romaji: 'Nihongo o benkyou shiteimasu ka?',
        meaning: 'Bạn đang học tiếng Nhật phải không?'
      },

      // --- INLINE QUIZ 6: TRẢ LỜI CÓ (Mở rộng) ---
      {
        id: 12, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: " ______ 、" }, { text: "勉強", furigana: "べんきょう" }, { text: "しています。(Vâng/Có)" }
        ],
        quizOptions: ['はい (Hai)', 'いいえ (Iie)', 'でも (Demo)', 'あの (Ano)'],
        correctOptionIndex: 0,
        segments: [{ text: "はい、" }, { text: "勉強", furigana: "べんきょう" }, { text: "しています。" }],
        kana: 'はい、べんきょうしています。',
        romaji: 'Hai, benkyou shiteimasu.',
        meaning: 'Vâng, tôi đang học.'
      },

      // --- PHẦN 3: CÂU HỎI TRẮC NGHIỆM TỔNG KẾT (POST QUIZ) ---

      // Câu 17 (Theo đề bài)
      {
        id: 13, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": ミンはどこから" }, { text: "来", furigana: "き" }, { text: "ましたか。" }
        ],
        quizOptions: ['日本 (Nhật Bản)', '中国 (Trung Quốc)', 'ベトナム (Việt Nam)', '韓国 (Hàn Quốc)'],
        correctOptionIndex: 2, // C. Vietnam
        segments: [{ text: "クイズタイム！" }],
        kana: 'クイズタイム！',
        romaji: 'Quiz Time!',
        meaning: 'Đáp án: C. Việt Nam.'
      },

      // Câu 18 (Theo đề bài)
      {
        id: 14, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": ミンは" }, { text: "何歳", furigana: "なんさい" }, { text: "ですか。" }
        ],
        quizOptions: ['15歳', '16歳', '17歳', '18歳'],
        correctOptionIndex: 1, // B. 16
        segments: [{ text: "覚", furigana: "おぼ" }, { text: "えていますか。" }],
        kana: 'おぼえていますか。',
        romaji: 'Oboete imasu ka?',
        meaning: 'Đáp án: B. 16 tuổi.'
      },

      // Câu 19 (Theo đề bài)
      {
        id: 15, speaker: 'Aki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": 「" }, { text: "学生", furigana: "がくせい" }, { text: "ですか」の" }, { text: "意味", furigana: "いみ" }, { text: "は？" }
        ],
        quizOptions: ['Bạn là học sinh phải không?', 'Bạn bao nhiêu tuổi?', 'Bạn đến từ đâu?', 'Bạn tên là gì?'],
        correctOptionIndex: 0, // A. Học sinh
        segments: [{ text: "次", furigana: "つぎ" }, { text: "の" }, { text: "質問", furigana: "しつもん" }, { text: "です。" }],
        kana: 'つぎのしつもんです。',
        romaji: 'Tsugi no shitsumon desu.',
        meaning: 'Đáp án: A. Bạn có phải là học sinh không?'
      },

      // Câu 20 (Theo đề bài)
      {
        id: 16, speaker: 'Chiki',
        isQuiz: true,
        quizQuestion: [
          { text: "質問", furigana: "しつもん" }, { text: ": " }, { text: "会話", furigana: "かいわ" }, { text: "の" }, { text: "最後", furigana: "さいご" }, { text: "のあいさつは？" }
        ],
        quizOptions: ['さようなら', 'ありがとう', 'よろしくお願いします', 'おはよう'],
        correctOptionIndex: 2, // C. Yoroshiku
        segments: [{ text: "最後", furigana: "さいご" }, { text: "の" }, { text: "質問", furigana: "しつもん" }, { text: "です！" }],
        kana: 'さいごのしつもんです！',
        romaji: 'Saigo no shitsumon desu!',
        meaning: 'Đáp án: C. Yoroshiku onegaishimasu.'
      }
    ]
  },

  // --- CÁC BÀI KHÁC (GIỮ KHUNG) ---
  { id: 'conv_2_hometown', title: '2. Quê quán', description: '...', characters: ['Aki', 'Daigo'], prerequisites: [], lines: [] },
  { id: 'conv_3_friends', title: '3. Bạn thân', description: '...', characters: ['Chiki', 'Isora'], prerequisites: [], lines: [] },
  { id: 'conv_4_subject', title: '4. Môn học yêu thích', description: '...', characters: ['Aki', 'Isora'], prerequisites: [], lines: [] },
  { id: 'conv_5_job', title: '5. Công việc', description: '...', characters: ['Daigo', 'Isora'], prerequisites: [], lines: [] },
  { id: 'conv_6_shopping', title: '6. Mua sắm', description: '...', characters: ['Chiki', 'Aki'], prerequisites: [], lines: [] },
  { id: 'conv_7_interview', title: '7. Phỏng vấn', description: '...', characters: ['Daigo', 'Isora'], prerequisites: [], lines: [] },
  { id: 'conv_8_environment', title: '8. Bảo vệ môi trường', description: '...', characters: ['Aki', 'Chiki'], prerequisites: [], lines: [] },
  { id: 'conv_9_direction', title: '9. Hỏi đường', description: '...', characters: ['Isora', 'Daigo'], prerequisites: [], lines: [] },
  { id: 'conv_10_family', title: '10. Gia đình', description: '...', characters: ['Chiki', 'Aki'], prerequisites: [], lines: [] },
  { id: 'conv_11_travel', title: '11. Du lịch', description: '...', characters: ['Daigo', 'Chiki'], prerequisites: [], lines: [] },
  { id: 'conv_12_hobby', title: '12. Sở thích', description: '...', characters: ['Isora', 'Aki'], prerequisites: [], lines: [] },
  { id: 'conv_13_food', title: '13. Đồ ăn', description: '...', characters: ['Chiki', 'Daigo'], prerequisites: [], lines: [] },
  { id: 'conv_14_health', title: '14. Sức khỏe', description: '...', characters: ['Aki', 'Isora'], prerequisites: [], lines: [] },
  { id: 'conv_15_money', title: '15. Tiền bạc', description: '...', characters: ['Daigo', 'Chiki'], prerequisites: [], lines: [] },
];