import { Collapsible } from "@base-ui/react";
import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import { MinusIcon } from "@phosphor-icons/react/dist/ssr/Minus";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import clsx from "clsx";
import Link from "next/link";
import { memo } from "react";
import { useAuth } from "@/lib/zustand-stores/auth";
import { CollapsibleContent } from "./content";

type Item = {
  label: string;
  href: string;
  requiresAdmin?: boolean;
};

type Props = {
  icon: Icon;
  title: string;
  items: Item[];
};

export const Section = memo(({ icon: I, title, items }: Props) => {
  const isAdmin = useAuth((state) => state.userIsAdmin());

  return (
    <Collapsible.Root>
      <Collapsible.Trigger
        className={clsx(
          "group w-full px-6 py-4 border-b border-white/10",
          "flex items-center justify-between font-bold text-base text-white",
          "data-open:bg-black/15 transition-all duration-100 will-change-[background]",
          "hover:bg-black/10 active:bg-black/20 cursor-default",
        )}
      >
        <span className="flex items-center gap-3">
          <span className="text-yellow-500">
            <I size="20" weight="bold" />
          </span>
          {title}
        </span>
        <span className="text-yellow-500 group-data-panel-open:hidden">
          <PlusIcon size="20" weight="bold" />
        </span>
        <span className="text-yellow-500 group-not-data-panel-open:hidden">
          <MinusIcon size="20" weight="bold" />
        </span>
      </Collapsible.Trigger>
      <CollapsibleContent>
        {items.map(({ href, label, requiresAdmin }) => {
          if (requiresAdmin && !isAdmin) return null;

          return (
            <Link
              key={`admin-sidebar-${title}-section-${label}-link`}
              className={clsx(
                "pl-14 pr-6 py-4 border-b border-white/10 font-bold text-base text-white",
                "hover:bg-black/10 hover:text-white/80 cursor-default active:text-white/70",
                "transition-all duration-100",
              )}
              href={href}
            >
              {label}
            </Link>
          );
        })}
      </CollapsibleContent>
    </Collapsible.Root>
  );
});
