// lib/grammarData.ts

export type GrammarExample = {
    jp: string;
    kana: string;
    romaji: string;
    vn: string;
};

export type GrammarPoint = {
    id: string;
    title: string;
    meaning: string;
    structure: string;
    explanation: string;
    examples: GrammarExample[];
    quiz: {
        question: string;
        options: string[];
        correctIndex: number;
        explanation: string;
    };
};

export const WEEK3_GRAMMAR_DATA: GrammarPoint[] = [
    {
        id: "g3_1_1",
        title: "N1 は N2 です",
        meaning: "N1 là N2",
        structure: "Danh từ 1 + は + Danh từ 2 + です",
        explanation: "Trợ từ 'は' (đọc là 'wa') dùng để đánh dấu chủ đề của câu. 'です' (desu) đặt ở cuối câu để biểu thị sự khẳng định, lịch sự.",
        examples: [
            { jp: "わたしは学生です。", kana: "わたしは がくせいです。", romaji: "Watashi wa gakusei desu.", vn: "Tôi là học sinh." },
            { jp: "あの人は先生です。", kana: "あのひとは せんせいです。", romaji: "Ano hito wa sensei desu.", vn: "Người kia là thầy giáo." }
        ],
        quiz: {
            question: "Chọn câu đúng: 'Tôi là nhân viên công ty'",
            options: [
                "わたしは 会社員 です。",
                "わたしは 会社員 じゃありません。",
                "わたしは 会社員 ですか。"
            ],
            correctIndex: 0,
            explanation: "Dùng mẫu 'N1 は N2 です' để khẳng định N1 là N2."
        }
    },
    {
        id: "g3_1_2",
        title: "N1 は N2 じゃありません",
        meaning: "N1 không phải là N2",
        structure: "Danh từ 1 + は + Danh từ 2 + じゃありません",
        explanation: "'じゃありません' (ja arimasen) là dạng phủ định của 'です'. Trong văn viết trang trọng, có thể dùng 'ではありません'.",
        examples: [
            { jp: "わたしは医者じゃありません。", kana: "わたしは いしゃじゃありません。", romaji: "Watashi wa isha ja arimasen.", vn: "Tôi không phải là bác sĩ." },
            { jp: "サントスさんは学生じゃありません。", kana: "サントスさんは がくせいじゃありません。", romaji: "Santosu-san wa gakusei ja arimasen.", vn: "Anh Santos không phải là học sinh." }
        ],
        quiz: {
            question: "Phủ định của 'です' là gì?",
            options: [
                "ですか",
                "じゃありません",
                "もです"
            ],
            correctIndex: 1,
            explanation: "'じゃありません' dùng để phủ định một danh từ."
        }
    },
    {
        id: "g3_1_3",
        title: "N1 は N2 ですか",
        meaning: "N1 là N2 phải không?",
        structure: "Danh từ 1 + は + Danh từ 2 + ですか",
        explanation: "Trợ từ 'か' đặt ở cuối câu để biến câu khẳng định thành câu hỏi. Khi trả lời, dùng 'はい' (vâng) hoặc 'いいえ' (không).",
        examples: [
            { jp: "あなたは学生ですか。", kana: "あなたは がくせいですか。", romaji: "Anata wa gakusei desu ka.", vn: "Bạn là học sinh phải không?" },
            { jp: "あの人はエンジニアですか。", kana: "あのひतोは エンジニアですか。", romaji: "Ano hito wa enjinia desu ka.", vn: "Người kia là kỹ sư phải không?" }
        ],
        quiz: {
            question: "Trợ từ nào dùng để tạo câu hỏi ở cuối câu?",
            options: ["は (wa)", "も (mo)", "か (ka)"],
            correctIndex: 2,
            explanation: "'か' là trợ từ nghi vấn trong tiếng Nhật."
        }
    },
    {
        id: "g3_1_4",
        title: "N1 も N2 です",
        meaning: "N1 cũng là N2",
        structure: "Danh từ 1 + も + Danh từ 2 + です",
        explanation: "Trợ từ 'も' (mo) dùng thay cho 'は' khi chủ đề có cùng đặc điểm với đối tượng đã nhắc đến trước đó.",
        examples: [
            { jp: "わたしは学生です。ミラーさんも学生です。", kana: "わたしは がくせいです。ミラーさんも がくせいです。", romaji: "Watashi wa gakusei desu. Miraa-san mo gakusei desu.", vn: "Tôi là học sinh. Anh Miller cũng là học sinh." },
            { jp: "ベトナム人です。あの人もベトナム人です。", kana: "ベトナムじんです. あのひとも ベトナムじんです。", romaji: "Betonamu-jin desu. Ano hito mo Betonamu-jin desu.", vn: "Tôi là người Việt Nam. Người kia cũng là người Việt Nam." }
        ],
        quiz: {
            question: "Điền trợ từ thích hợp: 'Anh Tanaka là người Nhật. Chị Sato ___ là người Nhật.'",
            options: ["は (wa)", "も (mo)", "の (no)"],
            correctIndex: 1,
            explanation: "Dùng 'も' vì Chị Sato có cùng đặc điểm (người Nhật) với Anh Tanaka."
        }
    },
    {
        id: "g3_1_5",
        title: "N1 の N2",
        meaning: "N2 của N1 / N2 thuộc về N1",
        structure: "Danh từ 1 + の + Danh từ 2",
        explanation: "Trợ từ 'の' (no) dùng để nối hai danh từ, thể hiện sự sở hữu, trực thuộc hoặc tính chất.",
        examples: [
            { jp: "わたしの本。", kana: "わたしの ほん。", romaji: "Watashi no hon.", vn: "Sách của tôi." },
            { jp: "IMCの社員。", kana: "IMCの しゃいん。", romaji: "IMC no shain.", vn: "Nhân viên của công ty IMC." }
        ],
        quiz: {
            question: "Dịch sang tiếng Nhật: 'Nhân viên ngân hàng của IMC'",
            options: [
                "IMC の 銀行員",
                "IMC は 銀行員",
                "IMC も 銀行員"
            ],
            correctIndex: 0,
            explanation: "Trợ từ 'の' dùng để chỉ sự trực thuộc (Nhân viên thuộc công ty IMC)."
        }
    }
];

