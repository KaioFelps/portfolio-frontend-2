import type { AxiosError } from "axios";
import { ErrorMessages } from "@/core/error-messages";
import {
  type ErrorResponse,
  MakeServerResponse,
} from "@/core/types/server-response";
import { axios } from "@/lib/axios";
import { mountPath } from ".";

export type CreateTagParams = {
  value: string;
};

export type CreateTagResponse = undefined;

type ErrorBody = {
  validationMessages?: string[];
  message?: string;
};

export type CreateTagErrorResponse = ErrorResponse<ErrorBody>;

export async function createTag({
  value,
}: CreateTagParams): Promise<CreateTagResponse> {
  try {
    await axios.post(mountPath("new"), { value });
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
          `Falha ao criar uma nova tag no painel:`,
          error.response?.data ?? error.message,
        );

        throw MakeServerResponse.error<ErrorBody>({
          message: ErrorMessages.internalError,
        });
    }
  }
}
