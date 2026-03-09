//lib/data.ts
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
    title: "Tuần 1: Chinh phục Hiragana",
    description: "Làm quen, ghi nhớ và luyện tập 46 ký tự Hiragana cơ bản.",
    color: "bg-green-100 border-green-200",
    iconColor: "text-green-600",
    badgeColor: "bg-green-500",
    quests: [
      {
        id: 'w1_1',
        title: "Hiragana: Cơ bản",
        desc: "Làm quen và ghi nhớ 46 ký tự Hiragana cơ bản.",
        type: "learn",
        icon: BookOpen,
        link: "/roadmap/n5/week1_2/learn?tab=hira&questId=w1_1",
        xp: 100
      },
      {
        id: 'w1_2',
        title: "Hiragana: Biến âm",
        desc: "Học âm đục (Dakuten) và âm bán đục của Hiragana.",
        type: "reading",
        icon: Eye,
        link: "/roadmap/n5/week1_2/learn?tab=hira&questId=w1_2",
        xp: 150
      },
      {
        id: 'w1_3',
        title: "Hiragana: Luyện tập",
        desc: "Bài tập trắc nghiệm tổng hợp về Hiragana.",
        type: "test",
        icon: PenTool,
        link: "/roadmap/n5/week1_2/practice?tab=hira&questId=w1_3",
        xp: 200
      },
      {
        id: 'w1_4',
        title: "Kiểm tra Tuần 1",
        desc: "Tổng ôn toàn bộ kiến thức Hiragana.",
        type: "test",
        icon: Trophy,
        link: "/roadmap/n5/week1_2/test?questId=w1_4",
        xp: 300
      },
    ]
  },
  {
    week: 2,
    title: "Tuần 2: Chinh phục Katakana",
    description: "Làm quen, ghi nhớ và luyện tập 46 ký tự Katakana cơ bản.",
    color: "bg-teal-100 border-teal-200",
    iconColor: "text-teal-600",
    badgeColor: "bg-teal-500",
    quests: [
      {
        id: 'w2_1',
        title: "Katakana: Cơ bản",
        desc: "Làm quen và ghi nhớ 46 ký tự Katakana cơ bản.",
        type: "learn",
        icon: BookOpen,
        link: "/roadmap/n5/week1_2/learn?tab=kata&questId=w2_1",
        xp: 100
      },
      {
        id: 'w2_2',
        title: "Katakana: Biến âm",
        desc: "Học âm đục (Dakuten) và âm bán đục của Katakana.",
        type: "reading",
        icon: Eye,
        link: "/roadmap/n5/week1_2/learn?tab=kata&questId=w2_2",
        xp: 150
      },
      {
        id: 'w2_3',
        title: "Katakana: Luyện tập",
        desc: "Bài tập trắc nghiệm tổng hợp về Katakana.",
        type: "test",
        icon: PenTool,
        link: "/roadmap/n5/week1_2/practice?tab=kata&questId=w2_3",
        xp: 200
      },
      {
        id: 'w2_4',
        title: "Kiểm tra Tuần 2",
        desc: "Tổng ôn toàn bộ kiến thức Katakana.",
        type: "test",
        icon: Trophy,
        link: "/roadmap/n5/week1_2/test?questId=w2_4",
        xp: 350
      },
    ]
  },
  {
    week: 3,
    title: "Tuần 3: Bài 1, 2 & 3 - Khởi đầu",
    description: "Học từ vựng, chữ Hán bài 1, 2, 3 và làm quen với ngữ pháp cơ bản.",
    color: "bg-blue-100 border-blue-200",
    iconColor: "text-blue-600",
    badgeColor: "bg-blue-500",
    quests: [
      {
        id: 'w3_1',
        title: "Bài 1: Từ vựng & Chữ Hán",
        desc: "Luyện đọc và làm bài tập từ vựng, Kanji Bài 1.",
        type: "flashcard",
        icon: Zap,
        link: "/roadmap/n5/w3/w3-vocab?questId=w3_1",
        xp: 150
      },
      {
        id: 'w3_2',
        title: "Bài 1: Ngữ pháp & Giao tiếp",
        desc: "Học mẫu câu cơ bản (wa, mo, no) và Roleplay.",
        type: "roleplay",
        icon: Mic,
        link: "/roadmap/n5/w3/w3-grammar?questId=w3_2",
        xp: 200
      },
      {
        id: 'w3_3',
        title: "Bài 2: Từ vựng & Chữ Hán",
        desc: "Luyện đọc và làm bài tập từ vựng đồ vật (Kore/Sore/Are).",
        type: "flashcard",
        icon: Zap,
        link: "/roadmap/n5/w3/w3-vocab-2?questId=w3_3",
        xp: 150
      },
      {
        id: 'w3_4',
        title: "Bài 2: Ngữ pháp",
        desc: "Học cách chỉ định vật và sở hữu nâng cao.",
        type: "test",
        icon: PenTool,
        link: "/roadmap/n5/w3/w3-grammar?questId=w3_4",
        xp: 200
      },
      {
        id: 'w3_5',
        title: "Bài 3: Từ vựng & Chữ Hán",
        desc: "Từ vựng địa điểm (Koko/Soko/Asoko) và vị trí.",
        type: "flashcard",
        icon: Zap,
        link: "/roadmap/n5/w3/w3-vocab-3?questId=w3_5",
        xp: 150
      },
      {
        id: 'w3_6',
        title: "Bài 3: Ngữ pháp",
        desc: "Học cách chỉ vị trí và nơi chốn.",
        type: "test",
        icon: PenTool,
        link: "/roadmap/n5/w3/w3-grammar?questId=w3_6",
        xp: 200
      },
      {
        id: 'w3_7',
        title: "Kiểm tra Tuần 3",
        desc: "Tổng ôn kiến thức Bài 1, 2 và 3.",
        type: "test",
        icon: Trophy,
        link: "/tests/n5-test?week=w3&questId=w3_7",
        xp: 400
      },
    ]
  },
  {
    week: 4,
    title: "Tuần 4: Bài 4 & 5 - Thời gian & Di chuyển",
    description: "Mở rộng vốn từ vựng về thời gian, địa điểm và hành động.",
    color: "bg-indigo-100 border-indigo-200",
    iconColor: "text-indigo-600",
    badgeColor: "bg-indigo-500",
    quests: [
      {
        id: 'w4_1',
        title: "Bài 4: Từ vựng",
        desc: "Luyện đọc và làm bài tập từ vựng Bài 4.",
        type: "flashcard",
        icon: Zap,
        link: "/roadmap/n5/w4/w4-vocab-1?questId=w4_1&lesson=lesson4",
        xp: 200
      },
      {
        id: 'w4_2',
        title: "Bài 4: Ngữ pháp",
        desc: "Ngữ pháp về thời giờ và mẫu câu cơ bản Bài 4.",
        type: "test",
        icon: BookOpen,
        link: "/roadmap/n5/w4/w4-grammar?questId=w4_2&lesson=lesson4",
        xp: 250
      },
      {
        id: 'w4_3',
        title: "Bài 5: Từ vựng",
        desc: "Luyện đọc và làm bài tập từ vựng Bài 5.",
        type: "flashcard",
        icon: Zap,
        link: "/roadmap/n5/w4/w4-vocab-2?questId=w4_3&lesson=lesson5",
        xp: 200
      },
      {
        id: 'w4_4',
        title: "Bài 5: Ngữ pháp",
        desc: "Học về di chuyển và phương tiện Bài 5.",
        type: "test",
        icon: BookOpen,
        link: "/roadmap/n5/w4/w4-grammar?questId=w4_4&lesson=lesson5",
        xp: 250
      },
      {
        id: 'w4_5',
        title: "Kiểm tra Tuần 4",
        desc: "Đánh giá kiến thức Bài 4 và Bài 5.",
        type: "test",
        icon: Trophy,
        link: "/tests/n5-test?week=w4&questId=w4_test",
        xp: 400
      },
    ]
  },
  {
    week: 5,
    title: "Tuần 5: Bài 6 & 7 - Ăn uống & Quà tặng",
    description: "Thực hành giao tiếp về đời thường và quà cáp.",
    color: "bg-orange-100 border-orange-200",
    iconColor: "text-orange-600",
    badgeColor: "bg-orange-500",
    quests: [
      {
        id: 'w5_1',
        title: "Bài 6: Từ vựng",
        desc: "Từ vựng về ăn uống và hành động đời thường.",
        type: "flashcard",
        icon: Zap,
        link: "/roadmap/n5/w5/w5-vocab?questId=w5_1&lesson=lesson6",
        xp: 200
      },
      {
        id: 'w5_2',
        title: "Bài 6: Ngữ pháp",
        desc: "Mẫu câu rủ rê và thực hiện hành động Bài 6.",
        type: "test",
        icon: BookOpen,
        link: "/roadmap/n5/w5/w5-grammar?questId=w5_2&lesson=lesson6",
        xp: 250
      },
      {
        id: 'w5_3',
        title: "Bài 7: Từ vựng",
        desc: "Từ vựng về công cụ, tặng quà Bài 7.",
        type: "flashcard",
        icon: Zap,
        link: "/roadmap/n5/w5/w5-vocab?questId=w5_3&lesson=lesson7",
        xp: 200
      },
      {
        id: 'w5_4',
        title: "Bài 7: Ngữ pháp",
        desc: "Luyện tập cấu trúc cho nhận và công cụ Bài 7.",
        type: "test",
        icon: BookOpen,
        link: "/roadmap/n5/w5/w5-grammar?questId=w5_4&lesson=lesson7",
        xp: 250
      },
      {
        id: 'w5_5',
        title: "Kiểm tra Tuần 5",
        desc: "Đánh giá kiến thức Bài 6 và Bài 7.",
        type: "test",
        icon: Trophy,
        link: "/tests/n5-test?week=w5&questId=w5_test",
        xp: 400
      },
    ]
  },
  {
    week: 6,
    title: "Tuần 6: Bài 8 & 9 - Tính chất & Sở thích",
    description: "Sử dụng tính từ và diễn đạt sở thích cá nhân.",
    color: "bg-red-100 border-red-200",
    iconColor: "text-red-600",
    badgeColor: "bg-red-500",
    quests: [
      {
        id: 'w6_1',
        title: "Bài 8: Từ vựng",
        desc: "Tính từ đuôi i và đuôi na cơ bản.",
        type: "flashcard",
        icon: Zap,
        link: "/roadmap/n5/w6/w6-vocab?questId=w6_1&lesson=lesson8",
        xp: 200
      },
      {
        id: 'w6_2',
        title: "Bài 8: Ngữ pháp",
        desc: "Cách sử dụng tính từ miêu tả sự vật.",
        type: "test",
        icon: BookOpen,
        link: "/roadmap/n5/w6/w6-grammar?questId=w6_2&lesson=lesson8",
        xp: 250
      },
      {
        id: 'w6_3',
        title: "Bài 9: Từ vựng",
        desc: "Từ vựng về sở thích và năng lực.",
        type: "flashcard",
        icon: Zap,
        link: "/roadmap/n5/w6/w6-vocab?questId=w6_3&lesson=lesson9",
        xp: 200
      },
      {
        id: 'w6_4',
        title: "Bài 9: Ngữ pháp",
        desc: "Diễn đạt sở thích, năng lực và lý do.",
        type: "test",
        icon: BookOpen,
        link: "/roadmap/n5/w6/w6-grammar?questId=w6_4&lesson=lesson9",
        xp: 250
      },
      {
        id: 'w6_5',
        title: "Kiểm tra Tuần 6",
        desc: "Đánh giá kiến thức Bài 8 và Bài 9.",
        type: "test",
        icon: Trophy,
        link: "/tests/n5-test?week=w6&questId=w6_test",
        xp: 400
      },
    ]
  },
  {
    week: 7,
    title: "Tuần 7: Bài 10 & 11 - Sự tồn tại & Số lượng",
    description: "Diễn tả vị trí đồ vật và cách sử dụng lượng từ.",
    color: "bg-purple-100 border-purple-200",
    iconColor: "text-purple-600",
    badgeColor: "bg-purple-500",
    quests: [
      {
        id: 'w7_1',
        title: "Bài 10: Từ vựng",
        desc: "Từ vựng về đồ vật và vị trí Bài 10.",
        type: "flashcard",
        icon: Zap,
        link: "/roadmap/n5/w7/w7-vocab?questId=w7_1&lesson=lesson10",
        xp: 200
      },
      {
        id: 'w7_2',
        title: "Bài 10: Ngữ pháp",
        desc: "Cấu trúc tồn tại Arimasu/Irimasu Bài 10.",
        type: "test",
        icon: BookOpen,
        link: "/roadmap/n5/w7/w7-grammar?questId=w7_2&lesson=lesson10",
        xp: 250
      },
      {
        id: 'w7_3',
        title: "Bài 11: Từ vựng",
        desc: "Lượng từ và cách đếm cơ bản Bài 11.",
        type: "flashcard",
        icon: Zap,
        link: "/roadmap/n5/w7/w7-vocab?questId=w7_3&lesson=lesson11",
        xp: 200
      },
      {
        id: 'w7_4',
        title: "Bài 11: Ngữ pháp",
        desc: "Cách sử dụng lượng từ trong câu Bài 11.",
        type: "test",
        icon: BookOpen,
        link: "/roadmap/n5/w7/w7-grammar?questId=w7_4&lesson=lesson11",
        xp: 250
      },
      {
        id: 'w7_5',
        title: "Kiểm tra Tuần 7",
        desc: "Đánh giá kiến thức Bài 10 và Bài 11.",
        type: "test",
        icon: Trophy,
        link: "/tests/n5-test?week=w7&questId=w7_test",
        xp: 400
      },
    ]
  },
  {
    week: 8,
    title: "Tuần 8: Bài 12 & 13 - So sánh & Mong muốn",
    description: "Học cách so sánh và diễn đạt nguyện vọng cá nhân.",
    color: "bg-amber-100 border-amber-200",
    iconColor: "text-amber-600",
    badgeColor: "bg-amber-500",
    quests: [
      {
        id: 'w8_1',
        title: "Bài 12: Từ vựng",
        desc: "Từ vựng về lễ hội và so sánh Bài 12.",
        type: "flashcard",
        icon: Zap,
        link: "/roadmap/n5/w8/w8-vocab?questId=w8_1&lesson=lesson12",
        xp: 200
      },
      {
        id: 'w8_2',
        title: "Bài 12: Ngữ pháp",
        desc: "Cấu trúc so sánh hơn, nhất Bài 12.",
        type: "test",
        icon: BookOpen,
        link: "/roadmap/n5/w8/w8-grammar?questId=w8_2&lesson=lesson12",
        xp: 250
      },
      {
        id: 'w8_3',
        title: "Bài 13: Từ vựng",
        desc: "Từ vựng về nhu cầu và mong muốn Bài 13.",
        type: "flashcard",
        icon: Zap,
        link: "/roadmap/n5/w8/w8-vocab?questId=w8_3&lesson=lesson13",
        xp: 200
      },
      {
        id: 'w8_4',
        title: "Bài 13: Ngữ pháp",
        desc: "Cách diễn đạt mong muốn hoshii/tai Bài 13.",
        type: "test",
        icon: BookOpen,
        link: "/roadmap/n5/w8/w8-grammar?questId=w8_4&lesson=lesson13",
        xp: 250
      },
      {
        id: 'w8_5',
        title: "Kiểm tra Tuần 8",
        desc: "Đánh giá kiến thức Bài 12 và Bài 13.",
        type: "test",
        icon: Trophy,
        link: "/tests/n5-test?week=w8&questId=w8_test",
        xp: 400
      },
    ]
  },
  {
    week: 9,
    title: "Tuần 9: Bài 14 & 15 - Thể Te & Đang hành động",
    description: "Chinh phục thể Te và diễn đạt hành động đang diễn ra.",
    color: "bg-emerald-100 border-emerald-200",
    iconColor: "text-emerald-600",
    badgeColor: "bg-emerald-500",
    quests: [
      {
        id: 'w9_1',
        title: "Bài 14: Từ vựng",
        desc: "Động từ nhóm 1, 2, 3 và thể Te.",
        type: "flashcard",
        icon: Zap,
        link: "/roadmap/n5/w9/w9-vocab?questId=w9_1&lesson=lesson14",
        xp: 200
      },
      {
        id: 'w9_2',
        title: "Bài 14: Ngữ pháp",
        desc: "Cách chia thể Te và mẫu câu yêu cầu.",
        type: "test",
        icon: BookOpen,
        link: "/roadmap/n5/w9/w9-grammar?questId=w9_2&lesson=lesson14",
        xp: 250
      },
      {
        id: 'w9_3',
        title: "Bài 15: Từ vựng",
        desc: "Từ vựng về nghề nghiệp và trạng thái.",
        type: "flashcard",
        icon: Zap,
        link: "/roadmap/n5/w9/w9-vocab?questId=w9_3&lesson=lesson15",
        xp: 200
      },
      {
        id: 'w9_4',
        title: "Bài 15: Ngữ pháp",
        desc: "Mẫu câu cho phép, cấm đoán Te-moii/wa-ikemasen.",
        type: "test",
        icon: BookOpen,
        link: "/roadmap/n5/w9/w9-grammar?questId=w9_4&lesson=lesson15",
        xp: 250
      },
      {
        id: 'w9_5',
        title: "Kiểm tra Tuần 9",
        desc: "Đánh giá kiến thức Bài 14 và Bài 15.",
        type: "test",
        icon: Trophy,
        link: "/tests/n5-test?week=w9&questId=w9_test",
        xp: 400
      },
    ]
  },
  {
    week: 10,
    title: "Tuần 10: Bài 16 & 17 - Kết nối & Thể Nai",
    description: "Kết nối các câu văn và học về thể phủ định Nai.",
    color: "bg-cyan-100 border-cyan-200",
    iconColor: "text-cyan-600",
    badgeColor: "bg-cyan-500",
    quests: [
      {
        id: 'w10_1',
        title: "Bài 16: Từ vựng",
        desc: "Từ vựng về sinh hoạt và hoạt động kết nối.",
        type: "flashcard",
        icon: Zap,
        link: "/roadmap/n5/w10/w10-vocab?questId=w10_1&lesson=lesson16",
        xp: 200
      },
      {
        id: 'w10_2',
        title: "Bài 16: Ngữ pháp",
        desc: "Cách kết nối động từ, tính từ Bài 16.",
        type: "test",
        icon: BookOpen,
        link: "/roadmap/n5/w10/w10-grammar?questId=w10_2&lesson=lesson16",
        xp: 250
      },
      {
        id: 'w10_3',
        title: "Bài 17: Từ vựng",
        desc: "Từ vựng về cơ thể và sức khỏe Bài 17.",
        type: "flashcard",
        icon: Zap,
        link: "/roadmap/n5/w10/w10-vocab?questId=w10_3&lesson=lesson17",
        xp: 200
      },
      {
        id: 'w10_4',
        title: "Bài 17: Ngữ pháp",
        desc: "Thể Nai và mẫu câu khuyên nhủ, bắt buộc.",
        type: "test",
        icon: BookOpen,
        link: "/roadmap/n5/w10/w10-grammar?questId=w10_4&lesson=lesson17",
        xp: 250
      },
      {
        id: 'w10_5',
        title: "Kiểm tra Tuần 10",
        desc: "Đánh giá kiến thức Bài 16 và Bài 17.",
        type: "test",
        icon: Trophy,
        link: "/tests/n5-test?week=w10&questId=w10_test",
        xp: 400
      },
    ]
  },
  {
    week: 11,
    title: "Tuần 11: Bài 18 & 19 - Khả năng & Kinh nghiệm",
    description: "Diễn tả khả năng và kể về những kinh nghiệm đã có.",
    color: "bg-rose-100 border-rose-200",
    iconColor: "text-rose-600",
    badgeColor: "bg-rose-500",
    quests: [
      {
        id: 'w11_1',
        title: "Bài 18: Từ vựng",
        desc: "Từ vựng về khả năng và sở thích Bài 18.",
        type: "flashcard",
        icon: Zap,
        link: "/roadmap/n5/w11/w11-vocab?questId=w11_1&lesson=lesson18",
        xp: 200
      },
      {
        id: 'w11_2',
        title: "Bài 18: Ngữ pháp",
        desc: "Cấu trúc có thể làm gì và sở thích Bài 18.",
        type: "test",
        icon: BookOpen,
        link: "/roadmap/n5/w11/w11-grammar?questId=w11_2&lesson=lesson18",
        xp: 250
      },
      {
        id: 'w11_3',
        title: "Bài 19: Từ vựng",
        desc: "Từ vựng về kinh nghiệm và dọn dẹp Bài 19.",
        type: "flashcard",
        icon: Zap,
        link: "/roadmap/n5/w11/w11-vocab?questId=w11_3&lesson=lesson19",
        xp: 200
      },
      {
        id: 'w11_4',
        title: "Bài 19: Ngữ pháp",
        desc: "Thể Ta và mẫu câu kinh nghiệm V-ta koto ga arimasu.",
        type: "test",
        icon: BookOpen,
        link: "/roadmap/n5/w11/w11-grammar?questId=w11_4&lesson=lesson19",
        xp: 250
      },
      {
        id: 'w11_5',
        title: "Kiểm tra Tuần 11",
        desc: "Đánh giá kiến thức Bài 18 và Bài 19.",
        type: "test",
        icon: Trophy,
        link: "/tests/n5-test?week=w11&questId=w11_test",
        xp: 450
      },
    ]
  },
];
