import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_AI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GOOGLE_AI_API_KEY");
}

const genAI = new GoogleGenerativeAI(apiKey);

// Sử dụng model gemini-1.5-flash cho tốc độ nhanh hoặc gemini-1.5-pro cho độ chính xác cao
export const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });