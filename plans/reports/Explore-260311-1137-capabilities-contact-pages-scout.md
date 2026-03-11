# Exploration Report: Capabilities & Contact Pages

**Date**: 2026-03-11  
**Project**: TensorLab (Next.js, Framer Motion, Ant Design)  
**Scope**: Pages, animation config, pre-fill logic

---

## 1. Capabilities Page Components

### File Paths

| Component | Path |
|-----------|------|
| **Main Page** | `/app/[locale]/capabilities/page.tsx` |
| **List Content** | `/app/[locale]/capabilities/CapabilitiesListContent.tsx` |
| **Homepage Section** | `/components/landing/TensorLabLandingPage/sections/CapabilitiesSection.tsx` |
| **Data Registry** | `/lib/capabilityData.ts` |

### Page Structure - `/capabilities` Route

```
capabilities/page.tsx (Server Component)
├─ Generates metadata (i18n title/desc)
└─ Renders CapabilitiesListContent (Client)
   ├─ Page header section (tag, title, desc)
   └─ Alternating rows (6 capabilities)
      ├─ Visual block (icon + square bg)
      └─ Content block (title, longDesc, features)
```

---

## 2. Capabilities Data Registry

**File**: `/lib/capabilityData.ts`

6 core capabilities with static metadata:

```typescript
interface CapabilityItem {
  key: string;              // i18n key
  slug: string;             // URL segment (currently not used for detail pages)
  icon: LucideIcon;         // Icon component
  color: string;            // Tailwind text color (static literal)
  dotColor: string;         // Bullet point color (static literal)
  spotlightColor: string;   // Glow effect color (rgba)
}

CAPABILITY_ITEMS = [
  { 
    key: "consulting",
    slug: "consulting",
    icon: Compass,
    color: "text-info",
    dotColor: "bg-sky-400",
    spotlightColor: "rgba(56, 189, 248, 0.38)"
  },
  { key: "dx", icon: Shield, color: "text-success", ... },
  { key: "product", icon: Rocket, color: "text-primary", ... },
  { key: "ai", icon: Cpu, color: "text-warning", ... },
  { key: "web3", icon: Layers, color: "text-error", ... },
  { key: "cloud", icon: Cloud, color: "text-info", ... },
];
```

---

## 3. Animation Configuration

### Motion Library
- **Version**: `framer-motion@^12.34.0`, `motion@^12.34.0`
- **Import**: Uses `motion` from `motion/react` or `framer-motion`
- **Reduced Motion**: Respects `prefers-reduced-motion` via `useReducedMotion()`

### Landing Motion Config - `/lib/landingMotion.ts`

```typescript
// Ease curve for smooth scroll-reveal
const easeOut = [0.16, 1, 0.3, 1] as const;

// Viewport trigger settings
const viewport = {
  once: true,              // Trigger only once
  amount: 0.2,             // 20% of element in view
  margin: "0px 0px -120px 0px",  // Delay trigger by 120px
} as const;

// Section animation variants
useSectionVariants(reduceMotion: boolean) {
  return {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1, 
        transition: { duration: 0.6, ease: easeOut } 
      }
    },
    fadeUp: {
      hidden: { opacity: 0, y: 24 },    // 24px below
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.6, ease: easeOut } 
      }
    },
    stagger: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.15,    // 150ms delay between children
          delayChildren: 0.2        // 200ms before first child
        }
      }
    }
  };
}
```

### CapabilitiesListContent Animation

```typescript
// Framer motion wrapper around content
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={landingViewport}
  variants={stagger}
>
  {/* Page header with stagger effect */}
  <motion.div variants={fadeUp}>
    {/* Tag, Title, Description */}
  </motion.div>

  {/* Alternating rows per capability */}
  {CAPABILITY_ITEMS.map((cap, idx) => (
    <motion.div
      key={cap.key}
      variants={fadeUp}
      className={`flex ... ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}
    >
      {/* Icon block + Content */}
    </motion.div>
  ))}
</motion.div>
```

### ShinyText Component - `/components/ShinyText.tsx`

Animated gradient shine effect used on badges:

```typescript
// Uses motion/react with useMotionValue & useAnimationFrame
<ShinyText
  text={text}
  disabled={reduced}
  speed={2}                              // Duration in seconds
  color="var(--color-primary)"           // Base color
  shineColor="rgba(255, 255, 255, 0.7)"  // Shine highlight
  direction="left"                       // Animation direction
  spread={120}                           // Gradient spread angle
