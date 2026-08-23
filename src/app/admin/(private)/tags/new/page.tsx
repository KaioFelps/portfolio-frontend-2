import type { Metadata } from "next";
import { MetaUtilities } from "@/utils/meta";
import { CreateNewTagForm } from "./create-new-tag-form";

export const metadata: Metadata = {
  title: await MetaUtilities.getTitle("Nova Tag", true),
};

export default function AdminCreateTagPage() {
  return (
    <>
      <h1 className="mb-12">Criar tag</h1>
      <CreateNewTagForm />
    </>
  );
}
