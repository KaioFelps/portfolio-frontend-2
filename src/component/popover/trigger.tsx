import { Popover } from "@base-ui/react/popover";
import { Slot } from "@radix-ui/react-slot";

type Props = Omit<Popover.Trigger.Props, "render"> & {
  asChild?: boolean;
};

export function PopoverTrigger({ children, asChild = false, ...props }: Props) {
  if (!asChild) return <Popover.Trigger {...props}>{children}</Popover.Trigger>;

  return (
    <Popover.Trigger {...props}>
      <Slot>{children}</Slot>
    </Popover.Trigger>
  );
}
