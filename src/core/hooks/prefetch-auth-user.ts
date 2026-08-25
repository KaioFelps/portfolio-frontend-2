"use client";

import { useEffect } from "react";
import { tryToPrefetchAccessToken } from "@/lib/axios/login-prefetch";

export function usePrefetchAuthUser() {
  useEffect(() => {
    tryToPrefetchAccessToken();
  }, []);
}
