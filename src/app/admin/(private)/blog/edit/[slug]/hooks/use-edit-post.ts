import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { queryClient, RQKeys } from "@/lib/react-query";
import postsQueries from "@/queries/posts-queries";
import type {
  EditPostErrorResponse,
  EditPostParams,
  EditPostResponse,
} from "@/queries/posts-queries/edit-post";

type MutationResponse = EditPostResponse;
type MutationErrorResponse = EditPostErrorResponse;
type MutationArgs = EditPostParams;

type Mutation = UseMutationOptions<
  MutationResponse,
  MutationErrorResponse,
  MutationArgs,
  void
>;

type HookArgs = Pick<Mutation, "onError" | "onMutate" | "onSuccess"> & {
  postSlug: string;
};

export function useEditPost({
  onError,
  onMutate,
  onSuccess,
  postSlug,
}: HookArgs) {
  const {
    mutate: editPost,
    isPending,
    ...rest
  } = useMutation<
    EditPostResponse,
    EditPostErrorResponse,
    EditPostParams,
    void
  >({
    mutationFn: postsQueries.editPost,
    onMutate,
    onError,
    onSuccess: async (data, vars, result, ctx) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: RQKeys.logs.fetchAll() }),
        queryClient.invalidateQueries({
          queryKey: RQKeys.posts.findBySlug(postSlug),
        }),
      ]);
      await onSuccess?.(data, vars, result, ctx);
    },
  });

  return { editPost, isProcessing: isPending, ...rest };
}
