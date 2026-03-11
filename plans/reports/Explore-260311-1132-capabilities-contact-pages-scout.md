# Codebase Scout Report: Capabilities & Contact Pages

**Date:** 2026-03-11  
**Status:** Read-only exploration complete

## Executive Summary

Scouted TensorLab codebase to understand:
1. Capabilities page structure & rendering
2. Contact page implementation
3. Motion/animation configuration
4. Contact form fields & validation
5. Localization & API integration

All pages use **framer-motion v12.34.0** for animations with reduced-motion support.

---

## 1. Capabilities Page Implementation

### Page Structure
- **Route:** `/app/[locale]/capabilities/`
- **Files:**
  - `page.tsx` - Server component, metadata generation
  - `CapabilitiesListContent.tsx` - Client component with animations & rendering

### Key Code Snippet: Capability List Rendering

**File:** `/app/[locale]/capabilities/CapabilitiesListContent.tsx` (lines 67-132)

```tsx
{CAPABILITY_ITEMS.map((cap, idx) => {
  const isEven = idx % 2 === 0;

  // Load features from translations
  let features: FeatureItem[] = [];
  try {
    features = tDetail.raw(`items.${cap.key}.features`) as FeatureItem[];
  } catch {
    features = [];
  }

  return (
    <motion.div
      key={cap.key}
      variants={fadeUp}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 py-16 ${
        !isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Icon placeholder — large square with centered icon */}
      <div className="w-full md:w-2/5 flex-shrink-0">
        <div className="w-full aspect-square rounded-4xl bg-surface flex items-center justify-center">
          <cap.icon size={96} className={`${cap.color} opacity-70`} />
        </div>
      </div>

      {/* Content — title, description, features */}
      <div className="w-full md:w-3/5 flex flex-col justify-center space-y-5">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {tCaps(`items.${cap.key}.title`)}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {tDetail(`items.${cap.key}.longDesc`)}
        </p>

        {/* Feature bullets — 4 per capability */}
        {features.length > 0 && (
          <ul className="space-y-3 text-sm">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`mt-2 size-1.5 rounded-full flex-shrink-0 ${cap.dotColor}`} />
                <span className="text-zinc-500 dark:text-zinc-400">
                  <strong className="text-foreground">{f.title}</strong> — {f.desc}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
})}
```

### Capabilities Data Structure

**File:** `/lib/capabilityData.ts`

```ts
export type CapabilityItem = {
  key: string;           // i18n key (e.g., "consulting")
  slug: string;          // URL segment
  icon: LucideIcon;      // Lucide icon
  color: string;         // Tailwind text color (e.g., "text-info")
  dotColor: string;      // Tailwind bg color for bullets (e.g., "bg-sky-400")
  spotlightColor: string; // RGBA for glow effects
};

export const CAPABILITY_ITEMS = [
  { key: "consulting", slug: "consulting", icon: Compass, color: "text-info", dotColor: "bg-sky-400", ... },
  { key: "dx", slug: "dx", icon: Shield, color: "text-success", dotColor: "bg-emerald-500", ... },
  { key: "product", slug: "product", icon: Rocket, color: "text-primary", dotColor: "bg-blue-600", ... },
  { key: "ai", slug: "ai", icon: Cpu, color: "text-warning", dotColor: "bg-amber-400", ... },
  { key: "web3", slug: "web3", icon: Layers, color: "text-error", dotColor: "bg-red-500", ... },
  { key: "cloud", slug: "cloud", icon: Cloud, color: "text-info", dotColor: "bg-sky-500", ... },
];
```

### Translations

**File:** `/locales/en.json`

```json
{
  "capabilityList": {
    "tag": "Capabilities",
    "title": "What we're great at",
    "desc": "From strategy and architecture to production delivery..."
  },
  "capabilityDetail": {
    "items": {
      "consulting": {
        "longDesc": "We align technology decisions with your business goals...",
        "features": [
          { "title": "Architecture Review", "desc": "Assess current state and design..." },
          { "title": "Technical Roadmap", "desc": "Prioritize technical investments..." },
          ...
        ]
      }
    }
  }
}
```

