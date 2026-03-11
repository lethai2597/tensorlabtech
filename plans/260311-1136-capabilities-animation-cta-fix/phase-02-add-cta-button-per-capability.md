# Phase 02 — Add "Nhận tư vấn" CTA Button per Capability

## Context Links
- Component: `/app/[locale]/capabilities/CapabilitiesListContent.tsx`
- Data: `/lib/capabilityData.ts`
- i18n (vi): `/locales/vi.json` — `capabilityDetail.ctaButton`
- i18n (en): `/locales/en.json` — `capabilityDetail.ctaButton`
- Contact form pre-fill: `?type=outsource|product&message=...`
- Scout report: `/plans/reports/Explore-260311-1137-capabilities-contact-pages-scout.md`

## Overview
- **Priority**: P2
- **Status**: ✅ Completed
- **Effort**: 1h
- **Completed**: 2026-03-11

## Requirements

**Functional:**
- Each capability row shows a "Nhận tư vấn" button
- Clicking → navigates to `/contact?type=...&message=...` with pre-filled values
- `type` param mapped per capability (validated against `["product", "outsource", "other"]`)
- `message` param: Vietnamese pre-fill sentence specific to each capability

**Non-functional:**
- Button label from i18n (reuse existing `capabilityDetail.ctaButton` = "Liên hệ" OR add `capabilityDetail.consultButton` = "Nhận tư vấn")
- Use `next/link` — no page reload, locale-aware routing
- No new dependency, no new component files (inline in `CapabilitiesListContent.tsx`)

## Architecture

### Contact Type Mapping

| Capability key | `type` param | Rationale |
|---------------|-------------|-----------|
| `consulting` | `outsource` | Strategy/architecture service |
| `dx` | `outsource` | Process/integration service |
| `product` | `product` | Product collaboration |
| `ai` | `outsource` | AI development service |
| `web3` | `outsource` | Web3 development service |
| `cloud` | `outsource` | Cloud/infra service |

### Message Pre-fill (Vietnamese)

| Capability key | `message` |
|---------------|-----------|
| `consulting` | `Tôi muốn tìm hiểu về dịch vụ Tư vấn chiến lược & kiến trúc` |
| `dx` | `Tôi muốn tìm hiểu về dịch vụ Tối ưu quy trình & Developer Experience` |
| `product` | `Tôi muốn tìm hiểu về dịch vụ Phát triển sản phẩm số` |
| `ai` | `Tôi muốn tìm hiểu về dịch vụ AI & Automation` |
| `web3` | `Tôi muốn tìm hiểu về dịch vụ Web3 & dApp` |
| `cloud` | `Tôi muốn tìm hiểu về dịch vụ Cloud & Infrastructure` |

### Implementation Strategy

Add `contactType` + `contactMessage` fields to `CapabilityItem` in `capabilityData.ts` — keeps the mapping co-located with data, not scattered in the component.

```typescript
// lib/capabilityData.ts — extend CapabilityItem type
export type CapabilityItem = {
  key: string;
  slug: string;
  icon: LucideIcon;
  color: string;
  dotColor: string;
  spotlightColor: string;
  contactType: "product" | "outsource" | "other";  // ADD
  contactMessage: string;                            // ADD
};
```

```typescript
// In CapabilitiesListContent.tsx — inside content block, after features list
import Link from "next/link";
import { useLocale } from "next-intl";

const locale = useLocale();

// Inside map, build the href:
const contactHref = `/${locale}/contact?type=${cap.contactType}&message=${encodeURIComponent(cap.contactMessage)}`;

// Button (after features list):
<div className="pt-2">
  <Link
    href={contactHref}
    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
      bg-surface border border-border hover:border-primary hover:text-primary
      transition-colors duration-200 text-foreground`}
  >
    {tDetail("consultButton")}
  </Link>
