import type { AxiosError } from "axios";
import {
  type ErrorResponse,
  MakeServerResponse,
} from "@/core/types/server-response";
import { axios } from "@/lib/axios";
import { mountPath } from ".";

export type FetchStatisticsResponse = {
  totalPosts: number;
  totalProjects: number;
};

export type FetchStatisticsErrorResponse = ErrorResponse<string>;

export async function fetchStatistics(): Promise<FetchStatisticsResponse> {
  try {
    const response = await axios<FetchStatisticsResponse>(mountPath("count"));

    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    console.error(
      `Falha ao buscar dados no endpoint "/statistics/count". Erro:`,
      error.response?.data,
    );

    let msg = "Não foi possível carregar as estatísticas do site.";

    if (error.status !== 500 && error.response?.data) {
      const { message } = error.response!.data as { message: string };
      msg = message;
    }

    throw MakeServerResponse.error(msg);
  }
}
