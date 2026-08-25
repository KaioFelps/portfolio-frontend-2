"use client";

import { TrashIcon } from "@phosphor-icons/react/dist/csr/Trash";
import { useState } from "react";
import AlertDialog from "@/component/admin/alert-dialog";
import { useDeleteProject } from "./hooks/use-delete-project";

type Props = { projectTitle: string; projectId: string };

export function DeleteProjectButton({ projectTitle, projectId }: Props) {
  const [open, setOpen] = useState(false);

  const { isProcessing, deleteProject } = useDeleteProject({
    onSuccess: () => setOpen(false),
  });

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger className="text-red-600 p-1.5 rounded-lg hover:bg-red-600/20">
        <TrashIcon size="20" weight="bold" />
      </AlertDialog.Trigger>

      <AlertDialog.Content onClickOnOverlay={() => setOpen(false)}>
        <div className="flex flex-col gap-4 pb-6">
          <AlertDialog.Title className="text-lg font-semibold tracking-tight">
            Você quer apagar o projeto?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-sm text-foreground-alt">
            Esta é uma ação irreversível. O projeto será permanentemente
            removido dos registros. Tem certeza de que deseja apagar o projeto{" "}
            <span className="font-bold">"{projectTitle}"</span>?
          </AlertDialog.Description>
        </div>
        <div className="flex w-full items-end justify-center gap-2">
          <AlertDialog.Close className="btn ghost">Cancelar</AlertDialog.Close>
          <button
            className="btn danger"
            type="submit"
            disabled={!projectId || isProcessing}
            onClick={() => deleteProject({ projectId })}
          >
            {isProcessing ? "Apagando" : "Apagar"}
          </button>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
