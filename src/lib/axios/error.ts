import { AxiosError } from "axios";
import { ErrorMessages } from "@/core/error-messages";
import {
  MakeServerResponse,
  type ServerResponse,
} from "@/core/types/server-response";

function assertAxiosError(error: unknown): error is AxiosError {
  return error instanceof AxiosError && "response" in error;
}

export function prepareServerErrorFromAxios(
  error: unknown,
): ServerResponse<never, string[] | string> {
  if (!assertAxiosError(error)) {
    return MakeServerResponse.error(ErrorMessages.internalError);
  }

  const body = error.response!;
  if (!body.data || !("message" in (body.data as object))) {
    return MakeServerResponse.error(ErrorMessages.internalError);
  }

  const { message } = body.data as { message: string | string[] };
  return MakeServerResponse.error(message);
}
