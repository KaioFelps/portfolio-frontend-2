import z from "zod";

export type EditProjectFormData = z.infer<typeof editProjectSchema>;

export const editProjectSchema = z.object({
  title: z
    .string()
    .min(1, "Título precisa ter 1 caractere no mínimo.")
    .optional(),
  topstory: z
    .url("A imagem de capa precisa ser um link válido (com protocólo incluso).")
    .optional(),
  links: z
    .array(
      z.object({
        title: z
          .string()
          .min(1, "Os títulos dos links precisam ter no mínimo 1 caractere."),
        value: z.url(
          "Todo valor de link precisa ser uma url válida (com protocólo incluso).",
        ),
      }),
    )
    .optional(),
  tagsIds: z
    .array(z.uuid("Todos os IDs das tags precisam ser UUIDs."))
    .min(1, "O projeto precisa ter no mínimo 1 tag.")
    .optional(),
});
