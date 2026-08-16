import Skeleton from "@/component/skeleton";

export function ProjectCardSkeleton() {
  return (
    <Skeleton.Card>
      <Skeleton.Topstory className="h-[180px]" />

      <Skeleton.TextLine charsCount={24} />

      <footer className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <Skeleton.Chip charsCount={14} />
          <Skeleton.Chip charsCount={8} />
        </div>
      </footer>
    </Skeleton.Card>
  );
}
