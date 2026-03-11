"use client";

import { motion, useReducedMotion } from "framer-motion";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

type Step = {
  label: string;
  desc: string;
};

type HopTacProcessTimelineProps = {
  title: string;
  steps: Step[];
};

export function HopTacProcessTimeline({ title, steps }: HopTacProcessTimelineProps) {
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
      className="mt-10"
    >
      <motion.h3 variants={fadeUp} className="text-lg font-semibold text-foreground mb-6">
        {title}
      </motion.h3>

      <div className="relative">
        {/* Vertical connector line */}
        <div
          aria-hidden="true"
          className="absolute left-4 top-4 bottom-4 w-px bg-border hidden sm:block"
        />

        <ol className="space-y-4">
          {steps.map((step, i) => (
            <motion.li key={i} variants={fadeUp} className="flex gap-4 items-start">
              {/* Step number circle */}
              <span className="relative z-10 flex-shrink-0 size-8 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-xs font-bold text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="pt-1 pb-2">
                <p className="text-sm font-semibold text-foreground">{step.label}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{step.desc}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}
