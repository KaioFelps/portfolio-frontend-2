import { PublicEnv } from "@/config/env/public";

export abstract class MetaUtilities {
  public static async getCanonicalUrl(path: string): Promise<string> {
    "use server";
    const canonicalUrl = `${PublicEnv.appUrl}${path}`;
    return canonicalUrl;
  }

  public static async getTitle(
    title: string,
    adminRoute = false,
  ): Promise<string> {
    "use server";
    const formerPart = adminRoute
      ? `${PublicEnv.appName} :: Admin`
      : PublicEnv.appName;

    return title ? `${formerPart} :: ${title}` : formerPart;
  }
}
