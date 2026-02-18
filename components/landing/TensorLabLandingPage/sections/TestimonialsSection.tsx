"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";

import { SectionHeader } from "@/components/landing/SectionHeader";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

const testimonialKeys = ["t1", "t2", "t3"] as const;

export function TestimonialsSection() {
  const t = useTranslations("landing.testimonials");
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  return (
    <motion.section
      id="testimonials"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialKeys.map((key) => (
            <motion.div
              key={key}
              variants={fadeUp}
              className="bg-surface border border-border rounded-3xl p-8 space-y-4"
            >
              <div
                className="flex gap-1"
                aria-label={t("starsAria", { count: 5 })}
              >
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 text-warning fill-warning" />
                ))}
              </div>

              <p className="text-foreground leading-relaxed">
                &ldquo;{t(`items.${key}.quote`)}&rdquo;
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div
                  className="size-10 rounded-full bg-border"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {t(`items.${key}.name`)}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {t(`items.${key}.role`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
