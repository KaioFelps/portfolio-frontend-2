import type { Metadata } from "next";
import { AlertBlock } from "@/component/alert-block";
import { MetaUtilities } from "@/utils/meta";
import { EditProjectForm } from "./edit-project-form";

export const metadata: Metadata = {
  title: await MetaUtilities.getTitle("Editar Projeto", true),
};

type Props = {
  params: Promise<Record<string, string | undefined>>;
};

export default async function AdminEditProjectPage({ params }: Props) {
  const { id } = await params;

  return (
    <>
      <h1 className="mb-12">Editando projeto</h1>

      {id ? (
        <EditProjectForm projectId={id} />
      ) : (
        <AlertBlock type="danger" className="mb-0" full>
          O ID do projeto não foi informado devido a um acesso inesperado a essa
          página.
        </AlertBlock>
      )}
    </>
  );
}
