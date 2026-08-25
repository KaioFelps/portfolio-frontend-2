"use client";

import { Menu } from "@base-ui/react/menu";
import { CaretUpIcon } from "@phosphor-icons/react/dist/ssr/CaretUp";
import clsx from "clsx";
import { useMemo } from "react";
import type { ToolbarOption } from "./types";

interface EditorSetProps {
  title: string;
  options: ToolbarOption[];
}

export function EditorSet({ title, options }: EditorSetProps) {
  const selected = useMemo(
    () => options.find((option) => option.active),
    [options],
  );
  const triggerTitle = selected?.title ?? title;

  return (
    <Menu.Root>
      <Menu.Trigger
        className={clsx(
          "w-32 group flex items-center justify-between px-2 py-1 rounded-md",
          "bg-white/10 hover:bg-white/15 active:bg-white/20 gap-3",
        )}
      >
        <span className="inline-block text-start w-full line-clamp-1 text-ellipsis whitespace-nowrap overflow-hidden">
          {triggerTitle}
        </span>
        <CaretUpIcon
          size={20}
          weight="regular"
          className="group-aria-expanded:rotate-180 transition-all duration-300"
        />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner
          side="bottom"
          align="start"
          sideOffset={8}
          alignOffset={0}
        >
          <Menu.Popup className="max-w-[calc(100%-48px)] min-w-36 dropdown p-1">
            {options.map(({ title: optionTitle, handler, active }) => (
              <Menu.Item
                key={optionTitle}
                data-selected={active || undefined}
                onClick={handler}
                className={clsx(
                  "cursor-default w-full text-start px-2 py-1 rounded-lg",
                  "hover:bg-d-gray-200",
                  "data-selected:bg-d-gray-200 data-selected:my-1",
                  "first:mt-0! last:mb-0!",
                )}
              >
                {optionTitle}
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
