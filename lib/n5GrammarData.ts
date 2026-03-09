// lib/n5GrammarData.ts

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
        category?: string;
        question: string;
        options: string[];
        correctIndex: number;
        explanation: string;
    };
};

export type GrammarQuizItem = {
    category?: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
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
    },
    // --- BÀI 2 ---
    {
        id: "g3_2_1",
        title: "これ / それ / あれ",
        meaning: "Cái này / Cái đó / Cái kia",
        structure: "これ/それ/あれ + は + Danh từ + です",
        explanation: "'これ' gần người nói, 'それ' gần người nghe, 'あれ' xa cả hai.",
        examples: [
            { jp: "これ は じてんしゃ です。", kana: "これ は じてんしゃ です。", romaji: "Kore wa jitensha desu.", vn: "Đây là cái xe đạp." },
            { jp: "それ は なん ですか。", kana: "それ は なん ですか。", romaji: "Sore wa nan desu ka.", vn: "Đó là cái gì vậy?" }
        ],
        quiz: {
            question: "Dùng từ nào để chỉ vật ở gần người nghe?",
            options: ["これ", "それ", "あれ"],
            correctIndex: 1,
            explanation: "'それ' (sore) dùng cho vật ở gần người nghe."
        }
    },
    {
        id: "g3_2_2",
        title: "この / その / あの + Danh từ",
        meaning: "Cái ... này / đó / kia",
        structure: "この/その/あの + Danh từ + は ...",
        explanation: "Các định từ này phải đi kèm trực tiếp với một danh từ.",
        examples: [
            { jp: "この ほん は わたし の です。", kana: "この ほん は わたし の です。", romaji: "Kono hon wa watashi no desu.", vn: "Quyển sách này là của tôi." },
            { jp: "あの かた は どなた ですか。", kana: "あの かた は どなた ですか。", romaji: "Ano kata wa donata desu ka.", vn: "Vị kia là ai thế?" }
        ],
        quiz: {
            question: "Chọn câu đúng: 'Người kia là bác sĩ'",
            options: ["あれ ひと は いしゃ です。", "あの ひと は いしゃ です。", "それ ひと は いしゃ です。"],
            correctIndex: 1,
            explanation: "Dùng 'あの' (ano) đi kèm danh từ 'ひと' để chỉ 'người kia'."
        }
    },
    // --- BÀI 3 ---
    {
        id: "g3_3_1",
        title: "ここ / そこ / あそこ",
        meaning: "Chỗ này / Chỗ đó / Chỗ kia",
        structure: "ここ/そこ/あそこ + は + Địa điểm + です",
        explanation: "Dùng để chỉ vị trí, nơi chốn.",
        examples: [
            { jp: "ここ は しょくどう です。", kana: "ここ は しょくどう です。", romaji: "Koko wa shokudou desu.", vn: "Đây là nhà ăn." },
            { jp: "うけつけ は あそこ です。", kana: "うけつけ は あそこ です。", romaji: "Uketsuke wa asoko desu.", vn: "Quầy lễ tân ở đằng kia." }
        ],
        quiz: {
            question: "'Chỗ kia' (xa cả hai) tiếng Nhật là gì?",
            options: ["ここ", "そこ", "あそこ"],
            correctIndex: 2,
            explanation: "'あそこ' (asoko) chỉ vị trí xa cả người nói và người nghe."
        }
    }
];

export const WEEK3_GRAMMAR_QUIZ = [
    {
        category: "lesson1",
        question: "Dịch sang tiếng Nhật: 'Tôi là nhân viên công ty'",
        options: ["わたしは かいしゃいん です。", "わたしは ぎんこういん です。", "わたし là いしゃ です。"],
        correctIndex: 0,
        explanation: "'かいしゃいん' là nhân viên công ty."
    },
    {
        category: "lesson1",
        question: "Chọn câu giới thiệu tên đúng: 'Tôi là Tanaka'",
        options: ["わたしは たなか もです。", "わたしは たなか です。", "わたしは たなか じゃありません。"],
        correctIndex: 1,
        explanation: "Dùng '...です' để khẳng định."
    },
    {
        category: "lesson1",
        question: "'あの人は 先生 です' nghĩa là gì?",
        options: ["Tôi là giáo viên.", "Người kia là giáo viên.", "Người kia không phải giáo viên."],
        correctIndex: 1,
        explanation: "'あの人' (ano hito) nghĩa là 'người kia'."
    },
    {
        category: "lesson1",
        question: "Điền trợ từ: 'わたし ___ ベトナム人 です。'",
        options: ["は", "も", "の"],
        correctIndex: 0,
        explanation: "'は' dùng để đánh dấu chủ đề 'Tôi'."
    },
    {
        category: "lesson1",
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
    },
    // New Questions for Deictics and Location
    {
        category: "lesson2",
        question: "Dịch sang tiếng Nhật: 'Đó là cái điện thoại di động'",
        options: ["これ は けいたい です。", "それ は けいたい です。", "あれ は けいたい です。"],
        correctIndex: 1,
        explanation: "'Đó' (vật gần người nghe) dùng 'それ'."
    },
    {
        category: "lesson2",
        question: "Chọn câu đúng: 'Cái điện thoại này là của tôi'",
        options: ["この けいたい は わたし の です。", "これ けいたい は わたし の です。", "その けいたい は わたし の です。"],
        correctIndex: 0,
        explanation: "'Cái ... này' dùng định từ 'この' đi kèm danh từ."
    },
    {
        category: "lesson3",
        question: "'あ đó là lớp học của tôi' (chỉ nơi người nói đang đứng) dùng:",
        options: ["ここ", "そこ", "あそこ"],
        correctIndex: 0,
        explanation: "'ここ' dùng cho vị trí người nói."
    },
    {
        category: "lesson3",
        question: "Hỏi 'Điện thoại của tôi ở đâu?'",
        options: ["けいたい は どれ ですか。", "けいたい は なに ですか。", "けいたい は どこ ですか。"],
        correctIndex: 2,
        explanation: "'どこ' dùng để hỏi vị trí (ở đâu)."
    }
];

