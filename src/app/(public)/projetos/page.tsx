import clsx from "clsx";
import type { Metadata } from "next";
import { AlertBlock } from "@/component/alert-block";
import { Main } from "@/component/main";
import SectionHeader from "@/component/section-header";
import { ServerResponseBoundary } from "@/component/server-response-boundary";
import type { PaginatedResponse } from "@/core/types/paginated-response";
import type { Project } from "@/core/types/presented-entities/project";
import { MetaUtilities } from "@/utils/meta";
import { tryOrServerInternalError } from "@/utils/try-or-server-internal-error";
import { fetchProjects } from "./actions";
import { ProjectCard } from "./card";

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
  const projects = await tryOrServerInternalError(fetchProjects());

  return (
    <Main>
      <SectionHeader.Root className="justify-between">
        <SectionHeader.Heading>Projetos</SectionHeader.Heading>
      </SectionHeader.Root>

      <ServerResponseBoundary
        data={projects}
        fallbackComponent={({ error }) => (
          <AlertBlock type="danger">{error}</AlertBlock>
        )}
        component={({ data }) => <Content projects={data} />}
      />
    </Main>
  );
}

function Content({
  projects,
}: {
  projects: PaginatedResponse<{ projects: Project[] }>;
}) {
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
