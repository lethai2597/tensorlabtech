# Phase 01 — AI Image Generation

**Priority:** Critical (blocks all other phases)
**Status:** completed

## Overview

Generate 6 square images for each capability using ai-artist skill (Nano Banana). Images serve as visual anchors for both list page rows and detail page hero sections.

## Context Links

- Brainstorm: `plans/reports/brainstorm-260311-1047-nang-luc-landing-page-redesign.md`
- AI artist skill: `~/.claude/skills/ai-artist/SKILL.md`

## Requirements

- 6 images, one per capability slug: `consulting`, `dx`, `product`, `ai`, `web3`, `cloud`
- Output: `/public/images/capabilities/{slug}.png`
- Size: square (1:1 aspect ratio), 400x400 or larger
- Style: abstract tech/professional, dark background, consistent aesthetic across all 6
- Must look cohesive as a set (same prompt template, varied by subject)

## Implementation Steps

1. Create output directory:
   ```bash
   mkdir -p public/images/capabilities
   ```

2. Generate each image using ai-artist skill with `--skip` flag (bypass validation interview) and `--mode creative` for visual variety while maintaining consistency:
   ```bash
   # Template prompt pattern: "Abstract {concept}, dark background, professional tech aesthetic, geometric patterns, {accent_color} accent glow, minimal, square composition"

   ~/.claude/skills/.venv/bin/python3 ~/.claude/skills/ai-artist/scripts/generate.py \
     "Abstract technology consulting blueprint, dark background, professional tech aesthetic, geometric grid patterns, cyan accent glow, minimal, square composition" \
     -o public/images/capabilities/consulting.png -ar 1:1 --mode creative --skip

   ~/.claude/skills/.venv/bin/python3 ~/.claude/skills/ai-artist/scripts/generate.py \
     "Abstract digital transformation data flow, dark background, professional tech aesthetic, connected nodes and circuits, green accent glow, minimal, square composition" \
     -o public/images/capabilities/dx.png -ar 1:1 --mode creative --skip

   ~/.claude/skills/.venv/bin/python3 ~/.claude/skills/ai-artist/scripts/generate.py \
     "Abstract product development rocket launch, dark background, professional tech aesthetic, layered geometric shapes, blue accent glow, minimal, square composition" \
     -o public/images/capabilities/product.png -ar 1:1 --mode creative --skip

   ~/.claude/skills/.venv/bin/python3 ~/.claude/skills/ai-artist/scripts/generate.py \
     "Abstract artificial intelligence neural network, dark background, professional tech aesthetic, interconnected neural pathways, amber accent glow, minimal, square composition" \
     -o public/images/capabilities/ai.png -ar 1:1 --mode creative --skip

   ~/.claude/skills/.venv/bin/python3 ~/.claude/skills/ai-artist/scripts/generate.py \
     "Abstract blockchain decentralized network, dark background, professional tech aesthetic, hexagonal chain links, red accent glow, minimal, square composition" \
     -o public/images/capabilities/web3.png -ar 1:1 --mode creative --skip

   ~/.claude/skills/.venv/bin/python3 ~/.claude/skills/ai-artist/scripts/generate.py \
     "Abstract cloud infrastructure server architecture, dark background, professional tech aesthetic, floating cloud nodes, sky blue accent glow, minimal, square composition" \
     -o public/images/capabilities/cloud.png -ar 1:1 --mode creative --skip
   ```

3. Verify all 6 images exist and are valid PNGs

## Prompt Design Notes

- Accent colors match each capability's existing `spotlightColor`:
  - consulting: cyan (`text-info`)
  - dx: green (`text-success`)
  - product: blue (`text-primary`)
  - ai: amber (`text-warning`)
  - web3: red (`text-error`)
  - cloud: sky blue (`text-info`)
- Consistent base: "dark background, professional tech aesthetic, minimal, square composition"
- Varied subject matter per capability domain

## Todo

- [x] Create `public/images/capabilities/` directory
- [x] Generate consulting.png
- [x] Generate dx.png
- [x] Generate product.png
- [x] Generate ai.png
- [x] Generate web3.png
- [x] Generate cloud.png
- [x] Verify all 6 images are valid

## Success Criteria

- 6 PNG files in `/public/images/capabilities/`
- All square aspect ratio
- Consistent dark professional aesthetic
- Each visually distinct per capability domain

## Risk

- If Nano Banana API unavailable: use placeholder solid-color images and retry later
- If quality inconsistent: regenerate with `--mode search` or `--model pro`
