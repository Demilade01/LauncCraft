"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Copy, Download, FileText, Code, FileCode, ArrowLeft, Check, Package, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormStore } from "@/lib/store/formStore";
import { generateLandingPage, generateMarkdown, generateHTML, generatePlainText, generateCSS, type LandingPageContent } from "@/lib/generators/landingPageGenerator";
import { formSchema, type FormData } from "@/lib/schemas/formSchema";
import { toast } from "sonner";
import { fadeInUp } from "@/lib/animations";

export default function PreviewPage() {
  const router = useRouter();
  const { formData, resetForm } = useFormStore();
  const [content, setContent] = useState<LandingPageContent | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateContent = async () => {
      // Validate form data
      const result = formSchema.safeParse(formData);
      if (!result.success) {
        toast.error("Invalid form data. Please complete the form first.");
        router.push("/form");
        return;
      }

      setIsGenerating(true);
      setError(null);

      try {
        // Try AI generation first
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(result.data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to generate with AI");
        }

        const { content: aiContent } = await response.json();
        setContent(aiContent);
        toast.success("Landing page generated with AI!");
      } catch (err) {
        console.error("AI generation failed, falling back to template:", err);
        // Fallback to template-based generation
        const generated = generateLandingPage(result.data);
        setContent(generated);
        toast.warning("Using template-based generation. Add OPENAI_API_KEY to your .env for AI-powered content.");
        setError(err instanceof Error ? err.message : "AI generation failed");
      } finally {
        setIsGenerating(false);
      }
    };

    generateContent();
  }, [formData, router]);

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      toast.success(`${type} copied to clipboard!`);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleDownload = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${filename}`);
  };

  const handleDownloadWebsite = () => {
    if (!content) return;

    // Create HTML with external CSS
    const htmlContent = generateHTML(content, false);
    const cssContent = generateCSS();

    // Create a zip-like structure by downloading both files
    // For now, we'll download them separately with instructions
    handleDownload(htmlContent, "index.html", "text/html");
    setTimeout(() => {
      handleDownload(cssContent, "styles.css", "text/css");
      toast.success("Website package downloaded! Extract both files to the same folder.");
    }, 500);
  };

  if (isGenerating || !content) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">
            {isGenerating ? "AI is crafting your landing page..." : "Loading preview..."}
          </p>
          {isGenerating && (
            <p className="text-sm text-muted-foreground">This may take a few seconds</p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Your Landing Page</h1>
                <p className="text-muted-foreground">
                  {error ? "Generated with template (AI unavailable)" : "AI-generated landing page"}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push("/form")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Edit
              </Button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Note:</strong> {error}. Using template-based generation. Add OPENAI_API_KEY to your .env file for AI-powered content.
                </p>
              </div>
            )}

            {/* Preview Content */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Main Preview */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Preview</CardTitle>
                        <CardDescription>Your generated landing page</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowLivePreview(!showLivePreview)}
                        className="gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        {showLivePreview ? "Hide" : "Show"} Live Preview
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {showLivePreview ? (
                      <div className="border rounded-lg overflow-hidden" style={{ height: "600px" }}>
                        <iframe
                          srcDoc={generateHTML(content, true)}
                          className="w-full h-full border-0"
                          title="Live Preview"
                        />
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {/* Hero Section */}
                        <section className="space-y-4">
                          <h1 className="text-3xl font-bold">{content.hero.headline}</h1>
                          <p className="text-lg text-muted-foreground">{content.hero.subheadline}</p>
                          <Button>{content.hero.ctaText}</Button>
                        </section>

                        <div className="border-t pt-8">
                          {/* Problem Section */}
                          <section className="space-y-4 mb-8">
                            <h2 className="text-2xl font-semibold">{content.problem.title}</h2>
                            <p className="text-muted-foreground whitespace-pre-line">{content.problem.description}</p>
                          </section>

                          {/* Solution Section */}
                          <section className="space-y-4 mb-8">
                            <h2 className="text-2xl font-semibold">{content.solution.title}</h2>
                            <p className="text-muted-foreground whitespace-pre-line">{content.solution.description}</p>
                            <div className="bg-muted p-4 rounded-lg">
                              <h3 className="font-semibold mb-2">Key Benefit</h3>
                              <p className="text-muted-foreground whitespace-pre-line">{content.solution.benefit}</p>
                            </div>
                          </section>

                          {/* Audience Section */}
                          <section className="space-y-4 mb-8">
                            <h2 className="text-2xl font-semibold">{content.audience.title}</h2>
                            <p className="text-muted-foreground whitespace-pre-line">{content.audience.description}</p>
                          </section>

                          {/* Features Section */}
                          <section className="space-y-4 mb-8">
                            <h2 className="text-2xl font-semibold">Why Choose Us</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {content.features.map((feature, index) => (
                                <div key={index} className="bg-muted p-4 rounded-lg">
                                  <h3 className="font-semibold mb-2">Feature {index + 1}</h3>
                                  <p className="text-sm text-muted-foreground">{feature}</p>
                                </div>
                              ))}
                            </div>
                          </section>

                          {/* Final CTA */}
                          <section className="space-y-4 text-center pt-8 border-t">
                            <h2 className="text-2xl font-semibold">Ready to Get Started?</h2>
                            <Button size="lg">{content.cta.text}</Button>
                          </section>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Export Options */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Export Options</CardTitle>
                    <CardDescription>Copy or download your content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                      onClick={() => handleCopy(generateMarkdown(content), "Markdown")}
                    >
                      {copied === "Markdown" ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <FileText className="w-4 h-4" />
                      )}
                      Copy Markdown
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                      onClick={() => handleCopy(generateHTML(content), "HTML")}
                    >
                      {copied === "HTML" ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Code className="w-4 h-4" />
                      )}
                      Copy HTML
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                      onClick={() => handleCopy(generatePlainText(content), "Plain Text")}
                    >
                      {copied === "Plain Text" ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <FileCode className="w-4 h-4" />
                      )}
                      Copy Plain Text
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Download</CardTitle>
                    <CardDescription>Save to your computer</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                      onClick={() => handleDownload(generateMarkdown(content), "landing-page.md", "text/markdown")}
                    >
                      <Download className="w-4 h-4" />
                      Download Markdown
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                      onClick={() => handleDownload(generateHTML(content), "landing-page.html", "text/html")}
                    >
                      <Download className="w-4 h-4" />
                      Download HTML
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                      onClick={() => handleDownload(generatePlainText(content), "landing-page.txt", "text/plain")}
                    >
                      <Download className="w-4 h-4" />
                      Download Plain Text
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Website Package</CardTitle>
                    <CardDescription>Complete deploy-ready website</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      className="w-full justify-start gap-2"
                      onClick={handleDownloadWebsite}
                    >
                      <Package className="w-4 h-4" />
                      Download Website Package
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Downloads HTML + CSS files ready to deploy
                    </p>
                  </CardContent>
                </Card>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    resetForm();
                    router.push("/form");
                  }}
                >
                  Create New Landing Page
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
  );
}

