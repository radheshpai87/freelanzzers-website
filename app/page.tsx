import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { CommercialPromiseSection } from "@/components/landing/commercial-promise-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";
import { ScrollMotion } from "@/components/landing/scroll-motion";

export default function Home() {
  return <main className="relative min-h-screen overflow-x-hidden"><Navigation /><HeroSection /><ScrollMotion><FeaturesSection /></ScrollMotion><ScrollMotion><CommercialPromiseSection /></ScrollMotion><ScrollMotion><PricingSection /></ScrollMotion><ScrollMotion><CtaSection /></ScrollMotion><ScrollMotion><FooterSection /></ScrollMotion></main>;
}
