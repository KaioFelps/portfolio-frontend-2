import "./globals.css";

import { ProgressBar } from "@/ui/progress-bar";
import type { Metadata, Viewport } from "next";
import { ServerEnv } from "@/config/env";
import { cookies } from "next/headers";
import type { ThemeOptions } from "@/ui/theme";

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
    <html lang="pt-BR" className={themeCookie === "dark" ? "dark" : undefined}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ProgressBar>{children}</ProgressBar>
      </body>
    </html>
  );
}
