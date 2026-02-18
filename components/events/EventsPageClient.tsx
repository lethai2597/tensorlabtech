"use client";

import Image from "next/image";
import { Tag } from "antd";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Calendar, ImageIcon, Video } from "lucide-react";

import SpotlightCard from "@/components/SpotlightCard";
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

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("vi", {
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
      <Tag color="warning" bordered={false} className="rounded-xl! text-xs! tracking-wider m-0!">
        <span className="inline-flex items-center font-mono">
          {cd.segments.map((seg, i) => (
            <span key={seg.unit} className="inline-flex items-center">
              {i > 0 && <span className="mx-0.5 opacity-60">:</span>}
              <span style={{ display: "inline-block", width: "1.6em", textAlign: "right" }}>{seg.value}</span>
              <span className="opacity-70">{seg.unit}</span>
            </span>
          ))}
        </span>
      </Tag>
    </div>
  );
}

/* ---------- status tag ---------- */

const statusConfig = {
  open: { label: "Đang mở", color: "blue" as const },
  upcoming: { label: "Sắp diễn ra", color: "gold" as const },
  live: { label: "Đang diễn ra", color: "red" as const },
  ended: { label: "Đã kết thúc", color: "default" as const },
};

/* ---------- main component ---------- */

export function EventsPageClient() {
  const t = useTranslations("events");
  const shouldReduceMotion = useReducedMotion();
  const { fadeUp, stagger } = useSectionVariants(Boolean(shouldReduceMotion));

  return (
    <div className="container mx-auto px-8 py-8">
      {/* Page header - guideline: space-y-4 mb-8, text-3xl font-semibold */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        variants={stagger}
        className="space-y-4 mb-8 text-center"
      >
        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-5xl font-semibold text-foreground"
        >
          {t("title")}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="text-sm text-zinc-500 dark:text-zinc-400"
        >
          {t("desc")}
        </motion.p>
      </motion.div>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {ALL_EVENTS.map((event) => {
          const status = getStatus(event.startAt);
          const dateText = event.startAt
            ? formatDate(event.startAt)
            : "Đang mở";

          return (
            <motion.div key={event.slug} variants={fadeUp}>
              <Link href={`/events/${event.slug}`} className="block h-full">
                <SpotlightCard className="h-full flex flex-col overflow-hidden">
                  {/* Thumbnail — rounded-2xl, border, no shadow */}
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
                              <ImageIcon size={22} aria-hidden="true" />
                            </div>
                          </div>
                        </>
                      )}

                      {/* Countdown overlay — bottom-right of thumbnail (upcoming only) */}
                      {status === "upcoming" && (
                        <CountdownOverlay startAt={event.startAt} />
                      )}

                      {/* Arrow icon — top-right */}
                      <div
                        className="absolute top-3 right-3 size-9 rounded-xl bg-surface/90 border border-border flex items-center justify-center text-primary"
                        aria-hidden="true"
                      >
                        <ArrowUpRight size={18} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>

                  {/* Card content — space-y-4 */}
                  <div className="flex flex-col gap-4 flex-1">
                    <h3 className="text-xl font-bold text-foreground">
                      {event.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                      {event.desc}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mt-auto">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-4" aria-hidden="true" />
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
                        {statusConfig[status].label}
                      </Tag>
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            </motion.div>
          );
        })}
      </motion.section>
    </div>
  );
}
