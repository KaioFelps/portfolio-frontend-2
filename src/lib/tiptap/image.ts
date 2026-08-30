"use client";

import _Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ImageNodeView } from "@/component/admin/editor/image-node-view";

function attrsFromFigure(figure: HTMLElement) {
  const img = figure.querySelector("img");
  if (!img) return false; // sem <img>, não reconhece como imagem

  const anchor = figure.querySelector("a");
  const figcaption = figure.querySelector("figcaption");
  const width = img.getAttribute("width");

  return {
    src: img.getAttribute("src"),
    alt: img.getAttribute("alt"),
    width: width ? Number.parseInt(width, 10) : null,
    imgClass: img.getAttribute("class"),
    imgStyle: img.getAttribute("style"),
    figureClass: figure.getAttribute("class"),
    figureStyle: figure.getAttribute("style"),
    href: anchor?.getAttribute("href") ?? null,
    caption: figcaption?.textContent ?? null,
  };
}

function attrsFromBareImg(img: HTMLElement) {
  const width = img.getAttribute("width");

  return {
    src: img.getAttribute("src"),
    alt: img.getAttribute("alt"),
    width: width ? Number.parseInt(width, 10) : null,
    imgClass: img.getAttribute("class"),
    imgStyle: img.getAttribute("style"),
    figureClass: null,
    figureStyle: null,
    href: img.closest("a")?.getAttribute("href") ?? null,
    caption: null,
  };
}

const Image = _Image.extend({
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      width: { default: null }, // vira o atributo HTML `width` no <img>, nunca style
      imgClass: { default: null },
      imgStyle: { default: null },
      figureClass: { default: null },
      figureStyle: { default: null },
      href: { default: null },
      caption: { default: null },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure[data-type='image']",
        getAttrs: (dom) => attrsFromFigure(dom as HTMLElement),
      },
      {
        tag: "img",
        getAttrs: (dom) => {
          const el = dom as HTMLElement;
          if (el.closest("figure[data-type='image']")) return false;
          return attrsFromBareImg(el);
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
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
    } = HTMLAttributes;

    const img = [
      "img",
      {
        src,
        alt,
        width: width || null,
        class: imgClass || null,
        style: imgStyle || null,
      },
    ];

    const body = href
      ? ["a", { href, target: "_blank", rel: "noopener noreferrer" }, img]
      : img;

    return [
      "figure",
      {
        "data-type": "image",
        class: figureClass || null,
        style: figureStyle || null,
      },
      body,
      caption ? ["figcaption", {}, caption] : "",
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
});

export default Image;
