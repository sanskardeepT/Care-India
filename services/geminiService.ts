import { GoogleGenAI, Type } from "@google/genai";

const getAI = () =>
  new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

export const drAI = async (symptoms: string): Promise<string> => {
  try {
    const ai = getAI();

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User Symptoms: "${symptoms}".

Response Format:
- Brief Summary (max 2 sentences)
- 3 Potential Causes (bullet points)
- 2 Recommended Steps (bullet points)
- Short Medical Disclaimer`,
      config: {
        systemInstruction:
          "You are Dr.AI. Be extremely brief. Use simple language. Do not exceed 100 words total. Always end with: 'Disclaimer: AI advice only, consult a doctor.'",
      },
    });

    return (
      response.text ||
      "I couldn't analyze those symptoms. Please try again with more detail."
    );
  } catch (error) {
    console.error("Dr.AI Service Error:", error);
    return "I'm currently offline. Please check back in a few minutes.";
  }
};

export const findGenericMedicine = async (
  brandName: string
): Promise<any> => {
  try {
    const ai = getAI();

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
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
                  approxPriceINR: { type: Type.NUMBER },
                },
                required: ["name", "usage"],
              },
            },
          },
          required: ["brand", "generics"],
        },
      },
    });

    if (!response.text) throw new Error("Empty AI response");

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Pharmacy AI Error:", error);
    throw new Error("Medicine not found in our AI database.");
  }
};

export const getSpecialistAdvice = async (
  symptoms: string
): Promise<string> => {
  try {
    const ai = getAI();

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Symptoms: "${symptoms}". Suggest the most relevant medical specialist category.`,
    });

    return response.text || "General Physician";
  } catch (error) {
    return "General Physician";
  }
};
