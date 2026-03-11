"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Tag } from "antd";

import ShinyText from "@/components/ShinyText";
import { useSectionVariants } from "@/lib/landingMotion";
import { CAPABILITY_ITEMS } from "@/lib/capabilityData";
import { Link } from "@/i18n/navigation";

type FeatureItem = { title: string; desc: string };

export default function CapabilitiesListContent() {
  const t = useTranslations("capabilityList");
  const tCaps = useTranslations("landing.capabilities");
  const tDetail = useTranslations("capabilityDetail");
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

  return (
    <div className="container mx-auto px-8 py-8 pb-24">
      {/* Page header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="py-12 mb-4 flex flex-col items-center gap-4 text-center"
      >
        <motion.div variants={fadeUp}>
          <Tag
            bordered={false}
            color="geekblue"
            className="rounded-full! px-3! py-0.5!"
          >
            <ShinyText
              text={t("tag")}
              disabled={reduced}
              speed={2}
              color="var(--color-primary)"
              shineColor="rgba(255, 255, 255, 0.7)"
            />
          </Tag>
        </motion.div>
        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-5xl font-bold text-foreground"
        >
          {t("title")}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="text-zinc-500 dark:text-zinc-400 max-w-xl"
        >
          {t("desc")}
        </motion.p>
      </motion.div>

      {/* Alternating rows — 1 row per capability */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {CAPABILITY_ITEMS.map((cap, idx) => {
          const isEven = idx % 2 === 0;

          // Safe read of features array
          let features: FeatureItem[] = [];
          try {
            features = tDetail.raw(
              `items.${cap.key}.features`,
            ) as FeatureItem[];
          } catch {
            features = [];
          }

          return (
            <motion.div
              key={cap.key}
              variants={fadeUp}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 py-16 ${
                !isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Placeholder block — light tinted bg + large centered icon, always square */}
              <div className="w-full md:w-2/5 flex-shrink-0">
                <div
                  className={`w-full aspect-square rounded-4xl bg-surface flex items-center justify-center`}
                >
                  <cap.icon size={96} className={`${cap.color} opacity-70`} />
                </div>
              </div>

              {/* Content — all 4 features for better text/visual balance */}
              <div className="w-full md:w-3/5 flex flex-col justify-center space-y-5">
                <div className="flex items-center gap-3">
                  {/* <div className="size-10 rounded-xl bg-border flex items-center justify-center flex-shrink-0">
                    <cap.icon size={18} className={cap.color} />
                  </div> */}
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {tCaps(`items.${cap.key}.title`)}
                  </h2>
                </div>

                {/* Long description */}
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {tDetail(`items.${cap.key}.longDesc`)}
                </p>

                {/* All 4 feature bullets — fills vertical space to balance large visual */}
                {features.length > 0 && (
                  <ul className="space-y-3 text-sm">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className={`mt-2 size-1.5 rounded-full flex-shrink-0 ${cap.dotColor}`}
                        />
                        <span className="text-zinc-500 dark:text-zinc-400">
                          <strong className="text-foreground">{f.title}</strong>{" "}
                          — {f.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA button — navigates to /contact with pre-filled type + message */}
                <div className="pt-2">
                  <Link
                    href={`/contact?type=${cap.contactType}&message=${encodeURIComponent(cap.contactMessage)}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-surface border border-border hover:border-primary hover:text-primary transition-colors duration-200 text-foreground"
                  >
                    {tDetail("consultButton")}
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
