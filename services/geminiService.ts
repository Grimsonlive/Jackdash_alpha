
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * Handles error responses from the Gemini API and returns a user-friendly, 
 * descriptive string appropriate for the JACKDASH dashboard terminal.
 */
const handleAIError = (error: any): string => {
  console.error("Gemini API Error Detail:", error);
  
  const message = error?.message || "";
  const status = error?.status || error?.response?.status;

  // Key or Project issues
  if (message.includes("API_KEY") || message.includes("not found")) {
    return "ERR: Intelligence link failed. Verify API Key bridge configuration.";
  }
  
  // Rate limiting (429)
  if (status === 429) {
    return "ERR: Neural throughput exceeded. Throttling active. Standby for recovery.";
  }
  
  // Server-side errors (5xx)
  if (status >= 500) {
    return "ERR: Cognitive dissonance in neural cluster. Server unresponsive.";
  }

  // Safety filter triggers
  if (message.toLowerCase().includes("safety")) {
    return "ERR: Safety protocol violation. Directive purged by internal filters.";
  }

  // General fallback
  return `ERR: Operational anomaly [Code: ${status || 'UNK'}]. Neural uplink severed.`;
};

export const generateNextStep = async (projectType: string, currentStatus: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on a ${projectType} project currently in ${currentStatus} phase, generate a professional 'next step' action. Keep it concise (under 20 words).`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "Review and refine current project parameters.";
  } catch (error) {
    return handleAIError(error);
  }
};

export const generateCreativeInspiration = async (theme: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 3 creative prompts or material ideas for a project with the theme: "${theme}". Return as a bulleted list.`,
    });
    return response.text || "No inspiration available in the current sector.";
  } catch (error) {
    return handleAIError(error);
  }
};

export const generateSunoPrompt = async (genre: string, mood: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Design a Suno AI music prompt for a ${genre} track that feels ${mood}. Include descriptors for production style and instrumentation.`,
    });
    return response.text || "Vibrant electronic pop with heavy bass and crystal synths.";
  } catch (error) {
    return handleAIError(error);
  }
};
