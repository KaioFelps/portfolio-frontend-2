import type { Metadata } from "next";
import { Suspense } from "react";
import { AlertBlock } from "@/component/alert-block";
import { Main } from "@/component/main";
import SectionHeader from "@/component/section-header";
import { ServerResponseBoundary } from "@/component/server-response-boundary";
import { MetaUtilities } from "@/utils/meta";
import { tryOrServerInternalError } from "@/utils/try-or-server-internal-error";
import { type FetchBlogPostsQuery, fetchBlogPosts } from "./actions";
import { Content } from "./content";
import { BlogPostsFilterForm } from "./filter-form";
import { BlogSectionsSkeleton } from "./skeleton";
import { resolveQueryParameters } from "./utils";

export const metadata: Metadata = {
  title: await MetaUtilities.getTitle("Blog"),
  description:
    "Artigos sobre o que eu venho aprontando ou sobre coisas que, " +
    "aparentemente, todo mundo sabia, mas eu acabei de descobrir!",
  alternates: {
    canonical: await MetaUtilities.getCanonicalUrl("/blog"),
  },
};

type Props = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function BlogPostsPage({ searchParams }: Props) {
  const { q, qb } = await searchParams;
  const query = resolveQueryParameters({ query: q, queryBy: qb });

  return (
    <Main>
      <SectionHeader.Root hasActions>
        <SectionHeader.Heading>Blog</SectionHeader.Heading>
        <BlogPostsFilterForm />
      </SectionHeader.Root>

      <Suspense fallback={<BlogSectionsSkeleton />}>
        <InitialBlogPostsListWrapper query={query} />
      </Suspense>
    </Main>
  );
}

async function InitialBlogPostsListWrapper({
  query,
}: {
  query?: FetchBlogPostsQuery;
}) {
  const posts = await tryOrServerInternalError(fetchBlogPosts({ query }));

  return (
    <ServerResponseBoundary
      data={posts}
      fallbackComponent={({ error }) => (
        <AlertBlock type="danger">{error}</AlertBlock>
      )}
      component={({ data }) => (
        <Content initialData={data} postsQuery={query} />
      )}
    />
  );
}
