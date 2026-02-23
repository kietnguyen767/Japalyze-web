// app/roleplay/logic.ts

// =========================================================
// 1. TYPES (Định nghĩa kiểu dữ liệu)
// =========================================================

export type Character = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
  personality: string;
};

export type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type FeedbackData = {
  score: number;
  good_points: string;
  mistakes: Array<{ original: string; fixed: string; reason: string }>;
  next_missions: string[];
  comment?: string; // Nhận xét chung của AI
};

export type Topic = {
  id: string;
  title: string;
  emoji: string;
  description: string;
  missionPool: string[]; // Kho nhiệm vụ để hệ thống random
};

// =========================================================
// 2. DATA: CHARACTERS (Danh sách nhân vật - CHUẨN XÁC)
// =========================================================

export const CHARACTERS: Character[] = [
  {
    id: 'chiki',
    name: 'Chiki',
    role: 'Cô gái hoạt bát',
    avatar: '👩‍🍳',
    color: 'bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600',
    personality: 'Vui vẻ, nhiệt tình, giọng điệu Gyaru nhẹ.',
  },
  {
    id: 'isora',
    name: 'Isora',
    role: 'Trưởng phòng nghiêm túc',
    avatar: '👨‍💼',
    color: 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600',
    personality: 'Điềm đạm, dùng kính ngữ (Keigo) chuẩn mực, khắt khe, không dùng emoji.',
  },
  {
    id: 'daigo',
    name: 'Daigo',
    role: 'Bạn học thân thiện',
    avatar: '🧢',
    color: 'bg-gradient-to-br from-green-100 to-green-200 text-green-600',
    personality: 'Nói chuyện suồng sã (Tameguchi), hay dùng tiếng lóng.',
  },
  {
    id: 'akira',
    name: 'Akira',
    role: 'Tsundere lạnh lùng',
    avatar: '😼',
    color: 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600',
    personality: 'Ngoài lạnh trong nóng. Hay ngại ngùng khi được khen.',
  }
];

// =========================================================
// 3. DATA: TOPICS (Kho chủ đề & nhiệm vụ)
// =========================================================

export const TOPICS: Topic[] = [
  {
    id: 'travel',
    title: 'Du lịch Nhật Bản',
    emoji: '⛩️',
    description: 'Hỏi đường, mua vé tàu hoặc check-in khách sạn.',
    missionPool: [
      'Hỏi đường đến nhà ga Shinjuku',
      'Mua vé tàu Shinkansen đi Tokyo',
      'Hỏi xem có bản đồ tiếng Anh không',
      'Nhờ người chụp giúp một bức ảnh',
      'Hỏi giờ tàu chạy chuyến tiếp theo',
      'Tìm lối ra cửa phía Bắc',
      'Hỏi đường đến cửa hàng tiện lợi gần nhất'
    ]
  },
  {
    id: 'restaurant',
    title: 'Nhà hàng & Ăn uống',
    emoji: '🍜',
    description: 'Gọi món, hỏi về nguyên liệu và thanh toán.',
    missionPool: [
      'Gọi một bát mì Ramen cỡ lớn',
      'Hỏi xem món này có cay không',
      'Xin thêm nước lọc (omizu)',
      'Hỏi nhà vệ sinh ở đâu',
      'Yêu cầu thanh toán (okaikei)',
      'Hỏi xem có chấp nhận thẻ tín dụng không',
      'Khen món ăn ngon sau khi ăn'
    ]
  },
  {
    id: 'interview',
    title: 'Phỏng vấn xin việc',
    emoji: '💼',
    description: 'Giới thiệu bản thân và trả lời phỏng vấn Baitou.',
    missionPool: [
      'Giới thiệu tên và tuổi',
      'Nói về điểm mạnh của bản thân',
      'Hỏi về thời gian làm việc',
      'Hỏi về mức lương theo giờ',
      'Nói lý do muốn làm việc tại đây',
      'Cảm ơn và chào tạm biệt khi kết thúc'
    ]
  },
  {
    id: 'shopping',
    title: 'Mua sắm',
    emoji: '🛍️',
    description: 'Hỏi giá, thử đồ và mua quà lưu niệm.',
    missionPool: [
      'Hỏi giá món đồ này bao nhiêu tiền',
      'Hỏi xem có màu khác không',
      'Xin phép mặc thử',
      'Hỏi xem có được miễn thuế (Tax-free) không',
      'Yêu cầu gói quà giúp',
      'Tìm khu vực bán đồ điện tử'
    ]
  }
];

