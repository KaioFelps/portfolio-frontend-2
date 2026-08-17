import type { InternalAxiosRequestConfig } from "axios";
import { isServerErrorResponse } from "@/core/types/server-response";
import authQueries from "@/queries/auth-queries";
import type { LoginResponse } from "@/queries/auth-queries/login";
import { useAuth } from "../zustand-stores/auth";
import { axios } from ".";

let refreshPromise: Promise<LoginResponse> | undefined;

async function cachedRefreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = authQueries.refresh().finally(() => {
      refreshPromise = undefined;
    });
  }

  return await refreshPromise;
}

function trySetAuthState(response: LoginResponse) {
  const { accessToken, user } = response;

  useAuth.getState().setAuth(accessToken, user);
  return { token: accessToken, user };
}

export async function refreshAndRetryFailedRequest(
  config: InternalAxiosRequestConfig,
  error?: Error,
) {
  try {
    const response = await cachedRefreshAccessToken();
    const { token } = trySetAuthState(response);
    config.headers.setAuthorization(`Bearer ${token}`);
  } catch (e) {
    useAuth.getState().removeAuth();
    if (e instanceof Error) {
      console.error("Access token refresh failed:", e.message);
    }

    if (
      isServerErrorResponse<string | string[]>(e) &&
      typeof e.error === "string"
    ) {
      console.error("Access token refresh failed:", e.error);
    }

    if (error) return Promise.reject(error);
    return Promise.reject(e);
  }

  return await axios.request(config);
}

export async function tryToPrefetchAccessToken() {
  try {
    const response = await cachedRefreshAccessToken();
    trySetAuthState(response);
  } catch (e) {
    if (isServerErrorResponse(e))
      console.error("Access token prefetch failed:", e.error);
  } finally {
    useAuth.getState().sinalizeStoppedLoading();
  }
}
