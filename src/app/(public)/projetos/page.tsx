import { Main } from "@/component/main";
import SectionHeader from "@/component/section-header";
import { MetaUtilities } from "@/utils/meta";
import type { Metadata } from "next";
import { fetchProjects } from "./actions";
import { AlertBlock } from "@/component/alert-block";
import { ProjectCard } from "./card";
import type { PaginatedResponse } from "@/core/types/paginated-response";
import type { Project } from "@/core/types/presented-entities/project";
import clsx from "clsx";

export const metadata: Metadata = {
  title: await MetaUtilities.getTitle("Projetos"),
  description:
    "Projetos nos quais eu venho trabalhando, já trabalhei, \
    e/ou dou manutenção!",
  alternates: {
    canonical: await MetaUtilities.getCanonicalUrl("/projetos"),
  },
};

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <Main>
      <SectionHeader.Root className="justify-between">
        <SectionHeader.Heading>Projetos</SectionHeader.Heading>
      </SectionHeader.Root>

      {!projects.success ? (
        <AlertBlock type="danger">{projects.error}</AlertBlock>
      ) : (
        <Content projects={projects.data} />
      )}
    </Main>
  );
}

function Content({
  projects,
}: { projects: PaginatedResponse<{ projects: Project[] }> }) {
  if (projects.totalCount === 0)
    return (
      <AlertBlock type="warning">Ainda não há nenhum projeto 🫶</AlertBlock>
    );

  return (
    <div
      className={clsx(
        "grid grid-flow-row grid-cols-3 gap-12 w-full max-w-screen-main mt-16",
        "max-lg:gap-6",
        "max-md:grid-cols-2",
        "max-sm:grid-cols-1",
      )}
    >
      {projects.projects.map(ProjectCard)}
    </div>
  );
}
