"use client";

import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr/ArrowSquareOut";
import clsx from "clsx";
import { useLogout } from "../../../app/admin/hooks/use-logout";

export function LogoutSidebarItem() {
  const { isProcessing, logout } = useLogout();

  return (
    <button
      type="button"
      className={clsx(
        "px-6 py-4 border-b border-white/10 flex items-center gap-3 font-bold",
        "text-base text-white hover:bg-black/10 hover:text-white/80 cursor-default",
        "active:text-white/70 transition-all duration-100 w-full",
      )}
      onClick={() => logout()}
      disabled={isProcessing}
    >
      <span className="text-yellow-500">
        <ArrowSquareOutIcon size="20" weight="bold" />
      </span>
      {isProcessing ? "Deslogando" : "Deslogar"}
    </button>
  );
}
