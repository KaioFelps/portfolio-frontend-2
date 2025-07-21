"use client";

import { useEffect, useState, type PropsWithChildren } from "react";
import {
  PREFERRED_THEME_COOKIE_KEY,
  THEME_COOKIE_KEY,
  THEME_STATE_MACHINE,
  THEMES,
  type ThemeOption,
} from ".";
import {
  getThemeCookie,
  resolveThemeIntoLightOrDark,
  saveThemeCookieClientSide,
} from "./utils";
import { ThemeContext } from "./context";

type ThemeProviderProps = PropsWithChildren<{
  themeCookieKey: string;
}>;

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeOption | null>(null);
  const [actualTheme, setActualTheme] = useState<Exclude<
    ThemeOption,
    "system"
  > | null>(null);

  useEffect(() => {
    const theme = getThemeCookie(THEME_COOKIE_KEY, document.cookie);
    setTheme(theme);

    const cb = (e: MediaQueryListEvent) => {
      const newPreferredTheme: ThemeOption = e.matches ? "dark" : "light";
      saveThemeCookieClientSide(PREFERRED_THEME_COOKIE_KEY, newPreferredTheme);
      setActualTheme(resolveThemeIntoLightOrDark(theme, newPreferredTheme));
    };

    const prefersColorScheme = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    saveThemeCookieClientSide(
      PREFERRED_THEME_COOKIE_KEY,
      prefersColorScheme.matches ? "dark" : "light",
    );

    prefersColorScheme.addEventListener("change", cb);

    return () => {
      prefersColorScheme.removeEventListener("change", cb);
    };
  }, []);

  useEffect(() => {
    if (!actualTheme) return;

    if (actualTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [actualTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        actualTheme,
        toggleTheme() {
          const currentTheme = getThemeCookie(
            THEME_COOKIE_KEY,
            document.cookie,
          );
          const newTheme = THEME_STATE_MACHINE[currentTheme];

          saveThemeCookieClientSide(THEME_COOKIE_KEY, newTheme);
          setTheme(newTheme);

          const preferredTheme = getThemeCookie(
            PREFERRED_THEME_COOKIE_KEY,
            document.cookie,
          );

          const actualTheme = resolveThemeIntoLightOrDark(
            newTheme,
            preferredTheme,
          );

          setActualTheme(actualTheme);
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
