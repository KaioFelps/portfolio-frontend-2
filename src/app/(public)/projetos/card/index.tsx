import clsx from "clsx";
import type { Project } from "@/core/types/presented-entities/project";
import { LinksPopover } from "./links-popover";

export function ProjectCard(project: Project) {
  return (
    <article
      key={`project-card-${project.id}`}
      className={clsx(
        "group/parent transition-all will-change-[shadow] p-4 rounded-2xl",
        "bg-gray-100 dark:bg-d-gray-100 border border-gray-300 dark:border-none",
        "hover:shadow-lg duration-300 flex flex-col gap-3",
      )}
    >
      <img
        src={project.topstory}
        className="h-[180px] rounded-lg object-cover object-center"
        alt=""
      />

      <h2 className="font-medium text-base leading-4">
        <span className="sr-only">Projeto </span>
        {project.title}
      </h2>

      <footer className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <a
              key={`${project.id}_tag_${tag.id}`}
              href={`/projetos?q=${tag.value}&qb=tag`}
              className="group chip c-yellow c-clickable"
            >
              {tag.value}
            </a>
          ))}
        </div>

        <LinksPopover projectId={project.id} links={project.links} />
      </footer>
    </article>
  );
}
