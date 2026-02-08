"use client";

import { useLocale } from "next-intl";
import { Result } from "antd";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const messages: Record<string, { title: string; subTitle: string; backHome: string }> = {
  en: {
    title: "404",
    subTitle: "Sorry, the page you visited does not exist.",
    backHome: "Back Home",
  },
  vi: {
    title: "404",
    subTitle: "Xin lỗi, trang bạn truy cập không tồn tại.",
    backHome: "Về trang chủ",
  },
};

export default function NotFound() {
  const locale = useLocale();
  const t = messages[locale] ?? messages[routing.defaultLocale];

  return (
    <div className="flex min-h-[50vh] items-center justify-center p-4">
      <Result
        status="info"
        title={t.title}
        subTitle={t.subTitle}
        extra={
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium text-white bg-[#1677ff] hover:bg-[#4096ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677ff] focus-visible:ring-offset-2"
          >
            {t.backHome}
          </Link>
        }
      />
    </div>
  );
}
