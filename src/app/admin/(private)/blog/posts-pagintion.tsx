"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminRoutes } from "@/app/routes";
import Pagination from "@/component/admin/pagination";
import { PaginationHelper } from "@/core/pagination";
import { useFetchPosts } from "./hooks/use-fetch-posts";

export function BlogPostsPagination() {
  const { data, status } = useFetchPosts();
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
      return <PostsPaginationSkeleton />;

    case "error":
      return null;

    case "success": {
      const getHref = (page: number) => {
        const url = `?${params.toString()}`;
        return `${AdminRoutes.posts.manage}/${PaginationHelper.getQueryStringFromUrl(url.toString(), { page })}`;
      };

      return (
        <Pagination.Root className="mt-12">
          <Pagination.OuterItem kind="first" href={getHref(1)} />

          <Pagination.ItemsBoundary>
            {paginationButtons.map((page) => (
              <Pagination.Item
                key={`admin-post-listing-pagination-to-${page}`}
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

function PostsPaginationSkeleton() {
  return (
    <Pagination.Root className="animate-bounce opacity-60 mt-12">
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
