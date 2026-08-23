import type { PropsWithChildren } from "react";

export function PaginationItemsBoundary({ children }: PropsWithChildren) {
  return <div className="flex gap-1.25">{children}</div>;
}
