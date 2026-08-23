"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { AdminRoutes } from "@/app/routes";
import { AlertBlock } from "@/component/alert-block";
import FloatingInput from "@/component/floating-input";
import { getChangedFields } from "@/lib/react-hook-form";
import toast from "@/lib/toast";
import { useFetchEveryTag } from "../../../hooks/use-fetch-every-tag";
import { useFindProject } from "../../hooks/use-find-project";
import { AddNewProjectLinkForm } from "../../ui/add-new-project-link-form";
import { AvailableTagsSelect } from "../../ui/available-tags-select";
import { useEditProject } from "./hooks/use-edit-project";
import { type EditProjectFormData, editProjectSchema } from "./schema";

type Props = {
  projectId: string;
};

export function EditProjectForm({ projectId }: Props) {
  const {
    isError: tagsCouldntLoad,
    isPending: tagsAreLoading,
    data: tagsData,
  } = useFetchEveryTag();

  const {
    data: projectData,
    isError: projectCouldntLoad,
    isLoading: loadingProject,
    error: projectError,
  } = useFindProject({ projectId });

  const { formState, register, handleSubmit, control, reset, watch } = useForm({
    resolver: zodResolver(editProjectSchema),
    values: {
      links: projectData?.project?.links ?? [],
      tagsIds: projectData?.project?.tags.map((tag) => tag.id) ?? [],
      title: projectData?.project?.title ?? "",
      topstory: projectData?.project?.topstory ?? "",
    },
  });

  const {
    isProcessing,
    error,
    isSuccess,
    isError,
    editProject,
    reset: resetProjectEditing,
  } = useEditProject({
    projectId,
    onSuccess: () => reset(),
  });

  const submitIsDisabled =
    isProcessing ||
    tagsAreLoading ||
    tagsCouldntLoad ||
    !tagsData?.tags?.length;

  useEffect(() => {
    const subscription = watch((_values, _defaultValues) => {
      if (isError || isSuccess) resetProjectEditing();
    });

    return () => subscription.unsubscribe();
  }, [watch, isError, isSuccess, resetProjectEditing]);

  const handleEditProject = (data: EditProjectFormData) => {
    const changedValuesToPatch = getChangedFields(formState.dirtyFields, data);

    if (!Object.keys(changedValuesToPatch).length) {
      toast.add({ description: "Não há alterações para salvar." });
      resetProjectEditing;
      return;
    }

    editProject({ id: projectId, ...changedValuesToPatch });
  };

  if (projectCouldntLoad) {
    return (
      <AlertBlock type="danger" className="mb-0" full>
        {projectError.error}
      </AlertBlock>
    );
  }

  if (loadingProject) return <FormSkeleton />;

  if (!projectData?.project) {
    return (
      <AlertBlock type="warning" className="mb-0" full>
        Não foi encontrado nenhum projeto com esse ID.
      </AlertBlock>
    );
  }

  return (
    <>
      {isSuccess && (
        <AlertBlock type="success">Projeto editado com sucesso!</AlertBlock>
      )}

      {error?.error.validationMessages?.map((error) => (
        <AlertBlock type="danger">{error}</AlertBlock>
      )) ?? null}

      {error?.error.message && (
        <AlertBlock type="danger">{error.error.message}</AlertBlock>
      )}

      {/* gotta be like this cuz AddNewProjectLinkForm is also a form, and forms cant be nested */}
      <form
        id="main-form"
        onSubmit={handleSubmit(handleEditProject)}
        onChange={() => resetProjectEditing()}
      />

      <div>
        <FloatingInput.Error error={formState.errors.title?.message} />
        <FloatingInput.Group className="mb-3">
          <FloatingInput.Input
            {...register("title")}
            className="w-full"
            placeholder="Nome do projeto"
            type="text"
            form="main-form"
          />
          <FloatingInput.Label>Nome do projeto</FloatingInput.Label>
        </FloatingInput.Group>

        <FloatingInput.Error error={formState.errors.topstory?.message} />
        <FloatingInput.Group className="mb-3">
          <FloatingInput.Input
            {...register("topstory")}
            className="w-full"
            placeholder="i.imgur.com"
            type="text"
            form="main-form"
          />
          <FloatingInput.Label>Imagem de capa</FloatingInput.Label>
        </FloatingInput.Group>

        <Controller
          control={control}
          name="tagsIds"
          render={({ field: { value, onChange, ...field }, fieldState }) => (
            <>
              <FloatingInput.Error error={fieldState.error?.message} />
              <AvailableTagsSelect
                {...field}
                onSelectTagsIds={onChange}
                selectedTagsIds={value!}
              />
            </>
          )}
        />

        <Controller
          control={control}
          name="links"
          render={({ field: { value, onChange, ...field }, fieldState }) => (
            <>
              <FloatingInput.Error error={fieldState.error?.message} />
              <AddNewProjectLinkForm
                {...field}
                links={value!}
                setLinks={onChange}
              />
            </>
          )}
        />

        <div className="flex gap-2 mt-4">
          <Link href={AdminRoutes.projects.manage} className="btn ghost">
            Cancelar
          </Link>

          <button
            form="main-form"
            type="submit"
            disabled={submitIsDisabled}
            suppressHydrationWarning
            className="btn default"
          >
            {isProcessing ? "Salvando" : "Editar"} projeto
          </button>
        </div>
      </div>
    </>
  );
}

function FormSkeleton() {
  return null;
}
