"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

/**
 * Cuộn về đầu trang khi pathname thay đổi.
 * Next.js App Router mặc định scroll về top khi navigate,
 * nhưng `scroll-behavior: smooth` trên html có thể khiến scroll bị ngắt
 * nếu trang chưa render xong. Component này đảm bảo scroll về đúng vị trí (0, 0).
 */
export function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [pathname]);

    return null;
}
