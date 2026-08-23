"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { AdminRoutes } from "@/app/routes";
import FloatingInput from "@/component/floating-input";
import { useFetchEveryTag } from "../../hooks/use-fetch-every-tag";
import { AddNewProjectLinkForm } from "../ui/add-new-project-link-form";
import { AvailableTagsSelect } from "../ui/available-tags-select";
import { useCreateProject } from "./hooks/use-create-project";
import { createProjectSchema } from "./schema";

export function CreateNewProjectForm() {
  const {
    isError: tagsCouldntLoad,
    isPending: tagsAreLoading,
    data: tagsData,
  } = useFetchEveryTag();

  const { formState, register, handleSubmit, control, reset, watch } = useForm({
    resolver: zodResolver(createProjectSchema),
    values: {
      links: [],
      tagsIds: [],
      title: "",
      topstory: "",
    },
  });

  const {
    isProcessing,
    error,
    isSuccess,
    isError,
    createProject,
    reset: resetProjectCreation,
  } = useCreateProject({
    onSuccess: () => reset(),
  });

  const submitIsDisabled =
    isProcessing ||
    isError ||
    tagsAreLoading ||
    tagsCouldntLoad ||
    !tagsData?.tags?.length;

  useEffect(() => {
    const subscription = watch((_values, _defaultValues) => {
      if (isError || isSuccess) resetProjectCreation();
    });

    return () => subscription.unsubscribe();
  }, [watch, isError, isSuccess, resetProjectCreation]);

  return (
    <>
      {isSuccess && (
        <span className="success alert mb-3 py-2">
          Projeto criado com sucesso!
        </span>
      )}

      {error &&
        (Array.isArray(error.error) ? (
          error.error.map((error) => (
            <span className="danger alert mb-3 py-2">{error}</span>
          ))
        ) : (
          <span className="danger alert mb-3 py-2">{error.error}</span>
        ))}

      {/* gotta be like this cuz AddNewProjectLinkForm is also a form, and forms cant be nested */}
      <form
        id="main-form"
        onSubmit={handleSubmit((data) => createProject(data))}
        onChange={() => resetProjectCreation()}
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
                selectedTagsIds={value}
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
                links={value}
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
            {isProcessing ? "Publicando" : "Publicar"} projeto
          </button>
        </div>
      </div>
    </>
  );
}
