import { NonExistingEnvVariableError } from ".";

export const ServerEnv = Object.freeze({
  appName: process.env.APP_NAME!,
  appUrl: process.env.APP_URL!,
  nodeEnv: process.env.NODE_ENV ?? "production",
  backendUrl: process.env.BACKEND_URL!,
});

if (!ServerEnv.appName) throw new NonExistingEnvVariableError("APP_NAME");
if (!ServerEnv.appUrl) throw new NonExistingEnvVariableError("APP_URL");
if (!ServerEnv.backendUrl) throw new NonExistingEnvVariableError("BACKEND_URL");
