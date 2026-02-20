"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "./sections/HeroSection";
import { ScrollRevealHeadlineSection } from "./sections/ScrollRevealHeadlineSection";
import { CapabilitiesSection } from "./sections/CapabilitiesSection";
import { EngagementModelsSection } from "./sections/EngagementModelsSection";
import { DeliveryProcessSection } from "./sections/DeliveryProcessSection";
import { EventsHighlightSection } from "./sections/CaseStudiesSection";
import { BlogHighlightSection } from "./sections/BlogHighlightSection";

/* Below-fold sections: lazy-loaded to reduce initial bundle size */
const TestimonialsSection = dynamic(
  () => import("./sections/TestimonialsSection").then(m => m.TestimonialsSection),
);
const FAQSection = dynamic(
  () => import("./sections/FAQSection").then(m => m.FAQSection),
);
const FinalCTASection = dynamic(
  () => import("./sections/FinalCTASection").then(m => m.FinalCTASection),
);

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

