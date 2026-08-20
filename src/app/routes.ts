export const AdminRoutes = {
  home: "/admin" as const,
  login: "/admin/login" as const,
  projects: {
    manage: "/admin/projects" as const,
  },
};

Object.freeze(AdminRoutes);
