"use client";

import { useState, type PropsWithChildren } from "react";
import { ThemeContext, type ThemeOptions } from ".";
import { getThemeCookie } from "@/utils/theme";
import { PublicEnv } from "@/config/env";

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<ThemeOptions>("light");

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme() {
          if (!window || !document) return;

          const currentTheme = getThemeCookie(document.cookie);
          const newTheme = currentTheme === "dark" ? "light" : "dark";

          document.cookie = `${PublicEnv.themeCookieKey}=${newTheme}; path=/; SameSite=lax`;
          setTheme(newTheme);

          if (newTheme === "dark") {
            document.documentElement.setAttribute("class", "dark");
          } else {
            document.documentElement.removeAttribute("class");
          }
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
