# Phase 02 — Data Layer: Add imagePath

**Priority:** High (blocks Phase 03 + 04)
**Status:** completed
**Blocked by:** Phase 01

## Overview

Add `imagePath` field to `CapabilityItem` type and populate it for all 6 items.

## Context Links

- Data file: `lib/capabilityData.ts` (62 lines)
- Images from Phase 01: `public/images/capabilities/{slug}.png`

## Related Code Files

- **Modify:** `lib/capabilityData.ts`

## Implementation Steps

1. Add `imagePath: string` to `CapabilityItem` type:
   ```ts
   export type CapabilityItem = {
     key: string;
     slug: string;
     icon: LucideIcon;
     color: string;
     spotlightColor: string;
     imagePath: string;  // <-- NEW
   };
   ```

2. Add `imagePath` to each item in `CAPABILITY_ITEMS`:
   ```ts
   {
     key: "consulting",
     slug: "consulting",
     icon: Compass,
     color: "text-info",
     spotlightColor: "rgba(56, 189, 248, 0.38)",
     imagePath: "/images/capabilities/consulting.png",
   },
   // ... repeat for dx, product, ai, web3, cloud
   ```

3. Run lint/compile check: `pnpm lint`

## Todo

- [x] Add `imagePath: string` to `CapabilityItem` type
- [x] Add `imagePath` value to all 6 items in `CAPABILITY_ITEMS`
- [x] Run compile check — no errors

## Success Criteria

- Type includes `imagePath`
- All 6 items have correct path pointing to generated images
- No TypeScript errors
- `getCapabilityBySlug()` returns items with `imagePath`
