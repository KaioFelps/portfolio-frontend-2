"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon } from "@phosphor-icons/react/dist/csr/Pencil";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AlertDialog from "@/component/admin/alert-dialog";
import { AlertBlock } from "@/component/alert-block";
import FloatingInput from "@/component/floating-input";
import type { Tag } from "@/core/types/presented-entities/tag";
import { getChangedFields } from "@/lib/react-hook-form";
import { useEditTag } from "./hooks/use-edit-tag";
import { type EditTagFormData, editTagSchema } from "./schemas";

export type Props = {
  tag: Tag;
};

export function EditTagDialog({ tag }: Props) {
  const [open, setOpen] = useState(false);

  const { isProcessing, editTag, isError, error } = useEditTag({
    tagId: tag.id,
    onSuccess: () => {
      setOpen(false);
      setTimeout(() => {
        reset();
      }, 200);
    },
  });

  const { register, formState, reset, handleSubmit } = useForm({
    resolver: zodResolver(editTagSchema),
    values: { value: tag.value },
  });

  const handleEditTag = (data: EditTagFormData) => {
    const patch = getChangedFields(formState.dirtyFields, data);

    if (!Object.keys(patch).length) {
      setOpen(false);
      return;
    }

    editTag({ id: tag.id, ...patch });
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger className="text-white">
        <PencilIcon size="20" weight="bold" />
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <div className="flex flex-col gap-4 pb-6">
          <AlertDialog.Title className="text-lg font-semibold tracking-tight">
            Editando a tag {tag.value}
          </AlertDialog.Title>
        </div>

        {isError && error.error.validationMessages && (
          <div>
            {error.error.validationMessages?.map((message) => (
              <AlertBlock
                key={`edit-tag-${tag.id}-server-error-${message}`}
                type="danger"
                full={false}
                className="mb-2 last:mb-4"
              >
                {message}
              </AlertBlock>
            ))}
          </div>
        )}

        {isError && error.error.message && (
          <AlertBlock type="danger" full={false} className="mb-4">
            {error.error.message}
          </AlertBlock>
        )}

        <div className="flex w-full items-end justify-center gap-2">
          <form className="w-full" onSubmit={handleSubmit(handleEditTag)}>
            <input type="hidden" name="_id" value={tag.id} />

            <FloatingInput.Group className="mb-4">
              <FloatingInput.Input
                className="w-full"
                type="text"
                disabled
                value={tag.id}
              />
              <FloatingInput.Label>ID</FloatingInput.Label>
            </FloatingInput.Group>

            <FloatingInput.Error error={formState.errors.value?.message} />
            <FloatingInput.Group className="mb-4">
              <FloatingInput.Input
                {...register("value")}
                className="w-full"
                placeholder="Rust"
                type="text"
              />
              <FloatingInput.Label>Tag</FloatingInput.Label>
            </FloatingInput.Group>

            <div className="flex gap-2 items-center">
              <AlertDialog.Close className="btn ghost">
                Cancelar
              </AlertDialog.Close>

              <button
                type="submit"
                className="btn default"
                disabled={!tag.id || isProcessing}
              >
                {isProcessing ? "Editando" : "Editar"}
              </button>
            </div>
          </form>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
