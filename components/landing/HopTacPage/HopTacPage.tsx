"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { HopTacHero } from "./HopTacHero";
import { HopTacStickyTab } from "./HopTacStickyTab";
import { HopTacModelSection } from "./HopTacModelSection";
import { HopTacCta } from "./HopTacCta";

type ActiveTab = "product" | "outsource";

export function HopTacPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("product");
  const tProduct = useTranslations("hopTac.product");
  const tOutsource = useTranslations("hopTac.outsource");

  // Intersection Observer: auto-highlight tab based on which section is in view
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = ["product", "outsource"] as const;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the entry with largest intersection ratio that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveTab(visible[0]!.target.id as ActiveTab);
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const productFaq = [0, 1, 2, 3].map((i) => ({
    q: tProduct(`faq.${i}.q`),
    a: tProduct(`faq.${i}.a`),
  }));

  const productSteps = [0, 1, 2, 3, 4].map((i) => ({
    label: tProduct(`processSteps.${i}.label`),
    desc: tProduct(`processSteps.${i}.desc`),
  }));

  const outsourceFaq = [0, 1, 2, 3].map((i) => ({
    q: tOutsource(`faq.${i}.q`),
    a: tOutsource(`faq.${i}.a`),
  }));

  const outsourceSteps = [0, 1, 2, 3, 4].map((i) => ({
    label: tOutsource(`processSteps.${i}.label`),
    desc: tOutsource(`processSteps.${i}.desc`),
  }));

  const outsourceRoles = [0, 1, 2, 3, 4, 5].map((i) => ({
    title: tOutsource(`roles.${i}.title`),
    desc: tOutsource(`roles.${i}.desc`),
  }));

  return (
    <main className="min-h-screen">
      <HopTacHero />

      <HopTacStickyTab activeTab={activeTab} onTabChange={setActiveTab} />

      <HopTacModelSection
        id="product"
        tag={tProduct("tag")}
        title={tProduct("title")}
        desc={tProduct("desc")}
        fitTitle={tProduct("fitTitle")}
        fitItems={[0, 1, 2, 3].map((i) => tProduct(`fitItems.${i}`))}
        processTitle={tProduct("processTitle")}
        processSteps={productSteps}
        faqTitle={tProduct("faqTitle")}
        faq={productFaq}
        spotlightColor="rgba(37, 99, 235, 0.3)"
      />

      <HopTacModelSection
        id="outsource"
        tag={tOutsource("tag")}
        title={tOutsource("title")}
        desc={tOutsource("desc")}
        fitTitle={tOutsource("fitTitle")}
        fitItems={[0, 1, 2, 3].map((i) => tOutsource(`fitItems.${i}`))}
        processTitle={tOutsource("processTitle")}
        processSteps={outsourceSteps}
        faqTitle={tOutsource("faqTitle")}
        faq={outsourceFaq}
        rolesTitle={tOutsource("rolesTitle")}
        roles={outsourceRoles}
        spotlightColor="rgba(37, 99, 235, 0.22)"
      />

      <HopTacCta activeTab={activeTab} />
    </main>
  );
}