export const WEEK4_GRAMMAR_DATA: GrammarPoint[] = [
    {
        id: "g4_1_1",
        title: "Hỏi giờ (なんじですか)",
        meaning: "Mấy giờ/Mấy phút?",
        structure: "いま、なんじ ですか。",
        explanation: "Để hỏi giờ hiện tại. Cách trả lời dùng Lượng từ + じ (giờ) / ふん (phút) + です.",
        examples: [
            { jp: "いま、なんじ ですか。", kana: "いま、なんじ ですか。", romaji: "Ima, nanji desu ka.", vn: "Bây giờ là mấy giờ?" },
            { jp: "はちじ さんじゅっぷん です。", kana: "はちじ さんじゅっぷん です。", romaji: "Hachiji sanjuppun desu.", vn: "8 giờ 30 phút." }
        ],
        quiz: {
            category: "lesson4",
            question: "Cách hỏi giờ trong tiếng Nhật là gì?",
            options: ["なんじ ですか。", "どこ ですか。", "だれ ですか。"],
            correctIndex: 0,
            explanation: "'なんじ' (nanji) dùng để hỏi giờ."
        }
    },
    {
        id: "g4_1_2",
        title: "～から ～まで",
        meaning: "Từ ~ đến ~",
        structure: "N1 (Time/Place) + から + N2 (Time/Place) + まで",
        explanation: "Dùng để chỉ khoảng thời gian hoặc khoảng cách địa lý.",
        examples: [
            { jp: "げつようび から きんようび まで べんきょうします。", kana: "げつようび から きんようび まで べんきょうします。", romaji: "Getsuyoubi kara kinyoubi made benkyoushimasu.", vn: "Tôi học từ Thứ 2 đến Thứ 6." },
            { jp: "９じ から ５じ まで です。", kana: "くじ から ごじ まで です。", romaji: "Kuji kara goji made desu.", vn: "Từ 9 giờ đến 5 giờ." }
        ],
        quiz: {
            category: "lesson4",
            question: "Trợ từ nào có nghĩa là 'đến' (điểm kết thúc)?",
            options: ["から", "まで", "へ"],
            correctIndex: 1,
            explanation: "'まで' (made) nghĩa là 'đến'."
        }
    },
    {
        id: "g4_2_1",
        title: "N (place) へ いきます / きます / かえります",
        meaning: "Đi / Đến / Về địa điểm N",
        structure: "N (Địa điểm) + へ + Động từ (Di chuyển)",
        explanation: "Trợ từ 'へ' (đọc là 'e') chỉ hướng di chuyển đến một địa điểm.",
        examples: [
            { jp: "はのい へ いきます。", kana: "はのい へ いきます。", romaji: "Hanoi e ikimasu.", vn: "Tôi đi Hà Nội." },
            { jp: "うちに かえります。", kana: "うちに かえります。", romaji: "Uchi ni kaerimasu.", vn: "Tôi về nhà." }
        ],
        quiz: {
            category: "lesson5",
            question: "Trợ từ nào dùng để chỉ hướng di chuyển (Đi/Đến/Về)?",
            options: ["を", "は", "へ"],
            correctIndex: 2,
            explanation: "Dùng 'へ' để chỉ hướng di chuyển tới địa điểm."
        }
    },
    {
        id: "g4_2_2",
        title: "N (Means) で V (Action)",
        meaning: "Bằng (phương tiện / công cụ)",
        structure: "N (Phương tiện/Công cụ) + で + Động từ",
        explanation: "Trợ từ 'で' dùng để chỉ phương tiện đi lại hoặc công cụ thực hiện hành động.",
        examples: [
            { jp: "ばいく で じっか へ かえります。", kana: "ばいく で じっか へ かえります。", romaji: "Baiku de jikka e kaerimasu.", vn: "Tôi về nhà bằng xe máy." },
            { jp: "はし で たべます。", kana: "はし で たべます。", romaji: "Hashi de tabemasu.", vn: "Tôi ăn bằng đũa." }
        ],
        quiz: {
            category: "lesson5",
            question: "Điền trợ từ: 'バス ___ びょういん へ いきます。'",
            options: ["を", "で", "へ"],
            correctIndex: 1,
            explanation: "Dùng 'で' để chỉ phương tiện di chuyển."
        }
    }
];

export const WEEK4_GRAMMAR_QUIZ = [
    {
        category: "lesson4",
        question: "Dịch: 'Bây giờ là 10 giờ'",
        options: ["いま、じゅうじ です。", "いま、なんじ ですか。", "いま、くじ です. "],
        correctIndex: 0,
        explanation: "'じゅうじ' là 10 giờ."
    },
    {
        category: "lesson4",
        question: "Tôi làm việc từ 8 giờ đến 5 giờ.",
        options: ["８じ から ５じ まで はたらきます。", "８じ へ ５じ まで はたらきます。", "８じ で ５じ まで はたらきます。"],
        correctIndex: 0,
        explanation: "Cấu trúc '...から ...まで'."
    },
    {
        category: "lesson5",
        question: "Điền trợ từ: 'わたし は にほん ___ いきます。'",
        options: ["を", "へ", "で"],
        correctIndex: 1,
        explanation: "Đi đến đâu dùng trợ từ 'へ'."
    },
    {
        category: "lesson5",
        question: "Dịch: 'Tôi đi bằng taxi'",
        options: ["タクシー へ いきます。", "タクシー で いきます。", "タクシー を いきます。"],
        correctIndex: 1,
        explanation: "Phương tiện dùng trợ từ 'で'."
    }
];

