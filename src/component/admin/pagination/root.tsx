import clsx from "clsx";
import type { PropsWithChildren } from "react";
import type { PropsWithClassName } from "@/core/types/props";

export function PaginationRoot({
  children,
  className,
}: PropsWithChildren<PropsWithClassName>) {
  return (
    <div className={clsx("flex justify-center gap-2.5", className)}>
      {children}
    </div>
  );
}
