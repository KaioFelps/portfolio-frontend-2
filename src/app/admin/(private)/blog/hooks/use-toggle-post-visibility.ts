import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient, RQKeys } from "@/lib/react-query";
import toast from "@/lib/toast";
import postsQueries from "@/queries/posts-queries";
import type { FetchPostsResponse } from "@/queries/posts-queries/fetch-posts";
import type {
  TogglePostVisibilityErrorResponse,
  TogglePostVisibilityParams,
  TogglePostVisibilityResponse,
} from "@/queries/posts-queries/toggle-post-visibility";

type MutationResponse = TogglePostVisibilityResponse;
type MutationErrorResponse = TogglePostVisibilityErrorResponse;
type MutationArgs = TogglePostVisibilityParams;

type Mutation = UseMutationOptions<
  MutationResponse,
  MutationErrorResponse,
  MutationArgs,
  void
>;

type HookArgs = Pick<Mutation, "onError" | "onMutate" | "onSuccess">;

export function useTogglePostVisibility({
  onError,
  onMutate,
  onSuccess,
}: HookArgs = {}) {
  const [isProcessing, setIsProcessing] = useState(false);

  const { mutate: togglePostVisibility } = useMutation<
    TogglePostVisibilityResponse,
    TogglePostVisibilityErrorResponse,
    TogglePostVisibilityParams,
    void
  >({
    mutationFn: postsQueries.togglePostVisibility,
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
      toast.add({ description: "Visibilidade alterada." });

      await queryClient.invalidateQueries({
        queryKey: RQKeys.logs.fetchAll(),
      });

      queryClient.setQueriesData(
        { queryKey: RQKeys.posts.fetchPaginatedBase() },
        (oldData: FetchPostsResponse) => {
          if (!oldData?.posts) return oldData;
          if (!vars.postId) return oldData;

          return {
            ...oldData,
            posts: oldData.posts.map((post) => {
              if (post.id !== vars.postId) return post;

              const newPost = { ...post };
              if (newPost.publishedAt) newPost.publishedAt = null;
              else newPost.publishedAt = new Date();
              return newPost;
            }),
          } satisfies FetchPostsResponse;
        },
      );

      await onSuccess?.(data, vars, result, ctx);
    },
  });

  return { togglePostVisibility, isProcessing };
}
