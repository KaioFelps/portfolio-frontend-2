import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { ReactQueryProvider } from "@/lib/react-query/provider";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider>
      <div id="admin-styles">{children}</div>
    </ReactQueryProvider>
  );
}
