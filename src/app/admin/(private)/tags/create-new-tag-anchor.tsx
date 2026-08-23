"use client";

import Link from "next/link";
import { AdminRoutes } from "@/app/routes";
import { useAuth } from "@/lib/zustand-stores/auth";

export function CreateNewTagAnchor() {
  const isAdmin = useAuth((state) => state.userIsAdmin());

  if (!isAdmin) return null;

  return (
    <Link href={AdminRoutes.tags.new} className="btn default">
      Adicionar nova tag
    </Link>
  );
}
