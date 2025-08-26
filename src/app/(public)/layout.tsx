import type { PropsWithChildren } from "react";
import { ServerEnv } from "@/config/env";
import { Footer } from "@/ui/footer";
import { Header } from "@/ui/header";
import { ThemeProvider } from "@/ui/theme/provider";

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider themeCookieKey={ServerEnv.themeCookieKey}>
      <div className="flex-1 flex flex-col">
        <Header />
        {/* <MobileHeader /> */}
        {children}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
