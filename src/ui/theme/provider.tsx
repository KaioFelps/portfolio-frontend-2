"use client";

import {
  type PropsWithChildren,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import {
  PREFERRED_THEME_COOKIE_KEY,
  THEME_COOKIE_KEY,
  THEME_STATE_MACHINE,
  type ThemeOption,
  type ThemeOptionWithoutSystem,
} from ".";
import { ThemeContext } from "./context";
import {
  getThemeCookie,
  resolveThemeIntoLightOrDark,
  saveThemeCookieClientSide,
} from "./utils";

type ThemeProviderProps = PropsWithChildren;

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeOption | null>(null);
  const [actualTheme, setActualTheme] =
    useState<ThemeOptionWithoutSystem | null>(null);

  function exposeTheme(theme: ThemeOptionWithoutSystem | null) {
    if (!theme) return;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  const updateTheme = useEffectEvent(
    (theme: ThemeOption | null, systemPreferedTheme: ThemeOption) => {
      const resolvedTheme = resolveThemeIntoLightOrDark(
        theme ?? undefined,
        systemPreferedTheme,
      );

      setActualTheme(resolvedTheme);
      exposeTheme(resolvedTheme);
    },
  );

  useEffect(() => {
    const theme = getThemeCookie(THEME_COOKIE_KEY, document.cookie);
    const prefersColorScheme = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    const cb = (e: MediaQueryListEvent | MediaQueryList) => {
      const newPreferredTheme: ThemeOption = e.matches ? "dark" : "light";
      saveThemeCookieClientSide(PREFERRED_THEME_COOKIE_KEY, newPreferredTheme);
      updateTheme(theme, newPreferredTheme);
    };

    setTheme(theme);
    cb(prefersColorScheme);

    saveThemeCookieClientSide(
      PREFERRED_THEME_COOKIE_KEY,
      prefersColorScheme.matches ? "dark" : "light",
    );

    prefersColorScheme.addEventListener("change", cb);

    return () => {
      prefersColorScheme.removeEventListener("change", cb);
    };
  }, []);

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

          updateTheme(newTheme, preferredTheme);
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
