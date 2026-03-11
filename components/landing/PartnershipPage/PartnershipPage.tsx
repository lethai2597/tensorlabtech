"use client";

import dynamic from "next/dynamic";
import { PartnershipHeroSection } from "./sections/PartnershipHeroSection";
import { EngagementDetailSection } from "./sections/EngagementDetailSection";
import { DeliveryProcessSection } from "@/components/landing/TensorLabLandingPage/sections/DeliveryProcessSection";
import { PartnershipFAQSection } from "./sections/PartnershipFAQSection";

const FinalCTASection = dynamic(
  () =>
    import(
      "@/components/landing/TensorLabLandingPage/sections/FinalCTASection"
    ).then((m) => m.FinalCTASection),
);

export function PartnershipPage() {
  return (
    <div className="-mt-16">
      <PartnershipHeroSection />
      <EngagementDetailSection />
      <DeliveryProcessSection />
      <PartnershipFAQSection />
      <FinalCTASection />
    </div>
  );
}
