import axios from "axios";
import { prepareServerErrorFromAxios } from "@/lib/axios/error";
import { mountPath } from ".";

export async function logout(): Promise<void> {
  try {
    await axios.post(mountPath("logout"), undefined, { withCredentials: true });
  } catch (error) {
    throw prepareServerErrorFromAxios(error);
  }
}
