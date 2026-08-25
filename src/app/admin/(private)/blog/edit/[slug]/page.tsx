import type { Metadata } from "next";
import { AlertBlock } from "@/component/alert-block";
import { MetaUtilities } from "@/utils/meta";
import { EditPostForm } from "./edit-post-form";

export const metadata: Metadata = {
  title: await MetaUtilities.getTitle("Editar Blogpost", true),
};

type Props = {
  params: Promise<Record<string, string | undefined>>;
};

export default async function AdminEditProjectPage({ params }: Props) {
  const { slug } = await params;

  return (
    <>
      <h1 className="mb-12">Editando post</h1>

      {slug ? (
        <EditPostForm postSlug={slug} />
      ) : (
        <AlertBlock type="danger" className="mb-0" full>
          O slug do blogpost não foi informado devido a um acesso inesperado a
          essa página.
        </AlertBlock>
      )}
    </>
  );
}
