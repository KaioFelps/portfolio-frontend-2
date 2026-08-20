"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminRoutes } from "@/app/routes";
import Pagination from "@/component/admin/pagination";
import { PaginationHelper } from "@/core/pagination";
import { useFetchProjects } from "./hooks/use-fetch-projects";

export function ProjectsPagination() {
  const { data, status } = useFetchProjects();
  const [paginationButtons, setPaginationButtons] = useState<number[]>([]);
  const [lastPage, setLastPage] = useState(1);
  const params = useSearchParams();

  useEffect(() => {
    if (!data) return;

    const { page, perPage, totalCount } = data;
    const lastPage = Math.ceil(totalCount / perPage);

    setLastPage(lastPage);
    setPaginationButtons(PaginationHelper.calculatePages(5, page, lastPage));
  }, [data]);

  switch (status) {
    case "pending":
      return <ProjectsPaginationSkeleton />;

    case "error":
      return null;

    case "success": {
      const getHref = (page: number) => {
        const url = `?${params.toString()}`;
        return `${AdminRoutes.projects.manage}/${PaginationHelper.getQueryStringFromUrl(url.toString(), { page })}`;
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

const Item = () => (
  <div className="square rounded-lg size-11.5 bg-white/5 border border-white/10 animate-pulse" />
);

function ProjectsPaginationSkeleton() {
  return (
    <Pagination.Root className="animate-bounce opacity-60">
      <Item />
      <Pagination.ItemsBoundary>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </Pagination.ItemsBoundary>
      <Item />
    </Pagination.Root>
  );
}
