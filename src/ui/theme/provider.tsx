"use client";

import { useEffect, useState, type PropsWithChildren } from "react";
import { ThemeContext, type ThemeOptions } from ".";
import { getThemeCookie } from "@/utils/theme";

type ThemeProviderProps = PropsWithChildren<{
  themeCookieKey: string;
}>;

const themeFromHtmlOrDefault = (): ThemeOptions => {
  if (typeof window === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

export function ThemeProvider({
  children,
  themeCookieKey,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeOptions>(themeFromHtmlOrDefault());

  useEffect(() => {
    const theme =
      getThemeCookie(themeCookieKey, document.cookie) ??
      themeFromHtmlOrDefault();

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
