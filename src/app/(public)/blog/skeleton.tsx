import Skeleton from "@/component/skeleton";

export function BlogSectionsSkeleton() {
  return (
    <div className="mt-16 w-full">
      <Skeleton.Heading charsCount={80} className="mb-6" />

      <Skeleton.Card className="flex flex-row gap-4 mb-4">
        <Skeleton.Topstory className="shrink-0 h-32 w-[264px] max-md:hidden" />
        <div className="min-w-0">
          <Skeleton.Heading charsCount={72} className="mb-3" />
          <Skeleton.TextLine charsCount={200} className="min-w-0 mb-4" />
          <div className="flex gap-2 flex-wrap">
            <Skeleton.Chip charsCount={50} />
            <Skeleton.Chip charsCount={24} />
            <Skeleton.Chip charsCount={32} />
          </div>
        </div>
      </Skeleton.Card>

      <Skeleton.Card className="flex flex-row gap-4">
        <Skeleton.Topstory className="shrink-0 h-32 w-[264px] max-md:hidden" />
        <div className="min-w-0">
          <Skeleton.Heading charsCount={72} className="mb-3" />
          <Skeleton.TextLine charsCount={200} className="min-w-0 mb-4" />
          <div className="flex gap-2 flex-wrap">
            <Skeleton.Chip charsCount={50} />
          </div>
        </div>
      </Skeleton.Card>
    </div>
  );
}
