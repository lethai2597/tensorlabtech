---
title: "Capabilities Page: Animation Fix + CTA Button"
description: "Fix above-fold animation not triggering, add Nhận tư vấn CTA per capability with contact pre-fill"
status: completed
priority: P2
effort: 1.5h
issue:
branch: main
tags: [frontend, feature, bugfix]
created: 2026-03-11
completed: 2026-03-11
---

# Capabilities Page: Animation Fix + CTA Button

## Overview

Two targeted fixes for `/capabilities` page:
1. **Animation bug**: `whileInView` never fires because section is above-fold at load → switch to `animate` (mount-trigger)
2. **CTA button**: Each capability gets "Nhận tư vấn" button → `/contact?type=...&message=...` with pre-filled data

## Phases

| # | Phase | Status | Effort | Link |
|---|-------|--------|--------|------|
| 1 | Fix animation (above-fold) | ✅ Completed | 0.5h | [phase-01](./phase-01-fix-above-fold-animation.md) |
| 2 | Add CTA button per capability | ✅ Completed | 1h | [phase-02](./phase-02-add-cta-button-per-capability.md) |

## Dependencies

- `framer-motion` v12 already installed
- Contact form already supports `?type=&message=` query params
- `next-intl` for button label translation
- `next/link` for routing
