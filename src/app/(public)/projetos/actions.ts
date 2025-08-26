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

export async function fetchProjects(): Promise<
  ServerResponse<SuccessResponse, string>
> {
  "use server";

  const endpoint = `${ServerEnv.backendUrl}/project/list`;
  const response = await fetch(endpoint, { method: "GET" });

  if (response.status === constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    return MakeServerResponse.error(ErrorMessages.internalError);

  const data: SuccessResponse = await response.json();

  return MakeServerResponse.success(data);
}
