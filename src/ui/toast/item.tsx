"use client";

import { Toast, type ToastObject } from "@base-ui/react";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import clsx from "clsx";

type Props = ToastObject<object>;

export function ToastItem(toast: Props) {
  return (
    <Toast.Root
      key={toast.id}
      toast={toast}
      className={clsx(
        "[--gap:0.75rem] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))]",
        "[--shrink:calc(1-var(--scale))] [--height:var(--toast-frontmost-height,var(--toast-height))]",
        "[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",
        "absolute right-0 bottom-0 left-auto z-[calc(1000-var(--toast-index))] mr-0 w-full origin-bottom",
        "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]",
        "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
        "data-[ending-style]:opacity-0",
        "data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))]",
        "data-[limited]:opacity-0 data-[starting-style]:[transform:translateY(150%)]",
        "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
        "data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
        "data-[expanded]:data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
        "data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
        "data-[expanded]:data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
        "data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
        "data-[expanded]:data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
        "data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
        "data-[expanded]:data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
        "h-[var(--height)] data-[expanded]:h-[var(--toast-height)]",
        "[transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s]",
        "rounded-lg bg-clip-padding p-4 shadow-lg select-none",
        [
          "data-[type=danger]:bg-red-100 border data-[type=danger]:border-red-200",
          "data-[type=danger]:dark:bg-red-950 data-[type=danger]:dark:border-red-900",
        ],
        [
          "data-[type=default]:bg-gray-100 border data-[type=default]:border-gray-300",
          "data-[type=default]:dark:bg-d-gray-100 data-[type=default]:dark:border-d-gray-300",
        ],
      )}
    >
      <Toast.Content
        className={clsx(
          "overflow-hidden transition-opacity [transition-duration:250ms] data-behind:pointer-events-none",
          "data-[behind]:opacity-0 data-[expanded]:pointer-events-auto data-[expanded]:opacity-100",
        )}
      >
        <Toast.Title className="text-[0.975rem] leading-5 font-medium" />
        <Toast.Description className="text-[0.925rem] leading-5" />
        <Toast.Close
          className={clsx(
            "absolute top-2 right-2 flex h-5 w-5 items-center justify-center",
            "rounded border-none bg-transparent",
          )}
          aria-label="Fechar"
        >
          <XIcon className="h-4 w-4" />
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  );
}
