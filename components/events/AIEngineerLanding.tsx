"use client";

import { Button, Tag } from "antd";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Code2,
  Database,
  FileText,
  FolderGit2,
  Layers,
  Lightbulb,
  Presentation,
  Rocket,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

import ShinyText from "@/components/ShinyText";
import SpotlightCard from "@/components/SpotlightCard";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";
import { EVENT_META } from "@/app/[locale]/events/ai-application-engineer-intro/eventMeta";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

type LearnItem = { title: string; desc: string };
type AgendaItem = { phase: string; title: string; desc: string };
type ResourceItem = { title: string; desc: string };

function isLearnItems(value: unknown): value is LearnItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (v) => typeof v === "object" && v !== null && "title" in v && "desc" in v,
    )
  );
}

function isAgendaItems(value: unknown): value is AgendaItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (v) =>
        typeof v === "object" &&
        v !== null &&
        "phase" in v &&
        "title" in v &&
        "desc" in v,
    )
  );
}

function isResourceItems(value: unknown): value is ResourceItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (v) => typeof v === "object" && v !== null && "title" in v && "desc" in v,
    )
  );
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((x) => typeof x === "string");
}

const learnIcons = [Lightbulb, Layers, Code2, Rocket] as const;
const agendaIcons = [Brain, Database, Layers, Zap, Rocket, Sparkles] as const;
const resourceIcons = [Presentation, FileText, Code2, FolderGit2] as const;