---

## 2. Contact Page Implementation

### Page Structure
- **Route:** `/app/[locale]/contact/`
- **File:** `page.tsx` (196 lines)
- **Key Component:** `ContactForm` (from `/components/landing/ContactForm.tsx`)

### Contact Page Layout

**File:** `/app/[locale]/contact/page.tsx` (lines 34-186)

```tsx
// Page includes:
// 1. Background glows (radial gradients + blur elements)
// 2. Header section (badge, title, description)
// 3. Contact channels (email, phone, facebook pills)
// 4. Contact form card
// 5. Query param support (type, message defaults)

const CONTACT_CHANNELS = [
  { key: "email", icon: Mail, value: "lethai2597@gmail.com", href: "mailto:..." },
  { key: "phone", icon: Phone, value: "0961 741 678", href: "tel:..." },
  { key: "facebook", icon: MessageCircle, value: "Facebook", href: "https://..." },
];

// Uses framer-motion with custom stagger/fade animations
// Supports preloading via query params:
// ?type=product&message=Hello+Team
```

### Contact Channels
```tsx
// Rendered as inline pills with icons (lines 140-163)
<motion.div className="flex flex-wrap items-center justify-center gap-3">
  {CONTACT_CHANNELS.map((channel) => (
    <a href={channel.href} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl ...">
      <Icon className="size-4 text-primary" />
      {channel.value}
    </a>
  ))}
</motion.div>
```

---

## 3. Contact Form Structure & Validation

### Form Component

**File:** `/components/landing/ContactForm.tsx` (156 lines)

#### Form Fields

```ts
type ContactFormValues = {
  name: string;          // Required, no min/max
  email: string;         // Required, email validation
  type: ContactType;     // Required, enum: ["product", "outsource", "other"]
  message: string;       // Required, no length limits
};

const CONTACT_TYPES = ["product", "outsource", "other"] as const;
```

#### Form Layout

```tsx
<Form
  form={form}
  layout="vertical"
  onFinish={onFinish}
  requiredMark={false}
  initialValues={{ type: initialType, message: defaultMessage }}
>
  {/* Name field (line 88-98) */}
  <Form.Item name="name" label={t("name")} rules={[{ required: true, ... }]}>
    <Input placeholder={t("namePlaceholder")} size="large" className="rounded-xl!" />
  </Form.Item>

  {/* Email field (line 101-114) */}
  <Form.Item name="email" label={t("email")} rules={[
    { required: true, ... },
    { type: "email", ... }
  ]}>
    <Input placeholder={t("emailPlaceholder")} size="large" className="rounded-xl!" />
  </Form.Item>

  {/* Type dropdown (line 117-127) */}
  <Form.Item name="type" label={t("type")} rules={[{ required: true, ... }]}>
    <Select options={typeOptions} size="large" className="rounded-xl!" />
  </Form.Item>

  {/* Message textarea (line 129-140) */}
  <Form.Item name="message" label={t("message")} rules={[{ required: true, ... }]}>
    <Input.TextArea
      placeholder={t("messagePlaceholder")}
      rows={4}
      size="large"
      className="rounded-xl!"
    />
  </Form.Item>

  {/* Submit button (line 142-153) */}
  <Button type="primary" htmlType="submit" size="large" icon={<Send />}>
    {loading ? t("sending") : t("submit")}
  </Button>
</Form>
```

#### Form Behavior

