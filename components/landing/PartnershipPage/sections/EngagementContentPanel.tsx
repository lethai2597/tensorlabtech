"use client";

import { Button, Tag } from "antd";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Link } from "@/i18n/navigation";
import SpotlightCard from "@/components/SpotlightCard";
import { CheckList } from "@/components/landing/CheckList";
import type { EngagementModel } from "./EngagementDetailSection";

type Props = {
  model: EngagementModel;
  reduced: boolean;
  approachLabel: string;
  useCasesLabel: string;
  howItStartsLabel: string;
  howItStarts: string[];
};

export function EngagementContentPanel({
  model,
  reduced,
  approachLabel,
  useCasesLabel,
  howItStartsLabel,
  howItStarts,
}: Props) {
  const Icon = model.icon;

  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 1 } : { opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <SpotlightCard
        spotlightColor={model.spotlightColor}
        className="bg-surface border border-border rounded-3xl p-8 sm:p-10"
      >
        {/* Decorative blurs */}
        <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative space-y-8">

          {/* 1. Header: icon + title + CTA button */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="size-12 shrink-0 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Icon size={22} />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-foreground">{model.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400">{model.subtitle}</p>
              </div>
            </div>
            <div className="shrink-0">
              <Link href={model.ctaHref}>
                <Button
                  type={model.ctaType}
                  size="large"
                  className="rounded-xl! h-11! px-6! font-semibold! w-full sm:w-auto"
                >
                  {model.cta} <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* 2. "Best for" callout */}
          <div className="flex items-start gap-3 rounded-2xl bg-primary/5 border border-primary/15 px-5 py-4">
            <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-foreground font-medium">{model.forNote}</p>
          </div>

          {/* 3. Two columns: approach items + what's included */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                {approachLabel}
              </p>
              <CheckList items={model.items} />
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                {model.includesLabel}
              </p>
              <CheckList items={model.includes} colorClass="text-primary" />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* 4. Typical use cases as tags */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {useCasesLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {model.useCases.map((uc, i) => (
                <Tag
                  key={i}
                  bordered={false}
                  color="geekblue"
                  className="rounded-full! px-3! py-1! text-sm!"
                >
                  {uc}
                </Tag>
              ))}
            </div>
          </div>

          {/* 5. How it starts — 3-step inline flow */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {howItStartsLabel}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {howItStarts.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm text-foreground font-medium">{step}</span>
                  </div>
                  {i < howItStarts.length - 1 && (
                    <ArrowRight className="size-4 text-zinc-300 dark:text-zinc-600 shrink-0 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </SpotlightCard>
    </motion.div>
  );
}
