//lib/data.ts
import { BookOpen, Mic, Zap, CheckCircle2, Users, Eye, FileText, Trophy, PenTool, Shield, Sword, Crown, Star, CalendarDays, ChevronRight, Circle, Loader2, X } from 'lucide-react';





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

export const N4_WEEKS = [
  {
    week: 1,
    title: "Tuần 1: Bài 26 & 27 - Giải thích & Khả năng",
    description: "Nhấn mạnh lý do với '~ndesu' và diễn đạt khả năng làm việc gì đó.",
    color: "bg-emerald-100 border-emerald-200",
    iconColor: "text-emerald-600",
    badgeColor: "bg-emerald-500",
    quests: [
      {
        id: 'n4_w1_1', title: "Từ vựng Bài 26 & 27", desc: "Học từ vựng về rác, dọn dẹp và các động từ khả năng.", type: "flashcard", icon: Zap, link: "/roadmap/n4/w1/vocab", xp: 150
      },
      {
        id: 'n4_w1_2', title: "Ngữ pháp: ~ndesu", desc: "Cách dùng ~ndesu để giải thích lý do, hoàn cảnh tự nhiên.", type: "learn", icon: BookOpen, link: "/roadmap/n4/w1/grammar-1", xp: 200
      },
      {
        id: 'n4_w1_3', title: "Ngữ pháp: Thể Khả năng", desc: "Cách chia động từ sang thể Khả năng (Kanoukei).", type: "test", icon: PenTool, link: "/roadmap/n4/w1/grammar-2", xp: 200
      },
      {
        id: 'n4_w1_4', title: "Kanji N4: Tuần 1", desc: "Học 20 chữ Kanji đầu tiên của N4.", type: "flashcard", icon: Zap, link: "/roadmap/n4/w1/kanji", xp: 150
      }
    ]
  },
  {
    week: 2,
    title: "Tuần 2: Bài 28 & 29 - Vừa làm... Vừa làm & Trạng thái",
    description: "Mô tả thói quen, hai hành động song song và trạng thái của sự vật.",
    color: "bg-teal-100 border-teal-200",
    iconColor: "text-teal-600",
    badgeColor: "bg-teal-500",
    quests: [
      {
        id: 'n4_w2_1', title: "Từ vựng Bài 28 & 29", desc: "Từ vựng về tự nhiên, cửa hàng và sự cố hỏng hóc.", type: "flashcard", icon: Zap, link: "/roadmap/n4/w2/vocab", xp: 150
      },
      {
        id: 'n4_w2_2', title: "Ngữ pháp: ~nagara", desc: "Cấu trúc V-masu + nagara (Vừa làm A vừa làm B).", type: "learn", icon: BookOpen, link: "/roadmap/n4/w2/grammar-1", xp: 200
      },
      {
        id: 'n4_w2_3', title: "Ngữ pháp: ~te imasu", desc: "Diễn tả trạng thái kết quả của hành động (Cửa đang mở).", type: "test", icon: PenTool, link: "/roadmap/n4/w2/grammar-2", xp: 250
      },
      {
        id: 'n4_w2_4', title: "Kiểm tra Tuần 1-2", desc: "Ôn tập kiến thức từ bài 26 đến 29.", type: "test", icon: Trophy, link: "/tests/n4-w2", xp: 300
      }
    ]
  },
  {
    week: 3,
    title: "Tuần 3: Bài 30 & 31 - Chuẩn bị trước & Dự định",
    description: "Trạng thái có chủ đích và cách nói lên quyết tâm, dự định.",
    color: "bg-blue-100 border-blue-200",
    iconColor: "text-blue-600",
    badgeColor: "bg-blue-500",
    quests: [
      {
        id: 'n4_w3_1', title: "Từ vựng Bài 30 & 31", desc: "Từ vựng về du lịch, kế hoạch và cuộc sống hàng ngày.", type: "flashcard", icon: Zap, link: "/roadmap/n4/w3/vocab", xp: 150
      },
      {
        id: 'n4_w3_2', title: "Ngữ pháp: ~te arimasu", desc: "Phân biệt ~te imasu và ~te arimasu.", type: "test", icon: Shield, link: "/roadmap/n4/w3/grammar-1", xp: 250
      },
      {
        id: 'n4_w3_3', title: "Ngữ pháp: Thể Ý chí", desc: "Cách chia thể Ý chí và cấu trúc ~tsumori, ~yotei.", type: "learn", icon: BookOpen, link: "/roadmap/n4/w3/grammar-2", xp: 200
      },
      {
        id: 'n4_w3_4', title: "Viết Nhật ký", desc: "Viết một đoạn ngắn kể về dự định cuối tuần.", type: "community", icon: Users, link: "/community/n4-journal", xp: 200
      }
    ]
  },
  {
    week: 4,
    title: "Tuần 4: Bài 32 & 33 - Khuyên nhủ & Mệnh lệnh",
    description: "Đưa ra lời khuyên, phỏng đoán và thể mệnh lệnh/cấm chỉ.",
    color: "bg-indigo-100 border-indigo-200",
    iconColor: "text-indigo-600",
    badgeColor: "bg-indigo-500",
    quests: [
      {
        id: 'n4_w4_1', title: "Từ vựng Bài 32 & 33", desc: "Từ vựng về thời tiết, thể thao và biển báo.", type: "flashcard", icon: Zap, link: "/roadmap/n4/w4/vocab", xp: 150
      },
      {
        id: 'n4_w4_2', title: "Ngữ pháp: ~hou ga ii", desc: "Đưa ra lời khuyên 'Nên/Không nên làm gì'.", type: "learn", icon: BookOpen, link: "/roadmap/n4/w4/grammar-1", xp: 200
      },
      {
        id: 'n4_w4_3', title: "Thể Mệnh lệnh & Cấm chỉ", desc: "Học cách ra lệnh và cấm đoán trong tình huống khẩn cấp.", type: "test", icon: PenTool, link: "/roadmap/n4/w4/grammar-2", xp: 250
      },
      {
        id: 'n4_w4_4', title: "Đọc hiểu Biển báo", desc: "Dịch các biển báo giao thông và chú ý tại Nhật.", type: "reading", icon: Eye, link: "/reading/n4-signs", xp: 200
      }
    ]
  },
  {
    week: 5,
    title: "Tuần 5: Bài 34 & 35 - Làm theo & Điều kiện",
    description: "Hành động theo hướng dẫn và câu điều kiện ~Ba.",
    color: "bg-violet-100 border-violet-200",
    iconColor: "text-violet-600",
    badgeColor: "bg-violet-500",
    quests: [
      {
        id: 'n4_w5_1', title: "Từ vựng Bài 34 & 35", desc: "Từ vựng về lắp ráp, nấu ăn và giao tiếp.", type: "flashcard", icon: Zap, link: "/roadmap/n4/w5/vocab", xp: 150
      },
      {
        id: 'n4_w5_2', title: "Ngữ pháp: ~toori ni", desc: "Làm gì đó 'theo như' lời nói hoặc sách hướng dẫn.", type: "learn", icon: BookOpen, link: "/roadmap/n4/w5/grammar-1", xp: 200
      },
      {
        id: 'n4_w5_3', title: "Câu điều kiện ~Ba", desc: "Cách chia thể Điều kiện và ứng dụng khuyên nhủ.", type: "test", icon: PenTool, link: "/roadmap/n4/w5/grammar-2", xp: 250
      },
      {
        id: 'n4_w5_4', title: "Kiểm tra Tuần 3-5", desc: "Mock test mini kiểm tra các ngữ pháp quan trọng.", type: "test", icon: Trophy, link: "/tests/n4-w5", xp: 350
      }
    ]
  },
  {
    week: 6,
    title: "Tuần 6: Bài 36 & 37 - Mục tiêu & Thể Bị Động",
    description: "Cố gắng đạt mục tiêu và làm quen với Thể Bị Động (Ukemi).",
    color: "bg-fuchsia-100 border-fuchsia-200",
    iconColor: "text-fuchsia-600",
    badgeColor: "bg-fuchsia-500",
    quests: [
      {
        id: 'n4_w6_1', title: "Từ vựng Bài 36 & 37", desc: "Từ vựng về sức khỏe, giáo dục và công trình.", type: "flashcard", icon: Zap, link: "/roadmap/n4/w6/vocab", xp: 150
      },
      {
        id: 'n4_w6_2', title: "Ngữ pháp: ~you ni", desc: "Cấu trúc chỉ mục tiêu và thói quen thay đổi.", type: "learn", icon: BookOpen, link: "/roadmap/n4/w6/grammar-1", xp: 200
      },
      {
        id: 'n4_w6_3', title: "Chiến thần Bị Động", desc: "Cách chia thể Bị động và mẫu câu bị mắng, được khen.", type: "test", icon: Sword, link: "/roadmap/n4/w6/grammar-2", xp: 300
      },
      {
        id: 'n4_w6_4', title: "Kanji N4: Tuần 6", desc: "Kiểm tra tiến độ 150 chữ Kanji N4 đầu tiên.", type: "test", icon: CheckCircle2, link: "/roadmap/n4/w6/kanji", xp: 200
      }
    ]
  },
  {
    week: 7,
    title: "Tuần 7: Bài 38 & 39 - Danh từ hóa & Lý do",
    description: "Biến động từ thành danh từ và dùng Thể Te để chỉ nguyên nhân.",
    color: "bg-rose-100 border-rose-200",
    iconColor: "text-rose-600",
    badgeColor: "bg-rose-500",
    quests: [
      {
        id: 'n4_w7_1', title: "Từ vựng Bài 38 & 39", desc: "Từ vựng về cảm xúc, thiên tai và rắc rối.", type: "flashcard", icon: Zap, link: "/roadmap/n4/w7/vocab", xp: 150
      },
      {
        id: 'n4_w7_2', title: "Ngữ pháp: ~no wa", desc: "Cách dùng 'no' để biến mệnh đề thành cụm danh từ.", type: "learn", icon: BookOpen, link: "/roadmap/n4/w7/grammar-1", xp: 200
      },
      {
        id: 'n4_w7_3', title: "Lý do với Thể Te", desc: "Dùng thể Te chỉ lý do cho cảm xúc hoặc hoàn cảnh.", type: "test", icon: PenTool, link: "/roadmap/n4/w7/grammar-2", xp: 250
      },
      {
        id: 'n4_w7_4', title: "Roleplay: Đi muộn", desc: "Đóng vai gọi điện xin lỗi sếp vì tàu đến trễ.", type: "roleplay", icon: Mic, link: "/roleplay/n4-late", xp: 250
      }
    ]
  },
  {
    week: 8,
    title: "Tuần 8: Bài 40 & 41 - Nghi vấn & Kính ngữ Cho Nhận",
    description: "Lồng ghép câu hỏi vào câu và nâng cấp cấu trúc Cho/Nhận.",
    color: "bg-orange-100 border-orange-200",
    iconColor: "text-orange-600",
    badgeColor: "bg-orange-500",
    quests: [
      {
        id: 'n4_w8_1', title: "Từ vựng Bài 40 & 41", desc: "Từ vựng về đo lường, quà cáp và quan hệ trên dưới.", type: "flashcard", icon: Zap, link: "/roadmap/n4/w8/vocab", xp: 150
      },
      {
        id: 'n4_w8_2', title: "Ngữ pháp: ~ka dou ka", desc: "Cách nói 'Có hay không' trong câu trần thuật.", type: "learn", icon: BookOpen, link: "/roadmap/n4/w8/grammar-1", xp: 200
      },
      {
        id: 'n4_w8_3', title: "Cho/Nhận Nâng cao", desc: "Sử dụng Yaru, Itadaku, Kudasaru đúng ngữ cảnh.", type: "test", icon: Shield, link: "/roadmap/n4/w8/grammar-2", xp: 300
      },
      {
        id: 'n4_w8_4', title: "Đọc hiểu: Tặng quà", desc: "Văn hóa tặng quà (Ochugen, Oseibo) của người Nhật.", type: "reading", icon: Eye, link: "/reading/n4-culture", xp: 200
      }
    ]
  },
  {
    week: 9,
    title: "Tuần 9: Bài 42 & 43 - Mục đích & Trông có vẻ",
    description: "Chỉ mục đích với ~Tame ni và đưa ra nhận xét bề ngoài với ~Sou desu.",
    color: "bg-amber-100 border-amber-200",
    iconColor: "text-amber-600",
    badgeColor: "bg-amber-500",
    quests: [
      {
        id: 'n4_w9_1', title: "Từ vựng Bài 42 & 43", desc: "Từ vựng về tài chính, kinh tế và trang phục.", type: "flashcard", icon: Zap, link: "/roadmap/n4/w9/vocab", xp: 150
      },
      {
        id: 'n4_w9_2', title: "Ngữ pháp: ~tame ni", desc: "So sánh ~tame ni (mục đích) và ~you ni.", type: "test", icon: PenTool, link: "/roadmap/n4/w9/grammar-1", xp: 250
      },
      {
        id: 'n4_w9_3', title: "Ngữ pháp: ~sou desu", desc: "Đánh giá trạng thái 'trông có vẻ' (sắp mưa, ngon).", type: "learn", icon: BookOpen, link: "/roadmap/n4/w9/grammar-2", xp: 200
      },
      {
        id: 'n4_w9_4', title: "Kiểm tra Tuần 6-9", desc: "Bài test định kỳ các điểm ngữ pháp khó của N4.", type: "test", icon: Trophy, link: "/tests/n4-w9", xp: 400
      }
    ]
  },
  {
    week: 10,
    title: "Tuần 10: Bài 44 & 45 - Quá mức & Trường hợp",
    description: "Diễn đạt sự quá mức (~sugimasu) và cách xử lý trong các trường hợp.",
    color: "bg-lime-100 border-lime-200",
    iconColor: "text-lime-600",
    badgeColor: "bg-lime-500",
    quests: [
      {
        id: 'n4_w10_1', title: "Từ vựng Bài 44 & 45", desc: "Từ vựng về cơ thể, bệnh tật và xử lý tình huống.", type: "flashcard", icon: Zap, link: "/roadmap/n4/w10/vocab", xp: 150
      },
      {
        id: 'n4_w10_2', title: "Ngữ pháp: ~sugimasu", desc: "Làm gì đó quá nhiều (uống quá chén, ăn quá no).", type: "learn", icon: BookOpen, link: "/roadmap/n4/w10/grammar-1", xp: 200
      },
      {
        id: 'n4_w10_3', title: "Ngữ pháp: ~yasui/nikui", desc: "Cách nói 'dễ làm' hoặc 'khó làm' việc gì đó.", type: "test", icon: PenTool, link: "/roadmap/n4/w10/grammar-2", xp: 200
      },
      {
        id: 'n4_w10_4', title: "Ngữ pháp: ~baai wa", desc: "Giải quyết sự cố với cấu trúc 'Trong trường hợp...'.", type: "learn", icon: BookOpen, link: "/roadmap/n4/w10/grammar-3", xp: 200
      }
    ]
  },
  {
    week: 11,
    title: "Tuần 11: Bài 46 - 48 - Vừa mới & Thể Sai Khiến",
    description: "Diễn đạt hành động vừa xảy ra và cách dùng Thể Sai Khiến (Shieki).",
    color: "bg-emerald-100 border-emerald-300",
    iconColor: "text-emerald-700",
    badgeColor: "bg-emerald-600",
    quests: [
      {
        id: 'n4_w11_1', title: "Ngữ pháp: ~tokoro desu", desc: "Sắp làm, đang làm và vừa mới làm xong.", type: "learn", icon: BookOpen, link: "/roadmap/n4/w11/grammar-1", xp: 200
      },
      {
        id: 'n4_w11_2', title: "Chiến thần Sai Khiến", desc: "Bắt ai đó làm gì hoặc Cho phép ai đó làm gì.", type: "test", icon: Sword, link: "/roadmap/n4/w11/grammar-2", xp: 300
      },
      {
        id: 'n4_w11_3', title: "Đọc hiểu: Trò chơi tuổi thơ", desc: "Đọc đoạn văn kể lại kỷ niệm chơi rút đũa, xé thăm trúng quà ngày bé bằng ngữ pháp N4.", type: "reading", icon: Eye, link: "/reading/n4-nostalgia", xp: 250
      },
      {
        id: 'n4_w11_4', title: "Kanji N4: Tổng kết", desc: "Ôn tập lại toàn bộ 300 Kanji N4.", type: "flashcard", icon: Zap, link: "/roadmap/n4/w11/kanji", xp: 300
      }
    ]
  },
  {
    week: 12,
    title: "Tuần 12: Bài 49 & 50 - Kính Ngữ & Về Đích",
    description: "Nhập môn Tôn kính ngữ, Khiêm nhường ngữ và thi thử JLPT N4.",
    color: "bg-slate-800 text-slate-100 border-slate-600",
    iconColor: "text-yellow-400",
    badgeColor: "bg-yellow-500",
    quests: [
      {
        id: 'n4_w12_1', title: "Tôn kính ngữ (Sonkeigo)", desc: "Dùng để nâng cao vị thế của người nghe/đối tác.", type: "learn", icon: Shield, link: "/roadmap/n4/w12/grammar-1", xp: 250
      },
      {
        id: 'n4_w12_2', title: "Khiêm nhường ngữ (Kenjougo)", desc: "Hạ thấp bản thân để tôn trọng đối phương.", type: "test", icon: PenTool, link: "/roadmap/n4/w12/grammar-2", xp: 250
      },
      {
        id: 'n4_w12_3', title: "JLPT N4: Chống liệt Nghe", desc: "Mẹo làm bài Choukai N4 không bị sập hầm.", type: "learn", icon: Mic, link: "/roadmap/n4/w12/listening", xp: 200
      },
      {
        id: 'n4_w12_4', title: "Mock Test N4 Thần Thánh", desc: "Làm đề thi thử N4 Full (115 phút) tính giờ thực tế.", type: "test", icon: Crown, link: "/tests/n4-final", xp: 1500
      }
    ]
  }
];

