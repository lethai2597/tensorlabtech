"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { ReactNode, RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationStart?: string;
  rotationEnd?: string;
  wordAnimationStart?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationStart = "top 85%",
  rotationEnd = "bottom bottom",
  wordAnimationStart = "top 85%",
  wordAnimationEnd = "bottom bottom",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef?.current && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { transformOrigin: "0% 50%", rotate: baseRotation },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: rotationStart,
            end: rotationEnd,
            scrub: true,
          },
        },
      );

      const wordElements = el.querySelectorAll<HTMLElement>(".word");

      // Gộp opacity + blur vào 1 ScrollTrigger duy nhất để giảm scroll listeners
      gsap.fromTo(
        wordElements,
        {
          opacity: baseOpacity,
          ...(enableBlur ? { filter: `blur(${blurStrength}px)` } : {}),
          willChange: "opacity",
        },
        {
          ease: "none",
          opacity: 1,
          ...(enableBlur ? { filter: "blur(0px)" } : {}),
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: wordAnimationStart,
            end: wordAnimationEnd,
            scrub: 0.5, // số thay boolean: mượt hơn & nhẹ hơn "scrub: true"
          },
          onComplete: () => {
            // Xóa willChange sau khi animation xong để giải phóng GPU memory
            wordElements.forEach(w => { w.style.willChange = "auto"; });
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationStart,
    rotationEnd,
    wordAnimationStart,
    wordAnimationEnd,
    blurStrength,
  ]);

  return (
    <div ref={containerRef} className={`my-5 ${containerClassName}`}>
      <p
        className={`text-[clamp(1.6rem,4vw,3rem)] leading-normal font-semibold ${textClassName}`}
      >
        {splitText}
      </p>
    </div>
  );
};

export default ScrollReveal;
