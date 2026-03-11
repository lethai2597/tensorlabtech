"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Handshake, Users } from "lucide-react";

import SpotlightCard from "@/components/SpotlightCard";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { CheckList } from "@/components/landing/CheckList";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";
import { EngagementContentPanel } from "./EngagementContentPanel";

// Shared model type — exported so EngagementContentPanel can import it
export type EngagementModel = {
  key: "product" | "outsource";
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  subtitle: string;
  forNote: string;
  cta: string;
  ctaHref: string;
  ctaType: "primary" | "default";
  spotlightColor: `rgba(${number}, ${number}, ${number}, ${number})`;
  items: string[];
  includes: string[];
  includesLabel: string;
  useCases: string[];
};

export function EngagementDetailSection() {
  const t = useTranslations("partnership");
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);
  const [activeKey, setActiveKey] = useState<"product" | "outsource">("product");

  const models: EngagementModel[] = [
    {
      key: "product",
      icon: Handshake,
      title: t("engagement.product.title"),
      subtitle: t("engagement.product.subtitle"),
      forNote: t("engagement.product.for"),
      cta: t("engagement.product.cta"),
      ctaHref: "/contact?type=product",
      ctaType: "primary",
      spotlightColor: "rgba(37, 99, 235, 0.35)",
      items: [t("engagement.product.items.0"), t("engagement.product.items.1"), t("engagement.product.items.2")],
      includes: [t("engagement.product.includes.0"), t("engagement.product.includes.1"), t("engagement.product.includes.2"), t("engagement.product.includes.3")],
      includesLabel: t("engagement.product.includesLabel"),
      useCases: [t("engagement.product.useCases.0"), t("engagement.product.useCases.1"), t("engagement.product.useCases.2"), t("engagement.product.useCases.3"), t("engagement.product.useCases.4")],
    },
    {
      key: "outsource",
      icon: Users,
      title: t("engagement.outsource.title"),
      subtitle: t("engagement.outsource.subtitle"),
      forNote: t("engagement.outsource.for"),
      cta: t("engagement.outsource.cta"),
      ctaHref: "/contact?type=outsource",
      ctaType: "default",
      spotlightColor: "rgba(37, 99, 235, 0.28)",
      items: [t("engagement.outsource.items.0"), t("engagement.outsource.items.1"), t("engagement.outsource.items.2")],
      includes: [t("engagement.outsource.includes.0"), t("engagement.outsource.includes.1"), t("engagement.outsource.includes.2"), t("engagement.outsource.includes.3")],
      includesLabel: t("engagement.outsource.includesLabel"),
      useCases: [t("engagement.outsource.useCases.0"), t("engagement.outsource.useCases.1"), t("engagement.outsource.useCases.2"), t("engagement.outsource.useCases.3"), t("engagement.outsource.useCases.4")],
    },
  ];

  const activeModel = models.find((m) => m.key === activeKey)!;
  const activeLabel = t("engagement.activeLabel");
  const approachLabel = t("engagement.approachLabel");
  const useCasesLabel = t("engagement.useCasesLabel");
  const howItStartsLabel = t("engagement.howItStartsLabel");
  const howItStarts = [t("engagement.howItStarts.0"), t("engagement.howItStarts.1"), t("engagement.howItStarts.2")];

  return (
    <motion.section
      id="engagement-detail"
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
      className="relative overflow-hidden bg-background py-20 md:py-28"
    >
      <SectionBackdrop variant="cool" />

      <div className="container mx-auto px-8 relative z-10">
        <SectionHeader
          tag={t("engagement.tag")}
          title={t("engagement.title")}
          description={t("engagement.desc")}
          reducedMotion={reduced}
          fadeUp={fadeUp}
        />

        {/* Tab cards — SpotlightCard style, side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8 max-w-5xl mx-auto items-stretch">
          {models.map((model) => {
            const Icon = model.icon;
            const isActive = model.key === activeKey;
            return (
              <motion.div key={model.key} variants={fadeUp} className="h-full">
                <SpotlightCard
                  spotlightColor={model.spotlightColor}
                  role="button"
                  aria-pressed={isActive}
                  tabIndex={0}
                  onClick={() => setActiveKey(model.key)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveKey(model.key); }
                  }}
                  className={[
                    "bg-surface p-6 rounded-3xl transition-colors cursor-pointer select-none h-full",
                    shouldReduceMotion ? "" : "duration-300",
                    isActive ? "border-primary/40" : "border-border",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={["size-12 shrink-0 rounded-2xl flex items-center justify-center", isActive ? "bg-primary/10 text-primary" : "bg-border"].join(" ")}>
                      <Icon size={22} />
                    </div>
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <h3 className="text-lg font-bold text-foreground sm:text-xl">{model.title}</h3>
                            {isActive && (
                              <span className="inline-flex shrink-0 items-center rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                {activeLabel}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">{model.subtitle}</p>
                        </div>
                        <span aria-hidden="true" className={["mt-1 shrink-0 inline-flex size-8 items-center justify-center rounded-2xl border", isActive ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-background text-zinc-500 dark:text-zinc-400"].join(" ")}>
                          <ArrowRight className="size-4" />
                        </span>
                      </div>
                      <CheckList items={[model.items[0]!]} size="sm" />
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Content panel — rich detail, animated on tab switch */}
        <motion.div variants={fadeUp} className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <EngagementContentPanel
              key={activeKey}
              model={activeModel}
              reduced={reduced}
              approachLabel={approachLabel}
              useCasesLabel={useCasesLabel}
              howItStartsLabel={howItStartsLabel}
              howItStarts={howItStarts}
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}
