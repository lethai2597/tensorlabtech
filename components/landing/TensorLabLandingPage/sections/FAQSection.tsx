"use client";

import { Collapse } from "antd";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import { SectionHeader } from "@/components/landing/SectionHeader";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

const faqKeys = ["f1", "f2", "f3", "f4", "f5"] as const;

export function FAQSection() {
  const t = useTranslations("landing.faq");
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  const items = faqKeys.map((key) => ({
    key,
    label: t(`items.${key}.q`),
    children: t(`items.${key}.a`),
  }));

  return (
    <motion.section
      id="faq"
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
      className="relative overflow-hidden bg-background py-20 md:py-28"
    >
      <SectionBackdrop variant="neutral" />

      <div className="container mx-auto px-8 relative z-10">
        <SectionHeader
          tag={t("tag")}
          title={t("title")}
          description={t("desc")}
          reducedMotion={reduced}
          fadeUp={fadeUp}
        />

        <motion.div
          variants={fadeUp}
          className="max-w-3xl mx-auto"
        >
          <Collapse
            items={items}
            bordered={false}
            expandIconPosition="end"
            className="bg-transparent!"
            style={{ background: "transparent" }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