export const WEEK5_GRAMMAR_DATA: GrammarPoint[] = [
    {
        id: "g5_1_1",
        title: "N を V (Tân ngữ của hành động)",
        meaning: "Làm N",
        structure: "Danh từ + を + Động từ (Tha động từ)",
        explanation: "Trợ từ 'を' (đọc là 'o') dùng để xác định đối tượng chịu tác động của hành động.",
        examples: [
            { jp: "にほんご の ほん を よみます。", kana: "にほんご の ほん を よみます。", romaji: "Nihongo no hon o yomimasu.", vn: "Tôi đọc sách tiếng Nhật." },
            { jp: "おさけ を のみます。", kana: "おさけ を のみます。", romaji: "Osake o nomimasu.", vn: "Tôi uống rượu." }
        ],
        quiz: {
            category: "lesson6",
            question: "Trợ từ nào dùng để đánh dấu tân ngữ trực tiếp?",
            options: ["は", "を", "に"],
            correctIndex: 1,
            explanation: "'を' dùng cho tân ngữ."
        }
    },
    {
        id: "g5_1_2",
        title: "V ませんか / V ましょう",
        meaning: "Rủ rê / Cùng làm thôi",
        structure: "V (thể ます) + ませんか / ましょう",
        explanation: "'V ませんか' dùng để rủ rê một cách lịch sự. 'V ましょう' dùng để đề nghị cùng làm hoặc đồng ý lời mời.",
        examples: [
            { jp: "いっしょ に すーぱー へ いきませんか。", kana: "いっしょ に すーぱー へ いきませんか。", romaji: "Issho ni suupaa e ikimasen ka.", vn: "Cùng đi siêu thị chứ?" },
            { jp: "ええ、のみましょう。", kana: "ええ、のみましょう。", romaji: "Ee, nomimashou.", vn: "Vâng, uống thôi nào!" }
        ],
        quiz: {
            category: "lesson6",
            question: "Cách rủ rê 'Cùng làm cái này với tôi không?' là:",
            options: ["V ましょう", "V ませんか", "V です"],
            correctIndex: 1,
            explanation: "'V ませんか' là mẫu câu rủ rê lịch sự."
        }
    },
    {
        id: "g5_1_3",
        title: "V-mashou (Cùng làm thôi)",
        meaning: "Làm ... thôi!",
        structure: "V-masu (bỏ masu) + ましょう",
        explanation: "Dùng để đề nghị hoặc rủ rê cùng thực hiện hành động khi người nói tin rằng người nghe sẽ đồng ý.",
        examples: [
            { jp: "いっしょ に たべましょう。", kana: "いっしょ に たべましょう。", romaji: "Issho ni tabemashou.", vn: "Chúng ta cùng ăn cơm thôi." },
            { jp: "ちょっと やすみましょう。", kana: "ちょっと やすみましょう。", romaji: "Chotto yasumimashou.", vn: "Nghỉ một lát nào." }
        ],
        quiz: {
            category: "lesson6",
            question: "Cách nói 'Cùng nghỉ một lát nào' là:",
            options: ["やすみましょう", "やすみます", "やすみません"],
            correctIndex: 0,
            explanation: "'ましょう' dùng để đề nghị cùng thực hiện hành động."
        }
    },
    {
        id: "g5_2_1",
        title: "A に B を あげます / もらいます",
        meaning: "Tặng / Nhận",
        structure: "Người cho + は + Người nhận + に + Vật + を + あげます / もらいます",
        explanation: "'あげます' (agemasu) là tặng. 'もらいます' (moraimasu) là nhận. Người nhận (trong agemasu) hoặc người cho (trong moraimasu) đi với trợ từ 'に'.",
        examples: [
            { jp: "わたし は はは に はな を あげます。", kana: "わたし は はは に はな を あげます。", romaji: "Watashi wa haha ni hana o agemasu.", vn: "Tôi tặng hoa cho mẹ." },
            { jp: "わたし は ともだち に プレゼント を もらいました。", kana: "わたし は ともだち に プレゼント を もらいました。", romaji: "Watashi wa tomodachi ni purezento o moraimashita.", vn: "Tôi đã nhận quà từ bạn." }
        ],
        quiz: {
            category: "lesson7",
            question: "Trợ từ đi với người nhận hoặc người cho trong câu Age/Morai là:",
            options: ["を", "は", "ni"],
            correctIndex: 2,
            explanation: "Đối tượng gián tiếp đi với trợ từ 'に'."
        }
    },
    {
        id: "g5_2_2",
        title: "A が B を くれます",
        meaning: "A tặng B cho tôi",
        structure: "Người cho + が + (わたしに) + Vật + を + くれます",
        explanation: "Dùng 'くれます' khi ai đó tặng cái gì đó cho người nói (hoặc người thân của người nói).",
        examples: [
            { jp: "ともだち が わたし に ほん を くれました。", kana: "ともだち が わたし に ほん を くれました。", romaji: "Tomodachi ga watashi ni hon o kuremashita.", vn: "Bạn đã tặng sách cho tôi." },
            { jp: "さとうさん が くくれました。", kana: "さとうさん が くれました。", romaji: "Sato-san ga kuremashita.", vn: "Chị Sato đã tặng cho tôi." }
        ],
        quiz: {
            category: "lesson7",
            question: "Khi ai đó tặng quà cho CHÍNH BẠN, ta dùng động từ nào?",
            options: ["あげます", "もらいます", "くれます"],
            correctIndex: 2,
            explanation: "'くれます' dùng khi người khác tặng cho mình."
        }
    }
];

export const WEEK5_GRAMMAR_QUIZ = [
    {
        category: "lesson6",
        question: "Dịch: 'Tôi uống cà phê'",
        options: ["コーヒ を のみます。", "コーヒー を のみます。", "コーヒー に のみます。"],
        correctIndex: 1,
        explanation: "Tân ngữ cà phê đi với 'を'."
    },
    {
        category: "lesson6",
        question: "Rủ bạn đi ăn cơm: 'Cùng ăn cơm không?'",
        options: ["ごはん を たべましょうか。", "ごはん を たべませんか。", "ごはん を たべましたか。"],
        correctIndex: 1,
        explanation: "Rủ rê dùng '～ませんか'."
    },
    {
        category: "lesson7",
        question: "Dịch: 'Tôi tặng quà cho Lan'",
        options: ["わたし は ランさん に プレゼント を あげます。", "わたし は ランさん に プレゼント を もらいます。", "ランさん は わたし に プレゼント を あげます。"],
        correctIndex: 0,
        explanation: "'あげます' là tặng."
    },
    {
        category: "lesson7",
        question: "Anh Tanaka tặng tôi cuốn sách này.",
        options: ["たなかさ に ほん を あげます。", "たなかさん は わたし に ほん を もらいます。", "たなかさん が わたし に ほん を くれました。"],
        correctIndex: 2,
        explanation: "Tặng cho tôi dùng 'くれます'."
    }
];

