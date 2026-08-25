import type { Metadata } from "next";
import { MetaUtilities } from "@/utils/meta";
import { CreateNewPostForm } from "./create-new-post-form";

export const metadata: Metadata = {
  title: await MetaUtilities.getTitle("Novo post", true),
};

export default function AdminNewProjectPage() {
  return (
    <>
      <h1 className="mb-12">Nova publicação</h1>
      <CreateNewPostForm />
    </>
  );
}
