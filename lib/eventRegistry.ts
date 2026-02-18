import type { EventMeta } from "./eventTypes";

import { EVENT_META as aiEngineer } from "@/app/[locale]/events/ai-application-engineer-intro/eventMeta";
import { EVENT_META as vibeCodingWorkshop } from "@/app/[locale]/events/workshop-vibe-coding-for-non-tech-people/eventMeta";

export const ALL_EVENTS: EventMeta[] = [vibeCodingWorkshop, aiEngineer];