export const WEEK6_GRAMMAR_DATA: GrammarPoint[] = [
    {
        id: "g6_1_1",
        title: "Tính từ đuôi い (A-i) và đuôi な (A-na)",
        meaning: "Miêu tả tính chất, trạng thái",
        structure: "Khẳng định: N は Aい です / A(bỏ na) な です\nPhủ định: A(bỏ i)く ない です / A(bỏ na) じゃありません",
        explanation: "Tính từ đuôi 'い' giữ nguyên 'い' khi khẳng định. Tính từ đuôi 'な' bỏ 'な' khi đứng cuối câu.",
        examples: [
            { jp: "この りんご は おいしい です。", kana: "この りんご は おいしい です。", romaji: "Kono ringo wa oishii desu.", vn: "Quả táo này ngon." },
            { jp: "しずか な まち です。", kana: "しずか な まち です。", romaji: "Shizuka na machi desu.", vn: "Đó là một thành phố yên tĩnh." }
        ],
        quiz: {
            category: "lesson8",
            question: "Phủ định của 'おいしい' (ngon) là gì?",
            options: ["おいしい じゃありません", "おいしく ない です", "おいしい ですか"],
            correctIndex: 1,
            explanation: "Tính từ đuôi 'い' chuyển sang phủ định thành '～くない'."
        }
    },
    {
        id: "g6_1_2",
        title: "Phó từ chỉ mức độ (Degree Adverbs)",
        meaning: "Rất / Không ... lắm / Hoàn toàn không",
        structure: "とても + Khẳng định\nあまり + Phủ định\nぜんぜん + Phủ định",
        explanation: "'とても' dùng tăng mức độ. 'あまり' và 'ぜんぜん' bắt buộc đi kèm với câu phủ định.",
        examples: [
            { jp: "にほんご は とても おもしろい です。", kana: "にほんご は とても おもしろい です。", romaji: "Nihongo wa totemo omoshiroi desu.", vn: "Tiếng Nhật rất thú vị." },
            { jp: "この 本 は あまり 高く ない です。", kana: "この ほん は あまり たかく ない です。", romaji: "Kono hon wa amari takaku nai desu.", vn: "Cuốn sách này không đắt lắm." }
        ],
        quiz: {
            category: "lesson8",
            question: "Từ nào sau đây bắt buộc đi với câu phủ định?",
            options: ["とても", "あまり", "すこし"],
            correctIndex: 1,
            explanation: "'あまり' dùng trong câu phủ định (không ... lắm)."
        }
    },
    {
        id: "g6_2_1",
        title: "N が あります / わかります",
        meaning: "Có / Hiểu N",
        structure: "N + が + あります / わかります",
        explanation: "Dùng trợ từ 'が' để chỉ đối tượng của việc sở hữu hoặc hiểu biết.",
        examples: [
            { jp: "わたし は にほんご が わかります。", kana: "わたし は にほんご が わかります。", romaji: "Watashi wa nihongo ga wakarimasu.", vn: "Tôi hiểu tiếng Nhật." },
            { jp: "おかね が あります。", kana: "おかね が あります。", romaji: "Okane ga arimasu.", vn: "Tôi có tiền." }
        ],
        quiz: {
            category: "lesson9",
            question: "Điền trợ từ: 'わたし は くるま ___ あります。'",
            options: ["を", "は", "가"],
            correctIndex: 2,
            explanation: "Sở hữu/Hiểu biết dùng trợ từ '가'."
        }
    },
    {
        id: "g6_2_2",
        title: "N ga suki / kirai / jouzu / heta",
        meaning: "Thích / Ghét / Giỏi / Kém N",
        structure: "N + が + 好き / 嫌い / 上手 / 下手 です",
        explanation: "Trợ từ 'が' dùng để chỉ đối tượng của cảm xúc (thích/ghét) hoặc năng lực (giỏi/kém).",
        examples: [
            { jp: "わたし は サッカー が すき です。", kana: "わたし は サッカー が すき です。", romaji: "Watashi wa sakkaa ga suki desu.", vn: "Tôi thích bóng đá." },
            { jp: "あの ひとは りょうり が じょうず です。", kana: "あの ひとは りょうり が じょうず です。", romaji: "Ano hito wa ryouri ga jouzu desu.", vn: "Người đó nấu ăn giỏi." }
        ],
        quiz: {
            category: "lesson9",
            question: "Điền trợ từ: 'わたし は テニス ___ じょうず です。'",
            options: ["を", "は", "が"],
            correctIndex: 2,
            explanation: "Thích/Ghét/Giỏi/Kém dùng trợ từ 'が'."
        }
    },
    {
        id: "g6_2_3",
        title: "Kara (Lý do)",
        meaning: "Vì...",
        structure: "Mệnh đề 1 (Lý do) + から, Mệnh đề 2 (Kết quả)",
        explanation: "'から' (kara) đứng sau mệnh đề chỉ nguyên nhân, lý do. Mệnh đề kết quả thường đứng sau.",
        examples: [
            { jp: "じかん が ありません から、 テレビ を みません。", kana: "じかん が ありません から、 テレビ を みません。", romaji: "Jikan ga arimasen kara, terebi o mimasen.", vn: "Vì không có thời gian nên tôi không xem TV." }
        ],
        quiz: {
            category: "lesson9",
            question: "Từ nào dùng để chỉ lý do 'Vì...'?",
            options: ["から", "まで", "へ"],
            correctIndex: 0,
            explanation: "'から' đứng sau mệnh đề chỉ nguyên nhân."
        }
    }
];

