
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { symptoms } = req.body;
  if (!symptoms) {
    return res.status(400).json({ error: 'Symptoms are required' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As Dr.AI, analyze: "${symptoms}". Provide a VERY brief summary (max 3 sentences), 3 key potential causes, and 2 next steps. Be concise.`,
      config: {
        systemInstruction: "You are Dr.AI, a highly concise health assistant. Use minimal words. Always include a short medical disclaimer stating you are an AI. Do not exceed 150 words total.",
      }
    });

    const text = response.text || "No response generated.";
    res.status(200).json({ text });
  } catch (error: any) {
    console.error('Dr.AI API Error:', error);
    res.status(500).json({ error: 'Failed to process symptom check' });
  }
}