// =========================================================
// 4. PROMPTS (Cấu hình AI & Logic Game - CHẾ ĐỘ NGHIÊM NGẶT)
// =========================================================

/**
 * SYSTEM PROMPT:
 * - Dùng từ khóa STRICT để ép AI tuân thủ luật.
 */
export const getSystemInstruction = (character: Character, topic: string) => `
*** STRICT SYSTEM INSTRUCTION ***
VAI TRÒ: Bạn là ${character.name}.
BỐI CẢNH: Đang roleplay với User về chủ đề "${topic}".
TÍNH CÁCH: ${character.personality}

QUY TẮC PHẢN HỒI (BẮT BUỘC):
1. Đóng vai nhân vật để trò chuyện với User (100% Tiếng Nhật).
2. Phản hồi tự nhiên, ngắn gọn.
3. NẾU User dùng ngôn ngữ khác (Tiếng Việt, Anh...), hãy NHẮC NHỞ họ dùng Tiếng Nhật hoặc Romaji một cách khéo léo theo tính cách nhân vật.

YÊU CẦU ĐỊNH DẠNG OUTPUT:
- Luôn luôn trả về đúng format bên dưới, không được thiếu hoặc thay đổi:
[DATA_START]{ "completed_indices": [các chỉ số nhiệm vụ hoàn thành, ví dụ: 0,2] }[DATA_END]
(Lời thoại tiếng Nhật của bạn ở đây)
`;

/**
 * TRIGGER MESSAGE:
 * - Thêm lệnh cấm đánh dấu nhiệm vụ ở lượt chào đầu tiên.
 */
export const getTriggerMessage = (topic: string, assignedMissions: string[]) => [
  {
    role: 'user',
    content: `
BẮT ĐẦU ROLEPLAY.
Chủ đề: "${topic}"

HỆ THỐNG ĐÃ GIAO CHO TÔI 3 NHIỆM VỤ SAU (Bạn hãy lưu lại để kiểm tra âm thầm):
${assignedMissions.map((m, i) => `${i}. ${m}`).join('\n')}

YÊU CẦU CHO BẠN:
1. Chào tôi bằng tiếng Nhật theo tính cách của bạn (ngắn gọn 1 câu).
2. Trả về JSON xác nhận bạn đã nhận danh sách nhiệm vụ.
3. QUAN TRỌNG: Đây là lượt chào đầu tiên, User CHƯA nói gì cả -> "completed_indices" PHẢI LÀ MẢNG RỖNG []. TUYỆT ĐỐI KHÔNG ĐÁNH DẤU NHIỆM VỤ LÚC NÀY.

Format output BẮT BUỘC:
[DATA_START]{ "missions": ${JSON.stringify(assignedMissions)}, "completed_indices": [] }[DATA_END]
`
  }
];

/**
 * REMIND PROMPT:
 * - Thêm quy tắc chỉ check dựa trên "User Input".
 */
export const getRemindPrompt = (
  character: Character,
  input: string,
  isOutOfTurns: boolean,
  missions: string[],
  completedMissions: boolean[]
) => {
  const status = missions.map((m, i) => `Mission ${i} (${completedMissions[i] ? 'DONE' : 'PENDING'}): ${m}`).join('\n');

  return `
Role: ${character.name}
User input: "${input}"
Turns Used: ${isOutOfTurns ? 'MAX LIMIT REACHED (Force End)' : 'Continue'}
Missions:
${status}

Lưu ý:
- Đây là tình huống giả tưởng, không được nói thẳng về nhiệm vụ của người chơi, chỉ trò chuyện tự nhiên như một nhân vật thật.
- Nếu user dùng ngôn ngữ khác không phải tiếng Nhật hoặc romaji, hãy nhắc nhở user chuyển sang tiếng Nhật.
- Luôn kiểm tra toàn bộ input với tất cả nhiệm vụ PENDING.
- Nếu user hoàn thành nhiều nhiệm vụ trong một lượt, hãy đánh dấu tất cả các nhiệm vụ đó.
- TUYỆT ĐỐI KHÔNG trả về "feedback" nếu vẫn còn nhiệm vụ PENDING và chưa hết lượt.
- CHỈ trả về "feedback" khi và chỉ khi:
  1. Tất cả nhiệm vụ (Mission 0, 1, 2) đều đã hoàn thành (bao gồm cả nhiệm vụ vừa hoàn thành trong lượt này).
  2. HOẶC Số lượt (turns) đã hết (isOutOfTurns: true).
- "Hết lượt" nghĩa là: Nếu Turns Used = "MAX LIMIT REACHED", BẮT BUỘC phải trả về feedback.
- Nếu bạn đánh dấu nhiệm vụ cuối cùng (khiến tất cả đều DONE), BẮT BUỘC trả về feedback ngay lập tức.

QUAN TRỌNG VỀ FEEDBACK (CHẤM ĐIỂM):
- "score": Chấm điểm dựa trên độ tự nhiên, ngữ pháp và từ vựng của USER.
- "mistakes": Chỉ liệt kê lỗi sai của USER. TUYỆT ĐỐI KHÔNG bắt lỗi lời thoại của chính bạn (AI).
- BẮT BUỘC DÙNG TIẾNG VIỆT cho các trường sau:
  + "comment": Nhận xét sự tiến bộ của USER.
  + "good_points": Nêu điểm tốt.
  + "reason": Giải thích lỗi sai.
- Bỏ qua các tin nhắn hệ thống (System prompts) khi chấm điểm.

[DATA_START]{ 
  "missions": ${JSON.stringify(missions)}, 
  "completed_indices": [indexes_in_this_turn], 
  "feedback": { 
    "score": 85, 
    "comment": "Bạn đã làm rất tốt, tuy nhiên cần chú ý kính ngữ...", 
    "good_points": "Phát âm chuẩn, từ vựng phong phú...", 
    "mistakes": [ 
      { "original": "Taberu", "fixed": "Tabemasu", "reason": "Nên dùng thể lịch sự với người lạ" } 
    ],
    "next_missions": [] 
  } 
}[DATA_END]
(Lời thoại tiếng Nhật hoặc nhắc nhở)
`;
};

