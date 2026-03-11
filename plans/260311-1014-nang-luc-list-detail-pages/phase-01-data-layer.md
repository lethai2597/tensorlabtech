# Phase 01 — Data Layer: lib/capabilityData.ts

**Status:** ✅ completed | **Est:** 1h | **Priority:** Critical (blocks all other phases)

## Context Links
- Current data source: `components/landing/TensorLabLandingPage/sections/CapabilitiesSection.tsx` (lines 21-58)
- Pattern reference: `lib/projectData.ts`
- i18n reference: `locales/en.json` → `landing.capabilities.items.*`

## Overview

Extract hardcoded capability data from `CapabilitiesSection.tsx` into a shared `lib/capabilityData.ts` file. This is the single source of truth for all 3 surfaces: homepage section, list page, detail page.

## Files to Create

- `lib/capabilityData.ts` — new

## Files to Modify

- `components/landing/TensorLabLandingPage/sections/CapabilitiesSection.tsx` — import from new data file (remove hardcoded array)
- `locales/en.json` — add `capabilityDetail.*` namespace
- `locales/vi.json` — add `capabilityDetail.*` namespace

## Type Structure

```ts
// lib/capabilityData.ts

import { Cloud, Compass, Cpu, Layers, Rocket, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CapabilityItem = {
  key: string;                  // e.g. "consulting" — used as i18n key
  slug: string;                 // URL segment — same as key for all 6
  icon: LucideIcon;
  color: string;                // Tailwind text color class e.g. "text-info"
  spotlightColor: string;       // rgba for SpotlightCard glow
};

export const CAPABILITY_ITEMS: CapabilityItem[] = [
  {
    key: "consulting",
    slug: "consulting",
    icon: Compass,
    color: "text-info",
    spotlightColor: "rgba(56, 189, 248, 0.38)",
  },
  {
    key: "dx",
    slug: "dx",
    icon: Shield,
    color: "text-success",
    spotlightColor: "rgba(34, 197, 94, 0.35)",
  },
  {
    key: "product",
    slug: "product",
    icon: Rocket,
    color: "text-primary",
    spotlightColor: "rgba(37, 99, 235, 0.35)",
  },
  {
    key: "ai",
    slug: "ai",
    icon: Cpu,
    color: "text-warning",
    spotlightColor: "rgba(245, 158, 11, 0.38)",
  },
  {
    key: "web3",
    slug: "web3",
    icon: Layers,
    color: "text-error",
    spotlightColor: "rgba(239, 68, 68, 0.35)",
  },
  {
    key: "cloud",
    slug: "cloud",
    icon: Cloud,
    color: "text-info",
    spotlightColor: "rgba(14, 165, 233, 0.38)",
  },
] as const;

export function getCapabilityBySlug(slug: string): CapabilityItem | undefined {
  return CAPABILITY_ITEMS.find((c) => c.slug === slug);
}
```

## i18n Keys to Add

Add a new `capabilityDetail` namespace in both `en.json` and `vi.json` (alongside existing `projectDetail`):

