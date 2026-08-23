"use client";

import { Select } from "@base-ui/react";
import { CaretDownIcon } from "@phosphor-icons/react/dist/csr/CaretDown";
import clsx from "clsx";
import type { FocusEventHandler, RefCallback } from "react";
import { FloatingInputLabel } from "./label";

export type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  options: SelectOption[];
  placeholder: string;
  name?: string;
  ref?: RefCallback<Element>;
  onBlur?: FocusEventHandler;
  disabled?: boolean;
} & (
  | {
      multiple: true;
      value?: string[];
      onValueChange: (value: string[]) => void;
    }
  | {
      multiple?: false;
      value?: string;
      onValueChange: (value: string) => void;
    }
);

type InferValueParam<T> = T extends (value: infer U) => void ? U : never;

export function FloatingInputSelect({
  name,
  multiple = false,
  options,
  placeholder,
  value,
  onValueChange,
  ref,
  onBlur,
  disabled,
}: Props) {
  const mustPutPlaceholder = !value || value.length === 0;
  const selectedValues = !Array.isArray(value)
    ? options.find((option) => option.value === value)?.label || value
    : value
        .map((v) => options.find((option) => option.value === v)?.label)
        .filter(Boolean)
        .join(", ");

  return (
    <Select.Root
      name={name}
      disabled={disabled}
      multiple={multiple as boolean}
      value={value}
      inputRef={ref}
      onValueChange={(val) => {
        type T = InferValueParam<typeof onValueChange>;
        (onValueChange as (value: T) => void)(val as T);
      }}
    >
      <Select.Trigger
        onBlur={onBlur}
        className="group mb-4 form-select-floating w-full flex justify-between items-center"
      >
        <span
          className={clsx(
            "data-placeholder:opacity-0 form-select-control font-medium",
            mustPutPlaceholder && "opacity-70",
          )}
        >
          {mustPutPlaceholder ? placeholder : selectedValues}
        </span>
        <FloatingInputLabel>{placeholder}</FloatingInputLabel>
        <CaretDownIcon
          size={16}
          weight="bold"
          className="group-data-open:rotate-180 transition-transform duration-300 will-change-transform"
        />
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner
          sideOffset={4}
          align="start"
          side="bottom"
          alignItemWithTrigger={false}
          collisionAvoidance={{ align: "shift", side: "shift" }}
        >
          <Select.Popup
            className={clsx(
              "bg-d-backgrond/50 p-1.5 backdrop-blur-3xl rounded-xl border border-white/5",
              "shadow-black/50 shadow-2xl w-(--anchor-width)",
              "transition-all duration-200 ease-out origin-top",
              "data-starting-style:scale-95 data-starting-style:opacity-0 data-starting-style:-translate-y-2",
              "data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:-translate-y-2",
              "max-h-75 overflow-y-auto overscroll-contain",
            )}
          >
            {options.map((option) => (
              <Select.Item
                key={`floating-select-input-option-${option.label}-${option.value}`}
                value={option.value}
                className={clsx(
                  "p-1.5 rounded-lg hover:bg-white/5 cursor-default data-selected:bg-white/5 mb-1 last:mb-0",
                  "ring-yellow-500/25 ring-0 outline-none transition-all duration-100 will-change-[shadow]",
                  "focus:ring-4 data-highlighted:ring-4",
                )}
              >
                {option.label}
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
