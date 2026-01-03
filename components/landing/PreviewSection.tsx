"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fadeInUp, scaleIn } from "@/lib/animations";

export function PreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get a preview of what your landing page will look like.
          </p>
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-2 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-primary/10 via-chart-1/10 to-chart-2/10 border-b">
              <CardTitle className="text-2xl">Your Generated Landing Page</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {/* Hero Section Preview */}
              <div className="space-y-4">
                <div className="h-8 bg-primary/20 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-5/6" />
                <div className="h-12 bg-primary rounded-lg w-48 mt-4" />
              </div>

              {/* Features Preview */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-muted rounded w-2/3" />
                    <div className="h-3 bg-muted/50 rounded w-full" />
                    <div className="h-3 bg-muted/50 rounded w-4/5" />
                  </div>
                ))}
              </div>

              {/* CTA Preview */}
              <div className="pt-6 border-t text-center">
                <div className="h-6 bg-muted rounded w-1/2 mx-auto mb-4" />
                <div className="h-12 bg-primary/20 rounded-lg w-64 mx-auto" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

