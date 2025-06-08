import type { ThemeOptions } from "@/ui/theme";

const availableThemes: ThemeOptions[] = ["light", "dark"];

export function getThemeCookie(
  themeCookieKey: string,
  cookieString: string,
): ThemeOptions | null {
  const cookies: Map<string, string> = new Map();

  for (const cookie of cookieString.split("; ")) {
    const [key, ..._value] = cookie.split("=");
    const value = _value.join("=");
    cookies.set(key, value);
  }

  const theme = cookies.get(themeCookieKey);

  if (!theme) return null;

  if (!availableThemes.includes(theme as ThemeOptions)) return null;
  return theme as ThemeOptions;
}
