import type { Metadata } from "next";
import { Suspense } from "react";
import { AlertBlock } from "@/component/alert-block";
import { Main } from "@/component/main";
import { ServerResponseBoundary } from "@/component/server-response-boundary";
import { MetaUtilities } from "@/utils/meta";
import { tryOrServerInternalError } from "@/utils/try-or-server-internal-error";
import { getPostBySlug } from "./actions";
import { Content } from "./content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPostBySlug({ slug });

  if (!data.success || !data.data) {
    return {
      title: await MetaUtilities.getTitle("Post não encontrado"),
      description:
        "O conteúdo que você está procurando não existe ou foi removido.",
      alternates: {
        canonical: await MetaUtilities.getCanonicalUrl("/blog"),
      },
    };
  }

  const post = data.data;

  return {
    title: await MetaUtilities.getTitle(post.title),
    description: post.description,
    alternates: {
      canonical: await MetaUtilities.getCanonicalUrl(`/blog/${post.slug}`),
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: await MetaUtilities.getCanonicalUrl(`/blog/${post.slug}`),
      images: post.topstory ? [post.topstory] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.topstory ? [post.topstory] : [],
    },
  };
}
export default async function BlogPostArticlePage({ params }: Props) {
  const { slug } = await params;

  return (
    <Main>
      <Suspense fallback={null}>
        <InitialBlogPostsListWrapper slug={slug} />
      </Suspense>
    </Main>
  );
}

async function InitialBlogPostsListWrapper({ slug }: { slug: string }) {
  const post = await tryOrServerInternalError(getPostBySlug({ slug }));

  return (
    <ServerResponseBoundary
      data={post}
      fallbackComponent={({ error }) => (
        <AlertBlock type="danger">{error}</AlertBlock>
      )}
      component={({ data }) => <Content post={data} />}
    />
  );
}