export const WEEK6_GRAMMAR_QUIZ = [
    {
        category: "lesson8",
        question: "Dịch: 'Tiếng Nhật không khó lắm'",
        options: ["にほんご は あまり むずかしくない です。", "にほんご は ぜんぜん むずかしくない です。", "にほんご は とても むずかしい です。"],
        correctIndex: 0,
        explanation: "'Không lắm' dùng 'あまり ... phủ định'."
    },
    {
        category: "lesson8",
        question: "Phủ định của 'きれい' (đẹp - tính từ đuôi na) là:",
        options: ["きれい くない です", "きれい じゃありません", "きれい でした"],
        correctIndex: 1,
        explanation: "'きれい' là tính từ đuôi 'na' nên phủ định dùng 'じゃありません'."
    },
    {
        category: "lesson9",
        question: "Điền trợ từ: 'にほんご ___ すき です。'",
        options: ["が", "を", "は"],
        correctIndex: 0,
        explanation: "Thích/Ghét đi với trợ từ 'が'."
    }
];

export const WEEK7_GRAMMAR_DATA: GrammarPoint[] = [
    {
        id: "g7_1_1",
        title: "N が あります / います (Tồn tại)",
        meaning: "Có N (ở đâu đó)",
        structure: "Địa điểm + に + N + が + あります (vật) / います (người/đv)",
        explanation: "Dùng để nói về sự tồn tại của sự vật, con người tại một vị trí nào đó.",
        examples: [
            { jp: "きょうしつ に せんせい が います。", kana: "きょうしつ に せんせい が います。", romaji: "Kyoushitsu ni sensei ga imasu.", vn: "Trong lớp có giáo viên." },
            { jp: "つくえ の うえ に 本 が あります。", kana: "つくえ の うえ に ほん が あります。", romaji: "Tsukue no ue ni hon ga arimasu.", vn: "Trên bàn có cuốn sách." }
        ],
        quiz: {
            category: "lesson10",
            question: "Khi nói về sự tồn tại của con mèo, ta dùng động từ nào?",
            options: ["あります", "います", "わかります"],
            correctIndex: 1,
            explanation: "Con mèo là động vật nên dùng 'います'."
        }
    },
    {
        id: "g7_2_1",
        title: "Lượng từ (Quantifiers) & dake",
        meaning: "Về số lượng / Chỉ",
        structure: "N + を + Lượng từ + Động từ\nLượng từ + だけ (Chỉ ...)",
        explanation: "Lượng từ thường đặt trước động từ. 'だけ' dùng để giới hạn số lượng.",
        examples: [
            { jp: "りんご を よっつ かいました。", kana: "りんご を よっつ かいました。", romaji: "Ringo o yottsu kaimashita.", vn: "Tôi đã mua 4 quả táo." },
            { jp: "さいふ の なか に 100えん だけ あります。", kana: "さいふ の なか に ひゃくえん だけ あります。", romaji: "Saifu no naka ni hyakuen dake arimasu.", vn: "Trong ví chỉ có 100 yên." }
        ],
        quiz: {
            category: "lesson11",
            question: "Lượng từ thường được đặt ở vị trí nào trong câu?",
            options: ["Đầu câu", "Trước động từ", "Sau động từ"],
            correctIndex: 1,
            explanation: "Trong tiếng Nhật, lượng từ thường đứng ngay trước động từ mà nó bổ nghĩa."
        }
    }
];

export const WEEK7_GRAMMAR_QUIZ = [
    {
        category: "lesson10",
        question: "Dịch: 'Ở đằng kia có rạp chiếu phim'",
        options: ["あそこ に えいがかん が あります。", "あそこ に えいがかん が います。", "あそこ は えいがかん です。"],
        correctIndex: 0,
        explanation: "Rạp chiếu phim là vật nên dùng 'あります'."
    },
    {
        category: "lesson10",
        question: "Điền động từ: 'いぬ が ___。'",
        options: ["あります", "います", "わかります"],
        correctIndex: 1,
        explanation: "Chó là động vật sống nên dùng 'います'."
    },
    {
        category: "lesson11",
        question: "Dịch: 'Trong lớp chỉ có 1 học sinh'",
        options: ["きょうしつ に がくせい が ひとり あります。", "きょうしつ に がくせい が ひとり だけ います。", "きょうしつ に がくせい が ひとり だけ あります。"],
        correctIndex: 1,
        explanation: "Học sinh dùng 'います', 'chỉ' dùng 'だけ'."
    }
];

