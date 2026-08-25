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
          "p-2 rounded-md bg-white/10 leading-none cursor-default transition-all",
          !active && "hover:bg-white/15 active:bg-white/20",
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
