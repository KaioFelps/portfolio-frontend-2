import type { AxiosError } from "axios";
import { ErrorMessages } from "@/core/error-messages";
import {
  type ErrorResponse,
  MakeServerResponse,
} from "@/core/types/server-response";
import { axios } from "@/lib/axios";
import { mountPath } from ".";

export type DeleteTagResponse = undefined;

export type DeleteTagErrorResponse = ErrorResponse<string>;

export type DeleteTagParams = {
  tagId: string;
};

export async function deleteTag({
  tagId,
}: DeleteTagParams): Promise<DeleteTagResponse> {
  try {
    await axios.delete<DeleteTagResponse>(mountPath(`${tagId}/delete`));
  } catch (e) {
    const error = e as AxiosError;
    switch (error.response?.status ?? error.status) {
      case 401: {
        const { message } = error.response!.data as { message: string };
        throw MakeServerResponse.error(message);
      }
      default:
        console.error(
          `Falha ao deletar tag de id "${tagId}" no painel de administração:`,
          error.response?.data ?? error.message,
        );

        throw MakeServerResponse.error(ErrorMessages.internalError);
    }
  }
}
