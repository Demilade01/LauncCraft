"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";

const benefits = [
  "Save hours of writing and rewriting",
  "Get professional-quality copy instantly",
  "Focus on building, not writing",
  "Launch faster with ready-to-use content",
  "No copywriting experience needed",
  "Clear, conversion-focused messaging",
];

export function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            variants={staggerItem}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            Why Launchcraft?
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-xl text-muted-foreground mb-12"
          >
            Everything you need to turn your product idea into a landing page that converts.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="flex items-start gap-3 p-4 rounded-lg bg-background border border-border hover:border-primary/20 transition-colors"
              >
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-lg">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

