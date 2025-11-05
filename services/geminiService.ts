
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Edits an image using a text prompt with the Gemini 2.5 Flash Image model.
 * @param prompt - The text prompt describing the desired edit.
 * @param imageBase64 - The base64 encoded string of the image to edit.
 * @param mimeType - The MIME type of the image (e.g., 'image/jpeg').
 * @returns A promise that resolves to the base64 encoded string of the edited image.
 */
export const editImage = async (
  prompt: string,
  imageBase64: string,
  mimeType: string
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageBase64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    // Find the first part that contains image data
    for (const candidate of response.candidates ?? []) {
      for (const part of candidate.content.parts) {
        if (part.inlineData?.data) {
          return part.inlineData.data;
        }
      }
    }
    
    throw new Error('No image was generated in the response.');
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to generate image. Please check your prompt or try again.');
  }
};
