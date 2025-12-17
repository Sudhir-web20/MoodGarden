
import { GoogleGenAI, Chat } from "@google/genai";
import { MoodType, MoodEntry } from "./types";

export const getGardenWisdom = async (mood: MoodType, note: string): Promise<string> => {
  if (!process.env.API_KEY) return "The garden listens in silence today.";

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `User feels ${mood}. Their note: "${note}". Provide a short, poetic "Garden Wisdom" reflection (max 20 words) that uses a plant or nature metaphor to acknowledge their feelings and offer gentle encouragement.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text?.trim() || "Every season in the garden serves a purpose.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Even in the shadows, roots grow stronger.";
  }
};

export const createGardenChat = (recentEntries: MoodEntry[]): Chat => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const gardenSummary = recentEntries.length > 0 
    ? `The user's recent moods are: ${recentEntries.map(e => e.mood).slice(0, 5).join(', ')}.`
    : "The garden is currently empty and waiting for its first seeds.";

  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the Guardian Spirit of the MoodGarden. Your personality is gentle, poetic, and wise. You help users reflect on their emotional journey using nature metaphors (roots, soil, sunlight, storms, seasons). 
      ${gardenSummary}
      When users talk about their feelings, respond with empathy and help them see their emotions as part of a natural growth cycle. Keep responses relatively concise but deeply meaningful.`,
      temperature: 0.8,
    },
  });
};