export const WEEK8_GRAMMAR_DATA: GrammarPoint[] = [
    {
        id: "g8_1_1",
        title: "So sánh (Comparison)",
        meaning: "A hơn B / A và B cái nào hơn?",
        structure: "A は B より ADJ です\nA と B と どちらが ADJ ですか",
        explanation: "Dùng 'より' (yori) để chỉ đối tượng được so sánh kém hơn. 'どちらが' dùng trong câu hỏi lựa chọn giữa hai đối tượng.",
        examples: [
            { jp: "この かばん は その かばん より おもい です。", kana: "この かばん は その かばん より おもい です。", romaji: "Kono kaban wa sono kaban yori omoi desu.", vn: "Cái túi này nặng hơn cái túi đó." },
            { jp: "サッカー と やきゅう と どちらが おもしろい ですか。", kana: "サッカー と やきゅう と どちらが おもしろい ですか。", romaji: "Sakkaa to yakyuu to dochira ga omoshiroi desu ka.", vn: "Bóng đá và bóng chày, cái nào thú vị hơn?" }
        ],
        quiz: {
            category: "lesson12",
            question: "Cấu trúc 'A hơn B' là:",
            options: ["A は B より", "A は B まで", "A は B から"],
            correctIndex: 0,
            explanation: "'より' (yori) dùng trong câu so sánh hơn."
        }
    },
    {
        id: "g8_2_1",
        title: "V たい です (Muốn làm gì đó)",
        meaning: "Muốn làm V",
        structure: "V (thể ます) + たい です",
        explanation: "Diễn tả nguyện vọng, mong muốn của người nói.",
        examples: [
            { jp: "わたし は にほん へ いきたい です。", kana: "わたし は にほん へ いきたい です。", romaji: "Watashi wa nihon e ikitai desu.", vn: "Tôi muốn đi Nhật." },
            { jp: "すし が たべたい です。", kana: "すし が たべたい です。", romaji: "Sushi ga tabetai desu.", vn: "Tôi muốn ăn sushi." }
        ],
        quiz: {
            category: "lesson13",
            question: "Chọn câu đúng: 'Tôi muốn uống nước'",
            options: ["みず を のみたい です。", "みず を のむたい です。", "みず を のみますたい です。"],
            correctIndex: 0,
            explanation: "Động từ 'のみます' bỏ 'ます' thêm 'たい'."
        }
    },
    {
        id: "g8_2_2",
        title: "N e (V-ni) ikimasu / kimasu / kaerimasu",
        meaning: "Đi / Đến / Về để làm V",
        structure: "N (Địa điểm) + へ + V-masu (bỏ masu) + に + 行きます/来ます/帰ります",
        explanation: "Dùng để diễn tả mục đích của việc di chuyển.",
        examples: [
            { jp: "こうべ へ インドじょうり を たべ に いきます。", kana: "こうべ へ いんどりょうり を たべ に いきます。", romaji: "Koube e indoryouri o tabe ni ikimasu.", vn: "Tôi đi Kobe để ăn món Ấn Độ." }
        ],
        quiz: {
            category: "lesson13",
            question: "Trợ từ nào dùng để chỉ mục đích di chuyển (Đi để ...)?",
            options: ["を", "に", "へ"],
            correctIndex: 1,
            explanation: "V-masu (bỏ masu) + に + 行きます."
        }
    }
];

export const WEEK8_GRAMMAR_QUIZ = [
    {
        category: "lesson12",
        question: "Dịch: 'Mùa hè nóng hơn mùa thu'",
        options: ["なつ は あき より あつい です。", "あき は なつ より あつい です。", "なつ は あき ほど あつくない です。"],
        correctIndex: 0,
        explanation: "Cấu trúc 'A は B より ADJ'."
    },
    {
        category: "lesson12",
        question: "Hỏi: 'Táo và quýt, bạn thích cái nào hơn?'",
        options: ["りんご と みかん と どちらが すき ですか。", "りんご と みかん と なに が すき ですか。", "りんご と みかん と どこ が すき ですか。"],
        correctIndex: 0,
        explanation: "So sánh 2 vật chọn 1 dùng 'どちらが'."
    },
    {
        category: "lesson13",
        question: "Dịch: 'Tôi muốn mua máy tính mới'",
        options: ["あたらしい パソコン を かいたい です。", "あたらしい パソコン を かうたい です。", "あたらしい パソコン を かいますたい です。"],
        correctIndex: 0,
        explanation: "V-tai dùng thể ます bỏ ます."
    }
];

export const WEEK9_GRAMMAR_DATA: GrammarPoint[] = [
    {
        id: "g9_1_1",
        title: "Thể Te (V-te) và yêu cầu lịch sự",
        meaning: "Chia thể Te và câu 'Hãy làm V'",
        structure: "V (thể て) + ください",
        explanation: "Thể Te dùng để nối câu hoặc đi kèm các mẫu câu khác. 'V-te kudasai' dùng để yêu cầu ai đó làm gì một cách lịch sự.",
        examples: [
            { jp: "ちょっと まって ください。", kana: "ちょっと まって ください。", romaji: "Chotto matte kudasai.", vn: "Vui lòng chờ một chút." },
            { jp: "ここに じゅうしょ を かいて ください。", kana: "ここに じゅうしょ を かいて ください。", romaji: "Koko ni juusho o kaite kudasai.", vn: "Hãy viết địa chỉ vào đây." }
        ],
        quiz: {
            category: "lesson14",
            question: "Thể Te của 'かきます' (viết) là gì?",
            options: ["かいて", "かきて", "かいた"],
            correctIndex: 0,
            explanation: "Động từ nhóm 1 kết thúc bằng 'ki' chuyển thành 'ite'."
        }
    },
    {
        id: "g9_1_2",
        title: "V-te います (Thì hiện tại tiếp diễn)",
        meaning: "Đang làm V",
        structure: "V (thể て) + います",
        explanation: "Dùng để diễn tả một hành động đang diễn ra tại thời điểm nói.",
        examples: [
            { jp: "いま、あめ が ふって います。", kana: "いま、あめ が ふって います。", romaji: "Ima, ame ga futte imasu.", vn: "Bây giờ trời đang mưa." },
            { jp: "ミラーさん は にほんご を べんきょうして います。", kana: "ミラーさん は にほんご を べんきょうして います。", romaji: "Miraa-san wa nihongo o benkyoushite imasu.", vn: "Anh Miller đang học tiếng Nhật." }
        ],
        quiz: {
            category: "lesson14",
            question: "Để nói 'Tôi đang ăn cơm', ta dùng mẫu câu nào?",
            options: ["ごはん を たべます。", "ごはん を たべて います。", "ごはん を たべたい です。"],
            correctIndex: 1,
            explanation: "Đang làm gì đó dùng 'V-te imasu'."
        }
    },
    {
        id: "g9_2_1",
        title: "Cho phép và Cấm đoán (V-te mo ii / V-te wa ikemasen)",
        meaning: "Có thể làm... / Không được làm...",
        structure: "V-te + も いい です (Cho phép)\nV-te + は いけません (Cấm đoán)",
        explanation: "Dùng để xin phép hoặc đưa ra quy định, cấm đoán.",
        examples: [
            { jp: "しゃしん を とっても いい です か。", kana: "しゃしん を とっても いい です か。", romaji: "Shashin o tottemo ii desu ka.", vn: "Tôi chụp ảnh có được không?" },
            { jp: "ここで たばこ を すって は いけません。", kana: "ここで たばこ を すって は いけません。", romaji: "Koko de tabako o sutte wa ikemasen.", vn: "Không được hút thuốc ở đây." }
        ],
        quiz: {
            category: "lesson15",
            question: "Mẫu câu nào dùng để xin phép làm gì đó?",
            options: ["V-te kudasai", "V-te mo ii desu ka", "V-te wa ikemasen"],
            correctIndex: 1,
            explanation: "'V-te mo ii desu ka' dùng để xin phép."
        }
    }
];

