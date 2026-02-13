import type { Variants } from "framer-motion";

// Slightly slower + smoother so scroll-reveal feels noticeable.
const easeOut = [0.16, 1, 0.3, 1] as const;
// Trigger when the section is actually in view (more noticeable),
// while still playing only once to avoid distraction.
// Negative bottom margin delays the trigger a bit so users can see the reveal.
const viewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -120px 0px",
} as const;

export const landingViewport = viewport;

export function useSectionVariants(reduceMotion: boolean): {
  fadeIn: Variants;
  fadeUp: Variants;
  stagger: Variants;
} {
  const noMotion = reduceMotion;
  return {
    fadeIn: {
      hidden: noMotion ? {} : { opacity: 0 },
      visible: noMotion
        ? {}
        : { opacity: 1, transition: { duration: 0.6, ease: easeOut } },
    },
    fadeUp: {
      hidden: noMotion ? {} : { opacity: 0, y: 24 },
      visible: noMotion
        ? {}
        : {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: easeOut },
          },
    },
    stagger: {
      hidden: {},
      visible: noMotion
        ? {}
        : {
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.2,
            },
          },
    },
  };
}
