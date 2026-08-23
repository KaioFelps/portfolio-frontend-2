import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { RQKeys } from "@/lib/react-query";
import postsQueries from "@/queries/posts-queries";
import type {
  FetchPostsErrorResponse,
  FetchPostsResponse,
} from "@/queries/posts-queries/fetch-posts";

export function useFetchPosts() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const containingTitle = searchParams.get("title") || undefined;
  const tagId = searchParams.get("tag") || undefined;
  const params = { page, containingTitle, tagId };

  return useQuery<FetchPostsResponse, FetchPostsErrorResponse>({
    queryKey: RQKeys.posts.fetchPaginated(params),
    queryFn: () => postsQueries.fetchPosts(params),
  });
}
