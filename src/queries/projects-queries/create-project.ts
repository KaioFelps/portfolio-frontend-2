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

export type CreateProjectParams = {
  title: string;
  topstory: string;
  links: ProjectLink[];
  tagsIds: string[];
};

export type CreateProjectResponse = undefined;
export type CreateProjectErrorResponse = ErrorResponse<string | string[]>;

export async function createProject({
  tagsIds,
  ...params
}: CreateProjectParams): Promise<CreateProjectResponse> {
  try {
    const data = { tags: tagsIds, ...params };
    await axios.post(mountPath("new"), data);
  } catch (e) {
    const error = e as AxiosError;

    switch (error.response?.status ?? error.status) {
      case 400: {
        const { message } = error.response!.data as { message: string[] };
        throw MakeServerResponse.error(message);
      }
      default:
        console.error(
          `Falha ao publicar um projetos no endpoint (/project/new) na rota ${AdminRoutes.projects.new}:`,
          error.response?.data ?? error.message,
        );

        throw MakeServerResponse.error(ErrorMessages.internalError);
    }
  }
}
