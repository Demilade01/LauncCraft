"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StepIndicator } from "./StepIndicator";
import { useFormStore } from "@/lib/store/formStore";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  type FormData,
} from "@/lib/schemas/formSchema";
import { fadeInUp } from "@/lib/animations";
import type { z } from "zod";

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;
type Step4Data = z.infer<typeof step4Schema>;
type Step5Data = z.infer<typeof step5Schema>;

const stepSchemas = [step1Schema, step2Schema, step3Schema, step4Schema, step5Schema] as const;

export function MultiStepForm() {
  const router = useRouter();
  const { formData, currentStep, updateFormData, nextStep, previousStep } = useFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCurrentSchema = () => stepSchemas[currentStep - 1];

  const form = useForm<FormData>({
    resolver: zodResolver(getCurrentSchema()) as any,
    defaultValues: formData as FormData,
    mode: "onChange",
  });

  // Update form when step changes
  useEffect(() => {
    form.reset(formData as FormData);
    form.clearErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const onSubmit = async (data: any) => {
    if (currentStep < 5) {
      updateFormData(data);
      nextStep();
    } else {
      setIsSubmitting(true);
      updateFormData(data);
      // Navigate to preview page
      router.push("/preview");
    }
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      const currentValues = form.getValues();
      updateFormData(currentValues);
      previousStep();
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <StepIndicator currentStep={currentStep} totalSteps={5} />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-full"
            >
              {/* Step 1: Product Description */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">Describe Your Product</h2>
                    <p className="text-muted-foreground">
                      Tell us what your product is and what it does
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., TaskMaster Pro"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The name of your product or service
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="productDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe what your product does, its main features, and how it works..."
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a clear description of your product (10-500 characters)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 2: Target Audience */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">Define Your Audience</h2>
                    <p className="text-muted-foreground">
                      Who is your product for?
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="targetAudience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Audience</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Small business owners who struggle with task management and need a simple solution to organize their daily work..."
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Describe your ideal customers and their characteristics
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 3: Problem Statement */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">Identify the Problem</h2>
                    <p className="text-muted-foreground">
                      What problem does your product solve?
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="problemStatement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Problem Statement</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Many professionals waste hours switching between multiple tools to manage tasks, leading to missed deadlines and decreased productivity..."
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Describe the pain point or challenge your product addresses
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 4: Main Benefit */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">Highlight the Benefit</h2>
                    <p className="text-muted-foreground">
                      What's the main value your product provides?
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="mainBenefit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Main Benefit</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Save 10 hours per week by consolidating all your tasks in one intuitive platform..."
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          What value or benefit do users get from your product?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 5: Call-to-Action */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">Set Your Call-to-Action</h2>
                    <p className="text-muted-foreground">
                      What action do you want visitors to take?
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="ctaType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CTA Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select CTA type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="signup">Sign Up</SelectItem>
                            <SelectItem value="trial">Start Free Trial</SelectItem>
                            <SelectItem value="buy">Buy Now</SelectItem>
                            <SelectItem value="learn">Learn More</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose the type of action you want visitors to take
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ctaText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CTA Button Text</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Get Started Free"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The text that appears on your call-to-action button
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            <Button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="gap-2"
            >
              {currentStep === 5 ? (
                <>
                  Generate Landing Page
                  <Sparkles className="w-4 h-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
}

