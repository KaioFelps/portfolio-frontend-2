"use client";

import { SpinnerIcon } from "@phosphor-icons/react/dist/ssr/Spinner";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { AlertBlock } from "@/component/alert-block";
import type { PaginatedResponse } from "@/core/types/paginated-response";
import type { BlogPost } from "@/core/types/presented-entities/blog-post";
import toast from "@/lib/toast";
import { type FetchBlogPostsQuery, fetchBlogPosts } from "./actions";
import { ArticleCard } from "./card";
import { segregatePostsByPublishmentDate } from "./utils";

type Props = {
  initialData: PaginatedResponse<{ posts: BlogPost[] }>;
  postsQuery?: FetchBlogPostsQuery;
};

export function Content({ initialData, postsQuery: query }: Props) {
  const [postsPerDate, setPostsPerDate] = useState<Record<string, BlogPost[]>>(
    {},
  );
  const [postsCount, setPostsCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    setPostsPerDate(segregatePostsByPublishmentDate(initialData.posts));
    setPostsCount(initialData.posts.length);
    setHasMore(initialData.posts.length < initialData.totalCount);
    setPage(initialData.page);
  }, [initialData.posts, initialData.totalCount, initialData.page]);

  const loadMoreAction = async () => {
    const nextPage = page + 1;
    const newPosts = await fetchBlogPosts({ query, page: nextPage });

    if (!newPosts.success) {
      toast.danger({ description: "Ups! Algo deu errado..." });
      return;
    }

    let currentPostsAmount = postsCount;

    if (newPosts.data.posts.length > 0) {
      currentPostsAmount += newPosts.data.posts.length;

      setPostsPerDate((prev) =>
        segregatePostsByPublishmentDate(prev, newPosts.data.posts),
      );
    }

    setHasMore(currentPostsAmount < newPosts.data.totalCount);
    setPostsCount(currentPostsAmount);

    if (hasMore) setPage(nextPage);
  };

  if (postsCount === 0) {
    const message = query
      ? "Não foi encontrado nenhum post desse tipo."
      : "Ainda não publiquei nenhum post 💅";

    return <AlertBlock type="warning">{message}</AlertBlock>;
  }

  return (
    <div className="mt-16 w-full">
      {Object.entries(postsPerDate).map(([date, posts]) => (
        <div
          className="mb-16 last-of-type:mb-0"
          key={`blog-publishment-date-section-${date}`}
        >
          <h2 className="capitalize text-2xl font-bold mb-6">
            <span className="sr-only">Publicações de </span>
            {date}
          </h2>

          {posts.map((post) => (
            <ArticleCard
              key={`blog-article-card-for-post-${post.id}`}
              post={post}
              navigate={(href) => router.push(href)}
            />
          ))}
        </div>
      ))}

      {hasMore && (
        <button
          className="btn default text-xl font-bold px-16 mx-auto mt-6 disabled:opacity-50"
          onClick={() => startTransition(loadMoreAction)}
          disabled={pending}
          aria-disabled={pending}
          type="button"
        >
          {pending ? (
            <>
              <SpinnerIcon
                size={24}
                weight="bold"
                className="animate-spin ml-2"
              />
              Carregando
            </>
          ) : (
            "Carregar mais postagens"
          )}
        </button>
      )}
    </div>
  );
}