export const N3_WEEKS = [
  {
    week: 1,
    title: "Tuần 1: Nỗi ám ảnh Sai khiến - Bị động",
    description: "Ôn tập lại thể phức tạp nhất của sơ cấp và học cách phàn nàn 'Bị bắt phải làm gì'.",
    color: "bg-cyan-100 border-cyan-200",
    iconColor: "text-cyan-600",
    badgeColor: "bg-cyan-500",
    quests: [
      {
        id: 'n3_w1_1', title: "Từ vựng: Đời sống & Rắc rối", desc: "Học 30 từ vựng N3 về các tình huống rắc rối hàng ngày.", type: "flashcard", icon: Zap, link: "/roadmap/n3/w1/vocab", xp: 150
      },
      {
        id: 'n3_w1_2', title: "Ngữ pháp: ~saserareru", desc: "Thể Sai khiến - Bị động (Bị ép uống rượu, bị bắt làm thêm).", type: "learn", icon: BookOpen, link: "/roadmap/n3/w1/grammar-1", xp: 200
      },
      {
        id: 'n3_w1_3', title: "Ngữ pháp: ~te kureru/morau", desc: "Ôn tập sắc thái cảm tạ khi ai đó làm gì cho mình.", type: "test", icon: PenTool, link: "/roadmap/n3/w1/grammar-2", xp: 200
      },
      {
        id: 'n3_w1_4', title: "Kanji N3: Khởi động", desc: "Nạp 25 chữ Kanji N3 đầu tiên (Tập trung Onyomi).", type: "flashcard", icon: Zap, link: "/roadmap/n3/w1/kanji", xp: 150
      }
    ]
  },
  {
    week: 2,
    title: "Tuần 2: Thế giới của Koto và Mono",
    description: "Phân biệt và làm chủ các cấu trúc liên quan đến Danh từ hóa Koto / Mono.",
    color: "bg-sky-100 border-sky-200",
    iconColor: "text-sky-600",
    badgeColor: "bg-sky-500",
    quests: [
      {
        id: 'n3_w2_1', title: "Từ vựng: Công việc & Học tập", desc: "Từ vựng về thi cử, hồ sơ và nơi làm việc.", type: "flashcard", icon: Zap, link: "/roadmap/n3/w2/vocab", xp: 150
      },
      {
        id: 'n3_w2_2', title: "Ngữ pháp: Koto", desc: "~koto ni naru (Được quyết định), ~koto ni suru (Tự quyết định).", type: "learn", icon: BookOpen, link: "/roadmap/n3/w2/grammar-1", xp: 200
      },
      {
        id: 'n3_w2_3', title: "Ngữ pháp: Mono", desc: "Cảm thán với ~mono da và bao biện với ~mono / mon.", type: "test", icon: PenTool, link: "/roadmap/n3/w2/grammar-2", xp: 250
      },
      {
        id: 'n3_w2_4', title: "Nghe hiểu N3: Bắt Key", desc: "Luyện nghe bắt từ khóa trong hội thoại tốc độ tự nhiên.", type: "learn", icon: Mic, link: "/roadmap/n3/w2/listening", xp: 200
      }
    ]
  },
  {
    week: 3,
    title: "Tuần 3: Phán đoán và Lập luận",
    description: "Cách nói 'Chắc chắn là', 'Không đời nào', 'Thảo nào'.",
    color: "bg-blue-100 border-blue-200",
    iconColor: "text-blue-600",
    badgeColor: "bg-blue-500",
    quests: [
      {
        id: 'n3_w3_1', title: "Từ vựng: Truyền thông", desc: "Từ vựng về tin tức, báo chí và mạng xã hội.", type: "flashcard", icon: Zap, link: "/roadmap/n3/w3/vocab", xp: 150
      },
      {
        id: 'n3_w3_2', title: "Ngữ pháp: Wake", desc: "~wake ga nai (Không đời nào), ~wake da (Thảo nào).", type: "learn", icon: BookOpen, link: "/roadmap/n3/w3/grammar-1", xp: 250
      },
      {
        id: 'n3_w3_3', title: "Ngữ pháp: Hazu & Bekida", desc: "Phán đoán chắc chắn (Hazu) và Khuyên nhủ mạnh (Beki).", type: "test", icon: PenTool, link: "/roadmap/n3/w3/grammar-2", xp: 200
      },
      {
        id: 'n3_w3_4', title: "Kanji N3: Tuần 3", desc: "Học tiếp 30 Kanji về các bộ thủ liên quan đến ngôn từ.", type: "flashcard", icon: Zap, link: "/roadmap/n3/w3/kanji", xp: 200
      }
    ]
  },
  {
    week: 4,
    title: "Tuần 4: Truyền đạt thông tin",
    description: "Sử dụng 'Nghe nói', 'Hình như' để trích dẫn lại câu chuyện của người khác.",
    color: "bg-indigo-100 border-indigo-200",
    iconColor: "text-indigo-600",
    badgeColor: "bg-indigo-500",
    quests: [
      {
        id: 'n3_w4_1', title: "Từ vựng: Cảm xúc & Tính cách", desc: "Từ vựng miêu tả tâm lý và tính cách con người.", type: "flashcard", icon: Zap, link: "/roadmap/n3/w4/vocab", xp: 150
      },
      {
        id: 'n3_w4_2', title: "Ngữ pháp: Mitai & Rashii", desc: "So sánh các cách nói 'Có vẻ như', 'Giống như'.", type: "learn", icon: BookOpen, link: "/roadmap/n3/w4/grammar-1", xp: 200
      },
      {
        id: 'n3_w4_3', title: "Ngữ pháp: ~tte / Nante", desc: "Trích dẫn trong văn nói suồng sã và thể hiện sự ngạc nhiên.", type: "test", icon: PenTool, link: "/roadmap/n3/w4/grammar-2", xp: 250
      },
      {
        id: 'n3_w4_4', title: "Kiểm tra Tuần 1-4", desc: "Đánh giá định kỳ ngữ pháp N3 chặng đầu tiên.", type: "test", icon: Trophy, link: "/tests/n3-w4", xp: 400
      }
    ]
  },
  {
    week: 5,
    title: "Tuần 5: Dòng chảy thời gian",
    description: "Diễn tả hành động 'Trong khi', 'Ngay sau khi', 'Trước khi'.",
    color: "bg-violet-100 border-violet-200",
    iconColor: "text-violet-600",
    badgeColor: "bg-violet-500",
    quests: [
      {
        id: 'n3_w5_1', title: "Từ vựng: Giao thông & Du lịch", desc: "Mở rộng vốn từ về nhà ga, sân bay và lịch trình.", type: "flashcard", icon: Zap, link: "/roadmap/n3/w5/vocab", xp: 150
      },
      {
        id: 'n3_w5_2', title: "Ngữ pháp: Uchi ni & Aida", desc: "Làm gì đó 'Tranh thủ lúc' và 'Trong suốt khoảng'.", type: "learn", icon: BookOpen, link: "/roadmap/n3/w5/grammar-1", xp: 250
      },
      {
        id: 'n3_w5_3', title: "Ngữ pháp: Saichuu & Tabi ni", desc: "Đúng lúc đang làm (bị ngắt quãng) và Mỗi lần đều.", type: "test", icon: PenTool, link: "/roadmap/n3/w5/grammar-2", xp: 200
      },
      {
        id: 'n3_w5_4', title: "Đọc hiểu: Tốc độ Skimming", desc: "Kỹ năng đọc lướt nắm ý chính đoạn văn 300 chữ.", type: "reading", icon: Eye, link: "/reading/n3-skimming", xp: 250
      }
    ]
  },
  {
    week: 6,
    title: "Tuần 6: Nghịch lý & Nhượng bộ",
    description: "Thể hiện sự bất mãn 'Mặc dù... vậy mà', 'Thế mà lại'.",
    color: "bg-fuchsia-100 border-fuchsia-200",
    iconColor: "text-fuchsia-600",
    badgeColor: "bg-fuchsia-500",
    quests: [
      {
        id: 'n3_w6_1', title: "Từ vựng: Tiền bạc & Mua sắm", desc: "Từ vựng về chi tiêu, giảm giá và kinh tế gia đình.", type: "flashcard", icon: Zap, link: "/roadmap/n3/w6/vocab", xp: 150
      },
      {
        id: 'n3_w6_2', title: "Ngữ pháp: Kuseni & Wari ni", desc: "Biểu đạt sự trách móc, chê bai (Kuseni) và bất ngờ (Wari ni).", type: "learn", icon: BookOpen, link: "/roadmap/n3/w6/grammar-1", xp: 200
      },
      {
        id: 'n3_w6_3', title: "Ngữ pháp: Nishi te wa", desc: "Đánh giá một việc 'so với' tiêu chuẩn thông thường.", type: "test", icon: PenTool, link: "/roadmap/n3/w6/grammar-2", xp: 250
      },
      {
        id: 'n3_w6_4', title: "Kanji N3: Tuần 6", desc: "Review 150 Kanji N3 đầu tiên đã học.", type: "test", icon: CheckCircle2, link: "/roadmap/n3/w6/kanji", xp: 200
      }
    ]
  },
  {
    week: 7,
    title: "Tuần 7: Khuynh hướng và Trạng thái",
    description: "Miêu tả trạng thái tiêu cực 'Đầy bùn', 'Hay quên', 'Có vẻ ốm'.",
    color: "bg-pink-100 border-pink-200",
    iconColor: "text-pink-600",
    badgeColor: "bg-pink-500",
    quests: [
      {
        id: 'n3_w7_1', title: "Từ vựng: Y tế & Cơ thể", desc: "Từ vựng về triệu chứng bệnh và bộ phận cơ thể.", type: "flashcard", icon: Zap, link: "/roadmap/n3/w7/vocab", xp: 150
      },
      {
        id: 'n3_w7_2', title: "Ngữ pháp: Gachi & Gimi", desc: "Thường hay (tiêu cực) và Có triệu chứng nhẹ.", type: "learn", icon: BookOpen, link: "/roadmap/n3/w7/grammar-1", xp: 200
      },
      {
        id: 'n3_w7_3', title: "Ngữ pháp: Darake & Ppoi", desc: "Toàn là (bụi, lỗi) và Trông có vẻ (giống trẻ con).", type: "test", icon: PenTool, link: "/roadmap/n3/w7/grammar-2", xp: 250
      },
      {
        id: 'n3_w7_4', title: "Viết lách N3", desc: "Viết đoạn văn mô tả thói quen xấu cần sửa của bản thân.", type: "community", icon: Users, link: "/community/n3-writing", xp: 200
      }
    ]
  },
  {
    week: 8,
    title: "Tuần 8: Giới hạn và Nhấn mạnh",
    description: "Cách nói 'Chỉ toàn là', 'Ngay cả', 'Chính vì'.",
    color: "bg-rose-100 border-rose-200",
    iconColor: "text-rose-600",
    badgeColor: "bg-rose-500",
    quests: [
      {
        id: 'n3_w8_1', title: "Từ vựng: Môi trường & Tự nhiên", desc: "Từ vựng về thời tiết khắc nghiệt, động thực vật.", type: "flashcard", icon: Zap, link: "/roadmap/n3/w8/vocab", xp: 150
      },
      {
        id: 'n3_w8_2', title: "Ngữ pháp: Bakari & Kiri", desc: "Chỉ toàn làm gì đó / Kể từ khi... thì không.", type: "learn", icon: BookOpen, link: "/roadmap/n3/w8/grammar-1", xp: 200
      },
      {
        id: 'n3_w8_3', title: "Ngữ pháp: Sae & Koso", desc: "Nhấn mạnh mức độ 'Thậm chí' và 'Chính là'.", type: "test", icon: PenTool, link: "/roadmap/n3/w8/grammar-2", xp: 250
      },
      {
        id: 'n3_w8_4', title: "Kiểm tra Tuần 5-8", desc: "Đánh giá định kỳ ngữ pháp N3 chặng 2.", type: "test", icon: Trophy, link: "/tests/n3-w8", xp: 400
      }
    ]
  },
  {
    week: 9,
    title: "Tuần 9: Lập luận và Nguyên nhân",
    description: "Chỉ ra nền tảng 'Dựa trên', 'Đối với' trong văn bản.",
    color: "bg-orange-100 border-orange-200",
    iconColor: "text-orange-600",
    badgeColor: "bg-orange-500",
    quests: [
      {
        id: 'n3_w9_1', title: "Từ vựng: Chính trị & Xã hội", desc: "Từ vựng cơ bản về luật, quy định và quyền lợi.", type: "flashcard", icon: Zap, link: "/roadmap/n3/w9/vocab", xp: 150
      },
      {
        id: 'n3_w9_2', title: "Ngữ pháp: Niyotte & Motoduite", desc: "Được làm bởi ai / Dựa trên cơ sở nào.", type: "learn", icon: BookOpen, link: "/roadmap/n3/w9/grammar-1", xp: 200
      },
      {
        id: 'n3_w9_3', title: "Ngữ pháp: Nitaishite & Nitotte", desc: "Trái ngược với / Đối với (quan điểm của ai đó).", type: "test", icon: PenTool, link: "/roadmap/n3/w9/grammar-2", xp: 250
      },
      {
        id: 'n3_w9_4', title: "Đọc hiểu: Bảng biểu", desc: "Phân tích số liệu và đồ thị trong đề thi N3.", type: "reading", icon: Eye, link: "/reading/n3-graphs", xp: 250
      }
    ]
  },
  {
    week: 10,
    title: "Tuần 10: Nguyện vọng và Ép buộc",
    description: "Tình thế tiến thoái lưỡng nan 'Đành phải', 'Không thể không'.",
    color: "bg-amber-100 border-amber-200",
    iconColor: "text-amber-600",
    badgeColor: "bg-amber-500",
    quests: [
      {
        id: 'n3_w10_1', title: "Từ vựng: Quan hệ nhân kì", desc: "Từ vựng về tình yêu, bạn bè và cấp trên cấp dưới.", type: "flashcard", icon: Zap, link: "/roadmap/n3/w10/vocab", xp: 150
      },
      {
        id: 'n3_w10_2', title: "Ngữ pháp: Wake ni wa ikanai", desc: "Về mặt đạo đức/tâm lý thì không thể làm được.", type: "learn", icon: BookOpen, link: "/roadmap/n3/w10/grammar-1", xp: 250
      },
      {
        id: 'n3_w10_3', title: "Ngữ pháp: Zaru wo enai", desc: "Dù không muốn nhưng vẫn đành phải làm.", type: "test", icon: Shield, link: "/roadmap/n3/w10/grammar-2", xp: 250
      },
      {
        id: 'n3_w10_4', title: "Kanji N3: Vượt chướng ngại vật", desc: "Học 50 Kanji N3 khó nhất và dễ nhầm lẫn.", type: "flashcard", icon: Zap, link: "/roadmap/n3/w10/kanji", xp: 200
      }
    ]
  },
  {
    week: 11,
    title: "Tuần 11: Môi trường Công sở & IT",
    description: "Kính ngữ N3 và thực chiến giao tiếp trong công việc kỹ thuật.",
    color: "bg-teal-100 border-teal-300",
    iconColor: "text-teal-700",
    badgeColor: "bg-teal-600",
    quests: [
      {
        id: 'n3_w11_1', title: "Kính ngữ N3 (Keigo)", desc: "Ôn tập và mở rộng Sonkeigo, Kenjougo trong mail công việc.", type: "learn", icon: BookOpen, link: "/roadmap/n3/w11/keigo", xp: 250
      },
      {
        id: 'n3_w11_2', title: "Ngữ pháp: ~sashite itadakimasu", desc: "Cách xin phép làm gì đó lịch sự nhất.", type: "test", icon: PenTool, link: "/roadmap/n3/w11/grammar", xp: 200
      },
      {
        id: 'n3_w11_3', title: "Thực chiến: Quản lý dự án IT", desc: "Roleplay: Thảo luận tiến độ dự án làm bằng Next.js/React với BrSE (Kỹ sư cầu nối).", type: "roleplay", icon: Mic, link: "/roleplay/n3-it-project", xp: 350
      },
      {
        id: 'n3_w11_4', title: "Bẫy Ngữ Pháp JLPT", desc: "Làm 50 câu trắc nghiệm các mẫu ngữ pháp dễ nhầm lẫn nhất.", type: "test", icon: Sword, link: "/tests/n3-traps", xp: 300
      }
    ]
  },
  {
    week: 12,
    title: "Tuần 12: Đấu trường JLPT N3",
    description: "Tổng kết, hệ thống hóa toàn bộ kiến thức và bước vào kỳ thi thực tế.",
    color: "bg-slate-800 text-slate-100 border-slate-600",
    iconColor: "text-cyan-400",
    badgeColor: "bg-cyan-600",
    quests: [
      {
        id: 'n3_w12_1', title: "Tổng ôn 650 Kanji N3", desc: "Duyệt lại toàn bộ Kanji đã học bằng thuật toán Spaced Repetition.", type: "flashcard", icon: Zap, link: "/roadmap/n3/w12/kanji-final", xp: 300
      },
      {
        id: 'n3_w12_2', title: "Chiến thuật Đọc Hiểu (Dokkai)", desc: "Phân bổ thời gian: Đoạn ngắn, Đoạn dài, Tìm kiếm thông tin.", type: "learn", icon: Eye, link: "/roadmap/n3/w12/reading-tips", xp: 200
      },
      {
        id: 'n3_w12_3', title: "Chiến thuật Nghe Hiểu (Choukai)", desc: "Mẹo làm bài thi nghe N3 (Mondai 1 đến 5).", type: "learn", icon: Mic, link: "/roadmap/n3/w12/listening-tips", xp: 200
      },
      {
        id: 'n3_w12_4', title: "Mock Test N3: The Warrior", desc: "Làm đề thi thử N3 Full (140 phút) đánh giá năng lực.", type: "test", icon: Crown, link: "/tests/n3-final", xp: 2000
      }
    ]
  }
];

