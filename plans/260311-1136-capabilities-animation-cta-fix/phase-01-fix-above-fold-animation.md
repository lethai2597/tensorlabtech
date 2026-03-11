# Phase 01 — Fix Above-Fold Animation

## Context Links
- Component: `/app/[locale]/capabilities/CapabilitiesListContent.tsx`
- Motion config: `/lib/landingMotion.ts`
- Scout report: `/plans/reports/Explore-260311-1137-capabilities-contact-pages-scout.md`

## Overview
- **Priority**: P1 (visual bug — page appears empty on load)
- **Status**: ✅ Completed
- **Effort**: 0.5h
- **Completed**: 2026-03-11

## Root Cause

`whileInView` + `viewport: { once: true, amount: 0.2 }` requires IntersectionObserver to detect element crossing threshold.
When section is **already in viewport at mount**, IntersectionObserver fires the entry immediately but Framer Motion's implementation may not trigger the animation because the element never "entered" (it was already there).
Additionally `margin: "0px 0px -120px 0px"` pushes the trigger point 120px further down, worsening the issue.

## Requirements

- Page header section (tag, title, desc) animates in on mount
- Capability rows stagger-animate on mount (not on scroll)
- Reduced-motion preference still respected
- No change to animation timing/easing/variants (purely trigger mechanism change)

## Architecture

**Change**: Replace `whileInView="visible"` + `viewport={...}` with `animate="visible"` on both motion wrappers.

```tsx
// BEFORE
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={landingViewport}
  variants={stagger}
>

// AFTER
<motion.div
  initial="hidden"
  animate="visible"
  variants={stagger}
>
```

Both motion wrappers in the file need this change:
1. Page header wrapper (line 24)
2. Capability rows wrapper (line 61)

`stagger` variant already has `delayChildren: 0.2` — page header starts 200ms after mount. Children (rows) stagger 150ms apart. Total sequence feels natural without scroll.

## Related Code Files

| File | Action | Change |
|------|--------|--------|
| `/app/[locale]/capabilities/CapabilitiesListContent.tsx` | Modify | Replace `whileInView` + `viewport` with `animate` on 2 motion wrappers |

## Implementation Steps

1. Open `CapabilitiesListContent.tsx`
2. On the **page header** `<motion.div>` (line ~24):
   - Remove `whileInView="visible"`
   - Remove `viewport={landingViewport}`
   - Add `animate="visible"`
3. On the **capability rows** `<motion.div>` (line ~61):
   - Remove `whileInView="visible"`
   - Remove `viewport={landingViewport}`
   - Add `animate="visible"`
4. Remove unused `landingViewport` import if no longer used anywhere else in the file
5. Run `pnpm lint` to verify no errors

## Todo List

- [x] Replace `whileInView` → `animate` on page header wrapper
- [x] Replace `whileInView` → `animate` on capability rows wrapper
- [x] Remove unused `landingViewport` import (if applicable)
- [x] `pnpm lint` — no errors

## Success Criteria

- Open `/capabilities` in browser → all content visible immediately on page load
- Stagger animation plays from top to bottom smoothly
- No flash of invisible content
- Reduced-motion: content appears instantly (no animation)

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| `landingViewport` still used by other sections | Low | Check imports before removing |
| Animation looks jarring without delay | Low | `delayChildren: 0.2` gives enough breathing room |

## Security Considerations

N/A — purely visual/animation change.

## Next Steps

→ Phase 02: Add CTA button per capability
