import { Suspense } from "react";
import { NAVBAR_LINKS } from ".";
import { NavItem, StaticNavItem } from "./nav-item";

export function DesktopNavBar() {
  return (
    <nav className="flex-1 flex flex-row gap-1 self-center justify-center items-center max-sm:hidden">
      <Suspense fallback={<NavFallback />}>
        {NAVBAR_LINKS.map(({ href, label }) => (
          <NavItem key={`desktop-navbar-item-for-${label}`} href={href}>
            {label}
          </NavItem>
        ))}
      </Suspense>
    </nav>
  );
}

function NavFallback() {
  return (
    <>
      {NAVBAR_LINKS.map(({ label, href }) => (
        <StaticNavItem
          key={`desktop-navbar-item-for-${label}-skeletons`}
          href={href}
        >
          {label}
        </StaticNavItem>
      ))}
    </>
  );
}
