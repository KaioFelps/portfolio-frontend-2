"use client";

import { createContext } from "react";

export const THEMES = Object.freeze({
  dark: "dark",
  light: "light",
});

export type ThemeOptions = keyof typeof THEMES;

interface IThemeContext {
  theme: ThemeOptions | null;
  toggleTheme(): void;
}
export const ThemeContext = createContext<IThemeContext>({
  theme: null,
  toggleTheme() {
    throw new Error(
      "Não foi encontrado nenhum provider para o `ThemeContext`.",
    );
  },
});
