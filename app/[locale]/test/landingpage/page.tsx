"use client";

import { Button, Collapse, Tag } from "antd";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Code2,
  Globe,
  Layers,
  LayoutDashboard,
  Lock,
  MessageSquare,
  Play,
  Rocket,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

/* =================================================================
   LANDING PAGE — /test/landingpage
   Tuân thủ UI-rules (token-first, AntD + Tailwind) nhưng mở rộng
   thêm style đặc thù cho marketing page:
   • Full-width section backgrounds (alternating bg-background / bg-surface)
   • Hero gradient overlay
   • Larger hero typography (vượt text-3xl cho impact)
   • CTA sections với gradient subtle
   ================================================================= */

export default function LandingPage() {
  return (
    <div className="-mt-16">
      {/* ─── HERO ─── */}
      <HeroSection />

      {/* ─── LOGOS / TRUSTED BY ─── */}
      <LogoCloudSection />

      {/* ─── FEATURES ─── */}
      <FeaturesSection />

      {/* ─── PRODUCT SHOWCASE ─── */}
      <ShowcaseSection />

      {/* ─── STATS ─── */}
      <StatsSection />

      {/* ─── TESTIMONIALS ─── */}
      <TestimonialsSection />

      {/* ─── PRICING ─── */}
      <PricingSection />

      {/* ─── FAQ ─── */}
      <FAQSection />

      {/* ─── FINAL CTA ─── */}
      <FinalCTASection />

      {/* ─── FOOTER ─── */}
      <FooterSection />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HERO SECTION
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-surface pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Decorative gradient orbs */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 size-[500px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "var(--color-primary)" }}
      />
      <div
        className="pointer-events-none absolute -right-40 -bottom-20 size-[400px] rounded-full opacity-15 blur-[100px]"
        style={{ background: "var(--color-info)" }}
      />

      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="flex justify-center">
            <Tag
              bordered={false}
              color="orange"
              className="px-4! py-1.5! text-sm! font-medium! rounded-full!"
            >
              <Sparkles className="size-4" />
              Phiên bản 2.0 — Nhanh hơn 3x
            </Tag>
          </div>

          {/* Headline — landing page cho phép lớn hơn text-3xl */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Xây dựng sản phẩm{" "}
            <span className="text-primary">nhanh hơn bao giờ hết</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Nền tảng phát triển ứng dụng hiện đại giúp đội ngũ của bạn ship sản
            phẩm nhanh gấp 10 lần với chất lượng enterprise-grade.
          </p>

          {/* CTA group */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button type="primary" size="large" className="h-12! px-8! text-base! font-semibold! rounded-xl!">
              Bắt đầu miễn phí <ArrowRight className="size-4" />
            </Button>
            <Button size="large" className="h-12! px-8! text-base! font-medium! rounded-xl!">
              <Play className="size-4" /> Xem demo
            </Button>
          </div>

          {/* Social proof micro */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="size-8 rounded-full bg-border border-2 border-surface"
                />
              ))}
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-foreground">2,500+</span> nhà
              phát triển tin dùng
            </p>
          </div>
        </div>

        {/* Hero visual — mock browser window */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-background border border-border rounded-3xl overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
              <div className="flex gap-2">
                <div className="size-3 rounded-full bg-error/60" />
                <div className="size-3 rounded-full bg-warning/60" />
                <div className="size-3 rounded-full bg-success/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-surface border border-border rounded-xl px-4 py-1.5 text-xs text-zinc-400 w-72 text-center">
                  app.yourproduct.com/dashboard
                </div>
              </div>
            </div>
            {/* Mock screen */}
            <div className="aspect-video bg-linear-to-br from-surface via-background to-surface flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <LayoutDashboard className="size-8 text-primary" />
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Dashboard Preview
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LOGO CLOUD
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function LogoCloudSection() {
  const logos = [
    "TechCorp",
    "DataFlow",
    "CloudSync",
    "DevStack",
    "InnoLab",
    "ScaleUp",
  ];

  return (
    <section className="bg-background py-16 border-y border-border">
      <div className="container mx-auto px-8">
        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center mb-8 font-medium uppercase tracking-wider">
          Được tin tưởng bởi hơn 500+ công ty hàng đầu
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {logos.map((name) => (
            <div
              key={name}
              className="text-xl font-bold text-zinc-300 dark:text-zinc-700 select-none"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FEATURES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const features = [
  {
    icon: Zap,
    title: "Tốc độ cực nhanh",
    desc: "Build time giảm 90% với hệ thống cache thông minh và hot-reload tức thì.",
    color: "text-warning",
  },
  {
    icon: Shield,
    title: "Bảo mật enterprise",
    desc: "Tích hợp sẵn SSO, 2FA, RBAC và mã hóa end-to-end cho mọi tầng.",
    color: "text-success",
  },
  {
    icon: Globe,
    title: "Triển khai toàn cầu",
    desc: "Deploy tới 40+ edge locations chỉ với một lệnh. Tự động scaling.",
    color: "text-info",
  },
  {
    icon: Code2,
    title: "Developer-first API",
    desc: "SDK cho mọi ngôn ngữ phổ biến, tài liệu đầy đủ và type-safe.",
    color: "text-primary",
  },
  {
    icon: Layers,
    title: "Kiến trúc module",
    desc: "Plugin ecosystem phong phú. Dễ dàng mở rộng và tùy biến theo nhu cầu.",
    color: "text-error",
  },
  {
    icon: Users,
    title: "Cộng tác real-time",
    desc: "Multiplayer editing, comment trực tiếp trên code và live preview.",
    color: "text-info",
  },
];

function FeaturesSection() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="container mx-auto px-8">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <Tag bordered={false} color="orange" className="rounded-full! px-3! py-0.5!">
            Tính năng
          </Tag>
          <h2 className="text-3xl font-semibold text-foreground">
            Mọi thứ bạn cần để ship nhanh
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Từ development đến production — một platform duy nhất cho toàn bộ
            quy trình.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-background rounded-3xl p-8 border border-transparent hover:border-border transition-colors duration-300 group"
            >
              <div className="size-12 rounded-2xl bg-border flex items-center justify-center mb-4">
                <f.icon size={22} className={f.color} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PRODUCT SHOWCASE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ShowcaseSection() {
  const checkpoints = [
    "Setup tự động trong 30 giây",
    "Type-safe API generation",
    "Tích hợp CI/CD sẵn có",
    "Preview deployment cho mọi PR",
  ];

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Tag bordered={false} color="blue" className="rounded-full! px-3! py-0.5!">
                Workflow
              </Tag>
              <h2 className="text-3xl font-semibold text-foreground">
                Từ ý tưởng đến production trong vài phút
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Không cần cấu hình phức tạp. Chỉ cần viết code và push — hệ
                thống lo phần còn lại.
              </p>
            </div>

            <div className="space-y-4">
              {checkpoints.map((cp) => (
                <div key={cp} className="flex items-center gap-4">
                  <CheckCircle2 className="size-5 text-success shrink-0" />
                  <span className="text-foreground">{cp}</span>
                </div>
              ))}
            </div>

            <Button type="primary" size="large" className="rounded-xl! h-11! px-6! font-semibold!">
              Tìm hiểu thêm <ChevronRight className="size-4" />
            </Button>
          </div>

          {/* Visual side — mock terminal */}
          <div className="bg-surface border border-border rounded-3xl overflow-hidden">
            {/* Terminal chrome */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
              <div className="flex gap-2">
                <div className="size-3 rounded-full bg-error/60" />
                <div className="size-3 rounded-full bg-warning/60" />
                <div className="size-3 rounded-full bg-success/60" />
              </div>
              <span className="text-xs text-zinc-500 ml-4 font-mono">
                terminal
              </span>
            </div>
            <div className="p-6 font-mono text-sm space-y-2">
              <p>
                <span className="text-success">$</span>{" "}
                <span className="text-foreground">npx create-app my-project</span>
              </p>
              <p className="text-zinc-500">
                ✓ Installing dependencies...
              </p>
              <p className="text-zinc-500">
                ✓ Setting up TypeScript config...
              </p>
              <p className="text-zinc-500">
                ✓ Configuring CI/CD pipeline...
              </p>
              <p className="text-zinc-500">
                ✓ Generating API client from schema...
              </p>
              <p className="text-success">
                ✓ Ready! cd my-project && npm run dev
              </p>
              <div className="pt-4 flex items-center gap-2">
                <span className="text-success">$</span>
                <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   STATS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const stats = [
  { value: "99.99%", label: "Uptime SLA", icon: TrendingUp },
  { value: "50ms", label: "Avg. response time", icon: Zap },
  { value: "10K+", label: "Dự án hoạt động", icon: Rocket },
  { value: "40+", label: "Edge locations", icon: Globe },
];

function StatsSection() {
  return (
    <section className="bg-surface py-20 md:py-28 border-y border-border">
      <div className="container mx-auto px-8">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-3xl font-semibold text-foreground">
            Con số nói lên tất cả
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Hạ tầng mạnh mẽ, hiệu suất vượt trội — được kiểm chứng bởi hàng
            ngàn khách hàng.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-background rounded-3xl p-8 text-center space-y-4"
            >
              <div className="size-12 rounded-2xl bg-border flex items-center justify-center mx-auto">
                <s.icon size={22} className="text-primary" />
              </div>
              <div className="text-3xl font-semibold text-foreground">
                {s.value}
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TESTIMONIALS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const testimonials = [
  {
    name: "Nguyễn Văn An",
    role: "CTO, TechViet",
    quote:
      "Chuyển sang nền tảng này đã giúp team chúng tôi giảm 70% thời gian deploy và tăng gấp đôi năng suất phát triển.",
    stars: 5,
  },
  {
    name: "Trần Thị Mai",
    role: "Lead Engineer, DataFlow",
    quote:
      "API documentation tự động và type-safety giúp team mới onboard trong 1 ngày thay vì 1 tuần như trước.",
    stars: 5,
  },
  {
    name: "Lê Hoàng Phúc",
    role: "Founder, ScaleUp",
    quote:
      "Từ MVP đến 10K users chỉ trong 3 tháng. Hạ tầng auto-scaling hoạt động hoàn hảo, không downtime.",
    stars: 5,
  },
];

function TestimonialsSection() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-8">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <Tag bordered={false} color="orange" className="rounded-full! px-3! py-0.5!">
            Đánh giá
          </Tag>
          <h2 className="text-3xl font-semibold text-foreground">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Hàng ngàn đội ngũ đã tin tưởng sử dụng nền tảng để xây dựng sản
            phẩm tuyệt vời.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-surface border border-border rounded-3xl p-8 space-y-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(t.stars)].map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 text-warning fill-warning"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground leading-relaxed">&ldquo;{t.quote}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="size-10 rounded-full bg-border" />
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {t.name}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PRICING
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const plans = [
  {
    name: "Starter",
    price: "Miễn phí",
    desc: "Phù hợp cho cá nhân và dự án nhỏ.",
    features: [
      "3 projects",
      "10GB bandwidth/tháng",
      "Community support",
      "Basic analytics",
    ],
    cta: "Bắt đầu ngay",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/tháng",
    desc: "Dành cho đội ngũ phát triển chuyên nghiệp.",
    features: [
      "Unlimited projects",
      "100GB bandwidth/tháng",
      "Priority support 24/7",
      "Advanced analytics",
      "Custom domains",
      "Team collaboration",
    ],
    cta: "Dùng thử 14 ngày",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Liên hệ",
    desc: "Giải pháp tùy chỉnh cho doanh nghiệp lớn.",
    features: [
      "Mọi tính năng Pro",
      "Unlimited bandwidth",
      "Dedicated support",
      "SLA 99.99%",
      "SSO / SAML",
      "On-premise option",
    ],
    cta: "Liên hệ sales",
    popular: false,
  },
];

function PricingSection() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="container mx-auto px-8">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <Tag bordered={false} color="orange" className="rounded-full! px-3! py-0.5!">
            Bảng giá
          </Tag>
          <h2 className="text-3xl font-semibold text-foreground">
            Chọn plan phù hợp với bạn
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Bắt đầu miễn phí, nâng cấp khi cần. Không phí ẩn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 space-y-8 relative ${
                plan.popular
                  ? "bg-background border-2 border-primary"
                  : "bg-background border border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Tag bordered={false} color="orange" className="rounded-full! px-3! font-semibold!">
                    Phổ biến nhất
                  </Tag>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-semibold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {plan.desc}
                </p>
              </div>

              <div className="space-y-4">
                {plan.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-4">
                    <CheckCircle2 className="size-4 text-success shrink-0" />
                    <span className="text-sm text-foreground">{feat}</span>
                  </div>
                ))}
              </div>

              <Button
                type={plan.popular ? "primary" : "default"}
                size="large"
                block
                className="rounded-xl! h-11! font-semibold!"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FAQ
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const faqItems = [
  {
    key: "1",
    label: "Tôi có cần kinh nghiệm DevOps để sử dụng không?",
    children:
      "Hoàn toàn không. Nền tảng được thiết kế để developer có thể tự deploy mà không cần kiến thức sâu về infrastructure. Mọi thứ từ CI/CD, scaling, monitoring đều được tự động hóa.",
  },
  {
    key: "2",
    label: "Dữ liệu của tôi được bảo mật như thế nào?",
    children:
      "Chúng tôi mã hóa dữ liệu end-to-end (AES-256), hỗ trợ SSO/SAML, tuân thủ SOC 2 Type II và GDPR. Dữ liệu được backup tự động mỗi giờ với khả năng restore tức thì.",
  },
  {
    key: "3",
    label: "Có thể migrate từ hệ thống cũ không?",
    children:
      "Có, chúng tôi cung cấp migration tool tự động và đội ngũ hỗ trợ chuyên biệt cho việc chuyển đổi. Hầu hết các dự án được migrate trong vòng 1-2 ngày.",
  },
  {
    key: "4",
    label: "Chính sách hủy và hoàn tiền như thế nào?",
    children:
      "Bạn có thể hủy bất cứ lúc nào. Với gói Pro, chúng tôi hoàn tiền 100% trong 30 ngày đầu tiên nếu bạn không hài lòng. Không ràng buộc hợp đồng dài hạn.",
  },
  {
    key: "5",
    label: "Có hỗ trợ framework nào?",
    children:
      "Chúng tôi hỗ trợ tất cả các framework phổ biến: Next.js, Nuxt, Remix, SvelteKit, Astro, và nhiều hơn nữa. Bất kỳ ứng dụng Node.js hoặc static site đều có thể deploy.",
  },
];

function FAQSection() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-8">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <Tag bordered={false} color="orange" className="rounded-full! px-3! py-0.5!">
            FAQ
          </Tag>
          <h2 className="text-3xl font-semibold text-foreground">
            Câu hỏi thường gặp
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Chưa tìm thấy câu trả lời? Liên hệ đội ngũ hỗ trợ 24/7 của chúng
            tôi.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Collapse
            items={faqItems}
            bordered={false}
            expandIconPosition="end"
            className="bg-transparent!"
            style={{ background: "transparent" }}
          />
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FINAL CTA
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function FinalCTASection() {
  return (
    <section className="relative overflow-hidden bg-surface py-20 md:py-28">
      {/* Decorative */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full opacity-10 blur-[120px]"
        style={{ background: "var(--color-primary)" }}
      />

      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Rocket size={28} className="text-primary" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Sẵn sàng xây dựng sản phẩm tiếp theo?
          </h2>

          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Tham gia cùng hàng ngàn nhà phát triển đã chọn chúng tôi. Bắt đầu
            miễn phí, không cần thẻ tín dụng.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button type="primary" size="large" className="h-12! px-8! text-base! font-semibold! rounded-xl!">
              Bắt đầu miễn phí <ArrowRight className="size-4" />
            </Button>
            <Button size="large" className="h-12! px-8! text-base! font-medium! rounded-xl!">
              <MessageSquare className="size-4" /> Chat với sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FOOTER
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const footerLinks = {
  "Sản phẩm": ["Tính năng", "Bảng giá", "Changelog", "Roadmap", "API Docs"],
  "Công ty": ["Về chúng tôi", "Blog", "Tuyển dụng", "Liên hệ", "Báo chí"],
  "Tài nguyên": ["Tài liệu", "Hướng dẫn", "Templates", "Community", "Status"],
  "Pháp lý": [
    "Điều khoản sử dụng",
    "Chính sách bảo mật",
    "Cookie",
    "SLA",
  ],
};

function FooterSection() {
  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4 mb-8 lg:mb-0">
            <div className="font-bold text-lg text-primary flex items-center gap-2">
              <Lock className="size-5" />
              <span className="text-foreground">Product</span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
              Nền tảng phát triển ứng dụng hiện đại cho đội ngũ đam mê tốc độ.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="font-semibold text-foreground text-sm">{title}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} Product. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Twitter", "GitHub", "Discord", "LinkedIn"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-primary transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
