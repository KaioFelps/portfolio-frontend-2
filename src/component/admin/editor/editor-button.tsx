"use client";

import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";

export interface EditorButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const EditorButton = forwardRef<HTMLButtonElement, EditorButtonProps>(
  ({ children, className, active = false, type = "button", ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        {...rest}
        className={clsx(
          "p-2 rounded-md bg-d-gray-300 leading-none cursor-default transition-all",
          "focus-visible:ring-4 ring-yellow-500/40 ring-0 outline-none",
          !active && "hover:bg-gray-600 active:scale-95",
          active && "bg-white/1 text-white/60 ring-1 ring-white/10",
          className,
        )}
      >
        {children}
      </button>
    );
  },
);

EditorButton.displayName = "EditorButton";
