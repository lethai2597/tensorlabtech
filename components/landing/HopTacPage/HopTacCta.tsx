"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "antd";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";

type HopTacCtaProps = {
  activeTab: "product" | "outsource";
};

export function HopTacCta({ activeTab }: HopTacCtaProps) {
  const t = useTranslations("hopTac.cta");
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
      className="relative overflow-hidden bg-background py-20 md:py-28"
    >
      <SectionBackdrop variant="primary" />

      <div className="container mx-auto px-8 relative z-10 text-center max-w-2xl">
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-4xl font-bold text-foreground mb-4"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-zinc-500 dark:text-zinc-400 mb-8 text-base md:text-lg"
        >
          {t("desc")}
        </motion.p>

        <motion.div variants={fadeUp}>
          <Link href={`/contact?type=${activeTab}`}>
            <Button
              type="primary"
              size="large"
              className="rounded-xl! h-12! px-8! font-semibold! text-base!"
            >
              {t("button")} <ArrowRight className="size-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
