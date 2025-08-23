import clsx from "clsx";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  full?: boolean;
  type?: "warning" | "danger" | "success";
}>;

export function AlertBlock({ full = true, type = "warning", children }: Props) {
  const alert = (
    <span className={clsx("mx-auto alert text-center w-full", type)}>
      {children}
    </span>
  );

  if (full)
    return <div className="max-w-screen-main my-12 w-full">{alert}</div>;

  return alert;
}
