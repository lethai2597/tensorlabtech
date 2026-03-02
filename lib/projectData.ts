/* ---------- project registry ---------- */

export const PROJECT_ITEMS = [
  {
    key: "ecommerce-assistant",
    slug: "ecommerce-assistant",
    url: "https://ecommerce-assistant.tensorlab.tech/",
    isPublic: false,
    thumbnailUrl: "/images/projects/ecommerce-assistant.png",
    spotlightColor: "rgba(139, 92, 246, 0.35)" as const,
    categoryColor: "text-violet-500",
    categoryBg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    key: "ccpoke",
    slug: "ccpoke",
    url: "https://kaida-palooza.github.io/ccpoke/vi/",
    isPublic: true,
    thumbnailUrl: "/images/projects/ccpoke.png",
    spotlightColor: "rgba(249, 115, 22, 0.35)" as const,
    categoryColor: "text-orange-500",
    categoryBg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    key: "vocabolt",
    slug: "vocabolt",
    url: "https://vocabolt.fun/",
    isPublic: true,
    thumbnailUrl: "/images/projects/vocabolt.png",
    spotlightColor: "rgba(99, 102, 241, 0.35)" as const,
    categoryColor: "text-indigo-500",
    categoryBg: "bg-indigo-500/10 border-indigo-500/20",
  },
  {
    key: "moni",
    slug: "moni",
    url: "https://moniapp.io.vn/",
    isPublic: true,
    thumbnailUrl: "/images/projects/moni.png",
    spotlightColor: "rgba(6, 182, 212, 0.35)" as const,
    categoryColor: "text-cyan-500",
    categoryBg: "bg-cyan-500/10 border-cyan-500/20",
  },
] as const;

export type ProjectItem = (typeof PROJECT_ITEMS)[number];
