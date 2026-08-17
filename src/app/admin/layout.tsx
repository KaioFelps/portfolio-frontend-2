import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: PropsWithChildren) {
  return <div id="admin-styles">{children}</div>;
}