export const WEEK9_GRAMMAR_QUIZ = [
    {
        category: "lesson14",
        question: "Thể Te của 'のみます' là gì?",
        options: ["のんで", "のみて", "のいて"],
        correctIndex: 0,
        explanation: "Nhóm 1 kết thúc bằng 'mi, bi, ni' chuyển thành 'nde'."
    },
    {
        category: "lesson14",
        question: "Dịch: 'Hãy bật điện lên'",
        options: ["でんき を つけて ください。", "でんき を つけます ください。", "でんき を つけて います。"],
        correctIndex: 0,
        explanation: "Yêu cầu lịch sự dùng 'V-te kudasai'."
    },
    {
        category: "lesson15",
        question: "Dịch: 'Anh Tanaka đang đọc báo'",
        options: ["たなかさん は しんぶん を よみます。", "たなかさん は しんぶん を よんで います。", "たなかさん は しんぶん を よみたい です。"],
        correctIndex: 1,
        explanation: "Đang làm gì đó dùng 'V-te imasu'."
    }
];

export const WEEK10_GRAMMAR_DATA: GrammarPoint[] = [
    {
        id: "g10_1_1",
        title: "Nối câu bằng thể Te (V-te, V-te...)",
        meaning: "Làm V1 rồi làm V2...",
        structure: "V1-te, V2-te, ... V-n",
        explanation: "Dùng để liệt kê các hành động xảy ra theo trình tự thời gian.",
        examples: [
            { jp: "あさ おきて、 しゃわー を あびて、 がっこう へ いきます。", kana: "あさ おきて、 しゃわー を あびて、 がっこう へ いきます。", romaji: "Asa okite, shawaa o abite, gakkou e ikimasu.", vn: "Sáng tôi thức dậy, tắm vòi sen, rồi đi học." }
        ],
        quiz: {
            category: "lesson16",
            question: "Dùng thể gì để nối các hành động theo trình tự thời gian?",
            options: ["Thể Masu", "Thể Te", "Thể Nai"],
            correctIndex: 1,
            explanation: "Dùng thể Te để nối các động từ liên tiếp."
        }
    },
    {
        id: "g10_1_2",
        title: "V1-te kara, V2",
        meaning: "Sau khi làm V1 thì làm V2",
        structure: "V1 (thể て) + から, V2",
        explanation: "Nhấn mạnh trình tự: làm xong V1 rồi mới làm V2.",
        examples: [
            { jp: "しごと が おわって から、 のみ に いきます。", kana: "しごと が おわって から、 のみ に いきます。", romaji: "Shigoto ga owatte kara, nomi ni ikimasu.", vn: "Sau khi xong việc thì tôi đi uống." }
        ],
        quiz: {
            category: "lesson16",
            question: "Mẫu câu 'Sau khi ...' nhấn mạnh trình tự là:",
            options: ["V-te cara", "V-te kudasai", "V-te imasu"],
            correctIndex: 0,
            explanation: "'V-te kara' có nghĩa là sau khi làm việc gì đó."
        }
    },
    {
        id: "g10_2_1",
        title: "Thể Nai (V-nai) và yêu cầu 'Đừng làm V'",
        meaning: "Chia thể Nai và 'V-nai de kudasai'",
        structure: "V (thể ない) + で ください",
        explanation: "Thể Nai là thể phủ định ngắn. 'V-nai de kudasai' dùng để yêu cầu ai đó đừng làm việc gì đó.",
        examples: [
            { jp: "ここで しゃしん を とらないで ください。", kana: "ここで しゃしん を とらないで ください。", romaji: "Koko de shashin o toranaide kudasai.", vn: "Xin đừng chụp ảnh ở đây." },
            { jp: "わすれないで ください。", kana: "わすれないで ください。", romaji: "Wasurenaide kudasai.", vn: "Xin đừng quên." }
        ],
        quiz: {
            category: "lesson17",
            question: "Thể Nai của 'いきます' là gì?",
            options: ["いかない", "いきない", "いかいない"],
            correctIndex: 0,
            explanation: "Nhóm 1 chuyển hàng 'i' sang hàng 'a' rồi thêm 'nai'."
        }
    },
    {
        id: "g10_2_2",
        title: "Nghĩa vụ và Không cần thiết (V-nakereba / V-nakute mo ii)",
        meaning: "Phải làm... / Không cần làm cũng được",
        structure: "V-nakereba narimasen (Phải)\nV-nakute mo ii desu (Không cần)",
        explanation: "Dùng để diễn tả sự bắt buộc hoặc sự không cần thiết của hành động.",
        examples: [
            { jp: "くすり を のまなければ なりません。", kana: "くすり を のまなければ なりません。", romaji: "Kusuri o nomanakereba narimasen.", vn: "Tôi phải uống thuốc." },
            { jp: "あした は こなくても いい です。", kana: "あした は こなくても いい です。", romaji: "Ashita wa konakute mo ii desu.", vn: "Ngày mai bạn không cần đến cũng được." }
        ],
        quiz: {
            category: "lesson17",
            question: "Mẫu câu nào có nghĩa là 'Phải làm gì đó'?",
            options: ["V-te kudasai", "V-nakereba narimasen", "V-nakute mo ii desu"],
            correctIndex: 1,
            explanation: "'V-nakereba narimasen' diễn tả sự bắt buộc."
        }
    }
];

