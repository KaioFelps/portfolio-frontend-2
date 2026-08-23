"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { queryClient } from ".";

export function ReactQueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
