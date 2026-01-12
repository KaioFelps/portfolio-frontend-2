import { Select } from "@base-ui/react/select";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import React from "react";

type Props = {
  value: string;
  label: string;
  className?: string;
  asChild?: boolean;
};

export function SelectItem({
  value,
  label,
  className,
  asChild = false,
}: Props) {
  const Element = asChild ? Slot : React.Fragment;

  return (
    <Select.Item
      value={value}
      label={label}
      className={clsx(
        "cursor-default px-4 py-2 hover:bg-gray-200 dark:hover:bg-d-gray-200 rounded-lg",
        "data-selected:bg-gray-200 data-selected:dark:bg-d-gray-200 [&:not(:last-child)]:data-selected:my-0.5",
        className,
      )}
    >
      <Element>{label}</Element>
    </Select.Item>
  );
}