</div>
```

> **Why plain `<Link>` with Tailwind, not Ant Design `<Button>`?** Ant Design Button requires `"use client"` (already satisfied) but adds bundle weight and `asChild`-pattern complexity. A styled `<Link>` is simpler, fully accessible, and consistent with Next.js routing. KISS.

> **Why `useLocale()` for href?** `next-intl` Link from `@/i18n/routing` handles locale prefix automatically — use that instead to avoid hardcoding locale in path.

### Revised routing approach (use next-intl Link)

```typescript
// Import next-intl's Link instead of next/link for automatic locale prefix
import { Link } from "@/i18n/routing";

// href without locale prefix — next-intl adds it:
const contactHref = `/contact?type=${cap.contactType}&message=${encodeURIComponent(cap.contactMessage)}`;

<Link href={contactHref}>
  {tDetail("consultButton")}
</Link>
```

## Related Code Files

| File | Action | Change |
|------|--------|--------|
| `/lib/capabilityData.ts` | Modify | Add `contactType` + `contactMessage` fields to type + all 6 items |
| `/app/[locale]/capabilities/CapabilitiesListContent.tsx` | Modify | Import `Link` from i18n routing, add button JSX after features list, add `tDetail("consultButton")` call |
| `/locales/vi.json` | Modify | Add `capabilityDetail.consultButton = "Nhận tư vấn"` |
| `/locales/en.json` | Modify | Add `capabilityDetail.consultButton = "Get a Consultation"` |

## Implementation Steps

1. **`/lib/capabilityData.ts`**
   - Add `contactType: "product" | "outsource" | "other"` to `CapabilityItem` type
   - Add `contactMessage: string` to `CapabilityItem` type
   - Populate each of the 6 items per mapping table above

2. **`/locales/vi.json`**
   - Inside `capabilityDetail` object, add: `"consultButton": "Nhận tư vấn"`

3. **`/locales/en.json`**
   - Inside `capabilityDetail` object, add: `"consultButton": "Get a Consultation"`

4. **`/app/[locale]/capabilities/CapabilitiesListContent.tsx`**
   - Add import: `import { Link } from "@/i18n/routing";`
   - Build `contactHref` inside the `.map()` callback:
     ```ts
     const contactHref = `/contact?type=${cap.contactType}&message=${encodeURIComponent(cap.contactMessage)}`;
     ```
   - After the `{features.length > 0 && <ul>...</ul>}` block, add:
     ```tsx
     <div className="pt-2">
       <Link
         href={contactHref}
         className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-surface border border-border hover:border-primary hover:text-primary transition-colors duration-200 text-foreground"
       >
         {tDetail("consultButton")}
       </Link>
     </div>
     ```

5. Run `pnpm lint` — no errors
6. Manual verify: click button on `/capabilities` → lands on `/contact` with `type` pre-selected and `message` pre-filled

## Todo List

- [x] Extend `CapabilityItem` type with `contactType` + `contactMessage`
- [x] Populate `contactType` + `contactMessage` for all 6 capability items
- [x] Add `consultButton` to `vi.json`
- [x] Add `consultButton` to `en.json`
- [x] Add `Link` import + `contactHref` + button JSX in `CapabilitiesListContent.tsx`
- [x] `pnpm lint` — no errors
- [x] Manual verify: button → contact page with correct pre-fill

## Success Criteria

- Each capability row displays "Nhận tư vấn" button below feature list
- Clicking navigates to `/contact` (or `/vi/contact`) with correct `?type=` + `?message=` query params
- Contact form auto-selects the correct type and pre-fills message textarea
- Button renders correctly in both light + dark themes
- Both `en` + `vi` locales show correct button label

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| `@/i18n/routing` export differs from `Link` | Low | Check `i18n/routing.ts` — fallback to `next/link` + `useLocale()` |
| `encodeURIComponent` breaks Vietnamese chars | None | Standard — browsers decode correctly |
| Type extension breaks other pages using `capabilityData.ts` | Low | TypeScript strict mode will flag missing fields at compile |

## Security Considerations

- `contactMessage` is static strings from code (not user input) — no XSS risk
- `type` param validated by contact form against allowlist before use

## Next Steps

- After both phases: run `pnpm build` to confirm no TS errors
- Optional follow-up: add `ArrowRight` icon inside button for visual affordance
