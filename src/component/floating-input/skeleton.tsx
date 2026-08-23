import clsx from "clsx";
import Skeleton from "../skeleton";

type Props = {
  className?: string;
  /**
   * Adds a caret icon to simulate a select component.
   */
  isSelect?: boolean;
};

export function FloatingInputSkeleton({ className, isSelect = false }: Props) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        "relative mb-4 w-full h-12.5 px-6 py-3 flex items-center justify-between",
        "border border-d-gray-300/30 rounded-lg bg-white/5 animate-pulse",
        className,
      )}
    >
      <Skeleton.TextLine className="max-w-full w-32" />

      {isSelect && <div className="h-4 w-4 bg-white/10 rounded-sm" />}
    </div>
  );
}
