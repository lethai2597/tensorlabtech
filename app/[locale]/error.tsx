"use client";

import { useTranslations } from "next-intl";
import { Result, Button } from "antd";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  return (
    <div className="flex min-h-[50vh] items-center justify-center p-4">
      <Result
        status="error"
        title={t("title")}
        subTitle={t("subTitle")}
        extra={
          <Button type="primary" onClick={reset}>
            {t("tryAgain")}
          </Button>
        }
      />
    </div>
  );
}
