//app/roleplay/types.ts
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
  role: 'user' | 'assistant';
  content: string;
};

export type FeedbackData = {
  score: number;
  good_points: string;
  mistakes: Array<{ original: string; fixed: string; reason: string }>;
  next_missions: string[];
};