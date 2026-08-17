import { NonExistingEnvVariableError } from ".";

export const PublicEnv = Object.freeze({
  appUrl: process.env.NEXT_PUBLIC_APPLICATION_URL!,
  appName: process.env.NEXT_PUBLIC_APPLICATION_NAME!,
  backendUrl: process.env.NEXT_PUBLIC_SERVER_URL!,
});

if (!PublicEnv.appUrl)
  throw new NonExistingEnvVariableError("NEXT_PUBLIC_APPLICATION_URL");

if (!PublicEnv.appName)
  throw new NonExistingEnvVariableError("NEXT_PUBLIC_APPLICATION_NAME");

if (!PublicEnv.backendUrl)
  throw new NonExistingEnvVariableError("NEXT_PUBLIC_SERVER_URL");
