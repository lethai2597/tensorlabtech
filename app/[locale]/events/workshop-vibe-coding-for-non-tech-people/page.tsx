import { Metadata } from "next";

import EventContent from "./EventContent";
import { EVENT_META } from "./eventMeta";

export const metadata: Metadata = {
    title: EVENT_META.title,
    description: EVENT_META.desc,
};

export default function VibeCodingWorkshopPage() {
    return <EventContent />;
}
