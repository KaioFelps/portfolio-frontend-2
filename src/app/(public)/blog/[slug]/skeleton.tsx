import SectionHeader from "@/component/section-header";
import Skeleton from "@/component/skeleton";
import { GoBackToBlogButton } from "./go-back-button";

export function BlogPostSkeleton() {
  return (
    <>
      <GoBackToBlogButton />

      <SectionHeader.Root className="flex-col gap-12 pb-24 my-24">
        <Skeleton.Heading
          charsCount={90}
          className="mx-auto text-center min-h-12"
        />

        <div className="flex flex-col gap-2 w-full items-center">
          <Skeleton.TextLine charsCount={128} className="text-center mb-1.5" />

          <div className="flex flex-wrap justify-center gap-1">
            <Skeleton.Chip charsCount={14} />
            <Skeleton.Chip charsCount={8} />
          </div>
        </div>
      </SectionHeader.Root>

      <div className="w-full max-w-198 gap-4 mx-auto text-lg [&_:is(p,div,hr,table)]:mb-4 relative">
        <Skeleton.TextLine className="w-full" />
        <Skeleton.TextLine className="w-full" />
        <Skeleton.TextLine noMaxWidthFull className="w-full max-w-2/3" />
        <br />
        <Skeleton.TextLine noMaxWidthFull className="w-full max-w-3/4" />
        <Skeleton.TextLine noMaxWidthFull className="w-full max-w-2/3" />
        <Skeleton.TextLine className="w-full" />
        <Skeleton.TextLine noMaxWidthFull className="w-full max-w-1/3" />
        <br />
        <Skeleton.TextLine noMaxWidthFull className="w-full max-w-5/6" />
        <Skeleton.TextLine noMaxWidthFull className="w-full max-w-3/4" />
        <Skeleton.TextLine noMaxWidthFull className="w-full max-w-8/9" />
      </div>
    </>
  );
}