export const N2_WEEKS = [
  {
    week: 1,
    title: "Tuần 1: Nhịp điệu Thương trường",
    description: "Khởi động với nhóm ngữ pháp về thời điểm và các thuật ngữ kinh tế, thị trường.",
    color: "bg-violet-100 border-violet-200",
    iconColor: "text-violet-600",
    badgeColor: "bg-violet-500",
    quests: [
      {
        id: 'n2_w1_1', title: "Từ vựng: Kinh tế & Marketing", desc: "Học các khái niệm về thị trường, doanh thu, và chiến lược tiếp thị (Marketing).", type: "flashcard", icon: Zap, link: "/roadmap/n2/w1/vocab", xp: 200
      },
      {
        id: 'n2_w1_2', title: "Ngữ pháp: ~ni saishite / ~ni atatte", desc: "Cách nói 'Nhân dịp', 'Vào lúc' trong các diễn văn, thư tín trang trọng.", type: "learn", icon: BookOpen, link: "/roadmap/n2/w1/grammar-1", xp: 250
      },
      {
        id: 'n2_w1_3', title: "Ngữ pháp: ~totan / ~ka ~nai ka no uchi ni", desc: "Hành động xảy ra chớp nhoáng 'Ngay lập tức', 'Vừa mới... thì'.", type: "test", icon: PenTool, link: "/roadmap/n2/w1/grammar-2", xp: 250
      },
      {
        id: 'n2_w1_4', title: "Kanji N2: Đợt 1", desc: "Làm quen với 40 Kanji thường xuất hiện trên báo Nikkei.", type: "flashcard", icon: Zap, link: "/roadmap/n2/w1/kanji", xp: 200
      }
    ]
  },
  {
    week: 2,
    title: "Tuần 2: Mối quan hệ & Xoay quanh",
    description: "Trình bày quan điểm về một vấn đề, sự việc đang được bàn tán.",
    color: "bg-blue-100 border-blue-200",
    iconColor: "text-blue-600",
    badgeColor: "bg-blue-500",
    quests: [
      {
        id: 'n2_w2_1', title: "Từ vựng: Xã hội & Dư luận", desc: "Từ vựng về các hiện tượng xã hội, tranh cãi và chính sách.", type: "flashcard", icon: Zap, link: "/roadmap/n2/w2/vocab", xp: 200
      },
      {
        id: 'n2_w2_2', title: "Ngữ pháp: ~wo megutte", desc: "Cấu trúc 'Xoay quanh (một vấn đề)' thường thấy trên bản tin.", type: "learn", icon: BookOpen, link: "/roadmap/n2/w2/grammar-1", xp: 250
      },
      {
        id: 'n2_w2_3', title: "Ngữ pháp: ~ni taishite / ~ni kotaete", desc: "Đáp lại kỳ vọng hoặc Đối lập hoàn toàn với.", type: "test", icon: PenTool, link: "/roadmap/n2/w2/grammar-2", xp: 250
      },
      {
        id: 'n2_w2_4', title: "Nghe hiểu: Bản tin Thời sự", desc: "Luyện nghe bắt thông tin từ bản tin NHK News tốc độ gốc.", type: "learn", icon: Mic, link: "/roadmap/n2/w2/listening", xp: 300
      }
    ]
  },
  {
    week: 3,
    title: "Tuần 3: Giao kết & Trách nhiệm Pháp lý",
    description: "Chinh phục văn bản cứng nhắc, điều khoản và những quy định khắt khe.",
    color: "bg-slate-200 border-slate-300",
    iconColor: "text-slate-700",
    badgeColor: "bg-slate-600",
    quests: [
      {
        id: 'n2_w3_1', title: "Từ vựng: Hợp đồng & Pháp luật", desc: "Các từ vựng chuyên ngành về giao kết, quyền lợi và nghĩa vụ pháp lý.", type: "flashcard", icon: Zap, link: "/roadmap/n2/w3/vocab", xp: 200
      },
      {
        id: 'n2_w3_2', title: "Ngữ pháp: ~ijou / ~ue wa", desc: "Sự quyết tâm: 'Một khi đã... thì đương nhiên phải'.", type: "learn", icon: BookOpen, link: "/roadmap/n2/w3/grammar-1", xp: 250
      },
      {
        id: 'n2_w3_3', title: "Đọc hiểu: Điều khoản Hợp đồng (Keiyakusho)", desc: "Luyện đọc và dịch các điều khoản cơ bản trong hợp đồng tiếng Nhật.", type: "reading", icon: Eye, link: "/reading/n2-contracts", xp: 350
      },
      {
        id: 'n2_w3_4', title: "Ngữ pháp: ~kane nai", desc: "Đưa ra cảnh báo: 'E rằng', 'Có nguy cơ (xấu) xảy ra'.", type: "test", icon: Shield, link: "/roadmap/n2/w3/grammar-2", xp: 250
      }
    ]
  },
  {
    week: 4,
    title: "Tuần 4: Giới hạn & Điểm dừng",
    description: "Diễn tả sự tột cùng, giới hạn của hành động và sự việc.",
    color: "bg-teal-100 border-teal-200",
    iconColor: "text-teal-600",
    badgeColor: "bg-teal-500",
    quests: [
      {
        id: 'n2_w4_1', title: "Từ vựng: Môi trường & Khoa học", desc: "Tài nguyên thiên nhiên, khí hậu và các thuật ngữ khoa học.", type: "flashcard", icon: Zap, link: "/roadmap/n2/w4/vocab", xp: 200
      },
      {
        id: 'n2_w4_2', title: "Ngữ pháp: ~kagiri / ~ni kagitte", desc: "Cách nói 'Chừng nào còn' và 'Chỉ giới hạn cho'.", type: "learn", icon: BookOpen, link: "/roadmap/n2/w4/grammar-1", xp: 250
      },
      {
        id: 'n2_w4_3', title: "Ngữ pháp: ~nuku", desc: "Hành động làm đến cùng dù gian nan (Gaman shite nuku).", type: "test", icon: PenTool, link: "/roadmap/n2/w4/grammar-2", xp: 250
      },
      {
        id: 'n2_w4_4', title: "Kiểm tra Tuần 1-4", desc: "Tổng ôn các điểm ngữ pháp văn viết khó của tháng đầu tiên N2.", type: "test", icon: Trophy, link: "/tests/n2-w4", xp: 500
      }
    ]
  },
  {
    week: 5,
    title: "Tuần 5: Phủ định & Cảm xúc tột độ",
    description: "Nhấn mạnh cảm xúc 'Không thể nào kìm nén' và các dạng phủ định.",
    color: "bg-rose-100 border-rose-200",
    iconColor: "text-rose-600",
    badgeColor: "bg-rose-500",
    quests: [
      {
        id: 'n2_w5_1', title: "Từ vựng: Tâm lý & Cảm xúc N2", desc: "Từ vựng miêu tả các trạng thái tinh thần phức tạp.", type: "flashcard", icon: Zap, link: "/roadmap/n2/w5/vocab", xp: 200
      },
      {
        id: 'n2_w5_2', title: "Ngữ pháp: ~te tamaranai", desc: "Nhấn mạnh cảm giác '... không chịu nổi' (Vui không chịu nổi).", type: "learn", icon: BookOpen, link: "/roadmap/n2/w5/grammar-1", xp: 250
      },
      {
        id: 'n2_w5_3', title: "Ngữ pháp: ~zaru wo enai", desc: "Miễn cưỡng: 'Dù không muốn nhưng vẫn đành phải làm'.", type: "test", icon: PenTool, link: "/roadmap/n2/w5/grammar-2", xp: 250
      },
      {
        id: 'n2_w5_4', title: "Viết luận N2", desc: "Trình bày luận điểm cá nhân về một vấn đề bức xúc trong xã hội.", type: "community", icon: Users, link: "/community/n2-essay", xp: 300
      }
    ]
  },
  {
    week: 6,
    title: "Tuần 6: Quá trình & Kết quả",
    description: "Nói về những hệ lụy, kết cục sau một thời gian dài nỗ lực hoặc chịu đựng.",
    color: "bg-orange-100 border-orange-200",
    iconColor: "text-orange-600",
    badgeColor: "bg-orange-500",
    quests: [
      {
        id: 'n2_w6_1', title: "Từ vựng: Sản xuất & Vận hành", desc: "Từ vựng về quy trình, nhà máy và công nghiệp.", type: "flashcard", icon: Zap, link: "/roadmap/n2/w6/vocab", xp: 200
      },
      {
        id: 'n2_w6_2', title: "Ngữ pháp: ~ageku / ~sue", desc: "Sau một thời gian dài dằn vặt... thì kết cục là (thường tiêu cực).", type: "learn", icon: BookOpen, link: "/roadmap/n2/w6/grammar-1", xp: 250
      },
      {
        id: 'n2_w6_3', title: "Ngữ pháp: ~tsutsu", desc: "Vừa... vừa... (văn viết trang trọng) và Mặc dù biết nhưng vẫn.", type: "test", icon: PenTool, link: "/roadmap/n2/w6/grammar-2", xp: 250
      },
      {
        id: 'n2_w6_4', title: "Kanji N2: Đợt 2", desc: "Check point ghi nhớ 200 Kanji tiếp theo của level N2.", type: "test", icon: CheckCircle2, link: "/roadmap/n2/w6/kanji", xp: 300
      }
    ]
  },
  {
    week: 7,
    title: "Tuần 7: So sánh & Tương phản",
    description: "Cách nói 'Càng... càng...', 'Thay vì' và đánh giá các phương án.",
    color: "bg-amber-100 border-amber-200",
    iconColor: "text-amber-600",
    badgeColor: "bg-amber-500",
    quests: [
      {
        id: 'n2_w7_1', title: "Từ vựng: Lựa chọn & Quyết định", desc: "Từ vựng dùng trong đàm phán, so sánh các giải pháp.", type: "flashcard", icon: Zap, link: "/roadmap/n2/w7/vocab", xp: 200
      },
      {
        id: 'n2_w7_2', title: "Ngữ pháp: ~ni tsurete / ~ni tomonatte", desc: "Sự thay đổi đồng thời: A thay đổi thì B cũng thay đổi.", type: "learn", icon: BookOpen, link: "/roadmap/n2/w7/grammar-1", xp: 250
      },
      {
        id: 'n2_w7_3', title: "Ngữ pháp: ~kawari ni / ~ni kawatte", desc: "Làm thay cho ai đó, hoặc Để bù lại (sự cân bằng).", type: "test", icon: PenTool, link: "/roadmap/n2/w7/grammar-2", xp: 250
      },
      {
        id: 'n2_w7_4', title: "Đọc hiểu: Tác giả muốn nói gì?", desc: "Kỹ năng tìm câu chủ đề và ý đồ ẩn giấu của tác giả trong văn bản N2.", type: "reading", icon: Eye, link: "/reading/n2-author-intent", xp: 300
      }
    ]
  },
  {
    week: 8,
    title: "Tuần 8: Đánh giá & Khả năng",
    description: "Nhận xét về tố chất 'Riêng về mặt này thì...', và những phán đoán mông lung.",
    color: "bg-fuchsia-100 border-fuchsia-200",
    iconColor: "text-fuchsia-600",
    badgeColor: "bg-fuchsia-500",
    quests: [
      {
        id: 'n2_w8_1', title: "Từ vựng: Thể thao & Nghệ thuật", desc: "Mở rộng vốn từ về thành tích, năng khiếu và thi đấu.", type: "flashcard", icon: Zap, link: "/roadmap/n2/w8/vocab", xp: 200
      },
      {
        id: 'n2_w8_2', title: "Ngữ pháp: ~ni kakete wa", desc: "Tự hào: 'Nếu nói về lĩnh vực này thì (ai đó) là số một'.", type: "learn", icon: BookOpen, link: "/roadmap/n2/w8/grammar-1", xp: 250
      },
      {
        id: 'n2_w8_3', title: "Ngữ pháp: ~kamoshirenai / ~mai", desc: "Chắc là... / Chắc chắn là không (Phủ định mạnh).", type: "test", icon: PenTool, link: "/roadmap/n2/w8/grammar-2", xp: 250
      },
      {
        id: 'n2_w8_4', title: "Kiểm tra Tuần 5-8", desc: "Bài thi Mini Test N2 giữa kỳ tập trung vào Ngữ pháp và Đọc hiểu.", type: "test", icon: Trophy, link: "/tests/n2-w8", xp: 500
      }
    ]
  },
  {
    week: 9,
    title: "Tuần 9: Quan hệ nhân quả & Trách móc",
    description: "Chỉ tại... mà dẫn đến kết quả xấu, và nhấn mạnh 'Chính vì'.",
    color: "bg-pink-100 border-pink-200",
    iconColor: "text-pink-600",
    badgeColor: "bg-pink-500",
    quests: [
      {
        id: 'n2_w9_1', title: "Từ vựng: Y tế & Cơ thể (N2)", desc: "Từ vựng nâng cao về y học, sức khỏe để đọc hiểu hướng dẫn.", type: "flashcard", icon: Zap, link: "/roadmap/n2/w9/vocab", xp: 200
      },
      {
        id: 'n2_w9_2', title: "Ngữ pháp: ~bakari ni / ~sei de", desc: "Chỉ vì một lỗi nhỏ mà dẫn đến hậu quả nghiêm trọng.", type: "learn", icon: BookOpen, link: "/roadmap/n2/w9/grammar-1", xp: 250
      },
      {
        id: 'n2_w9_3', title: "Ngữ pháp: ~ba koso", desc: "Nhấn mạnh nguyên nhân (thường tích cực): 'Chính vì yêu nên mới mắng'.", type: "test", icon: PenTool, link: "/roadmap/n2/w9/grammar-2", xp: 250
      },
      {
        id: 'n2_w9_4', title: "Bẫy Nghe Hiểu (Choukai)", desc: "Luyện nghe Mondai 4 (Phản xạ nhanh) - Nơi thí sinh rụng nhiều nhất.", type: "learn", icon: Mic, link: "/roadmap/n2/w9/listening-traps", xp: 300
      }
    ]
  },
  {
    week: 10,
    title: "Tuần 10: Giả định & Trái ngược",
    description: "Giả sử mọi chuyện xảy ra khác đi và những sự thật trái ngược hoàn toàn.",
    color: "bg-cyan-100 border-cyan-200",
    iconColor: "text-cyan-600",
    badgeColor: "bg-cyan-500",
    quests: [
      {
        id: 'n2_w10_1', title: "Từ vựng: Giáo dục & Lịch sử", desc: "Từ vựng mang tính học thuật để giải quyết các bài đọc dài.", type: "flashcard", icon: Zap, link: "/roadmap/n2/w10/vocab", xp: 200
      },
      {
        id: 'n2_w10_2', title: "Ngữ pháp: ~to shitara / ~to shite mo", desc: "Nếu giả sử... / Dẫu cho có... thì cũng.", type: "learn", icon: BookOpen, link: "/roadmap/n2/w10/grammar-1", xp: 250
      },
      {
        id: 'n2_w10_3', title: "Ngữ pháp: ~ni mo kakawarazu", desc: "Bất chấp, Mặc dù... thế nhưng lại (sự bất mãn, bất ngờ).", type: "test", icon: PenTool, link: "/roadmap/n2/w10/grammar-2", xp: 250
      },
      {
        id: 'n2_w10_4', title: "Review 1000 Kanji", desc: "Chạy SRS ôn tập lại 1000 chữ Kanji cần thiết cho bài thi.", type: "flashcard", icon: Zap, link: "/roadmap/n2/w10/kanji-review", xp: 350
      }
    ]
  },
  {
    week: 11,
    title: "Tuần 11: Kính ngữ Chuyên sâu",
    description: "Hoàn thiện Kính ngữ (Keigo) cấp độ N2 dùng trong các email thương mại và công sở.",
    color: "bg-indigo-100 border-indigo-200",
    iconColor: "text-indigo-600",
    badgeColor: "bg-indigo-500",
    quests: [
      {
        id: 'n2_w11_1', title: "Business Keigo N2", desc: "Phân biệt các cụm Kính ngữ dễ nhầm (Mairimasu, Ukagaimasu...).", type: "learn", icon: Shield, link: "/roadmap/n2/w11/keigo", xp: 300
      },
      {
        id: 'n2_w11_2', title: "Đọc hiểu: Email Đối tác", desc: "Phân tích cấu trúc thư tín thương mại (Aisatsu, Honbun, Musubi).", type: "reading", icon: Eye, link: "/reading/n2-business-emails", xp: 300
      },
      {
        id: 'n2_w11_3', title: "Đọc tìm kiếm thông tin N2", desc: "Chiến thuật tìm đáp án nhanh trong các tờ rơi, thông báo của Nhật.", type: "test", icon: FileText, link: "/reading/n2-information", xp: 250
      },
      {
        id: 'n2_w11_4', title: "Ngữ pháp: ~O...+ suru/naru", desc: "Luyện tập chia Kính ngữ N2 qua các tình huống đóng vai.", type: "roleplay", icon: Mic, link: "/roleplay/n2-keigo", xp: 300
      }
    ]
  },
  {
    week: 12,
    title: "Tuần 12: Đấu trường Sinh tử JLPT N2",
    description: "Tuần cuối cùng: Kiểm soát thời gian, duy trì sự tỉnh táo trong 155 phút.",
    color: "bg-zinc-900 text-zinc-100 border-zinc-700", // Dark mode cực ngầu
    iconColor: "text-purple-400",
    badgeColor: "bg-purple-600",
    quests: [
      {
        id: 'n2_w12_1', title: "Chiến thuật phòng thi N2", desc: "Cách phân bổ 105 phút Đọc/Từ vựng và 50 phút Nghe hiểu không bị loạn.", type: "learn", icon: BookOpen, link: "/roadmap/n2/w12/strategy", xp: 250
      },
      {
        id: 'n2_w12_2', title: "Gỡ bẫy Mondai 7 (Bài đọc dài)", desc: "Xử lý bài đọc hiểu dài (Choubun) - con quái vật ngốn nhiều thời gian nhất.", type: "learn", icon: Sword, link: "/roadmap/n2/w12/reading-boss", xp: 300
      },
      {
        id: 'n2_w12_3', title: "Tổng duyệt Từ vựng", desc: "Flashcard tốc độ cao: 100 từ vựng N2 hay ra trong các năm trước.", type: "flashcard", icon: Zap, link: "/roadmap/n2/w12/vocab-final", xp: 350
      },
      {
        id: 'n2_w12_4', title: "Mock Test N2: The Expert", desc: "Thi thử N2 chuẩn JLPT thực tế. Sẵn sàng nhận bằng!", type: "test", icon: Crown, link: "/tests/n2-final", xp: 2500
      }
    ]
  }
];

