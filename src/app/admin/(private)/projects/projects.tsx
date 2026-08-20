"use client";

import { AlertBlock } from "@/component/alert-block";
import { useFetchProjects } from "./hooks/use-fetch-projects";

export function ProjectsSection() {
  const { data, error, status } = useFetchProjects();

  switch (status) {
    case "pending":
      return <ProjectsSkeleton />;

    case "error":
      return <AlertBlock type="danger">{error.error}</AlertBlock>;

    case "success":
      if (data.projects.length <= 0) {
        return (
          <AlertBlock type="warning">
            <p>
              Você não tem nenhum projeto. Experimente{" "}
              <a className="font-bold" href="/admin/projetos/novo">
                criar um
              </a>
              !
            </p>
          </AlertBlock>
        );
      }

      return (
        <div className="flex flex-col gap-1 mb-12">
          {data.projects.map((project) => (
            <div className="flex justify-between gap-3 items-center p-4 rounded-2xl bg-white/5">
              <span className="font-medium">{project.title}</span>
              <div className="flex items-center gap-3">
                {/* <DeleteProjectButton projectId={project.id} />
						<a href="/admin/projetos/editar/{project.id}"><Pencil size="20" weight="bold" /></a> */}
              </div>
            </div>
          ))}
        </div>
      );
  }
}

function ProjectsSkeleton() {
  return <div></div>;
}
