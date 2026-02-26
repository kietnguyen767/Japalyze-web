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
// 4. PROMPTS (Strict English Instructions for better LLM performance)
// =========================================================

/**
 * SYSTEM PROMPT
 * ▶ KEY: GOOGLE_AI_API_KEY_LOGIC
 * ▶ PURPOSE: Set persona and context.
 */
export const getSystemInstruction = (character: Character, topic: string) => `
# ROLE
You are ${character.name}, a Japanese person.

# CONTEXT
You are in a roleplay session with the User about the topic: "${topic}".

# PERSONALITY
${character.personality}

# STRICT RULES
1. Interact with the User in 100% Japanese.
2. Keep your responses natural, engaging, and concise.
3. LANGUAGE ENFORCEMENT: If the User speaks in any language other than Japanese (e.g., Vietnamese, English), politely remind them in character to use Japanese.
4. DO NOT explain grammar or provide translations unless it fits the character.

# OUTPUT FORMAT
You MUST always include a JSON status update before your dialogue:
[DATA_START]{ "completed_indices": [list of task indices achieved in current turn, e.g., 0, 2] }[DATA_END]
(Your Japanese dialogue here)
`;

/**
 * TRIGGER MESSAGE
 * ▶ PURPOSE: Initialize session with specific missions.
 */
export const getTriggerMessage = (topic: string, assignedMissions: string[]) => [
  {
    role: 'user',
    content: `
# START ROLEPLAY
Topic: "${topic}"

# ASSIGNED MISSIONS for User (Keep these in mind silently):
${assignedMissions.map((m, i) => `${i}. ${m}`).join('\n')}

# YOUR INITIAL TASK:
1. Greet the User in Japanese based on your personality (1 short sentence).
2. Return the initial JSON status.
3. IMPORTANT: Since this is the start, "completed_indices" MUST be an empty array [].

# MANDATORY FORMAT:
[DATA_START]{ "missions": ${JSON.stringify(assignedMissions)}, "completed_indices": [] }[DATA_END]
`
  }
];

/**
 * CHAT ONLY PROMPT — Agent 1: Conversationalist
 * ▶ KEY: GOOGLE_AI_API_KEY_CHAT
 */
export const getChatOnlyPrompt = (character: Character, input: string) => `
# ROLE
You are ${character.name}.

# USER INPUT
"${input}"

# OBJECTIVE
Reply naturally in Japanese to help the User practice speaking.

# STRICT RULES
1. LANGUAGE CHECK: If User input is NOT in Japanese/Romaji (e.g., Vietnamese/English):
   - STOP roleplaying.
   - Reply in Japanese: "I'm sorry, I only understand Japanese. Please speak in Japanese." (Adapt to character persona).
   - DO NOT answer the user's question if it's not in Japanese.
2. IF USER SPEAKS JAPANESE:
   - Stay in character.
   - Do NOT use emojis.
   - Keep it concise and end with an open-ended question.
3. NEVER output JSON. Return plain text only.
`;

/**
 * LOGIC ONLY PROMPT — Agent 2: Referee
 * ▶ KEY: GOOGLE_AI_API_KEY_LOGIC
 */
export const getLogicOnlyPrompt = (missions: string[], input: string) => `
# TASK
Analyze the User's input to check for mission completion: "${input}"

# MISSIONS LIST
${missions.map((m, i) => `${i}. ${m}`).join('\n')}

# EVALUATION RULES
1. Only mark a mission as completed if the User spoke in JAPANESE (or Romaji).
2. If the User used other languages (Vietnamese/English/etc.) -> Return an empty list [] even if the content matches.
3. Return ONLY a JSON object containing the indices of newly completed missions.

# FORMAT
[DATA_START]{ "completed_indices": [0, 2] }[DATA_END]
`;

/**
 * GRADING PROMPT — Agent 3: Examiner
 * ▶ KEY: GOOGLE_AI_API_KEY_GRADING
 */
export const getGradingPrompt = (
  missions: string[],
  completedMissions: boolean[]
) => {
  const status = missions
    .map((m, i) => `${i + 1}. [${completedMissions[i] ? '✓' : '✗'}] ${m}`)
    .join('\n');

  return `
# ROLE
You are a professional Japanese language examiner.

# TASK
Evaluate the User's Japanese performance from the chat history. (Do NOT evaluate the AI).

# MISSION STATUS
${status}

# GRADING SCALE (Target: N5/N4 proficiency)
- S (90-100): Fluent, correct grammar, maybe 1 tiny mistake.
- A (75-89): Successful communication, 2-3 minor errors OK.
- B (55-74): Meaning understood despite significant errors.
- C (35-54): Many errors / Heavy reliance on Romaji.
- D (0-34): Little to no Japanese used.

# OUTPUT LANGUAGE
You MUST use VIETNAMESE for "comment", "good_points", and the "reason" in mistakes.

# OUTPUT FORMAT (Strict JSON)
[DATA_START]{"feedback":{"score":0,"comment":"(Vietnamese)","good_points":"(Vietnamese)","mistakes":[{"original":"","fixed":"","reason":"(Vietnamese)"}]}}[DATA_END]
`;
};
