import { Metadata } from "next";

import EventContent from "./EventContent";
import { EVENT_META } from "./eventMeta";

export const metadata: Metadata = {
  title: EVENT_META.title,
  description: EVENT_META.desc,
  openGraph: {
    title: EVENT_META.title,
    description: EVENT_META.desc,
    type: "website",
    images: [
      {
        url: EVENT_META.thumbnailUrl ?? "/images/og.png",
        width: 1200,
        height: 630,
        alt: EVENT_META.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: EVENT_META.title,
    description: EVENT_META.desc,
    images: [EVENT_META.thumbnailUrl ?? "/images/og.png"],
  },
};


export default function AIEngineerEventPage() {
  return <EventContent />;
}
