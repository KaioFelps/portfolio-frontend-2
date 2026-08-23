import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { queryClient, RQKeys } from "@/lib/react-query";
import tagsQueries from "@/queries/tags-queries";
import type {
  CreateTagErrorResponse,
  CreateTagParams,
  CreateTagResponse,
} from "@/queries/tags-queries/create-tag";

type MutationResponse = CreateTagResponse;
type MutationErrorResponse = CreateTagErrorResponse;
type MutationArgs = CreateTagParams;

type Mutation = UseMutationOptions<
  MutationResponse,
  MutationErrorResponse,
  MutationArgs,
  void
>;

type HookArgs = Pick<Mutation, "onError" | "onMutate" | "onSuccess">;

export function useCreateTag({ onError, onMutate, onSuccess }: HookArgs = {}) {
  const {
    mutate: createTag,
    isPending,
    ...rest
  } = useMutation<
    CreateTagResponse,
    CreateTagErrorResponse,
    CreateTagParams,
    void
  >({
    mutationFn: tagsQueries.createTag,
    onMutate,
    onError,
    onSuccess: async (data, vars, result, ctx) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: RQKeys.tags.fetchPaginatedBase(),
        }),
        queryClient.invalidateQueries({
          queryKey: RQKeys.logs.fetchAll(),
        }),
      ]);

      await onSuccess?.(data, vars, result, ctx);
    },
  });

  return { createTag, isProcessing: isPending, ...rest };
}
