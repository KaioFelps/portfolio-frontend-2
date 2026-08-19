import type { InternalAxiosRequestConfig } from "axios";
import { isServerErrorResponse } from "@/core/types/server-response";
import authQueries from "@/queries/auth-queries";
import type { LoginResponse } from "@/queries/auth-queries/login";
import { useAuth } from "../zustand-stores/auth";
import { axios } from ".";

let refreshPromise: Promise<LoginResponse> | undefined;
let logoutPromise: Promise<void> | undefined;

async function cachedRefreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = authQueries.refresh().finally(() => {
      refreshPromise = undefined;
    });
  }

  return await refreshPromise;
}

async function cachedLogout() {
  try {
    if (!logoutPromise) {
      logoutPromise = authQueries.logout().finally(() => {
        logoutPromise = undefined;
      });
    }

    await logoutPromise;
  } catch {}
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
    await cachedLogout();

    if (e instanceof Error) {
      console.error("Access token refresh failed:", e.message);
    }

    if (
      isServerErrorResponse<string | string[]>(e) &&
      (typeof e.error === "string" || Array.isArray(e.error))
    ) {
      console.error("Access token refresh failed:", e.error);
    }

    if (error) return Promise.reject(error);
    return Promise.reject(e);
  } finally {
    useAuth.getState().sinalizeStoppedLoading();
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
