import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import type { Tag } from "@/core/types/presented-entities/tag";
import { queryClient, RQKeys } from "@/lib/react-query";
import tagsQueries from "@/queries/tags-queries";
import type {
  EditTagErrorResponse,
  EditTagParams,
  EditTagResponse,
} from "@/queries/tags-queries/edit-tag";

type MutationResponse = EditTagResponse;
type MutationErrorResponse = EditTagErrorResponse;
type MutationArgs = EditTagParams;

type Mutation = UseMutationOptions<
  MutationResponse,
  MutationErrorResponse,
  MutationArgs,
  void
>;

type HookArgs = Pick<Mutation, "onError" | "onMutate" | "onSuccess"> & {
  tagId: string;
};

export function useEditTag({ onError, onMutate, onSuccess, tagId }: HookArgs) {
  const {
    mutate: editTag,
    isPending,
    ...rest
  } = useMutation<EditTagResponse, EditTagErrorResponse, EditTagParams, void>({
    mutationFn: tagsQueries.editTag,
    onMutate,
    onError,
    onSuccess: async (data, vars, result, ctx) => {
      await queryClient.invalidateQueries({ queryKey: RQKeys.logs.fetchAll() });
      queryClient.setQueriesData(
        { queryKey: RQKeys.tags.fetchPaginatedBase() },
        (oldData: { tags?: Tag[] }) => {
          if (!oldData?.tags) return oldData;
          if (!vars.value) return oldData;

          return {
            ...oldData,
            tags: oldData.tags.map((tag) =>
              tag.id === tagId ? { ...tag, value: vars.value } : tag,
            ),
          };
        },
      );
      await onSuccess?.(data, vars, result, ctx);
    },
  });

  return { editTag, isProcessing: isPending, ...rest };
}
