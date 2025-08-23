import type { ProjectLink } from "./project-link";
import type { Tag } from "./tag";

export type Project = {
  id: string;
  title: string;
  tags: Tag[];
  links: ProjectLink[];
  topstory: string;
  createdAt: string | Date;
};
