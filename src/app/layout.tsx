import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { PublicEnv } from "@/config/env/public";
import { ProgressBar } from "@/ui/progress-bar";
import { PREFERRED_THEME_COOKIE_KEY, THEME_COOKIE_KEY } from "@/ui/theme";
import { ToastProvider } from "@/ui/toast";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: PublicEnv.appName,
    description:
      "Programador; Desenvolvedor, Analista ou Engenheiro de software; Cientista da Computação. Alguma coisa do gênero.",
    openGraph: {
      locale: "pt_BR",
      type: "website",
      siteName: PublicEnv.appName,
    },
    applicationName: PublicEnv.appName,
    metadataBase: new URL(PublicEnv.appUrl),
  };
}

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

const themeScript = `
(function () {
  try {
    var cookies = document.cookie.split("; ").reduce(function (acc, c) {
      var idx = c.indexOf("=");
      acc[c.slice(0, idx)] = c.slice(idx + 1);
      return acc;
    }, {});
    var theme = cookies["${THEME_COOKIE_KEY}"] || cookies["${PREFERRED_THEME_COOKIE_KEY}"];
    var isDark = theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (isDark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={robot.className}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ToastProvider>
          <ProgressBar>{children}</ProgressBar>
        </ToastProvider>
      </body>
    </html>
  );
}
