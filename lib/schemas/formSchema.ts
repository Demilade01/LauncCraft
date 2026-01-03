import { z } from "zod";

export const formSchema = z.object({
  // Step 1: Product Description
  productName: z.string().min(1, "Product name is required").max(100, "Product name is too long"),
  productDescription: z.string().min(10, "Please provide at least 10 characters").max(500, "Description is too long"),

  // Step 2: Target Audience
  targetAudience: z.string().min(1, "Target audience is required").max(200, "Description is too long"),

  // Step 3: Problem Statement
  problemStatement: z.string().min(10, "Please provide at least 10 characters").max(500, "Problem statement is too long"),

  // Step 4: Main Benefit
  mainBenefit: z.string().min(10, "Please provide at least 10 characters").max(300, "Benefit description is too long"),

  // Step 5: Call-to-Action
  ctaText: z.string().min(1, "CTA text is required").max(50, "CTA text is too long"),
  ctaType: z.enum(["signup", "buy", "learn", "trial", "custom"]),
});

export type FormData = z.infer<typeof formSchema>;

// Step-by-step schemas for validation
export const step1Schema = formSchema.pick({ productName: true, productDescription: true });
export const step2Schema = formSchema.pick({ targetAudience: true });
export const step3Schema = formSchema.pick({ problemStatement: true });
export const step4Schema = formSchema.pick({ mainBenefit: true });
export const step5Schema = formSchema.pick({ ctaText: true, ctaType: true });

