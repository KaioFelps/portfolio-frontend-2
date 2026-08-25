import type { AxiosError } from "axios";
import { ErrorMessages } from "@/core/error-messages";
import {
  type ErrorResponse,
  MakeServerResponse,
} from "@/core/types/server-response";
import { axios } from "@/lib/axios";
import { mountPath } from ".";

export type PublishPostParams = {
  title: string;
  topstory: string;
  content: string;
  tagsIds: string[];
};

export type PublishPostResponse = undefined;

type ErrorBody = {
  validationMessages?: string[];
  message?: string;
};

export type PublishPostErrorResponse = ErrorResponse<ErrorBody>;

export async function publishPost({
  tagsIds,
  ...params
}: PublishPostParams): Promise<PublishPostResponse> {
  try {
    const data = { tags: tagsIds, ...params };
    await axios.post(mountPath("new"), data);
  } catch (e) {
    const error = e as AxiosError;

    switch (error.response?.status ?? error.status) {
      case 401:
        throw MakeServerResponse.error<ErrorBody>({
          message: "Não autorizado.",
        });

      case 400: {
        console.error(
          "Erro de má-requisição ao publicar uma postagem:",
          error.response?.data ?? error.message,
        );

        const { message } = error.response!.data! as {
          message: string | string[];
        };

        const errorBody: ErrorBody = {};

        if (Array.isArray(message)) errorBody.validationMessages = message;
        else errorBody.message = message;

        throw MakeServerResponse.error<ErrorBody>(errorBody);
      }

      default:
        console.error(
          "Falha ao publicar um novo post:",
          error.response?.data ?? error.message,
        );

        throw MakeServerResponse.error<ErrorBody>({
          message: ErrorMessages.internalError,
        });
    }
  }
}
