/* ---------- capability registry — single source of truth for homepage, list, and detail pages ---------- */

import { Cloud, Compass, Cpu, Layers, Rocket, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CapabilityItem = {
  key: string; // i18n key, e.g. "consulting"
  slug: string; // URL segment
  icon: LucideIcon;
  color: string; // Tailwind text color class (static — must be literal for Tailwind JIT)
  dotColor: string; // Tailwind bg color class for bullet dots (static literal, not derived at runtime)
  spotlightColor: `rgba(${number}, ${number}, ${number}, ${number})`; // rgba for SpotlightCard glow
  contactType: "product" | "outsource" | "other"; // pre-fills ?type= param on /contact
  contactMessage: string; // pre-fills ?message= param on /contact (Vietnamese)
};

export const CAPABILITY_ITEMS: CapabilityItem[] = [
  {
    key: "consulting",
    slug: "consulting",
    icon: Compass,
    color: "text-info",
    dotColor: "bg-sky-400",
    spotlightColor: "rgba(56, 189, 248, 0.38)",
    contactType: "outsource",
    contactMessage: "Tôi muốn tìm hiểu về dịch vụ Tư vấn chiến lược & kiến trúc",
  },
  {
    key: "dx",
    slug: "dx",
    icon: Shield,
    color: "text-success",
    dotColor: "bg-emerald-500",
    spotlightColor: "rgba(34, 197, 94, 0.35)",
    contactType: "outsource",
    contactMessage: "Tôi muốn tìm hiểu về dịch vụ Tối ưu quy trình & Developer Experience",
  },
  {
    key: "product",
    slug: "product",
    icon: Rocket,
    color: "text-primary",
    dotColor: "bg-blue-600",
    spotlightColor: "rgba(37, 99, 235, 0.35)",
    contactType: "product",
    contactMessage: "Tôi muốn tìm hiểu về dịch vụ Phát triển sản phẩm số",
  },
  {
    key: "ai",
    slug: "ai",
    icon: Cpu,
    color: "text-warning",
    dotColor: "bg-amber-400",
    spotlightColor: "rgba(245, 158, 11, 0.38)",
    contactType: "outsource",
    contactMessage: "Tôi muốn tìm hiểu về dịch vụ AI & Automation",
  },
  {
    key: "web3",
    slug: "web3",
    icon: Layers,
    color: "text-error",
    dotColor: "bg-red-500",
    spotlightColor: "rgba(239, 68, 68, 0.35)",
    contactType: "outsource",
    contactMessage: "Tôi muốn tìm hiểu về dịch vụ Web3 & dApp",
  },
  {
    key: "cloud",
    slug: "cloud",
    icon: Cloud,
    color: "text-info",
    dotColor: "bg-sky-500",
    spotlightColor: "rgba(14, 165, 233, 0.38)",
    contactType: "outsource",
    contactMessage: "Tôi muốn tìm hiểu về dịch vụ Cloud & Infrastructure",
  },
];

export function getCapabilityBySlug(slug: string): CapabilityItem | undefined {
  return CAPABILITY_ITEMS.find((c) => c.slug === slug);
}
