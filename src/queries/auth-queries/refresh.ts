// must be a clean axios instance so that the interceptors won't
// cause race condition
import axios from "axios";
import { prepareServerErrorFromAxios } from "@/lib/axios/error";
import { mountPath } from ".";
import type { LoginResponse } from "./login";

export async function refresh(): Promise<LoginResponse> {
  try {
    const response = await axios.patch<LoginResponse>(
      mountPath("refresh"),
      undefined,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    throw prepareServerErrorFromAxios(error);
  }
}
