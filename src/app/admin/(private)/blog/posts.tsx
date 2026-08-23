"use client";

import { PencilIcon } from "@phosphor-icons/react/dist/icons/Pencil";
import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr/ArrowSquareOut";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { AdminRoutes } from "@/app/routes";
import { AlertBlock } from "@/component/alert-block";
import Skeleton from "@/component/skeleton";
import { useFetchPosts } from "./hooks/use-fetch-posts";
import { TogglePostVisibility } from "./toggle-post-visibility";

export function BlogPosts() {
  const { data, isSuccess, isError, isLoading } = useFetchPosts();

  if (isError) {
    return (
      <span className="mx-auto danger alert text-center w-full">
        Não foi possível carregar os blogposts existentes.
      </span>
    );
  }

  if (isLoading)
    return (
      <Wrapper>
        <Skeleton.ListRow className="min-w-3/4" />
        <Skeleton.ListRow className="min-w-1/3" />
        <Skeleton.ListRow className="min-w-3/7" />
      </Wrapper>
    );

  if (!isSuccess) return null;

  if (data.posts.length > 0) {
    return (
      <Wrapper>
        {data.posts.map((post) => (
          <div
            key={`admin-blogposts-post-${post.id}`}
            className="grid grid-cols-10 px-4 py-2.5 gap-4 rounded-2xl bg-white/5"
          >
            <span
              className="col-span-6 font-medium line-clamp-1 self-center"
              title={post.title}
            >
              {post.title}
            </span>

            <div className="col-span-3 flex items-center gap-3">
              <TogglePostVisibility
                postId={post.id}
                publishedAt={
                  !post.publishedAt ? null : new Date(post.publishedAt)
                }
              />
            </div>

            <div className="col-span-1 flex items-center justify-end gap-1">
              <Link
                className="text-blue-500 p-1.5 rounded-lg"
                href={`/blog/${post.slug}`}
                title={`Visualizar post ${post.title}`}
                target="_blank"
                rel="noopener"
              >
                <ArrowSquareOutIcon size="20" weight="bold" />
              </Link>
              <Link
                className="p-1.5 rounded-lg"
                href={AdminRoutes.posts.edit(post.id)}
              >
                <PencilIcon size="20" weight="fill" />
              </Link>
            </div>
          </div>
        ))}
      </Wrapper>
    );
  }

  return (
    <AlertBlock type="danger" className="mb-0" full>
      <p>
        Não há nenhum blogpost. Experimente{" "}
        <Link className="font-bold" href={AdminRoutes.posts.new}>
          criar um
        </Link>
        !
      </p>
    </AlertBlock>
  );
}

function Wrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-1">
      <header className="grid grid-cols-10 gap-4 p-4">
        <span className="col-span-6 font-medium">Artigo</span>
        <span className="col-span-3 font-medium">Publicada</span>
        <span className="col-span-1 font-medium justify-self-end">Ações</span>
      </header>
      {children}
    </div>
  );
}