/>

// Animation: moves gradient left→right across text
// Uses backgroundPosition CSS transform
```

---

## 4. Contact Page Components

### File Paths

| Component | Path |
|-----------|------|
| **Main Page** | `/app/[locale]/contact/page.tsx` |
| **Form Component** | `/components/landing/ContactForm.tsx` |
| **API Route** | `/app/api/contact/route.ts` |

### Page Structure

```
contact/page.tsx (Client, Suspense-wrapped)
├─ Page background + glow effects
├─ Header section (badge, title, description)
├─ Contact channels (email, phone, facebook links)
└─ Form card
   └─ ContactForm component
```

### Contact Page Animation

```typescript
// Custom motion variants (not shared with landingMotion)
const outerStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,    // 180ms stagger
      delayChildren: 0.05
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.21, 0.47, 0.32, 0.98] 
    }
  }
};

// All content fades up with stagger
<motion.section
  initial="hidden"
  animate="show"
  variants={outerStagger}
>
  {/* Background glows + content */}
</motion.section>
```

---

## 5. Contact Form - Pre-Fill Logic

### Query Parameter Support

**File**: `/components/landing/ContactForm.tsx`

```typescript
// Reads query params via useSearchParams()
const searchParams = useSearchParams();
const type = searchParams.get("type") ?? undefined;          // e.g., "product"
const defaultMessage = searchParams.get("message") ?? undefined;

// Form initial values
const initialType = CONTACT_TYPES.includes(defaultType as ContactType)
  ? (defaultType as ContactType)
  : "other";

<Form
  initialValues={{ 
    type: initialType, 
    message: defaultMessage 
  }}
>
```

### Usage Examples

```
# Pre-select "Product" collaboration type
/contact?type=product

# Pre-fill message + type
/contact?type=outsource&message=Need%20a%20chatbot%20for%20ecommerce

# Pre-fill message only (type defaults to "other")
/contact?message=Interested%20in%20AI%20services
```

### Form Fields

| Field | Type | Validation | Pre-fill? |
|-------|------|-----------|-----------|
| Name | Text | Required | No |
| Email | Email | Required + Email format | No |
| **Type** | Select | Required | **Yes (query param)** |
| Message | TextArea | Required | **Yes (query param)** |

### Form Behavior

```typescript
// Auto-focus name field after animation (400ms delay)
useEffect(() => {
  const timer = setTimeout(() => nameInputRef.current?.focus(), 400);
  return () => clearTimeout(timer);
}, []);

// On submit → POST /api/contact
const onFinish = async (values: ContactFormValues) => {
  setLoading(true);
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values)  // { name, email, type, message }
  });
  // Show success/error message
};
```

### Form Types

```typescript
const CONTACT_TYPES = ["product", "outsource", "other"];

// Maps to i18n: landing.contactForm.types.{key}
{
  "types": {
    "product": "Hợp tác Product",
    "outsource": "Thuê Outsource",
    "other": "Tư vấn chung"
  }
}
```

---

## 6. Contact API Route - `/api/contact`

### Handler

```typescript
// POST /api/contact
export async function POST(request: Request) {
  // Validates: name, email, message (all required)
  // Sends to Telegram bot via TELEGRAM_BOT_TOKEN & TELEGRAM_CHAT_ID
  // Returns { ok: true } on success
}
```

### Telegram Integration

- Formats message with type label, name, email, timestamp (Vietnam timezone)
- Posts formatted Markdown to Telegram channel
- Requires env vars: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`

---

## 7. Contact Channels

**Hardcoded in page** (`/app/[locale]/contact/page.tsx`):

```typescript
const CONTACT_CHANNELS = [
  {
    key: "email",
    icon: Mail,
    value: "lethai2597@gmail.com",
    href: "mailto:lethai2597@gmail.com"
  },
  {
    key: "phone",
    icon: Phone,
    value: "0961 741 678",
    href: "tel:0961741678"
  },
  {
    key: "facebook",
    icon: MessageCircle,
    value: "Facebook",
    href: "https://www.facebook.com/lehuythaidotcom.fb/",
    target: "_blank"
  }
];
```

Rendered as inline pills with icons:

```
┌─ Email icon ─┐  ┌─ Phone icon ─┐  ┌─ Facebook icon ─┐
│ lethai2597@  │  │ 0961 741 678 │  │    Facebook     │
└──────────────┘  └──────────────┘  └─────────────────┘
```

