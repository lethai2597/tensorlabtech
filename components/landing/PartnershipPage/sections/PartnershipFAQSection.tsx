"use client";

import { Collapse } from "antd";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import { SectionHeader } from "@/components/landing/SectionHeader";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

const FAQ_COUNT = 5;

export function PartnershipFAQSection() {
  const t = useTranslations("partnership");
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  const items = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    key: String(i),
    label: (
      <span className="text-base font-medium text-foreground">
        {t(`faq.items.${i}.q`)}
      </span>
    ),
    children: (
      <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed pb-2">
        {t(`faq.items.${i}.a`)}
      </p>
    ),
  }));

  return (
    <motion.section
      id="partnership-faq"
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
      className="relative overflow-hidden bg-background py-20 md:py-28"
    >
      <SectionBackdrop variant="neutral" />

      <div className="container mx-auto px-8 relative z-10">
        <SectionHeader
          tag={t("faq.tag")}
          title={t("faq.title")}
          description={t("faq.desc")}
          reducedMotion={reduced}
          fadeUp={fadeUp}
        />

        <motion.div variants={fadeUp} className="max-w-3xl mx-auto">
          <Collapse
            ghost
            size="large"
            items={items}
            className="[&_.ant-collapse-header]:px-0! [&_.ant-collapse-content-box]:px-0!"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
