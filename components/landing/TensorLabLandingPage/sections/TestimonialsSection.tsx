"use client";

import { Tag } from "antd";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";

import ShinyText from "@/components/ShinyText";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

const testimonialKeys = ["t1", "t2", "t3"] as const;

export function TestimonialsSection() {
  const t = useTranslations("landing.testimonials");
  const shouldReduceMotion = useReducedMotion();
  const { fadeUp, stagger } = useSectionVariants(Boolean(shouldReduceMotion));

  return (
    <motion.section
      id="testimonials"
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
      className="bg-background py-20 md:py-28"
    >
      <div className="container mx-auto px-8">
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
