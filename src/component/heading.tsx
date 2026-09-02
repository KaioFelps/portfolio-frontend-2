import clsx from "clsx";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
  heading?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}>;

export function Heading({ children, className, heading: H = "h1" }: Props) {
  return (
    <H
      className={clsx(
        "max-md:text-4xl md:text-5xl font-bold",
        className && className,
      )}
    >
      {children}
    </H>
  );
}
