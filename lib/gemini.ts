import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_AI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GOOGLE_AI_API_KEY");
}

const genAI = new GoogleGenerativeAI(apiKey);


export const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });