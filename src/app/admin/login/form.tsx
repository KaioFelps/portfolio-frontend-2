"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FloatingInput from "@/component/floating-input";
import { useLogin } from "../hooks/use-login";

const loginSchema = z.object({
  email: z.email({ message: "E-mail inválido." }),
  password: z.string().min(1, { message: "Senha é um campo obrigatório." }),
});

export default function AdminLoginForm() {
  const { register, formState, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { isProcessing, login, isSuccess, error } = useLogin();

  return (
    <form
      method="post"
      className="rounded-3xl bg-d-gray-100 px-8 py-12 gap-3 shadow-lg shadow-black/40"
      onSubmit={handleSubmit((data) => login(data))}
    >
      <span className="text-xl text-d-gray-800 font-bold leading-none mb-6 block">
        Faça login
      </span>

      {isSuccess && (
        <span className="alert success mb-3 sm">Logado com sucesso!</span>
      )}

      {error && (
        <div>
          {(Array.isArray(error.error) ? error.error : [error.error]).map(
            (error) => (
              <span
                key={`admin-login-form-error-${error}`}
                className="alert danger mb-1 last:mb-3 sm"
              >
                {error}
              </span>
            ),
          )}
        </div>
      )}

      <FloatingInput.Error error={formState.errors.email?.message} />
      <FloatingInput.Group className="mb-3">
        <FloatingInput.Input
          {...register("email")}
          className="w-full"
          placeholder="e-mail"
        />
        <FloatingInput.Label>E-mail</FloatingInput.Label>
      </FloatingInput.Group>

      <FloatingInput.Error error={formState.errors.password?.message} />
      <FloatingInput.Group className="mb-6">
        <FloatingInput.Input
          {...register("password")}
          type="password"
          className="w-full"
          placeholder="senha"
        />
        <FloatingInput.Label>Senha</FloatingInput.Label>
      </FloatingInput.Group>

      <button
        type="submit"
        disabled={isProcessing}
        className="btn default w-full"
      >
        {isProcessing ? "Fazendo login..." : "Acessar o painel"}
      </button>
    </form>
  );
}
