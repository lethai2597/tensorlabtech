"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Layers, Lightbulb, Rocket, Shield, Zap } from "lucide-react";

import { SectionHeader } from "@/components/landing/SectionHeader";
import { TimelineList } from "@/components/landing/TimelineList";
import type { TimelineItem } from "@/components/landing/TimelineList";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

const stepIcons = {
  discovery: Lightbulb,
  architecture: Layers,
  delivery: Rocket,
  release: Zap,
  scale: Shield,
} as const;

const stepKeys = [
  "discovery",
  "architecture",
  "delivery",
  "release",
  "scale",
] as const;

export function DeliveryProcessSection() {
  const t = useTranslations("landing.process");
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  const timelineItems: TimelineItem[] = stepKeys.map((key, idx) => ({
    icon: stepIcons[key],
    title: t(`steps.${key}.title`),
    badge: String(idx + 1).padStart(2, "0"),
    description: t(`steps.${key}.desc`),
    subheading: (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {t("stepLabel", { step: idx + 1 })}
      </p>
    ),
  }));

  return (
    <motion.section
      id="process"
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
      className="relative overflow-hidden bg-background py-20 md:py-28"
    >
      <SectionBackdrop variant="neutral" />

      <div className="container mx-auto px-8 relative z-10">
        <SectionHeader
          tag={t("tag")}
          title={t("title")}
          description={t("desc")}
          reducedMotion={reduced}
          fadeUp={fadeUp}
        />

        <div className="max-w-5xl mx-auto">
          <TimelineList items={timelineItems} fadeUp={fadeUp} />
        </div>
      </div>
    </motion.section>
  );
}
