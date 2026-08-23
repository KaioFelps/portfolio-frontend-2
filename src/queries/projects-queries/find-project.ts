import type { AxiosError } from "axios";
import { ErrorMessages } from "@/core/error-messages";
import type { Project } from "@/core/types/presented-entities/project";
import {
  type ErrorResponse,
  MakeServerResponse,
} from "@/core/types/server-response";
import { axios } from "@/lib/axios";
import { mountPath } from ".";

export type FindProjectResponse = {
  project: Project | null;
};

export type FindProjectErrorResponse = ErrorResponse<string>;

export type FindProjectParams = {
  projectId: string;
};

export async function findProject({
  projectId,
}: FindProjectParams): Promise<FindProjectResponse> {
  try {
    const response = await axios.get<FindProjectResponse>(mountPath(projectId));
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    switch (error.response?.status ?? error.status) {
      case 401:
        throw MakeServerResponse.error("Não autorizado.");
      default:
        console.error(
          `Falha ao buscar projeto de id "${projectId}" no painel de administração:`,
          error.response?.data ?? error.message,
        );

        throw MakeServerResponse.error(ErrorMessages.internalError);
    }
  }
}
