import type { BlogPost } from "@/core/types/presented-entities/blog-post";
import type { FetchBlogPostsQuery } from "./actions";

type BlogPostsPerMonth = Record<string, BlogPost[]>;

export function segregatePostsByPublishmentDate(
  posts: BlogPost[],
): BlogPostsPerMonth;

export function segregatePostsByPublishmentDate(
  posts: BlogPostsPerMonth,
  newPosts: BlogPost[],
): BlogPostsPerMonth;

export function segregatePostsByPublishmentDate(
  postsOrExistingMap: BlogPostsPerMonth | BlogPost[],
  newPosts?: BlogPost[],
): BlogPostsPerMonth {
  const isInitialMap = !Array.isArray(postsOrExistingMap);

  const postsMap: BlogPostsPerMonth = isInitialMap
    ? { ...postsOrExistingMap }
    : {};

  const postsToProcess = isInitialMap ? (newPosts ?? []) : postsOrExistingMap;

  postsToProcess.forEach((post) => {
    const date = new Date(post.createdAt);
    const key = date.toLocaleDateString("pt-Br", {
      year: "numeric",
      month: "long",
    });

    if (!postsMap[key]) {
      postsMap[key] = [post];
      return;
    }

    postsMap[key].push(post);
  });

  return postsMap;
}

export function resolveQueryParameters({
  page,
  query,
  queryBy,
}: {
  page?: number;
  queryBy?: string;
  query?: string;
}) {
  const args: Record<string, unknown> = {};

  if (queryBy && query) args[queryBy] = query;
  if (page) args.page = page;

  if (!Object.keys(args).length) return;
  return args as FetchBlogPostsQuery;
}
