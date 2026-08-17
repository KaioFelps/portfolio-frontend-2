import { ServerEnv } from "@/config/env/server";

export abstract class MetaUtilities {
  public static async getCanonicalUrl(path: string): Promise<string> {
    "use server";
    const canonicalUrl = `${ServerEnv.appUrl}${path}`;
    return canonicalUrl;
  }

  public static async getTitle(
    title: string,
    adminRoute = false,
  ): Promise<string> {
    "use server";
    const formerPart = adminRoute
      ? `${ServerEnv.appName} :: Admin`
      : ServerEnv.appName;

    return title ? `${formerPart} :: ${title}` : formerPart;
  }
}
