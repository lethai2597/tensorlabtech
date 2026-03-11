"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Tag } from "antd";
import SpotlightCard from "@/components/SpotlightCard";
import { CheckList } from "@/components/landing/CheckList";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";
import { HopTacProcessTimeline } from "./HopTacProcessTimeline";
import { HopTacFaq } from "./HopTacFaq";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

type Step = { label: string; desc: string };
type FaqItem = { q: string; a: string };
type Role = { title: string; desc: string };

type HopTacModelSectionProps = {
  id: string;
  tag: string;
  title: string;
  desc: string;
  fitTitle: string;
  fitItems: string[];
  processTitle: string;
  processSteps: Step[];
  faqTitle: string;
  faq: FaqItem[];
  /** Optional roles grid (outsource model only) */
  rolesTitle?: string;
  roles?: Role[];
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
};

export function HopTacModelSection({
  id,
  tag,
  title,
  desc,
  fitTitle,
  fitItems,
  processTitle,
  processSteps,
  faqTitle,
  faq,
  rolesTitle,
  roles,
  spotlightColor = "rgba(37, 99, 235, 0.3)" as `rgba(${number}, ${number}, ${number}, ${number})`,
}: HopTacModelSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  return (
    <motion.section
      id={id}
      // scroll-margin-top accounts for fixed header (64px) + sticky tab (~53px)
      style={{ scrollMarginTop: "120px" }}
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
      className="relative overflow-hidden bg-background py-16 md:py-24"
    >
      <SectionBackdrop variant="cool" />

      <div className="container mx-auto px-8 relative z-10">
        {/* Section header */}
        <motion.div variants={fadeUp} className="mb-10 max-w-2xl">
          <Tag bordered={false} color="geekblue" className="rounded-full! px-3! py-0.5! mb-4">
            {tag}
          </Tag>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{title}</h2>
          <p className="text-zinc-500 dark:text-zinc-400">{desc}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left column: fit cards + roles grid */}
          <div className="space-y-8">
            <motion.div variants={fadeUp}>
              <SpotlightCard
                spotlightColor={spotlightColor}
                className="bg-surface border border-border rounded-3xl p-6"
              >
                <h3 className="text-base font-semibold text-foreground mb-4">{fitTitle}</h3>
                <CheckList items={fitItems} />
              </SpotlightCard>
            </motion.div>

            {/* Roles grid — outsource only */}
            {roles && rolesTitle && (
              <motion.div variants={fadeUp}>
                <h3 className="text-base font-semibold text-foreground mb-4">{rolesTitle}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {roles.map((role) => (
                    <div
                      key={role.title}
                      className="bg-surface border border-border rounded-2xl p-4"
                    >
                      <p className="text-sm font-semibold text-foreground">{role.title}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">
                        {role.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right column: process + FAQ */}
          <div>
            <HopTacProcessTimeline title={processTitle} steps={processSteps} />
            <HopTacFaq title={faqTitle} items={faq} />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
