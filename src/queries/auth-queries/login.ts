import type { LoginUserPreview } from "@/core/types/presented-entities/login-user-preview";
import type { ErrorResponse } from "@/core/types/server-response";
import { axios } from "@/lib/axios";
import { prepareServerErrorFromAxios } from "@/lib/axios/error";
import { mountPath } from ".";

export type LoginResponse = { user: LoginUserPreview; accessToken: string };

export type LoginErrorResponse = ErrorResponse<string | string[]>;

export type LoginArgs = {
  email: string;
  password: string;
};

export async function login({
  email,
  password,
}: LoginArgs): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(mountPath("login"), {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw prepareServerErrorFromAxios(error);
  }
}
