"use client";

import Image from "next/image";
import { useTheme } from "@/app/providers/ThemeProvider";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  size?: number;
  className?: string;
}

export function BrandLogo({ size = 28, className }: BrandLogoProps) {
  const { isDark } = useTheme();

  return (
    <Image
      src={isDark ? "/images/logo-white.png" : "/images/logo-single-color.png"}
      width={size}
      height={size}
      alt="TensorLab logo"
      className={cn("shrink-0", className)}
    />
  );
}




