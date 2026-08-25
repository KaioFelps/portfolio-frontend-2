import type { AxiosError } from "axios";
import { ErrorMessages } from "@/core/error-messages";
import {
  type ErrorResponse,
  MakeServerResponse,
} from "@/core/types/server-response";
import { axios } from "@/lib/axios";
import { mountPath } from ".";

export type TogglePostVisibilityParams = {
  postId: string;
};

export type TogglePostVisibilityResponse = undefined;

export type TogglePostVisibilityErrorResponse = ErrorResponse<string>;

export async function togglePostVisibility({
  postId,
}: TogglePostVisibilityParams): Promise<TogglePostVisibilityResponse> {
  try {
    await axios.patch(mountPath(`${postId}/visibility`));
  } catch (e) {
    const error = e as AxiosError;

    switch (error.response?.status ?? error.status) {
      case 400:
        throw MakeServerResponse.error("Post não encontrado.");
      case 401:
        throw MakeServerResponse.error(
          "Você não tem autorização para publicar este post.",
        );
      default:
        console.error(
          `Falha ao alterar visibilidade do post de ID "${postId}" no painel:`,
          error.response?.data ?? error.message,
        );

        throw MakeServerResponse.error(ErrorMessages.internalError);
    }
  }
}
