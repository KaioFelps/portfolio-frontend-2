import { Select } from "@base-ui/react/select";
import { CaretUpIcon } from "@phosphor-icons/react/dist/ssr/CaretUp";

type Props = {
  label: string;
};

export function SelectTrigger({ label }: Props) {
  return (
    <Select.Trigger className="flex items-center justify-between py-5 gap-3 input group min-w-56">
      {label}

      <CaretUpIcon
        size="24"
        weight="regular"
        className="group-data-popup-open:rotate-180 transition-all duration-300"
      />
    </Select.Trigger>
  );
}
