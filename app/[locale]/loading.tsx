import { getTranslations } from "next-intl/server";
import { Spin } from "antd";

export default async function Loading() {
  const t = await getTranslations("loading");

  return (
    <div className="flex min-h-[40vh] items-center justify-center p-4">
      <Spin size="large" tip={t("tip")} />
    </div>
  );
}
