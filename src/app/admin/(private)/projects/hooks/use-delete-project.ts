import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient, RQKeys } from "@/lib/react-query";
import toast from "@/lib/toast";
import projectsQueries from "@/queries/projects-queries";
import type {
  DeleteProjectErrorResponse,
  DeleteProjectParams,
  DeleteProjectResponse,
} from "@/queries/projects-queries/delete-project";

type MutationResponse = DeleteProjectResponse;
type MutationErrorResponse = DeleteProjectErrorResponse;
type MutationArgs = DeleteProjectParams;

type Mutation = UseMutationOptions<
  MutationResponse,
  MutationErrorResponse,
  MutationArgs,
  void
>;

type HookArgs = Pick<Mutation, "onError" | "onMutate" | "onSuccess">;

export function useDeleteProject({
  onError,
  onMutate,
  onSuccess,
}: HookArgs = {}) {
  const [isProcessing, setIsProcessing] = useState(false);

  const { mutate: deleteProject } = useMutation<
    DeleteProjectResponse,
    DeleteProjectErrorResponse,
    DeleteProjectParams,
    void
  >({
    mutationFn: projectsQueries.deleteProject,
    onMutate: (vars, ctx) => {
      setIsProcessing(true);
      onMutate?.(vars, ctx);
    },
    onSettled: () => setIsProcessing(false),
    onError: (error, vars, result, ctx) => {
      toast.danger({ description: error.error });
      onError?.(error, vars, result, ctx);
    },
    onSuccess: async (data, vars, result, ctx) => {
      toast.add({ description: "Projeto deletado com sucesso." });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: RQKeys.projects.fetchPaginatedBase(),
        }),
        queryClient.invalidateQueries({
          queryKey: RQKeys.logs.fetchAll(),
        }),
      ]);

      await onSuccess?.(data, vars, result, ctx);
    },
  });

  return { deleteProject, isProcessing };
}
