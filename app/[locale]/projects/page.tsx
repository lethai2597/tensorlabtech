import { getTranslations } from "next-intl/server";

import ProjectsListContent from "./ProjectsListContent";

export async function generateMetadata() {
  const t = await getTranslations("landing.projects");
  return {
    title: t("title") + " — TensorLab",
    description: t("desc"),
  };
}

export default async function ProjectsPage() {
  return <ProjectsListContent />;
}
