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
} as const;

Object.freeze(RQKeys);
