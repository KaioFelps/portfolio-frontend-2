import { Switch as PSwitch } from "@base-ui/react";
import clsx from "clsx";

type Props = PSwitch.Root.Props;

export function Switch({ ...props }: Props) {
  return (
    <PSwitch.Root
      {...props}
      className={clsx(
        "outline-none focus-visible:outline-none rounded-full p-0.75",
        "ring-0 focus-visible:ring-4 focus-visible:ring-yellow-600/40",
        "bg-gray-100 dark:bg-d-gray-100 border border-gray-300 dark:border-d-gray-300",
        "shrink-0 cursor-default hover:brightness-95 active:scale-95 transition-all",
        "inline-flex w-8.75 items-center disabled:cursor-not-allowed disabled:opacity-50",
      )}
    >
      <PSwitch.Thumb
        className={clsx(
          "size-3.75 rounded-full pointer-events-none block shrink-0 transition-transform",
          "data-unchecked:translate-x-3 data-checked:translate-x-0",
          "data-unchecked:bg-d-gray-600 data-unchecked:dark:bg-gray-600",
          "data-checked:bg-yellow-500",
        )}
      />
    </PSwitch.Root>
  );
}
