"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { Popover } from "@base-ui/react/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { LinkSimpleIcon } from "@phosphor-icons/react/dist/ssr/LinkSimple";
import type { Editor } from "@tiptap/core";
import clsx from "clsx";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import FloatingInput from "@/component/floating-input";
import { EditorButton } from "./editor-button";

const linkSchema = z.object({
  url: z.string().trim().min(1, "Informe uma URL.").url("URL inválida."),
  external: z.boolean(),
});

type LinkFormValues = z.infer<typeof linkSchema>;

export function HyperlinkDialog({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const isHyperlink = editor.isActive("link");

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: { url: "", external: false },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) {
      reset({
        url: editor.getAttributes("link").href ?? "",
        external: editor.getAttributes("link").target === "_blank",
      });
    }
  };

  const handleUnsetLink = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setOpen(false);
  };

  const onSubmit = (values: LinkFormValues) => {
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({
          href: values.url,
          target: values.external ? "_blank" : "_self",
        })
        .run();
      setOpen(false);
    } catch (caughtError) {
      setError("url", {
        message:
          caughtError instanceof Error
            ? caughtError.message
            : "Não foi possível salvar o link.",
      });
    }
  };

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger
        render={
          <EditorButton
            active={isHyperlink}
            className={open ? "bg-white/20" : undefined}
          />
        }
      >
        <LinkSimpleIcon size={20} weight="bold" />
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
              <span className="block font-bold mb-4">Editar Hyperlink</span>

              <FloatingInput.Error error={errors.url?.message} />

              <FloatingInput.Group className="mb-3">
                <FloatingInput.Input
                  {...register("url")}
                  className="w-full"
                  placeholder="https://www.kaiofelps.dev"
                  type="text"
                />
                <FloatingInput.Label>URL</FloatingInput.Label>
              </FloatingInput.Group>

              <Controller
                control={control}
                name="external"
                render={({ field }) => (
                  <label
                    htmlFor="external"
                    className="my-4 flex items-center gap-3 select-none cursor-pointer group"
                  >
                    <Checkbox.Root
                      id="external"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className={clsx(
                        "form-control inline-flex p-0 size-6.25 items-center justify-center transition-all duration-150",
                        field.value ? "bg-yellow-500" : "bg-white/10",
                      )}
                    >
                      <Checkbox.Indicator className="inline-flex items-center justify-center pointer-events-none text-black">
                        <CheckIcon size={16} weight="bold" />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <span
                      className={clsx(
                        "font-medium transition-colors duration-150",
                        field.value
                          ? "text-white"
                          : "text-white/60 hover:text-white/70",
                      )}
                    >
                      Link externo
                    </span>
                  </label>
                )}
              />

              <hr className="bg-d-gray-300 h-px border-none w-full my-3" />

              <div className="flex items-center gap-2">
                {isHyperlink && (
                  <button
                    type="button"
                    onClick={handleUnsetLink}
                    className="btn ghost btn-xs"
                  >
                    Remover
                  </button>
                )}
                <button type="submit" className="btn default btn-xs">
                  Salvar
                </button>
              </div>
            </form>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
