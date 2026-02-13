"use client";

import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import ScrollReveal from "@/components/ScrollReveal";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";

export function ScrollRevealHeadlineSection() {
  const t = useTranslations("landing.scrollReveal");
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      <SectionBackdrop variant="cool" />

      <div className="container mx-auto px-8 relative z-10">
        <ScrollReveal
          enableBlur={!reduceMotion}
          baseOpacity={reduceMotion ? 1 : 0.06}
          baseRotation={reduceMotion ? 0 : 1.5}
          blurStrength={reduceMotion ? 0 : 6}
          rotationStart="top 62%"
          rotationEnd="bottom 45%"
          wordAnimationStart="top 70%"
          wordAnimationEnd="bottom 50%"
          containerClassName="my-0 max-w-7xl mx-auto text-center"
          textClassName="text-foreground text-[clamp(1.85rem,4.6vw,3.25rem)] leading-[1.25] tracking-tight text-balance"
        >
          {t("headline")}
        </ScrollReveal>
      </div>
    </section>
  );
}
