import { GoogleGenAI, Type } from "@google/genai";

const getAI = () =>
  new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY?.trim(),
  });

const medicineFallbacks: Record<string, { brand: string; generics: Array<{ name: string; usage: string; approxPriceINR?: number }> }> = {
  lipitor: {
    brand: 'Lipitor',
    generics: [
      { name: 'Atorvastatin 10mg', usage: 'Used to help manage cholesterol levels.', approxPriceINR: 120 },
      { name: 'Atorvastatin 20mg', usage: 'Used when a stronger cholesterol-lowering dose is needed.', approxPriceINR: 180 },
    ],
  },
  crocin: {
    brand: 'Crocin',
    generics: [
      { name: 'Paracetamol 500mg', usage: 'Used for fever and mild pain relief.', approxPriceINR: 20 },
      { name: 'Acetaminophen 650mg', usage: 'Used for fever and body ache relief.', approxPriceINR: 35 },
    ],
  },
  dolo: {
    brand: 'Dolo',
    generics: [
      { name: 'Paracetamol 650mg', usage: 'Used for fever and mild to moderate pain.', approxPriceINR: 30 },
      { name: 'Paracetamol 500mg', usage: 'Used for common fever and headache relief.', approxPriceINR: 20 },
    ],
  },
  augmentin: {
    brand: 'Augmentin',
    generics: [
      { name: 'Amoxicillin + Clavulanate', usage: 'Common antibiotic combination used only on a doctor’s advice.', approxPriceINR: 180 },
      { name: 'Co-amoxiclav', usage: 'Antibiotic alternative from the same generic combination.', approxPriceINR: 210 },
    ],
  },
};

const buildMedicineFallback = (brandName: string) => {
  const normalized = brandName.trim().toLowerCase();
  const direct = medicineFallbacks[normalized];

  if (direct) {
    return direct;
  }

  return {
    brand: brandName,
    generics: [
      {
        name: `${brandName} generic equivalent`,
        usage: 'Ask a licensed pharmacist for the exact salt composition and equivalent generic option.',
      },
      {
        name: 'Pharmacist consultation recommended',
        usage: 'Use the medicine strip or prescription to confirm the active ingredient before purchase.',
      },
    ],
  };
};

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
    return [
      'Brief Summary',
      'I could not reach the live AI service right now.',
      '',
      'Potential Causes',
      '- Viral infection',
      '- Dehydration or fatigue',
      '- Stress-related symptoms',
      '',
      'Recommended Steps',
      '- Rest, hydrate, and monitor your symptoms.',
      '- Seek medical help if symptoms worsen or persist.',
      '',
      'Disclaimer: AI advice only, consult a doctor.',
    ].join('\n');
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
    return buildMedicineFallback(brandName);
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
