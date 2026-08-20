import type { PropsWithChildren } from "react";

export function PaginationRoot({ children }: PropsWithChildren) {
  return <div className="flex justify-center gap-2.5">{children}</div>;
}