```json
// locales/en.json — add after "projectDetail"
"capabilityDetail": {
  "backToCapabilities": "Back to capabilities",
  "featuresTitle": "What we do",
  "featuresDesc": "Core capabilities and how we deliver value.",
  "ctaTitle": "Ready to work with TensorLab?",
  "ctaDesc": "Tell us about your project and we'll propose the right approach.",
  "ctaButton": "Contact us",
  "viewAll": "View all capabilities",
  "learnMore": "Learn more",
  "items": {
    "consulting": {
      "longDesc": "We align technology decisions with your business goals — from system architecture, technical roadmap, and code quality standards to choosing the right stack and trade-offs for your context.",
      "features": [
        { "title": "Architecture Review", "desc": "Assess current state and design a scalable, maintainable target architecture." },
        { "title": "Technical Roadmap", "desc": "Prioritize technical investments aligned to product milestones." },
        { "title": "Stack Selection", "desc": "Evaluate trade-offs to choose the right tools for your team and context." },
        { "title": "Quality Standards", "desc": "Establish coding conventions, review processes, and delivery standards." }
      ]
    },
    "dx": {
      "longDesc": "We help organizations move faster by standardizing processes, integrating systems, and automating repetitive workflows — turning operational bottlenecks into competitive advantages.",
      "features": [
        { "title": "Process Standardization", "desc": "Map and streamline key workflows for consistency and speed." },
        { "title": "System Integration", "desc": "Connect siloed tools and data sources into a unified operational layer." },
        { "title": "Workflow Automation", "desc": "Automate manual, repetitive tasks using modern tooling and RPA." },
        { "title": "Data Enablement", "desc": "Structure and surface operational data for better decision-making." }
      ]
    },
    "product": {
      "longDesc": "From discovery to production-grade delivery — we build digital products that are fast to ship, easy to maintain, and cost-efficient to operate. Not just task execution, but outcome ownership.",
      "features": [
        { "title": "Discovery & Scoping", "desc": "Clarify goals, users, and MVP scope before writing a single line of code." },
        { "title": "UI/UX Design", "desc": "User-centered design with a focus on clarity, speed, and accessibility." },
        { "title": "MVP Delivery", "desc": "Ship a working, production-ready MVP with clean architecture from day one." },
        { "title": "Scale & Iteration", "desc": "Extend features, optimize performance, and maintain operability as you grow." }
      ]
    },
    "ai": {
      "longDesc": "We take AI from proof-of-concept to production — building RAG pipelines, knowledge bases, AI agents, and recommendation systems with proper MLOps, evaluation, and monitoring in place.",
      "features": [
        { "title": "RAG & Knowledge Base", "desc": "Build retrieval-augmented generation systems on your proprietary data." },
        { "title": "AI Agents", "desc": "Design agentic workflows that automate complex, multi-step tasks." },
        { "title": "Recommendations", "desc": "Personalized content, product, and action recommendations using ML." },
        { "title": "MLOps & Monitoring", "desc": "Evaluation pipelines, drift detection, cost optimization, and observability." }
      ]
    },
    "web3": {
      "longDesc": "We build Web3 products with a focus on security and user experience — from decentralized applications and wallet integrations to token gating, RBAC, and on-chain audit logging.",
      "features": [
        { "title": "dApp Development", "desc": "Decentralized applications with clean UI and reliable on-chain interactions." },
        { "title": "Wallet Integration", "desc": "Seamless multi-wallet support with secure authentication flows." },
        { "title": "Token Gating & RBAC", "desc": "Control access to features and content based on on-chain ownership." },
        { "title": "Audit & Security", "desc": "Smart contract audits, access logs, and security-first architecture." }
      ]
    },
    "cloud": {
      "longDesc": "We design and operate cloud infrastructure that is stable, observable, and cost-optimized — from CI/CD pipelines and monitoring to auto-scaling, hardening, and cost management.",
      "features": [
        { "title": "CI/CD Pipeline", "desc": "Automated build, test, and deployment pipelines for fast, reliable releases." },
        { "title": "Observability", "desc": "Logging, metrics, tracing, and alerting for full production visibility." },
        { "title": "Auto-Scaling", "desc": "Infrastructure that scales with demand while controlling cloud spend." },
        { "title": "Security Hardening", "desc": "Network policies, secrets management, and compliance best practices." }
      ]
    }
  }
}
```

