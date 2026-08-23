"use client";

import { useRouter } from "next/navigation";
import { type PropsWithChildren, useEffect } from "react";
import { AdminRoutes } from "@/app/routes";
import { usePrefetchAuthUser } from "@/core/hooks/prefetch-auth-user";
import { useAuth } from ".";

export default function AuthProvider({ children }: PropsWithChildren) {
  usePrefetchAuthUser();
  const router = useRouter();
  const token = useAuth((s) => s.token);
  const isLoadingAuth = useAuth((s) => s.isLoadingAuth);
  const tick = useAuth((s) => s.authEventTick);

  useEffect(() => {
    tick;

    const couldNotLoadToken = !isLoadingAuth && !token;
    if (couldNotLoadToken) router.push(AdminRoutes.login);
  }, [isLoadingAuth, token, tick, router]);

  return children;
}
