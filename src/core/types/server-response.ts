export type SuccessResponse<T> = { success: true; data: T };
export type ErrorResponse<E> = { success: false; error: E };

export type ServerResponse<T, E> = SuccessResponse<T> | ErrorResponse<E>;

export function isServerResponse<T = unknown, E = unknown>(
  res: unknown,
): res is ServerResponse<T, E> {
  return (
    res !== null &&
    typeof res === "object" &&
    "success" in res &&
    ("data" in res || "error" in res)
  );
}

export function isServerErrorResponse<E = unknown>(
  res: unknown,
): res is ErrorResponse<E> {
  return (
    res !== null &&
    typeof res === "object" &&
    "success" in res &&
    !res.success &&
    "error" in res
  );
}

export abstract class MakeServerResponse {
  public static error<E, T = unknown>(error: E): ServerResponse<T, E> {
    return { success: false, error };
  }

  public static success<T, E = unknown>(data: T): ServerResponse<T, E> {
    return { success: true, data };
  }
}
