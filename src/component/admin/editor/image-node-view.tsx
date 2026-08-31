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
  figureClassName: z.string().trim(),
  figureStyle: z.string().trim(),
  href: z.union([z.literal(""), z.string().trim().url("URL inválida.")]),
  external: z.boolean(),
  caption: z.string().trim(),
  alt: z.string().trim(),
  asFigure: z.boolean(),
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
    openInNewTab,
    caption,
    asFigure,
  } = node.attrs;

  const imgRef = useRawStyle(imgStyle);
  const figureRef = useRawStyle(figureStyle);

  const imgEl = (
    <img
      ref={imgRef as React.RefObject<HTMLImageElement>}
      src={src}
      alt={alt ?? ""}
      width={width || undefined}
      className={imgClass ?? undefined}
    />
  );

  const linkedImg = href ? (
    <a
      href={href}
      target={openInNewTab === false ? undefined : "_blank"}
      rel="noopener noreferrer"
    >
      {imgEl}
    </a>
  ) : (
    imgEl
  );

  const configDialog = (
    <ImageConfigDialog
      attrs={{
        width,
        className: imgClass,
        style: imgStyle,
        figureClassName: figureClass,
        figureStyle,
        href,
        openInNewTab,
        caption,
        alt,
        asFigure,
      }}
      onSave={(values) => updateAttributes(values)}
    />
  );

  const gearButton = (
    <div
      className={clsx(
        "absolute top-2 right-2 transition-opacity",
        selected ? "opacity-100" : "opacity-0 group-hover:opacity-100",
      )}
    >
      {configDialog}
    </div>
  );

  if (!asFigure) {
    return (
      <NodeViewWrapper
        className={clsx(
          "relative inline-block group",
          selected && "outline outline-blue-500 rounded",
        )}
        data-drag-handle
      >
        {linkedImg}
        {gearButton}
      </NodeViewWrapper>
    );
  }

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
        {linkedImg}
        {caption ? (
          <figcaption className="text-xs text-white/60 text-center mt-1">
            {caption}
          </figcaption>
        ) : null}
      </figure>

      {gearButton}
    </NodeViewWrapper>
  );
}

interface ImageConfigDialogProps {
  attrs: {
    width: number | null;
    className: string | null;
    style: string | null;
    figureClassName: string | null;
    figureStyle: string | null;
    href: string | null;
    openInNewTab: boolean;
    caption: string | null;
    alt: string | null;
    asFigure: boolean;
  };
  onSave: (attrs: {
    width: number | null;
    imgClass: string | null;
    imgStyle: string | null;
    figureClass: string | null;
    figureStyle: string | null;
    href: string | null;
    openInNewTab: boolean;
    caption: string | null;
    alt: string | null;
    asFigure: boolean;
  }) => void;
}

function ImageConfigDialog({ attrs, onSave }: ImageConfigDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<ImageConfigValues>({
    resolver: zodResolver(imageConfigSchema),
    defaultValues: {
      width: attrs.width ? String(attrs.width) : "",
      className: attrs.className ?? "",
      style: attrs.style ?? "",
      figureClassName: attrs.figureClassName ?? "",
      figureStyle: attrs.figureStyle ?? "",
      href: attrs.href ?? "",
      external: attrs.openInNewTab,
      caption: attrs.caption ?? "",
      alt: attrs.alt ?? "",
      asFigure: attrs.asFigure,
    },
  });

  const asFigure = watch("asFigure");

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      reset({
        width: attrs.width ? String(attrs.width) : "",
        className: attrs.className ?? "",
        style: attrs.style ?? "",
        figureClassName: attrs.figureClassName ?? "",
        figureStyle: attrs.figureStyle ?? "",
        href: attrs.href ?? "",
        external: attrs.openInNewTab,
        caption: attrs.caption ?? "",
        alt: attrs.alt ?? "",
        asFigure: attrs.asFigure,
      });
    }
  };

  const onSubmit = (values: ImageConfigValues) => {
    onSave({
      width: values.width ? Number.parseInt(values.width, 10) : null,
      imgClass: values.className || null,
      imgStyle: values.style || null,
      figureClass: values.figureClassName || null,
      figureStyle: values.figureStyle || null,
      href: values.href || null,
      openInNewTab: values.external,
      caption: values.caption || null,
      alt: values.alt || null,
      asFigure: values.asFigure,
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
          side="right"
          sideOffset={8}
          alignOffset={0}
          collisionPadding={24}
        >
          <Popover.Popup className="max-w-[min(calc(100%-48px),--spacing(96))] w-full dropdown p-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <span className="block font-bold mb-4">Configurar Imagem</span>

              <Controller
                control={control}
                name="asFigure"
                render={({ field }) => (
                  <label
                    htmlFor="image-as-figure"
                    className="mb-4 flex items-center gap-3 select-none cursor-pointer group"
                  >
                    <Checkbox.Root
                      id="image-as-figure"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className={clsx(
                        "shrink-0 form-control inline-flex p-0 size-6.25 items-center justify-center transition-all duration-150",
                        field.value ? "bg-yellow-500" : "bg-white/10",
                      )}
                    >
                      <Checkbox.Indicator className="inline-flex items-center justify-center pointer-events-none text-black">
                        <CheckIcon size={16} weight="bold" />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <span className="font-medium text-white/60">
                      Envolver em &lt;figure&gt; (permite legenda e estilo do
                      wrapper)
                    </span>
                  </label>
                )}
              />

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
                  placeholder="ex: rounded-xl shadow-lg float-left"
                  type="text"
                />
                <FloatingInput.Label>Classe(s) da imagem</FloatingInput.Label>
              </FloatingInput.Group>

              <FloatingInput.Group className="mb-3">
                <FloatingInput.Input
                  {...register("style")}
                  className="w-full"
                  placeholder="ex: border-radius: 12px;"
                  type="text"
                />
                <FloatingInput.Label>Estilo da imagem</FloatingInput.Label>
              </FloatingInput.Group>

              {asFigure ? (
                <>
                  <FloatingInput.Group className="mb-3">
                    <FloatingInput.Input
                      {...register("figureClassName")}
                      className="w-full"
                      placeholder="ex: mx-auto"
                      type="text"
                    />
                    <FloatingInput.Label>
                      Classe(s) do wrapper (figure)
                    </FloatingInput.Label>
                  </FloatingInput.Group>

                  <FloatingInput.Group className="mb-3">
                    <FloatingInput.Input
                      {...register("figureStyle")}
                      className="w-full"
                      placeholder="ex: margin-inline: auto;"
                      type="text"
                    />
                    <FloatingInput.Label>Estilo do wrapper</FloatingInput.Label>
                  </FloatingInput.Group>

                  <FloatingInput.Group className="mb-3">
                    <FloatingInput.Input
                      {...register("caption")}
                      className="w-full"
                      placeholder="Legenda da imagem"
                      type="text"
                    />
                    <FloatingInput.Label>Legenda</FloatingInput.Label>
                  </FloatingInput.Group>
                </>
              ) : (
                <p className="text-xs text-white/40 mb-3">
                  Sem o wrapper, legenda e estilo do wrapper ficam indisponíveis
                  — use as classes/estilo da imagem acima.
                </p>
              )}

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
                      className={clsx(
                        "shrink-0 form-control inline-flex p-0 size-6.25 items-center justify-center transition-all duration-150",
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
