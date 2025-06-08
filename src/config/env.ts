class NonExistingEnvVariableError extends Error {
  public constructor(variable: string) {
    super(`A variável de ambiente ${variable} precisa ser configurada.`);
  }
}

export const ServerEnv = Object.freeze({
  appName: process.env.APP_NAME!,
  appUrl: process.env.APP_URL!,
  themeCookieKey: process.env.THEME_COOKIE_KEY!,
});

if (!ServerEnv.appName) throw new NonExistingEnvVariableError("APP_NAME");

if (!ServerEnv.appUrl) throw new NonExistingEnvVariableError("APP_URL");

if (!ServerEnv.themeCookieKey)
  throw new NonExistingEnvVariableError("THEME_COOKIE_KEY");
