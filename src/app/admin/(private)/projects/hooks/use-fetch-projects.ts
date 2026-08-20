import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { RQKeys } from "@/lib/react-query";
import projectsQueries from "@/queries/projects-queries";
import type {
  FetchProjectsErrorResponse,
  FetchProjectsResponse,
} from "@/queries/projects-queries/fetch-projects";

export function useFetchProjects() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const containingTitle = searchParams.get("title") || undefined;
  const tagId = searchParams.get("tag") || undefined;
  const params = { page, containingTitle, tagId };

  return useQuery<FetchProjectsResponse, FetchProjectsErrorResponse>({
    queryKey: RQKeys.projects.fetchPaginated(params),
    queryFn: () => projectsQueries.fetchProjects(params),
  });
}
