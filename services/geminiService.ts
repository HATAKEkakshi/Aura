import { GoogleGenAI } from "@google/genai";
import type { Message, Emotion } from '../types';

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getAuraResponse = async (userMessage: string, userEmotion: Emotion, currentHistory: Message[]): Promise<string> => {
  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: `You are Aura, a confidential AI companion. The user seems to be feeling: ${userEmotion}. User message: "${userMessage}"`
    });
    return result.text;
  } catch (error) {
    console.error("Gemini API error in getAuraResponse:", error);
    throw new Error("Failed to get response from Gemini API.");
  }
};

export const getPositiveAffirmation = async (): Promise<string> => {
  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: "Give me a single, powerful, positive affirmation for someone feeling stressed or anxious."
    });
    return result.text;
  } catch (error) {
    console.error("Gemini API error in getPositiveAffirmation:", error);
    throw new Error("Failed to get affirmation from Gemini API.");
  }
};