export const WEEK3_GRAMMAR_QUIZ = [
    // Point 1: N1 は N2 です
    {
        question: "Dịch sang tiếng Nhật: 'Tôi là nhân viên công ty'",
        options: ["わたしは かいしゃいん です。", "わたしは ぎんこういん です。", "わたしは いしゃ です。"],
        correctIndex: 0,
        explanation: "'かいしゃいん' là nhân viên công ty."
    },
    {
        question: "Chọn câu giới thiệu tên đúng: 'Tôi là Tanaka'",
        options: ["わたしは たなか もです。", "わたしは たなか です。", "わたしは たなか じゃありません。"],
        correctIndex: 1,
        explanation: "Dùng '...です' để khẳng định."
    },
    {
        question: "'あの人は 先生 です' nghĩa là gì?",
        options: ["Tôi là giáo viên.", "Người kia là giáo viên.", "Người kia không phải giáo viên."],
        correctIndex: 1,
        explanation: "'あの人' (ano hito) nghĩa là 'người kia'."
    },
    {
        question: "Điền trợ từ: 'わたし ___ ベトナム人 です。'",
        options: ["は", "も", "の"],
        correctIndex: 0,
        explanation: "'は' dùng để đánh dấu chủ đề 'Tôi'."
    },
    // Point 2: N1 は N2 じゃありません
    {
        question: "Dịch sang tiếng Nhật: 'Tôi không phải là bác sĩ'",
        options: ["わたしは いしゃ です。", "わたしは いしゃ じゃありません。", "わたしは いしゃ ですか。"],
        correctIndex: 1,
        explanation: "'じゃありません' là dạng phủ định."
    },
    {
        question: "Phủ định của 'ミラーさんは 学生 です' là gì?",
        options: ["ミラーさんは 学生 ですか。", "ミラーさんは 学生 も です。", "ミラーさんは 学生 じゃありません。"],
        correctIndex: 2,
        explanation: "Chuyển 'です' thành 'じゃありません'."
    },
    {
        question: "'あの人は エンジニア じゃありません' nghĩa là gì?",
        options: ["Người kia là kỹ sư.", "Người kia không phải kỹ sư.", "Tôi không phải kỹ sư."],
        correctIndex: 1,
        explanation: "'エンジニア' là kỹ sư, 'じゃありません' là không phải."
    },
    {
        question: "Dạng lịch sự/văn viết của 'じゃありません' là gì?",
        options: ["ではありません", "ではありませんか", "じゃありませんです"],
        correctIndex: 0,
        explanation: "'ではありません' trang trọng hơn 'じゃありません'."
    },
    // Point 3: N1 は N2 ですか
    {
        question: "Dịch sang tiếng Nhật: 'Bạn là học sinh phải không?'",
        options: ["あなたは がくせい です。", "あなたは がくせい ですか。", "あなたは がくせい も ですか。"],
        correctIndex: 1,
        explanation: "Thêm 'か' vào cuối câu để tạo câu hỏi."
    },
    {
        question: "Trả lời câu hỏi: 'ミラーさんは 会社員 ですか。'",
        options: ["はい、会社員 じゃありません。", "いいえ、会社員 です。", "はい、会社員 です。"],
        correctIndex: 2,
        explanation: "'はい' đi với khẳng định 'です'."
    },
    {
        question: "Khi không biết thông tin trong câu hỏi, ta trả lời 'いいえ' kèm với:",
        options: ["...です", "...じゃありません", "...もです"],
        correctIndex: 1,
        explanation: "'いいえ' dùng cho phủ định."
    },
    {
        question: "'あの人は だれ ですか' nghĩa là gì?",
        options: ["Người kia là ai?", "Người kia là giáo viên phải không?", "Người kia tên là gì?"],
        correctIndex: 0,
        explanation: "'だれ' nghĩa là 'ai'."
    },
    // Point 4: N1 も N2 です
    {
        question: "Anh Tanaka là sinh viên. Tôi ___ là sinh viên.",
        options: ["は", "も", "の"],
        correctIndex: 1,
        explanation: "Dùng 'も' khi có cùng đặc điểm."
    },
    {
        question: "Dịch sang tiếng Nhật: 'Chị Maria cũng là người Brazil.'",
        options: ["マリアさんは ブラジル人 です。", "マリアさんも ブラジル人 です。", "マリアさんは ブラジル人 も です。"],
        correctIndex: 1,
        explanation: "'も' thay thế cho 'は'."
    },
    {
        question: "Chọn câu đúng: 'A là kỹ sư. B cũng là kỹ sư.'",
        options: [
            "Aは エンジニア です。Bは エンジニア です。",
            "Aは エンジニア です。Bも エンジニア です。",
            "Aは エンジニア です。Bの エンジニア です。"
        ],
        correctIndex: 1,
        explanation: "Dùng 'も' để tránh lặp lại 'は' khi thông tin tương đồng."
    },
    {
        question: "'わたしも ベトナム人 です' nghĩa là gì?",
        options: ["Tôi là người Việt Nam.", "Tôi cũng là người Việt Nam.", "Tôi không phải người Việt Nam."],
        correctIndex: 1,
        explanation: "'Tôi cũng...'."
    },
    // Point 5: N1 の N2
    {
        question: "Dịch sang tiếng Nhật: 'Sách của tôi'",
        options: ["わたし は 本", "わたし の 本", "わたし も 本"],
        correctIndex: 1,
        explanation: "'の' dùng để chỉ sở hữu."
    },
    {
        question: "'IMC の 社員' nghĩa là gì?",
        options: ["Nhân viên công ty IMC", "Giám đốc công ty IMC", "Công ty của nhân viên IMC"],
        correctIndex: 0,
        explanation: "'の' chỉ sự trực thuộc."
    },
    {
        question: "Dịch sang tiếng Nhật: 'Thầy giáo của đại học Sakura'",
        options: ["さくらだいがく は せんせい", "さくらだいがく の せんせい", "さくらだいがく も せんせい"],
        correctIndex: 1,
        explanation: "Sở hữu/Trực thuộc dùng 'の'."
    },
    {
        question: "Trợ từ nào nối 2 danh từ với nhau?",
        options: ["は", "の", "か"],
        correctIndex: 1,
        explanation: "'の' dùng để nối 2 danh từ."
    }
];
