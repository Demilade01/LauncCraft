"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  MessageSquare,
  Users,
  AlertCircle,
  Sparkles,
  MousePointerClick
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Describe Your Product",
    description: "Tell us what your product is and what it does in simple terms.",
  },
  {
    number: "02",
    icon: Users,
    title: "Define Your Audience",
    description: "Who is your product for? Help us understand your target customers.",
  },
  {
    number: "03",
    icon: AlertCircle,
    title: "Identify the Problem",
    description: "What problem does your product solve? What pain point does it address?",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Highlight the Benefit",
    description: "What's the main benefit? What value do users get from your product?",
  },
  {
    number: "05",
    icon: MousePointerClick,
    title: "Set Your Call-to-Action",
    description: "What action do you want visitors to take? Sign up, buy, learn more?",
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={staggerItem}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Five simple steps to transform your idea into a landing page.
          </motion.p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-chart-1 to-chart-2 transform -translate-y-1/2" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-4"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="relative"
                >
                  <Card className="h-full text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 group">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center">
                        <div className="relative mb-4">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-2">
                            <Icon className="w-8 h-8 text-primary" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                            {step.number}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

