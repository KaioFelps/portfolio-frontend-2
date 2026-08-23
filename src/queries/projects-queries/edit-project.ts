import type { AxiosError } from "axios";
import { AdminRoutes } from "@/app/routes";
import { ErrorMessages } from "@/core/error-messages";
import type { ProjectLink } from "@/core/types/presented-entities/project-link";
import {
  type ErrorResponse,
  MakeServerResponse,
} from "@/core/types/server-response";
import { axios } from "@/lib/axios";
import { mountPath } from ".";

export type EditProjectParams = {
  id: string;
  title?: string;
  topstory?: string;
  links?: ProjectLink[];
  tagsIds?: string[];
};

export type EditProjectResponse = undefined;

type ErrorBody = {
  message?: string;
  validationMessages?: string[];
};

export type EditProjectErrorResponse = ErrorResponse<ErrorBody>;

export async function editProject({
  id,
  tagsIds,
  ...params
}: EditProjectParams): Promise<EditProjectResponse> {
  try {
    const data = { tags: tagsIds, ...params };
    await axios.put(mountPath(`${id}/edit`), data);
  } catch (e) {
    const error = e as AxiosError;

    switch (error.response?.status ?? error.status) {
      case 400: {
        const { message } = error.response!.data as { message: string[] };
        throw MakeServerResponse.error<ErrorBody>({
          validationMessages: message,
        });
      }
      default:
        console.error(
          `Falha ao editar o projeto de ID "${id}" no painel (rota ${AdminRoutes.projects.edit(id)}):`,
          error.response?.data ?? error.message,
        );

        throw MakeServerResponse.error<ErrorBody>({
          message: ErrorMessages.internalError,
        });
    }
  }
}
