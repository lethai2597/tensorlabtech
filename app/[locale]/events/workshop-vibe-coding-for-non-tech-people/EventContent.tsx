"use client";

import { EventDetailHeroClient } from "@/components/events/EventDetailHeroClient";
import { useTranslations } from "next-intl";

import { EVENT_META } from "./eventMeta";
import { VibeCodingWorkshopLanding } from "@/components/events/VibeCodingWorkshopLanding";

export default function EventContent() {
    const t = useTranslations("events");

    return (
        <>
            <EventDetailHeroClient
                thumbnailUrl={EVENT_META.thumbnailUrl}
                title={EVENT_META.title}
                startAt={EVENT_META.startAt}
                registrationUrl={EVENT_META.registrationUrl}
                backLabel={t("backToEvents")}
                priceLabel={t("priceFree")}
                calendarLabel={t("addToCalendar")}
                registerLabel={t("registerNow")}
                dateLabel={t("date")}
                formatLabel={t("format")}
                formatValue={EVENT_META.format}
            />
            <VibeCodingWorkshopLanding />
        </>
    );
}
