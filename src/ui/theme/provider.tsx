"use client";

import { useEffect, useState, type PropsWithChildren } from "react";
import { ThemeContext, type ThemeOptions } from ".";
import { getThemeCookie } from "@/utils/theme";

type ThemeProviderProps = PropsWithChildren<{
  themeCookieKey: string;
}>;

export function ThemeProvider({
  children,
  themeCookieKey,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeOptions | null>(null);

  useEffect(() => {
    const theme = getThemeCookie(themeCookieKey, document.cookie);
    setTheme(theme);
  }, [themeCookieKey]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme() {
          const currentTheme = getThemeCookie(themeCookieKey, document.cookie);
          const newTheme = currentTheme === "dark" ? "light" : "dark";

          document.cookie = `${themeCookieKey}=${newTheme}; path=/; SameSite=lax`;
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
