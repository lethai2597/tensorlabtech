"use client";

import { Collapse, Tag } from "antd";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import ShinyText from "@/components/ShinyText";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

const faqKeys = ["f1", "f2", "f3", "f4", "f5"] as const;

export function FAQSection() {
  const t = useTranslations("landing.faq");
  const shouldReduceMotion = useReducedMotion();
  const { fadeUp, stagger } = useSectionVariants(Boolean(shouldReduceMotion));

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
