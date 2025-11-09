
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    questionType: {
      type: Type.STRING,
      description: 'The type of IELTS Writing Task 2 question in English, followed by the Vietnamese translation in parentheses. Example: "Opinion Essay (Bài luận ý kiến)".',
    },
    essayStructure: {
      type: Type.OBJECT,
      properties: {
        introduction: {
          type: Type.STRING,
          description: 'Guidance in English on how to write the introduction, followed by the Vietnamese translation in parentheses. Example: "Begin by paraphrasing the prompt... (Bắt đầu bằng cách diễn giải lại đề bài...)"',
        },
        bodyParagraph1: {
          type: Type.STRING,
          description: 'Guidance in English for the first body paragraph, followed by the Vietnamese translation in parentheses. It should include a clear topic sentence, explanations, and a specific example.',
        },
        bodyParagraph2: {
          type: Type.STRING,
          description: 'Guidance in English for the second body paragraph, followed by the Vietnamese translation in parentheses, following the same structure as the first.',
        },
        conclusion: {
          type: Type.STRING,
          description: 'Guidance in English on how to write the conclusion, followed by the Vietnamese translation in parentheses. It should summarize the main points and restate the thesis.',
        },
      },
      required: ['introduction', 'bodyParagraph1', 'bodyParagraph2', 'conclusion'],
    },
    suggestedVocabulary: {
      type: Type.ARRAY,
      description: 'A list of 10-15 useful vocabulary words or phrases. Each item should be in the format "English Word/Phrase (Vietnamese Meaning)".',
      items: {
        type: Type.STRING,
      },
    },
  },
  required: ['questionType', 'essayStructure', 'suggestedVocabulary'],
};

export const analyzeIeltsPrompt = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following IELTS Writing Task 2 prompt and provide a detailed guide for a student. Provide both English and its Vietnamese translation for all textual guidance as specified in the schema. Prompt: "${prompt}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "You are an expert IELTS Writing Task 2 tutor who is fluent in both English and Vietnamese. Your task is to analyze an essay prompt and provide a detailed guide for a Vietnamese student. For every piece of guidance (question type, structure explanations, vocabulary), you MUST provide the English text followed by its Vietnamese translation in parentheses. Respond ONLY with the JSON object specified in the response schema. Ensure the guidance is practical and helps the student achieve a high band score.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing prompt:", error);
    if (error instanceof Error) {
      return Promise.reject(new Error(`Failed to get analysis from Gemini API: ${error.message}`));
    }
    return Promise.reject(new Error("An unknown error occurred while analyzing the prompt."));
  }
};
