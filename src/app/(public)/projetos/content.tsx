"use client";

import { SpinnerIcon } from "@phosphor-icons/react/dist/ssr/Spinner";
import clsx from "clsx";
import { useState, useTransition } from "react";
import { AlertBlock } from "@/component/alert-block";
import type { PaginatedResponse } from "@/core/types/paginated-response";
import type { Project } from "@/core/types/presented-entities/project";
import toast from "@/lib/toast";
import { type FetchProjectsQuery, fetchProjects } from "./actions";
import { ProjectCard } from "./card";

type Props = {
  initialData: PaginatedResponse<{ projects: Project[] }>;
  projectsQuery?: FetchProjectsQuery;
};

export function Content({ initialData, projectsQuery: query }: Props) {
  const [projects, setProjects] = useState(initialData.projects);
  const [page, setPage] = useState(1);
  const [pending, startTransition] = useTransition();
  const [hasMore, setHasMore] = useState(
    initialData.projects.length < initialData.totalCount,
  );

  const loadMoreAction = async () => {
    const nextPage = page + 1;
    const newProjects = await fetchProjects({ query, page: nextPage });

    if (!newProjects.success) {
      toast.danger({ title: "Ups! Algo deu errado..." });
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
      <div
        className={clsx(
          "grid grid-flow-row grid-cols-3 gap-12 w-full max-w-screen-main mt-16",
          "max-lg:gap-6",
          "max-md:grid-cols-2",
          "max-sm:grid-cols-1",
        )}
      >
        {projects.map(ProjectCard)}
      </div>

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
