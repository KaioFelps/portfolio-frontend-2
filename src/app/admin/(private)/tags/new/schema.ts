import z from "zod";

export const createTagSchema = z.object({
  value: z.string().min(1, "Tag precisa ter 1 caracter no mínimo."),
});
