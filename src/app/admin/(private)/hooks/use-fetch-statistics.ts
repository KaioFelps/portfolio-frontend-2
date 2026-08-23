import { useQuery } from "@tanstack/react-query";
import { RQKeys } from "@/lib/react-query";
import statisticQueries from "@/queries/statistic-queries";
import type {
  FetchStatisticsErrorResponse,
  FetchStatisticsResponse,
} from "@/queries/statistic-queries/fetch-statistics";

export function useFetchStatistics() {
  return useQuery<FetchStatisticsResponse, FetchStatisticsErrorResponse>({
    queryKey: RQKeys.statistics.fetchAll(),
    queryFn: statisticQueries.fetchStatistics,
  });
}
