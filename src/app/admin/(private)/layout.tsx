import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr/ArrowSquareOut";
import { HouseIcon } from "@phosphor-icons/react/dist/ssr/House";
import clsx from "clsx";
import type { PropsWithChildren } from "react";
import logo from "@/assets/logo-dark-mode.svg";
import noisePattern from "@/assets/noise-pattern.svg";
import type { PropsWithClassName } from "@/core/types/props";
import { AdminSidebarDynamicMenu } from "@/ui/admin/sidebar";

type Props = PropsWithChildren;

export default function AuthorizedAdminLayout({ children }: Props) {
  return (
    <>
      <div
        id="background-blobs"
        className="fixed inset-0 -z-10 bg-d-backgrond from-yellow-700/50 to-d-backgrond pointer-events-none"
      >
        <BgBlob className="-left-[40%] -top-[60%]" />
        <BgBlob className="-right-[40%] -bottom-[60%]" />
        mix-blend-mode: overlay;
        <div
          style={{
            background: `url(${noisePattern.src}) repeat center center`,
          }}
          className="pointer-events-none fixed inset-0 mix-blend-overlay"
        ></div>
      </div>

      <aside
        className="from-d-backgrond absolute inset-y-0 left-0 w-[304px] border-r border-white/5 backdrop-blur-3xl"
        style={{
          background: `linear-gradient(rgba(16, 15, 19, 0.75), rgba(16, 15, 19, 0.75)),
			linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
			linear-gradient(rgba(62, 64, 79, 0.4), rgba(62, 64, 79, 0.4)),
			url("/src/assets/noise-pattern.svg") repeat center center`,
        }}
      >
        <header>
          <h1 className="px-6 py-4 border-b border-b-white/10">
            <span className="sr-only">Kaio Felipe Website Housekeeping</span>
            <img src={logo.src} alt="Kaio Felps" className="w-[170px]" />
          </h1>
        </header>
        <nav>
          <a
            href="/admin"
            className="px-6 py-4 border-b border-white/10 flex items-center gap-3 font-bold text-base text-white hover:bg-black/10 hover:text-white/80 cursor-default active:text-white/70 transition-all duration-100"
          >
            <span className="text-yellow-500">
              <HouseIcon size="20" weight="bold" />
            </span>{" "}
            Home
          </a>
          <AdminSidebarDynamicMenu />
          <a
            href="/admin/logout"
            className="px-6 py-4 border-b border-white/10 flex items-center gap-3 font-bold text-base text-white hover:bg-black/10 hover:text-white/80 cursor-default active:text-white/70 transition-all duration-100"
          >
            <span className="text-yellow-500">
              <ArrowSquareOutIcon size="20" weight="bold" />
            </span>{" "}
            Deslogar
          </a>
        </nav>
      </aside>

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
    </>
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
