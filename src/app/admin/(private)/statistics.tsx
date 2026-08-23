"use client";
import { PenNibIcon } from "@phosphor-icons/react/dist/csr/PenNib";
import { RocketLaunchIcon } from "@phosphor-icons/react/dist/csr/RocketLaunch";
import clsx from "clsx";
import type { PropsWithChildren, ReactElement } from "react";
import { AlertBlock } from "@/component/alert-block";
import Skeleton from "@/component/skeleton";
import type { PropsWithClassName } from "@/core/types/props";
import { useFetchStatistics } from "./hooks/use-fetch-statistics";

export function StatisticsSection() {
  const { data, error, status } = useFetchStatistics();
  let content: ReactElement;

  switch (status) {
    case "pending":
      content = <StatisticSkeleton />;
      break;
    case "error":
      content = <AlertBlock type="danger">{error.error}</AlertBlock>;
      break;
    case "success":
      content = (
        <div className="flex gap-3">
          <StatusCard>
            <span className="block w-fit p-2 rounded-2xl bg-yellow-500 text-d-backgrond">
              <RocketLaunchIcon size="32" weight="bold" />
            </span>
            <span className="flex items-center gap-2">
              <span className="text-3xl font-bold">{data.totalProjects}</span>
              projetos novos
            </span>
          </StatusCard>

          <StatusCard>
            <span className="block w-fit p-2 rounded-2xl bg-yellow-500 text-d-backgrond">
              <PenNibIcon size="32" weight="bold" />
            </span>
            <span className="flex items-center gap-2">
              <span className="text-3xl font-bold">{data.totalPosts}</span>
              artigos publicados
            </span>
          </StatusCard>

          <div className="flex-1 rounded-3xl bg-white/5 p-8" />
        </div>
      );
      break;
  }

  return (
    <section className="mb-12">
      <h2 className="mb-6">Status</h2>
      {content}
    </section>
  );
}

function StatusCard({
  children,
  className,
}: PropsWithChildren<PropsWithClassName>) {
  return (
    <div
      style={
        {
          "--custom-gradient":
            "conic-gradient(#e85300 0deg, #ff8a00 68% 172deg, #e85300 362deg)",
          background: "var(--custom-gradient)",
        } as React.CSSProperties
      }
      className={clsx(
        "relative rounded-3xl p-8 flex-1 flex flex-col gap-4 overflow-hidden",
        "before:absolute before:inset-0 before:opacity-50 before:mix-blend-overlay",
        "before:[background:var(--custom-gradient)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function StatisticSkeleton() {
  return (
    <div className="flex gap-3">
      <StatusSkeleton />
      <StatusSkeleton />
      <StatusSkeleton />
    </div>
  );
}

function StatusSkeleton() {
  return (
    <div
      className={clsx(
        "relative rounded-3xl p-8 flex-1 flex flex-col gap-4 overflow-hidden",
        "bg-yellow-500/25 animate-pulse",
      )}
    >
      <div className="block w-fit p-2 rounded-2xl bg-yellow-500/25 text-d-backgrond">
        <span className="aspect-square size-8 bg-transparent block" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton.Heading charsCount={16} className="bg-white/30!" />
        <div className="min-w-0 w-full">
          <Skeleton.TextLine
            charsCount={32}
            className="bg-white/20! max-w-full text-nowrap whitespace-nowrap mb-1"
          />
          <Skeleton.TextLine
            charsCount={10}
            className="bg-white/20! max-w-1/3 text-nowrap whitespace-nowrap"
          />
        </div>
      </div>
    </div>
  );
}
