import type { Metadata } from "next";
import { MetaUtilities } from "@/utils/meta";
import { CreateNewTagAnchor } from "./create-new-tag-anchor";
import { TagsSection } from "./tags";
import { TagsPagination } from "./tags-pagination";

export const metadata: Metadata = {
  title: await MetaUtilities.getTitle("Tags", true),
};

export default function AdminProjectsPage() {
  return (
    <>
      <header className="mb-12 flex items-center justify-between">
        <h1>Tags</h1>
        <CreateNewTagAnchor />
      </header>
      {/* TODO: add filter */}
      <TagsSection />
      <TagsPagination />
    </>
  );
}
