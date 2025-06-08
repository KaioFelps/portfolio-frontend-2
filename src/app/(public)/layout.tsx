import { Footer } from "@/ui/footer";
import { Header } from "@/ui/header";
import { ThemeProvider } from "@/ui/theme/provider";
import type { PropsWithChildren } from "react";

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <div className="flex-1 flex flex-col">
        <Header />
        {/* <MobileHeader /> */}
        {children}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
