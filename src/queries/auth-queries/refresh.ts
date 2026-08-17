import { axios } from "@/lib/axios";
import { prepareServerErrorFromAxios } from "@/lib/axios/error";
import { mountPath } from ".";
import type { LoginResponse } from "./login";

export async function refresh(): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(mountPath("refresh"));
    return response.data;
  } catch (error) {
    throw prepareServerErrorFromAxios(error);
  }
}
