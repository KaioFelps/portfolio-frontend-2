// Os métodos dessa classe são chamados somente na primeira requisição após o deploy,
// em seguida os retornos são cacheados pelo Next.js e obtém-se, para efeitos práticos,
// o mesmo que chamar `process.env.NEXT_PUBLIC_...` diretamente.
export abstract class PublicEnv {
  public static get appName(): string {
    const appName = process.env.NEXT_PUBLIC_APP_NAME;
    if (!appName) throw new NonExistingEnvVariableError("NEXT_PUBLIC_APP_NAME");
    return appName;
  }

  public static get appUrl(): string {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) throw new NonExistingEnvVariableError("NEXT_PUBLIC_APP_URL");
    return appUrl;
  }

  public static get themeCookieKey(): string {
    const themeCookieKey = process.env.NEXT_PUBLIC_THEME_COOKIE_KEY;
    if (!themeCookieKey)
      throw new NonExistingEnvVariableError("NEXT_PUBLIC_THEME_COOKIE_KEY");
    return themeCookieKey;
  }
}

class NonExistingEnvVariableError extends Error {
  public constructor(variable: string) {
    super(`A variável de ambiente ${variable} precisa ser configurada.`);
  }
}
