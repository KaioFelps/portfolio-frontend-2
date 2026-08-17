import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const RQKeys = {
  auth: {
    base: ["auth"] as const,
  },
} as const;

Object.freeze(RQKeys);
