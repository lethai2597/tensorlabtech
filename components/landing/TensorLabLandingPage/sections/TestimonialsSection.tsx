"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Handshake, Eye, ShieldCheck } from "lucide-react";

import { SectionHeader } from "@/components/landing/SectionHeader";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

const commitmentKeys = ["ownership", "transparency", "production"] as const;

const icons = {
  ownership: Handshake,
  transparency: Eye,
  production: ShieldCheck,
} as const;

export function TestimonialsSection() {
  const t = useTranslations("landing.commitments");
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  return (
    <motion.section
      id="commitments"
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
      className="relative overflow-hidden bg-background py-20 md:py-28"
    >
      <SectionBackdrop variant="cool" />

      <div className="container mx-auto px-8 relative z-10">
        <SectionHeader
          tag={t("tag")}
          title={t("title")}
          description={t("desc")}
          reducedMotion={reduced}
          fadeUp={fadeUp}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {commitmentKeys.map((key) => {
            const Icon = icons[key];
            return (
              <motion.div
                key={key}
                variants={fadeUp}
                className="bg-surface border border-border rounded-3xl p-8 space-y-4"
              >
                <div
                  className="size-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 15%, transparent), color-mix(in srgb, var(--color-info) 15%, transparent))",
                  }}
                >
                  <Icon
                    className="size-6"
                    style={{ color: "var(--color-primary)" }}
                  />
                </div>

                <h3 className="text-lg font-semibold text-foreground">
                  {t(`items.${key}.title`)}
                </h3>

                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {t(`items.${key}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
