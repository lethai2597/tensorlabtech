"use client";

import { HeroSection } from "./sections/HeroSection";
import { ScrollRevealHeadlineSection } from "./sections/ScrollRevealHeadlineSection";
import { CapabilitiesSection } from "./sections/CapabilitiesSection";
import { EngagementModelsSection } from "./sections/EngagementModelsSection";
import { DeliveryProcessSection } from "./sections/DeliveryProcessSection";
import { EventsHighlightSection } from "./sections/CaseStudiesSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { FAQSection } from "./sections/FAQSection";
import { FinalCTASection } from "./sections/FinalCTASection";

export function TensorLabLandingPage() {
  return (
    <div className="-mt-16">
      <HeroSection />
      <CapabilitiesSection />
      <EngagementModelsSection />
      <ScrollRevealHeadlineSection />
      <DeliveryProcessSection />
      <EventsHighlightSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}