```tsx
// Query param support (lines 19-24)
type ContactFormProps = {
  defaultType?: string;    // Pre-select type from ?type=product
  defaultMessage?: string; // Pre-fill message from ?message=...
};

// Auto-focus name field after animation delay (lines 33-37)
useEffect(() => {
  const timer = setTimeout(() => nameInputRef.current?.focus(), 400);
  return () => clearTimeout(timer);
}, []);

// Submit handler (lines 50-76)
const onFinish = async (values: ContactFormValues) => {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  
  if (res.ok) {
    form.resetFields();
    message.success({ content: t("successTitle"), duration: 5 });
  } else {
    message.error({ content: t("errorTitle"), duration: 5 });
  }
};
```

### Form Translations

**File:** `/locales/en.json`

```json
{
  "landing.contactForm": {
    "name": "Full name",
    "namePlaceholder": "Enter your full name",
    "nameRequired": "Please enter your name",
    "email": "Email",
    "emailPlaceholder": "Enter your email",
    "emailRequired": "Please enter your email",
    "emailInvalid": "Invalid email address",
    "type": "Partnership type",
    "typeRequired": "Please select a partnership type",
    "types": {
      "product": "Product Partnership",
      "outsource": "Outsourcing",
      "other": "General inquiry"
    },
    "message": "Message",
    "messagePlaceholder": "Briefly describe your problem or partnership needs",
    "messageRequired": "Please enter a message",
    "submit": "Send message",
    "sending": "Sending...",
    "successTitle": "Message sent successfully!",
    "errorTitle": "Failed to send message. Please try again."
  }
}
```

---

## 4. Motion & Animation Configuration

### Motion Library

**Package:** `framer-motion@12.34.0` (see `package.json`)

### Landing Motion Utilities

**File:** `/lib/landingMotion.ts` (52 lines)

```ts
// Smooth easeOut curve for scroll-reveal animations
const easeOut = [0.16, 1, 0.3, 1] as const;

// Viewport config: trigger when 20% in view, with -120px bottom margin
export const landingViewport = {
  once: true,          // Play animation only once
  amount: 0.2,         // Trigger when 20% of element is visible
  margin: "0px 0px -120px 0px", // Delay trigger slightly for better UX
} as const;

// Hook: useSectionVariants(reduceMotion: boolean)
// Returns animation variants with prefers-reduced-motion support
export function useSectionVariants(reduceMotion: boolean): {
  fadeIn: Variants;
  fadeUp: Variants;
  stagger: Variants;
} {
  return {
    fadeIn: {
      hidden: reduceMotion ? {} : { opacity: 0 },
      visible: reduceMotion
        ? {}
        : { opacity: 1, transition: { duration: 0.6, ease: easeOut } },
    },
    fadeUp: {
      hidden: reduceMotion ? {} : { opacity: 0, y: 24 },
      visible: reduceMotion
        ? {}
        : { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
    },
    stagger: {
      hidden: {},
      visible: reduceMotion
        ? {}
        : { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
    },
  };
}
```

### Motion Usage in Capabilities Page

```tsx
// Lines 3, 17-19, 61-66, 81-86
import { motion, useReducedMotion } from "framer-motion";
import { landingViewport, useSectionVariants } from "@/lib/landingMotion";

const shouldReduceMotion = useReducedMotion();
const reduced = Boolean(shouldReduceMotion);
const { fadeUp, stagger } = useSectionVariants(reduced);

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={landingViewport}
  variants={stagger}
>
  {/* Content with fadeUp variants on children */}
</motion.div>
```

### Motion Usage in Contact Page

```tsx
// Lines 4, 39-40, 42-70
import { motion, useReducedMotion } from "framer-motion";

const shouldReduceMotion = useReducedMotion();
const reduced = Boolean(shouldReduceMotion);

// Custom stagger config (reduced-motion aware)
const outerStagger = {
  hidden: {},
  show: {
    transition: reduced ? undefined : { staggerChildren: 0.18, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
  show: reduced
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

<motion.section initial="hidden" animate="show" variants={outerStagger}>
  <motion.div variants={fadeUp}>{/* Content */}</motion.div>
</motion.section>
```

