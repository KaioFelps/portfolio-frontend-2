import type { AxiosError } from "axios";
import type { PaginatedResponse } from "@/core/types/paginated-response";
import type { Tag } from "@/core/types/presented-entities/tag";
import {
  type ErrorResponse,
  MakeServerResponse,
} from "@/core/types/server-response";
import { axios } from "@/lib/axios";
import { mountPath } from ".";

export type FetchTagsResponse = PaginatedResponse<{
  tags: Tag[];
}>;

export type FetchTagsErrorResponse = ErrorResponse<string>;

export type FetchTagsParams = {
  page?: number;
  query?: string;
  perPage?: number;
};

export async function fetchTags({
  page,
  query,
  perPage,
}: FetchTagsParams = {}): Promise<FetchTagsResponse> {
  try {
    const response = await axios<FetchTagsResponse>(mountPath("list"), {
      params: { page, query, amount: perPage },
    });
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    switch (error.response?.status ?? error.status) {
      case 401: {
        const { message } = error.response!.data as { message: string };
        throw MakeServerResponse.error(message);
      }
      default:
        console.error(
          `Falha ao buscar listagem de tags "/tags/list" no painel de administração. Erro:`,
          error.response?.data ?? error.message,
        );

        throw MakeServerResponse.error(
          "Não foi possível carregar a listagem de tags.",
        );
    }
  }
}
