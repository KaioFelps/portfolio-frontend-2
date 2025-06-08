"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { type PropsWithChildren, useEffect, useState } from "react";

type NavItemProps = PropsWithChildren<{
  href: string;
}>;
export function NavItem({ href, children }: NavItemProps) {
  const currentSegments = useSelectedLayoutSegments();
  const currentPath = usePathname();

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (currentPath === href) return setIsActive(true);

    if (
      currentSegments.length &&
      href.startsWith(`/${currentSegments.join("/")}`)
    )
      return setIsActive(true);

    setIsActive(false);
  }, [currentPath, currentSegments, href]);

  return (
    <Link
      data-active={isActive}
      href={href}
      className={clsx(
        "transition-all leading-none duration-75 text-black font-medium",
        "px-4 pt-2 pb-1.5 border-[transparent] border-b text-nowrap",
        isActive
          ? [
              "dark:text-yellow-600 border-b dark:border-yellow-900 not-dark:border-yellow-500",
              "dark:bg-yellow-900/20 text-yellow-900 font-bold rounded-lg bg-yellow-500/25",
            ]
          : [
              "dark:text-white not-dark:hover:border-yellow-500 dark:hover:border-yellow-900/50 hover:bg-yellow-500/10",
              "rounded-ss-md rounded-se-md",
            ],
      )}
    >
      {children}
    </Link>
  );
}
