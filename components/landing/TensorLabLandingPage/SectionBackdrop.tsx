"use client";

type SectionBackdropVariant = "primary" | "cool" | "neutral";

const variantMap: Record<
  SectionBackdropVariant,
  { top: string; bottom: string }
> = {
  primary: {
    top: "rgba(37, 99, 235, 0.22)",
    bottom: "rgba(56, 189, 248, 0.16)",
  },
  cool: {
    top: "rgba(14, 165, 233, 0.18)",
    bottom: "rgba(37, 99, 235, 0.16)",
  },
  neutral: {
    top: "rgba(99, 102, 241, 0.12)",
    bottom: "rgba(59, 130, 246, 0.10)",
  },
};

export function SectionBackdrop({
  variant = "primary",
  className,
}: {
  variant?: SectionBackdropVariant;
  className?: string;
}) {
  const colors = variantMap[variant];

  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none absolute inset-0 overflow-hidden",
        className ?? "",
      ].join(" ")}
    >
      <div
        className="absolute -top-28 left-1/2 -translate-x-1/2 size-[720px] rounded-full blur-3xl opacity-45 dark:opacity-25"
        style={{
          background: `radial-gradient(circle at center, ${colors.top} 0%, transparent 60%)`,
        }}
      />
      <div
        className="absolute -bottom-44 -left-44 size-[680px] rounded-full blur-3xl opacity-35 dark:opacity-20"
        style={{
          background: `radial-gradient(circle at center, ${colors.bottom} 0%, transparent 62%)`,
        }}
      />
    </div>
  );
}