export function AIEngineerLanding() {
  const t = useTranslations("events.items.aiAppEngineerIntro.landing");
  const shouldReduceMotion = useReducedMotion();
  const { fadeUp, stagger } = useSectionVariants(Boolean(shouldReduceMotion));

  const learnRaw = t.raw("whatYouLearn.items");
  const learnItems = isLearnItems(learnRaw) ? learnRaw : [];

  const whoRaw = t.raw("whoShouldAttend.items");
  const whoItems = isStringArray(whoRaw) ? whoRaw : [];

  const agendaRaw = t.raw("agenda.items");
  const agendaItems = isAgendaItems(agendaRaw) ? agendaRaw : [];

  const resourcesRaw = t.raw("resources.items");
  const resourceItems = isResourceItems(resourcesRaw) ? resourcesRaw : [];


  return (
    <>
      {/* Overview — AI Application Engineer */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        variants={stagger}
        className="relative overflow-hidden bg-background py-20 md:py-28"
      >
        <SectionBackdrop variant="cool" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            variants={fadeUp}
            className="max-w-3xl mx-auto text-center flex flex-col items-center gap-4 mb-16"
          >
            <Tag
              bordered={false}
              color="geekblue"
              className="rounded-full! px-3! py-0.5!"
            >
              <ShinyText
                text={t("overview.tag")}
                disabled={Boolean(shouldReduceMotion)}
                speed={2}
                color="var(--color-primary)"
                shineColor="rgba(255, 255, 255, 0.7)"
              />
            </Tag>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              <span className="bg-linear-to-r from-(--color-primary) to-(--color-info) bg-clip-text text-transparent">
                {t("overview.title")}
              </span>
            </h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
              {t("overview.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card: Là gì? */}
            <motion.div variants={fadeUp}>
              <SpotlightCard className="h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-2xl bg-primary/12 dark:bg-primary/18 flex items-center justify-center text-primary shrink-0">
                      <Brain size={24} aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {t("overview.cards.whatIsIt.title")}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {t("overview.cards.whatIsIt.desc")}
                  </p>
                  <ul className="space-y-3 pt-2">
                    {(isStringArray(t.raw("overview.cards.whatIsIt.points"))
                      ? (t.raw("overview.cards.whatIsIt.points") as string[])
                      : []
                    ).map((point, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed"
                      >
                        <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Card: Làm được gì? */}
            <motion.div variants={fadeUp}>
              <SpotlightCard className="h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-2xl bg-success/12 dark:bg-success/18 flex items-center justify-center text-success shrink-0">
                      <Zap size={24} aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {t("overview.cards.whatCanYouDo.title")}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {t("overview.cards.whatCanYouDo.desc")}
                  </p>
                  <ul className="space-y-3 pt-2">
                    {(isStringArray(t.raw("overview.cards.whatCanYouDo.points"))
                      ? (t.raw("overview.cards.whatCanYouDo.points") as string[])
                      : []
                    ).map((point, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed"
                      >
                        <CheckCircle2 className="size-4 text-success shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* What You'll Learn Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        variants={stagger}
        className="relative overflow-hidden bg-background py-20 md:py-28"
      >
        <SectionBackdrop variant="primary" />
        <div className="container mx-auto px-8 relative z-10">
          <motion.div
            variants={fadeUp}
            className="max-w-2xl mx-auto text-center flex flex-col items-center gap-4 mb-16"
          >
            <Tag
              bordered={false}
              color="geekblue"
              className="rounded-full! px-3! py-0.5!"
            >
              <ShinyText
                text={t("whatYouLearn.tag")}
                disabled={Boolean(shouldReduceMotion)}
                speed={2}
                color="var(--color-primary)"
                shineColor="rgba(255, 255, 255, 0.7)"
              />
            </Tag>
            <h2 className="text-3xl font-semibold text-foreground">
              {t("whatYouLearn.title")}
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              {t("whatYouLearn.desc")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {learnItems.map((item, i) => {
              const Icon = learnIcons[i] ?? Lightbulb;
              return (
                <motion.div key={i} variants={fadeUp}>
                  <SpotlightCard className="h-full">
                    <div className="space-y-3">
                      <div className="size-12 rounded-2xl bg-primary/12 dark:bg-primary/18 flex items-center justify-center text-primary">
                        <Icon size={24} aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Who Should Attend Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        variants={stagger}
        className="relative overflow-hidden bg-background py-20 md:py-28"
      >
        <SectionBackdrop variant="neutral" />
        <div className="container mx-auto px-8 relative z-10">
          <motion.div
            variants={fadeUp}
            className="max-w-2xl mx-auto text-center flex flex-col items-center gap-4 mb-16"
          >
            <Tag
              bordered={false}
              color="geekblue"
              className="rounded-full! px-3! py-0.5!"
            >
              <ShinyText
                text={t("whoShouldAttend.tag")}
                disabled={Boolean(shouldReduceMotion)}
                speed={2}
                color="var(--color-primary)"
                shineColor="rgba(255, 255, 255, 0.7)"
              />
            </Tag>
            <h2 className="text-3xl font-semibold text-foreground">
              {t("whoShouldAttend.title")}
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="max-w-3xl mx-auto">
            <SpotlightCard>
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-xl bg-info/12 dark:bg-info/18 flex items-center justify-center text-info">
                  <Users size={20} aria-hidden="true" />
                </div>
                <span className="text-lg font-semibold text-foreground">
                  {t("whoShouldAttend.suitableFor")}
                </span>
              </div>
              <ul className="space-y-4 mb-6">
                {whoItems.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-zinc-600 dark:text-zinc-300 text-base leading-relaxed"
                  >
                    <CheckCircle2 className="size-5 text-success shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 italic border-t border-border pt-4">
                {t("whoShouldAttend.notFor")}
              </p>
            </SpotlightCard>
          </motion.div>
        </div>
      </motion.section>

      {/* Agenda Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        variants={stagger}
        className="relative overflow-hidden bg-background py-20 md:py-28"
      >
        <SectionBackdrop variant="cool" />
        <div className="container mx-auto px-8 relative z-10">
          <motion.div
            variants={fadeUp}
            className="max-w-2xl mx-auto text-center flex flex-col items-center gap-4 mb-16"
          >
            <Tag
              bordered={false}
              color="geekblue"
              className="rounded-full! px-3! py-0.5!"
            >
              <ShinyText
                text={t("agenda.tag")}
                disabled={Boolean(shouldReduceMotion)}
                speed={2}
                color="var(--color-primary)"
                shineColor="rgba(255, 255, 255, 0.7)"
              />
            </Tag>
            <h2 className="text-3xl font-semibold text-foreground">
              {t("agenda.title")}
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              {t("agenda.desc")}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[22px] md:left-[24px] top-6 bottom-6 w-px bg-linear-to-b from-primary/60 via-primary/20 to-transparent"
              />

              <ol className="space-y-4 md:space-y-6">
                {agendaItems.map((item, idx) => {
                  const Icon = agendaIcons[idx] ?? Brain;
                  return (
                    <motion.li
                      key={idx}
                      variants={fadeUp}
                      className="grid grid-cols-[44px_1fr] md:grid-cols-[48px_1fr] gap-4 md:gap-6"
                    >
                      <div className="pt-4">
                        <div className="relative z-10 size-11 md:size-12 rounded-2xl bg-surface border border-border flex items-center justify-center text-primary">
                          <Icon size={22} aria-hidden="true" />
                        </div>
                      </div>

                      <SpotlightCard className="group">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-xl font-bold text-foreground">
                            {item.title}
                          </h3>
                          <span className="inline-flex items-center justify-center rounded-full border border-border bg-border/40 px-3 py-1 text-xs font-medium text-foreground shrink-0">
                            {item.phase}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </SpotlightCard>
                    </motion.li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Resources Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        variants={stagger}
        className="relative overflow-hidden bg-background py-20 md:py-28"
      >
        <SectionBackdrop variant="primary" />
        <div className="container mx-auto px-8 relative z-10">
          <motion.div
            variants={fadeUp}
            className="max-w-2xl mx-auto text-center flex flex-col items-center gap-4 mb-16"
          >
            <Tag
              bordered={false}
              color="geekblue"
              className="rounded-full! px-3! py-0.5!"
            >
              <ShinyText
                text={t("resources.tag")}
                disabled={Boolean(shouldReduceMotion)}
                speed={2}
                color="var(--color-primary)"
                shineColor="rgba(255, 255, 255, 0.7)"
              />
            </Tag>
            <h2 className="text-3xl font-semibold text-foreground">
              {t("resources.title")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {resourceItems.map((item, i) => {
              const Icon = resourceIcons[i] ?? BookOpen;
              return (
                <motion.div key={i} variants={fadeUp}>
                  <SpotlightCard className="h-full">
                    <div className="flex items-start gap-4">
                      <div className="size-12 rounded-2xl bg-success/12 dark:bg-success/18 flex items-center justify-center text-success shrink-0">
                        <Icon size={24} aria-hidden="true" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        variants={stagger}
        className="relative overflow-hidden bg-background py-20 md:py-28"
      >
        <SectionBackdrop variant="neutral" />
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden bg-surface border border-border rounded-3xl p-8 md:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/12 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -left-28 size-80 rounded-full bg-primary/10 blur-3xl"
              />

              <div className="relative text-center space-y-6">
                <motion.div
                  variants={fadeUp}
                  className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto"
                >
                  <Rocket size={28} className="text-primary" />
                </motion.div>

                <motion.h2
                  variants={fadeUp}
                  className="text-2xl md:text-3xl font-bold text-foreground"
                >
                  {t("cta.title")}
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto"
                >
                  {t("cta.desc")}
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
                  {EVENT_META.registrationUrl && (
                    <Button
                      type="primary"
                      size="large"
                      href={EVENT_META.registrationUrl}
                      target="_blank"
                      className="px-8! text-base! font-semibold! rounded-xl! inline-flex items-center gap-2"
                    >
                      {t("cta.register")} <ArrowRight className="size-4" />
                    </Button>
                  )}
                  <Button
                    size="large"
                    href="https://github.com/lethai2597/learn-ai-engineer"
                    target="_blank"
                    className="px-8! text-base! font-semibold! rounded-xl! inline-flex items-center gap-2"
                  >
                    {t("cta.button")} <ArrowRight className="size-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
