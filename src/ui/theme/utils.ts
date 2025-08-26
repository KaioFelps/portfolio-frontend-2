import {
  THEMES,
  type ThemeOption,
  type ThemeOptionWithoutSystem,
} from "@/ui/theme";

export const availableThemes: ThemeOption[] = [
  THEMES.dark,
  THEMES.light,
  THEMES.system,
];

export function getThemeCookie(
  cookieKey: string,
  cookieString: string,
): ThemeOption {
  const cookies: Map<string, string> = new Map();

  for (const cookie of cookieString.split("; ")) {
    const [key, ..._value] = cookie.split("=");
    const value = _value.join("=");
    cookies.set(key, value);
  }

  const theme = cookies.get(cookieKey);

  if (!theme) return THEMES.system;

  if (!availableThemes.includes(theme as ThemeOption)) return THEMES.system;
  return theme as ThemeOption;
}

export function saveThemeCookieClientSide(cookieKey: string, theme: string) {
  document.cookie = `${cookieKey}=${theme}; path=/; SameSite=lax`;
}

export function getLeftThemes(currentTheme: ThemeOption): ThemeOption[] {
  return availableThemes.filter((theme) => theme !== currentTheme);
}

export function resolveThemeIntoLightOrDark(
  theme: ThemeOption | undefined,
  preferredTheme: ThemeOption | undefined,
): ThemeOptionWithoutSystem {
  if (theme === THEMES.dark) return "dark";
  if (theme === THEMES.light) return "light";
  return preferredTheme === "dark" ? "dark" : "light";
}
