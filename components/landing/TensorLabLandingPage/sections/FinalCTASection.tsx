"use client";

import { Button } from "antd";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, MessageSquare, Rocket } from "lucide-react";

import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

export function FinalCTASection() {
  const t = useTranslations("landing.finalCta");
  const reduceMotion = useReducedMotion();
  const { fadeUp, stagger } = useSectionVariants(Boolean(reduceMotion));

  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
      className="relative overflow-hidden bg-background py-20 md:py-28"
    >
      <SectionBackdrop variant="primary" />

      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden bg-surface border border-border rounded-3xl p-8 md:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/12 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-28 -left-28 size-80 rounded-full bg-primary/10 blur-3xl"
            />

            <div className="relative text-center space-y-8">
              <motion.div
                variants={fadeUp}
                className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto"
              >
                <Rocket size={28} className="text-primary" />
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-bold text-foreground"
              >
                {t("title")}
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto"
              >
                {t("desc")}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4"
              >
                <Button
                  type="primary"
                  size="large"
                  href="#"
                  className="px-8! text-base! font-semibold! rounded-xl! inline-flex items-center gap-2"
                >
                  {t("ctaBrief")} <ArrowRight className="size-4" />
                </Button>
                <Button
                  size="large"
                  href="#"
                  className="px-8! text-base! font-medium! rounded-xl! inline-flex items-center gap-2"
                >
                  <MessageSquare className="size-4" /> {t("ctaCall")}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
