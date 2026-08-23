"use client";

import { TrashIcon } from "@phosphor-icons/react/dist/csr/Trash";
import type { RefCallback } from "react";
import { useForm } from "react-hook-form";
import FloatingInput from "@/component/floating-input";
import type { ProjectLink } from "@/core/types/presented-entities/project-link";

type Props = {
  links: ProjectLink[];
  setLinks: (tags: ProjectLink[]) => void;
  disabled?: boolean;
  name?: string;
  ref?: RefCallback<Element>;
};

export function AddNewProjectLinkForm({
  links,
  setLinks,
  disabled,
  name,
  ref,
}: Props) {
  const { register, handleSubmit, reset, formState } = useForm<ProjectLink>({
    values: {
      title: "",
      value: "",
    },
  });

  const handleRemoveLink = (idOfLinkToRemove: string) => {
    setLinks(links.filter((link) => link.value !== idOfLinkToRemove));
  };

  const handleAddNewLink = (data: ProjectLink) => {
    setLinks([...links, data]);
    reset();
  };

  return (
    <form
      name={name}
      className="p-6 rounded-xl bg-d-backgrond/25"
      onSubmit={handleSubmit(handleAddNewLink)}
      ref={ref}
    >
      <h3 className="text-xl font-bold mb-6">Links referentes ao projeto</h3>

      <FloatingInput.Error error={formState.errors.title?.message} />
      <FloatingInput.Group className="mb-3">
        <FloatingInput.Input
          {...register("title", {
            required: "O título do link é obrigatório.",
            disabled,
          })}
          className="w-full"
          placeholder="https://www.kaiofelps.dev, ..."
          type="text"
        />
        <FloatingInput.Label>Título do link</FloatingInput.Label>
      </FloatingInput.Group>

      <FloatingInput.Error error={formState.errors.value?.message} />
      <FloatingInput.Group className="mb-3">
        <FloatingInput.Input
          {...register("value", {
            disabled,
            required: "O URL do link é obrigatório.",
            validate: (value) => {
              try {
                new URL(value);
                return true;
              } catch (_) {
                return "O URL inserido não é válido.";
              }
            },
          })}
          className="w-full"
          name="value"
          placeholder="https://www.kaiofelps.dev, ..."
        />
        <FloatingInput.Label>URL do link</FloatingInput.Label>
      </FloatingInput.Group>

      <button type="submit" className="btn ghost mb-3" disabled={disabled}>
        Adicionar
      </button>

      {links?.length > 0 && (
        <div className="flex flex-col gap-0.5">
          {links.map((link) => (
            <div
              key={`project-form-link-${link.value}`}
              className="flex gap-3 justify-between w-full p-1.5 pl-3 rounded-xl bg-d-gray-300/10 hover:bg-d-gray-300/15"
            >
              <span className="font-medium">
                {link.title}:{" "}
                <a
                  className="text-blue-500"
                  href={link.value}
                  target="_blank"
                  rel="noopener"
                >
                  {link.value}
                </a>
              </span>
              <button
                type="button"
                className="text-white p-1 rounded-md cursor-default bg-white/5 hover:bg-white/10 active:bg-white/15"
                onClick={() => handleRemoveLink(link.value)}
              >
                <TrashIcon size="16" weight="bold" />
              </button>
            </div>
          ))}
        </div>
      )}
    </form>
  );
}
