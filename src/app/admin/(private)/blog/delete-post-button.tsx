"use client";

import { TrashIcon } from "@phosphor-icons/react/dist/csr/Trash";
import { useState } from "react";
import AlertDialog from "@/component/admin/alert-dialog";
import { useDeletePost } from "./hooks/use-delete-post";

type Props = { postTitle: string; postId: string };

export function DeletePostButton({ postTitle, postId }: Props) {
  const [open, setOpen] = useState(false);

  const { isProcessing, deletePost } = useDeletePost({
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
            Você quer apagar o post?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-sm text-foreground-alt">
            Esta é uma ação irreversível. A publicação será permanentemente
            removida dos registros. Tem certeza de que deseja apagar o post{" "}
            <span className="font-bold">"{postTitle}"</span>?
          </AlertDialog.Description>
        </div>
        <div className="flex w-full items-end justify-center gap-2">
          <AlertDialog.Close className="btn ghost">Cancelar</AlertDialog.Close>
          <button
            className="btn danger"
            type="submit"
            disabled={!postId || isProcessing}
            onClick={() => deletePost({ postId })}
          >
            {isProcessing ? "Apagando" : "Apagar"}
          </button>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
