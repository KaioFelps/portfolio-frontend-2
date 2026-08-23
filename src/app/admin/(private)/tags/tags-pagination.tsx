"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminRoutes } from "@/app/routes";
import Pagination from "@/component/admin/pagination";
import { PaginationHelper } from "@/core/pagination";
import { useFetchTags } from "./hooks/use-fetch-tags";

export function TagsPagination() {
  const { data, status } = useFetchTags();
  const [paginationButtons, setPaginationButtons] = useState<number[]>([]);
  const [lastPage, setLastPage] = useState(1);
  const params = useSearchParams();

  useEffect(() => {
    if (!data) return;

    const { page, perPage, totalCount } = data;
    const lastPage = Math.ceil(totalCount / perPage);

    setLastPage(lastPage);
    setPaginationButtons(PaginationHelper.calculatePages(page, lastPage, 5));
  }, [data]);

  switch (status) {
    case "pending":
      return <ProjectsPaginationSkeleton />;

    case "error":
      return null;

    case "success": {
      const getHref = (page: number) => {
        const url = `?${params.toString()}`;
        return `${AdminRoutes.tags.manage}/${PaginationHelper.getQueryStringFromUrl(url.toString(), { page })}`;
      };

      return (
        <Pagination.Root>
          <Pagination.OuterItem kind="first" href={getHref(1)} />

          <Pagination.ItemsBoundary>
            {paginationButtons.map((page) => (
              <Pagination.Item
                key={`project_listing_pagination_to_${page}`}
                isActive={data.page === page}
                getHref={getHref}
                page={page}
              />
            ))}
          </Pagination.ItemsBoundary>

          <Pagination.OuterItem kind="last" href={getHref(lastPage)} />
        </Pagination.Root>
      );
    }
  }
}

function ProjectsPaginationSkeleton() {
  return (
    <Pagination.Root className="animate-bounce opacity-60">
      <Pagination.ButtonSkeleton />
      <Pagination.ItemsBoundary>
        <Pagination.ButtonSkeleton />
        <Pagination.ButtonSkeleton />
        <Pagination.ButtonSkeleton />
        <Pagination.ButtonSkeleton />
        <Pagination.ButtonSkeleton />
      </Pagination.ItemsBoundary>
      <Pagination.ButtonSkeleton />
    </Pagination.Root>
  );
}
