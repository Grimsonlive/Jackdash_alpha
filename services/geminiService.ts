
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateNextStep = async (projectType: string, currentStatus: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on a ${projectType} project currently in ${currentStatus} phase, generate a professional 'next step' action. Keep it concise (under 20 words).`,
    config: {
      temperature: 0.7,
    }
  });
  return response.text || "Continue progress on the current milestone.";
};

export const generateCreativeInspiration = async (theme: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 3 creative prompts or material ideas for a project with the theme: "${theme}". Return as a bulleted list.`,
  });
  return response.text || "No inspiration available at the moment.";
};

export const generateSunoPrompt = async (genre: string, mood: string) => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Design a Suno AI music prompt for a ${genre} track that feels ${mood}. Include descriptors for production style and instrumentation.`,
    });
    return response.text || "Vibrant electronic pop with heavy bass and crystal synths.";
}
