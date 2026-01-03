"use client";

import { motion } from "framer-motion";
import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fadeInUp } from "@/lib/animations";

export function CTASection() {
  return (
    <section id="get-started" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-chart-1/20 to-chart-2/20" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-64 h-64 bg-chart-2/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6"
        >
          <Rocket className="w-10 h-10 text-primary" />
        </motion.div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          Ready to Launch?
        </h2>
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Turn your product idea into a conversion-ready landing page in minutes.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            asChild
            size="lg"
            className="text-lg px-10 py-7 rounded-full group"
          >
            <Link href="/form">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>

        <p className="text-sm text-muted-foreground mt-6">
          No credit card required • Free forever
        </p>
      </motion.div>
    </section>
  );
}

