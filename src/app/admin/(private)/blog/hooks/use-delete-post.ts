import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient, RQKeys } from "@/lib/react-query";
import toast from "@/lib/toast";
import postsQueries from "@/queries/posts-queries";
import type {
  DeletePostErrorResponse,
  DeletePostParams,
  DeletePostResponse,
} from "@/queries/posts-queries/delete-post";

type MutationResponse = DeletePostResponse;
type MutationErrorResponse = DeletePostErrorResponse;
type MutationArgs = DeletePostParams;

type Mutation = UseMutationOptions<
  MutationResponse,
  MutationErrorResponse,
  MutationArgs,
  void
>;

type HookArgs = Pick<Mutation, "onError" | "onMutate" | "onSuccess">;

export function useDeletePost({ onError, onMutate, onSuccess }: HookArgs = {}) {
  const [isProcessing, setIsProcessing] = useState(false);

  const { mutate: deletePost } = useMutation<
    DeletePostResponse,
    DeletePostErrorResponse,
    DeletePostParams,
    void
  >({
    mutationFn: postsQueries.deletePost,
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
      toast.add({ description: "Publicação deletada com sucesso." });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: RQKeys.posts.fetchPaginatedBase(),
        }),
        queryClient.invalidateQueries({
          queryKey: RQKeys.logs.fetchAll(),
        }),
      ]);

      await onSuccess?.(data, vars, result, ctx);
    },
  });

  return { deletePost, isProcessing };
}
