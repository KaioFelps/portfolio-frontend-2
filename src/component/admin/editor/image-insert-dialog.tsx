"use client";

import { Popover } from "@base-ui/react/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "@phosphor-icons/react/dist/ssr/Image";
import type { Editor } from "@tiptap/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FloatingInput from "@/component/floating-input";
import { EditorButton } from "./editor-button";

const imageInsertSchema = z.object({
  src: z
    .string()
    .trim()
    .min(1, "Informe a URL da imagem.")
    .url("URL inválida."),
  alt: z.string().trim(),
});

type ImageInsertValues = z.infer<typeof imageInsertSchema>;

export function ImageInsertDialog({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ImageInsertValues>({
    resolver: zodResolver(imageInsertSchema),
    defaultValues: { src: "", alt: "" },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) reset({ src: "", alt: "" });
  };

  const onSubmit = (values: ImageInsertValues) => {
    editor
      .chain()
      .focus()
      .setImage({ src: values.src, alt: values.alt || undefined })
      .run();
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger
        render={
          <EditorButton
            title="Inserir imagem"
            className={open ? "bg-white/20" : undefined}
          />
        }
      >
        <ImageIcon size={20} weight="bold" />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Positioner
          align="start"
          sideOffset={8}
          alignOffset={0}
          collisionPadding={24}
        >
          <Popover.Popup className="max-w-[calc(100%-48px)] min-w-75 dropdown p-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <span className="block font-bold mb-4">Inserir Imagem</span>

              <FloatingInput.Error error={errors.src?.message} />

              <FloatingInput.Group className="mb-3">
                <FloatingInput.Input
                  {...register("src")}
                  className="w-full"
                  placeholder="https://..."
                  type="text"
                />
                <FloatingInput.Label>URL da imagem</FloatingInput.Label>
              </FloatingInput.Group>

              <FloatingInput.Group className="mb-3">
                <FloatingInput.Input
                  {...register("alt")}
                  className="w-full"
                  placeholder="Descrição da imagem"
                  type="text"
                />
                <FloatingInput.Label>Alt (opcional)</FloatingInput.Label>
              </FloatingInput.Group>

              <hr className="bg-d-gray-300 h-px border-none w-full my-3" />

              <div className="flex items-center gap-2">
                <button type="submit" className="btn default btn-xs">
                  Inserir
                </button>
              </div>
            </form>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
