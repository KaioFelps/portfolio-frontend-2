import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient, RQKeys } from "@/lib/react-query";
import toast from "@/lib/toast";
import tagsQueries from "@/queries/tags-queries";
import type {
  DeleteTagErrorResponse,
  DeleteTagParams,
  DeleteTagResponse,
} from "@/queries/tags-queries/delete-tag";

type MutationResponse = DeleteTagResponse;
type MutationErrorResponse = DeleteTagErrorResponse;
type MutationArgs = DeleteTagParams;

type Mutation = UseMutationOptions<
  MutationResponse,
  MutationErrorResponse,
  MutationArgs,
  void
>;

type HookArgs = Pick<Mutation, "onError" | "onMutate" | "onSuccess">;

export function useDeleteTag({ onError, onMutate, onSuccess }: HookArgs = {}) {
  const [isProcessing, setIsProcessing] = useState(false);

  const { mutate: deleteTag } = useMutation<
    DeleteTagResponse,
    DeleteTagErrorResponse,
    DeleteTagParams,
    void
  >({
    mutationFn: tagsQueries.deleteTag,
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
      toast.add({ description: "Tag deletada com sucesso." });

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

  return { deleteTag, isProcessing };
}
