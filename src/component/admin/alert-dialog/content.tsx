import { AlertDialog } from "@base-ui/react";
import clsx from "clsx";
import type { MouseEventHandler } from "react";

type Props = AlertDialog.Popup.Props & {
  onClickOnOverlay?: MouseEventHandler;
};

export function AlertDialogContent({
  onClickOnOverlay,
  children,
  className,
  ...rest
}: Props) {
  return (
    <AlertDialog.Portal>
      <AlertDialog.Backdrop
        onClick={onClickOnOverlay}
        className={clsx(
          "fixed inset-0 z-50 bg-black/20 backdrop-blur-sm",
          "transition-opacity duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0",
        )}
      />
      <AlertDialog.Popup
        className={clsx(
          "fixed left-[50%] top-[50%] z-50 -translate-x-1/2 -translate-y-1/2",
          "shadow-popover outline-none border border-white/5 rounded-2xl p-6 bg-d-backgrond/80 backdrop-blur-md",
          "w-full max-w-[94%] sm:max-w-lg md:w-full",
          "transition-all duration-200 data-starting-style:opacity-0",
          "data-starting-style:scale-95 data-ending-style:opacity-0",
          "data-ending-style:scale-95",
          className && className,
        )}
        {...rest}
      >
        {children}
      </AlertDialog.Popup>
    </AlertDialog.Portal>
  );
}
