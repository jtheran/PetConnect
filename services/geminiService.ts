
import { GoogleGenAI } from "@google/genai";

// FIX: Initialize GoogleGenAI with API_KEY from environment variables as per guidelines.
// The API key MUST be obtained exclusively from `process.env.API_KEY`.
// Also, removed the fallback logic for when API_KEY is not present.
// As per guidelines, we assume API_KEY is always available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePetBio = async (petName: string, petBreed: string): Promise<string> => {
  try {
    const prompt = `Create a short, fun, and quirky social media bio for a pet. The pet's name is ${petName} and it is a ${petBreed}. The bio should be from the pet's perspective. Keep it under 50 words and do not use hashtags.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    // Per guidelines, access the text directly from the response.
    return response.text.trim();
  } catch (error) {
    console.error("Error generating pet bio:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};
