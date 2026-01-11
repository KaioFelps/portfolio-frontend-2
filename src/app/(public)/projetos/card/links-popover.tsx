import { LinkSimpleIcon } from "@phosphor-icons/react/dist/ssr/LinkSimple";
import clsx from "clsx";
import Popover from "@/component/popover";
import type { ProjectLink } from "@/core/types/presented-entities/project-link";

type Props = {
  projectId: string;
  links: ProjectLink[];
};

export function LinksPopover({ links, projectId }: Props) {
  return (
    <Popover.Root>
      <Popover.Trigger
        title="Links relacionados"
        className={clsx(
          "text-gray-800 p-1 rounded-md bg-gray-200 dark:text-d-gray-800 dark:bg-d-gray-200",
          "transition-all will-change-[filter,_background-color]",
          "hover:brightness-95 active:brightness-90",
          "dark:hover:bg-white/10 dark:active:bg-white/15",
        )}
      >
        <LinkSimpleIcon size="24" weight="bold" />
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Arrow />
        {links.map((link) => (
          <a
            key={`project-${projectId}-link-${link.title}`}
            className={clsx(
              "cursor-default block p-2 rounded-lg text-center transition-all",
              "will-change-[background-color,_filter] font-bold text-sm text-blue-500",
              "dark:bg-d-gray-200 dark:hover:bg-white/5 dark:active:bg-white/10",
              "dark:active:brightness-100 bg-gray-200 hover:bg-gray-300 active:brightness-90",
            )}
            href={link.value}
            target="_blank"
          >
            {link.title}
          </a>
        ))}
      </Popover.Content>
    </Popover.Root>
  );
}
