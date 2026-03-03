import { getTranslations } from "next-intl/server";

import TeamContent from "./TeamContent";

export async function generateMetadata() {
  const t = await getTranslations("teamPage");
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
  };
}

export default async function TeamPage() {
  return <TeamContent />;
}
