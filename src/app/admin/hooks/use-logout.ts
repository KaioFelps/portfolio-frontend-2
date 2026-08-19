import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminRoutes } from "@/app/routes";
import type { ErrorResponse } from "@/core/types/server-response";
import { RQKeys } from "@/lib/react-query";
import toast from "@/lib/toast";
import { useAuth } from "@/lib/zustand-stores/auth";
import authQueries from "@/queries/auth-queries";

// biome-ignore lint/complexity/noBannedTypes: nothing indeed
type HookArgs = {};

export function useLogout(_args: HookArgs = {}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { removeAuth } = useAuth();

  const { mutate: logout } = useMutation<void, ErrorResponse<string>>({
    mutationKey: RQKeys.auth.logout(),
    mutationFn: authQueries.logout,
    onMutate: () => {
      setIsProcessing(true);
    },
    onSettled: () => setIsProcessing(false),
    onError: (error) => toast.danger({ title: error.error }),
    onSuccess: () => {
      removeAuth();
      router.replace(AdminRoutes.login);
    },
  });

  return { logout, isProcessing };
}
