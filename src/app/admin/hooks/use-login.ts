import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminRoutes } from "@/app/routes";
import { RQKeys } from "@/lib/react-query";
import toast from "@/lib/toast";
import { useAuth } from "@/lib/zustand-stores/auth";
import authQueries from "@/queries/auth-queries";
import type {
  LoginArgs,
  LoginErrorResponse,
  LoginResponse,
} from "@/queries/auth-queries/login";

type MutationResponse = LoginResponse;
type MutationErrorResponse = LoginErrorResponse;
type MutationArgs = LoginArgs;

type Mutation = UseMutationOptions<
  MutationResponse,
  MutationErrorResponse,
  MutationArgs,
  void
>;

type HookArgs = Pick<Mutation, "onError" | "onMutate" | "onSuccess">;

export function useLogin({ onError, onMutate, onSuccess }: HookArgs = {}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuth();

  const {
    mutate: login,
    data,
    error,
    isSuccess,
  } = useMutation<MutationResponse, MutationErrorResponse, MutationArgs, void>({
    mutationKey: RQKeys.auth.login(),
    mutationFn: authQueries.login,
    onMutate: (args, ctx) => {
      setIsProcessing(true);
      onMutate?.(args, ctx);
    },
    onSettled: () => setIsProcessing(false),
    onError: (error, vars, res, ctx) => {
      toast.danger({ title: error.error });
      onError?.(error, vars, res, ctx);
    },
    onSuccess: (data, vars, result, ctx) => {
      setAuth(data.accessToken, data.user);
      toast.add({ title: "Logado com sucesso!" });
      router.replace(AdminRoutes.home);
      onSuccess?.(data, vars, result, ctx);
    },
  });

  return { login, isProcessing, data, error, isSuccess };
}
