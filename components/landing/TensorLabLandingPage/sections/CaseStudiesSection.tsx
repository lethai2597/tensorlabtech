"use client";

import Image from "next/image";
import { Button, Tag } from "antd";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  ImageIcon,
  Video,
} from "lucide-react";

import ShinyText from "@/components/ShinyText";
import SpotlightCard from "@/components/SpotlightCard";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";
import { ALL_EVENTS } from "@/lib/eventRegistry";
import { EVENT_DURATION_MS } from "@/lib/eventTypes";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";
import { useCountdown } from "@/hooks/useCountdown";

/* ---------- helpers ---------- */

function getStatus(startAt?: string): "upcoming" | "live" | "ended" | "open" {
  if (!startAt) return "open";
  const start = new Date(startAt).getTime();
  const now = Date.now();
  if (now < start) return "upcoming";
  if (now < start + EVENT_DURATION_MS) return "live";
  return "ended";
}

function formatDate(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}

/* ---------- countdown overlay ---------- */

function CountdownOverlay({ startAt }: { startAt?: string }) {
  const cd = useCountdown(startAt);
  if (!cd || cd.isExpired) return null;

  return (
    <div className="absolute bottom-3 right-3 z-10">
      <Tag
        color="warning"
        bordered={false}
        className="rounded-xl! font-mono text-xs! tracking-wider m-0!"
      >
        {cd.label}
      </Tag>
    </div>
  );
}

/* ---------- status tag ---------- */

const statusConfig = {
  open: { color: "blue" as const },
  upcoming: { color: "gold" as const },
  live: { color: "red" as const },
  ended: { color: "default" as const },
};

const statusKeys = {
  open: "statusOpen",
  upcoming: "statusUpcoming",
  live: "statusLive",
  ended: "statusEnded",
} as const;

/* ---------- main component ---------- */

const DISPLAY_COUNT = 2;

export function EventsHighlightSection() {
  const t = useTranslations("landing.eventsHighlight");
  const shouldReduceMotion = useReducedMotion();
  const { fadeUp, stagger } = useSectionVariants(Boolean(shouldReduceMotion));

  const events = ALL_EVENTS.slice(0, DISPLAY_COUNT);

  return (
    <motion.section
      id="events-highlight"
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      variants={stagger}
      className="relative overflow-hidden bg-background py-20 md:py-28"
    >
      <SectionBackdrop variant="neutral" />

      <div className="container mx-auto px-8 relative z-10">
        {/* Header */}
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
              text={t("tag")}
              disabled={Boolean(shouldReduceMotion)}
              speed={2}
              color="var(--color-primary)"
              shineColor="rgba(255, 255, 255, 0.7)"
            />
          </Tag>
          <h2 className="text-3xl font-semibold text-foreground">
            {t("title")}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">{t("desc")}</p>
        </motion.div>

        {/* Event cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => {
            const status = getStatus(event.startAt);
            const dateText = event.startAt
              ? formatDate(event.startAt, "vi")
              : t(statusKeys.open);

            return (
              <motion.div key={event.slug} variants={fadeUp}>
                <Link href={`/events/${event.slug}`} className="block h-full">
                  <SpotlightCard className="h-full flex flex-col overflow-hidden">
                    {/* Thumbnail */}
                    <div className="rounded-2xl border border-border bg-background dark:bg-surface overflow-hidden mb-8 relative">
                      <div className="relative aspect-video">
                        {event.thumbnailUrl ? (
                          <Image
                            src={event.thumbnailUrl}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        ) : (
                          <>
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 bg-linear-to-br from-primary/14 via-transparent to-primary/6 dark:from-primary/10 dark:to-primary/4"
                            />
                            <div className="relative h-full w-full flex items-center justify-center">
                              <div className="size-12 rounded-2xl bg-border flex items-center justify-center text-primary">
                                <ImageIcon
                                  size={22}
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </>
                        )}

                        {/* Countdown overlay */}
                        {status === "upcoming" && (
                          <CountdownOverlay startAt={event.startAt} />
                        )}

                        {/* Arrow icon */}
                        <div
                          className="absolute top-3 right-3 size-9 rounded-xl bg-surface/90 border border-border flex items-center justify-center text-primary"
                          aria-hidden="true"
                        >
                          <ArrowUpRight size={18} strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>

                    {/* Card content */}
                    <div className="flex flex-col gap-4 flex-1">
                      <h3 className="text-xl font-bold text-foreground">
                        {event.title}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                        {event.desc}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mt-auto">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar
                            className="size-4"
                            aria-hidden="true"
                          />
                          {dateText}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Video className="size-4" aria-hidden="true" />
                          {event.format}
                        </span>
                        <Tag
                          color={statusConfig[status].color}
                          bordered={false}
                        >
                          {t(statusKeys[status])}
                        </Tag>
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA - View all events */}
        <motion.div variants={fadeUp} className="text-center mt-12">
          <Link href="/events">
            <Button
              size="large"
              className="rounded-xl! h-11! font-semibold!"
            >
              {t("ctaAll")} <ArrowRight className="size-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
