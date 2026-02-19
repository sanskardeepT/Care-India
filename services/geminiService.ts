
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the AI client using the environment variable
// In this environment, process.env.API_KEY is automatically injected.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * Dr.AI Symptom Checker
 * Provides extremely concise medical triage information.
 */
export const drAI = async (symptoms: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User Symptoms: "${symptoms}".
      
      Response Format:
      - Brief Summary (max 2 sentences)
      - 3 Potential Causes (bullet points)
      - 2 Recommended Steps (bullet points)
      - Short Medical Disclaimer`,
      config: {
        systemInstruction: "You are Dr.AI. Be extremely brief. Use simple language. Do not exceed 100 words total. Always end with: 'Disclaimer: AI advice only, consult a doctor.'",
      }
    });

    return response.text || "I couldn't analyze those symptoms. Please try again with more detail.";
  } catch (error) {
    console.error('Dr.AI Service Error:', error);
    return "I'm currently offline. Please check back in a few minutes.";
  }
};

/**
 * AI Generic Medicine Finder
 * Maps brand names to generic alternatives with approximate pricing.
 */
export const findGenericMedicine = async (brandName: string): Promise<any> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Find 2-3 generic alternatives for: "${brandName}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            brand: { type: Type.STRING },
            generics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  usage: { type: Type.STRING },
                  approxPriceINR: { type: Type.NUMBER }
                },
                required: ["name", "usage"]
              }
            }
          },
          required: ["brand", "generics"]
        }
      }
    });

    if (!response.text) throw new Error("Empty AI response");
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error('Pharmacy AI Error:', error);
    throw new Error("Medicine not found in our AI database.");
  }
};

/**
 * AI Specialist Triage
 */
export const getSpecialistAdvice = async (symptoms: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Symptoms: "${symptoms}". Suggest the most relevant medical specialist category (e.g., ENT, Cardiologist).`,
    });

    return response.text || "General Physician";
  } catch (error) {
    return "General Physician";
  }
};
