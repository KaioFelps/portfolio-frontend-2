import type { AxiosError } from "axios";
import { ErrorMessages } from "@/core/error-messages";
import {
  type ErrorResponse,
  MakeServerResponse,
} from "@/core/types/server-response";
import { axios } from "@/lib/axios";
import { mountPath } from ".";

export type EditTagParams = {
  id: string;
  value?: string;
};

export type EditTagResponse = undefined;

type ErrorBody = {
  message?: string;
  validationMessages?: string[];
};

export type EditTagErrorResponse = ErrorResponse<ErrorBody>;

export async function editTag({
  id,
  value,
}: EditTagParams): Promise<EditTagResponse> {
  try {
    await axios.patch(mountPath(`${id}/edit`), { value });
  } catch (e) {
    const error = e as AxiosError;

    switch (error.response?.status ?? error.status) {
      case 400: {
        const { message } = error.response!.data as { message: string[] };
        throw MakeServerResponse.error<ErrorBody>({
          validationMessages: message,
        });
      }
      case 401: {
        const { message } = error.response!.data as { message: string };
        throw MakeServerResponse.error(message);
      }
      default:
        console.error(
          `Falha ao editar a tag "${value}" de ID "${id}" no painel:`,
          error.response?.data ?? error.message,
        );

        throw MakeServerResponse.error<ErrorBody>({
          message: ErrorMessages.internalError,
        });
    }
  }
}
