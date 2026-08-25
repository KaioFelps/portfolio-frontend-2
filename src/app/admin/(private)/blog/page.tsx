import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AdminRoutes } from "@/app/routes";
import { MetaUtilities } from "@/utils/meta";
import { BlogPosts } from "./posts";
import { BlogPostsPagination } from "./posts-pagintion";

export const metadata: Metadata = {
  title: await MetaUtilities.getTitle("Novo Post", true),
};

export default function AdminHomePage() {
  return (
    <>
      <header className="mb-12 flex items-center justify-between">
        <h1>Blog Posts</h1>
        <Link href={AdminRoutes.posts.new} className="btn default">
          Novo post
        </Link>
      </header>

      <Suspense fallback={<div className="mb-12" />}>
        <BlogPosts />
      </Suspense>
      <Suspense fallback={null}>
        <BlogPostsPagination />
      </Suspense>
    </>
  );
}
