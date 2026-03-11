# Brainstorm: Trang Detail "Hợp tác" — TensorLab

**Date:** 2026-03-11 | **Status:** Agreed

---

## Problem Statement

Section "Hợp tác" trên homepage quá cô đọng — đủ để giới thiệu nhưng không đủ để thuyết phục. Cần trang detail `/hop-tac` dạng landing page narrative, giúp visitor hiểu sâu, build trust và convert sang liên hệ.

---

## Decision: 1 trang `/hop-tac` dài + sticky tab

**Rejected alternatives:**
- 3 trang riêng (`/hop-tac/product`, `/hop-tac/outsource`) — nhiều route hơn, duplicate shared sections
- Tab-based static — ít engagement
- Two-column split — UX mobile kém

---

## Final Layout

```
/hop-tac
├── HERO — full-width dark gradient
│   Tagline: "Từ ý tưởng đến sản phẩm thực tế — đúng model, đúng tốc độ."
│   Philosophy TensorLab ngắn (2-3 câu)
│   CTA: [Xem mô hình hợp tác ↓]
│
├── STICKY TAB — xuất hiện sau hero, auto-highlight theo scroll
│   [🤝 Hợp tác Product] [👥 Outsource]
│
├── SECTION #product: Hợp tác Product
│   ├── "Phù hợp nếu..." — 3-4 bullet card
│   ├── Process timeline: Inquiry → Discovery call → Proposal → Kick-off → Build & iterate
│   └── FAQ accordion — 3-4 câu (ownership, giá, khác agency)
│
├── SECTION #outsource: Thuê Outsource
│   ├── "Phù hợp nếu..." — 3-4 bullet card
│   ├── Roles grid: PM, FE, BE, Mobile, AI Engineer, DevOps
│   ├── Process timeline: Brief → Matching → Contract → Sprint 1 → Weekly sync
│   └── FAQ accordion — 3-4 câu riêng
│
└── SHARED CTA — full-width section
    "Bắt đầu từ một cuộc trao đổi"
    → /contact?type={activeTab}  (pre-filled theo tab đang active)
```

**Bỏ qua:** Case studies (chưa có data phù hợp, add sau)

---

## Technical Approach

### Routing
- Route: `app/[locale]/hop-tac/page.tsx` (server wrapper)
- Client component: `components/landing/HopTacPage/HopTacPage.tsx`

### Sticky Tab + Scroll Tracking
- Intersection Observer detect `#product` và `#outsource` section
- Auto-highlight tab khi section vào viewport (threshold ~30%)
- Click tab → `scrollIntoView({ behavior: 'smooth' })`
- Track `activeTab` state (`'product' | 'outsource'`) → pass vào CTA link

### Reused Components (không build mới)
| Component | Dùng cho |
|---|---|
| `SectionBackdrop` | Hero, section backgrounds |
| `SectionHeader` | Mỗi section title |
| `SpotlightCard` | "Phù hợp nếu..." cards |
| `CheckList` | Bullet lists |
| `useSectionVariants` + Framer Motion | Scroll animations |

### New Components cần tạo
| File | LOC est. | Mô tả |
|---|---|---|
| `HopTacPage.tsx` | ~80 | Main page layout, tab state, scroll tracking |
| `HopTacHero.tsx` | ~60 | Hero section |
| `HopTacStickyTab.tsx` | ~50 | Sticky tab navigation |
| `HopTacModelSection.tsx` | ~80 | Reusable cho cả Product + Outsource |
| `HopTacProcessTimeline.tsx` | ~70 | Timeline visual |
| `HopTacFaq.tsx` | ~60 | FAQ accordion |
| `HopTacCta.tsx` | ~40 | Shared CTA cuối |

*Tổng ~440 LOC — chia nhỏ để không file nào vượt 200 LOC*

### i18n
- Thêm namespace `hopTac` vào `locales/vi.json` và `locales/en.json`
- Keys: `hero.*`, `tab.*`, `product.*`, `outsource.*`, `faq.*`, `cta.*`

### Navigation
- Header nav "Hợp tác" → link từ `/#engagement` đổi thành `/hop-tac`
- Homepage section giữ nguyên, card CTA đổi từ `/contact?type=x` sang `/hop-tac#product` / `/hop-tac#outsource`

---

## Implementation Risks

| Risk | Mitigation |
|---|---|
| Intersection Observer race condition khi scroll nhanh | Debounce + root margin tuning |
| Sticky tab che content trên mobile | Offset scroll target bằng `scroll-margin-top` CSS |
| Content tiếng Anh chưa có | Placeholder EN = VI, update sau |

---

## Success Criteria
- Trang load, navigate, responsive đúng
- Sticky tab auto-highlight khi scroll
- CTA redirect đúng `/contact?type=product` hoặc `?type=outsource`
- i18n VI + EN hoạt động
- Không có compile/lint error

---

## Unresolved Questions
1. Content cụ thể cho FAQ (cần input từ team về câu hỏi thực tế client hay hỏi)
2. Hero tagline / philosophy text cần copywriter approve
3. Process timeline: số bước cho mỗi model có thể thay đổi theo thực tế
4. Khi nào add case studies (depends on `/projects` data readiness)
