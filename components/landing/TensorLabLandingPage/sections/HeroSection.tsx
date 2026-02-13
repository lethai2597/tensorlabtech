"use client";

import { Button, Tag } from "antd";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  ChevronRight,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";

import ShinyText from "@/components/ShinyText";

export function HeroSection() {
  const t = useTranslations("landing.hero");
  const shouldReduceMotion = useReducedMotion();
  const easeOutQuart = [0.21, 0.47, 0.32, 0.98] as const;

  const outerContainerVariants = {
    hidden: {},
    show: {
      transition: shouldReduceMotion
        ? undefined
        : {
            staggerChildren: 0.18,
            delayChildren: 0.05,
          },
    },
  } as const;

  const innerContainerVariants = {
    hidden: {},
    show: {
      transition: shouldReduceMotion
        ? undefined
        : {
            staggerChildren: 0.08,
          },
    },
  } as const;

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    show: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: easeOutQuart,
          },
        },
  } as const;

  const previewVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 18, scale: 0.98 },
    show: shouldReduceMotion
      ? { opacity: 1, y: 0, scale: 1 }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.7,
            ease: easeOutQuart,
          },
        },
  } as const;

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={outerContainerVariants}
      className="relative overflow-hidden bg-linear-to-b from-surface via-surface to-background pt-32 pb-20 md:pt-40 md:pb-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage: `
            radial-gradient(800px circle at 20% 10%, color-mix(in srgb, var(--color-primary) 22%, transparent) 0%, transparent 60%),
            radial-gradient(700px circle at 85% 30%, color-mix(in srgb, var(--color-info) 18%, transparent) 0%, transparent 58%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute -top-40 -left-40 size-[500px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "var(--color-primary)" }}
      />
      <div
        className="pointer-events-none absolute -right-40 -bottom-20 size-[400px] rounded-full opacity-15 blur-[100px]"
        style={{ background: "var(--color-info)" }}
      />

      <div className="container mx-auto px-8 relative z-10">
        <motion.div
          variants={innerContainerVariants}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <motion.div variants={itemVariants} className="flex justify-center">
            <Tag
              bordered={false}
              color="geekblue"
              className="px-4! py-1.5! text-sm! font-medium! rounded-full!"
            >
              <span className="inline-flex items-center gap-2">
                <Sparkles className="size-4" aria-hidden="true" />
                <ShinyText
                  text={t("badge")}
                  disabled={Boolean(shouldReduceMotion)}
                  speed={2}
                  color="var(--color-primary)"
                  shineColor="rgba(255, 255, 255, 0.7)"
                />
              </span>
            </Tag>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight"
          >
            {t("titlePrefix")}{" "}
            <span className="bg-linear-to-r from-(--color-primary) to-(--color-info) bg-clip-text text-transparent">
              {t("titleHighlight")}
            </span>{" "}
            {t("titleSuffix")}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <Button
              type="primary"
              size="large"
              href="#product-partnership"
              className="h-12! px-8! text-base! font-semibold! rounded-xl! border-0! text-white! bg-transparent! hover:opacity-90! transition-opacity!"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--color-primary) 0%, var(--color-info) 100%)",
              }}
            >
              {t("ctaProduct")} <ArrowRight className="size-4" />
            </Button>
            <Button
              size="large"
              href="#outsourcing"
              className="h-12! px-8! text-base! font-medium! rounded-xl!"
            >
              {t("ctaOutsource")} <ChevronRight className="size-4" />
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 pt-4"
          >
            <div className="flex -space-x-2" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="size-8 rounded-full bg-border border-2 border-surface"
                />
              ))}
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-foreground">
                {t("proofStrong")}
              </span>{" "}
              {t("proofRest")}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={previewVariants}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="bg-background border border-border rounded-3xl overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
              <div className="flex gap-2">
                <div className="size-3 rounded-full bg-error/60" />
                <div className="size-3 rounded-full bg-warning/60" />
                <div className="size-3 rounded-full bg-success/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-surface border border-border rounded-xl px-4 py-1.5 text-xs text-zinc-400 w-72 text-center">
                  {t("previewUrl")}
                </div>
              </div>
            </div>

            <div className="aspect-video bg-linear-to-br from-surface via-background to-surface flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <LayoutDashboard className="size-8 text-primary" />
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {t("previewCaption")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
