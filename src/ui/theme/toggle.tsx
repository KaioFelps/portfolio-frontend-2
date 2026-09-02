"use client";

import { LaptopIcon } from "@phosphor-icons/react/dist/ssr/Laptop";
import { MoonStarsIcon } from "@phosphor-icons/react/dist/ssr/MoonStars";
import { SpinnerIcon } from "@phosphor-icons/react/dist/ssr/Spinner";
import { SunIcon } from "@phosphor-icons/react/dist/ssr/Sun";
import { type PropsWithChildren, useContext } from "react";
import { ThemeContext } from "./context";

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button type="button" onClick={toggleTheme} className="trigger-icon-button">
      {theme === "dark" ? (
        <IconWrapper>
          <MoonStarsIcon size={24} weight="bold" />
        </IconWrapper>
      ) : theme === "light" ? (
        <IconWrapper>
          <SunIcon size={24} weight="bold" />
        </IconWrapper>
      ) : theme === "system" ? (
        <IconWrapper>
          <LaptopIcon size={24} weight="bold" />
        </IconWrapper>
      ) : (
        <IconWrapper>
          <SpinnerIcon size={24} weight="bold" className="animate-spin" />
        </IconWrapper>
      )}
    </button>
  );
}

function IconWrapper({ children }: PropsWithChildren) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {children}
    </div>
  );
}
