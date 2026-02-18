"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import { EventCard } from "@/components/events/EventCard";
import { ALL_EVENTS } from "@/lib/eventRegistry";
import { getEventStatus, formatEventDateShort } from "@/lib/eventHelpers";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

/* ---------- status labels (hardcoded vi) ---------- */

const statusLabels: Record<string, string> = {
  open: "Đang mở",
  upcoming: "Sắp diễn ra",
  live: "Đang diễn ra",
  ended: "Đã kết thúc",
};

/* ---------- main component ---------- */

export function EventsPageClient() {
  const t = useTranslations("events");
  const shouldReduceMotion = useReducedMotion();
  const { fadeUp, stagger } = useSectionVariants(Boolean(shouldReduceMotion));

  return (
    <div className="container mx-auto px-8 py-8">
      {/* Page header */}
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
          const status = getEventStatus(event.startAt);
          const dateText = event.startAt
            ? formatEventDateShort(event.startAt)
            : "Đang mở";

          return (
            <motion.div key={event.slug} variants={fadeUp}>
              <Link href={`/events/${event.slug}`} className="block h-full">
                <EventCard
                  thumbnailUrl={event.thumbnailUrl}
                  title={event.title}
                  description={event.desc}
                  dateText={dateText}
                  format={event.format}
                  status={status}
                  statusLabel={statusLabels[status]}
                  startAt={event.startAt}
                />
              </Link>
            </motion.div>
          );
        })}
      </motion.section>
    </div>
  );
}
