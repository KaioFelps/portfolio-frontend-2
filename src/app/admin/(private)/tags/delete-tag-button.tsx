"use client";

import { TrashIcon } from "@phosphor-icons/react/dist/csr/Trash";
import { useState } from "react";
import AlertDialog from "@/component/admin/alert-dialog";
import type { Tag } from "@/core/types/presented-entities/tag";
import { useDeleteTag } from "./hooks/use-delete-tag";

type Props = { tag: Tag };

export function DeleteTagButton({ tag }: Props) {
  const [open, setOpen] = useState(false);

  const { isProcessing, deleteTag } = useDeleteTag();

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger className="text-red-600 p-1.5 rounded-lg hover:bg-red-600/20">
        <TrashIcon size="20" weight="bold" />
      </AlertDialog.Trigger>

      <AlertDialog.Content onClickOnOverlay={() => setOpen(false)}>
        <div className="flex flex-col gap-4 pb-6">
          <AlertDialog.Title className="text-lg font-semibold tracking-tight">
            Você quer apagar essa tag?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-sm text-foreground-alt">
            Esta é uma ação irreversível. A tag será permanentemente removida
            removido dos registros, e todos os projetos e blogposts serão
            desassociados dela (mas não removidos). Tem certeza de que deseja
            apagar a tag <span className="font-bold">"{tag.value}"</span>?
          </AlertDialog.Description>
        </div>
        <div className="flex w-full items-end justify-center gap-2">
          <AlertDialog.Close className="btn ghost">Cancelar</AlertDialog.Close>
          <AlertDialog.Close
            render={({ onClick, ...props }) => (
              <button
                {...props}
                className="btn danger"
                type="submit"
                disabled={!tag?.id || isProcessing}
                onClick={(e) => {
                  deleteTag({ tagId: tag.id });
                  return onClick?.(e);
                }}
              >
                {isProcessing ? "Apagando" : "Apagar"}
              </button>
            )}
          />
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
