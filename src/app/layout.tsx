import "./globals.css";

import { ProgressBar } from "@/ui/progress-bar";
import type { Metadata, Viewport } from "next";
import { ServerEnv } from "@/config/env";
import { cookies } from "next/headers";
import type { ThemeOptions } from "@/ui/theme";
import { Roboto } from "next/font/google";
import clsx from "clsx";

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
  const themeCookie = _cookies.get(ServerEnv.themeCookieKey)?.value as
    | ThemeOptions
    | undefined;

  return (
    <html
      lang="pt-BR"
      className={clsx(robot.className, themeCookie === "dark" && "dark")}
    >
      <body>
        <ProgressBar>{children}</ProgressBar>
      </body>
    </html>
  );
}
