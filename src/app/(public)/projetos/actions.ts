"use server";

import { constants } from "node:http2";
import { ServerEnv } from "@/config/env";
import { ErrorMessages } from "@/core/error-messages";
import type { PaginatedResponse } from "@/core/types/paginated-response";
import type { Project } from "@/core/types/presented-entities/project";
import {
  MakeServerResponse,
  type ServerResponse,
} from "@/core/types/server-response";

type SuccessResponse = PaginatedResponse<{ projects: Project[] }>;

export type FetchProjectsQuery = {
  readonly by: string;
  readonly value: string;
};

type FetchProjectsArgs = {
  query?: FetchProjectsQuery;
  page?: number;
};

export async function fetchProjects({
  query,
  page,
}: FetchProjectsArgs): Promise<ServerResponse<SuccessResponse, string>> {
  "use server";

  let endpoint = `${ServerEnv.backendUrl}/project/list`;

  const queryParams = new URLSearchParams();

  if (page) queryParams.set("page", page.toString());
  if (query) queryParams.set(query.by, query.value);

  endpoint += `?${queryParams.toString()}`;
  const response = await fetch(endpoint, { method: "GET" });

  if (response.status === constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    return MakeServerResponse.error(ErrorMessages.internalError);

  const data: SuccessResponse = await response.json();

  return MakeServerResponse.success(data);
}
