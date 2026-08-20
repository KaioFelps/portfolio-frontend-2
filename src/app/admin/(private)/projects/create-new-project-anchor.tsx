"use client";

import Link from "next/link";
import { useAuth } from "@/lib/zustand-stores/auth";

export function CreateNewProjectAnchor() {
  const isAdmin = useAuth((state) => state.userIsAdmin());

  if (!isAdmin) return null;

  return (
    <Link href="/admin/projetos/novo" className="btn default">
      Adicionar projeto
    </Link>
  );
}
