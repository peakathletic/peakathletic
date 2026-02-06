import { GoogleGenAI } from "@google/genai";

// Initialize the client using the environment variable directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const improveText = async (text: string): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API Key is missing. Check process.env.API_KEY.");
    return text;
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional marketing copywriter for a high-end sports academy called "Peak Athletic Academy". Rewrite the following Arabic text to be more engaging, professional, and inspiring, while keeping the meaning intact. Output only the rewritten Arabic text.\n\nText: ${text}`,
    });
    return response.text?.trim() || text;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return text;
  }
};

export const searchInfo = async (query: string): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API Key is missing. Check process.env.API_KEY.");
    return "خدمة البحث غير متوفرة حالياً.";
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a sports expert. Provide a brief, factual summary (in Arabic) about the following sports topic suitable for a website description. Keep it under 50 words.\n\nTopic: ${query}`,
    });
    return response.text?.trim() || "لم يتم العثور على معلومات.";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "حدث خطأ أثناء الاتصال بخدمة الذكاء الاصطناعي.";
  }
};