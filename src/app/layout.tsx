import "./globals.css";

import clsx from "clsx";
import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { cookies } from "next/headers";
import { ServerEnv } from "@/config/env";
import { ProgressBar } from "@/ui/progress-bar";
import {
  PREFERRED_THEME_COOKIE_KEY,
  THEME_COOKIE_KEY,
  type ThemeOption,
} from "@/ui/theme";
import { resolveThemeIntoLightOrDark } from "@/ui/theme/utils";

export const metadata: Metadata = {
  title: ServerEnv.appName,
  description:
    "Programador; Desenvolvedor, Analista ou Engenheiro de software; Cientista da Computação. Alguma coisa do gênero.",
  openGraph: {
    locale: "pt_BR",
    type: "website",
    siteName: ServerEnv.appName,
  },
  applicationName: ServerEnv.appName,
  metadataBase: new URL(ServerEnv.appUrl),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFC700",
};

const robot = Roboto({
  preload: true,
  subsets: ["latin", "math", "symbols"],
  style: ["italic", "normal"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "block",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const _cookies = await cookies();
  const themeFromCookies = _cookies.get(THEME_COOKIE_KEY)?.value as
    | ThemeOption
    | undefined;

  const preferredThemeFromCookies = _cookies.get(PREFERRED_THEME_COOKIE_KEY)
    ?.value as ThemeOption | undefined;

  const themeClass = resolveThemeIntoLightOrDark(
    themeFromCookies,
    preferredThemeFromCookies,
  );

  return (
    <html
      lang="pt-BR"
      className={clsx(robot.className, themeClass === "dark" && "dark")}
    >
      <body>
        <ProgressBar>{children}</ProgressBar>
      </body>
    </html>
  );
}
