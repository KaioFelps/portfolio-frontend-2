import clsx from "clsx";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
  hasActions?: boolean;
}>;

export function Root({ children, className, hasActions = false }: Props) {
  return (
    <header
      className={clsx(
        "w-full px-12 pb-6 border-b border-gray-300 dark:border-d-gray-300 flex",

        hasActions
          ? [
              "items-center justify-between gap-4",
              "max-md:flex-col max-md:items-start max-md:px-0",
              "max-md:gap-x-0 max-md:gap-y-9 max-md:px-0 max-sm:items-center",
            ]
          : ["justify-center"],
        className,
      )}
    >
      {children}
    </header>
  );
}
