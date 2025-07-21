import { ServerEnv } from "@/config/env";

export abstract class MetaUtilities {
  public static async getCanonicalUrl(path: string): Promise<string> {
    "use server";
    return `${ServerEnv.appUrl}${path}`;
  }

  public static async getTitle(title: string): Promise<string> {
    "use server";
    return `${ServerEnv.appName} :: ${title}`;
  }
}
