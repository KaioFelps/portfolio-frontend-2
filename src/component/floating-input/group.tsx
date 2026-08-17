import clsx from "clsx";
import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export function FloatingInputGroup({ className, children, ...props }: Props) {
  return (
    <div className={clsx("form-floating", className && className)} {...props}>
      {children}
    </div>
  );
}
