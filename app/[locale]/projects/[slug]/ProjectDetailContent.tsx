"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "antd";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Layers,
  Lightbulb,
  MessageCircle,
  Target,
  Zap,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { PROJECT_ITEMS } from "@/lib/projectData";
import SpotlightCard from "@/components/SpotlightCard";

import type { Variants } from "framer-motion";

/* ---------- animation config ---------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const FEATURE_ICONS = [Zap, Layers, Target, Lightbulb] as const;

/* ---------- main component ---------- */

export default function ProjectDetailContent({ slug }: { slug: string }) {
  const t = useTranslations("landing.projects");
  const tDetail = useTranslations("projectDetail");
  const shouldReduceMotion = useReducedMotion();

  const project = PROJECT_ITEMS.find((p) => p.slug === slug);
  if (!project) return null;

  const title = t(`items.${project.key}.title`);
  const desc = t(`items.${project.key}.desc`);
  const category = t(`items.${project.key}.category`);
  const techStack: string[] = t.raw(`items.${project.key}.tech`) as string[];

  /* Try to get detail translations — they may or may not exist */
  let features: { title: string; desc: string }[] = [];
  let detailDesc: string | null = null;

  try {
    detailDesc = tDetail(`${project.key}.desc`);
  } catch {
    detailDesc = null;
  }

  try {
    features = tDetail.raw(`${project.key}.features`) as {
      title: string;
      desc: string;
    }[];
  } catch {
    features = [];
  }

  const motionProps = shouldReduceMotion
    ? {}
    : { initial: "hidden" as const, animate: "visible" as const };

  return (
    <motion.main
      {...motionProps}
      variants={stagger}
      className="bg-background"
    >
      {/* Hero / Header */}
      <section className="relative overflow-hidden pt-6 pb-12 md:pt-8 md:pb-16">
        {/* Decorative blobs */}
        <div className="absolute -top-40 -right-40 size-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 size-[400px] rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-8 relative z-10">
          {/* Back link */}
          <motion.div variants={fadeUp}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-primary transition-colors mb-8 no-underline"
            >
              <ArrowLeft className="size-4" />
              {tDetail("backToProjects")}
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Info */}
            <div className="space-y-6">
              <motion.div variants={fadeUp}>
                <span
                  className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold ${project.categoryBg} ${project.categoryColor}`}
                >
                  {category}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight"
              >
                {title}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg"
              >
                {detailDesc ?? desc}
              </motion.p>

              {/* Tech chips */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-zinc-500 dark:text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div variants={fadeUp} className="flex gap-3 pt-2">
                {project.isPublic ? (
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    <Button
                      type="primary"
                      size="large"
                      icon={<ExternalLink className="size-4" />}
                    >
                      {tDetail("visitProject")}
                    </Button>
                  </a>
                ) : (
                  <Link
                    href={{
                      pathname: "/contact",
                      query: {
                        type: "product",
                        message: `Tôi quan tâm đến dự án ${title}. Tôi muốn tìm hiểu thêm và được tư vấn chi tiết.`,
                      },
                    }}
                  >
                    <Button
                      type="primary"
                      size="large"
                      icon={<MessageCircle className="size-4" />}
                    >
                      {tDetail("contactForDemo")}
                    </Button>
                  </Link>
                )}
              </motion.div>
            </div>

            {/* Right: Screenshot */}
            <motion.div variants={fadeUp}>
              <SpotlightCard
                spotlightColor={project.spotlightColor}
                className="p-0! overflow-hidden!"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                  <Image
                    src={project.thumbnailUrl}
                    alt={title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features section — only if features exist */}
      {features.length > 0 && (
        <section className="py-20 md:py-24 bg-background">
          <div className="container mx-auto px-8">
            <motion.h2
              variants={fadeUp}
              {...motionProps}
              className="text-3xl font-bold text-foreground text-center mb-4"
            >
              {tDetail("featuresTitle")}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              {...motionProps}
              className="text-zinc-500 dark:text-zinc-400 text-center mb-12 max-w-2xl mx-auto"
            >
              {tDetail("featuresDesc")}
            </motion.p>

            <motion.div
              {...motionProps}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {features.map((feature, idx) => {
                const Icon = FEATURE_ICONS[idx % FEATURE_ICONS.length];
                return (
                  <motion.div key={idx} variants={fadeUp}>
                    <SpotlightCard
                      spotlightColor={project.spotlightColor}
                      className="h-full"
                    >
                      <div className="flex flex-col items-start gap-4">
                        <div
                          className={`inline-flex items-center justify-center size-10 rounded-xl ${project.categoryBg}`}
                        >
                          <Icon className={`size-5 ${project.categoryColor}`} />
                        </div>
                        <h3 className="text-base font-semibold text-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Bottom */}
      <section className="py-16 md:py-20 bg-gradient-to-t from-primary/5 to-background">
        <div className="container mx-auto px-8 text-center">
          <motion.h2
            variants={fadeUp}
            {...motionProps}
            className="text-3xl font-bold text-foreground mb-4"
          >
            {tDetail("ctaTitle")}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            {...motionProps}
            className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-lg mx-auto"
          >
            {tDetail("ctaDesc")}
          </motion.p>
          <motion.div
            variants={fadeUp}
            {...motionProps}
            className="flex justify-center gap-4"
          >
            {project.isPublic ? (
              <>
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  <Button
                    type="primary"
                    size="large"
                    icon={<ArrowUpRight className="size-4" />}
                  >
                    {tDetail("visitProject")}
                  </Button>
                </a>
                <Link
                  href={{
                    pathname: "/contact",
                    query: {
                      type: "product",
                      message: `Tôi quan tâm đến dự án ${title}. Tôi muốn tìm hiểu thêm và được tư vấn chi tiết.`,
                    },
                  }}
                >
                  <Button size="large">{tDetail("contactUs")}</Button>
                </Link>
              </>
            ) : (
              <Link
                href={{
                  pathname: "/contact",
                  query: {
                    type: "product",
                    message: `Tôi quan tâm đến dự án ${title}. Tôi muốn tìm hiểu thêm và được tư vấn chi tiết.`,
                  },
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  icon={<MessageCircle className="size-4" />}
                >
                  {tDetail("contactForDemo")}
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
