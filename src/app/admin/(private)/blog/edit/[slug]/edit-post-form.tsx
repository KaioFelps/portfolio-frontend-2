"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { AdminRoutes } from "@/app/routes";
import Editor from "@/component/admin/editor";
import { AlertBlock } from "@/component/alert-block";
import FloatingInput from "@/component/floating-input";
import { getChangedFields } from "@/lib/react-hook-form";
import toast from "@/lib/toast";
import { AvailableTagsSelect } from "@/ui/admin/available-tags-select";
import { useFetchEveryTag } from "../../../hooks/use-fetch-every-tag";
import { BlogPostPreviewDialog } from "../../preview-dialog";
import { type EditPostFormData, editPostSchema } from "../../schemas";
import { useEditPost } from "./hooks/use-edit-post";
import { useFindExpandedPost } from "./hooks/use-find-expanded-post";

type Props = {
  postSlug: string;
};

export function EditPostForm({ postSlug }: Props) {
  const {
    isSuccess: tagsLoadedSuccessfully,
    isError: tagsCouldntLoad,
    isPending: tagsAreLoading,
    data: tagsData,
  } = useFetchEveryTag();

  const {
    data: postData,
    isError: postCouldntLoad,
    isLoading: loadingPost,
    error: postError,
  } = useFindExpandedPost({ postSlug });

  const { formState, register, handleSubmit, control, reset, watch } = useForm({
    resolver: zodResolver(editPostSchema),
    values: {
      title: postData?.post?.title ?? "",
      content: postData?.post?.content ?? "",
      topstory: postData?.post?.topstory ?? "",
      description: postData?.post?.description,
      tagsIds: postData?.post?.tags.map((tag) => tag.id) ?? [],
    },
  });

  const {
    isProcessing,
    error,
    isSuccess,
    isError,
    editPost,
    reset: resetPostEditing,
  } = useEditPost({
    postSlug,
    onSuccess: () => reset(),
  });

  const submitIsDisabled =
    isProcessing ||
    tagsAreLoading ||
    tagsCouldntLoad ||
    !tagsData?.tags?.length;

  const content = watch("content");

  useEffect(() => {
    const subscription = watch((_values, _defaultValues) => {
      if (isError || isSuccess) resetPostEditing();
    });

    return () => subscription.unsubscribe();
  }, [watch, isError, isSuccess, resetPostEditing]);

  const handleEditPost = (data: EditPostFormData) => {
    const changedValuesToPatch = getChangedFields(formState.dirtyFields, data);

    if (!Object.keys(changedValuesToPatch).length) {
      toast.add({ description: "Não há alterações para salvar." });
      resetPostEditing;
      return;
    }

    if (!postData?.post?.id) {
      const description =
        "O ID do post não foi encontrado e, logo, ele não pode ser atualizado.";
      toast.danger({ description });
      resetPostEditing;
      return;
    }

    editPost({ id: postData.post.id, ...changedValuesToPatch });
  };

  if (postCouldntLoad) {
    return (
      <AlertBlock type="danger" className="mb-0" full>
        {postError.error}
      </AlertBlock>
    );
  }

  if (loadingPost) return <FormSkeleton />;

  if (!postData?.post) {
    return (
      <AlertBlock type="warning" className="mb-0" full>
        Não foi encontrado nenhum post com esse ID.
      </AlertBlock>
    );
  }

  return (
    <>
      {isSuccess && (
        <AlertBlock type="success" full={false} className="mb-3">
          Post editado com sucesso!
        </AlertBlock>
      )}

      {error?.error.message && (
        <AlertBlock type="danger">{error.error.message}</AlertBlock>
      )}

      {(isError &&
        error.error.validationMessages?.map((error) => (
          <FloatingInput.Error error={error} />
        ))) ??
        null}

      <h3 className="text-xl font-bold mb-3">Detalhes</h3>

      <form
        id="edit"
        className="mb-12"
        onSubmit={handleSubmit((data) => handleEditPost(data))}
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
              content={value}
              onChange={onChange}
            />
          </>
        )}
      />

      <div className="flex gap-2 mt-4">
        <Link href={AdminRoutes.posts.manage} className="btn ghost">
          Cancelar
        </Link>

        {content && <BlogPostPreviewDialog html={content} />}

        <button
          form="edit"
          type="submit"
          disabled={submitIsDisabled}
          suppressHydrationWarning
          className="btn default"
        >
          {isProcessing ? "Salvando" : "Editar"} post
        </button>
      </div>
    </>
  );
}

function FormSkeleton() {
  return null;
}
