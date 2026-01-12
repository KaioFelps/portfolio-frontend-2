import { Select } from "@base-ui/react/select";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import type { ReactElement } from "react";

type Props = Omit<Select.Positioner.Props, "render"> & {
  asChild?: boolean;
  upArrow?: ReactElement;
  downArrow?: ReactElement;
  animate?: boolean;
};

export function SelectContent({
  children,
  asChild = false,
  className,
  style,
  upArrow,
  downArrow,
  sideOffset = 8,
  collisionPadding = 24,
  alignItemWithTrigger = false,
  side = "bottom",
  animate = true,
  ...props
}: Props) {
  const Content = asChild ? Slot : Select.Popup;

  return (
    <Select.Portal>
      <Select.Backdrop />
      <Select.Positioner
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        alignItemWithTrigger={alignItemWithTrigger}
        {...props}
      >
        {upArrow}
        <Content
          className={clsx(
            "min-w-56 w-full rounded-xl border border-gray-200 dark:border-d-gray-200",
            "bg-backgrond dark:bg-d-backgrond p-1 shadow-sm outline-none transition-all duration-150",
            className,
            animate && [
              "data-open:data-starting-style:scale-90 data-open:data-ending-style:scale-100",
              "data-open:data-starting-style:opacity-0 data-open:data-ending-style:opaity-1",
              "data-closed:data-starting-style:scale-100 data-closed:data-ending-style:scale-90 ",
              "data-closed:data-starting-style:opaity-1 data-closed:data-ending-style:opacity-0 ",
            ],
          )}
          style={style}
        >
          {children}
        </Content>
        {downArrow}
      </Select.Positioner>
    </Select.Portal>
  );
}
