import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  size?: number;
  className?: string;
}

export function BrandLogo({ size = 28, className }: BrandLogoProps) {
  return (
    <Image
      src="/images/logo-single-color.png"
      width={size}
      height={size}
      alt="TensorLab logo"
      className={cn(
        "shrink-0 transition-[filter] duration-200",
        // Light: giữ nguyên màu gốc
        // Dark: brighness(0) → toàn đen, invert(1) → toàn trắng
        "dark:brightness-0 dark:invert",
        className
      )}
    />
  );
}


