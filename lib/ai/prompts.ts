import type { FormData } from "@/lib/schemas/formSchema";

export function createLandingPagePrompt(data: FormData): string {
  return `You are an expert copywriter specializing in conversion-optimized landing pages. Generate a complete, professional landing page based on the following product information:

Product Name: ${data.productName}
Product Description: ${data.productDescription}
Target Audience: ${data.targetAudience}
Problem Statement: ${data.problemStatement}
Main Benefit: ${data.mainBenefit}
CTA Text: ${data.ctaText}
CTA Type: ${data.ctaType}

Generate a landing page with the following structure. Return ONLY valid JSON in this exact format (no markdown, no code blocks):

{
  "hero": {
    "headline": "A compelling, benefit-focused headline (max 60 characters)",
    "subheadline": "A persuasive subheadline that expands on the headline (2-3 sentences)",
    "ctaText": "${data.ctaText}"
  },
  "problem": {
    "title": "A clear problem section title",
    "description": "A compelling description of the problem (2-3 sentences, engaging and relatable)"
  },
  "solution": {
    "title": "A solution section title that introduces ${data.productName}",
    "description": "A clear, benefit-focused description of the solution (3-4 sentences)",
    "benefit": "The main benefit restated in a compelling way (1-2 sentences)"
  },
  "audience": {
    "title": "A title that speaks to the target audience",
    "description": "A personalized description for ${data.targetAudience} (2-3 sentences, make them feel understood)"
  },
  "features": [
    "Feature 1: A compelling feature description (1 sentence)",
    "Feature 2: A compelling feature description (1 sentence)",
    "Feature 3: A compelling feature description (1 sentence)"
  ],
  "cta": {
    "text": "${data.ctaText}",
    "type": "${data.ctaType}"
  }
}

Requirements:
- Write in a professional, conversion-focused tone
- Make headlines compelling and benefit-driven
- Use active voice and action-oriented language
- Keep descriptions concise but persuasive
- Ensure all content is original and tailored to this specific product
- Features should be extracted from the product description and written as compelling benefits
- Make the audience feel understood and addressed directly
- Return ONLY the JSON object, no additional text or explanation`;
}