export const WEEK10_GRAMMAR_QUIZ = [
    {
        category: "lesson16",
        question: "Chia thể Nai của 'たべます':",
        options: ["たべない", "たべあない", "たべわたい"],
        correctIndex: 0,
        explanation: "Động từ nhóm 2 bỏ ます thêm ない."
    },
    {
        category: "lesson17",
        question: "Dịch: 'Xin đừng vào phòng này'",
        options: ["この へや に はいって ください。", "この へや に はいらないで ください。", "この へや に はいらなければ なりません。"],
        correctIndex: 1,
        explanation: "'Đừng làm gì' dùng 'V-nai de kudasai'."
    },
    {
        category: "lesson17",
        question: "Dịch: 'Hôm nay tôi phải về sớm'",
        options: ["きょう は はやく かえらなければ なりません。", "きょう は はやく かえらなくて も いい です。", "きょう は はやく かえって ください。"],
        correctIndex: 0,
        explanation: "Phải làm gì dùng 'V-nakereba narimasen'."
    }
];

export const WEEK11_GRAMMAR_DATA: GrammarPoint[] = [
    {
        id: "g11_1_1",
        title: "Thể từ điển (V-ru) và 'V-ru koto ga dekimasu'",
        meaning: "Có thể làm V...",
        structure: "V (thể từ điển) + こと が できます",
        explanation: "Dùng để diễn tả khả năng hoặc sự cho phép thực hiện hành động.",
        examples: [
            { jp: "ミラーさん は かんじ を よむ こと が できます。", kana: "ミラーさん は かんじ を よむ こと が できます。", romaji: "Mira-san wa kanji o yomu koto ga dekimasu.", vn: "Anh Miller có thể đọc được chữ Hán." },
            { jp: "カード で はらう こと が できます。", kana: "カード で はらう こと が できます。", romaji: "Ka-do de harau koto ga dekimasu.", vn: "Có thể thanh toán bằng thẻ." }
        ],
        quiz: {
            category: "lesson18",
            question: "Thể từ điển của 'かきます' là gì?",
            options: ["かく", "かき", "かかない"],
            correctIndex: 0,
            explanation: "Nhóm 1 hàng 'i' chuyển sang hàng 'u'."
        }
    },
    {
        id: "g11_1_2",
        title: "Sở thích (Shumi wa V-ru koto desu)",
        meaning: "Sở thích của tôi là...",
        structure: "しゅみ は V (thể từ điển) + こと です",
        explanation: "Dùng để giới thiệu về sở thích cá nhân một cách chi tiết.",
        examples: [
            { jp: "わたし の しゅみ は え を かく こと です。", kana: "わたし の しゅみ は え を かく こと です。", romaji: "Watashi no shumi wa e o kaku koto desu.", vn: "Sở thích của tôi là vẽ tranh." }
        ],
        quiz: {
            category: "lesson18",
            question: "Dịch: 'Sở thích của tôi là nghe nhạc'",
            options: ["しゅみ は おんがく を きく こと です。", "しゅみ は おんがく を ききます。", "しゅみ は おんがく です。"],
            correctIndex: 0,
            explanation: "Dùng cấu trúc 'V-ru koto desu' để diễn đạt sở thích."
        }
    },
    {
        id: "g11_2_1",
        title: "Thể Ta (V-ta) và 'V-ta koto ga arimasu'",
        meaning: "Đã từng làm V...",
        structure: "V (thể た) + こと が あります",
        explanation: "Dùng để diễn tả một kinh nghiệm đã từng trải qua trong quá khứ.",
        examples: [
            { jp: "わたし は ふじさん に のぼった こと が あります。", kana: "わたし は ふじさん に のぼった こと が あります。", romaji: "Watashi wa fujisan ni nobotta koto ga arimasu.", vn: "Tôi đã từng leo núi Phú Sĩ." },
            { jp: "にほんりょうり を たべた こと が あります か。", kana: "にほんりょうり を たべた こと が あります か。", romaji: "Nihon ryouri o tabeta koto ga arimasu ka.", vn: "Bạn đã từng ăn món Nhật chưa?" }
        ],
        quiz: {
            category: "lesson19",
            question: "Thể Ta của 'たべます' là gì?",
            options: ["たべた", "たべだ", "たべて"],
            correctIndex: 0,
            explanation: "Động từ nhóm 2 bỏ ます thêm た."
        }
    },
    {
        id: "g11_2_2",
        title: "Liệt kê hành động (V-tari, V-tari shimasu)",
        meaning: "Lúc thì làm V1, lúc thì làm V2...",
        structure: "V1-tari, V2-tari します",
        explanation: "Dùng để liệt kê một vài hành động tiêu biểu trong số nhiều hành động.",
        examples: [
            { jp: "にちようび は かいもの したり、ビデオ を みたり します。", kana: "にichiyoubi wa kaimono shitari, bideo o mitari shimasu.", romaji: "Nichiyoubi wa kaimono shitari, bideo o mitari shimasu.", vn: "Chủ nhật tôi lúc thì đi mua sắm, lúc thì xem video." }
        ],
        quiz: {
            category: "lesson19",
            question: "Cấu trúc 'V-tari, V-tari します' dùng để làm gì?",
            options: ["Liệt kê hành động theo trình tự", "Liệt kê hành động không theo trình tự", "Diễn tả hành động đang diễn ra"],
            correctIndex: 1,
            explanation: "Dùng để liệt kê tiêu biểu các hành động không nhất thiết theo trình tự."
        }
    }
];

export const WEEK11_GRAMMAR_QUIZ = [
    {
        category: "lesson18",
        question: "Dịch: 'Bạn có thể bơi không?'",
        options: ["およぐ こと が できます か。", "およぎます か。", "およぐ ことが ありますか。"],
        correctIndex: 0,
        explanation: "Dùng cấu trúc hỏi về khả năng."
    },
    {
        category: "lesson19",
        question: "Dịch: 'Tôi chưa từng đi Nhật'",
        options: ["にほん へ いった こと が ありません。", "にほん へ いきません でした。", "にほん へ いかない こと が あります。"],
        correctIndex: 0,
        explanation: "Chưa từng trải qua dùng 'V-ta koto ga arimasen'."
    }
];
