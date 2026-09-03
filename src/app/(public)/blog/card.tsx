"use client";

import { LinkSimpleIcon } from "@phosphor-icons/react/dist/ssr/LinkSimple";
import clsx from "clsx";
import Link from "next/link";
import type { MouseEventHandler } from "react";
import type { BlogPost } from "@/core/types/presented-entities/blog-post";
import toast from "@/lib/toast";

export function ArticleCard({
  post,
  navigate,
}: {
  post: BlogPost;
  navigate: (href: string) => void;
}) {
  const href = `/blog/${post.slug}`;

  const handleCopyArticleUrl: MouseEventHandler = async (_) => {
    const url = new URL(href, window.location.href);
    await navigator.clipboard.writeText(url.toString());
    toast.add({ description: "Link copiado!" });
  };

  return (
    <div
      className={clsx(
        "relative group/parent transition-all",
        "cursor-default p-6 rounded-lg bg-gray-100 dark:bg-d-gray-100 border",
        "border-gray-300 dark:border-none flex gap-6 mb-2 last:mb-0 w-full",
        "hover:-translate-y-1 hover:z-10 hover:scale-[1.005] hover:shadow-lg",
      )}
    >
      <Link
        role="button"
        href={href}
        className="absolute inset-0 z-0"
        aria-label={post.title}
      />

      <img
        src={post.topstory}
        className="min-w-66 h-32 object-cover rounded-lg max-md:hidden relative z-10"
        alt=""
      />

      <div className="w-full">
        <div className="flex items-start justify-between gap-4">
          <Link role="button" href={href}>
            <h3
              className={clsx(
                "text-[20px] font-bold relative",
                "group-hover/parent:text-blue-500 transition-all",
                "after:absolute after:-translate-x-1/2 after:left-1/2 after:bottom-0.5",
                "after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all",
                "hover:after:w-full",
              )}
            >
              {post.title}
            </h3>
          </Link>
          <button
            className="relative z-10 text-blue-500 p-1.5 btn not-dark:hover:bg-black/5 dark:hover:bg-white/5"
            title="Copiar link do post"
            type="button"
            onClick={handleCopyArticleUrl}
          >
            <LinkSimpleIcon size="20" weight="bold" />
          </button>
        </div>

        <p className="text-gray-600 dark:text-d-gray-600 font-medium mb-6 mt-1">
          {post.description}
        </p>

        <div className="flex gap-2 flex-wrap">
          <span className="text-gray-600 dark:text-d-gray-600 px-2 py-1.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 leading-none text-sm">
            {new Date(post.publishedAt!).toLocaleString("pt-Br", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>

          {post.tags.map((tag) => (
            <button
              type="button"
              key={`post-${post.id}-blog-article-card-tag-${tag.id}`}
              onClick={(_event) => {
                navigate(`/blog?q=${tag.value}&qb=tag`);
              }}
              className="px-2 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500 leading-none text-sm text-yellow-700"
            >
              {tag.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
