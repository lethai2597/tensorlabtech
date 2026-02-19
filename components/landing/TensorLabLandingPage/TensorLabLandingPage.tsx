"use client";

import { HeroSection } from "./sections/HeroSection";
import { ScrollRevealHeadlineSection } from "./sections/ScrollRevealHeadlineSection";
import { CapabilitiesSection } from "./sections/CapabilitiesSection";
import { EngagementModelsSection } from "./sections/EngagementModelsSection";
import { DeliveryProcessSection } from "./sections/DeliveryProcessSection";
import { EventsHighlightSection } from "./sections/CaseStudiesSection";
import { BlogHighlightSection } from "./sections/BlogHighlightSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { FAQSection } from "./sections/FAQSection";
import { FinalCTASection } from "./sections/FinalCTASection";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  readingTime: string;
}

interface TensorLabLandingPageProps {
  blogPosts?: BlogPost[];
}

export function TensorLabLandingPage({ blogPosts = [] }: TensorLabLandingPageProps) {
  return (
    <div className="-mt-32">
      <HeroSection />
      <CapabilitiesSection />
      <EngagementModelsSection />
      <ScrollRevealHeadlineSection />
      <DeliveryProcessSection />
      <EventsHighlightSection />
      <BlogHighlightSection posts={blogPosts} />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}

