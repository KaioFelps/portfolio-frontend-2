import clsx from "clsx";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export function ProjectsContainer({ children }: Props) {
  return (
    <div
      className={clsx(
        "grid grid-flow-row grid-cols-3 gap-12 w-full max-w-screen-main mt-16",
        "max-lg:gap-6",
        "max-md:grid-cols-2",
        "max-sm:grid-cols-1",
      )}
    >
      {children}
    </div>
  );
}
