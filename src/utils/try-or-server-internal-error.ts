import {
  MakeServerResponse,
  type ServerResponse,
} from "@/core/types/server-response";

export async function tryOrServerInternalError<T, E = string>(
  callback: Promise<ServerResponse<T, E | string>>,
): Promise<ServerResponse<T, E | string>> {
  try {
    return await callback;
  } catch (e) {
    console.error(e);
    return MakeServerResponse.error(
      "Houve um problema com o servidor, tente mais tarde.",
    );
  }
}
