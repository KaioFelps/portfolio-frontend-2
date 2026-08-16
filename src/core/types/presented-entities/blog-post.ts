export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  topstory: string;
  tags: { id: string; value: string }[];
  description: string;
  createdAt: string | Date;
  publishedAt: string | Date | null | undefined;
};
