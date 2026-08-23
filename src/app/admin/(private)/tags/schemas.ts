import z from "zod";

export const editTagSchema = z.object({
  value: z.string().min(1, "Tag precisa ter 1 caracter no mínimo.").optional(),
});

export type EditTagFormData = z.infer<typeof editTagSchema>;
