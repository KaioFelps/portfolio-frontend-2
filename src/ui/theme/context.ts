"use client";

import { createContext } from "react";
import type { ThemeOption, ThemeOptionWithoutSystem } from ".";

interface IThemeContext {
  theme: ThemeOption | null;
  actualTheme: ThemeOptionWithoutSystem | null;
  toggleTheme(): void;
}
export const ThemeContext = createContext<IThemeContext>({
  theme: null,
  actualTheme: null,
  toggleTheme() {
    throw new Error(
      "Não foi encontrado nenhum provider para o `ThemeContext`.",
    );
  },
});
