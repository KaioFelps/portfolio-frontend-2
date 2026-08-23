"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AdminRoutes } from "@/app/routes";
import { AlertBlock } from "@/component/alert-block";
import FloatingInput from "@/component/floating-input";
import { useCreateTag } from "./hooks/use-create-tag";
import { createTagSchema } from "./schema";

export function CreateNewTagForm() {
  const {
    isSuccess,
    isProcessing,
    error,
    createTag,
    isError,
    reset: resetMutation,
  } = useCreateTag({ onSuccess: () => reset() });

  const { formState, register, handleSubmit, reset, watch } = useForm({
    resolver: zodResolver(createTagSchema),
  });

  useEffect(() => {
    const subscription = watch(() => {
      if (isError || isSuccess) resetMutation();
    });

    return () => subscription.unsubscribe();
  }, [watch, isError, isSuccess, resetMutation]);

  return (
    <>
      {isSuccess && (
        <AlertBlock type="success" className="mb-3">
          Tag criada com sucesso!{" "}
        </AlertBlock>
      )}

      <form onSubmit={handleSubmit((data) => createTag(data))}>
        {error?.error?.validationMessages?.map((message) => (
          <AlertBlock
            type="danger"
            key={`create-tag-validation-error-${message}`}
            className="mb-2 mt-4"
            full={false}
          >
            {message}
          </AlertBlock>
        )) ?? null}

        {error?.error?.message && (
          <AlertBlock type="danger" className="mb-2 mt-4" full={false}>
            {error.error.message}
          </AlertBlock>
        )}

        <FloatingInput.Error error={formState.errors.value?.message} />
        <FloatingInput.Group className="mb-3">
          <FloatingInput.Input
            {...register("value")}
            className="w-full"
            placeholder="Rust"
            type="text"
          />
          <FloatingInput.Label>Tag</FloatingInput.Label>
        </FloatingInput.Group>

        <div className="flex gap-2 mt-4">
          <Link href={AdminRoutes.tags.manage} className="btn ghost">
            Cancelar
          </Link>
          <button type="submit" disabled={isProcessing} className="btn default">
            {isProcessing ? "Criando" : "Criar"} tag
          </button>
        </div>
      </form>
    </>
  );
}