```json
// locales/vi.json — same structure, Vietnamese text
"capabilityDetail": {
  "backToCapabilities": "Năng lực",
  "featuresTitle": "Chúng tôi làm gì",
  "featuresDesc": "Năng lực cốt lõi và cách chúng tôi tạo ra giá trị.",
  "ctaTitle": "Sẵn sàng làm việc với TensorLab?",
  "ctaDesc": "Cho chúng tôi biết về dự án của bạn, chúng tôi sẽ đề xuất hướng tiếp cận phù hợp.",
  "ctaButton": "Liên hệ",
  "viewAll": "Xem tất cả năng lực",
  "learnMore": "Tìm hiểu thêm",
  "items": {
    "consulting": {
      "longDesc": "Chúng tôi căn chỉnh quyết định công nghệ theo mục tiêu kinh doanh — từ kiến trúc hệ thống, roadmap kỹ thuật, tiêu chuẩn chất lượng đến lựa chọn stack phù hợp.",
      "features": [
        { "title": "Review kiến trúc", "desc": "Đánh giá hiện trạng và thiết kế kiến trúc mục tiêu có thể mở rộng, dễ bảo trì." },
        { "title": "Roadmap kỹ thuật", "desc": "Ưu tiên đầu tư kỹ thuật theo mốc sản phẩm." },
        { "title": "Lựa chọn tech stack", "desc": "Đánh giá trade-off để chọn công cụ phù hợp với team và bối cảnh." },
        { "title": "Tiêu chuẩn chất lượng", "desc": "Thiết lập coding convention, quy trình review và tiêu chuẩn delivery." }
      ]
    },
    "dx": {
      "longDesc": "Chúng tôi giúp tổ chức hoạt động nhanh hơn bằng cách chuẩn hoá quy trình, tích hợp hệ thống và tự động hoá workflow — biến điểm nghẽn vận hành thành lợi thế cạnh tranh.",
      "features": [
        { "title": "Chuẩn hoá quy trình", "desc": "Phân tích và tối ưu các workflow chính để đảm bảo nhất quán và tốc độ." },
        { "title": "Tích hợp hệ thống", "desc": "Kết nối các công cụ và nguồn dữ liệu rời rạc thành một lớp vận hành thống nhất." },
        { "title": "Tự động hoá workflow", "desc": "Tự động hoá các tác vụ thủ công, lặp đi lặp lại bằng công cụ hiện đại." },
        { "title": "Data enablement", "desc": "Cấu trúc và hiển thị dữ liệu vận hành để hỗ trợ ra quyết định tốt hơn." }
      ]
    },
    "product": {
      "longDesc": "Từ discovery đến delivery production-grade — chúng tôi xây sản phẩm số nhanh ra thị trường, dễ bảo trì và vận hành hiệu quả về chi phí. Không chỉ thực thi task, mà đồng hành kết quả.",
      "features": [
        { "title": "Discovery & Scoping", "desc": "Làm rõ mục tiêu, người dùng và phạm vi MVP trước khi viết code." },
        { "title": "Thiết kế UI/UX", "desc": "Thiết kế lấy người dùng làm trung tâm, tập trung vào clarity, tốc độ và accessibility." },
        { "title": "Delivery MVP", "desc": "Ship MVP production-ready với kiến trúc sạch ngay từ đầu." },
        { "title": "Scale & Iteration", "desc": "Mở rộng tính năng, tối ưu hiệu năng và duy trì khả năng vận hành khi scale." }
      ]
    },
    "ai": {
      "longDesc": "Chúng tôi đưa AI từ proof-of-concept đến production — xây RAG pipeline, knowledge base, AI agent và hệ thống recommendation với MLOps, evaluation và monitoring đầy đủ.",
      "features": [
        { "title": "RAG & Knowledge Base", "desc": "Xây hệ thống retrieval-augmented generation trên dữ liệu nội bộ." },
        { "title": "AI Agents", "desc": "Thiết kế agentic workflow tự động hoá các tác vụ phức tạp, nhiều bước." },
        { "title": "Recommendations", "desc": "Gợi ý nội dung, sản phẩm và hành động cá nhân hoá bằng ML." },
        { "title": "MLOps & Monitoring", "desc": "Evaluation pipeline, phát hiện drift, tối ưu chi phí và observability." }
      ]
    },
    "web3": {
      "longDesc": "Chúng tôi xây sản phẩm Web3 với trọng tâm bảo mật và UX — từ dApps, wallet integration đến token gating, RBAC và audit log on-chain.",
      "features": [
        { "title": "dApp Development", "desc": "Ứng dụng phi tập trung với UI sạch và tương tác on-chain ổn định." },
        { "title": "Wallet Integration", "desc": "Hỗ trợ đa ví với flow xác thực an toàn, trải nghiệm mượt mà." },
        { "title": "Token Gating & RBAC", "desc": "Kiểm soát truy cập tính năng và nội dung theo quyền sở hữu on-chain." },
        { "title": "Audit & Security", "desc": "Kiểm tra smart contract, audit log truy cập và kiến trúc security-first." }
      ]
    },
    "cloud": {
      "longDesc": "Chúng tôi thiết kế và vận hành hạ tầng cloud ổn định, observable và tối ưu chi phí — từ CI/CD, monitoring đến auto-scaling, hardening và quản lý chi phí.",
      "features": [
        { "title": "CI/CD Pipeline", "desc": "Pipeline build, test và deploy tự động cho release nhanh và đáng tin cậy." },
        { "title": "Observability", "desc": "Logging, metrics, tracing và alerting để quan sát toàn bộ hệ thống production." },
        { "title": "Auto-Scaling", "desc": "Hạ tầng co giãn theo demand trong khi kiểm soát chi phí cloud." },
        { "title": "Security Hardening", "desc": "Network policy, quản lý secret và best practice compliance." }
      ]
    }
  }
}
```

## Implementation Steps

1. Create `lib/capabilityData.ts` with `CapabilityItem` type, `CAPABILITY_ITEMS` array, `getCapabilityBySlug()` helper
2. In `CapabilitiesSection.tsx`: replace `capabilityItems` const with `import { CAPABILITY_ITEMS } from "@/lib/capabilityData"` — keep existing render logic unchanged
3. Add `capabilityDetail` namespace to `locales/en.json` (after `projectDetail` block)
4. Add `capabilityDetail` namespace to `locales/vi.json` (translated)

## Todo

- [ ] Create `lib/capabilityData.ts`
- [ ] Update `CapabilitiesSection.tsx` to import from `capabilityData.ts`
- [ ] Add `capabilityDetail` + `capabilityList` i18n to `locales/en.json`
- [ ] Add `capabilityDetail` + `capabilityList` i18n to `locales/vi.json`
- [ ] Run `pnpm lint` to verify no type errors

## Success Criteria

- `CapabilitiesSection.tsx` renders identically on homepage after refactor
- `getCapabilityBySlug("ai")` returns correct item
- No TypeScript errors on `pnpm lint`

## Risk

- `CapabilitiesSection` uses `as const` on the array — ensure type compatibility when importing externally
