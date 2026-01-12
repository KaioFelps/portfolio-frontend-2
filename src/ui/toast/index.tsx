"use client";

import { Toast } from "@base-ui/react";
import type { PropsWithChildren } from "react";
import toast from "@/lib/toast";
import { ToastItem } from "./item";

type Props = PropsWithChildren;

export function ToastProvider({ children }: Props) {
  return (
    <Toast.Provider toastManager={toast.manager}>
      {children}
      <Toast.Portal>
        <Toast.Viewport className="fixed z-10 top-auto right-[1rem] bottom-[1rem] mx-auto flex w-[250px] sm:right-[2rem] sm:bottom-[2rem] sm:w-[300px]">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function ToastList() {
  const { toasts } = Toast.useToastManager();
  return toasts.map(ToastItem);
}
