"use client";

import "katex/dist/katex.min.css";
import renderMathInElement from "katex/contrib/auto-render";
import { useLayoutEffect, useRef } from "react";

type Args = { content?: string };

export function useKatex({ content }: Args) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!content || !ref.current) return;

    renderMathInElement(ref.current, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true },
      ],
      throwOnError: false,
    });
  }, [content]);

  return { ref };
}
