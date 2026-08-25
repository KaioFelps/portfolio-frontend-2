import Link from "next/link";
import { Suspense } from "react";
import LogoDark from "@/assets/logo-dark-mode.svg";
import Logo from "@/assets/logo-white-mode.svg";
import { ThemeToggle } from "../theme/toggle";
import { NavItem, StaticNavItem } from "./nav-item";

export function Header() {
  return (
    <header className="h-30 flex gap-6 px-6 max-xs:hidden mb-20 shrink-0">
      <Link
        href="/"
        className="flex-1 flex justify-start items-center max-sm:hidden hover:bg-transparent active:bg-transparent"
      >
        <img className="dark:hidden w-42.5" src={Logo.src} alt="Kaio Felps" />
        <img
          className="hidden dark:inline-block w-42.5"
          src={LogoDark.src}
          alt="Kaio Felps"
        />
      </Link>

      <nav className=" flex-1 flex flex-row gap-1 self-center justify-center items-center ">
        <Suspense fallback={<NavFallback />}>
          <NavItem href="/">Home</NavItem>
          <NavItem href="/sobre">Sobre mim</NavItem>
          <NavItem href="/blog">Blog</NavItem>
          <NavItem href="/projetos">Projetos</NavItem>
        </Suspense>
      </nav>

      <div className="flex-1 flex items-center justify-end">
        <ThemeToggle />
      </div>
    </header>
  );
}

function NavFallback() {
  return (
    <>
      <StaticNavItem href="/">Home</StaticNavItem>
      <StaticNavItem href="/sobre">Sobre mim</StaticNavItem>
      <StaticNavItem href="/blog">Blog</StaticNavItem>
      <StaticNavItem href="/projetos">Projetos</StaticNavItem>
    </>
  );
}
