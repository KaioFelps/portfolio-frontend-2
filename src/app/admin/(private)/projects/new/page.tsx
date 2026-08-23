import type { Metadata } from "next";
import { MetaUtilities } from "@/utils/meta";
import { CreateNewProjectForm } from "./create-new-project-form";

export const metadata: Metadata = {
  title: await MetaUtilities.getTitle("Novo Projeto", true),
};

export default function AdminNewProjectPage() {
  return (
    <>
      <h1 className="mb-12">Novo projeto</h1>
      <CreateNewProjectForm />
    </>
  );
}
