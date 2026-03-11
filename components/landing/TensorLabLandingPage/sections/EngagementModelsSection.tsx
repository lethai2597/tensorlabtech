"use client";

import { Button } from "antd";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Handshake,
  Users,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import SpotlightCard from "@/components/SpotlightCard";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { CheckList } from "@/components/landing/CheckList";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

export function EngagementModelsSection() {
  const t = useTranslations("landing.engagement");
  const shouldReduceMotion = useReducedMotion();

  const models = useMemo(() => {
    return [
      {
        key: "product" as const,
        anchorId: "product-partnership",
        icon: Handshake,
        title: t("product.title"),
        subtitle: t("product.subtitle"),
        cta: t("product.cta"),
        ctaType: "primary" as const,
        items: [t("product.items.0"), t("product.items.1"), t("product.items.2")],
        spotlightColor: "rgba(37, 99, 235, 0.35)" as const,
      },
      {
        key: "outsource" as const,
        anchorId: "outsourcing",
        icon: Users,
        title: t("outsource.title"),
        subtitle: t("outsource.subtitle"),
        cta: t("outsource.cta"),
        ctaType: "default" as const,
        items: [
          t("outsource.items.0"),
          t("outsource.items.1"),
          t("outsource.items.2"),
        ],
        spotlightColor: "rgba(37, 99, 235, 0.28)" as const,
      },
    ];
  }, [t]);

  const [activeKey, setActiveKey] = useState<(typeof models)[number]["key"]>(
    "product",
  );

  const activeModel = models.find((m) => m.key === activeKey) ?? models[0]!;
  const ActiveIcon = activeModel.icon;
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  return (
    <motion.section
      id="engagement"
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 space-y-4">
            {models.map((model) => {
              const Icon = model.icon;
              const isActive = model.key === activeKey;

              return (
                <motion.div
                  key={model.key}
                  variants={fadeUp}
                  id={model.anchorId}
                >
                  <SpotlightCard
                    spotlightColor={model.spotlightColor}
                    role="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveKey(model.key)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveKey(model.key);
                      }
                    }}
                    className={[
                      "bg-surface p-6 rounded-3xl transition-colors cursor-pointer select-none",
                      shouldReduceMotion ? "" : "duration-300",
                      isActive ? "border-primary/40" : "border-border",
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div
                        className={[
                          "size-12 shrink-0 rounded-2xl flex items-center justify-center",
                          isActive ? "bg-primary/10 text-primary" : "bg-border",
                        ].join(" ")}
                      >
                        <Icon size={22} />
                      </div>

                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                              <h3 className="text-lg font-bold text-foreground sm:text-xl">
                                {model.title}
                              </h3>
                              {isActive ? (
                                <span className="inline-flex shrink-0 items-center rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                  {t("activeLabel")}
                                </span>
                              ) : null}
                            </div>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                              {model.subtitle}
                            </p>
                          </div>

                          <span
                            aria-hidden="true"
                            className={[
                              "mt-1 shrink-0 inline-flex size-8 items-center justify-center rounded-2xl border",
                              isActive
                                ? "border-primary/30 bg-primary/10 text-primary"
                                : "border-border bg-background text-zinc-500 dark:text-zinc-400",
                            ].join(" ")}
                          >
                            <ArrowRight className="size-4" />
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                          <CheckList items={[model.items[0]]} size="sm" />
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={fadeUp} className="lg:col-span-7 self-stretch">
            <SpotlightCard
              spotlightColor={activeModel.spotlightColor}
              className="bg-surface border border-border rounded-3xl p-6 h-full sm:p-8"
            >
              <div className="pointer-events-none absolute -top-28 -right-28 size-80 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-28 -left-28 size-80 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative">
                <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                  <div className="flex min-w-0 flex-1 items-start gap-4">
                    <div className="size-12 shrink-0 rounded-2xl bg-border flex items-center justify-center text-primary">
                      <ActiveIcon size={22} />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                        {activeModel.title}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {activeModel.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 sm:flex sm:items-center">
                    <Link href={`/contact?type=${activeModel.key}`}>
                      <Button
                        type={activeModel.ctaType}
                        size="large"
                        className="w-full rounded-xl! h-11! px-6! font-semibold! sm:w-auto"
                      >
                        {activeModel.cta} <ArrowRight className="size-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  <CheckList items={activeModel.items} />
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
