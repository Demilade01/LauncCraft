import OpenAI from "openai";
import type { FormData } from "@/lib/schemas/formSchema";
import type { LandingPageContent } from "@/lib/generators/landingPageGenerator";
import { createLandingPagePrompt } from "./prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateLandingPageWithAI(data: FormData): Promise<LandingPageContent> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured. Please add it to your .env file.");
  }

  const prompt = createLandingPagePrompt(data);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using gpt-4o-mini for cost-effectiveness, can upgrade to gpt-4 if needed
      messages: [
        {
          role: "system",
          content: "You are an expert copywriter specializing in conversion-optimized landing pages. Always return valid JSON only, no markdown formatting.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error("No response from AI");
    }

    // Parse the JSON response
    const content = JSON.parse(response) as LandingPageContent;

    // Validate the structure
    if (!content.hero || !content.problem || !content.solution || !content.audience || !content.features) {
      throw new Error("Invalid response structure from AI");
    }

    return content;
  } catch (error) {
    console.error("AI generation error:", error);
    if (error instanceof Error) {
      throw new Error(`AI generation failed: ${error.message}`);
    }
    throw new Error("AI generation failed: Unknown error");
  }
}

