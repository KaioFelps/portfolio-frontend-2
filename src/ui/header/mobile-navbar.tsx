"use client";

import { Dialog } from "@base-ui/react/dialog";
import { ListIcon } from "@phosphor-icons/react/dist/csr/List";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { NAVBAR_LINKS } from ".";

export function MobileNavBar() {
  const [open, onOpenChange] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger className="trigger-icon-button flex items-center justify-center sm:hidden">
        <ListIcon size={24} weight="bold" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop
          className={clsx(
            "fixed inset-0 z-50 bg-black/10 backdrop-blur-sm",
            "transition-opacity duration-300",
            "data-ending-style:opacity-0 data-starting-style:opacity-0",
          )}
        />
        <Dialog.Popup
          className={clsx(
            "fixed right-0 top-0 z-50 flex h-dvh w-full max-w-125 flex-col",
            "shadow-popover outline-none border-l border-white/5 rounded-l-2xl",
            "not-dark:bg-backgrond/80 dark:bg-d-backgrond/80 backdrop-blur-md p-6 overflow-y-scroll",
            "transition-transform duration-300 ease-out",
            "data-starting-style:translate-x-full data-ending-style:translate-x-full",
          )}
        >
          <header className="pb-4 border-b mb-6 not-dark:border-gray-300 dark:border-d-gray-300 flex items-center justify-between gap-3 shrink-0">
            <Dialog.Title
              render={(props) => <h1 {...props} />}
              className="font-bold text-3xl"
            >
              Menu
            </Dialog.Title>
            <Dialog.Close
              autoFocus={false}
              aria-label="Fechar"
              className="trigger-icon-button flex items-center justify-center"
            >
              <XIcon size={24} weight="bold" />
            </Dialog.Close>
          </header>

          <div className="flex-1 flex flex-col gap-2">
            {NAVBAR_LINKS.map(({ href, label }) => (
              <Dialog.Close
                nativeButton={false}
                render={(props) => (
                  <Link
                    {...props}
                    role="link"
                    key={`mobile-navbar-item-for-${label}`}
                    href={href}
                    className={clsx(
                      "w-full px-6 py-4 rounded-2xl text-lg font-bold bg-yellow-500/10",
                    )}
                  >
                    {label}
                  </Link>
                )}
              >
                {label}
              </Dialog.Close>
            ))}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
