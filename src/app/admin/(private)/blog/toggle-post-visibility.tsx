import clsx from "clsx";
import { Switch } from "@/component/admin/switch";
import { useTogglePostVisibility } from "./hooks/use-toggle-post-visibility";

type Props = {
  postId: string;
  publishedAt?: Date | null;
};

function getFormattedPublishedDate(date?: Date | null) {
  if (!date) return "Não publicado";
  const formattedDate = date.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: "medium",
  });
  return formattedDate;
}

export function TogglePostVisibility({ postId, publishedAt }: Props) {
  const { togglePostVisibility, isProcessing } = useTogglePostVisibility();

  const isPublished = !!publishedAt;

  return (
    <>
      <Switch
        title="Alternar visibilidade do post"
        checked={isPublished}
        disabled={isProcessing}
        onCheckedChange={() => togglePostVisibility({ postId })}
      />

      <span className={clsx(isProcessing && "animate-pulse")}>
        {isProcessing
          ? "Alterando visibilidade... "
          : getFormattedPublishedDate(publishedAt)}
      </span>
    </>
  );
}
