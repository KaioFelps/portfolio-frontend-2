type SuccessResponse<T> = { success: true; data: T };
type ErrorResponse<E> = { success: false; error: E };

export type ServerResponse<T, E> = SuccessResponse<T> | ErrorResponse<E>;

export class MakeServerResponse<T, E> {
  public static error<E, T = unknown>(error: E): ServerResponse<T, E> {
    return { success: false, error };
  }

  public static success<T, E = unknown>(data: T): ServerResponse<T, E> {
    return { success: true, data };
  }
}
