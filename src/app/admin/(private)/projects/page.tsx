import type { Metadata } from "next";
import { MetaUtilities } from "@/utils/meta";
import { CreateNewProjectAnchor } from "./create-new-project-anchor";
import { ProjectsSection } from "./projects";
import { ProjectsPagination } from "./projects-pagination";

export const metadata: Metadata = {
  title: await MetaUtilities.getTitle("Projetos", true),
};

export default function AdminProjectsPage() {
  return (
    <>
      <header className="mb-12 flex items-center justify-between">
        <h1>Projetos</h1>
        <CreateNewProjectAnchor />
      </header>

      <ProjectsSection />
      <ProjectsPagination />
    </>
  );
}
