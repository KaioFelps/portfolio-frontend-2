import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "Título precisa ter 1 caractere, no mínimo."),
  description: z
    .string()
    .min(1, "Preview/Descrição precisa ter 1 caractere, no mínimo."),
  topstory: z.url(
    "A imagem de capa precisa ser um link válido (com protocólo incluso).",
  ),
  content: z.string({ message: "Impossível publicar um post sem conteúdo." }),
  tagsIds: z.array(z.uuid()).min(1, "O projeto precisa ter no mínimo 1 tag."),
});

export const editPostSchema = z.object({
  title: z
    .string()
    .min(1, "Título precisa ter 1 caractere, no mínimo.")
    .optional(),
  description: z
    .string()
    .min(1, "Preview/Descrição precisa ter 1 caractere, no mínimo.")
    .optional(),
  topstory: z
    .url("A imagem de capa precisa ser um link válido (com protocólo incluso).")
    .optional(),
  content: z
    .string({ message: "Impossível publicar um post sem conteúdo." })
    .optional(),
  tagsIds: z
    .array(z.uuid())
    .min(1, "O projeto precisa ter no mínimo 1 tag.")
    .optional(),
});

export type EditPostFormData = z.infer<typeof editPostSchema>;
