"use client";

import _axios, {
  type AxiosError,
  HttpStatusCode,
  type InternalAxiosRequestConfig,
} from "axios";
import { PublicEnv } from "@/config/env/public";
import { useAuth } from "../zustand-stores/auth";
import { refreshAndRetryFailedRequest } from "./login-prefetch";

const refreshTokenEndpoint = "/auth/refresh";
const refreshAttempt = "__has_already_tried_to_refresh";

export const axios = _axios.create({
  baseURL: PublicEnv.backendUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((config) => {
  const { token } = useAuth.getState();
  if (token) config.headers.setAuthorization(`Bearer ${token}`, true);
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config! as InternalAxiosRequestConfig & {
      [refreshAttempt]: boolean | undefined;
    };
    const hasTriedToRefreshAlready = config[refreshAttempt];
    const status = error.response?.status ?? error.status;

    if (
      hasTriedToRefreshAlready ||
      error.config?.url === refreshTokenEndpoint ||
      status !== HttpStatusCode.Unauthorized
    ) {
      return Promise.reject(error);
    }

    config[refreshAttempt] = true;
    return refreshAndRetryFailedRequest(config, error);
  },
);
