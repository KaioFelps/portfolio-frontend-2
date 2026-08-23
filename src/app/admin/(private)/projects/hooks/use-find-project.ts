import { useQuery } from "@tanstack/react-query";
import { RQKeys } from "@/lib/react-query";
import projectsQueries from "@/queries/projects-queries";
import type {
  FindProjectErrorResponse,
  FindProjectParams,
  FindProjectResponse,
} from "@/queries/projects-queries/find-project";

export function useFindProject(params: FindProjectParams) {
  return useQuery<FindProjectResponse, FindProjectErrorResponse>({
    queryKey: RQKeys.projects.findById(params.projectId),
    queryFn: () => projectsQueries.findProject(params),
  });
}
