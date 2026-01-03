"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Zap,
  FileText,
  Target,
  Rocket,
  Sparkles as SparklesIcon,
  Wand2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { staggerContainer, staggerItem } from "@/lib/animations";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate your landing page copy in minutes, not hours. No design skills required.",
  },
  {
    icon: FileText,
    title: "Structured Copy",
    description: "Get well-organized, conversion-focused copy that's ready to use immediately.",
  },
  {
    icon: Target,
    title: "Clear Messaging",
    description: "Turn your product idea into clear, compelling messaging that resonates with your audience.",
  },
  {
    icon: Rocket,
    title: "Conversion Ready",
    description: "Every section is crafted to guide visitors toward your call-to-action.",
  },
  {
    icon: SparklesIcon,
    title: "Guided Process",
    description: "Answer a few simple questions and watch your landing page come together.",
  },
  {
    icon: Wand2,
    title: "Professional Quality",
    description: "Get landing page copy that looks like it was written by a professional copywriter.",
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-24 sm:py-32 bg-background">
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
            Everything You Need
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            A complete solution for turning your product ideas into landing pages that convert.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={staggerItem}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

