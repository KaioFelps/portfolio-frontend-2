"use client";

import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import clsx from "clsx";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { AlertBlock } from "@/component/alert-block";
import { Main } from "@/component/main";
import SectionHeader from "@/component/section-header";
import { useKatex } from "@/core/hooks/use-katex";
import { useStarryNight } from "@/core/hooks/use-starry-night";
import type { ExpandedBlogPost } from "@/core/types/presented-entities/expanded-blog-post";
import { formatDateTime } from "@/core/utils";

function Wrapper({ children }: PropsWithChildren) {
  return (
    <Main>
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

      {children}
    </Main>
  );
}

type Props = {
  post: ExpandedBlogPost | null;
};

export function Content({ post }: Props) {
  useStarryNight();
  const { ref } = useKatex({ content: post?.content });

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
      <SectionHeader.Root className="flex-col gap-12 pb-24 my-24">
        <SectionHeader.Heading
          heading="h1"
          className="text-center text-balance text-7xl"
        >
          {post.title}
        </SectionHeader.Heading>

        <div className="flex flex-col gap-2 w-full items-center">
          <span className="text-sm text-balance text-center mb-1 text-gray-600 dark:text-d-gray-600 wrap-break-word">
            {post.publishedAt
              ? `Criado em ${formatDateTime(post.createdAt)}. Publicado em ${formatDateTime(post.publishedAt)}.`
              : "Post ainda não publicado."}

            {post.updatedAt &&
              ` Última edição em ${formatDateTime(post.updatedAt)}.`}
          </span>

          {Boolean(post.tags.length) && (
            <div className="flex flex-wrap justify-center gap-1">
              {post.tags.map((tag) => (
                <Link
                  key={`blogpost-${post.id}-tags-${tag.id}`}
                  href={`/blog?queryBy=tag&query=${tag.value}`}
                  className={clsx(
                    "flex",
                    "group cursor-default text-black rounded-full px-2.5 pt-1 pb-0.5 bg-yellow-500 text-sm leading-tight transition-all",
                    "hover:bg-yellow-600",
                    "dark:bg-yellow-600 dark:hover:bg-yellow-500",
                  )}
                >
                  {tag.value}
                  <div className="w-0 group-hover:w-5 transition-all duration-100 ease-in-out overflow-hidden">
                    <ArrowRightIcon size="16" weight="bold" className="ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </SectionHeader.Root>

      <div
        id="article-body"
        ref={ref}
        className={clsx(
          "text-container w-full max-w-198 gap-4 mx-auto text-lg dark:text-d-gray-800",
          "[&_:is(p,div,hr,table)]:mb-4 prose-table:max-w-full prose-table:overflow-x-scroll",
          "prose-img:max-w-full",
        )}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </Wrapper>
  );
}
