"use client";

import { Tag } from "antd";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Layers, Lightbulb, Rocket, Shield, Zap } from "lucide-react";

import ShinyText from "@/components/ShinyText";
import SpotlightCard from "@/components/SpotlightCard";
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
  const { fadeUp, stagger } = useSectionVariants(Boolean(shouldReduceMotion));

  return (
    <motion.section
      id="process"
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
      className="bg-surface py-20 md:py-28 border-y border-border"
    >
      <div className="container mx-auto px-8">
        <motion.div
          variants={fadeUp}
          className="max-w-2xl mx-auto text-center flex flex-col items-center gap-4 mb-16"
        >
          <Tag
            bordered={false}
            color="blue"
            className="rounded-full! px-3! py-0.5!"
          >
            <ShinyText
              text={t("tag")}
              disabled={Boolean(shouldReduceMotion)}
              speed={2}
              color="var(--color-primary)"
              shineColor="rgba(255, 255, 255, 0.7)"
            />
          </Tag>
          <h2 className="text-3xl font-semibold text-foreground">
            {t("title")}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">{t("desc")}</p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[22px] md:left-[24px] top-6 bottom-6 w-px bg-linear-to-b from-primary/60 via-primary/20 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[22px] md:left-[24px] top-10 h-40 w-24 -translate-x-1/2 rounded-full bg-primary/10 blur-2xl"
            />

            <ol className="space-y-4 md:space-y-6">
              {stepKeys.map((key, idx) => {
                const Icon = stepIcons[key];

                return (
                  <motion.li
                    key={key}
                    variants={fadeUp}
                    className="grid grid-cols-[44px_1fr] md:grid-cols-[48px_1fr] gap-4 md:gap-6"
                  >
                    <div className="pt-4">
                      <div className="relative z-10 size-11 md:size-12 rounded-2xl bg-background border border-border flex items-center justify-center text-primary">
                        <Icon size={22} aria-hidden="true" />
                      </div>
                    </div>

                    <SpotlightCard className="group">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="space-y-1">
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {t("stepLabel", { step: idx + 1 })}
                          </p>
                          <h3 className="text-xl font-bold text-foreground">
                            {t(`steps.${key}.title`)}
                          </h3>
                        </div>

                        <div className="shrink-0">
                          <span className="inline-flex items-center justify-center rounded-full border border-border bg-border/40 px-3 py-1 text-xs font-medium text-foreground">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {t(`steps.${key}.desc`)}
                      </p>
                    </SpotlightCard>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
