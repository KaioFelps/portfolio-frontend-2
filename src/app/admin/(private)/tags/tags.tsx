"use client";

import { AlertBlock } from "@/component/alert-block";
import Skeleton from "@/component/skeleton";
import { useFetchTags } from "./hooks/use-fetch-tags";

export function TagsSection() {
  const { data: tagsData, status, error } = useFetchTags();

  switch (status) {
    case "error": {
      return (
        <AlertBlock type="danger" className="mb-0" full>
          {error.error}
        </AlertBlock>
      );
    }

    case "success": {
      const { tags } = tagsData;

      if (tags.length > 0) {
        return (
          <div className="flex flex-col gap-1 mb-12">
            {tags.map((tag) => (
              <div
                key={`admin-page-tags-${tag.id}`}
                className="flex justify-between gap-3 items-center p-4 rounded-2xl bg-white/5"
              >
                <span className="font-medium">{tag.value}</span>
                {/* <EditTagDialog   /> */}
              </div>
            ))}
          </div>
        );
      }

      return (
        <AlertBlock type="warning" full>
          <p>
            Não há nenhuma tag registrada. Experimente
            <a className="font-bold" href="/admin/tags/novo">
              {" "}
              criar uma{" "}
            </a>
            !
          </p>
        </AlertBlock>
      );
    }

    case "pending": {
      return <TagsSkeleton />;
    }
  }
}

function TagsSkeleton() {
  return (
    <div className="flex flex-col gap-1 mb-12">
      <Skeleton.ListRow className="min-w-1/3" />
      <Skeleton.ListRow className="min-w-1/4" />
      <Skeleton.ListRow className="min-w-1/5" />
      <Skeleton.ListRow className="min-w-1/2" />
    </div>
  );
}