---

## 8. i18n Translations

### Capabilities

**Key**: `capabilityList` & `capabilityDetail`

```json
{
  "capabilityList": {
    "tag": "Năng lực",
    "title": "Những gì chúng tôi làm tốt",
    "desc": "Từ chiến lược ... — 6 năng lực cốt lõi..."
  },
  "capabilityDetail": {
    "items": {
      "consulting": {
        "longDesc": "Chúng tôi căn chỉnh quyết định công nghệ...",
        "features": [
          { "title": "Review kiến trúc", "desc": "..." },
          { "title": "Roadmap kỹ thuật", "desc": "..." },
          { "title": "Lựa chọn tech stack", "desc": "..." },
          { "title": "Tiêu chuẩn chất lượng", "desc": "..." }
        ]
      },
      // ... dx, product, ai, web3, cloud
    }
  }
}
```

### Contact Form

**Key**: `landing.contactForm` (embedded in landing section)

```json
{
  "landing": {
    "contactForm": {
      "types": {
        "product": "Hợp tác Product",
        "outsource": "Thuê Outsource",
        "other": "Tư vấn chung"
      },
      "name": "Họ tên",
      "email": "Email",
      "message": "Nội dung",
      "submit": "Gửi thông tin",
      "sending": "Đang gửi...",
      "successTitle": "Đã gửi thành công!",
      "errorTitle": "Gửi thất bại, vui lòng thử lại."
    }
  }
}
```

### Contact Page

**Key**: `contactPage`

```json
{
  "contactPage": {
    "badge": "Liên hệ",
    "title": "Liên hệ với TensorLab",
    "desc": "Gửi thông tin để chúng tôi...",
    "formTitle": "Gửi thông tin liên hệ",
    "formDesc": "Điền form dưới đây..."
  }
}
```

---

## 9. Key Insights

### Capabilities Page

- ✅ **6 static capabilities** registered in `capabilityData.ts`
- ✅ **Alternating layout** (desktop): visual on left/right per row
- ✅ **4 feature bullets** per capability (retrieved from i18n)
- ✅ **Landing section** shows 3-column grid cards → links to `/capabilities` list
- ✅ No individual detail pages per capability (all data on list page)

### Animation Strategy

- ✅ **Respects reduced motion**: `useReducedMotion()` disables all animations if OS preference set
- ✅ **Consistent easing**: `[0.16, 1, 0.3, 1]` for smooth scroll reveals
- ✅ **Scroll-triggered**: `whileInView` + `once: true` ensures single reveal per page load
- ✅ **Stagger timing**: 150ms between children, 200ms initial delay (contact: 180ms)
- ✅ **ShinyText badge**: Custom motion animation (gradient shine)

### Contact Form Pre-Fill

- ✅ **Query parameter support**: `?type=product&message=...`
- ✅ **Validation**: type must be one of `["product", "outsource", "other"]`
- ✅ **Auto-focus**: name field focused 400ms after component mount
- ✅ **POST /api/contact**: Telegram integration sends form data to chat

### Contact Page Structure

- ✅ **Radial glows**: Background effects using CSS gradients
- ✅ **Contact channels**: 3 hardcoded links (email, phone, facebook)
- ✅ **Suspension boundary**: Wrapped in `<Suspense>` to handle search params safely
- ✅ **Margin offset**: `-mt-16` to overlap with header

---

## 10. Code Quality Notes

| Aspect | Status | Notes |
|--------|--------|-------|
| Animation | ✅ Solid | Uses best practices (reduced motion, easing curves) |
| i18n Integration | ✅ Clean | `next-intl` used consistently across pages |
| Type Safety | ✅ Good | TypeScript strict mode enforced |
| Component Reuse | ✅ Good | `ShinyText`, `SpotlightCard`, motion variants shared |
| Error Handling | ✅ Adequate | Try-catch on i18n reads, form validation |
| Pre-fill Logic | ✅ Secure | Query params validated before setting form values |

---

## Unresolved Questions

1. **Capability Detail Pages**: Are slugs (`/capabilities/consulting`) meant for future expansion, or are they intentionally unused?
2. **Contact Channel Hardcoding**: Should contact info be moved to i18n or a config file for easier updates?
3. **Form Success Flow**: After submission, does user stay on page or redirect? (Currently shows toast message.)
4. **Telegram Rate Limiting**: Are there any safeguards against form spam hitting Telegram API?

