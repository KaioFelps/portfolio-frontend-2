import { Popover } from "@base-ui/react/popover";
import clsx from "clsx";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren & Popover.Positioner.Props;

export function PopoverContent({
  children,
  sideOffset = 8,
  side = "bottom",
  collisionPadding = 24,
  ...props
}: Props) {
  return (
    <Popover.Portal>
      <Popover.Backdrop />
      <Popover.Positioner
        {...props}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
      >
        <Popover.Popup
          className={clsx(
            "z-30 w-full flex flex-col gap-1 max-w-48 rounded-xl ring-1 ring-gray-300",
            "dark:ring-black bg-gray-100 dark:bg-d-gray-100 p-2",
            "not-data-instant:transition-all duration-75 ease-[cubic-bezier(0,0,0.2,1)] will-change-[scale]",
            "data-open:data-starting-style:scale-75 data-open:data-ending-style:scale-100",
            "data-closed:data-starting-style:scale-100 data-closed:data-ending-style:scale-75",
          )}
        >
          {children}
        </Popover.Popup>
      </Popover.Positioner>
    </Popover.Portal>
  );
}
