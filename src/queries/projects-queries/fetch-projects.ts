import type { AxiosError } from "axios";
import { ErrorMessages } from "@/core/error-messages";
import type { PaginatedResponse } from "@/core/types/paginated-response";
import type { Project } from "@/core/types/presented-entities/project";
import {
  type ErrorResponse,
  MakeServerResponse,
} from "@/core/types/server-response";
import { axios } from "@/lib/axios";
import { mountPath } from ".";

export type FetchProjectsResponse = PaginatedResponse<{
  projects: Project[];
}>;

export type FetchProjectsErrorResponse = ErrorResponse<string[]>;

export type FetchProjectsParams = {
  tagId?: string;
  containingTitle?: string;
};

export async function fetchProjects({
  containingTitle,
  tagId,
}: FetchProjectsParams = {}): Promise<FetchProjectsResponse> {
  try {
    const params: Record<string, unknown> = {};
    if (tagId) params.tag = tagId;
    if (containingTitle) params.title = containingTitle;

    const response = await axios.get<FetchProjectsResponse>(mountPath("list"), {
      data: params,
    });

    const data = response.data;

    data.projects = data.projects.map((project) => ({
      ...project,
      createdAt: new Date(project.createdAt),
    }));

    return data;
  } catch (e) {
    const error = e as AxiosError;
    switch (error.response?.status ?? error.status) {
      case 400: {
        const { message } = error.response!.data as { message: string[] };
        throw MakeServerResponse.error(message);
      }
      case 401:
        throw MakeServerResponse.error(["Não autorizado."]);
      default:
        console.error(
          `Falha ao buscar listagem de projetos "/project/list" no painel de administração:`,
          error.response?.data ?? error.message,
        );

        throw MakeServerResponse.error(ErrorMessages.internalError);
    }
  }
}
