"use client";

import Image from "next/image";
import { Button, Tag } from "antd";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

import { SectionHeader } from "@/components/landing/SectionHeader";
import { EventCard } from "@/components/events/EventCard";
import { SectionBackdrop } from "@/components/landing/TensorLabLandingPage/SectionBackdrop";
import { ALL_EVENTS } from "@/lib/eventRegistry";
import { getEventStatus, formatEventDateShort } from "@/lib/eventHelpers";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

/* ---------- i18n status keys ---------- */

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
  const reduced = Boolean(shouldReduceMotion);
  const { fadeUp, stagger } = useSectionVariants(reduced);

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
        <SectionHeader
          tag={t("tag")}
          title={t("title")}
          description={t("desc")}
          reducedMotion={reduced}
          fadeUp={fadeUp}
        />

        {/* Event cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => {
            const status = getEventStatus(event.startAt);
            const dateText = event.startAt
              ? formatEventDateShort(event.startAt)
              : t(statusKeys.open);

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
                    statusLabel={t(statusKeys[status])}
                    startAt={event.startAt}
                  />
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
