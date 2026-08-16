import clsx from "clsx";
import type { PropsWithChildren } from "react";
import type { PropsWithClassName } from "@/core/types/props";

type Props = PropsWithChildren<
  PropsWithClassName<{
    full?: boolean;
    type?: "warning" | "danger" | "success";
  }>
>;

export function AlertBlock({
  full = true,
  type = "warning",
  children,
  className,
}: Props) {
  const alert = (
    <span className={clsx("mx-auto alert text-center w-full", type, className)}>
      {children}
    </span>
  );

  if (full)
    return (
      <div className={clsx("max-w-screen-main my-12 w-full", className)}>
        {alert}
      </div>
    );

  return alert;
}
