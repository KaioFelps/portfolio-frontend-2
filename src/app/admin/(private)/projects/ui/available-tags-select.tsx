import Link from "next/link";
import { type FocusEventHandler, type RefCallback, useMemo } from "react";
import { AlertBlock } from "@/component/alert-block";
import FloatingInput from "@/component/floating-input";
import { useFetchEveryTag } from "../../hooks/use-fetch-every-tag";

type Props = {
  selectedTagsIds: string[];
  onSelectTagsIds: (ids: string[]) => void;
  ref?: RefCallback<Element>;
  onBlur?: FocusEventHandler;
  name?: string;
};

export function AvailableTagsSelect({
  onSelectTagsIds,
  selectedTagsIds,
  ref,
  onBlur,
  name,
}: Props) {
  const { data: availableTags, error, status } = useFetchEveryTag();

  const options = useMemo(
    () =>
      availableTags?.tags.map((tag) => ({
        label: tag.value,
        value: tag.id,
      })),
    [availableTags?.tags],
  );

  switch (status) {
    case "error":
      return (
        <AlertBlock type="danger" full>
          {error.error}
        </AlertBlock>
      );
    case "success":
      if (availableTags.tags.length > 0)
        return (
          <FloatingInput.Select
            ref={ref}
            onBlur={onBlur}
            multiple
            value={selectedTagsIds}
            onValueChange={onSelectTagsIds}
            options={options!}
            placeholder="Tags"
            name={name}
          />
        );

      return (
        <span className="mx-auto warning alert text-center w-full mb-3 inline-block">
          Ainda não há tags registradas. Você precisará{" "}
          <Link className="font-bold" href="/admin/tags/novo">
            criar uma tag
          </Link>{" "}
          antes!
        </span>
      );

    case "pending":
      return <FloatingInput.Skeleton isSelect />;
  }
}
