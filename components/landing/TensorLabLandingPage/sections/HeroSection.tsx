"use client";

import { Button, Tag } from "antd";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, ChevronRight, Sparkles, Rocket, Layers, BrainCircuit } from "lucide-react";

import { Link } from "@/i18n/navigation";
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



  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={outerContainerVariants}
      className="relative overflow-hidden bg-linear-to-b from-surface via-surface to-background pt-48 pb-36 md:pt-68 md:pb-48"
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
            <Link href="/contact?type=product">
              <Button
                type="primary"
                size="large"
                className="h-12! px-8! text-base! font-semibold! rounded-xl! border-0! text-white! bg-transparent! hover:opacity-90! transition-opacity!"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, var(--color-primary) 0%, var(--color-info) 100%)",
                }}
              >
                {t("ctaProduct")} <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/contact?type=outsource">
              <Button
                size="large"
                className="h-12! px-8! text-base! font-medium! rounded-xl!"
              >
                {t("ctaOutsource")} <ChevronRight className="size-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 pt-4"
          >
            {[
              { icon: Rocket, key: "valueBadge1" as const },
              { icon: Layers, key: "valueBadge2" as const },
              { icon: BrainCircuit, key: "valueBadge3" as const },
            ].map(({ icon: Icon, key }) => (
              <span
                key={key}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-sm text-zinc-500 dark:text-zinc-400"
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {t(key)}
              </span>
            ))}
          </motion.div>
        </motion.div>


      </div>
      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-primary), var(--color-info), transparent)",
        }}
      />
    </motion.section>
  );
}
