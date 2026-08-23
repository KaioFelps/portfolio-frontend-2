import { useQuery } from "@tanstack/react-query";
import { RQKeys } from "@/lib/react-query";
import tagsQueries from "@/queries/tags-queries";
import type {
  FetchTagsErrorResponse,
  FetchTagsResponse,
} from "@/queries/tags-queries/fetch-tags";

export function useFetchEveryTag() {
  const params = { perPage: 100 };

  return useQuery<FetchTagsResponse, FetchTagsErrorResponse>({
    queryKey: RQKeys.tags.fetchPaginated(params),
    queryFn: () => tagsQueries.fetchTags(params),
  });
}
