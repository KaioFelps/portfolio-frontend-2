import LogoDark from "@/assets/logo-dark-mode.svg";
import Logo from "@/assets/logo-white-mode.svg";
import { ThemeToggle } from "../theme/toggle";
import { NavItem } from "./nav-item";

export function Header() {
  return (
    <header className="h-[120px] flex gap-6 px-6 max-xs:hidden mb-20 shrink-0">
      <a
        href="/"
        className="flex-1 flex justify-start items-center max-sm:hidden hover:bg-transparent active:bg-transparent"
      >
        <img
          className="dark:hidden w-[170px]"
          src={Logo.src}
          alt="Kaio Felps"
        />
        <img
          className="hidden dark:inline-block w-[170px]"
          src={LogoDark.src}
          alt="Kaio Felps"
        />
      </a>

      <nav className=" flex-1 flex flex-row gap-1 self-center justify-center items-center ">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/sobre">Sobre mim</NavItem>
        <NavItem href="/blog">Blog</NavItem>
        <NavItem href="/projetos">Projetos</NavItem>
      </nav>

      <div className="flex-1 flex items-center justify-end">
        <ThemeToggle />
      </div>
    </header>
  );
}
