"use client";
import { Popover } from "@base-ui/react/popover";
import { PaintBrushIcon } from "@phosphor-icons/react/dist/ssr/PaintBrush";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import type { Editor } from "@tiptap/core";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "@/core/hooks/use-debounced-callback";
import { EditorButton } from "./editor-button";

const PRESET_PALETTE: Array<[name: string, hex: string]> = [
  ["Branco", "#ffffff"],
  ["Preto", "#000000"],
  ["Roxo", "#a855f7"],
  ["Amarelo", "#eab308"],
  ["Azul", "#3b82f6"],
  ["Cinza", "#4b5563"],
];
export function ColorPicker({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    () => editor.getAttributes("textStyle").color,
  );

  const applyColor = useDebouncedCallback((color: string) => {
    editor.chain().focus().setColor(color).run();
  }, 200);

  useEffect(() => {
    if (selectedColor) applyColor(selectedColor);
  }, [selectedColor]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) {
      setSelectedColor(editor.getAttributes("textStyle").color ?? "#ffffff");
    }
  };

  const handleClearColor = () => {
    editor.chain().focus().unsetColor().run();
    setSelectedColor(undefined);
  };

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger render={<EditorButton active={false} />}>
        <PaintBrushIcon size={20} weight="bold" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner
          align="start"
          sideOffset={8}
          alignOffset={0}
          collisionPadding={24}
        >
          <Popover.Popup className="max-w-[calc(100%-48px)] min-w-50 dropdown p-3">
            <span>
              <strong>Alterar cor do texto</strong>
            </span>
            <div className="flex items-center gap-2 my-2">
              <input
                value={selectedColor ?? "#ffffff"}
                onChange={(event) => setSelectedColor(event.target.value)}
                type="color"
                id="favcolor"
                className="block"
              />
              <button
                onClick={handleClearColor}
                type="button"
                title="Remover cor"
                aria-label="Remover cor"
                className="p-1.5 rounded-md hover:bg-white/10 active:bg-white/20 transition-all text-white/60 hover:text-white"
              >
                <XIcon size={16} weight="bold" />
              </button>
            </div>
            <hr className="bg-d-gray-300 h-px border-none w-full my-3" />
            <div className="grid grid-cols-6 grid-flow-row gap-1 mb-3">
              <button
                onClick={handleClearColor}
                title="Cor automática"
                aria-label="Cor automática"
                type="button"
                className="text-opt aspect-square rounded-md transition-all bg-transparent ring-inset ring-2 ring-white"
              />
              {PRESET_PALETTE.map(([name, hex]) => (
                <button
                  key={hex}
                  onClick={() => setSelectedColor(hex)}
                  type="button"
                  title={`Selecionar ${name}`}
                  aria-label={`Selecionar ${name}`}
                  style={{ background: hex }}
                  data-state={
                    editor.isActive("textStyle", { color: hex })
                      ? "active"
                      : "deactive"
                  }
                  className={
                    "text-opt aspect-square rounded-md transition-all " +
                    "data-[state=active]:scale-90 data-[state=active]:brightness-90"
                  }
                />
              ))}
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
