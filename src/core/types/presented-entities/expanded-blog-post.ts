import type { Tag } from "./tag";

export type ExpandedBlogPost = {
  id: string;
  author: string;
  title: string;
  slug: string;
  tags: Tag[];
  topstory: string;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
  publishedAt: Date | null;
  description: string;
};
