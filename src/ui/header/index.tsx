import Link from "next/link";
import LogoDark from "@/assets/logo-dark-mode.svg";
import Logo from "@/assets/logo-white-mode.svg";
import { ThemeToggle } from "../theme/toggle";
import { DesktopNavBar } from "./desktop-navbar";
import { MobileNavBar } from "./mobile-navbar";

export const NAVBAR_LINKS = [
  { href: "/", label: "Home" },
  { href: "/sobre", label: "Sobre mim" },
  { href: "/blog", label: "Blog" },
  { href: "/projetos", label: "Projetos" },
] as const;

export function Header() {
  return (
    <header className="h-30 flex gap-6 px-6 max-xs:hidden mb-20 shrink-0">
      <Link
        href="/"
        className="flex-1 flex justify-start items-center hover:bg-transparent active:bg-transparent"
      >
        <img className="dark:hidden w-42.5" src={Logo.src} alt="Kaio Felps" />
        <img
          className="hidden dark:inline-block w-42.5"
          src={LogoDark.src}
          alt="Kaio Felps"
        />
      </Link>

      <DesktopNavBar />

      <div className="flex-1 flex items-center justify-end gap-2">
        <ThemeToggle />
        <MobileNavBar />
      </div>
    </header>
  );
}
