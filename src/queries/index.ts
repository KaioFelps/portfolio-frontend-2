import { PublicEnv } from "@/config/env/public";

export function generatePathFactory(rootPath: string) {
  return (subpath?: string) => {
    let resolvedSubpath = subpath;
    if (subpath?.startsWith("/")) resolvedSubpath = subpath.slice(1);

    let trimmedEndpointPath = `/${rootPath}/${resolvedSubpath}`;
    if (trimmedEndpointPath.endsWith("/")) {
      trimmedEndpointPath = trimmedEndpointPath.slice(0, -1);
    }

    const url = new URL(trimmedEndpointPath, PublicEnv.backendUrl);
    return url.toString();
  };
}
