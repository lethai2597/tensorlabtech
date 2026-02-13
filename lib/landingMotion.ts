import type { Variants } from "framer-motion";

const easeOut = [0.22, 0.61, 0.36, 1] as const;
const viewport = { once: true, margin: "-60px" } as const;

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
        : { opacity: 1, transition: { duration: 0.4, ease: easeOut } },
    },
    fadeUp: {
      hidden: noMotion ? {} : { opacity: 0, y: 20 },
      visible: noMotion
        ? {}
        : {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: easeOut },
          },
    },
    stagger: {
      hidden: {},
      visible: noMotion
        ? {}
        : {
            transition: {
              staggerChildren: 0.08,
              delayChildren: 0.1,
            },
          },
    },
  };
}
