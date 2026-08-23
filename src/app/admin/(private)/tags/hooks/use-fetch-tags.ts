import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { RQKeys } from "@/lib/react-query";
import tagsQueries from "@/queries/tags-queries";
import type {
  FetchTagsErrorResponse,
  FetchTagsResponse,
} from "@/queries/tags-queries/fetch-tags";

export function useFetchTags() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("query") || undefined;
  const params = { page, query };

  return useQuery<FetchTagsResponse, FetchTagsErrorResponse>({
    queryKey: RQKeys.tags.fetchPaginated(params),
    queryFn: () => tagsQueries.fetchTags(params),
  });
}
