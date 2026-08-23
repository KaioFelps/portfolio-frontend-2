import type { AxiosError } from "axios";
import type { Log } from "@/core/types/presented-entities/log";
import {
  type ErrorResponse,
  MakeServerResponse,
} from "@/core/types/server-response";
import { axios } from "@/lib/axios";
import { mountPath } from ".";

export type FetchLogsResponse = {
  logs: Array<Log>;
  totalCount: number;
  page: number;
  perPage: number;
};

export type FetchLogsErrorResponse = ErrorResponse<string | string[]>;

export async function fetchLogs(): Promise<FetchLogsResponse> {
  try {
    const response = await axios.get<FetchLogsResponse>(mountPath("list"));
    const data = response.data;

    // API returns dates as string, so we parse them to JS Dates
    // so that it completely implements the type of Log
    data.logs = data.logs.map((log) => {
      log.createdAt = new Date(log.createdAt);
      return log;
    });

    return data;
  } catch (e) {
    const error = e as AxiosError;

    switch (error.response?.status) {
      case 400: {
        const err = (await error.response!.data) as { message: string };
        throw MakeServerResponse.error(err.message);
      }
      case 401:
        throw MakeServerResponse.error<string[]>(["Não autorizado."]);
      default:
        console.error(
          "Falha ao buscar dados no endpoint de logs (/logs/list): " +
            (await error.response?.data),
        );
        throw MakeServerResponse.error<string[]>([
          "Não foi possível carregar os registros.",
        ]);
    }
  }
}
