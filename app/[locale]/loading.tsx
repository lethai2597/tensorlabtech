import { getTranslations } from "next-intl/server";
import { Spin } from "antd";

export default async function Loading() {
  const t = await getTranslations("loading");

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 p-4">
      <Spin size="large" />
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("tip")}</p>
    </div>
  );
}
