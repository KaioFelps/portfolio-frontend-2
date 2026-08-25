import { useQuery } from "@tanstack/react-query";
import { RQKeys } from "@/lib/react-query";
import postsQueries from "@/queries/posts-queries";
import type {
  FindExpandedPostErrorResponse,
  FindExpandedPostParams,
  FindExpandedPostResponse,
} from "@/queries/posts-queries/find-expanded-post";

export function useFindExpandedPost(params: FindExpandedPostParams) {
  return useQuery<FindExpandedPostResponse, FindExpandedPostErrorResponse>({
    queryKey: RQKeys.posts.findBySlug(params.postSlug),
    queryFn: () => postsQueries.findExpandedPost(params),
  });
}
