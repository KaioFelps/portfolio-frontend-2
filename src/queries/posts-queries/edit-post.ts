import type { AxiosError } from "axios";
import { ErrorMessages } from "@/core/error-messages";
import {
  type ErrorResponse,
  MakeServerResponse,
} from "@/core/types/server-response";
import { axios } from "@/lib/axios";
import { mountPath } from ".";

export type EditPostParams = {
  id: string;
  title?: string;
  topstory?: string;
  content?: string;
  tagsIds?: string[];
};

export type EditPostResponse = undefined;

type ErrorBody = {
  message?: string;
  validationMessages?: string[];
};

export type EditPostErrorResponse = ErrorResponse<ErrorBody>;

export async function editPost({
  id,
  tagsIds,
  ...params
}: EditPostParams): Promise<EditPostResponse> {
  try {
    const data = { tags: tagsIds, ...params };
    await axios.put(mountPath(`${id}/edit`), data);
  } catch (e) {
    const error = e as AxiosError;

    switch (error.response?.status ?? error.status) {
      case 400: {
        const { message } = error.response!.data as {
          message: string | string[];
        };

        if (Array.isArray(message)) {
          throw MakeServerResponse.error<ErrorBody>({
            validationMessages: message,
          });
        }

        throw MakeServerResponse.error<ErrorBody>({
          message: message,
        });
      }
      case 401: {
        const { message } = error.response!.data as { message: string };
        throw MakeServerResponse.error<ErrorBody>({ message: message });
      }
      default:
        console.error(
          `Falha ao editar o post de ID "${id}" no painel:`,
          error.response?.data ?? error.message,
        );

        throw MakeServerResponse.error<ErrorBody>({
          message: ErrorMessages.internalError,
        });
    }
  }
}
