
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { symptoms } = req.body;
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on these symptoms: "${symptoms}", suggest which type of specialist doctor should be consulted. Provide only the specialist name and a one-sentence reason.`,
      config: {
        systemInstruction: "You are a medical triage assistant. Your goal is to point users to the right specialty. Always include a disclaimer.",
      }
    });

    const text = response.text || "Consult a General Physician.";
    res.status(200).json({ text });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to generate specialist advice' });
  }
}
