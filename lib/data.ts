import { BookOpen, Mic, Zap, CheckCircle2, Users, Eye, FileText, Trophy, PenTool } from 'lucide-react';


export const N5_PHASES = [
  {
    id: 1,
    title: "Giai đoạn 1: Khởi động (The Awakening)",
    description: "Xóa mù chữ Hiragana/Katakana & Bài tập cơ bản.",
    color: "bg-green-100 text-green-700 border-green-200",
    iconColor: "text-green-600",
    quests: [
      {
        id: 'q1_1',
        title: "1. Nạp kiến thức",
        desc: "Xem bảng chữ cái Hiragana & Katakana.",
        type: "learn",
        icon: BookOpen,
        link: "/roadmap/n5/phase1/learn",
        xp: 100
      },
      {
        id: 'q1_2',
        title: "2. Ghi nhớ mặt chữ",
        desc: "Bài tập trắc nghiệm: Nhìn Kana đoán Romaji.",
        type: "test",
        icon: PenTool,
        link: "/roadmap/n5/phase1/practice",
        xp: 150
      },
      {
        id: 'q1_3',
        title: "3. Luyện đọc sơ cấp",
        desc: "Đọc 3 bài văn ngắn chỉ dùng Kana.",
        type: "reading",
        icon: Eye,
        link: "/reading?mode=challenge&level=N5&questId=q1_3",
        xp: 200
      },
      {
        id: 'q1_4',
        title: "4. Kiểm tra tổng hợp",
        desc: "Bài thi trắc nghiệm Hiragana + Katakana (Đạt >80%).",
        type: "test",
        icon: CheckCircle2,
        link: "/roadmap/n5/phase1/test",
        xp: 300
      }
    ]
  },
  {
    id: 2,
    title: "Giai đoạn 2: Xây nền móng (Foundation)",
    description: "Bài 1 - 12: Số đếm, Gia đình, Mua sắm.",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    iconColor: "text-blue-600",
    quests: [
      {
        id: 'q2_1',
        title: "Nạp từ vựng",
        desc: "Học Flashcard: Số đếm, Tiền tệ, Gia đình.",
        type: "flashcard",
        icon: Zap,
        link: "/flashcards/deck-n5-basic",
        xp: 150
      },
      {
        id: 'q2_2',
        title: "Luyện đọc hiểu",
        desc: "Đọc đoạn văn ngắn, dùng công cụ dịch tra từ lạ.",
        type: "reading",
        icon: BookOpen,
        link: "/reading/basic-texts",
        xp: 200
      },
      {
        id: 'q2_3',
        title: "Thực chiến: Konbini",
        desc: "Roleplay: Hỏi giá và mua hàng tại cửa hàng tiện lợi.",
        type: "roleplay",
        icon: Mic,
        link: "/roleplay/shopping",
        xp: 250
      },
      {
        id: 'q2_4',
        title: "Kết nối cộng đồng",
        desc: "Đăng bài giới thiệu bản thân (Watashi wa...).",
        type: "community",
        icon: Users,
        link: "/community",
        xp: 100
      }
    ]
  },
  {
    id: 3,
    title: "Giai đoạn 3: Vượt chướng ngại vật (The Climb)",
    description: "Bài 13 - 25: Động từ, Chia thể Te/Ta/Nai.",
    color: "bg-red-100 text-red-700 border-red-200",
    iconColor: "text-red-600",
    quests: [
      {
        id: 'q3_1',
        title: "Lý thuyết ngữ pháp",
        desc: "Xem bài giảng về cách chia động từ thể Te.",
        type: "learn",
        icon: BookOpen,
        link: "/exercises/verbs-te-form",
        xp: 150
      },
      {
        id: 'q3_2',
        title: "Phản xạ chia thể",
        desc: "Flashcard đặc biệt: Mặt trước Masu -> Mặt sau Te.",
        type: "flashcard",
        icon: Zap,
        link: "/flashcards/deck-verbs",
        xp: 200
      },
      {
        id: 'q3_3',
        title: "Bài tập chuyên sâu",
        desc: "Điền trợ từ (Wa, Ga, O, Ni) và chia động từ.",
        type: "test",
        icon: PenTool,
        link: "/exercises/particles",
        xp: 250
      },
      {
        id: 'q3_4',
        title: "Đọc giải trí",
        desc: "Đọc bài 'Ninja' hoặc 'Máy bán hàng' để xả hơi.",
        type: "reading",
        icon: BookOpen,
        link: "/reading/culture-japan",
        xp: 150
      }
    ]
  },
  {
    id: 4,
    title: "Giai đoạn 4: Tăng tốc Kanji (Kanji Master)",
    description: "Chinh phục 100-150 Kanji N5 quan trọng nhất.",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    iconColor: "text-purple-600",
    quests: [
      {
        id: 'q4_1',
        title: "Kanji tượng hình",
        desc: "Học bộ 100 Kanji N5 qua hình ảnh gợi nhớ.",
        type: "flashcard",
        icon: Zap,
        link: "/flashcards/kanji-n5",
        xp: 200
      },
      {
        id: 'q4_2',
        title: "Luyện gõ Kanji",
        desc: "Bài tập nhìn Hiragana gõ ra Kanji tương ứng.",
        type: "test",
        icon: PenTool,
        link: "/exercises/kanji-typing",
        xp: 200
      },
      {
        id: 'q4_3',
        title: "Thử thách đọc thật",
        desc: "Đọc bài văn N5 chế độ tắt Furigana (chỉ hiện Kanji).",
        type: "reading",
        icon: BookOpen,
        link: "/reading/no-furigana",
        xp: 300
      }
    ]
  },
  {
    id: 5,
    title: "Giai đoạn 5: Về đích (The Final Boss)",
    description: "Tổng ôn và Thi thử JLPT N5.",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    iconColor: "text-amber-600",
    quests: [
      {
        id: 'q5_1',
        title: "Tổng ôn SRS",
        desc: "Ôn tập lại tất cả các từ vựng/Kanji hay sai.",
        type: "flashcard",
        icon: Zap,
        link: "/flashcards/review-srs",
        xp: 200
      },
      {
        id: 'q5_2',
        title: "Thi thử N5",
        desc: "Làm đề Full Test N5 có bấm giờ như thi thật.",
        type: "test",
        icon: Trophy,
        link: "/tests/n5-full-test",
        xp: 1000
      },
      {
        id: 'q5_3',
        title: "Phân tích điểm yếu",
        desc: "Xem báo cáo AI và luyện bù kỹ năng còn yếu.",
        type: "learn",
        icon: FileText,
        link: "/profile/analysis",
        xp: 100
      }
    ]
  }
];

