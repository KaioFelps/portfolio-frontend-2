import { CaretLeftIcon } from "@phosphor-icons/react/dist/csr/CaretLeft";
import { CaretRightIcon } from "@phosphor-icons/react/dist/csr/CaretRight";
import Link from "next/link";

type Props = {
  kind: "first" | "last";
  href: string;
};

export function PaginationOuterItem({ kind, href }: Props) {
  const I = kind === "first" ? CaretLeftIcon : CaretRightIcon;
  return (
    <Link
      href={href}
      className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 active:bg-white/15 transition-all duration-100 will-change-[color]"
    >
      <I size="20" weight="bold" />
    </Link>
  );
}
