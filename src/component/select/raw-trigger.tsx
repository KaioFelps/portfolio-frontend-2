import { Select } from "@base-ui/react/select";
import { Slot } from "@radix-ui/react-slot";

type Props = Select.Trigger.Props & {
  asChild?: boolean;
};

export function SelectRawTrigger({ children, asChild, ...props }: Props) {
  if (!asChild) return <Select.Trigger {...props}>{children}</Select.Trigger>;

  return (
    <Select.Trigger>
      <Slot>{children}</Slot>
    </Select.Trigger>
  );
}
