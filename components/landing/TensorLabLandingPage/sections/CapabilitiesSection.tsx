"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Button } from "antd";

import { Link } from "@/i18n/navigation";
import SpotlightCard from "@/components/SpotlightCard";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";
import { CAPABILITY_ITEMS } from "@/lib/capabilityData";

export function CapabilitiesSection() {
  const t = useTranslations("landing.capabilities");
  const tDetail = useTranslations("capabilityDetail");
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  return (
    <motion.section
      id="capabilities"
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
      className="relative overflow-hidden bg-background py-20 md:py-28"
    >
      <SectionBackdrop variant="primary" />

      <div className="container mx-auto px-8 relative z-10">
        <SectionHeader
          tag={t("tag")}
          title={t("title")}
          description={t("desc")}
          reducedMotion={reduced}
          fadeUp={fadeUp}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CAPABILITY_ITEMS.map((c) => (
            <motion.div key={c.key} variants={fadeUp}>
              {/* Card links to /capabilities list page (no individual detail pages) */}
              <Link href="/capabilities" className="block h-full no-underline group">
                <SpotlightCard
                  spotlightColor={c.spotlightColor}
                  tabIndex={-1}
                  className="h-full cursor-pointer border-transparent transition duration-300 hover:border-border hover:-translate-y-0.5"
                >
                  <div className="absolute top-6 right-6 flex items-center justify-center size-10 rounded-2xl bg-border/60 text-foreground/60 opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </div>
                  <div className="size-12 rounded-2xl bg-border flex items-center justify-center mb-4">
                    <c.icon size={22} className={c.color} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t(`items.${c.key}.title`)}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {t(`items.${c.key}.desc`)}
                  </p>
                </SpotlightCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* "View all capabilities" CTA */}
        <motion.div variants={fadeUp} className="flex justify-center mt-12">
          <Link href="/capabilities">
            <Button size="large">{tDetail("viewAll")} →</Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
