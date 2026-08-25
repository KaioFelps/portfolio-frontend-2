export const AdminRoutes = {
  home: "/admin" as const,
  login: "/admin/login" as const,
  projects: {
    manage: "/admin/projects" as const,
    edit: (projectId: string) => `/admin/projects/edit/${projectId}`,
    new: `/admin/projects/new`,
  },
  tags: {
    manage: "/admin/tags" as const,
    edit: (tagId: string) => `/admin/tags/edit/${tagId}`,
    new: `/admin/tags/new`,
  },
  posts: {
    manage: "/admin/blog" as const,
    edit: (postSlug: string) => `/admin/blog/edit/${postSlug}`,
    new: `/admin/blog/new`,
  },
};

Object.freeze(AdminRoutes);
