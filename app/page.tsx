import { Navigation } from "@/components/landing/Navigation";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { PreviewSection } from "@/components/landing/PreviewSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { CTASection } from "@/components/landing/CTASection";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative overflow-hidden">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PreviewSection />
        <BenefitsSection />
        <CTASection />
      </main>
    </>
  );
}