export const N1_WEEKS = [
  {
    week: 1,
    title: "Tuần 1: Khởi nguyên của Ngôn từ",
    description: "Bước vào thế giới của văn viết hàn lâm, từ vựng trừu tượng và chữ Hán phức tạp.",
    color: "bg-red-100 border-red-200",
    iconColor: "text-red-700",
    badgeColor: "bg-red-600",
    quests: [
      {
        id: 'n1_w1_1', title: "Từ vựng: Triết lý & Tư tưởng", desc: "Học các khái niệm trừu tượng về nhân sinh quan, đạo lý và tư tưởng.", type: "flashcard", icon: Zap, link: "/roadmap/n1/w1/vocab", xp: 300
      },
      {
        id: 'n1_w1_2', title: "Ngữ pháp: ~gotoki / ~gotoku", desc: "Sự ví von mang tính văn học cổ: 'Cứ như thể là...'.", type: "learn", icon: BookOpen, link: "/roadmap/n1/w1/grammar-1", xp: 350
      },
      {
        id: 'n1_w1_3', title: "Ngữ pháp: ~ni katakunai", desc: "Cảm nhận rõ ràng: 'Không khó để tưởng tượng/cảm nhận...'.", type: "test", icon: PenTool, link: "/roadmap/n1/w1/grammar-2", xp: 350
      },
      {
        id: 'n1_w1_4', title: "Đọc hiểu: Tản văn Nhật Bản", desc: "Đọc và phân tích một đoạn tản văn (Zuihitsu) mang tính chiêm nghiệm.", type: "reading", icon: Eye, link: "/reading/n1-zuihitsu", xp: 400
      }
    ]
  },
  {
    week: 2,
    title: "Tuần 2: Cảm xúc tột độ & Chân thành",
    description: "Diễn đạt những tầng lớp cảm xúc sâu sắc nhất, không thể kìm nén bằng lời thông thường.",
    color: "bg-orange-100 border-orange-200",
    iconColor: "text-orange-700",
    badgeColor: "bg-orange-600",
    quests: [
      {
        id: 'n1_w2_1', title: "Từ vựng: Tâm lý học & Ẩn dụ", desc: "Từ vựng miêu tả các rào cản tâm lý và các biện pháp tu từ.", type: "flashcard", icon: Zap, link: "/roadmap/n1/w2/vocab", xp: 300
      },
      {
        id: 'n1_w2_2', title: "Ngữ pháp: ~te yamanai", desc: "Sự mong mỏi, cầu chúc từ tận đáy lòng: 'Luôn luôn cầu nguyện cho...'.", type: "learn", icon: BookOpen, link: "/roadmap/n1/w2/grammar-1", xp: 350
      },
      {
        id: 'n1_w2_3', title: "Ngữ pháp: ~ni taenai", desc: "Chịu đựng cảm xúc mãnh liệt: 'Vô cùng hối hận', 'Không đáng để nghe'.", type: "test", icon: PenTool, link: "/roadmap/n1/w2/grammar-2", xp: 350
      },
      {
        id: 'n1_w2_4', title: "Kanji N1: Khai mở", desc: "Chinh phục 50 Kanji cực hiếm (chỉ dùng trong tên riêng hoặc văn cổ).", type: "flashcard", icon: Zap, link: "/roadmap/n1/w2/kanji", xp: 400
      }
    ]
  },
  {
    week: 3,
    title: "Tuần 3: Lập luận thép & Bác bỏ",
    description: "Bảo vệ quan điểm cá nhân một cách đanh thép và bác bỏ ý kiến đối lập.",
    color: "bg-stone-200 border-stone-300",
    iconColor: "text-stone-700",
    badgeColor: "bg-stone-600",
    quests: [
      {
        id: 'n1_w3_1', title: "Từ vựng: Xã luận & Hùng biện", desc: "Từ vựng dùng trong các bài diễn văn, tranh luận (Debate).", type: "flashcard", icon: Zap, link: "/roadmap/n1/w3/vocab", xp: 300
      },
      {
        id: 'n1_w3_2', title: "Ngữ pháp: ~de nakute nandarou", desc: "Nhấn mạnh tuyệt đối: 'Nếu đây không phải là tình yêu thì là gì?'.", type: "learn", icon: BookOpen, link: "/roadmap/n1/w3/grammar-1", xp: 350
      },
      {
        id: 'n1_w3_3', title: "Ngữ pháp: ~majiki", desc: "Phê phán gay gắt: 'Hành động không thể chấp nhận được ở cương vị đó'.", type: "test", icon: Shield, link: "/roadmap/n1/w3/grammar-2", xp: 350
      },
      {
        id: 'n1_w3_4', title: "Nghe hiểu: Bản tin thời sự Quốc tế", desc: "Nghe hiểu các vấn đề chính trị thế giới trên đài NHK.", type: "learn", icon: Mic, link: "/roadmap/n1/w3/listening", xp: 450
      }
    ]
  },
  {
    week: 4,
    title: "Tuần 4: Chính trị & Kinh tế Vĩ mô",
    description: "Đọc hiểu các bài báo về chính sách nhà nước, xu hướng kinh tế toàn cầu.",
    color: "bg-blue-100 border-blue-200",
    iconColor: "text-blue-800",
    badgeColor: "bg-blue-700",
    quests: [
      {
        id: 'n1_w4_1', title: "Từ vựng: Kinh tế Vĩ mô", desc: "Lạm phát, chính sách tiền tệ, thị trường chứng khoán.", type: "flashcard", icon: Zap, link: "/roadmap/n1/w4/vocab", xp: 300
      },
      {
        id: 'n1_w4_2', title: "Đọc hiểu: Báo Yomiuri/Asahi", desc: "Phân tích cấu trúc bài viết và quan điểm của tòa soạn qua bài Xã luận.", type: "reading", icon: Eye, link: "/reading/n1-editorials", xp: 500
      },
      {
        id: 'n1_w4_3', title: "Ngữ pháp: ~to attewa / ~to areba", desc: "Điều kiện đặc biệt: 'Trong tình huống khẩn cấp như thế thì đương nhiên...'.", type: "test", icon: PenTool, link: "/roadmap/n1/w4/grammar-1", xp: 350
      },
      {
        id: 'n1_w4_4', title: "Kiểm tra Tuần 1-4", desc: "Bài Test khởi động N1: Đừng để điểm số làm bạn nản chí.", type: "test", icon: Trophy, link: "/tests/n1-w4", xp: 600
      }
    ]
  },
  {
    week: 5,
    title: "Tuần 5: Giới hạn cuối cùng",
    description: "Diễn tả sự tột bậc của trạng thái, không còn gì có thể hơn được nữa.",
    color: "bg-purple-100 border-purple-200",
    iconColor: "text-purple-800",
    badgeColor: "bg-purple-700",
    quests: [
      {
        id: 'n1_w5_1', title: "Từ vựng: Tự nhiên & Vũ trụ", desc: "Từ vựng mô tả sự vĩ đại của tự nhiên, vật lý học và không gian.", type: "flashcard", icon: Zap, link: "/roadmap/n1/w5/vocab", xp: 300
      },
      {
        id: 'n1_w5_2', title: "Ngữ pháp: ~kiwamaru / ~kiwamarinai", desc: "Cực kỳ, vô cùng: 'Thất lễ hết sức', 'Nguy hiểm tột độ'.", type: "learn", icon: BookOpen, link: "/roadmap/n1/w5/grammar-1", xp: 350
      },
      {
        id: 'n1_w5_3', title: "Ngữ pháp: ~ni koshita koto wa nai", desc: "Lời khuyên tuyệt đối: 'Không gì tốt bằng việc...'.", type: "test", icon: PenTool, link: "/roadmap/n1/w5/grammar-2", xp: 350
      },
      {
        id: 'n1_w5_4', title: "Viết luận N1: Triết lý cá nhân", desc: "Viết đoạn văn 400 chữ bảo vệ một quan điểm sống đi ngược số đông.", type: "community", icon: Users, link: "/community/n1-philosophy", xp: 400
      }
    ]
  },
  {
    week: 6,
    title: "Tuần 6: Tứ Tự Thục Ngữ (Yojijukugo)",
    description: "Gia vị của sự thông thái: Học cách sử dụng thành ngữ 4 chữ của Nhật Bản.",
    color: "bg-emerald-100 border-emerald-200",
    iconColor: "text-emerald-800",
    badgeColor: "bg-emerald-700",
    quests: [
      {
        id: 'n1_w6_1', title: "Yojijukugo: Cốt lõi", desc: "Học 50 thành ngữ 4 chữ thông dụng nhất trong báo chí và văn học.", type: "flashcard", icon: Zap, link: "/roadmap/n1/w6/yojijukugo", xp: 400
      },
      {
        id: 'n1_w6_2', title: "Ngữ pháp: ~nagara mo", desc: "Nhượng bộ trong văn viết: 'Tuy là... nhưng mang lại cảm giác...'.", type: "learn", icon: BookOpen, link: "/roadmap/n1/w6/grammar-1", xp: 350
      },
      {
        id: 'n1_w6_3', title: "Ngữ pháp: ~tsutsu mo", desc: "Biết là không tốt nhưng vẫn làm (Sự dằn vặt nội tâm).", type: "test", icon: PenTool, link: "/roadmap/n1/w6/grammar-2", xp: 350
      },
      {
        id: 'n1_w6_4', title: "Kanji N1: Đợt 2", desc: "Review 300 Kanji N1 cấp độ khó, phân biệt các bộ thủ giống nhau.", type: "test", icon: CheckCircle2, link: "/roadmap/n1/w6/kanji", xp: 400
      }
    ]
  },
  {
    week: 7,
    title: "Tuần 7: Tình thế Tiến thoái lưỡng nan",
    description: "Mắc kẹt giữa các lựa chọn, không thể làm gì khác được.",
    color: "bg-pink-100 border-pink-200",
    iconColor: "text-pink-800",
    badgeColor: "bg-pink-700",
    quests: [
      {
        id: 'n1_w7_1', title: "Từ vựng: Rủi ro & Khủng hoảng", desc: "Từ vựng dùng trong quản trị rủi ro, y tế khẩn cấp và thảm họa.", type: "flashcard", icon: Zap, link: "/roadmap/n1/w7/vocab", xp: 300
      },
      {
        id: 'n1_w7_2', title: "Ngữ pháp: ~yogu naku sareru", desc: "Buộc phải làm gì ngoài ý muốn (Do hoàn cảnh, thiên tai, dịch bệnh).", type: "learn", icon: BookOpen, link: "/roadmap/n1/w7/grammar-1", xp: 350
      },
      {
        id: 'n1_w7_3', title: "Ngữ pháp: ~ni tarinai", desc: "Đánh giá thấp: 'Chuyện nhỏ nhặt không đáng để bận tâm/để nhắc tới'.", type: "test", icon: PenTool, link: "/roadmap/n1/w7/grammar-2", xp: 350
      },
      {
        id: 'n1_w7_4', title: "Đọc hiểu: Phân tích Dữ liệu dài", desc: "Đọc và liên kết thông tin từ nhiều đoạn văn, bảng biểu khác nhau.", type: "reading", icon: FileText, link: "/reading/n1-data-analysis", xp: 450
      }
    ]
  },
  {
    week: 8,
    title: "Tuần 8: Tương phản và Bất ngờ tột độ",
    description: "Sự việc xảy ra đi ngược hoàn toàn với lẽ thường hoặc dự đoán.",
    color: "bg-cyan-100 border-cyan-200",
    iconColor: "text-cyan-800",
    badgeColor: "bg-cyan-700",
    quests: [
      {
        id: 'n1_w8_1', title: "Từ vựng: Nghệ thuật & Tôn giáo", desc: "Mở rộng vốn từ vựng mang tính tín ngưỡng, lịch sử và văn hóa sâu sắc.", type: "flashcard", icon: Zap, link: "/roadmap/n1/w8/vocab", xp: 300
      },
      {
        id: 'n1_w8_2', title: "Ngữ pháp: ~to omoikya", desc: "Bất ngờ: 'Cứ ngỡ là... ai dè lại...'.", type: "learn", icon: BookOpen, link: "/roadmap/n1/w8/grammar-1", xp: 350
      },
      {
        id: 'n1_w8_3', title: "Ngữ pháp: ~nimo mashite", desc: "So sánh hơn bậc nhất: 'Hơn bất cứ lúc nào/Hơn bất cứ ai'.", type: "test", icon: PenTool, link: "/roadmap/n1/w8/grammar-2", xp: 350
      },
      {
        id: 'n1_w8_4', title: "Kiểm tra Tuần 5-8", desc: "Vượt qua bài Test giữa kỳ N1 với các bẫy ngữ pháp cổ.", type: "test", icon: Trophy, link: "/tests/n1-w8", xp: 700
      }
    ]
  },
  {
    week: 9,
    title: "Tuần 9: Không thể chối cãi",
    description: "Sự thật rành rành, nhấn mạnh bằng cách phủ định của phủ định.",
    color: "bg-rose-100 border-rose-200",
    iconColor: "text-rose-800",
    badgeColor: "bg-rose-700",
    quests: [
      {
        id: 'n1_w9_1', title: "Từ vựng: Khoa học Kỹ thuật", desc: "Thuật ngữ chuyên ngành, công nghệ lõi và phát minh.", type: "flashcard", icon: Zap, link: "/roadmap/n1/w9/vocab", xp: 300
      },
      {
        id: 'n1_w9_2', title: "Ngữ pháp: ~zaru wo enai", desc: "Sự thật khách quan: 'Không thể không công nhận/Không thể phủ nhận'.", type: "learn", icon: BookOpen, link: "/roadmap/n1/w9/grammar-1", xp: 350
      },
      {
        id: 'n1_w9_3', title: "Ngữ pháp: ~tari tomo... nai", desc: "Phủ định triệt để: 'Dù chỉ một phút/một yên cũng không'.", type: "test", icon: Shield, link: "/roadmap/n1/w9/grammar-2", xp: 350
      },
      {
        id: 'n1_w9_4', title: "Bẫy Nghe Hiểu N1", desc: "Luyện nghe Mondai 5 (Tích hợp thông tin) - Vừa nghe vừa chép nhanh.", type: "learn", icon: Mic, link: "/roadmap/n1/w9/listening-traps", xp: 450
      }
    ]
  },
  {
    week: 10,
    title: "Tuần 10: Thái độ & Trọng trách",
    description: "Tuyên thệ, hứa hẹn hoặc thể hiện thái độ vô trách nhiệm của ai đó.",
    color: "bg-fuchsia-100 border-fuchsia-200",
    iconColor: "text-fuchsia-800",
    badgeColor: "bg-fuchsia-700",
    quests: [
      {
        id: 'n1_w10_1', title: "Từ vựng: Cụm từ cố định N1", desc: "Học các cụm từ đi liền với nhau không thể tách rời trong văn viết.", type: "flashcard", icon: Zap, link: "/roadmap/n1/w10/vocab", xp: 300
      },
      {
        id: 'n1_w10_2', title: "Ngữ pháp: ~te kara to iu mono", desc: "Sự thay đổi vĩnh viễn: 'Kể từ sau sự kiện đó... mọi thứ không còn như xưa'.", type: "learn", icon: BookOpen, link: "/roadmap/n1/w10/grammar-1", xp: 350
      },
      {
        id: 'n1_w10_3', title: "Ngữ pháp: ~gatera / ~katagata", desc: "Tiện thể làm việc A thì làm việc B (Rất trang trọng, dùng cho khách VIP).", type: "test", icon: PenTool, link: "/roadmap/n1/w10/grammar-2", xp: 350
      },
      {
        id: 'n1_w10_4', title: "Vương miện Kanji", desc: "Tổng duyệt 2136 chữ Hán Thường dụng (Jouyou Kanji). Sẵn sàng!", type: "flashcard", icon: Zap, link: "/roadmap/n1/w10/kanji-final", xp: 600
      }
    ]
  },
  {
    week: 11,
    title: "Tuần 11: Tác phẩm & Dụng ý",
    description: "Cảm thụ văn học, đoán ý đồ tác giả và đọc hiểu các tác phẩm văn học dài.",
    color: "bg-amber-100 border-amber-200",
    iconColor: "text-amber-800",
    badgeColor: "bg-amber-700",
    quests: [
      {
        id: 'n1_w11_1', title: "Luyện Đọc: Tiểu thuyết N1", desc: "Đọc trích đoạn các tác phẩm nổi tiếng (Natsume Soseki, Dazai Osamu).", type: "reading", icon: Eye, link: "/roadmap/n1/w11/literature", xp: 500
      },
      {
        id: 'n1_w11_2', title: "Chống liệt Đọc hiểu", desc: "Chiến thuật loại trừ đáp án nhiễu cực tinh vi trong Mondai 9, 10.", type: "learn", icon: BookOpen, link: "/roadmap/n1/w11/reading-strategy", xp: 400
      },
      {
        id: 'n1_w11_3', title: "Ngữ pháp N1: Tổng duyệt", desc: "Làm 100 câu trắc nghiệm tổng hợp toàn bộ cấu trúc N1 đã học.", type: "test", icon: PenTool, link: "/roadmap/n1/w11/grammar-review", xp: 500
      },
      {
        id: 'n1_w11_4', title: "Thực chiến: Thuyết trình Nhật ngữ", desc: "Đóng vai trình bày tham luận về định hướng công nghệ bằng tiếng Nhật học thuật.", type: "roleplay", icon: Mic, link: "/roleplay/n1-presentation", xp: 400
      }
    ]
  },
  {
    week: 12,
    title: "Tuần 12: Đỉnh Lăng Kính (The Zenith)",
    description: "Trận chiến cuối cùng. Bằng JLPT N1 - Minh chứng cho sự kiên trì vô hạn.",
    color: "bg-yellow-400 text-yellow-900 border-yellow-500", // Màu Vàng Kim vương giả
    iconColor: "text-amber-900",
    badgeColor: "bg-amber-800",
    quests: [
      {
        id: 'n1_w12_1', title: "Tâm lý phòng thi N1", desc: "Cách quản lý 170 phút thi liên tục không bị kiệt sức và mất tập trung.", type: "learn", icon: Shield, link: "/roadmap/n1/w12/mindset", xp: 300
      },
      {
        id: 'n1_w12_2', title: "Từ vựng: Khắc cốt ghi tâm", desc: "Quét lại lần cuối 200 từ vựng và chữ Hán có tỷ lệ ra đề cao nhất lịch sử JLPT.", type: "flashcard", icon: Zap, link: "/roadmap/n1/w12/vocab-final", xp: 500
      },
      {
        id: 'n1_w12_3', title: "Đỉnh cao Nghe Hiểu N1", desc: "Bài test tốc độ cao 1.25x rèn luyện phản xạ thính giác đỉnh cao.", type: "test", icon: Sword, link: "/roadmap/n1/w12/listening-final", xp: 600
      },
      {
        id: 'n1_w12_4', title: "JLPT N1: The Legend", desc: "Làm đề thi thử N1 Full (170 phút). Bước lên đỉnh vinh quang!", type: "test", icon: Crown, link: "/tests/n1-final", xp: 5000
      }
    ]
  }
];