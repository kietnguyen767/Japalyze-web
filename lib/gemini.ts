import { GoogleGenerativeAI } from "@google/generative-ai";

// Hàm khởi tạo model lazily để tránh lỗi khi build trên Vercel (nếu thiếu env key lúc build)
const getGeminiModel = () => {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    console.warn("Missing GOOGLE_AI_API_KEY. Gemini features will not work.");
    // Trả về một object giả lập hoặc ném lỗi khi thực sự gọi hàm
    return {
      generateContent: async () => {
        throw new Error("GOOGLE_AI_API_KEY is not configured.");
      }
    } as any;
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
};

export const geminiModel = getGeminiModel();
