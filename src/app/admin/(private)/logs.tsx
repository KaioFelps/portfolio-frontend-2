"use client";

import type { ReactElement } from "react";
import { AlertBlock } from "@/component/alert-block";
import Skeleton from "@/component/skeleton";
import { formatLogString } from "@/core/utils";
import { useFetchLogs } from "./hooks/use-fetch-logs";

export function LogsSection() {
  const { data, error, status } = useFetchLogs();
  let content: ReactElement;

  switch (status) {
    case "pending":
      content = <LogSkeleton />;
      break;
    case "error":
      content = <AlertBlock type="danger">{error.error}</AlertBlock>;
      break;
    case "success":
      content = (
        <div className="flex flex-col gap-1">
          {data.logs.map((log) => (
            <p
              key={`admin-homepage-logs-${log.id}-item`}
              className="rounded-2xl bg-white/5 font-medium p-4"
            >
              {formatLogString(log)}
            </p>
          ))}
        </div>
      );
      break;
  }

  return (
    <section>
      <h2 className="mb-6">Últimos registros</h2>
      {content}
    </section>
  );
}

function LogSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      <div className="rounded-2xl bg-white/5 font-medium p-4">
        <Skeleton.TextLine
          charsCount={5}
          className="min-w-2/3 leading-tight!"
        />
      </div>
      <div className="rounded-2xl bg-white/5 font-medium p-4">
        <Skeleton.TextLine
          charsCount={5}
          className="min-w-1/3 leading-tight!"
        />
      </div>
      <div className="rounded-2xl bg-white/5 font-medium p-4">
        <Skeleton.TextLine
          charsCount={5}
          className="min-w-3/4 leading-tight!"
        />
      </div>
    </div>
  );
}
