import { NextRequest, NextResponse } from "next/server";
import { generateLandingPageWithAI } from "@/lib/ai/generateLandingPage";
import { formSchema } from "@/lib/schemas/formSchema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the form data
    const validationResult = formSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: validationResult.error.issues },
        { status: 400 }
      );
    }

    // Generate landing page with AI
    const content = await generateLandingPageWithAI(validationResult.data);

    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate landing page",
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

