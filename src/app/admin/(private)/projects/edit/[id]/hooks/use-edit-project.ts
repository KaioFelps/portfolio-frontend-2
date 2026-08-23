import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { queryClient, RQKeys } from "@/lib/react-query";
import projectsQueries from "@/queries/projects-queries";
import type {
  EditProjectErrorResponse,
  EditProjectParams,
  EditProjectResponse,
} from "@/queries/projects-queries/edit-project";

type MutationResponse = EditProjectResponse;
type MutationErrorResponse = EditProjectErrorResponse;
type MutationArgs = EditProjectParams;

type Mutation = UseMutationOptions<
  MutationResponse,
  MutationErrorResponse,
  MutationArgs,
  void
>;

type HookArgs = Pick<Mutation, "onError" | "onMutate" | "onSuccess"> & {
  projectId: string;
};

export function useEditProject({
  onError,
  onMutate,
  onSuccess,
  projectId,
}: HookArgs) {
  const {
    mutate: editProject,
    isPending,
    ...rest
  } = useMutation<
    EditProjectResponse,
    EditProjectErrorResponse,
    EditProjectParams,
    void
  >({
    mutationFn: projectsQueries.editProject,
    onMutate,
    onError,
    onSuccess: async (data, vars, result, ctx) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: RQKeys.logs.fetchAll() }),
        queryClient.invalidateQueries({
          queryKey: RQKeys.projects.findById(projectId),
        }),
      ]);
      await onSuccess?.(data, vars, result, ctx);
    },
  });

  return { editProject, isProcessing: isPending, ...rest };
}
