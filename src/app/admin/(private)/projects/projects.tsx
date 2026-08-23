"use client";

import { PencilIcon } from "@phosphor-icons/react/dist/csr/Pencil";
import Link from "next/link";
import { AdminRoutes } from "@/app/routes";
import { AlertBlock } from "@/component/alert-block";
import Skeleton from "@/component/skeleton";
import type { PropsWithClassName } from "@/core/types/props";
import { DeleteProjectButton } from "./delete-project-button";
import { useFetchProjects } from "./hooks/use-fetch-projects";

export function ProjectsSection() {
  const { data, error, status } = useFetchProjects();

  switch (status) {
    case "pending":
      return <ProjectsSkeleton />;

    case "error":
      return (
        <AlertBlock type="danger" className="mb-0">
          {error.error}
        </AlertBlock>
      );

    case "success":
      if (data.projects.length <= 0) {
        return (
          <AlertBlock type="warning">
            <p>
              Você não tem nenhum projeto. Experimente{" "}
              <Link className="font-bold" href={AdminRoutes.projects.new}>
                criar um
              </Link>
              !
            </p>
          </AlertBlock>
        );
      }

      return (
        <div className="flex flex-col gap-1 mb-12">
          {data.projects.map((project) => (
            <div
              key={`admin-project-management-project-${project.id}`}
              className="flex justify-between gap-3 items-center p-4 rounded-2xl bg-white/5"
            >
              <span className="font-medium">{project.title}</span>
              <div className="flex items-center gap-3">
                <DeleteProjectButton
                  projectTitle={project.title}
                  projectId={project.id}
                />
                <Link href={AdminRoutes.projects.edit(project.id)}>
                  <PencilIcon size="20" weight="bold" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      );
  }
}

function ProjectsSkeleton() {
  return (
    <div className="flex flex-col gap-1 mb-12">
      <ProjectSkeleton className="min-w-2/3" />
      <ProjectSkeleton className="min-w-3/4" />
      <ProjectSkeleton className="min-w-1/3" />
      <ProjectSkeleton className="min-w-1/2" />
    </div>
  );
}

function ProjectSkeleton({ className }: PropsWithClassName) {
  return (
    <div className="flex justify-between gap-3 items-center p-4 rounded-2xl bg-white/5 animate-pulse">
      <Skeleton.TextLine charsCount={1} className={className} noLeading />
      <div className="flex items-center gap-3">
        <div className="aspect-square size-5 rounded-md bg-red-300/20" />
        <div className="aspect-square size-5 rounded-md bg-white/10" />
      </div>
    </div>
  );
}
