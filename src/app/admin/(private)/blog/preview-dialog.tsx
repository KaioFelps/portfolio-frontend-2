"use client";

import { Dialog } from "@base-ui/react";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import clsx from "clsx";
import { useState } from "react";
import { useKatex } from "@/core/hooks/use-katex";
import { StarryNightSingleton } from "@/lib/starry-night";

interface HtmlPreviewProps {
  html: string;
}

export function BlogPostPreviewDialog({ html }: HtmlPreviewProps) {
  const [open, setOpen] = useState(false);

  const handleRef = (node: HTMLDivElement | null) => {
    if (!node) return;

    useKatex.renderMath(node);
    StarryNightSingleton.clientSideHighlight(
      Array.from(node.querySelectorAll("pre code")),
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="btn ghost btn-sm">Preview</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop
          className={clsx(
            "fixed inset-0 z-50 bg-black/10 backdrop-blur-sm",
            "transition-opacity duration-150",
            "data-starting-style:opacity-0 data-ending-style:opacity-0",
          )}
        />

        <Dialog.Popup
          className={clsx(
            "dark fixed left-[50%] top-[50%] z-50 -translate-x-1/2 -translate-y-1/2",
            "shadow-popover outline-none border border-white/5 rounded-2xl p-6 bg-d-backgrond/80 backdrop-blur-md",
            "w-main max-w-[calc(100%-48px)] max-h-[calc(100vh-72px)] overflow-y-scroll",
            "transition-all duration-200",
            "data-starting-style:opacity-0 data-starting-style:scale-95",
            "data-ending-style:opacity-0 data-ending-style:scale-95",
          )}
        >
          <header className="pb-4 border-b mb-6 border-d-gray-300 text-d-gray-800 flex items-center justify-between">
            <Dialog.Title className="font-bold text-5xl">
              Preview do post
            </Dialog.Title>

            <Dialog.Close
              className={clsx(
                "cursor-default p-3 rounded-full bg-transparent dark:bg-white/5 hover:bg-black/5",
                "dark:hover:bg-white/10 active:brightness-95 outline-none ring-0",
                "dark:ring-white/15 ring-black/15 focus:ring-4 transition-all",
              )}
            >
              <XIcon size={20} weight="bold" />
            </Dialog.Close>
          </header>

          <div
            className="text-container"
            ref={handleRef}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
