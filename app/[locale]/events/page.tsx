import { getTranslations } from "next-intl/server";
import { EventsPageClient } from "@/components/events/EventsPageClient";

export async function generateMetadata() {
  const t = await getTranslations("events");
  return {
    title: t("title"),
    description: t("desc"),
  };
}

export default async function EventsPage() {
  return <EventsPageClient />;
}
