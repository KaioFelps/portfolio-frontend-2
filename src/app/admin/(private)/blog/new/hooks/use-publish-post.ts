import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { queryClient, RQKeys } from "@/lib/react-query";
import postsQueries from "@/queries/posts-queries";
import type {
  PublishPostErrorResponse,
  PublishPostParams,
  PublishPostResponse,
} from "@/queries/posts-queries/publish-post";

type MutationResponse = PublishPostResponse;
type MutationErrorResponse = PublishPostErrorResponse;
type MutationArgs = PublishPostParams;

type Mutation = UseMutationOptions<
  MutationResponse,
  MutationErrorResponse,
  MutationArgs,
  void
>;

type HookArgs = Pick<Mutation, "onError" | "onMutate" | "onSuccess">;

export function usePublishPost({
  onError,
  onMutate,
  onSuccess,
}: HookArgs = {}) {
  const {
    mutate: publishPost,
    isPending,
    ...rest
  } = useMutation<
    PublishPostResponse,
    PublishPostErrorResponse,
    PublishPostParams,
    void
  >({
    mutationFn: postsQueries.publishPost,
    onMutate,
    onError,
    onSuccess: async (data, vars, result, ctx) => {
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

  return { publishPost, isProcessing: isPending, ...rest };
}
