import { NonExistingEnvVariableError } from ".";

function required(value: string | undefined, name: string): string {
  if (!value) throw new NonExistingEnvVariableError(name);
  return value;
}

export const ServerEnv = Object.freeze({
  get appName() {
    return required(process.env.APP_NAME!, "APP_NAME");
  },

  get appUrl() {
    return required(process.env.APP_URL!, "APP_URL");
  },

  get nodeEnv() {
    return required(process.env.NODE_ENV ?? "production", "NODE_ENV");
  },

  get backendUrl() {
    return required(process.env.BACKEND_URL!, "BACKEND_URL");
  },
});
