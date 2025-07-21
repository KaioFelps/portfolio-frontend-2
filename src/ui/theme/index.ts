export const THEME_COOKIE_KEY = "kaio_felps_theme";
export const PREFERRED_THEME_COOKIE_KEY = "kaio_felps_preferred_theme";

export const THEMES = Object.freeze({
  dark: "dark",
  light: "light",
  system: "system",
});

export const THEME_STATE_MACHINE = {
  [THEMES.dark]: THEMES.system,
  [THEMES.system]: THEMES.light,
  [THEMES.light]: THEMES.dark,
};

export type ThemeOption = keyof typeof THEMES;
export type ThemeOptionWithoutSystem = Exclude<ThemeOption, "system">;
