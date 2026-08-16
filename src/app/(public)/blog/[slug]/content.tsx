"use client";

import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import clsx from "clsx";
import type { PropsWithChildren } from "react";
import { AlertBlock } from "@/component/alert-block";
import { Main } from "@/component/main";
import SectionHeader from "@/component/section-header";
import { useStarryNight } from "@/core/hooks/use-starry-night";
import type { ExpandedBlogPost } from "@/core/types/presented-entities/expanded-blog-post";
import { formatDateTime } from "@/core/utils";

function Wrapper({ children }: PropsWithChildren) {
  return (
    <Main>
      <a
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
      </a>

      {children}
    </Main>
  );
}

type Props = {
  post: ExpandedBlogPost | null;
};

export function Content({ post }: Props) {
  useStarryNight();

  if (!post)
    return (
      <Wrapper>
        <AlertBlock full type="warning" className="mt-0">
          Post não encontrado =(
        </AlertBlock>
      </Wrapper>
    );

  return (
    <Wrapper>
      <header>
        <SectionHeader.Root>
          <SectionHeader.Heading heading="h1">
            {post.title}
          </SectionHeader.Heading>
        </SectionHeader.Root>

        <div className="flex flex-col gap-2 w-full items-center mb-16 mt-6">
          <span className="text-sm text-balance text-center mb-1 text-gray-600 dark:text-d-gray-600 wrap-break-word">
            {post.publishedAt
              ? `Criado em ${formatDateTime(post.createdAt)}. Publicado em ${formatDateTime(post.publishedAt)}.`
              : "Post ainda não publicado."}

            {post.updatedAt && (
              <>
                <br />
                Última edição em {post.updatedAt.toLocaleDateString("pt-Br")}.
              </>
            )}
          </span>

          <div className="flex flex-wrap justify-center gap-1">
            {post.tags.map((tag) => (
              <a
                key={`blogpost-${post.id}-tags-${tag.id}`}
                href="/blog?queryBy=tag&query={tag.value}"
                className={clsx(
                  "flex",
                  "group cursor-default text-black rounded-full px-2.5 pt-1 pb-0.5 bg-yellow-500 text-sm leading-tight transition-all",
                  "hover:bg-yellow-600",
                  "dark:bg-yellow-600 dark:hover:bg-yellow-500",
                )}
              >
                {tag.value}
                <div className="w-[0] group-hover:w-[calc(16px+4px)] transition-all duration-100 ease-in-out overflow-hidden">
                  <ArrowRightIcon size="16" weight="bold" className="ml-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </header>

      <div
        id="article-body"
        className={clsx(
          "text-container max-w-[792px] gap-4 mx-auto text-lg dark:text-d-gray-800",
          "[&_:is(p,div,hr,table)]:mb-4 prose-table:max-w-full prose-table:overflow-x-scroll",
          "prose-img:max-w-full",
        )}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: it's writen by an admin
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </Wrapper>
  );
}
