import clsx from "clsx";
import type { PropsWithChildren } from "react";
import noisePattern from "@/assets/noise-pattern.svg";
import type { PropsWithClassName } from "@/core/types/props";
import AuthProvider from "@/lib/zustand-stores/auth/provider";
import { AdminSidebar } from "@/ui/admin/sidebar";

type Props = PropsWithChildren;

export default function AuthorizedAdminLayout({ children }: Props) {
  return (
    <AuthProvider>
      <div
        id="background-blobs"
        className="fixed inset-0 -z-10 bg-d-backgrond from-yellow-700/50 to-d-backgrond pointer-events-none"
      >
        <BgBlob className="-left-[40%] -top-[60%]" />
        <BgBlob className="-right-[40%] -bottom-[60%]" />
        <div
          style={{
            background: `url(${noisePattern.src}) repeat center center`,
          }}
          className="pointer-events-none fixed inset-0 mix-blend-overlay"
        />
      </div>

      <AdminSidebar />

      <div className="fixed right-0 inset-y-0 max-w-[calc(100%_-_300px)] w-full text-white">
        <main
          className={clsx(
            "absolute overflow-y-auto my-12 max-h-[calc(100%_-_96px)] left-1/2 -translate-x-1/2 w-[calc(100%_-_160px)]",
            "max-w-screen-main rounded-3xl px-[42px] py-12 bg-d-gray-100/50 border border-white/10 backdrop-blur-3xl",
            "shadow-black/25 shadow-[0_4px_25px_0_var(--tw-shadow-color)]",
          )}
        >
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}

function BgBlob({ className }: PropsWithClassName) {
  return (
    <div
      style={{
        background:
          "radial-gradient(circle at center, #ff9e28 0, transparent 60%)",
        filter: "contrast(120%) brightness(100%) blur(150px)",
      }}
      className={clsx(
        "w-[1200] h-[1200] absolute pointer-events-none",
        className,
      )}
    />
  );
}
