import clsx from "clsx";
import type { PropsWithChildren } from "react";

type MainProps = PropsWithChildren<{
  className?: string;
}>;

export function Main({ children, className }: MainProps) {
  return (
    <main
      className={clsx(
        "flex-1 w-[calc(100%_-_24px)] max-w-main mx-auto flex flex-col items-center justify-center",
        className && className,
      )}
    >
      {children}
    </main>
  );
}
