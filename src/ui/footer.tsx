import { BehanceLogoIcon } from "@phosphor-icons/react/dist/ssr/BehanceLogo";
import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr/GithubLogo";
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr/LinkedinLogo";
import clsx from "clsx";
import { SocialMedias } from "@/config/social-media";

export function Footer() {
  return (
    <footer className="w-full h-27.25 px-16 flex flex-col items-center justify-center gap-0.5 mt-20 shrink-0">
      <div
        className={clsx(
          "flex flex-row gap-2 prose-a:leading-none prose-a:p-2 prose-a:rounded-lg prose-a:transition-all",
          "prose-a:flex prose-a:gap-1 prose-a:items-center prose-a:font-medium prose-a:text-black/80",
          "dark:prose-a:text-white/80 prose-a:hover:text-tangerine-600 dark:prose-a:hover:text-yellow-700",
          "prose-a:hover:bg-gray-200 dark:prose-a:hover:bg-d-gray-200",
        )}
      >
        <a href={SocialMedias.linkedin} target="_blank" rel="noreferrer">
          <LinkedinLogoIcon size="24" weight="fill" />
          <span className="max-sm:hidden"> Github</span>
        </a>
        <a href={SocialMedias.github} target="_blank" rel="noreferrer">
          <GithubLogoIcon size="24" weight="fill" />
          <span className="max-sm:hidden"> Behance</span>
        </a>
        <a href={SocialMedias.behance} target="_blank" rel="noreferrer">
          <BehanceLogoIcon size="24" weight="fill" />
          <span className="max-sm:hidden"> Linkedin</span>
        </a>
      </div>
      <p className="opacity-50 text-xs font-light">
        © Todos os direitos reservados.
      </p>
    </footer>
  );
}
