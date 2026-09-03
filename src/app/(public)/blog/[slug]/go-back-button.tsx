import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import clsx from "clsx";
import Link from "next/link";

export function GoBackToBlogButton() {
  return (
    <Link
      href="/blog"
      className={clsx(
        "cursor-default mb-4 w-fit self-start flex items-center gap-3 px-4 py-2 rounded-full border border-gray-300 dark:border-d-gray-300 leading-none text-sm",
        "transition-all max-sm:mb-8",
        "hover:bg-gray-100 active:bg-gray-200",
        "dark:hover:bg-d-gray-100 dark:active:bg-d-gray-200",
      )}
    >
      <ArrowLeftIcon size="16" weight="bold" />
      Voltar
    </Link>
  );
}
