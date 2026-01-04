
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are the "JRJ Bespoke Design Studio AI," an expert interior architect and master plumber. 
You specialize in luxury bathroom renovations and high-end heating systems.

YOUR GOALS:
1. DESIGN VISUALIZATION: If a user describes a design or asks to "see" a change, use your image generation capabilities. Focus on luxury materials: brushed gold fixtures, Venetian plaster, zellige tiles, and freestanding stone baths.
2. TECHNICAL ACCURACY: Provide expert advice on boiler efficiency, underfloor heating, and drainage logistics.
3. CONCIERGE SERVICE: Be exceptionally professional and helpful.

IF GENERATING IMAGES:
Always create photorealistic, high-end architectural renders that match the JRJ luxury aesthetic (Teal accents, high-quality finishes).

IF ANALYZING USER PHOTOS:
Identify exact issues or style elements and suggest premium upgrades.`;

export const getGeminiResponse = async (
  prompt: string, 
  base64Image?: string, 
  mimeType?: string
): Promise<{ text: string; generatedImageUrl?: string }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  // Decide which model to use. If the user wants to "see" something or "generate", use the image model.
  const isVisualRequest = /see|show|generate|visualize|look like|design a|render|draw|picture/i.test(prompt);
  const modelName = isVisualRequest ? 'gemini-2.5-flash-image' : 'gemini-3-flash-preview';

  try {
    const parts: any[] = [{ text: prompt }];
    
    if (base64Image && mimeType) {
      parts.push({
        inlineData: {
          data: base64Image,
          mimeType: mimeType
        }
      });
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: { parts },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        ...(isVisualRequest ? { imageConfig: { aspectRatio: "1:1" } } : {})
      },
    });

    let textOutput = response.text || "";
    let generatedImageUrl: string | undefined = undefined;

    // Check for generated images in the parts
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    return { 
      text: textOutput || (generatedImageUrl ? "Here is a visualization of your design concept:" : "I've processed your request."), 
      generatedImageUrl 
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "I'm having a little trouble connecting to my design core. Please try again in a moment." };
  }
};
