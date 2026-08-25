import type { AxiosError } from "axios";
import { ErrorMessages } from "@/core/error-messages";
import {
  type ErrorResponse,
  MakeServerResponse,
} from "@/core/types/server-response";
import { axios } from "@/lib/axios";
import { mountPath } from ".";

export type DeletePostResponse = undefined;

export type DeletePostErrorResponse = ErrorResponse<string>;

export type DeletePostParams = {
  postId: string;
};

export async function deletePost({
  postId,
}: DeletePostParams): Promise<DeletePostResponse> {
  try {
    await axios.delete<DeletePostResponse>(mountPath(`${postId}/delete`));
  } catch (e) {
    const error = e as AxiosError;
    switch (error.response?.status ?? error.status) {
      case 401:
      case 403: {
        const { message } = error.response!.data as { message: string };
        throw MakeServerResponse.error(message);
      }
      default:
        console.error(
          `Falha ao deletar post de id "${postId}" no painel de administração:`,
          error.response?.data ?? error.message,
        );

        throw MakeServerResponse.error(ErrorMessages.internalError);
    }
  }
}