---

## 5. Contact API Endpoint

### Route

**File:** `/app/api/contact/route.ts` (88 lines)

#### POST Handler

```ts
export async function POST(request: Request) {
  // 1. Parse & validate
  const { type, name, email, message } = await request.json();
  
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "..." }, { status: 400 });
  }

  // 2. Build Telegram message with formatting
  const text = `
    📩 *Liên hệ mới từ TensorLab*
    
    📋 *Loại hợp tác:* ${typeLabel}
    👤 *Tên:* ${name}
    📧 *Email:* ${email}
    
    💬 *Nội dung:*
    ${message}
    
    🕐 ${timestamp}
  `.join("\n");

  // 3. Send to Telegram API
  const tgRes = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "Markdown",
      }),
    }
  );

  if (!tgRes.ok) {
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
```

#### Type Labels Mapping

```ts
const TYPE_LABELS: Record<string, string> = {
  product: "Hợp tác Product",
  outsource: "Thuê Outsource",
  other: "Khác",
};
```

#### Environment Requirements

```bash
TELEGRAM_BOT_TOKEN=xxx
TELEGRAM_CHAT_ID=xxx
```

---

## 6. File Structure Summary

```
/Users/lethai/Desktop/projects/startup/tensorlab/
├── app/[locale]/
│   ├── capabilities/
│   │   ├── page.tsx                 # Server component (15 lines)
│   │   └── CapabilitiesListContent.tsx # Client component (137 lines)
│   └── contact/
│       └── page.tsx                 # Client component (197 lines)
├── app/api/contact/
│   └── route.ts                     # POST handler (88 lines)
├── components/landing/
│   └── ContactForm.tsx              # Form component (156 lines)
├── lib/
│   ├── capabilityData.ts            # Data registry (69 lines)
│   └── landingMotion.ts             # Motion utils (52 lines)
└── locales/
    ├── en.json                      # English translations
    └── vi.json                      # Vietnamese translations
```

---

## 7. Dependencies

**Related Packages:**
- `framer-motion@12.34.0` - Animation library
- `antd@5.23.2` - Form, Button, Input, Select, Tag components
- `lucide-react@0.563.0` - Icons
- `next-intl@4.8.1` - i18n for translations

---

## 8. Key Patterns & Conventions

### 1. Reduced Motion Support
- All animations check `useReducedMotion()` hook
- Animations are disabled (return empty `{}`) when user prefers reduced motion
- Proper accessibility compliance

### 2. Scroll-Triggered Animations
- Use `whileInView` with `landingViewport` config
- `once: true` ensures animation plays only once
- `-120px` bottom margin creates early trigger for smooth reveal

### 3. Staggered Children Animations
- Parent `stagger` variant orchestrates child timing
- `staggerChildren: 0.15` / `delayChildren: 0.2` for smooth cascading
- Each child uses `fadeUp` variant

### 4. Form Defaults from Query Params
- Contact page supports `?type=product&message=...`
- Form pre-selects type and pre-fills message
- Auto-focuses name field with 400ms delay

### 5. Telegram Integration
- Contact form POSTs to `/api/contact`
- API formats message with emojis & Markdown
- Uses Telegram Bot API to send to private chat

### 6. Alternating Layout on Capabilities
- Maps through `CAPABILITY_ITEMS` array
- Uses `idx % 2 === 0` to determine `flex-row` or `flex-row-reverse`
- Icon always on left for even, right for odd indices

### 7. Icon & Color System
- Each capability has: `color` (text), `dotColor` (bg), `spotlightColor` (rgba)
- Icons from `lucide-react` (Compass, Shield, Rocket, Cpu, Layers, Cloud)
- Tailwind colors used directly in className (e.g., `text-info`, `bg-sky-400`)

---

## Unresolved Questions

None at this time. Implementation patterns are clear and well-structured.

