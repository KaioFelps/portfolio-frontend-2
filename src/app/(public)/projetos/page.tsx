import type { Metadata } from "next";
import { Suspense } from "react";
import { AlertBlock } from "@/component/alert-block";
import { Main } from "@/component/main";
import SectionHeader from "@/component/section-header";
import { ServerResponseBoundary } from "@/component/server-response-boundary";
import { MetaUtilities } from "@/utils/meta";
import { tryOrServerInternalError } from "@/utils/try-or-server-internal-error";
import { fetchProjects } from "./actions";
import { ProjectCardSkeleton } from "./card/skeleton";
import { Content } from "./content";
import { ProjectsFilterForm } from "./filter-form";
import { ProjectsContainer } from "./projects-container";

export const metadata: Metadata = {
  title: await MetaUtilities.getTitle("Projetos"),
  description:
    "Projetos nos quais eu venho trabalhando, já trabalhei, \
    e/ou dou manutenção!",
  alternates: {
    canonical: await MetaUtilities.getCanonicalUrl("/projetos"),
  },
};

type Props = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function ProjectsPage({ searchParams }: Props) {
  return (
    <Main>
      <SectionHeader.Root hasActions>
        <SectionHeader.Heading>Projetos</SectionHeader.Heading>
        <ProjectsFilterForm />
      </SectionHeader.Root>

      <Suspense
        fallback={
          <ProjectsContainer>
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
          </ProjectsContainer>
        }
      >
        <InitialProjectsListWrapper searchParams={searchParams} />
      </Suspense>
    </Main>
  );
}

async function InitialProjectsListWrapper({ searchParams }: Props) {
  const { q, qb } = await searchParams;
  const query = q && qb ? { by: qb, value: q } : undefined;
  const projects = await tryOrServerInternalError(fetchProjects({ query }));

  return (
    <ServerResponseBoundary
      data={projects}
      fallbackComponent={({ error }) => (
        <AlertBlock type="danger">{error}</AlertBlock>
      )}
      component={({ data }) => (
        <Content initialData={data} projectsQuery={query} />
      )}
    />
  );
}