/**
 * CHAT ONLY PROMPT (Agent 1: Conversationalist)
 * - Nhiệm vụ: Chỉ tập trung nói chuyện tự nhiên.
 * - KHÔNG quan tâm đến JSON hay check nhiệm vụ.
 * - MỤC TIÊU: Phản hồi siêu tốc.
 */
export const getChatOnlyPrompt = (character: Character, input: string) => `
Role: ${character.name}
User input: "${input}"
Context: Roleplay conversation (Japanese Learning).

Mục tiêu chính: Giúp User luyện tập nói tiếng Nhật.

QUY TẮC BẮT BUỘC (Priority High):
1. KIỂM TRA NGÔN NGỮ USER:
   - Nếu User nói Tiếng Việt/Anh/Khác (không phải Nhật/Romaji) -> NGỪNG ROLEPLAY.
   - Trả lời bằng tiếng Nhật: "Xin lỗi, tôi chỉ hiểu tiếng Nhật thôi. Bạn hãy nói lại bằng tiếng Nhật nhé?" (hoặc câu tương tự theo tính cách nhân vật).
   - KHÔNG ĐƯỢC trả lời nội dung user hỏi nếu họ không dùng tiếng Nhật.

2. NẾU USER NÓI TIẾNG NHẬT:
   - Đóng vai nhân vật ngoài đời thật và trả lời tự nhiên.
   - Không được trả lời bằng các emoji hoặc icon.
   - Ngắn gọn và kết thúc bằng 1 câu hỏi mở.

3. TUYỆT ĐỐI KHÔNG trả về JSON. Chỉ trả về text lời thoại.
`;

/**
 * LOGIC ONLY PROMPT (Agent 2: Referee)
 * - Nhiệm vụ: Check xem user đã hoàn thành nhiệm vụ chưa.
 * - KHÔNG cần nói chuyện. Chỉ trả về JSON.
 * - MỤC TIÊU: Chính xác.
 */
export const getLogicOnlyPrompt = (missions: string[], input: string) => `
Phân tích tin nhắn sau của User để kiểm tra nhiệm vụ: "${input}"
Danh sách nhiệm vụ:
${missions.map((m, i) => `${i}. ${m}`).join('\n')}

Yêu cầu BẮT BUỘC:
- CHỈ đánh dấu hoàn thành nếu User nói bằng TIẾNG NHẬT (hoặc Romaji).
- Nếu User nói bằng các ngôn ngữ khác (Tiếng Việt, Anh...) -> Trả về [] (KHÔNG hoàn thành) cho đến khi User nói lại Tiếng Nhật.
- Kể cả nếu User nói đúng nội dung nhiệm vụ nhưng bằng tiếng Việt -> Vẫn trả về [].
- Trả về JSON chứa danh sách index các nhiệm vụ đã hoàn thành.

Format Output:
[DATA_START]{ "completed_indices": [0, 2] }[DATA_END]
`;