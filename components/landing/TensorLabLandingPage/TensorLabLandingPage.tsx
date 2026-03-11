"use client";

import React from "react";

import dynamic from "next/dynamic";
import { HeroSection } from "./sections/HeroSection";
import { ScrollRevealHeadlineSection } from "./sections/ScrollRevealHeadlineSection";
import { CapabilitiesSection } from "./sections/CapabilitiesSection";
import { EngagementModelsSection } from "./sections/EngagementModelsSection";
import { DeliveryProcessSection } from "./sections/DeliveryProcessSection";
import { BlogHighlightSection } from "./sections/BlogHighlightSection";
import { ProjectsSection } from "./sections/ProjectsSection";

/* Below-fold sections: lazy-loaded to reduce initial bundle size */
const TeamHighlightSection = dynamic(
  () => import("./sections/TeamHighlightSection").then(m => m.TeamHighlightSection),
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
  /* Handle scroll-to-hash after client-side navigation from other pages */
  React.useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      // Small delay to ensure sections are rendered (especially lazy-loaded ones)
      const timer = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="-mt-32">
      <HeroSection />
      <CapabilitiesSection />
      <EngagementModelsSection />
      <ScrollRevealHeadlineSection />
      <DeliveryProcessSection />
      <ProjectsSection />
      {/* <EventsHighlightSection /> */}
      <BlogHighlightSection posts={blogPosts} />
      <TeamHighlightSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}

