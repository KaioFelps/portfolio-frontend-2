"use client";

import _Image from "@tiptap/extension-image";
import type { DOMOutputSpec } from "@tiptap/pm/model";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ImageNodeView } from "@/component/admin/editor/image-node-view";

function attrsFromFigure(figure: HTMLElement) {
  const img = figure.querySelector("img");
  if (!img) return false;

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
    openInNewTab: anchor ? anchor.getAttribute("target") === "_blank" : true,
    caption: figcaption?.textContent ?? null,
    asFigure: true,
  };
}

function attrsFromBareImg(img: HTMLElement) {
  const width = img.getAttribute("width");
  const anchor = img.closest("a");

  return {
    src: img.getAttribute("src"),
    alt: img.getAttribute("alt"),
    width: width ? Number.parseInt(width, 10) : null,
    imgClass: img.getAttribute("class"),
    imgStyle: img.getAttribute("style"),
    figureClass: null,
    figureStyle: null,
    href: anchor?.getAttribute("href") ?? null,
    openInNewTab: anchor ? anchor.getAttribute("target") === "_blank" : true,
    caption: null,
    asFigure: false,
  };
}

const Image = _Image.extend({
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      width: { default: null },
      imgClass: { default: null },
      imgStyle: { default: null },
      figureClass: { default: null },
      figureStyle: { default: null },
      href: { default: null },
      openInNewTab: { default: true },
      caption: { default: null },
      asFigure: { default: true },
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
      openInNewTab,
      caption,
      asFigure,
    } = HTMLAttributes;

    const img: DOMOutputSpec = [
      "img",
      {
        src,
        alt,
        width: width || null,
        class: imgClass || null,
        style: imgStyle || null,
      },
    ];

    const body: DOMOutputSpec = href
      ? [
          "a",
          {
            href,
            target: openInNewTab === false ? null : "_blank",
            rel: "noopener noreferrer",
          },
          img,
        ]
      : img;

    if (!asFigure) return body;

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
