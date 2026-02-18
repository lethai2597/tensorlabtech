"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

export function LogoCloudSection() {
  const t = useTranslations("landing.logos");
  const reduceMotion = useReducedMotion();
  const { fadeUp, stagger } = useSectionVariants(Boolean(reduceMotion));

  const logos = [
    "Next.js",
    "NestJS",
    "React Native",
    "PostgreSQL",
    "AWS",
    "OpenAI",
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
      className="bg-background py-16 border-y border-border"
    >
      <div className="container mx-auto px-8">
        <motion.p
          variants={fadeUp}
          className="text-sm text-zinc-500 dark:text-zinc-400 text-center mb-8 font-medium uppercase tracking-wider"
        >
          {t("title")}
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {logos.map((name) => (
            <motion.div
              key={name}
              variants={fadeUp}
              className="text-2xl font-bold text-zinc-300 dark:text-zinc-700 select-none"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
