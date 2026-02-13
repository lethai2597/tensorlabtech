"use client";

import { HeroSection } from "./sections/HeroSection";
import { LogoCloudSection } from "./sections/LogoCloudSection";
import { ScrollRevealHeadlineSection } from "./sections/ScrollRevealHeadlineSection";
import { CapabilitiesSection } from "./sections/CapabilitiesSection";
import { EngagementModelsSection } from "./sections/EngagementModelsSection";
import { DeliveryProcessSection } from "./sections/DeliveryProcessSection";
import { CaseStudiesSection } from "./sections/CaseStudiesSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { FAQSection } from "./sections/FAQSection";
import { FinalCTASection } from "./sections/FinalCTASection";
import { FooterSection } from "./sections/FooterSection";

export function TensorLabLandingPage() {
  return (
    <div className="-mt-16">
      <HeroSection />
      <LogoCloudSection />
      <ScrollRevealHeadlineSection />
      <CapabilitiesSection />
      <EngagementModelsSection />
      <DeliveryProcessSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
      <FooterSection />
    </div>
  );
}

