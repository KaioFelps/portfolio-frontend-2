"use client";

import { SpinnerIcon } from "@phosphor-icons/react/dist/ssr/Spinner";
import { useEffect, useState, useTransition } from "react";
import { AlertBlock } from "@/component/alert-block";
import type { PaginatedResponse } from "@/core/types/paginated-response";
import type { Project } from "@/core/types/presented-entities/project";
import toast from "@/lib/toast";
import { type FetchProjectsQuery, fetchProjects } from "./actions";
import { ProjectCard } from "./card";
import { ProjectsContainer } from "./projects-container";

type Props = {
  initialData: PaginatedResponse<{ projects: Project[] }>;
  projectsQuery?: FetchProjectsQuery;
};

export function Content({ initialData, projectsQuery: query }: Props) {
  const [projects, setProjects] = useState<Project[]>(initialData.projects);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setProjects(initialData.projects);
    setHasMore(initialData.projects.length < initialData.totalCount);
    setPage(initialData.page);
  }, [initialData.projects, initialData.totalCount, initialData.page]);

  const loadMoreAction = async () => {
    const nextPage = page + 1;
    const newProjects = await fetchProjects({ query, page: nextPage });

    if (!newProjects.success) {
      toast.danger({ description: "Ups! Algo deu errado..." });
      return;
    }

    let currentProjectsAmount = projects.length;

    if (newProjects.data.projects.length > 0) {
      currentProjectsAmount += newProjects.data.projects.length;
      setProjects((prev) => [...prev, ...newProjects.data.projects]);
    }

    // cannot depend on projects.length, since setProjects is asynchronous
    const hasMore = currentProjectsAmount < newProjects.data.totalCount;
    setHasMore(hasMore);
    if (hasMore) setPage(nextPage);
  };

  if (projects.length === 0) {
    return (
      <AlertBlock type="warning">Ainda não há nenhum projeto 🫶</AlertBlock>
    );
  }

  return (
    <div>
      <ProjectsContainer>{projects.map(ProjectCard)}</ProjectsContainer>

      {hasMore && (
        <button
          className="btn default text-xl font-bold px-16 mx-auto mt-6 disabled:opacity-50"
          onClick={() => startTransition(loadMoreAction)}
          disabled={pending}
          aria-disabled={pending}
          type="button"
        >
          {pending ? (
            <>
              <SpinnerIcon
                size={24}
                weight="bold"
                className="animate-spin ml-2"
              />
              Carregando
            </>
          ) : (
            "Carregar mais projetos"
          )}
        </button>
      )}
    </div>
  );
}
