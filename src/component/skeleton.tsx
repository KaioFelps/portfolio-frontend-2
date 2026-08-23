import clsx from "clsx";
import type { PropsWithChildren } from "react";
import type { PropsWithClassName } from "@/core/types/props";

type TextProps = { charsCount?: number; noLeading?: boolean };

function TextLine({
  charsCount = 10,
  className,
  noLeading = false,
}: PropsWithClassName<TextProps>) {
  return (
    <div
      className={clsx(
        "font-medium text-base w-fit rounded-full bg-gray-300 dark:bg-d-gray-300",
        "animate-pulse select-none break-all wrap-break-word max-w-full",
        !noLeading && "leading-4",
        className,
      )}
    >
      {"\u00a0".repeat(charsCount)}
    </div>
  );
}

function Heading({
  charsCount,
  className,
  noLeading = false,
}: PropsWithClassName<TextProps>) {
  return (
    <TextLine
      charsCount={charsCount}
      noLeading
      className={clsx(
        "text-2xl font-bold",
        !noLeading && "leading-loose",
        className,
      )}
    />
  );
}

function Chip({ charsCount = 14 }: TextProps) {
  return (
    <div className="chip c-yellow select-none w-fit break-all wrap-break-word">
      {"\u00a0".repeat(charsCount)}
    </div>
  );
}

function Card({ children, className }: PropsWithChildren<PropsWithClassName>) {
  return (
    <div
      aria-busy="true"
      className={clsx(
        "bg-gray-100 dark:bg-d-gray-100 border border-gray-300 dark:border-none",
        "p-4 rounded-2xl flex-1 flex flex-col gap-3 animate-pulse select-none",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Topstory({ className }: PropsWithClassName) {
  return (
    <div
      className={clsx("rounded-lg bg-yellow-500/20 animate-pulse", className)}
    />
  );
}

function ListRow({ className }: PropsWithClassName) {
  return (
    <div className="flex justify-between gap-3 items-center p-4 rounded-2xl bg-white/5 animate-pulse">
      <TextLine charsCount={1} className={className} noLeading />
      <div className="flex items-center gap-3">
        <div className="aspect-square size-5 rounded-md bg-red-300/20" />
        <div className="aspect-square size-5 rounded-md bg-white/10" />
      </div>
    </div>
  );
}

export default {
  TextLine,
  Heading,
  Chip,
  Card,
  Topstory,
  ListRow,
};
