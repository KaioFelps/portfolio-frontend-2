"use client";

import { BookIcon } from "@phosphor-icons/react/dist/ssr/Book";
import { BriefcaseIcon } from "@phosphor-icons/react/dist/ssr/Briefcase";
import { TagIcon } from "@phosphor-icons/react/dist/ssr/Tag";
import { UserIcon } from "@phosphor-icons/react/dist/ssr/User";
import { Section } from "./section";

export function AdminSidebarDynamicMenu() {
  return (
    <>
      <Section
        title="Portfólio"
        icon={BriefcaseIcon}
        items={[
          {
            href: "/admin/projetos",
            label: "Lista de projetos",
          },
          {
            href: "/admin/projetos/novo",
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
            href: "/admin/tags",
            label: "Tags existentes",
          },
          {
            href: "/admin/tags/novo",
            label: "Criar tag",
          },
        ]}
      />
    </>
  );
}
