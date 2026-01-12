import { constants } from "node:http2";
import { ServerEnv } from "@/config/env";
import { ErrorMessages } from "@/core/error-messages";
import type { PaginatedResponse } from "@/core/types/paginated-response";
import type { Project } from "@/core/types/presented-entities/project";
import {
  MakeServerResponse,
  type ServerResponse,
} from "@/core/types/server-response";
import { generateQueryString } from "@/utils/query";

type SuccessResponse = PaginatedResponse<{ projects: Project[] }>;

type FetchProjectsQuery = {
  readonly by: string;
  readonly value: string;
};

type FetchProjectsArgs = {
  query?: FetchProjectsQuery;
};

export async function fetchProjects({
  query,
}: FetchProjectsArgs): Promise<ServerResponse<SuccessResponse, string>> {
  "use server";

  let endpoint = `${ServerEnv.backendUrl}/project/list`;

  if (query) endpoint += generateQueryString({ [query.by]: query.value });

  const response = await fetch(endpoint, { method: "GET" });

  if (response.status === constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    return MakeServerResponse.error(ErrorMessages.internalError);

  const data: SuccessResponse = await response.json();

  return MakeServerResponse.success(data);
}
