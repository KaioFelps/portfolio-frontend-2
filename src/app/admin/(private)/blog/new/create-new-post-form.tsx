"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { AdminRoutes } from "@/app/routes";
import Editor from "@/component/admin/editor";
import { AlertBlock } from "@/component/alert-block";
import FloatingInput from "@/component/floating-input";
import { AvailableTagsSelect } from "@/ui/admin/available-tags-select";
import { useFetchEveryTag } from "../../hooks/use-fetch-every-tag";
import { BlogPostPreviewDialog } from "../preview-dialog";
import { createPostSchema } from "../schemas";
import { usePublishPost } from "./hooks/use-publish-post";

export function CreateNewPostForm() {
  const { error, isSuccess, isError, isProcessing, publishPost } =
    usePublishPost({
      onSuccess: () => reset(),
    });

  const {
    isError: tagsCouldntLoad,
    isPending: tagsAreLoading,
    isSuccess: tagsLoadedSuccessfully,
    data: tagsData,
  } = useFetchEveryTag();

  const { register, control, formState, handleSubmit, watch, reset } = useForm({
    resolver: zodResolver(createPostSchema),
    values: {
      tagsIds: [],
      content: "",
      description: "",
      title: "",
      topstory: "",
    },
  });

  return (
    <>
      <h3 className="text-xl font-bold mb-3">Detalhes</h3>

      {isSuccess && (
        <AlertBlock type="success" full={false} className="mb-3">
          Post publicado com sucesso!
        </AlertBlock>
      )}

      {(isError &&
        error.error.validationMessages?.map((error) => (
          <FloatingInput.Error error={error} />
        ))) ??
        null}

      {isError && error.error.message && (
        <FloatingInput.Error error={error.error.message} />
      )}

      <form
        id="publish"
        className="mb-12"
        onSubmit={handleSubmit((data) => publishPost(data))}
      >
        <FloatingInput.Error error={formState.errors.title?.message} />
        <FloatingInput.Group className="mb-3">
          <FloatingInput.Input
            {...register("title")}
            className="w-full"
            placeholder="Título do post"
            type="text"
          />
          <FloatingInput.Label>Título</FloatingInput.Label>
        </FloatingInput.Group>

        <FloatingInput.Error error={formState.errors.description?.message} />
        <FloatingInput.Group className="mb-3">
          <FloatingInput.Input
            {...register("description")}
            className="w-full"
            placeholder="Preview/Descrição"
            type="text"
          />
          <FloatingInput.Label>Preview/Descrição</FloatingInput.Label>
        </FloatingInput.Group>

        {tagsLoadedSuccessfully && tagsData.tags.length ? (
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
        ) : (
          <AlertBlock type="warning" full className="mb-3">
            Ainda não há tags registradas. Você precisará{" "}
            <a className="font-bold" href="/admin/tags/novo">
              criar uma tag
            </a>{" "}
            antes!
          </AlertBlock>
        )}
        {tagsAreLoading && <FloatingInput.Skeleton isSelect />}
        {tagsCouldntLoad && (
          <AlertBlock type="warning" full className="mb-3">
            Não foi possível carregar as tags existentes.
          </AlertBlock>
        )}

        <FloatingInput.Error error={formState.errors.topstory?.message} />
        <FloatingInput.Group className="mb-3">
          <FloatingInput.Input
            {...register("topstory")}
            className="w-full"
            placeholder="i.imgur.com/..."
            type="text"
          />
          <FloatingInput.Label>Imagem de capa</FloatingInput.Label>
        </FloatingInput.Group>
      </form>

      <h3 className="text-xl font-bold mb-16">Editor</h3>

      <Controller
        control={control}
        name="content"
        render={({ field: { value, onChange, ref }, fieldState }) => (
          <>
            <FloatingInput.Error error={fieldState.error?.message} />
            <Editor.RichTextEditor
              ref={ref}
              initialContent={value}
              onChange={onChange}
            />
          </>
        )}
      />

      <div className="flex gap-2 mt-4">
        <Link href={AdminRoutes.posts.manage} className="btn ghost">
          Cancelar
        </Link>
        <BlogPostPreviewDialog html={watch("content")} />
        <button
          form="publish"
          type="submit"
          disabled={isProcessing}
          className="btn default"
        >
          {isProcessing ? "Postando" : "Postar"} publicação
        </button>
      </div>
    </>
  );
}
