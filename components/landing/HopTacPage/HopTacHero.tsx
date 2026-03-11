"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Tag } from "antd";

import ShinyText from "@/components/ShinyText";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

export function HopTacHero() {
  const t = useTranslations("hopTac.hero");
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  const handleScrollDown = () => {
    const el = document.getElementById("product");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Dark gradient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,99,235,0.25) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-8 relative z-10 text-center max-w-3xl">
        <motion.div variants={fadeUp} className="flex justify-center mb-5">
          <Tag bordered={false} color="geekblue" className="rounded-full! px-3! py-0.5!">
            <ShinyText
              text={t("tag")}
              disabled={reduced}
              speed={2}
              color="var(--color-primary)"
              shineColor="rgba(255,255,255,0.7)"
            />
          </Tag>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight"
        >
          {t("tagline")}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 mb-10 leading-relaxed max-w-2xl mx-auto"
        >
          {t("philosophy")}
        </motion.p>

        <motion.button
          variants={fadeUp}
          onClick={handleScrollDown}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary border border-primary/30 rounded-full px-6 py-2.5 hover:bg-primary/10 transition-colors"
        >
          {t("cta")} <ArrowDown className="size-4" />
        </motion.button>
      </div>
    </motion.section>
  );
}
