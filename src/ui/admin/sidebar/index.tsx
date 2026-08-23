"use client";

import { BookIcon } from "@phosphor-icons/react/dist/ssr/Book";
import { BriefcaseIcon } from "@phosphor-icons/react/dist/ssr/Briefcase";
import { HouseIcon } from "@phosphor-icons/react/dist/ssr/House";
import { TagIcon } from "@phosphor-icons/react/dist/ssr/Tag";
import { UserIcon } from "@phosphor-icons/react/dist/ssr/User";
import Link from "next/link";
import { AdminRoutes } from "@/app/routes";
import logo from "@/assets/logo-dark-mode.svg";
import { LogoutSidebarItem } from "./logout-item";
import { Section } from "./section";

export function AdminSidebar() {
  return (
    <aside
      className="from-d-backgrond absolute inset-y-0 left-0 w-76 border-r border-white/5 backdrop-blur-3xl"
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
          <img src={logo.src} alt="Kaio Felps" className="w-42.5" />
        </h1>
      </header>
      <nav>
        <Link
          href="/admin"
          className="px-6 py-4 border-b border-white/10 flex items-center gap-3 font-bold text-base text-white hover:bg-black/10 hover:text-white/80 cursor-default active:text-white/70 transition-all duration-100"
        >
          <span className="text-yellow-500">
            <HouseIcon size="20" weight="bold" />
          </span>
          Home
        </Link>
        <Section
          title="Portfólio"
          icon={BriefcaseIcon}
          items={[
            {
              href: AdminRoutes.projects.manage,
              label: "Lista de projetos",
            },
            {
              href: AdminRoutes.projects.new,
              label: "Novo projeto",
            },
          ]}
        />

        <Section
          title="Blog"
          icon={BookIcon}
          items={[
            {
              href: "/admin/blog",
              label: "Lista de posts",
            },
            {
              href: "/admin/blog/novo",
              label: "Novo post",
            },
          ]}
        />

        <Section
          title="Usuários"
          icon={UserIcon}
          items={[
            {
              href: "/admin/users",
              label: "Lista de usuários",
            },
            {
              href: "/admin/users/novo",
              label: "Novo usuário",
              requiresAdmin: true,
            },
          ]}
        />

        <Section
          title="Tags"
          icon={TagIcon}
          items={[
            {
              href: AdminRoutes.tags.manage,
              label: "Tags existentes",
            },
            {
              href: AdminRoutes.tags.new,
              label: "Criar tag",
            },
          ]}
        />
        <LogoutSidebarItem />
      </nav>
    </aside>
  );
}