export const N5_WEEKS = [
  {
    week: 1,
    title: "Tuần 1: Bảng chữ cái Hiragana",
    description: "Làm quen và ghi nhớ 46 ký tự Hiragana cơ bản.",
    color: "bg-green-100 border-green-200",
    iconColor: "text-green-600",
    badgeColor: "bg-green-500",
    quests: [
      {
        id: 'w1_1',
        title: "Nạp kiến thức Hiragana",
        desc: "Xem bảng chữ cái Hiragana đầy đủ 46 ký tự.",
        type: "learn",
        icon: BookOpen,
        link: "/roadmap/n5/phase1/learn",
        xp: 100
      },
      {
        id: 'w1_2',
        title: "Ghi nhớ mặt chữ",
        desc: "Bài tập trắc nghiệm: Nhìn Hiragana đoán Romaji.",
        type: "test",
        icon: PenTool,
        link: "/roadmap/n5/phase1/practice",
        xp: 150
      },
      {
        id: 'w1_3',
        title: "Luyện đọc Hiragana",
        desc: "Đọc 3 bài văn ngắn chỉ dùng Hiragana.",
        type: "reading",
        icon: Eye,
        link: "/reading?mode=challenge&level=N5&questId=w1_3",
        xp: 200
      },
    ]
  },
  {
    week: 2,
    title: "Tuần 2: Bảng chữ cái Katakana",
    description: "Chinh phục Katakana và kiểm tra tổng hợp Kana.",
    color: "bg-teal-100 border-teal-200",
    iconColor: "text-teal-600",
    badgeColor: "bg-teal-500",
    quests: [
      {
        id: 'w2_1',
        title: "Nạp kiến thức Katakana",
        desc: "Xem bảng chữ cái Katakana đầy đủ 46 ký tự.",
        type: "learn",
        icon: BookOpen,
        link: "/roadmap/n5/phase1/learn",
        xp: 100
      },
      {
        id: 'w2_2',
        title: "Ghi nhớ Katakana",
        desc: "Trắc nghiệm: Nhìn Katakana đoán Romaji.",
        type: "test",
        icon: PenTool,
        link: "/roadmap/n5/phase1/practice",
        xp: 150
      },
      {
        id: 'w2_3',
        title: "Kiểm tra tổng hợp Kana",
        desc: "Bài thi Hiragana + Katakana (Đạt >80%).",
        type: "test",
        icon: CheckCircle2,
        link: "/roadmap/n5/phase1/test",
        xp: 300
      },
    ]
  },
  {
    week: 3,
    title: "Tuần 3: Số đếm & Gia đình",
    description: "Từ vựng số đếm, tiền tệ và các thành viên trong gia đình.",
    color: "bg-blue-100 border-blue-200",
    iconColor: "text-blue-600",
    badgeColor: "bg-blue-500",
    quests: [
      {
        id: 'w3_1',
        title: "Nạp từ vựng Số đếm & Gia đình",
        desc: "Học Flashcard: Số đếm, Tiền tệ, Gia đình.",
        type: "flashcard",
        icon: Zap,
        link: "/flashcards/deck-n5-basic",
        xp: 150
      },
      {
        id: 'w3_2',
        title: "Luyện đọc cơ bản",
        desc: "Đọc đoạn văn ngắn về gia đình, dùng công cụ dịch tra từ lạ.",
        type: "reading",
        icon: BookOpen,
        link: "/reading/basic-texts",
        xp: 200
      },
      {
        id: 'w3_3',
        title: "Kết nối cộng đồng",
        desc: "Đăng bài giới thiệu bản thân (Watashi wa...).",
        type: "community",
        icon: Users,
        link: "/community",
        xp: 100
      },
    ]
  },
  {
    week: 4,
    title: "Tuần 4: Mua sắm & Giao tiếp cơ bản",
    description: "Thực hành hỏi giá, mua hàng và các câu giao tiếp đơn giản.",
    color: "bg-indigo-100 border-indigo-200",
    iconColor: "text-indigo-600",
    badgeColor: "bg-indigo-500",
    quests: [
      {
        id: 'w4_1',
        title: "Từ vựng mua sắm",
        desc: "Học Flashcard: Các từ liên quan đến mua sắm và giá cả.",
        type: "flashcard",
        icon: Zap,
        link: "/flashcards/deck-n5-basic",
        xp: 150
      },
      {
        id: 'w4_2',
        title: "Thực chiến: Konbini",
        desc: "Roleplay: Hỏi giá và mua hàng tại cửa hàng tiện lợi.",
        type: "roleplay",
        icon: Mic,
        link: "/roleplay/shopping",
        xp: 250
      },
      {
        id: 'w4_3',
        title: "Luyện đọc hiểu mua sắm",
        desc: "Đọc đoạn quảng cáo và thông báo tại cửa hàng.",
        type: "reading",
        icon: Eye,
        link: "/reading/basic-texts",
        xp: 200
      },
    ]
  },
  {
    week: 5,
    title: "Tuần 5: Động từ & Chia thể Masu",
    description: "Nắm vững cách chia động từ thể Masu – lịch sự.",
    color: "bg-orange-100 border-orange-200",
    iconColor: "text-orange-600",
    badgeColor: "bg-orange-500",
    quests: [
      {
        id: 'w5_1',
        title: "Lý thuyết động từ",
        desc: "Xem bài giảng về phân loại động từ và cách chia thể Masu.",
        type: "learn",
        icon: BookOpen,
        link: "/exercises/verbs-te-form",
        xp: 150
      },
      {
        id: 'w5_2',
        title: "Flashcard động từ Masu",
        desc: "Luyện phản xạ chia thể Masu từ dạng gốc.",
        type: "flashcard",
        icon: Zap,
        link: "/flashcards/deck-verbs",
        xp: 200
      },
      {
        id: 'w5_3',
        title: "Điền trợ từ cơ bản",
        desc: "Bài tập điền trợ từ (Wa, Ga, O, Ni) vào câu.",
        type: "test",
        icon: PenTool,
        link: "/exercises/particles",
        xp: 250
      },
    ]
  },
  {
    week: 6,
    title: "Tuần 6: Chia thể Te / Ta / Nai",
    description: "Chinh phục các dạng chia động từ nâng cao của N5.",
    color: "bg-red-100 border-red-200",
    iconColor: "text-red-600",
    badgeColor: "bg-red-500",
    quests: [
      {
        id: 'w6_1',
        title: "Lý thuyết thể Te / Nai",
        desc: "Xem bài giảng về cách chia thể Te và thể phủ định Nai.",
        type: "learn",
        icon: BookOpen,
        link: "/exercises/verbs-te-form",
        xp: 150
      },
      {
        id: 'w6_2',
        title: "Phản xạ chia thể Te",
        desc: "Flashcard: Mặt trước Masu → Mặt sau là dạng Te.",
        type: "flashcard",
        icon: Zap,
        link: "/flashcards/deck-verbs",
        xp: 200
      },
      {
        id: 'w6_3',
        title: "Đọc giải trí",
        desc: "Đọc bài 'Ninja' hoặc 'Máy bán hàng' để xả hơi.",
        type: "reading",
        icon: BookOpen,
        link: "/reading/culture-japan",
        xp: 150
      },
    ]
  },
  {
    week: 7,
    title: "Tuần 7: Kanji N5 (100 Kanji đầu)",
    description: "Chinh phục 100 Kanji N5 quan trọng nhất qua hình ảnh.",
    color: "bg-purple-100 border-purple-200",
    iconColor: "text-purple-600",
    badgeColor: "bg-purple-500",
    quests: [
      {
        id: 'w7_1',
        title: "Kanji tượng hình",
        desc: "Học bộ 100 Kanji N5 qua hình ảnh gợi nhớ.",
        type: "flashcard",
        icon: Zap,
        link: "/flashcards/kanji-n5",
        xp: 200
      },
      {
        id: 'w7_2',
        title: "Luyện gõ Kanji",
        desc: "Bài tập nhìn Hiragana gõ ra Kanji tương ứng.",
        type: "test",
        icon: PenTool,
        link: "/exercises/kanji-typing",
        xp: 200
      },
      {
        id: 'w7_3',
        title: "Thử thách đọc không Furigana",
        desc: "Đọc bài văn N5 với chế độ tắt Furigana (chỉ hiện Kanji).",
        type: "reading",
        icon: Eye,
        link: "/reading/no-furigana",
        xp: 300
      },
    ]
  },
  {
    week: 8,
    title: "Tuần 8: Tổng ôn & Thi thử N5",
    description: "Ôn tập toàn bộ và làm đề thi thử N5 như thi thật.",
    color: "bg-amber-100 border-amber-200",
    iconColor: "text-amber-600",
    badgeColor: "bg-amber-500",
    quests: [
      {
        id: 'w8_1',
        title: "Tổng ôn SRS",
        desc: "Ôn tập lại tất cả từ vựng/Kanji hay sai.",
        type: "flashcard",
        icon: Zap,
        link: "/flashcards/review-srs",
        xp: 200
      },
      {
        id: 'w8_2',
        title: "Thi thử N5",
        desc: "Làm đề Full Test N5 có bấm giờ như thi thật.",
        type: "test",
        icon: Trophy,
        link: "/tests/n5-full-test",
        xp: 1000
      },
      {
        id: 'w8_3',
        title: "Phân tích điểm yếu",
        desc: "Xem báo cáo AI và luyện bù kỹ năng còn yếu.",
        type: "learn",
        icon: FileText,
        link: "/profile/analysis",
        xp: 100
      },
    ]
  },
];