"use client";

import { Button, Tag } from "antd";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronRight, MessageSquareCode, ShoppingBag, Sparkles } from "lucide-react";

import ShinyText from "@/components/ShinyText";
import SpotlightCard from "@/components/SpotlightCard";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

const caseIcons = {
  vibeCoding: Sparkles,
  agenticIntro: MessageSquareCode,
  ecommerceChatbot: ShoppingBag,
} as const;

const caseKeys = ["vibeCoding", "agenticIntro", "ecommerceChatbot"] as const;

export function CaseStudiesSection() {
  const t = useTranslations("landing.caseStudies");
  const shouldReduceMotion = useReducedMotion();
  const { fadeUp, stagger } = useSectionVariants(Boolean(shouldReduceMotion));

  return (
    <motion.section
      id="case-studies"
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
      className="relative overflow-hidden bg-background py-20 md:py-28"
    >
      <SectionBackdrop variant="neutral" />

      <div className="container mx-auto px-8 relative z-10">
        <motion.div
          variants={fadeUp}
          className="max-w-2xl mx-auto text-center flex flex-col items-center gap-4 mb-16"
        >
          <Tag
            bordered={false}
            color="geekblue"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseKeys.map((key) => {
            const Icon = caseIcons[key];
            const tags = [0, 1, 2].map((idx) => t(`items.${key}.tags.${idx}`));

            return (
              <motion.div key={key} variants={fadeUp}>
                <SpotlightCard
                  className="h-full flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="rounded-2xl border border-border bg-background dark:bg-surface overflow-hidden">
                      <div className="relative aspect-video">
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-linear-to-br from-primary/14 via-transparent to-primary/6 dark:from-primary/10 dark:to-primary/4"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute -top-16 -right-20 size-64 rounded-full bg-primary/10 blur-3xl dark:bg-primary/7"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute -bottom-24 -left-24 size-72 rounded-full bg-primary/7 blur-3xl dark:bg-primary/5"
                        />

                        <div className="relative h-full w-full p-6 flex items-end justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="size-11 rounded-2xl bg-surface/80 border border-border flex items-center justify-center text-primary">
                              <Icon size={22} aria-hidden="true" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-foreground truncate">
                                {t(`items.${key}.title`)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Tag
                          key={`${key}-${tag}`}
                          bordered={false}
                          color="blue"
                          className="rounded-full! px-3!"
                        >
                          {tag}
                        </Tag>
                      ))}
                    </div>

                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {t(`items.${key}.desc`)}
                    </p>
                  </div>

                  <div className="pt-6">
                    <Button
                      size="large"
                      href="#contact"
                      className="rounded-xl! h-11! font-semibold!"
                      block
                    >
                      {t("cta")} <ChevronRight className="size-4" />
                    </Button>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
