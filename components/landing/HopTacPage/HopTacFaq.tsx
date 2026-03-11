"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

type FaqItem = {
  q: string;
  a: string;
};

type HopTacFaqProps = {
  title: string;
  items: FaqItem[];
};

export function HopTacFaq({ title, items }: HopTacFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

      <div className="space-y-2">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              variants={fadeUp}
              className="border border-border rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-foreground hover:bg-surface/60 transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={[
                    "size-4 shrink-0 text-zinc-400 transition-transform duration-200",
                    isOpen ? "rotate-180" : "",
                  ].join(" ")}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="answer"
                    initial={reduced ? {} : { height: 0, opacity: 0 }}
                    animate={reduced ? {} : { height: "auto", opacity: 1 }}
                    exit={reduced ? {} : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
