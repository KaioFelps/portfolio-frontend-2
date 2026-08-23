import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { queryClient, RQKeys } from "@/lib/react-query";
import projectsQueries from "@/queries/projects-queries";
import type {
  CreateProjectErrorResponse,
  CreateProjectParams,
  CreateProjectResponse,
} from "@/queries/projects-queries/create-project";

type MutationResponse = CreateProjectResponse;
type MutationErrorResponse = CreateProjectErrorResponse;
type MutationArgs = CreateProjectParams;

type Mutation = UseMutationOptions<
  MutationResponse,
  MutationErrorResponse,
  MutationArgs,
  void
>;

type HookArgs = Pick<Mutation, "onError" | "onMutate" | "onSuccess">;

export function useCreateProject({
  onError,
  onMutate,
  onSuccess,
}: HookArgs = {}) {
  const {
    mutate: createProject,
    isPending,
    ...rest
  } = useMutation<
    CreateProjectResponse,
    CreateProjectErrorResponse,
    CreateProjectParams,
    void
  >({
    mutationFn: projectsQueries.createProject,
    onMutate,
    onError,
    onSuccess: async (data, vars, result, ctx) => {
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

  return { createProject, isProcessing: isPending, ...rest };
}
