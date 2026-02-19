
import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { brandName } = req.body;
  if (!brandName) {
    return res.status(400).json({ error: 'Brand name is required' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Find generic alternatives for the medicine brand: "${brandName}".`,
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

    const result = JSON.parse(response.text || "{}");
    res.status(200).json(result);
  } catch (error: any) {
    console.error('Medicine API Error:', error);
    res.status(500).json({ error: 'Failed to find generic alternatives' });
  }
}
