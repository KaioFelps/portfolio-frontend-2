import type { Metadata } from "next";
import { Suspense } from "react";
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
  return (
    <>
      <h1 className="mb-12">Editando post</h1>

      <Suspense fallback={null}>
        <Content params={params} />
      </Suspense>
    </>
  );
}

async function Content({ params }: Props) {
  const { slug } = await params;

  if (slug) return <EditPostForm postSlug={slug} />;

  return (
    <AlertBlock type="danger" className="mb-0" full>
      O slug do blogpost não foi informado devido a um acesso inesperado a essa
      página.
    </AlertBlock>
  );
}
