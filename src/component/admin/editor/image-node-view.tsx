"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { Popover } from "@base-ui/react/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr/Check";
import { GearIcon } from "@phosphor-icons/react/dist/ssr/Gear";
import { type NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import FloatingInput from "@/component/floating-input";
import { EditorButton } from "./editor-button";

const imageConfigSchema = z.object({
  width: z
    .string()
    .trim()
    .refine((v) => v === "" || /^\d+$/.test(v), "Largura deve ser um número."),
  className: z.string().trim(),
  style: z.string().trim(),
  href: z.union([z.literal(""), z.string().trim().url("URL inválida.")]),
  external: z.boolean(),
  caption: z.string().trim(),
  alt: z.string().trim(),
});

type ImageConfigValues = z.infer<typeof imageConfigSchema>;

function useRawStyle(cssText: string | null | undefined) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.cssText = cssText ?? "";
  }, [cssText]);

  return ref;
}

export function ImageNodeView({
  node,
  updateAttributes,
  selected,
}: NodeViewProps) {
  const {
    src,
    alt,
    width,
    imgClass,
    imgStyle,
    figureClass,
    figureStyle,
    href,
    caption,
  } = node.attrs;

  const imgRef = useRawStyle(imgStyle);
  const figureRef = useRawStyle(figureStyle);

  const img = (
    <img
      ref={imgRef as React.RefObject<HTMLImageElement>}
      src={src}
      alt={alt ?? ""}
      width={width || undefined}
      className={imgClass ?? undefined}
    />
  );

  return (
    <NodeViewWrapper
      className={clsx(
        "relative inline-block group",
        selected && "outline outline-blue-500 rounded",
      )}
      data-drag-handle
    >
      <figure
        ref={figureRef as React.RefObject<HTMLElement>}
        className={clsx("m-0", figureClass)}
      >
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {img}
          </a>
        ) : (
          img
        )}
        {caption ? (
          <figcaption className="text-xs text-white/60 text-center mt-1">
            {caption}
          </figcaption>
        ) : null}
      </figure>

      <div
        className={clsx(
          "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity",
          "data-popup-open:opacity-100",
        )}
      >
        <ImageConfigDialog
          attrs={{
            width,
            className: imgClass,
            style: imgStyle,
            href,
            caption,
            alt,
          }}
          onSave={(values) => updateAttributes(values)}
        />
      </div>
    </NodeViewWrapper>
  );
}

interface ImageConfigDialogProps {
  attrs: {
    width: number | null;
    className: string | null;
    style: string | null;
    href: string | null;
    caption: string | null;
    alt: string | null;
  };
  onSave: (attrs: {
    width: number | null;
    imgClass: string | null;
    imgStyle: string | null;
    href: string | null;
    caption: string | null;
    alt: string | null;
  }) => void;
}

function ImageConfigDialog({ attrs, onSave }: ImageConfigDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ImageConfigValues>({
    resolver: zodResolver(imageConfigSchema),
    defaultValues: {
      width: attrs.width ? String(attrs.width) : "",
      className: attrs.className ?? "",
      style: attrs.style ?? "",
      href: attrs.href ?? "",
      external: true,
      caption: attrs.caption ?? "",
      alt: attrs.alt ?? "",
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      reset({
        width: attrs.width ? String(attrs.width) : "",
        className: attrs.className ?? "",
        style: attrs.style ?? "",
        href: attrs.href ?? "",
        external: true,
        caption: attrs.caption ?? "",
        alt: attrs.alt ?? "",
      });
    }
  };

  const onSubmit = (values: ImageConfigValues) => {
    console.log(values);
    onSave({
      width: values.width ? Number.parseInt(values.width, 10) : null,
      imgClass: values.className || null,
      imgStyle: values.style || null,
      href: values.href || null,
      caption: values.caption || null,
      alt: values.alt || null,
    });
  };

  return (
    <Popover.Root onOpenChange={handleOpenChange}>
      <Popover.Trigger render={<EditorButton title="Configurar imagem" />}>
        <GearIcon size={24} weight="bold" />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Positioner
          align="end"
          sideOffset={8}
          alignOffset={0}
          collisionPadding={24}
        >
          <Popover.Popup className="max-w-[calc(100%-48px)] min-w-75 dropdown p-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <span className="block font-bold mb-4">Configurar Imagem</span>

              <FloatingInput.Error error={errors.width?.message} />

              <FloatingInput.Group className="mb-3">
                <FloatingInput.Input
                  {...register("width")}
                  className="w-full"
                  placeholder="ex: 480"
                  type="text"
                  inputMode="numeric"
                />
                <FloatingInput.Label>Largura (px)</FloatingInput.Label>
              </FloatingInput.Group>

              <FloatingInput.Group className="mb-3">
                <FloatingInput.Input
                  {...register("className")}
                  className="w-full"
                  placeholder="ex: rounded-xl shadow-lg"
                  type="text"
                />
                <FloatingInput.Label>Classe(s) CSS</FloatingInput.Label>
              </FloatingInput.Group>

              <FloatingInput.Group className="mb-3">
                <FloatingInput.Input
                  {...register("style")}
                  className="w-full"
                  placeholder="ex: border-radius: 12px;"
                  type="text"
                />
                <FloatingInput.Label>Estilo customizado</FloatingInput.Label>
              </FloatingInput.Group>

              <FloatingInput.Error error={errors.href?.message} />

              <FloatingInput.Group className="mb-3">
                <FloatingInput.Input
                  {...register("href")}
                  className="w-full"
                  placeholder="https://..."
                  type="text"
                />
                <FloatingInput.Label>Link</FloatingInput.Label>
              </FloatingInput.Group>

              {/* mantido pra simetria com o HyperlinkDialog; hoje o link da
                  imagem sempre abre em nova aba (ver renderHTML), então este
                  campo é decorativo até termos o atributo `target` na extensão */}
              <Controller
                control={control}
                name="external"
                render={({ field }) => (
                  <label
                    htmlFor="image-external"
                    className="my-4 flex items-center gap-3 select-none cursor-pointer group"
                  >
                    <Checkbox.Root
                      id="image-external"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled
                      className={clsx(
                        "form-control inline-flex p-0 size-6.25 items-center justify-center transition-all duration-150",
                        field.value ? "bg-yellow-500" : "bg-white/10",
                      )}
                    >
                      <Checkbox.Indicator className="inline-flex items-center justify-center pointer-events-none text-black">
                        <CheckIcon size={16} weight="bold" />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <span className="font-medium text-white/60">
                      Abre em nova aba
                    </span>
                  </label>
                )}
              />

              <FloatingInput.Group className="mb-3">
                <FloatingInput.Input
                  {...register("caption")}
                  className="w-full"
                  placeholder="Legenda da imagem"
                  type="text"
                />
                <FloatingInput.Label>Legenda</FloatingInput.Label>
              </FloatingInput.Group>

              <FloatingInput.Group className="mb-3">
                <FloatingInput.Input
                  {...register("alt")}
                  className="w-full"
                  placeholder="Texto alternativo"
                  type="text"
                />
                <FloatingInput.Label>Alt</FloatingInput.Label>
              </FloatingInput.Group>

              <hr className="bg-d-gray-300 h-px border-none w-full my-3" />

              <div className="flex items-center gap-2">
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
