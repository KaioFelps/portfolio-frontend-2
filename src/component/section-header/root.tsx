import clsx from "clsx";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
}>;

export function Root({ children, className }: Props) {
  return (
    <header
      className={clsx(
        "w-full px-12 pb-6 border-b border-gray-300 dark:border-d-gray-300 flex",
        className,
      )}
    >
      {children}
    </header>
  );
}
