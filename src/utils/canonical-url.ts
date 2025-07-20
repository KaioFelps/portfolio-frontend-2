"use server";

import { ServerEnv } from "@/config/env";

export async function getCanonicalUrl(path: string): Promise<string> {
  return `${ServerEnv.appUrl}${path}`;
}
