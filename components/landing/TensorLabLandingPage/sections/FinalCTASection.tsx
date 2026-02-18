"use client";

import { Button } from "antd";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Rocket } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { CTABox } from "@/components/landing/CTABox";
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
        <CTABox
          icon={Rocket}
          title={t("title")}
          description={t("desc")}
          fadeUp={fadeUp}
          actions={
            <>
              <Link href="/contact">
                <Button
                  type="primary"
                  size="large"
                  className="px-8! text-base! font-semibold! rounded-xl! inline-flex items-center gap-2"
                >
                  {t("ctaContact")} <ArrowRight className="size-4" />
                </Button>
              </Link>
            </>
          }
        />
      </div>
    </motion.section>
  );
}
