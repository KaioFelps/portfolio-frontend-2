import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr/GithubLogo";
import { BehanceLogoIcon } from "@phosphor-icons/react/dist/ssr/BehanceLogo";
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr/LinkedinLogo";
import { SOCIAL_MEDIAS } from "@/config/social-media";
import clsx from "clsx";

export function Footer() {
  return (
    <footer className="w-full h-[109px] px-16 flex items-center justify-center mt-20 shrink-0">
      <div
        className={clsx(
          "flex flex-row gap-2 prose-a:leading-none prose-a:p-2 prose-a:rounded-lg prose-a:transition-all",
          "prose-a:flex prose-a:gap-1 prose-a:items-center prose-a:font-medium prose-a:text-black/80",
          "dark:prose-a:text-white/80 hover:prose-a:text-tangerine-600 dark:hover:prose-a:text-yellow-700",
          "hover:prose-a:bg-gray-200 dark:hover:prose-a:bg-d-gray-200",
        )}
      >
        <a href={SOCIAL_MEDIAS.linkedin} target="_blank" rel="noreferrer">
          <LinkedinLogoIcon size="24" weight="fill" /> Linkedin
        </a>
        <a href={SOCIAL_MEDIAS.github} target="_blank" rel="noreferrer">
          <GithubLogoIcon size="24" weight="fill" /> Github
        </a>
        <a href={SOCIAL_MEDIAS.behance} target="_blank" rel="noreferrer">
          <BehanceLogoIcon size="24" weight="fill" /> Behance
        </a>
      </div>
    </footer>
  );
}
