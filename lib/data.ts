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