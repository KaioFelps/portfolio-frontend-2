import { useQuery } from "@tanstack/react-query";
import { RQKeys } from "@/lib/react-query";
import logsQueries from "@/queries/logs-queries";
import type {
  FetchLogsErrorResponse,
  FetchLogsResponse,
} from "@/queries/logs-queries/fetch-logs";

export function useFetchLogs() {
  return useQuery<FetchLogsResponse, FetchLogsErrorResponse>({
    queryKey: RQKeys.logs.fetchAll(),
    queryFn: logsQueries.fetchLogs,
  });
}
