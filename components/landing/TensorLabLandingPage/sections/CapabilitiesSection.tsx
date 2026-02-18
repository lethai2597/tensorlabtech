"use client";

import { Tag } from "antd";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowUpRight,
  Cloud,
  Compass,
  Cpu,
  Layers,
  Rocket,
  Shield,
} from "lucide-react";

import SpotlightCard from "@/components/SpotlightCard";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

const capabilityItems = [
  {
    key: "consulting",
    icon: Compass,
    color: "text-info",
    spotlightColor: "rgba(56, 189, 248, 0.38)",
  },
  {
    key: "dx",
    icon: Shield,
    color: "text-success",
    spotlightColor: "rgba(34, 197, 94, 0.35)",
  },
  {
    key: "product",
    icon: Rocket,
    color: "text-primary",
    spotlightColor: "rgba(37, 99, 235, 0.35)",
  },
  {
    key: "ai",
    icon: Cpu,
    color: "text-warning",
    spotlightColor: "rgba(245, 158, 11, 0.38)",
  },
  {
    key: "web3",
    icon: Layers,
    color: "text-error",
    spotlightColor: "rgba(239, 68, 68, 0.35)",
  },
  {
    key: "cloud",
    icon: Cloud,
    color: "text-info",
    spotlightColor: "rgba(14, 165, 233, 0.38)",
  },
] as const;

export function CapabilitiesSection() {
  const t = useTranslations("landing.capabilities");
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  return (
    <motion.section
      id="capabilities"
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
      className="relative overflow-hidden bg-background py-20 md:py-28"
    >
      <SectionBackdrop variant="primary" />

      <div className="container mx-auto px-8 relative z-10">
        <SectionHeader
          tag={t("tag")}
          title={t("title")}
          description={t("desc")}
          reducedMotion={reduced}
          fadeUp={fadeUp}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilityItems.map((c) => (
            <motion.div key={c.key} variants={fadeUp}>
              <SpotlightCard
                key={c.key}
                spotlightColor={c.spotlightColor}
                className="group cursor-pointer border-transparent transition duration-300 hover:border-border hover:-translate-y-0.5"
              >
                <div className="absolute top-6 right-6 flex items-center justify-center size-10 rounded-2xl bg-border/60 text-foreground/60 opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </div>
                <div className="size-12 rounded-2xl bg-border flex items-center justify-center mb-4">
                  <c.icon size={22} className={c.color} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t(`items.${c.key}.title`)}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {t(`items.${c.key}.desc`)}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
