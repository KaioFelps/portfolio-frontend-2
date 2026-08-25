import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const RQKeys = {
  auth: {
    base: ["auth"] as const,
    login: () => [...RQKeys.auth.base, "login"],
    logout: () => [...RQKeys.auth.base, "logout"],
  },
  statistics: {
    base: ["statistics"] as const,
    fetchAll: () => [...RQKeys.statistics.base, "fetch-all"] as const,
  },
  logs: {
    base: ["logs"] as const,
    fetchAll: () => [...RQKeys.logs.base, "fetch-all"] as const,
  },
  projects: {
    base: ["projects"] as const,
    fetchPaginatedBase: () =>
      [...RQKeys.projects.base, "fetch-paginated"] as const,
    fetchPaginated: (filters: object | undefined) =>
      [...RQKeys.projects.fetchPaginatedBase(), filters] as const,
    findById: (projectId: string) =>
      [...RQKeys.projects.base, "find-by-id", projectId] as const,
  },
  tags: {
    base: ["tags"] as const,
    fetchPaginatedBase: () => [...RQKeys.tags.base, "fetch-paginated"] as const,
    fetchPaginated: (filters: object | undefined) =>
      [...RQKeys.tags.fetchPaginatedBase(), filters] as const,
  },
  posts: {
    base: ["posts"] as const,
    fetchPaginatedBase: () =>
      [...RQKeys.posts.base, "fetch-paginated"] as const,
    fetchPaginated: (filters: object | undefined) =>
      [...RQKeys.posts.fetchPaginatedBase(), filters] as const,
    findBySlug: (slug: string) =>
      [...RQKeys.posts.base, "find-by-slug", slug] as const,
  },
} as const;

Object.freeze(RQKeys);
