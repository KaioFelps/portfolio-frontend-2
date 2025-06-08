"use client";

import { ProgressProvider } from "@bprogress/next/app";
import type { PropsWithChildren } from "react";

export function ProgressBar({ children }: PropsWithChildren) {
  return (
    <ProgressProvider color="var(--color-yellow-600)">
      {children}
    </ProgressProvider>
  );
}
